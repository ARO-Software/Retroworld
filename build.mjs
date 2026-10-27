// Zero-dependency static build: renders src/pages/*.mjs into dist/ and copies public/.
// BASE_PATH (e.g. "/Retroworld/") is only needed for 404.html, which GitHub Pages serves from any URL.
import { cp, mkdir, rm, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { site, products, categories, extraCategories } from './src/data.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(root, 'dist');
const basePath = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, 'public'), out, { recursive: true });

const pagesDir = path.join(root, 'src/pages');
for (const f of (await readdir(pagesDir)).filter((f) => f.endsWith('.mjs'))) {
  const mod = await import(pathToFileURL(path.join(pagesDir, f)).href);
  await writeFile(path.join(out, mod.file), mod.default({ basePath }));
  console.log(`  ${mod.file}`);
}

// Client-side data for the bag, search, quick view and reels.
const data = {
  site: { name: site.name, currency: site.currency, freeDeliveryOver: site.freeDeliveryOver, links: site.links, drop: site.drop },
  categories: Object.fromEntries([...categories, ...extraCategories].map((c) => [c.id, c.name])),
  products: products.map(({ id, name, category, price, was, badge, colour, sizes, img, bg, alt, blurb, details, arrived, order }) => ({
    id, name, category, price, was, badge, colour, sizes, img, bg, alt, blurb, details, arrived, order,
  })),
};
await writeFile(path.join(out, 'assets/js/data.js'), `export default ${JSON.stringify(data, null, 2)};\n`);
await writeFile(path.join(out, '.nojekyll'), '');
console.log(`Built ${products.length} products into dist/ (base ${basePath})`);
