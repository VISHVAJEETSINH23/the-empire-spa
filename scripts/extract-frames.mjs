/**
 * Hero frames, straight from the film. Writes two sets:
 *   public/frames/frame_0001.webp     1440 wide, for desktop
 *   public/frames/m/frame_0001.webp    600 wide centre crop, for portrait phones
 *
 *   node scripts/extract-frames.mjs "path/to/film.mp4"
 *
 * Update TOTAL_FRAMES in components/CinematicHero.tsx if the count changes.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const input = process.argv[2];
if (!input) throw new Error("Pass the path to the film.");

// Start empty, so frames from an older film can never mix in.
const dir = path.resolve("public/frames");
rmSync(dir, { recursive: true, force: true });
mkdirSync(path.join(dir, "m"), { recursive: true });

const result = spawnSync(
  ffmpeg,
  [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", input,
    "-filter_complex", "fps=24,split=2[a][b];[a]scale=1440:-2[d];[b]crop=670:1080,scale=600:-2[m]",
    "-map", "[d]", "-c:v", "libwebp", "-quality", "72", "-compression_level", "4", path.join(dir, "frame_%04d.webp"),
    "-map", "[m]", "-c:v", "libwebp", "-quality", "62", "-compression_level", "4", path.join(dir, "m", "frame_%04d.webp"),
  ],
  { stdio: "inherit" },
);
if (result.status !== 0) throw new Error("ffmpeg failed");

console.log(`done: ${readdirSync(dir).filter((f) => f.endsWith(".webp")).length} frames`);
