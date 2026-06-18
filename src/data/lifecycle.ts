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

export const STAGE_FULL: Record<LifecycleStage, string> = {
  discovery: 'Discovery',
  research: 'Research',
  strategy: 'Strategy',
  design: 'Design',
  build: 'Build',
  test: 'Test',
  launch: 'Launch',
  ops: 'Ops',
};

export interface ProjectCoverage {
  slug: string;
  stages: Partial<Record<LifecycleStage, Coverage>>;
  phaseLines: Partial<Record<LifecycleStage, string>>;
}

// Ordered by contribution breadth: deepest ownership first.
export const lifecycle: ProjectCoverage[] = [
  {
    slug: 'product-f',
    stages: { discovery: 'led', research: 'led', strategy: 'led', design: 'led', build: 'led', test: 'led', launch: 'led', ops: 'led' },
    phaseLines: {
      discovery: 'Mapped pain points across 50+ PM workflows and AI tool gaps',
      research: 'Synthesized interviews with PMs across startup and enterprise orgs',
      strategy: 'Defined the AI OS positioning, v1 scope, and monetisation model',
      design: 'Built and iterated the core UX through five research cycles',
      build: 'Shipped the waitlist, landing page, and V1 prototype solo',
      test: 'Ran closed alpha with early users and iterated on all feedback',
      launch: 'Coordinated waitlist launch across Product Hunt and PM communities',
      ops: 'Managing growth loops, feedback channels, and live roadmap',
    },
  },
  {
    slug: 'pro-studio-space',
    stages: { discovery: 'led', research: 'led', strategy: 'led', design: 'led', build: 'led', test: 'led', launch: 'led', ops: 'led' },
    phaseLines: {
      discovery: 'Scoped the creator studio booking gap across city markets',
      research: 'Interviewed studio owners and creators to map the booking pain chain',
      strategy: 'Designed the platform model, pricing tiers, and differentiation angle',
      design: 'Created all UI flows from booking to studio profile management',
      build: 'Built the full product end-to-end as sole engineer and PM',
      test: 'Ran live testing with real studio sessions and edge cases',
      launch: 'Took the product live with founding studios onboard',
      ops: 'Managed onboarding, platform health, and studio partner relations',
    },
  },
  {
    slug: 'itihasa-collective',
    stages: { discovery: 'co', research: 'led', strategy: 'led', design: 'led', build: 'led', test: 'co', launch: 'led', ops: 'supported' },
    phaseLines: {
      discovery: 'Co-identified the cultural content gap with founding collaborators',
      research: 'Led research into how Indian heritage is documented and shared digitally',
      strategy: 'Defined the editorial model, content taxonomy, and community structure',
      design: 'Designed the full reading and contribution experience',
      build: 'Architected and built the publication platform',
      test: 'Co-reviewed the alpha with founding contributors',
      launch: 'Orchestrated the public launch and founding contributor onboarding',
      ops: 'Supported ongoing editorial ops and community growth',
    },
  },
  {
    slug: 'petfolk',
    stages: { discovery: 'co', research: 'led', strategy: 'led', design: 'led', build: 'led', test: 'co', launch: 'led', ops: 'supported' },
    phaseLines: {
      discovery: 'Co-explored the pet care market and service gap with a co-founder',
      research: 'Led user research with pet owners across three city markets',
      strategy: 'Defined the service model, pricing tiers, and go-to-market',
      design: 'Designed all core flows from booking to provider profiles',
      build: 'Built the MVP web product from scratch',
      test: 'Co-tested the booking flow with early pet owners',
      launch: 'Coordinated the pilot launch in the founding city',
      ops: 'Supported growth metrics and provider ops in early months',
    },
  },
  {
    slug: 'labh',
    stages: { research: 'supported', strategy: 'led', design: 'led', launch: 'supported' },
    phaseLines: {
      research: 'Supported market sizing and user segmentation for the fintech offering',
      strategy: 'Led product strategy and vertical positioning',
      design: 'Defined and led UX for the core investment flow',
      launch: 'Supported the go-to-market execution and partner onboarding',
    },
  },
  {
    slug: 'reporting-hub',
    stages: { research: 'led', design: 'led', build: 'supported' },
    phaseLines: {
      research: 'Led discovery research and requirements gathering with stakeholder teams',
      design: 'Designed the reporting interface and data visualisation system',
      build: 'Supported implementation of key dashboard components',
    },
  },
  {
    slug: 'oneplus-shelf',
    stages: { discovery: 'led', research: 'led', strategy: 'led', design: 'co', build: 'led', test: 'led', launch: 'led', ops: 'led' },
    phaseLines: {
      discovery: 'Reframed Shelf from a utility drawer into a partner platform',
      research: 'Led consumer research across 10 markets to define personalisation needs',
      strategy: 'Defined the partner integration model and three-year roadmap',
      design: 'Co-led the UX redesign with the design team across 9 shipped screens',
      build: 'Led engineering partnership to ship the Shelf partner API',
      test: 'Led QA across 6 OEM variants and 3 OS versions',
      launch: 'Managed the OxygenOS 13 rollout to 40M+ devices',
      ops: 'Owned the DAU/MAU growth loops, achieving 4x MAU',
    },
  },
  {
    slug: 'oneplus-scout',
    stages: { discovery: 'led', research: 'led', strategy: 'led', design: 'co', build: 'led', test: 'led', launch: 'led', ops: 'led' },
    phaseLines: {
      discovery: 'Identified the on-device AI search gap in OxygenOS',
      research: 'Led research across 50+ countries on search intent patterns',
      strategy: 'Defined Scout as the ambient intelligence layer of OxygenOS',
      design: 'Co-led UX from concept to shipped product with the design team',
      build: 'Drove the engineering partnership to ship the NLP engine',
      test: 'Led testing across 50+ device models and 12 OS languages',
      launch: 'Shipped to 200M+ users as a flagship OxygenOS feature',
      ops: 'Owned CTR optimisation, doubling click-through rate',
    },
  },
  {
    slug: 'live-alerts-shelf-food-transit-music',
    stages: { discovery: 'led', research: 'led', strategy: 'led', design: 'co', build: 'co', test: 'co', launch: 'co', ops: 'co' },
    phaseLines: {
      discovery: 'Identified AOD and Shelf as untapped partner surfaces for Indian users',
      research: 'Led research on food delivery habits and notification fatigue',
      strategy: 'Defined Live Alerts as a reusable partnership template for Shelf',
      design: 'Co-designed widget UI with Zomato and Blinkit design teams',
      build: 'Co-built the Shelf integration with platform engineering',
      test: 'Co-tested across Zomato and Blinkit API environments',
      launch: "Co-managed a coordinated launch with Zomato's marketing team",
      ops: 'Co-owned partner success metrics and integration health',
    },
  },
  {
    slug: 'food-delivery-aod',
    stages: { discovery: 'led', research: 'led', design: 'supported', build: 'co', test: 'supported', launch: 'led', ops: 'co' },
    phaseLines: {
      discovery: 'Identified AOD as an untapped ambient surface for live delivery alerts',
      research: 'Led research on food delivery anxiety and lock screen glanceability',
      design: 'Supported visual design of the AOD overlay notification system',
      build: 'Co-built the notification pipeline with platform engineering',
      test: 'Supported compatibility testing across AOD hardware variants',
      launch: 'Led the industry-first food delivery AOD feature launch',
      ops: 'Co-managed partner integrations and monitored live alert reliability',
    },
  },
  {
    slug: 'spotify-on-shelf',
    stages: { discovery: 'led', research: 'co', strategy: 'led', design: 'co', build: 'led', test: 'co', launch: 'led', ops: 'co' },
    phaseLines: {
      discovery: "Identified music personalisation as Shelf's highest-engagement use case",
      research: "Co-explored Spotify's Made for You API and integration model",
      strategy: 'Defined the music card format and personalised playlist surfacing',
      design: "Co-designed the music card UX with Spotify's integration team",
      build: "Led engineering integration of Spotify's recommendation API into Shelf",
      test: 'Co-tested across playlist edge cases and connectivity states',
      launch: 'Led the coordinated launch announcement with Spotify',
      ops: 'Co-managed engagement metrics and playlist refresh cadence',
    },
  },
  {
    slug: 'nearby-charging-stations',
    stages: { discovery: 'co', research: 'supported', strategy: 'led', design: 'co', build: 'led', test: 'led', launch: 'led', ops: 'supported' },
    phaseLines: {
      discovery: 'Co-identified the EV range anxiety gap in OxygenOS navigation',
      research: 'Supported competitive analysis of charging network integrations',
      strategy: 'Defined the charging station discovery and proximity notification system',
      design: 'Co-designed the station map overlay and proximity alert flows',
      build: 'Led backend integration with charging network data providers',
      test: 'Led live testing across charging APIs and network edge cases',
      launch: 'Led the OxygenOS 14 feature release and user comms',
      ops: 'Supported accuracy monitoring and charging network partner updates',
    },
  },
  {
    slug: 'imux',
    stages: { discovery: 'co', research: 'led', strategy: 'led', design: 'led', build: 'co', test: 'co', launch: 'led', ops: 'led' },
    phaseLines: {
      discovery: 'Co-identified the natural language database query gap in enterprise tools',
      research: 'Led research with analysts and managers on SQL bottlenecks',
      strategy: 'Led the go-to-market strategy for the NLIDB SaaS model',
      design: 'Led UX for the natural language query interface and results system',
      build: 'Co-built the core NL query engine and schema detection module',
      test: 'Co-ran testing with enterprise beta users across three industries',
      launch: 'Led the public product launch and enterprise pilot programme',
      ops: 'Led customer success and iterated the product from live feedback',
    },
  },
  {
    slug: 'cabdost',
    stages: { discovery: 'led', research: 'led', strategy: 'led', design: 'led', build: 'led', test: 'co', launch: 'led', ops: 'supported' },
    phaseLines: {
      discovery: 'Led field research with Ola and Uber drivers on financial pain points',
      research: 'Led deep-dive research into gig worker ITR filing barriers',
      strategy: 'Defined the agent-assisted self-service tax filing model',
      design: 'Led all UX from the filing flow to the agent dashboard',
      build: 'Led the full product build as co-founder and product lead',
      test: 'Co-tested with a pilot cohort of drivers and field agents',
      launch: 'Led the launch across Bengaluru with the founding agent network',
      ops: 'Supported post-launch ops and agent onboarding',
    },
  },
  {
    slug: 'station91',
    stages: { discovery: 'co', research: 'led', strategy: 'co', design: 'led', build: 'supported', test: 'co', launch: 'co', ops: 'supported' },
    phaseLines: {
      discovery: 'Co-scoped the digital workspace model with the founding team',
      research: 'Led user research on remote creative team workflows and needs',
      strategy: 'Co-defined the workspace positioning and membership structure',
      design: 'Led UX and visual design across the platform and member flows',
      build: 'Supported engineering handoff and implementation review',
      test: 'Co-ran UAT with founding members',
      launch: 'Co-managed the membership launch and onboarding process',
      ops: 'Supported post-launch member feedback and iteration',
    },
  },
  {
    slug: 'incola',
    stages: { research: 'co', strategy: 'supported', design: 'led', build: 'supported' },
    phaseLines: {
      research: 'Co-researched the Australian rental market and bond payment anxiety',
      strategy: 'Supported business model validation and information architecture',
      design: 'Led UX design for the onboarding flow and tenant dashboard',
      build: 'Supported technical handoff and implementation review',
    },
  },
  {
    slug: 'swasth',
    stages: { discovery: 'led', research: 'led', strategy: 'supported', design: 'led' },
    phaseLines: {
      discovery: 'Led field observation at Mumbai health drives to map agent pain points',
      research: 'Led research with NGO staff, agents, and health workers on data workflows',
      strategy: 'Supported scope definition and feature prioritisation for the MVP',
      design: 'Led UX design for the data collection PWA and all agent flows',
    },
  },
  {
    slug: 'tymline',
    stages: { discovery: 'led', research: 'co', design: 'led', build: 'supported', test: 'led', launch: 'led', ops: 'supported' },
    phaseLines: {
      discovery: 'Identified the gap for chronological, multi-media social content',
      research: 'Co-researched social blogging patterns and user content habits',
      design: 'Led all 11 design iterations from rough sketches to shipped visual language',
      build: 'Supported implementation with dev partners',
      test: 'Led usability testing across all 11 design rounds',
      launch: 'Coordinated the product launch across channels',
      ops: 'Supported early user onboarding and iteration',
    },
  },
];
