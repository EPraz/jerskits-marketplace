"""Edit real browser footage into the approved silent 35-second showcase."""
import hashlib
import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, os.environ.get("JERSKITS_VIDEO_TOOLS", str(ROOT / ".local/video-tools")))
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
FPS, WIDTH, HEIGHT = 25, 1920, 1080


def run(arguments):
    result = subprocess.run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", *map(str, arguments)], capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stderr.decode(errors="replace")[-5000:])
    return result.stdout


def timestamp(seconds):
    milliseconds = round(seconds * 1000)
    minutes, milliseconds = divmod(milliseconds, 60000)
    whole, milliseconds = divmod(milliseconds, 1000)
    return f"00:{minutes:02}:{whole:02}.{milliseconds:03}"


def recording_offset(take, source):
    raw = run(["-i", take / source["file"], "-t", "12", "-vf", "fps=25,crop=8:8:0:0", "-pix_fmt", "rgb24", "-f", "rawvideo", "pipe:1"])
    for frame in range(len(raw) // 192):
        pixels = raw[frame * 192:(frame + 1) * 192]
        red, green, blue = (sum(pixels[channel::3]) / 64 for channel in range(3))
        if red < 40 and green < 40 and blue > 200:
            return source["syncWallTime"] - frame / FPS
    raise ValueError("Recording synchronization marker missing")


def render(take):
    manifest = json.loads((take / "manifest.json").read_text(encoding="utf-8"))
    if manifest["rehearsal"]:
        raise ValueError("A rehearsal is not recorded footage")
    working, destination = take / "edit", ROOT / "public/walkthrough"
    working.mkdir(exist_ok=True)
    destination.mkdir(parents=True, exist_ok=True)
    offsets = {name: recording_offset(take, source) for name, source in manifest["sources"].items()}
    files, captions, elapsed = [], ["WEBVTT", ""], 0
    for index, scene in enumerate(manifest["scenes"]):
        seconds = scene["seconds"]
        start = max(0, scene["start"] - offsets[scene["source"]])
        source = take / manifest["sources"][scene["source"]]["file"]
        output = working / f"{index:02}.mp4"
        fade = ",fade=t=in:d=0.16" if index == 0 else ""
        if index == len(manifest["scenes"]) - 1:
            fade += f",fade=t=out:st={seconds - 0.16}:d=0.16"
        if scene["source"] == "mobile":
            inputs = ["-loop", "1", "-framerate", FPS, "-i", take / "backdrop.png", "-ss", f"{start:.3f}", "-i", source]
            filters = f"[0:v]scale={WIDTH}:{HEIGHT},gblur=sigma=32,eq=brightness=-0.28:saturation=0.65[bg];[1:v]fps={FPS},scale=462:1000:flags=lanczos,setsar=1,pad=474:1012:6:6:color=0x121c22[phone];[bg][phone]overlay=(W-w)/2:(H-h)/2:shortest=1[base];[base]null{fade}[out]"
        else:
            inputs = ["-ss", f"{start:.3f}", "-i", source]
            filters = f"[0:v]fps={FPS},scale={WIDTH}:{HEIGHT}:flags=lanczos,setsar=1{fade}[out]"
        print(f"Rendering {scene['id']} ({seconds}s)", flush=True)
        run([*inputs, "-filter_complex_threads", "2", "-filter_complex", filters, "-map", "[out]", "-t", seconds, "-an", "-r", FPS,
             "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", output])
        files.append(output)
        captions.extend([f"{timestamp(elapsed)} --> {timestamp(elapsed + seconds)}", scene["caption"], ""])
        elapsed += seconds
    shots = working / "shots.txt"
    shots.write_text("\n".join(f"file '{file.as_posix()}'" for file in files), encoding="utf-8")
    final = destination / "jerskits-showcase.mp4"
    run(["-f", "concat", "-safe", "0", "-i", shots, "-c", "copy", "-movflags", "+faststart", final])
    run(["-i", final, "-f", "null", "-"])
    frames, duration = imageio_ffmpeg.count_frames_and_secs(str(final))
    if abs(duration - 35) > 0.1:
        raise ValueError(f"Unexpected video duration: {duration}")
    run(["-ss", "1", "-i", final, "-frames:v", "1", "-q:v", "2", destination / "poster.jpg"])
    (destination / "jerskits-showcase.vtt").write_text("\n".join(captions), encoding="utf-8")
    review = take / "review"
    review.mkdir(exist_ok=True)
    run(["-i", final, "-vf", "fps=1/2,scale=480:270", review / "frame-%03d.jpg"])
    images = sorted(review.glob("frame-*.jpg"))
    font = ImageFont.truetype(os.environ.get("JERSKITS_VIDEO_FONT", "C:/Windows/Fonts/segoeui.ttf"), 18)
    for batch in range((len(images) + 11) // 12):
        sheet = Image.new("RGB", (1920, 900), "#172127")
        draw = ImageDraw.Draw(sheet)
        for index, file in enumerate(images[batch * 12:(batch + 1) * 12]):
            x, y = (index % 4) * 480, (index // 4) * 300
            with Image.open(file) as frame:
                sheet.paste(frame, (x, y))
            draw.text((x + 10, y + 272), timestamp((batch * 12 + index) * 2)[3:8], font=font, fill="white")
        sheet.save(review / f"sheet-{batch + 1}.jpg", quality=94)
    report = {"duration": duration, "frames": frames, "size": [WIDTH, HEIGHT], "fps": FPS, "audio": "none", "fullDecode": "passed",
              "bytes": final.stat().st_size, "sha256": hashlib.sha256(final.read_bytes()).hexdigest(), "origin": manifest["origin"],
              "applicationCommit": manifest["applicationCommit"], "workingTreeDirty": manifest.get("workingTreeDirty"), "checks": manifest["checks"], "offsets": offsets}
    (take / "render-report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report), flush=True)


if __name__ == "__main__":
    latest = json.loads((ROOT / ".local/walkthrough/latest.json").read_text(encoding="utf-8"))
    render((Path(sys.argv[1]) if len(sys.argv) > 1 else Path(latest["output"])).resolve())
