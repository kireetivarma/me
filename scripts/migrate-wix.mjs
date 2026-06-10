#!/usr/bin/env node
/**
 * Migrate legacy Wix blog posts to Markdown content files.
 *
 * Usage:
 *   node scripts/migrate-wix.mjs            # migrate all posts
 *   node scripts/migrate-wix.mjs <slug>...  # migrate specific slugs
 *
 * Uses ONLY Node.js built-ins (fetch, fs, path). Extraction is
 * regex/string based on the server-rendered Wix HTML (the post body
 * lives under data-hook="post-description").
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts');
const ASSETS_DIR = path.join(ROOT, 'src', 'assets', 'posts');

const SITE = 'https://kireetivarma.wixsite.com/kvportfolio';
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

/** Inventory: slug | pubDate | categories | fallback title */
const INVENTORY = [
  ['my-product-journey-in-a-decade', '2025-05-25', ['Personal'], '[Product] (Design) <Dev>'],
  ['software-product-partnerships-and-their-large-scale-impact', '2025-04-30', ['Personal'], 'Software Product Partnerships Impact!'],
  ['grok-ai-review-zomato-blinkit-widgets-on-oneplus-shelf', '2025-03-16', ['Review'], 'Grok AI Review: Zomato & Blinkit widgets on OnePlus Shelf'],
  ['grok-ai-review-zomato-swiggy-food-delivery-updates-on-oneplus-aod', '2025-03-14', ['Review'], 'Grok AI Review: Zomato & Swiggy food delivery updates on OnePlus AOD'],
  ['eternal-never-settles-zomato-blinkit-on-oneplus-shelf', '2025-01-30', ['Partnership', 'Product'], '"Eternal Never Settles": Zomato & Blinkit on OnePlus Shelf'],
  ['enabling-secure-script-sharing-for-writers', '2024-04-30', ['Development', 'Product', 'Consulting'], 'Enabling secure script sharing for writers with Itihasa Collective'],
  ['whatsapp-personal-business-chat-pages', '2023-04-29', ['Personal'], 'WhatsApp business chat pages'],
  ['oneplus-partnership-integration-with-zomato-swiggy-for-food-deliveries-on-aod-always-on-display', '2023-03-30', ['Partnership', 'Product'], "OnePlus' Partnership Integration with Zomato & Swiggy for Food Deliveries on AOD"],
  ['spotify-made-for-you-on-oneplus-shelf-integrating-music-service-on-your-mobile', '2022-03-09', ['Partnership', 'Product'], 'Spotify made-for-you on OnePlus Shelf'],
  ['redesigning-oneplus-shelf-from-the-ground-up-to-improve-ux-enable-partner-integrations', '2021-10-05', ['Product', 'Partnership'], 'Redesigning OnePlus Shelf from the ground up to improve UX & enable partner integrations'],
  ['scaling-oneplus-scout-globally-users', '2021-04-30', ['Product', 'Partnership'], 'Scaling OnePlus Scout to Global users'],
  ['keeping-off-from-distractions', '2020-09-29', ['Personal'], 'Keeping off from distractions'],
  ['oneplus-nearby-charging-stations-at-airport-gates', '2020-08-31', ['Product'], 'OnePlus Nearby Charging Stations at airports'],
  ['future-tech-series-imagining-a-future-with-technology-ed-01-everyday-things-at-living', '2020-06-28', ['Personal'], 'Future Tech Series - Ed. 01: Everyday things at living'],
  ['online-last-seen-green-dots-blue-ticks-a-hypothetical-footprint', '2020-06-21', ['Personal'], 'Online, Last Seen, Green Dots & Blue Ticks: A hypothetical footprint'],
  ['bite-sized-learning-app-for-startup-founders-station91', '2019-05-31', ['Design', 'Consulting', 'Product'], 'Bite-sized learning app for startup founders: Station91'],
  ['cofounding-an-nlidb-saas-product-imux', '2019-01-10', ['Design', 'Product'], 'Cofounding an NLiDB SaaS Product, Imux'],
  ['data-collection-pwa-for-a-medical-ngo', '2018-11-30', ['Design', 'Consulting', 'Product'], 'Data collection PWA for a medical NGO'],
  ['helping-cab-drivers-to-file-income-tax-returns', '2018-08-01', ['Design', 'Consulting', 'Product'], 'Helping cab drivers to file income tax returns'],
  ['designing-a-new-saas-model-for-rentals', '2018-05-31', ['Design', 'Consulting'], 'Designing a new SaaS model for rentals'],
  ['helping-people-build-short-blogs-with-tymline', '2017-12-15', ['Design', 'Product'], 'Building short blogs with Tymline'],
  ['programming-traffic-on-streets', '2017-07-24', ['Personal'], 'Programming Traffic on Streets'],
  ['how-you-can-enable-cross-device-notifications-using-a-simple-ifttt', '2016-04-16', ['Personal', 'Tech'], 'How you can enable cross device notifications using a simple IFTTT'],
];

