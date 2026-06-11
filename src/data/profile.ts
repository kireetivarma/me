export const profile = {
  name: 'Kireeti Varma',
  title: 'Product, Design & Strategy',
  tagline: 'Designer turned Product Builder at global scale',
  description:
    'Product Manager, Designer, 1x founder, ex-OnePlus, now building with AI. Crafting mobile & web experiences for 200M+ users globally, with partnerships spanning Spotify, Snapchat, Zomato, Grab & more.',
  email: 'mail@kireetivarma.me',
  location: 'Calgary, Canada 🇨🇦',
  availability: {
    company: 'Coalition House Products Inc',
    url: 'https://www.coalition.house',
  },
  social: {
    linkedin: 'https://linkedin.com/in/kireetivarma',
    x: 'https://x.com/kireetivarma',
    calendly: 'https://calendly.com/kireeti/25',
  },
  stats: [
    { value: '200M+', label: 'Users Reached' },
    { value: '20+', label: 'Products Built & Shipped' },
    { value: '25+', label: 'Teams Globally' },
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
