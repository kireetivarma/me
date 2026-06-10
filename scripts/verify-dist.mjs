/**
 * Post-build sanity checks. Fails the build if a critical artifact is missing.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist', import.meta.url).pathname;
const errors = [];

// Custom domain must survive every deploy.
const cname = join(dist, 'CNAME');
if (!existsSync(cname)) errors.push('dist/CNAME missing');
else if (readFileSync(cname, 'utf8').trim() !== 'kireetivarma.me') errors.push('dist/CNAME has wrong domain');

// Every blog post must build at /post/<slug>/.
const postsSrc = new URL('../src/content/posts', import.meta.url).pathname;
const slugs = readdirSync(postsSrc)
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''));
for (const slug of slugs) {
  if (!existsSync(join(dist, 'post', slug, 'index.html'))) errors.push(`missing dist/post/${slug}/index.html`);
}

// Core pages and feeds.
for (const p of ['index.html', 'about/index.html', 'work/index.html', 'posts/index.html', '404.html', 'rss.xml', 'sitemap-index.xml']) {
  if (!existsSync(join(dist, p))) errors.push(`missing dist/${p}`);
}

// Every case study must build.
const workSrc = new URL('../src/content/work', import.meta.url).pathname;
for (const f of readdirSync(workSrc).filter((f) => f.endsWith('.mdx'))) {
  const slug = f.replace(/\.mdx$/, '');
  if (!existsSync(join(dist, 'work', slug, 'index.html'))) errors.push(`missing dist/work/${slug}/index.html`);
}

if (errors.length) {
  console.error('verify-dist FAILED:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`verify-dist OK — ${slugs.length} posts, CNAME, feeds and core pages present.`);
