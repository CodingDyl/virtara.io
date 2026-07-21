/**
 * Converts every PNG under src/assets to WebP.
 *
 * Run with: node scripts/optimize-images.mjs
 * Safe to re-run — existing .webp files are overwritten.
 */
import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import path from "path";

const dir = "src/assets";
const QUALITY = 80;
const BUDGET_KB = 300;

// Widest a given image is ever displayed, doubled for 2x screens. Project
// screenshots sit in cards a few hundred pixels wide, so shipping them at
// 1920 was ~150 KB of pixels no one sees.
const DEFAULT_WIDTH = 1920;
const WIDTH_BY_PREFIX = [
  ["projects/", 1200],
  ["marketing_", 1200],
  ["health_check_preview", 900],
  ["web_logo", 500],
  ["logo", 500]
];

const widthFor = (file) =>
  WIDTH_BY_PREFIX.find(([prefix]) => file.startsWith(prefix))?.[1] ?? DEFAULT_WIDTH;

const kb = (file) => statSync(file).size / 1024;

const files = readdirSync(dir, { recursive: true }).filter((file) =>
  file.endsWith(".png")
);

/**
 * Encode once at the default settings. If the result blows the budget (large
 * photographic sources like the hero background do), step the quality down
 * until it fits rather than hand-tuning per file.
 */
async function encode(input, output, width) {
  for (const quality of [QUALITY, 70, 60, 50, 40]) {
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(output);
    if (kb(output) <= BUDGET_KB) return quality;
  }
  return null;
}

let before = 0;
let after = 0;
const overBudget = [];

for (const file of files) {
  const input = path.join(dir, file);
  const output = input.replace(/\.png$/, ".webp");

  await encode(input, output, widthFor(file));

  const inKb = kb(input);
  const outKb = kb(output);
  before += inKb;
  after += outKb;
  if (outKb > BUDGET_KB) overBudget.push([output, outKb]);

  console.log(
    `${output.padEnd(48)} ${inKb.toFixed(0).padStart(6)} KB -> ${outKb
      .toFixed(0)
      .padStart(5)} KB`
  );
}

console.log(
  `\n${files.length} images: ${(before / 1024).toFixed(1)} MB -> ${(
    after / 1024
  ).toFixed(1)} MB`
);

if (overBudget.length) {
  console.warn(`\nOver the ${BUDGET_KB} KB budget:`);
  for (const [file, size] of overBudget) {
    console.warn(`  ${file} (${size.toFixed(0)} KB)`);
  }
  process.exitCode = 1;
}
