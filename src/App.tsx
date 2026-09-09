import { Community } from './components/Community';
import { CTA } from './components/CTA';
import { FAQ } from './components/FAQ';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { GalaxyBackground } from './components/GalaxyBackground';
import { GameplayShowcase } from './components/GameplayShowcase';
import { Hero } from './components/Hero';
import { HowToPlay } from './components/HowToPlay';
import { InteractiveMotion } from './components/InteractiveMotion';
import { Navbar } from './components/Navbar';
import { Reveal } from './components/Reveal';
import { ServerStats } from './components/ServerStats';
import { Store } from './components/Store';

export default function App() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-[#050b13] text-[#eaf4fa]">
      <GalaxyBackground />
      <InteractiveMotion />
      <Navbar />
      <main>
        <Hero />
        <div aria-hidden="true" className="hero-divider" />
        <Reveal><ServerStats /></Reveal>
        <Reveal><Features /></Reveal>
        <Reveal><GameplayShowcase /></Reveal>
        <Reveal><Store /></Reveal>
        <Reveal><Community /></Reveal>
        <Reveal><HowToPlay /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><CTA /></Reveal>
      </main>
      <Reveal><Footer /></Reveal>
    </div>
  );
}
