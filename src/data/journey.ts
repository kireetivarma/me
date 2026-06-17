/**
 * Career journey milestones for the homepage timeline + impact map.
 *
 * Reach values are ISO 3166-1 alpha-2 country codes, or 'worldwide'.
 * `users` is the map-footer legend line for the chapter.
 */
export interface Milestone {
  id: string;
  years: string;
  title: string;
  role: string;
  description: string;
  workSlugs: string[];
  highlight?: string;
  /** `led` = directly owned/managed; `collaborators` = cross-functional partners and stakeholders. */
  team?: { led?: string; collaborators?: string };
  geo: {
    base?: string | string[];
    hq?: string | string[];
    locations?: string[];
    reach: 'worldwide' | string[];
    users?: string;
  };
}

export const journey: Milestone[] = [
  {
    id: 'design-roots',
    years: '2014–2017',
    title: 'Startups, and Product Management',
    role: 'Product Manager, Program & Operations',
    description:
      'Built the online incubator platform for Startup Village, India’s early-stage ecosystem, supporting 150+ startup teams from idea to launch. Owned product and operations end-to-end, turning ambiguous early-stage problems into shipped product.',
    workSlugs: [],
    team: {
      led: 'Product, Operations',
      collaborators: 'Engineering, Program, Operations, Leadership',
    },
    geo: {
      base: 'bangalore',
      hq: 'kochi',
      locations: ['vizag'],
      reach: ['IN'],
      users: '150+ startups · 500+ founders',
    },
  },
  {
    id: 'agency',
    years: '2017–2019',
    title: 'Product Agency & Founding Imux',
    role: 'Founder, Product & Design · Cofounder, Imux',
    description:
      'Founded a product & design agency: helped 50K cab drivers recover taxes with Cabdost; designed Leucine’s CLEEN OS (cleaning validation for FDA audits) and Incola (an Australian pay-later for rental deposits); built a data-collection PWA for a medical NGO; and shipped bite-sized founder learning with Station91 and Tymline. In the same stretch I co-founded Imux, a natural-language interface to databases (NLiDB) SaaS — designed the B2B product 0-to-1, demoed to enterprise customers, and raised seed funding.',
    workSlugs: ['cabdost', 'station91', 'imux'],
    highlight: '100k+ users · 10 products · 5 fundraised · seed-funded Imux',
    team: {
      led: '3 pods · 5 devs, 1 QA',
      collaborators: 'Founders, Operations, Marketing · 3-person Imux founding team',
    },
    geo: {
      base: 'bangalore',
      locations: ['mumbai', 'newyork', 'brisbane', 'seoul', 'bangkok'],
      reach: ['IN', 'AU', 'US', 'KR', 'TH'],
      users: '100k users · India · US · AU · Korea · Thailand',
    },
  },
  {
    id: 'oneplus',
    years: '2019–2025',
    title: 'OnePlus at global scale',
    role: 'PM → Senior PM → Lead, Product Strategy',
    description:
      'Shipped core OxygenOS apps (Shelf, Scout, Nearby Charging Stations, Notes) as PM, Global Apps; then as Senior PM, Partnerships, authored the strategy that opened Shelf to third-party developers and grew partner engagement across the OS, onboarding Spotify, Snapchat, Zomato, Swiggy, Blinkit, Grab, Uber, Ola and Rapido. Closed as Lead, Product Strategy, conducting global consumer insights, user, market research, and greenlighting features with executive pitch decks.',
    workSlugs: [
      'oneplus-shelf',
      'oneplus-scout',
      'food-delivery-aod',
      'spotify-on-shelf',
      'zomato-blinkit-shelf',
      'nearby-charging-stations',
    ],
    highlight: 'Employee of the Year 2021 · 200M+ users',
    team: {
      led: '5 pods · 25 devs, 6 designers, 3 ops',
      collaborators: 'Leadership, Business Development, Marketing, Legal, Partner Product, Partner Development',
    },
    geo: {
      base: ['hyderabad', 'bangalore'],
      hq: ['shenzhen', 'newyork'],
      locations: ['noida', 'gurgaon', 'bangkok', 'singapore', 'jakarta', 'seattle', 'london', 'stockholm'],
      // NA · EU · SEA · India: the four OnePlus regions these products served
      reach: ['US', 'CA', 'GB', 'IE', 'FR', 'DE', 'IT', 'ES', 'PT', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'GR', 'HR', 'SI', 'LT', 'LV', 'EE', 'TH', 'SG', 'MY', 'ID', 'PH', 'VN', 'IN'],
      users: '200Mn+ users · NA · EU · SEA · India',
    },
  },
  {
    id: 'builder',
    years: '2025',
    title: 'Independent builder & AI',
    role: 'Product Consultant · AI Builder',
    description:
      'Building AI-native products end-to-end: Product f(), an AI operating system for product teams; Labh, a SEBI-certified investment platform; Petfolk pet care; Pro Studio for film pre-production; Itihasa Collective for screenwriters. Designing, building and shipping production software solo with AI in the loop, a forward-deployed way of working.',
    workSlugs: ['product-f', 'labh', 'petfolk', 'pro-studio-space', 'itihasa-collective', 'reporting-hub'],
    highlight: 'Currently building Product f()',
    team: { collaborators: 'Founders, Developers, Operations, Designers' },
    geo: {
      base: 'calgary',
      locations: ['hyderabad'],
      reach: ['CA', 'IN', 'US'],
      users: '100k+ users',
    },
  },
];
