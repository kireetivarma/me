import ShelfArt from './ShelfArt.astro';
import ScoutArt from './ScoutArt.astro';
import AodFoodArt from './AodFoodArt.astro';
import SpotifyShelfArt from './SpotifyShelfArt.astro';
import ZomatoBlinkitArt from './ZomatoBlinkitArt.astro';
import ChargingArt from './ChargingArt.astro';
import ProductFArt from './ProductFArt.astro';
import LabhArt from './LabhArt.astro';
import ImuxArt from './ImuxArt.astro';
import PetfolkArt from './PetfolkArt.astro';
import Station91Art from './Station91Art.astro';
import CabdostArt from './CabdostArt.astro';
import ItihasaArt from './ItihasaArt.astro';
import ProStudioArt from './ProStudioArt.astro';
import ReportingHubArt from './ReportingHubArt.astro';
import SwasthArt from './SwasthArt.astro';
import IncolaArt from './IncolaArt.astro';
import TymlineArt from './TymlineArt.astro';
import GradientArt from './GradientArt.astro';

/** Maps work-collection frontmatter `art` keys to components. */
export const artRegistry: Record<string, (props: { size?: 'thumb' | 'hero' | 'ambient' }) => any> = {
  shelf: ShelfArt,
  scout: ScoutArt,
  'aod-food': AodFoodArt,
  'spotify-shelf': SpotifyShelfArt,
  'zomato-blinkit': ZomatoBlinkitArt,
  charging: ChargingArt,
  'product-f': ProductFArt,
  labh: LabhArt,
  imux: ImuxArt,
  petfolk: PetfolkArt,
  station91: Station91Art,
  cabdost: CabdostArt,
  itihasa: ItihasaArt,
  'pro-studio': ProStudioArt,
  'reporting-hub': ReportingHubArt,
  swasth: SwasthArt,
  incola: IncolaArt,
  tymline: TymlineArt,
  gradient: GradientArt,
};

export function resolveArt(key: string) {
  return artRegistry[key] ?? GradientArt;
}
