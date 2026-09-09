import { Coins, Crown, Crosshair, Earth } from 'lucide-react';
import type { CSSProperties } from 'react';

const features = [
  { icon: Crosshair, title: 'PvP Livre', text: 'Combates, guerras e rivalidades fazem parte do servidor.', size: 'lg:col-span-7' },
  { icon: Crown, title: 'Facções', text: 'Crie alianças, forme grupos e construa seu próprio império.', size: 'lg:col-span-5' },
  { icon: Coins, title: 'Economia', text: 'Negocie itens e recursos diretamente com outros jogadores.', size: 'lg:col-span-5' },
  { icon: Earth, title: 'Mundo Vivo', text: 'Um mundo moldado pelas escolhas e acontecimentos da comunidade.', size: 'lg:col-span-7' },
];

export function Features() {
  return (
    <section className="section-space" id="servidor">
      <div className="page-shell">
        <div className="relative grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:gap-20">
          <div className="section-intro relative">
            <p className="eyebrow">O SERVIDOR</p>
            <h2 className="section-title section-title-effect mt-5">LIBERDADE PARA JOGAR <span className="title-accent">DO SEU JEITO</span></h2>
          </div>
          <p className="relative max-w-xl text-base leading-7 text-[#9aa9b8] sm:text-lg">
            A Crazy MC é um SMP semi-anárquico criado para quem gosta de liberdade, competição e histórias criadas pelos próprios jogadores.
          </p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                className={`group card-surface tilt-card stagger-item min-h-[15rem] p-6 lg:p-8 ${feature.size}`}
                data-tilt
                key={feature.title}
                style={{ '--stagger-delay': `${index * 70}ms` } as CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#162330] text-[#8cc8f5] transition duration-300 group-hover:bg-[#1d2c38] group-hover:text-[#eaf4fa]">
                    <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
                  </span>
                  <span className="font-display text-4xl font-bold tracking-[-.08em] text-[#263746]">0{index + 1}</span>
                </div>
                <h3 className="mt-10 font-display text-2xl font-bold tracking-[-0.04em] text-[#dfeaf2]">{feature.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#8998a7]">{feature.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
