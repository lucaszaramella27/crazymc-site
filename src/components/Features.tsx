import { Coins, Crown, Crosshair, Earth } from 'lucide-react';
import type { CSSProperties } from 'react';

const features = [
  { icon: Crosshair, title: 'PvP Livre', text: 'Combates, guerras e rivalidades fazem parte do servidor.', size: 'lg:col-span-7' },
  { icon: Crown, title: 'Clãs', text: 'Crie alianças, forme grupos e construa seu próprio império.', size: 'lg:col-span-5' },
  { icon: Coins, title: 'Economia', text: 'Negocie itens e recursos diretamente com outros jogadores.', size: 'lg:col-span-5' },
  { icon: Earth, title: 'Mundo Vivo', text: 'Um mundo moldado pelas escolhas e acontecimentos da comunidade.', size: 'lg:col-span-7' },
];

export function Features() {
  return (
    <section className="page-content-section" id="servidor">
      <div className="page-shell">
        <h2 className="sr-only">Recursos do servidor</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
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
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-raised text-brand transition duration-300 group-hover:bg-[#263527] group-hover:text-ink">
                    <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
                  </span>
                  <span className="font-display text-4xl font-bold tracking-[-.08em] text-[#354135]">0{index + 1}</span>
                </div>
                <h3 className="mt-10 font-display text-2xl font-bold tracking-[-0.04em] text-ink-soft">{feature.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-muted">{feature.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
