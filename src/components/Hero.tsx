import { Users } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { CopyIpButton } from './CopyIpButton';
import { useServerStatus } from '../context/ServerStatusContext';
import heroBackground from '../assets/crazy-mc-hero-night.jpg';
import heroBackgroundFullHd from '../assets/crazy-mc-hero-night-1920.jpg';
import heroBackgroundQhd from '../assets/crazy-mc-hero-night-2560.jpg';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const serverStatus = useServerStatus();

  const statusLabel = serverStatus.loading
    ? 'CONSULTANDO SERVIDOR'
    : serverStatus.online === true
      ? 'SERVIDOR ONLINE'
      : serverStatus.online === false
        ? 'SERVIDOR OFFLINE'
        : 'STATUS INDISPONÍVEL';

  const playersLabel = serverStatus.onlinePlayers === null
    ? '— jogadores'
    : serverStatus.maxPlayers === null
      ? `${serverStatus.onlinePlayers} jogadores`
      : `${serverStatus.onlinePlayers} / ${serverStatus.maxPlayers} jogadores`;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    const reset = () => {
      section.style.setProperty('--hero-art-x', '0px');
      section.style.setProperty('--hero-art-y', '0px');
      section.style.setProperty('--hero-content-x', '0px');
      section.style.setProperty('--hero-content-y', '0px');
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
      const bounds = section.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
      section.style.setProperty('--hero-art-x', `${(-x * 6).toFixed(2)}px`);
      section.style.setProperty('--hero-art-y', `${(-y * 4).toFixed(2)}px`);
      section.style.setProperty('--hero-content-x', `${(x * 3).toFixed(2)}px`);
      section.style.setProperty('--hero-content-y', `${(y * 2).toFixed(2)}px`);
    };

    section.addEventListener('pointermove', onPointerMove, { passive: true });
    section.addEventListener('pointerleave', reset);
    reducedMotion.addEventListener('change', reset);
    finePointer.addEventListener('change', reset);

    return () => {
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', reset);
      reducedMotion.removeEventListener('change', reset);
      finePointer.removeEventListener('change', reset);
    };
  }, []);

  return (
    <section className="hero-full-bleed hero-grid relative isolate min-h-[88svh] overflow-hidden pt-[72px] sm:min-h-[90svh] lg:min-h-[92svh]" id="inicio" ref={sectionRef}>
      <div aria-hidden="true" className="hero-art-motion absolute -inset-4 -z-20">
        <img
          alt=""
          className="hero-art absolute inset-0 h-full w-full object-cover"
          decoding="async"
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          src={heroBackground}
          srcSet={`${heroBackgroundFullHd} 1920w, ${heroBackgroundQhd} 2560w`}
        />
      </div>
      <div aria-hidden="true" className="hero-image-shade absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-orb absolute -right-24 top-1/2 -z-10 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full blur-3xl" />
      <div className="page-shell relative flex min-h-[calc(88svh-72px)] items-center py-12 sm:min-h-[calc(90svh-72px)] sm:py-16 lg:min-h-[calc(92svh-72px)] lg:py-20">
        <div className="hero-content-motion min-w-0 w-full">
          <div className="w-full max-w-[880px] animate-enter">
            <div className="eyebrow hero-eyebrow mb-5 w-fit sm:mb-6"><span className="status-dot" /> CRAZY MC <span className="mx-1 text-[#4f8fc4]">•</span> SMP SEMI-ANÁRQUICO</div>
            <h1 className="max-w-full font-display text-[clamp(1.7rem,8.2vw,2.2rem)] font-semibold leading-[1.03] tracking-[-0.055em] text-[#eaf4fa] sm:text-[clamp(2.75rem,5.8vw,4.5rem)] xl:text-[5.15rem]">
              <span className="sm:hidden">
                <span className="block">Um mundo</span>
                <span className="block">sem dono.</span>
                <span className="block">Até <span className="hero-title-accent">você</span> chegar.</span>
              </span>
              <span className="hidden sm:inline">Um mundo sem dono.<br />Até <span className="hero-title-accent">você</span> chegar.</span>
            </h1>
            <p className="mt-6 max-w-full text-base leading-7 text-[#9aa9b8] sm:max-w-xl sm:text-lg">Erga seu império, crie alianças e sobreviva em um mundo onde poder se conquista — bloco por bloco.</p>
            <div className="mt-7 flex sm:mt-8"><CopyIpButton variant="hero" /></div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm sm:mt-8"><div className="flex items-center gap-2 font-medium text-[#d5e2ec]"><span className={`status-dot ${serverStatus.online === false ? 'status-dot-offline' : serverStatus.online === null ? 'status-dot-unavailable' : ''}`} /> {statusLabel}</div><span className="hidden h-4 w-px bg-[#2b4052] sm:block" /><span className="flex items-center gap-2 text-[#9aa9b8]"><Users size={15} aria-hidden="true" /> {playersLabel}</span></div>
          </div>
        </div>
      </div>
      <a aria-label="Rolar para conhecer o servidor" className="scroll-cue" href="#servidor">
        <span aria-hidden="true" className="scroll-mouse">
          <span className="scroll-wheel" />
        </span>
        <span>Role para explorar</span>
      </a>
    </section>
  );
}
