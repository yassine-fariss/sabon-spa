import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const inputPath = path.join(rootDir, 'src', 'data', 'services.json');
const publicDataDir = path.join(rootDir, 'public', 'data');
const docsDir = path.join(rootDir, 'docs');

if (!fs.existsSync(publicDataDir)) {
  fs.mkdirSync(publicDataDir, { recursive: true });
}
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const raw = fs.readFileSync(inputPath, 'utf-8');
const data = JSON.parse(raw);

const { meta, categories, services, unassigned = [] } = data;

console.log(`[build-data] Processing ${services.length} services across ${categories.length} categories...`);

// 1. Validation
const categoryMap = new Map();
for (const cat of categories) {
  const subcatSet = new Set(cat.subcategories.map(s => s.id));
  categoryMap.set(cat.id, { ...cat, subcatSet });
}

const seenIds = new Set();
const errors = [];
const reviewItems = [];

for (const s of services) {
  if (seenIds.has(s.id)) {
    errors.push(`Duplicate service id: "${s.id}"`);
  }
  seenIds.add(s.id);

  if (!categoryMap.has(s.category)) {
    errors.push(`Service "${s.id}" has invalid category "${s.category}"`);
  } else {
    const cat = categoryMap.get(s.category);
    if (!cat.subcatSet.has(s.subcategory)) {
      errors.push(`Service "${s.id}" has invalid subcategory "${s.subcategory}" for category "${s.category}"`);
    }
  }

  if (s.price !== undefined && (typeof s.price !== 'number' || s.price <= 0)) {
    errors.push(`Service "${s.id}" has invalid price: ${s.price}`);
  }

  if (s.duration !== undefined && (typeof s.duration !== 'number' || s.duration <= 0)) {
    errors.push(`Service "${s.id}" has invalid duration: ${s.duration}`);
  }

  if (s.review) {
    reviewItems.push(s);
  }
}

if (errors.length > 0) {
  console.error('[build-data] Validation failed with errors:');
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

// 2. Compute counts & Write public/data/index.json
const cleanCategories = categories.map(cat => {
  const catServices = services.filter(
    s => s.category === cat.id && s.type !== 'product'
  );
  return {
    id: cat.id,
    order: cat.order,
    icon: cat.icon,
    name: cat.name,
    tagline: cat.tagline,
    subcategories: cat.subcategories,
    count: catServices.length
  };
});

fs.writeFileSync(
  path.join(publicDataDir, 'index.json'),
  JSON.stringify({ meta, categories: cleanCategories }, null, 2),
  'utf-8'
);
console.log(`[build-data] Wrote public/data/index.json`);

// 3. Write individual category JSONs
for (const cat of cleanCategories) {
  const catServices = services
    .filter(s => s.category === cat.id && s.type !== 'product')
    .map(s => {
      // strip internal review field
      const { review, ...cleanService } = s;
      return cleanService;
    });

  fs.writeFileSync(
    path.join(publicDataDir, `${cat.id}.json`),
    JSON.stringify({ category: cat, services: catServices }, null, 2),
    'utf-8'
  );
  console.log(`[build-data] Wrote public/data/${cat.id}.json (${catServices.length} services)`);
}

// 4. Write public/data/search-index.json
const searchIndex = services
  .filter(s => s.type !== 'product')
  .map(s => ({
    id: s.id,
    n: s.name,
    c: s.category,
    s: s.subcategory,
    p: s.price
  }));

fs.writeFileSync(
  path.join(publicDataDir, 'search-index.json'),
  JSON.stringify(searchIndex),
  'utf-8'
);
console.log(`[build-data] Wrote public/data/search-index.json (${searchIndex.length} entries)`);

// 5. Write docs/DATA-REVIEW.md
let markdown = `# Sabon Spa & Hammam - Data Review & Owner Confirmation\n\n`;
markdown += `*Generated automatically on ${new Date().toISOString().split('T')[0]} from \`src/data/services.json\`.*\n\n`;
markdown += `This document lists items requiring validation or confirmation by the Spa management.\n\n`;

markdown += `## 1. Services with Review Notes (${reviewItems.length} items)\n\n`;
markdown += `| ID | Name | Category / Subcategory | Price | Review Note |\n`;
markdown += `|---|---|---|---|---|\n`;
for (const item of reviewItems) {
  markdown += `| \`${item.id}\` | **${item.name}** | \`${item.category} / ${item.subcategory}\` | ${item.price ? `${item.price} MAD` : 'N/A'} | ${item.review} |\n`;
}

markdown += `\n## 2. Unassigned Items (${unassigned.length} items)\n\n`;
if (unassigned.length > 0) {
  markdown += `| Name | Duration | Price | Notes |\n`;
  markdown += `|---|---|---|---|\n`;
  for (const u of unassigned) {
    markdown += `| **${u.name}** | ${u.duration ? `${u.duration} min` : 'N/A'} | ${u.price ? `${u.price} MAD` : 'N/A'} | ${u.note || ''} |\n`;
  }
} else {
  markdown += `No unassigned items.\n`;
}

fs.writeFileSync(path.join(docsDir, 'DATA-REVIEW.md'), markdown, 'utf-8');
console.log(`[build-data] Wrote docs/DATA-REVIEW.md`);
console.log('[build-data] Data pipeline completed successfully!');
