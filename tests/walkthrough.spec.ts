import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

test("a guest watches, seeks and downloads the public showcase", async ({
  page,
}) => {
  await page.goto("/walkthrough");
  await expect(
    page.getByRole("heading", { name: "The game. In motion.", exact: true }),
  ).toBeVisible();
  const video = page.locator("video");
  await expect
    .poll(() => video.evaluate((element: HTMLVideoElement) => element.duration))
    .toBeCloseTo(35, 0);
  await expect(video).toHaveJSProperty("paused", true);
  await video.evaluate((element: HTMLVideoElement) => element.play());
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(0.2);
  await video.evaluate((element: HTMLVideoElement) => element.pause());
  await page
    .getByRole("button", { name: "0:21 The game goes with you", exact: true })
    .click();
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeCloseTo(21, 0);
  await expect(video).toBeFocused();
  await video.evaluate((element: HTMLVideoElement) => {
    element.textTracks[0].mode = "hidden";
  });
  await expect
    .poll(() =>
      video.evaluate(
        (element: HTMLVideoElement) => element.textTracks[0].cues?.length,
      ),
    )
    .toBe(4);
  await page.getByText("Transcript (English)", { exact: true }).click();
  await expect(
    page.getByText("The same collection, explored in a real mobile viewport.", {
      exact: true,
    }),
  ).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download MP4", exact: true }).click();
  const file = await download;
  expect(file.suggestedFilename()).toBe("jerskits-showcase.mp4");
  expect(await file.failure()).toBeNull();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("the showcase has captions and fits narrow screens without loading on the storefront", async ({
  page,
  request,
}) => {
  const mediaRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) mediaRequests.push(request.url());
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "LIVERPOOL", exact: true }),
  ).toBeVisible();
  expect(mediaRequests).toEqual([]);
  await page.goto("/walkthrough");
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  const response = await request.get("/walkthrough/jerskits-showcase.mp4", {
    headers: { Range: "bytes=0-1023" },
  });
  expect(response.status()).toBe(206);
  expect((await response.body()).length).toBe(1024);
  const captions = await request.get("/walkthrough/jerskits-showcase.vtt");
  expect(captions.ok()).toBe(true);
  expect(await captions.text()).toContain("00:00:21.000 --> 00:00:30.000");
});
