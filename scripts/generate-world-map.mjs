/**
 * One-time generator for the impact-map base layer.
 *
 * Downloads Natural Earth 110m country shapes (public domain, via world-atlas)
 * and an ISO numeric -> alpha-2 mapping, projects them with a plain linear
 * equirectangular projection into a 1000x500 viewBox, and writes
 * src/data/world-map.json.
 *
 * The linear projection means city coordinates map with simple math:
 *   x = (lng + 180) / 360 * 1000
 *   y = (90 - lat) / 180 * 500
 */
import { writeFile } from 'node:fs/promises';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import * as shapefile from 'shapefile';

const WIDTH = 1000;
const HEIGHT = 500;

const NE_10M = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/10m_cultural/ne_10m_admin_0_disputed_areas';

const [world, isoCodes, dispShp, dispDbf] = await Promise.all([
  fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json').then((r) => r.json()),
  fetch(
    'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json'
  ).then((r) => r.json()),
  fetch(`${NE_10M}.shp`).then((r) => r.arrayBuffer()),
  fetch(`${NE_10M}.dbf`).then((r) => r.arrayBuffer()),
]);

const numericToAlpha2 = new Map(isoCodes.map((c) => [c['country-code'], c['alpha-2']]));

// Linear equirectangular: scale = width / 2π, centered.
const projection = geoEquirectangular()
  .scale(WIDTH / (2 * Math.PI))
  .translate([WIDTH / 2, HEIGHT / 2])
  .precision(0.5);
const path = geoPath(projection);

const { features } = feature(world, world.objects.countries);

const countries = [];
for (const f of features) {
  const iso = numericToAlpha2.get(String(f.id).padStart(3, '0'));
  if (!iso || iso === 'AQ') continue; // skip Antarctica + unmapped
  const d = path(f);
  if (!d) continue;
  // Round coordinates to 1 decimal to keep the JSON light.
  countries.push({ iso, name: f.properties.name, d: d.replace(/(\d+\.\d{2,})/g, (m) => Number(m).toFixed(1)) });
}

// India's borders follow India's claims: merge the Kashmir-region disputed
// polygons (Pakistan-administered Kashmir + Aksai Chin etc.) into India and
// paint India last so the claim areas cover the neighbouring fills.
const INDIA_CLAIMS = ['Azad Kashmir', 'Gilgit-Baltistan', 'Aksai Chin', 'Shaksam Valley', 'Siachen Glacier'];
const disputed = await shapefile.open(dispShp, dispDbf);
const claimPaths = [];
for (let r; !(r = await disputed.read()).done; ) {
  // dBase strings are NUL-padded to fixed width.
  const name = (r.value.properties.BRK_NAME || r.value.properties.NAME || '').replace(/\0/g, '').trim();
  if (!INDIA_CLAIMS.includes(name)) continue;
  const d = path(r.value);
  if (d) claimPaths.push(d.replace(/(\d+\.\d{2,})/g, (m) => Number(m).toFixed(1)));
}
if (claimPaths.length !== INDIA_CLAIMS.length) {
  throw new Error(`Expected ${INDIA_CLAIMS.length} India-claim polygons, got ${claimPaths.length}`);
}
const indiaIdx = countries.findIndex((c) => c.iso === 'IN');
const [india] = countries.splice(indiaIdx, 1);
india.d += claimPaths.join('');
countries.push(india);

const out = {
  viewBox: `0 30 ${WIDTH} 390`, // crop empty polar space
  width: WIDTH,
  height: HEIGHT,
  countries,
};

await writeFile(new URL('../src/data/world-map.json', import.meta.url), JSON.stringify(out));
console.log(`Wrote ${countries.length} countries to src/data/world-map.json`);
