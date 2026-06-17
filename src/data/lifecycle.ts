// Lifecycle coverage data for the homepage "Full Stack Product" section.
// Each project is a horizontal track across the product lifecycle stages;
// per-stage coverage shows where Kireeti led, co-led, or supported the work.

export type LifecycleStage =
  | 'discovery'
  | 'research'
  | 'strategy'
  | 'design'
  | 'build'
  | 'test'
  | 'launch'
  | 'ops';

export type Coverage = 'led' | 'co' | 'supported';

export const STAGES: LifecycleStage[] = [
  'discovery',
  'research',
  'strategy',
  'design',
  'build',
  'test',
  'launch',
  'ops',
];

export const STAGE_LABELS: Record<LifecycleStage, string> = {
  discovery: 'Disc',
  research: 'Rsch',
  strategy: 'Stgy',
  design: 'Dsgn',
  build: 'Build',
  test: 'Test',
  launch: 'Launch',
  ops: 'Ops',
};

export const STAGE_FULL: Record<LifecycleStage, string> = {
  discovery: 'Discovery',
  research: 'Research',
  strategy: 'Strategy',
  design: 'Design',
  build: 'Build',
  test: 'Test / QA',
  launch: 'Launch',
  ops: 'Growth / Ops',
};

// Era order drives the grouping; only these three are shown in this chart.
export const ERA_LABELS: Record<string, string> = {
  agency: 'Agency · 2017–2019',
  oneplus: 'OnePlus · 2019–2025',
  builder: 'Builder · 2024–now',
};

export interface ProjectCoverage {
  slug: string;
  era: 'agency' | 'oneplus' | 'builder';
  stages: Partial<Record<LifecycleStage, Coverage>>;
}

export const lifecycle: ProjectCoverage[] = [
  // Agency
  { slug: 'tymline', era: 'agency', stages: { discovery: 'led', design: 'led', build: 'supported', test: 'led', launch: 'led' } },
  { slug: 'station91', era: 'agency', stages: { discovery: 'co', research: 'led', strategy: 'co', design: 'led', build: 'supported', test: 'co', launch: 'co' } },
  { slug: 'cabdost', era: 'agency', stages: { discovery: 'led', research: 'led', strategy: 'led', design: 'led', build: 'led', launch: 'led' } },
  { slug: 'incola', era: 'agency', stages: { research: 'co', design: 'led' } },
  { slug: 'swasth', era: 'agency', stages: { discovery: 'co', research: 'led', design: 'led' } },
  { slug: 'imux', era: 'agency', stages: { discovery: 'co', research: 'led', strategy: 'led', design: 'led', build: 'co', test: 'co', launch: 'led', ops: 'led' } },

  // OnePlus
  { slug: 'nearby-charging-stations', era: 'oneplus', stages: { discovery: 'co', strategy: 'led', design: 'co', build: 'led', test: 'led', launch: 'led' } },
  { slug: 'oneplus-scout', era: 'oneplus', stages: { discovery: 'led', research: 'led', strategy: 'led', design: 'led', build: 'led', test: 'led', launch: 'led', ops: 'led' } },
  { slug: 'oneplus-shelf', era: 'oneplus', stages: { discovery: 'led', research: 'led', strategy: 'led', design: 'co', build: 'led', test: 'led', launch: 'led', ops: 'led' } },
  { slug: 'spotify-on-shelf', era: 'oneplus', stages: { strategy: 'led', design: 'co', build: 'led', test: 'co', launch: 'led', ops: 'co' } },
  { slug: 'food-delivery-aod', era: 'oneplus', stages: { discovery: 'led', strategy: 'led', build: 'co', launch: 'led', ops: 'co' } },
  { slug: 'zomato-blinkit-shelf', era: 'oneplus', stages: { discovery: 'led', strategy: 'led', design: 'co', build: 'co', launch: 'co', ops: 'co' } },

  // Builder
  { slug: 'itihasa-collective', era: 'builder', stages: { discovery: 'co', research: 'led', strategy: 'led', design: 'led', build: 'led', test: 'co', launch: 'led' } },
  { slug: 'labh', era: 'builder', stages: { discovery: 'co', research: 'co', strategy: 'led', design: 'led', launch: 'co' } },
  { slug: 'petfolk', era: 'builder', stages: { discovery: 'co', strategy: 'led', design: 'led', build: 'led', launch: 'led' } },
  { slug: 'reporting-hub', era: 'builder', stages: { research: 'led', design: 'led', test: 'co' } },
  { slug: 'pro-studio-space', era: 'builder', stages: { discovery: 'led', research: 'co', strategy: 'led', design: 'led', build: 'led', test: 'co', launch: 'led', ops: 'co' } },
  { slug: 'product-f', era: 'builder', stages: { discovery: 'led', research: 'led', strategy: 'led', design: 'led', build: 'led', test: 'led', launch: 'led', ops: 'led' } },
];
