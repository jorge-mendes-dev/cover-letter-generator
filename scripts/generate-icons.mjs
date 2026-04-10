import { mkdirSync } from 'fs';
import { createRequire } from 'module';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const __dirname = dirname(fileURLToPath(import.meta.url));

const iconsDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(iconsDir, { recursive: true });

function makeSvg(size) {
  const pad = Math.round(size * 0.18);
  const docW = Math.round(size * 0.52);
  const docH = Math.round(size * 0.62);
  const docX = Math.round((size - docW) / 2);
  const docY = Math.round((size - docH) / 2);
  const corner = Math.round(size * 0.06);
  const lineX1 = docX + Math.round(docW * 0.2);
  const lineX2 = docX + Math.round(docW * 0.8);
  const lineY1 = docY + Math.round(docH * 0.32);
  const lineY2 = docY + Math.round(docH * 0.5);
  const lineY3 = docY + Math.round(docH * 0.68);
  const sw = Math.round(size * 0.03);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="#000000"/>
  <rect x="${docX}" y="${docY}" width="${docW}" height="${docH}" rx="${corner}" fill="#ffffff"/>
  <line x1="${lineX1}" y1="${lineY1}" x2="${lineX2}" y2="${lineY1}" stroke="#000000" stroke-width="${sw}" stroke-linecap="round"/>
  <line x1="${lineX1}" y1="${lineY2}" x2="${lineX2}" y2="${lineY2}" stroke="#000000" stroke-width="${sw}" stroke-linecap="round"/>
  <line x1="${lineX1}" y1="${lineY3}" x2="${Math.round(lineX1 + (lineX2 - lineX1) * 0.6)}" y2="${lineY3}" stroke="#000000" stroke-width="${sw}" stroke-linecap="round"/>
</svg>`;
}

const sizes = [192, 512];
await Promise.all(
  sizes.map((size) =>
    sharp(Buffer.from(makeSvg(size)))
      .png()
      .toFile(join(iconsDir, `icon-${size}x${size}.png`))
      .then(() => console.log(`✓ icon-${size}x${size}.png`))
  )
);

// Also create a maskable icon (512x512 with padding for safe zone)
function makeMaskableSvg(size) {
  const safe = Math.round(size * 0.6); // safe zone is inner 60%
  const docW = Math.round(safe * 0.52);
  const docH = Math.round(safe * 0.62);
  const docX = Math.round((size - docW) / 2);
  const docY = Math.round((size - docH) / 2);
  const corner = Math.round(size * 0.04);
  const lineX1 = docX + Math.round(docW * 0.2);
  const lineX2 = docX + Math.round(docW * 0.8);
  const lineY1 = docY + Math.round(docH * 0.32);
  const lineY2 = docY + Math.round(docH * 0.5);
  const lineY3 = docY + Math.round(docH * 0.68);
  const sw = Math.round(size * 0.025);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#000000"/>
  <rect x="${docX}" y="${docY}" width="${docW}" height="${docH}" rx="${corner}" fill="#ffffff"/>
  <line x1="${lineX1}" y1="${lineY1}" x2="${lineX2}" y2="${lineY1}" stroke="#000000" stroke-width="${sw}" stroke-linecap="round"/>
  <line x1="${lineX1}" y1="${lineY2}" x2="${lineX2}" y2="${lineY2}" stroke="#000000" stroke-width="${sw}" stroke-linecap="round"/>
  <line x1="${lineX1}" y1="${lineY3}" x2="${Math.round(lineX1 + (lineX2 - lineX1) * 0.6)}" y2="${lineY3}" stroke="#000000" stroke-width="${sw}" stroke-linecap="round"/>
</svg>`;
}

await sharp(Buffer.from(makeMaskableSvg(512)))
  .png()
  .toFile(join(iconsDir, 'icon-maskable-512x512.png'))
  .then(() => console.log('✓ icon-maskable-512x512.png'));

// Favicon: 32x32 PNG → ICO-compatible PNG placed at app/favicon.ico
// and a clean SVG for app/icon.svg (modern browsers)
const appDir = join(__dirname, '..', 'app');

function makeFaviconSvg(size) {
  const docW = Math.round(size * 0.56);
  const docH = Math.round(size * 0.66);
  const docX = Math.round((size - docW) / 2);
  const docY = Math.round((size - docH) / 2);
  const corner = Math.max(1, Math.round(size * 0.06));
  const lineX1 = docX + Math.round(docW * 0.2);
  const lineX2 = docX + Math.round(docW * 0.8);
  const lineY1 = docY + Math.round(docH * 0.32);
  const lineY2 = docY + Math.round(docH * 0.52);
  const lineY3 = docY + Math.round(docH * 0.70);
  const sw = Math.max(1, Math.round(size * 0.06));
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="#000000"/>
  <rect x="${docX}" y="${docY}" width="${docW}" height="${docH}" rx="${corner}" fill="#ffffff"/>
  <line x1="${lineX1}" y1="${lineY1}" x2="${lineX2}" y2="${lineY1}" stroke="#000000" stroke-width="${sw}" stroke-linecap="round"/>
  <line x1="${lineX1}" y1="${lineY2}" x2="${lineX2}" y2="${lineY2}" stroke="#000000" stroke-width="${sw}" stroke-linecap="round"/>
  <line x1="${lineX1}" y1="${lineY3}" x2="${Math.round(lineX1 + (lineX2 - lineX1) * 0.58)}" y2="${lineY3}" stroke="#000000" stroke-width="${sw}" stroke-linecap="round"/>
</svg>`;
}

// Write app/icon.svg (Next.js App Router picks this up automatically)
import { writeFileSync } from 'fs';
const svgContent = makeFaviconSvg(32).replace('width="32" height="32"', 'width="32" height="32"');
// Scale-independent SVG for the icon file
const scalableSvg = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="7" fill="#000000"/>
  <rect x="9" y="7" width="14" height="18" rx="2" fill="#ffffff"/>
  <line x1="12" y1="13" x2="20" y2="13" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="12" y1="17" x2="20" y2="17" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="12" y1="21" x2="17" y2="21" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;
writeFileSync(join(appDir, 'icon.svg'), scalableSvg);
console.log('✓ app/icon.svg');

// Generate favicon.ico as a 32x32 PNG (browsers accept PNG inside .ico path)
await sharp(Buffer.from(makeFaviconSvg(32)))
  .png()
  .toFile(join(appDir, 'favicon.ico'))
  .then(() => console.log('✓ app/favicon.ico'));
