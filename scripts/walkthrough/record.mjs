import { chromium, expect } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";

const rehearsal = process.argv.includes("--rehearsal");
const origin = process.env.JERSKITS_DEMO_URL || "http://127.0.0.1:5187";
const publicUrl =
  process.env.JERSKITS_PUBLIC_URL || "https://jerskits-marketplace.vercel.app";
const content = JSON.parse(
  await fs.readFile("src/walkthrough/content.json", "utf8"),
);
const output = path.resolve(
  ".local/walkthrough",
  `${rehearsal ? "rehearsal" : "take"}-${Date.now()}`,
);
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch();
const scenes = [],
  sources = {},
  errors = [],
  contexts = [];

function recordingOverlay() {
  addEventListener("DOMContentLoaded", () => {
    const cursor = document.createElement("div");
    cursor.innerHTML =
      '<svg width="20" height="25" viewBox="0 0 20 25"><path d="M2 1v20l5-6 4 8 3-1-4-8h8z" fill="white" stroke="#152027" stroke-width="1.5"/></svg>';
    Object.assign(cursor.style, {
      position: "fixed",
      pointerEvents: "none",
      zIndex: "2147483646",
      left: "-50px",
      top: "-50px",
      filter: "drop-shadow(0 2px 3px #0007)",
    });
    document.body.append(cursor);
    addEventListener("mousemove", (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    });
    addEventListener(
      "pointerdown",
      (event) => {
        const pulse = document.createElement("div");
        Object.assign(pulse.style, {
          position: "fixed",
          left: `${event.clientX - 15}px`,
          top: `${event.clientY - 15}px`,
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: "2px solid #fff",
          background: "#ffffff22",
          pointerEvents: "none",
          zIndex: "2147483645",
        });
        document.body.append(pulse);
        pulse
          .animate(
            [
              { opacity: 0.8, scale: 0.65 },
              { opacity: 0, scale: 1.3 },
            ],
            420,
          )
          .finished.then(() => pulse.remove());
      },
      true,
    );
    window.syncRecording = () => {
      const marker = document.createElement("div");
      Object.assign(marker.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "8px",
        height: "8px",
        background: "#0000ff",
        zIndex: "2147483647",
      });
      document.body.append(marker);
      setTimeout(() => marker.remove(), 240);
    };
  });
}

async function capture(name, viewport) {
  const mobile = name === "mobile";
  const context = await browser.newContext({
    viewport,
    locale: "en-US",
    hasTouch: mobile,
    isMobile: mobile,
    deviceScaleFactor: 1,
    ...(!rehearsal
      ? { recordVideo: { dir: path.join(output, "raw"), size: viewport } }
      : {}),
  });
  contexts.push(context);
  await context.addInitScript(recordingOverlay);
  const wallStart = performance.now();
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(origin);
  await expect(
    page.getByRole("heading", { name: "LIVERPOOL", exact: true }),
  ).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      ["liverpool-nike.png", "barcelona-hero.png", "brazil-hero.png"].map(
        async (file) => {
          const image = new Image();
          image.src = `/images/${file}`;
          await image.decode();
        },
      ),
    );
  });
  await page.waitForTimeout(400);
  if (!mobile)
    await page.screenshot({ path: path.join(output, "backdrop.png") });
  const before = performance.now();
  await page.evaluate(() => window.syncRecording());
  sources[name] = {
    ...viewport,
    syncWallTime: ((before + performance.now()) / 2 - wallStart) / 1000,
  };
  await page.waitForTimeout(400);
  const pause = (ms) => page.waitForTimeout(rehearsal ? Math.min(ms, 40) : ms);
  async function click(locator) {
    await locator.scrollIntoViewIfNeeded();
    const box = await locator.boundingBox();
    const x = box.x + box.width / 2,
      y = box.y + box.height / 2;
    if (mobile) await page.touchscreen.tap(x, y);
    else {
      await page.mouse.move(x, y, { steps: 12 });
      await pause(120);
      await page.mouse.click(x, y);
    }
    await pause(400);
  }
  async function scroll(y) {
    await page.evaluate(
      ({ y, rehearsal }) =>
        window.scrollTo({ top: y, behavior: rehearsal ? "instant" : "smooth" }),
      { y, rehearsal },
    );
    await pause(900);
  }
  async function scene(id, action) {
    const chapter = content.chapters.find((chapter) => chapter.id === id);
    const index = content.chapters.indexOf(chapter);
    const seconds =
      (content.chapters[index + 1]?.start ?? content.duration) - chapter.start;
    const start = (performance.now() - wallStart) / 1000;
    console.log(`Scene: ${id} (${seconds}s)`);
    await action();
    const elapsed = (performance.now() - wallStart) / 1000 - start;
    if (!rehearsal && elapsed > seconds)
      throw new Error(`${id} exceeds its budget: ${elapsed.toFixed(2)}s`);
    if (!rehearsal)
      await page.waitForTimeout(Math.max(0, (seconds - elapsed) * 1000));
    scenes.push({ ...chapter, seconds, start, source: name });
    await page.screenshot({ path: path.join(output, `${id}.png`) });
  }
  async function close() {
    const video = page.video();
    await context.close();
    if (video) {
      const file = path.join(output, "raw", `${name}.webm`);
      await video.saveAs(file);
      sources[name].file = path.relative(output, file);
    }
  }
  return { page, pause, click, scroll, scene, close };
}

