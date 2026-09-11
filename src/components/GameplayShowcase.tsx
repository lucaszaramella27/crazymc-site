import castleArtwork from '../assets/crazy-mc-hero-after-fullhd.jpg';
import nightArtwork from '../assets/crazy-mc-hero-night.jpg';
import worldArtwork from '../assets/crazy-mc-showcase-world.jpg';
import type { CSSProperties } from 'react';

const scenes = [
  {
    eyebrow: 'TERRITÓRIO',
    title: 'DOMINE O MAPA',
    text: 'Construa sua base, proteja seus recursos e faça seu nome crescer.',
    image: castleArtwork,
    imageClass: 'object-[62%_center]',
  },
  {
    eyebrow: 'ALIANÇAS',
    title: 'NUNCA JOGUE SOZINHO',
    text: 'Forme grupos e escreva histórias com outros jogadores.',
    image: nightArtwork,
    imageClass: 'object-[74%_center]',
  },
  {
    eyebrow: 'EXPLORAÇÃO',
    title: 'CADA CAMINHO É SEU',
    text: 'Descubra lugares, negocie e escolha como evoluir.',
    image: worldArtwork,
    imageClass: 'object-center',
  },
];

export function GameplayShowcase() {
  return (
    <section className="section-space gameplay-section overflow-hidden" id="gameplay">
      <div className="page-shell">
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_.75fr] lg:items-end lg:gap-20">
          <span aria-hidden="true" className="section-ghost">GAMEPLAY</span>
          <div className="relative">
            <p className="eyebrow">DENTRO DA CRAZY MC</p>
            <h2 className="section-title section-title-effect mt-5">ENTRE NO MUNDO.<br />DEIXE SUA MARCA.</h2>
          </div>
          <p className="relative max-w-lg text-base leading-7 text-muted sm:text-lg">
            Cada área conta uma história diferente. Explore, dispute território e transforme o servidor junto com a comunidade.
          </p>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-12 lg:auto-rows-[15rem]">
          {scenes.map((scene, index) => (
            <article
              className={`gameplay-card group stagger-item min-h-[19rem] ${index === 0 ? 'lg:col-span-7 lg:row-span-2 lg:min-h-0' : 'lg:col-span-5 lg:min-h-0'}`}
              key={scene.title}
              style={{ '--stagger-delay': `${index * 90}ms` } as CSSProperties}
            >
              <img
                alt=""
                className={`gameplay-image ${scene.imageClass}`}
                decoding="async"
                loading="lazy"
                src={scene.image}
              />
              <div aria-hidden="true" className="gameplay-shade" />
              <span className="gameplay-index">0{index + 1}</span>
              <div className="gameplay-copy">
                <p>{scene.eyebrow}</p>
                <h3>{scene.title}</h3>
                <span>{scene.text}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
