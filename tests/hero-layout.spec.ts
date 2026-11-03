import { test, expect } from "./fixtures";
import type { Page } from "@playwright/test";

// Measure rendered text and the actual shirt silhouette, including transparent
// asset margins and its CSS rotation. No production layout constants are reused.
async function visibleComposition(page: Page, team: string) {
  const heading = page.getByRole("heading", { name: team, exact: true });
  const shirt = page
    .getByRole("region", { name: team, exact: true })
    .getByRole("img");
  await shirt.evaluate((image: HTMLImageElement) => image.decode());
  await page.evaluate(() => document.fonts.ready);
  return page.evaluate(
    ({ heading, shirt }) => {
      const walker = document.createTreeWalker(heading!, NodeFilter.SHOW_TEXT);
      const words = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.textContent?.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        const rect = range.getBoundingClientRect();
        if (rect.width && rect.height) {
          const start = node.textContent.search(/\S/);
          const end = node.textContent.trimEnd().length;
          range.setStart(node, start);
          range.setEnd(node, start + 1);
          const firstLetterWidth = range.getBoundingClientRect().width;
          range.setStart(node, end - 1);
          range.setEnd(node, end);
          const lastLetterWidth = range.getBoundingClientRect().width;
          words.push({
            text: node.textContent.trim(),
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            firstLetterWidth,
            lastLetterWidth,
          });
        }
      }
      const image = shirt as HTMLImageElement;
      const rect = image.getBoundingClientRect();
      const style = getComputedStyle(image);
      const size = Math.min(parseFloat(style.width), parseFloat(style.height));
      const transform = new DOMMatrix(style.transform);
      const canvas = document.createElement("canvas");
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      const context = canvas.getContext("2d")!;
      context.translate(rect.x + rect.width / 2, rect.y + rect.height / 2);
      context.transform(
        transform.a,
        transform.b,
        transform.c,
        transform.d,
        0,
        0,
      );
      context.drawImage(image, -size / 2, -size / 2, size, size);
      const { data, width, height } = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      let left = width,
        right = 0,
        top = height,
        bottom = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (data[(y * width + x) * 4 + 3] > 32) {
            left = Math.min(left, x);
            right = Math.max(right, x + 1);
            top = Math.min(top, y);
            bottom = Math.max(bottom, y + 1);
          }
        }
      }
      return { words, shirt: { left, right, top, bottom } };
    },
    {
      heading: await heading.elementHandle(),
      shirt: await shirt.elementHandle(),
    },
  );
}

test("a guest recognizes name blocks tucked closely against each featured shirt", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 2048, height: 1050 },
    { width: 1024, height: 768 },
    { width: 1440, height: 600 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    for (const [team, parts] of [
      ["LIVERPOOL", ["LIVER", "POOL"]],
      ["BARCELONA", ["BARCE", "LONA"]],
      ["BRAZIL", ["BRA", "ZIL"]],
    ] as const) {
      const { words, shirt } = await visibleComposition(page, team);
      expect(words.map((word) => word.text)).toEqual(parts);
      expect(words[0].left).toBeGreaterThanOrEqual(0);
      for (const [side, gap, letterWidth] of [
        ["left", shirt.left - words[0].right, words[0].lastLetterWidth],
        ["right", words[1].left - shirt.right, words[1].firstLetterWidth],
      ] as const) {
        expect(
          gap,
          `${team}: ${side} block must sit close to the shirt`,
        ).toBeLessThanOrEqual(letterWidth * 0.25);
        expect(
          gap,
          `${team}: at least half of the inner letter must remain visible`,
        ).toBeGreaterThanOrEqual(-letterWidth * 0.5);
      }
      expect(words[1].right).toBeLessThanOrEqual(viewport.width);
      await page
        .getByRole("button", { name: "Next shirt", exact: true })
        .click();
    }
  }
});

test("a guest reads the complete name above the shirt on narrow screens", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 667 },
    { width: 390, height: 844 },
    { width: 768, height: 900 },
    { width: 768, height: 600 },
    { width: 568, height: 320 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    for (const team of ["LIVERPOOL", "BARCELONA", "BRAZIL"]) {
      const { words, shirt } = await visibleComposition(page, team);
      expect(words.map((word) => word.text)).toEqual([team]);
      expect(words[0].left).toBeGreaterThanOrEqual(0);
      expect(words[0].right).toBeLessThanOrEqual(viewport.width);
      expect(
        shirt.bottom - shirt.top,
        `${team}: the shirt must remain visible`,
      ).toBeGreaterThan(40);
      expect(
        words[0].bottom,
        `${team}: complete name must be above the shirt`,
      ).toBeLessThanOrEqual(shirt.top);
      await expect(
        page.getByRole("button", { name: "Next shirt", exact: true }),
      ).toBeInViewport({ ratio: 1 });
      await expect(
        page.getByRole("link", { name: "Shop this shirt", exact: true }),
      ).toBeInViewport({ ratio: 1 });
      await page
        .getByRole("button", { name: "Next shirt", exact: true })
        .click();
    }
  }
});