const ALL_SLUGS = new Set(INVENTORY.map((p) => p[0]));

/* ---------------------------------------------------------------- */
/* Utilities                                                         */
/* ---------------------------------------------------------------- */

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  ndash: '–', mdash: '—', hellip: '…', rsquo: '’',
  lsquo: '‘', rdquo: '”', ldquo: '“', copy: '©',
  trade: '™', reg: '®', deg: '°', middot: '·', bull: '•',
};

function decodeEntities(str) {
  if (!str) return '';
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => NAMED_ENTITIES[name] ?? m);
}

async function fetchText(url, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*' },
        redirect: 'follow',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return await res.text();
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw lastErr;
}

async function fetchBuffer(url, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow' });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      const buf = Buffer.from(await res.arrayBuffer());
      return { buf, contentType: res.headers.get('content-type') || '' };
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw lastErr;
}

/** Strip Wix image transform suffix to get the original media URL. */
function stripWixTransform(url) {
  return url.replace(/\/v1\/(fill|fit|crop|fill_lg)\/.*$/, '');
}

function extFromUrlOrType(url, contentType) {
  const m = url.match(/\.(jpe?g|png|webp|avif|gif)(?:$|[?#])/i);
  if (m) return m[1].toLowerCase().replace('jpeg', 'jpg');
  const map = {
    'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp',
    'image/avif': 'avif', 'image/gif': 'gif',
  };
  const ct = (contentType || '').split(';')[0].trim();
  return map[ct] || 'jpg';
}

/** Old slugs that now resolve to a different canonical slug on the Wix site. */
const SLUG_ALIASES = {
  'i-asked-grok-to-review-a-feature-release':
    'grok-ai-review-zomato-blinkit-widgets-on-oneplus-shelf',
};

/** Rewrite the author's own post links to root-relative paths. */
function rewriteInternalLink(href) {
  const m = href.match(
    /^https?:\/\/(?:www\.)?(?:kireetivarma\.wixsite\.com\/kvportfolio|kireetivarma\.me)\/post\/([\w-]+)/i
  );
  if (!m) return href;
  const slug = SLUG_ALIASES[m[1]] || m[1];
  if (ALL_SLUGS.has(slug)) return `/${slug}/`;
  return href; // unknown target: keep the original URL
}

function escapeMdText(text) {
  // Escape only characters that would break markdown structure.
  return text.replace(/([\\*_[\]])/g, '\\$1');
}

/* ---------------------------------------------------------------- */
/* HTML -> Markdown converter (string tokenizer, no deps)            */
/* ---------------------------------------------------------------- */

const SKIP_TAGS = new Set(['script', 'style', 'svg', 'button', 'noscript', 'template']);
const VOID_TAGS = new Set(['br', 'img', 'hr', 'meta', 'link', 'input', 'source', 'wbr']);

/**
 * Convert a Wix post-body HTML fragment to markdown.
 * Returns { markdown, images } where images is an array of
 * { url (original, transform-stripped), alt } in document order.
 * Image positions in markdown are placeholders: @@IMG<i>@@
 */
function htmlToMarkdown(html) {
  const tokenRe = /<!--[\s\S]*?-->|<\/?([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)\/?>|[^<]+/g;
  const images = [];
  const blocks = [];

  // state
  let skipTag = null;
  let skipDepth = 0;
  const listStack = []; // {type:'ul'|'ol', counter}
  let blockquoteDepth = 0;
  let curBlock = null; // {prefix, text}
  const fmtStack = []; // {marker, startLen} for strong/em spans
  const linkStack = [];
  let lastImgBase = null;

  function openBlock(prefix = '') {
    if (curBlock) closeBlock();
    curBlock = { prefix, text: '' };
  }
  function applyFmt(ent) {
    if (!curBlock || ent.startLen > curBlock.text.length) return;
    const inner = curBlock.text.slice(ent.startLen);
    const core = inner.trim();
    if (!core) return;
    const lead = inner.match(/^\s*/)[0];
    const trail = inner.match(/\s*$/)[0];
    curBlock.text =
      curBlock.text.slice(0, ent.startLen) + lead + ent.marker + core + ent.marker + trail;
  }
  function closeFmt(marker) {
    for (let k = fmtStack.length - 1; k >= 0; k--) {
      if (fmtStack[k].marker === marker) {
        applyFmt(fmtStack.splice(k, 1)[0]);
        return;
      }
    }
  }
  function closeBlock() {
    if (!curBlock) return;
    // force-close formatting left open inside this block
    while (fmtStack.length) applyFmt(fmtStack.pop());
    let text = curBlock.text.replace(/[ \t]+/g, ' ').trim();
    // bold inside headings is redundant; drop the markers
    if (curBlock.prefix.startsWith('#')) text = text.replace(/\*\*/g, '');
    // drop empty emphasis artifacts
    text = text.replace(/\*\*\s*\*\*/g, ' ').replace(/[ \t]+/g, ' ').trim();
    if (text && text !== '*' && text !== '**') {
      let line = curBlock.prefix + text;
      if (blockquoteDepth > 0) {
        line = line
          .split('\n')
          .map((l) => '> '.repeat(blockquoteDepth) + l)
          .join('\n');
      }
      blocks.push(line);
    }
    curBlock = null;
  }
  function append(text) {
    if (!curBlock) openBlock('');
    curBlock.text += text;
  }

  function attr(attrs, name) {
    const m = attrs.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
    return m ? decodeEntities(m[2] ?? m[3] ?? '') : null;
  }

  let m;
  while ((m = tokenRe.exec(html)) !== null) {
    const tok = m[0];
    if (tok.startsWith('<!--')) continue;

    if (tok[0] !== '<') {
      // text node
      if (skipTag) continue;
      const text = decodeEntities(tok)
        .replace(/[\u200B\u200C\u200D\uFEFF]/g, '') // zero-width chars
        .replace(/\s+/g, ' ');
      if (text.trim() || (curBlock && curBlock.text)) append(escapeMdText(text));
      continue;
    }

    const isClose = tok[1] === '/';
    const tag = (m[1] || '').toLowerCase();
    const attrs = m[2] || '';
    const selfClose = /\/>$/.test(tok) || VOID_TAGS.has(tag);

    // skip-mode handling
    if (skipTag) {
      if (tag === skipTag && !selfClose) {
        if (isClose) {
          skipDepth--;
          if (skipDepth === 0) skipTag = null;
        } else {
          skipDepth++;
        }
      }
      continue;
    }
    if (!isClose && SKIP_TAGS.has(tag)) {
      if (!selfClose) {
        skipTag = tag;
        skipDepth = 1;
      }
      continue;
    }

    switch (tag) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6': {
        if (isClose) {
          closeBlock();
        } else {
          const lvl = parseInt(tag[1], 10);
          openBlock(lvl <= 2 ? '## ' : '### ');
        }
        break;
      }
      case 'p':
        if (isClose) closeBlock();
        else openBlock('');
        break;
      case 'blockquote':
        if (isClose) {
          closeBlock();
          blockquoteDepth = Math.max(0, blockquoteDepth - 1);
        } else {
          closeBlock();
          blockquoteDepth++;
        }
        break;
      case 'ul':
      case 'ol':
        if (isClose) {
          closeBlock();
          listStack.pop();
        } else {
          closeBlock();
          listStack.push({ type: tag, counter: 0 });
        }
        break;
      case 'li': {
        if (isClose) {
          closeBlock();
        } else {
          const list = listStack[listStack.length - 1] || { type: 'ul', counter: 0 };
          list.counter++;
          const indent = '  '.repeat(Math.max(0, listStack.length - 1));
          const marker = list.type === 'ol' ? `${list.counter}. ` : '- ';
          openBlock(indent + marker);
        }
        break;
      }
      case 'br':
        // ricos uses empty-line divs with <br/>; treat as soft separator
        if (curBlock && curBlock.text.trim()) append(' ');
        break;
      case 'strong':
      case 'b':
        if (isClose) {
          closeFmt('**');
        } else {
          if (!curBlock) openBlock('');
          fmtStack.push({ marker: '**', startLen: curBlock.text.length });
        }
        break;
      case 'em':
      case 'i':
        if (isClose) {
          closeFmt('*');
        } else {
          if (!curBlock) openBlock('');
          fmtStack.push({ marker: '*', startLen: curBlock.text.length });
        }
        break;
      case 'a': {
        if (isClose) {
          const link = linkStack.pop();
          if (link && curBlock) {
            const label = curBlock.text.slice(link.startLen).trim();
            curBlock.text = curBlock.text.slice(0, link.startLen);
            if (label) curBlock.text += `[${label}](${link.href})`;
            else curBlock.text += '';
          }
        } else {
          let href = attr(attrs, 'href');
          if (href && !href.startsWith('javascript:')) {
            href = rewriteInternalLink(href.trim());
            if (!curBlock) openBlock('');
            linkStack.push({ href, startLen: curBlock.text.length });
          } else {
            linkStack.push(null);
          }
        }
        break;
      }
      case 'img': {
        const src = attr(attrs, 'src') || '';
        if (src.includes('static.wixstatic.com/media/')) {
          const base = stripWixTransform(src);
          if (base !== lastImgBase) {
            lastImgBase = base;
            const alt = (attr(attrs, 'alt') || '').trim();
            images.push({ url: base, alt });
            closeBlock();
            blocks.push(`@@IMG${images.length - 1}@@`);
          }
        }
        break;
      }
      case 'iframe': {
        const src = attr(attrs, 'src');
        if (src && /^https?:/.test(src)) {
          closeBlock();
          blocks.push(`[Embedded content](${src})`);
        }
        break;
      }
      case 'figure':
        if (!isClose) lastImgBase = null; // new figure -> new image context
        break;
      case 'figcaption':
        if (isClose) closeBlock();
        else openBlock('*');
        break;
      case 'div':
        // gallery item boundary: allow repeated distinct images, but the
        // blur-preview + real img pairs share the same base and get deduped.
        break;
      default:
        break;
    }
  }
  closeBlock();

  // figcaption italic blocks: ensure closing '*'
  const out = blocks
    .map((b) => (b.startsWith('*') && !b.endsWith('*') && !b.startsWith('**') ? b + '*' : b))
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return { markdown: out, images };
}

/* ---------------------------------------------------------------- */
/* Page-level extraction                                             */
/* ---------------------------------------------------------------- */

function metaContent(html, property) {
  const re = new RegExp(`<meta[^>]+property="${property}"[^>]+content="([^"]*)"`, 'i');
  const m = html.match(re) || html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+property="${property}"`, 'i'));
  return m ? decodeEntities(m[1]) : null;
}

function extractH1(html) {
  const m = html.match(/<h1[^>]*data-hook="post-title"[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return null;
  return decodeEntities(m[1].replace(/<[^>]+>/g, '')).trim();
}

function extractBody(html) {
  let start = html.indexOf('data-hook="post-description"');
  if (start === -1) return null;
  start = html.indexOf('>', start) + 1; // skip rest of the opening tag
  const end = html.indexOf('<footer', start);
  return html.slice(start, end === -1 ? undefined : end);
}

/** First real paragraph of the markdown body (no headings/images/quotes). */
function firstParagraph(markdown) {
  for (const block of markdown.split(/\n\n+/)) {
    const b = block.trim();
    if (!b || /^(#|!\[|@@IMG|>|[-*] |\d+\. |\*)/.test(b)) continue;
    return b.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_\\]/g, '');
  }
  return '';
}

function yamlString(str) {
  return JSON.stringify(str); // double-quoted with proper escapes, valid YAML
}

function trimDescription(text, max = 160) {
  let t = (text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  t = t.slice(0, max);
  const cut = t.lastIndexOf(' ');
  if (cut > 60) t = t.slice(0, cut);
  return t.replace(/[\s,;:.…]+$/, '') + '…';
}

/* ---------------------------------------------------------------- */
/* Migration per post                                                */
/* ---------------------------------------------------------------- */

async function downloadImage(url, destBase) {
  // destBase: absolute path without extension. Returns relative filename or null.
  const tryUrls = [url, `${url}/v1/fit/w_2500,h_2500,q_90/file.jpg`];
  for (const u of tryUrls) {
    try {
      const { buf, contentType } = await fetchBuffer(u);
      if (!buf.length || !/image\//.test(contentType || 'image/')) continue;
      const ext = extFromUrlOrType(url, contentType);
      const dest = `${destBase}.${ext}`;
      fs.writeFileSync(dest, buf);
      return path.basename(dest);
    } catch {
      /* try next variant */
    }
  }
  return null;
}

function findExisting(destBase) {
  for (const ext of ['jpg', 'png', 'webp', 'avif', 'gif']) {
    const p = `${destBase}.${ext}`;
    if (fs.existsSync(p) && fs.statSync(p).size > 0) return path.basename(p);
  }
  return null;
}

async function migratePost([slug, pubDate, categories, fallbackTitle]) {
  const url = `${SITE}/post/${slug}`;
  const result = { slug, status: 'complete', words: 0, images: 0, notes: [] };

  let html = null;
  try {
    html = await fetchText(url);
  } catch (e) {
    result.notes.push(`page fetch failed: ${e.message}`);
  }

  let title = fallbackTitle;
  let description = '';
  let heroUrl = null;
  let body = { markdown: '', images: [] };

  if (html) {
    const ogTitle = metaContent(html, 'og:title');
    const h1 = extractH1(html);
    title = (ogTitle || h1 || fallbackTitle).trim();
    description = metaContent(html, 'og:description') || '';
    const ogImage = metaContent(html, 'og:image');
    if (ogImage && ogImage.includes('static.wixstatic.com/media/')) {
      heroUrl = stripWixTransform(ogImage);
    }
    const bodyHtml = extractBody(html);
    if (bodyHtml) {
      body = htmlToMarkdown(bodyHtml);
    } else {
      result.status = 'incomplete';
      result.notes.push('post body not found in HTML');
    }
  } else {
    result.status = 'incomplete';
  }

  // If first body image duplicates the hero, drop it from the body.
  const heroBase = heroUrl;
  let bodyImages = body.images;
  let markdown = body.markdown;
  if (heroBase && bodyImages.length && bodyImages[0].url === heroBase) {
    markdown = markdown.replace('@@IMG0@@', '').replace(/^\n+/, '');
    if (!result.heroAlt && bodyImages[0].alt) result.heroAlt = bodyImages[0].alt;
    bodyImages = bodyImages.slice(1);
    // reindex placeholders
    markdown = markdown.replace(/@@IMG(\d+)@@/g, (_, n) => `@@IMG${parseInt(n, 10) - 1}@@`);
  }

  // assets dir
  const assetDir = path.join(ASSETS_DIR, slug);
  if (heroBase || bodyImages.length) fs.mkdirSync(assetDir, { recursive: true });

  // hero
  let heroFile = null;
  if (heroBase) {
    heroFile = findExisting(path.join(assetDir, 'hero'));
    if (!heroFile) heroFile = await downloadImage(heroBase, path.join(assetDir, 'hero'));
    if (heroFile) result.images++;
    else result.notes.push('hero image download failed');
  }

  // body images
  for (let i = 0; i < bodyImages.length; i++) {
    const name = String(i + 1).padStart(2, '0');
    let file = findExisting(path.join(assetDir, name));
    if (!file) file = await downloadImage(bodyImages[i].url, path.join(assetDir, name));
    if (file) {
      result.images++;
      const alt = (bodyImages[i].alt || '').replace(/[[\]]/g, '');
      markdown = markdown.replace(`@@IMG${i}@@`, `![${alt}](../../assets/posts/${slug}/${file})`);
    } else {
      result.notes.push(`image ${i + 1} download failed (${bodyImages[i].url})`);
      markdown = markdown.replace(`@@IMG${i}@@`, '');
    }
  }
  markdown = markdown.replace(/\n{3,}/g, '\n\n').trim();

  // og:description on Wix is sometimes an auto-mash of heading+paragraph
  // (e.g. "Early Product & DesignI started..."). Prefer the first real
  // paragraph in that case, or when og:description is missing.
  const para = firstParagraph(markdown);
  const headingMatch = markdown.match(/^#{2,3} (.+)$/m);
  const firstHeading = headingMatch ? headingMatch[1].replace(/[*_\\]/g, '').trim() : null;
  if (!description) {
    description = para;
  } else if (
    firstHeading &&
    description.startsWith(firstHeading) &&
    description.length > firstHeading.length &&
    !/\s|[.!?:]/.test(description[firstHeading.length])
  ) {
    description = para || description;
  }

  result.words = markdown ? markdown.split(/\s+/).length : 0;
  if (!markdown) {
    result.status = 'incomplete';
    result.notes.push('empty body');
  }

  // frontmatter
  const lines = ['---'];
  lines.push(`title: ${yamlString(title)}`);
  lines.push(`description: ${yamlString(trimDescription(description))}`);
  lines.push(`pubDate: ${pubDate}`);
  lines.push(`categories: [${categories.join(', ')}]`);
  if (heroFile) {
    lines.push(`heroImage: "../../assets/posts/${slug}/${heroFile}"`);
    lines.push(`heroImageAlt: ${yamlString(result.heroAlt || title)}`);
  }
  lines.push(`wixUrl: "${url}"`);
  lines.push('---');

  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), lines.join('\n') + '\n\n' + markdown + '\n');

  console.log(
    `[${result.status}] ${slug} (${result.words} words, ${result.images} images)` +
      (result.notes.length ? ` NOTES: ${result.notes.join('; ')}` : '')
  );
  return result;
}

/* ---------------------------------------------------------------- */
/* Main                                                              */
/* ---------------------------------------------------------------- */

const args = process.argv.slice(2);
const targets = args.length ? INVENTORY.filter((p) => args.includes(p[0])) : INVENTORY;
if (args.length && targets.length !== args.length) {
  const known = new Set(targets.map((t) => t[0]));
  for (const a of args) if (!known.has(a)) console.error(`Unknown slug: ${a}`);
}

const results = [];
for (const post of targets) {
  results.push(await migratePost(post));
}

const incomplete = results.filter((r) => r.status !== 'complete');
console.log(`\nDone: ${results.length} posts, ${incomplete.length} incomplete.`);
if (incomplete.length) for (const r of incomplete) console.log(`  INCOMPLETE: ${r.slug}`);
