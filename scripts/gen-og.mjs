// Regenerates public/og-default.png (1200x630) from an SVG, rendered with sharp.
// Brand fonts (Space Grotesk, JetBrains Mono, Inter) ship as variable woff2 in
// node_modules; we register them with fontconfig so librsvg can resolve them.
import sharp from 'sharp';
import { execSync } from 'node:child_process';
import { mkdirSync, copyFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Make the brand fonts discoverable by fontconfig (idempotent).
const fontsDir = join(homedir(), '.fonts');
mkdirSync(fontsDir, { recursive: true });
const fonts = {
  'SpaceGrotesk.woff2': '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2',
  'JetBrainsMono.woff2': '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
  'Inter.woff2': '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
};
for (const [dest, src] of Object.entries(fonts)) {
  copyFileSync(join(root, 'node_modules', src), join(fontsDir, dest));
}
execSync(`fc-cache -f "${fontsDir}"`, { stdio: 'ignore' });

const W = 1200;
const H = 630;

const eyebrow = '// senior product manager';
const name = 'Kireeti Varma';
const subtitle = 'Built products for 200M+ users globally.';
const footer = 'ex-OnePlus · 200M+ users · 50+ countries · Open to Sr. PM roles';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="red" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3a0d12"/>
      <stop offset="100%" stop-color="#3a0d12" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="purple" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1c1830"/>
      <stop offset="100%" stop-color="#1c1830" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#0c0d11"/>
  <circle cx="1080" cy="150" r="360" fill="url(#red)"/>
  <circle cx="120" cy="560" r="320" fill="url(#purple)"/>

  <g font-family="JetBrains Mono">
    <text x="90" y="178" font-size="30" letter-spacing="1" fill="#f50514" font-weight="500">${eyebrow}</text>
  </g>
  <rect x="92" y="200" width="64" height="4" rx="2" fill="#f50514"/>

  <text x="88" y="320" font-family="Space Grotesk" font-weight="700" font-size="112" fill="#f1f5f9" letter-spacing="-2">${name}</text>

  <text x="92" y="412" font-family="Inter" font-weight="400" font-size="42" fill="#94a3b8">${subtitle}</text>

  <text x="92" y="556" font-family="JetBrains Mono" font-weight="400" font-size="26" letter-spacing="0.5" fill="#64748b">${footer}</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(join(root, 'public', 'og-default.png'));
console.log('Wrote public/og-default.png');
