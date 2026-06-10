export const profile = {
  name: 'Kireeti Varma',
  title: 'Product Design & Strategy',
  tagline: 'Designer turned Product Builder at global scale',
  description:
    'Senior Product Manager with 11+ years building digital products at global scale. Ex-OnePlus, 1x founder, AI builder. 200M+ users reached across 50+ countries.',
  email: 'hello@kireetivarma.me',
  emailAlt: 'mail@kireetivarma.me',
  location: 'Calgary, Canada 🇨🇦 — open to remote-first roles worldwide',
  social: {
    linkedin: 'https://linkedin.com/in/kireetivarma',
    x: 'https://x.com/kireetivarma',
    calendly: 'https://calendly.com/kireetivarma',
  },
  stats: [
    { value: '200M+', label: 'Users Reached' },
    { value: '9+', label: 'Products Built & Shipped' },
    { value: '15+', label: 'Global Brands & Teams' },
    { value: '11+', label: 'Years Experience' },
  ],
  /**
   * Brand grid entries. `icon` is a simple-icons export name (rendered as the
   * real SVG logo); entries without one render as a color-styled wordmark.
   */
  brands: [
    { name: 'OnePlus', icon: 'siOneplus' },
    { name: 'Spotify', icon: 'siSpotify' },
    { name: 'Zomato', icon: 'siZomato' },
    { name: 'Swiggy', icon: 'siSwiggy' },
    { name: 'Blinkit', color: '#F9D100' },
    { name: 'Snapchat', icon: 'siSnapchat' },
    { name: 'Netflix', icon: 'siNetflix' },
    { name: 'Grab', icon: 'siGrab' },
    { name: 'Google', icon: 'siGoogle' },
    { name: 'Oppo', icon: 'siOppo' },
    { name: 'Dvara Money', color: '#0E7C66' },
    { name: 'Leucine', color: '#4F46E5' },
    { name: 'Pluto Money', color: '#7C3AED' },
    { name: 'Labh', color: '#10B981' },
    { name: 'Itihasa', color: '#F472B6' },
    { name: 'Imux', color: '#38BDF8' },
    { name: 'Reporting Hub', color: '#F59E0B' },
  ],
} as const;
