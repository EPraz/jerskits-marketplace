# Jerskits — the product film

A **35-second**, silent 1920×1080 H.264 MP4 at 25 fps. Real browser footage, English interface, no voice, music or explanatory text over the application. The closing card contains only the brand and public address.

[Live demo](https://jerskits-marketplace.vercel.app) · [Watch](https://jerskits-marketplace.vercel.app/walkthrough) · [MP4](../public/walkthrough/jerskits-showcase.mp4) · [English captions](../public/walkthrough/jerskits-showcase.vtt)

| Time | Scene |
| --- | --- |
| 0:00–0:12 | Liverpool, Barcelona and Brazil in the desktop hero. |
| 0:12–0:21 | The collection and the Liverpool shirt detail. |
| 0:21–0:30 | Real 390×844 mobile navigation, framed over a softened desktop backdrop. |
| 0:30–0:35 | Jerskits and the public address. |

The player has native controls, optional English scene descriptions, chapter seeking, a transcript and an MP4 download. The storefront does not request the video; metadata loads only when the player is opened. The film never autoplays.

## Reproduce

Requires the project's Node dependencies, Playwright Chromium, Python, Pillow and imageio-ffmpeg. The Python tools and raw recordings remain local and are not deployed.

```powershell
npm ci
npx playwright install chromium
python -m pip install --target .local/video-tools pillow imageio-ffmpeg
npm run build
npm run preview -- --port 5187
# In another terminal:
$env:JERSKITS_DEMO_URL = 'http://127.0.0.1:5187'
$env:JERSKITS_PUBLIC_URL = 'https://jerskits-marketplace.vercel.app'
npm run walkthrough:rehearse
npm run walkthrough:record
npm run walkthrough:render
```

The renderer reads `.local/walkthrough/latest.json`, aligns the two raw videos using a pre-roll marker, assembles the approved scenes and exports fast-start MP4, poster and WebVTT. It decodes the complete MP4 and creates chronological review sheets sampled every two seconds. The manifest records the source origin, application commit, viewport sizes and browser errors. Rehearsals verify the route without generating a final film.

On Windows the review sheets use Segoe UI. Set `JERSKITS_VIDEO_FONT` to another local TTF on other platforms. Set `JERSKITS_VIDEO_TOOLS` if Python rendering packages are installed in a different directory.

## Hosting

- Public repository: [EPraz/jerskits-marketplace](https://github.com/EPraz/jerskits-marketplace).
- Vercel project: `jerskits-marketplace`, in `eprazs-projects`.
- Production domain: `jerskits-marketplace.vercel.app`.
- Production branch: `main`.
- Runtime assets, fonts, translations and simulated checkout remain local to the frontend; there are no application environment variables or backend services.
- The Vercel SPA rewrite follows the [official Vite deployment instructions](https://vercel.com/docs/frameworks/frontend/vite). Git connection uses [Vercel's Git integration](https://vercel.com/docs/cli/git).

## Verification

Local playback, mobile/desktop layouts, seeking, transcript, download, byte-range responses and accessibility are covered by the browser suite. Final publication evidence is recorded after production verification.
