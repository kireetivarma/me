/**
 * One-time compression pass over migrated blog images: resize anything wider
 * than 1600px and re-encode in place (same filename/format, so markdown and
 * frontmatter references stay valid). Skips gifs and already-small files.
 */
import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const root = new URL('../src/assets/posts', import.meta.url).pathname;
const MAX_WIDTH = 1600;
const MIN_BYTES = 250 * 1024;

let before = 0;
let after = 0;

async function processFile(file) {
  const ext = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) return;
  const size = statSync(file).size;
  before += size;
  if (size < MIN_BYTES) {
    after += size;
    return;
  }
  const img = sharp(file, { failOn: 'none' }).rotate();
  const meta = await img.metadata();
  const pipeline = meta.width && meta.width > MAX_WIDTH ? img.resize({ width: MAX_WIDTH }) : img;
  const buf =
    ext === '.png'
      ? await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
      : ext === '.webp'
        ? await pipeline.webp({ quality: 80 }).toBuffer()
        : ext === '.avif'
          ? await pipeline.avif({ quality: 60 }).toBuffer()
          : await pipeline.jpeg({ quality: 78, mozjpeg: true }).toBuffer();
  if (buf.length < size) {
    const { writeFileSync } = await import('node:fs');
    writeFileSync(file, buf);
    after += buf.length;
  } else {
    after += size;
  }
}

const files = [];
for (const dir of readdirSync(root)) {
  const d = join(root, dir);
  if (!statSync(d).isDirectory()) continue;
  for (const f of readdirSync(d)) files.push(join(d, f));
}

for (const f of files) {
  try {
    await processFile(f);
  } catch (e) {
    console.error(`skip ${f}: ${e.message}`);
  }
}

console.log(`Images: ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB across ${files.length} files`);