try {
  const desktop = await capture("desktop", { width: 1920, height: 1080 });
  await desktop.scene("hero", async () => {
    await desktop.pause(3200);
    await desktop.click(
      desktop.page.getByRole("button", { name: "Next shirt", exact: true }),
    );
    await desktop.pause(3200);
    await desktop.click(
      desktop.page.getByRole("button", { name: "Next shirt", exact: true }),
    );
    await desktop.pause(3000);
  });
  await desktop.scene("collection", async () => {
    await desktop.click(
      desktop.page.getByRole("link", {
        name: "Explore the collection",
        exact: true,
      }),
    );
    await expect(
      desktop.page.getByRole("heading", {
        name: "The collection",
        exact: true,
      }),
    ).toBeVisible();
    await desktop.pause(700);
    await desktop.scroll(340);
    await desktop.pause(700);
    await desktop.click(
      desktop.page.getByRole("link", { name: /Liverpool Home Shirt/ }).first(),
    );
    await expect(
      desktop.page.getByRole("heading", {
        name: "Liverpool Home Shirt",
        exact: true,
      }),
    ).toBeVisible();
    await desktop.pause(1400);
    await desktop.click(
      desktop.page.getByRole("button", { name: "M", exact: true }),
    );
    await desktop.pause(1200);
  });
  await desktop.page.goto(origin);
  await desktop.page.evaluate(() => document.fonts.ready);
  await desktop.page.locator(".hero-shirt").evaluate((image) => image.decode());
  await desktop.scene("closing", async () => {
    await desktop.page.evaluate((url) => {
      const card = document.createElement("div");
      Object.assign(card.style, {
        position: "fixed",
        inset: "0",
        zIndex: "2147483647",
        background: "#172127f5",
        color: "#fff",
        display: "grid",
        placeContent: "center",
        textAlign: "center",
        fontFamily: "Urbanist, sans-serif",
      });
      const brand = document.createElement("div");
      brand.textContent = "Jerskits.";
      Object.assign(brand.style, {
        fontSize: "136px",
        fontWeight: "700",
        letterSpacing: "-7px",
      });
      const address = document.createElement("div");
      address.textContent = new URL(url).host;
      Object.assign(address.style, {
        marginTop: "32px",
        color: "#c3cbd0",
        fontSize: "27px",
        letterSpacing: "2px",
      });
      card.append(brand, address);
      document.body.append(card);
    }, publicUrl);
  });
  await desktop.close();
  const mobile = await capture("mobile", { width: 390, height: 844 });
  await mobile.scene("mobile", async () => {
    await mobile.pause(1400);
    await mobile.click(
      mobile.page.getByRole("button", { name: "Next shirt", exact: true }),
    );
    await mobile.pause(1400);
    await mobile.click(
      mobile.page.getByRole("link", {
        name: "Explore the collection",
        exact: true,
      }),
    );
    await expect(
      mobile.page.getByRole("heading", { name: "The collection", exact: true }),
    ).toBeVisible();
    await mobile.pause(900);
    await mobile.scroll(390);
    await mobile.pause(1100);
  });
  await mobile.close();
  if (errors.length) throw new Error(errors.join("\n"));
  const manifest = {
    origin,
    publicUrl,
    rehearsal,
    applicationCommit: execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
    }).trim(),
    workingTreeDirty:
      execFileSync("git", ["status", "--porcelain"], {
        encoding: "utf8",
      }).trim().length > 0,
    sources,
    scenes: content.chapters.map((chapter) =>
      scenes.find((scene) => scene.id === chapter.id),
    ),
    checks: {
      browserErrors: errors,
      desktop: "1920x1080",
      mobile: "390x844",
      realInteractions: true,
    },
  };
  await fs.writeFile(
    path.join(output, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  await fs.writeFile(
    ".local/walkthrough/latest.json",
    JSON.stringify({ output }, null, 2),
  );
  console.log(
    JSON.stringify({ output, rehearsal, scenes: scenes.length, errors }),
  );
} finally {
  await Promise.all(contexts.map((context) => context.close()));
  await browser.close();
}
