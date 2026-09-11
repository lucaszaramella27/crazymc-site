import { Hero } from '../components/Hero';
import { PortalNavigation } from '../components/PortalNavigation';
import { Reveal } from '../components/Reveal';
import { ServerStats } from '../components/ServerStats';

export function HomePage() {
  return (
    <>
      <Hero />
      <div aria-hidden="true" className="hero-divider" />
      <Reveal><ServerStats /></Reveal>
      <Reveal><PortalNavigation /></Reveal>
    </>
  );
}
