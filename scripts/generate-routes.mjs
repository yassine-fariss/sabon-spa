import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.log('[generate-routes] dist/index.html not found, skipping route generation.');
  process.exit(0);
}

const categories = [
  'hammam-body',
  'massage',
  'facial-skincare',
  'hair-care',
  'beauty-nails',
  'spa-packages',
  'hair-removal',
];

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

for (const slug of categories) {
  const routeDir = path.join(distDir, 'services', slug);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml, 'utf-8');
}

console.log(`[generate-routes] Generated static route copies for ${categories.length} categories.`);
