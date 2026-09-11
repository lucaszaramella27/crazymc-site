import { ArrowUpRight, CircleHelp, Server, ShieldCheck, ShoppingBag, Users } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { HolographicGrassBlock } from './HolographicGrassBlock';

const destinations = [
  { icon: Server, label: 'Servidor', text: 'Conheça o mundo, o gameplay e descubra como entrar.', to: '/servidor' },
  { icon: ShoppingBag, label: 'Loja', text: 'Veja os planos e benefícios disponíveis para apoiar o projeto.', to: '/loja' },
  { icon: Users, label: 'Comunidade', text: 'Entre no Discord, acompanhe eventos e encontre aliados.', to: '/comunidade' },
  { icon: ShieldCheck, label: 'Regras', text: 'Entenda os limites que mantêm a liberdade e a diversão.', to: '/regras' },
  { icon: CircleHelp, label: 'FAQ', text: 'Encontre respostas rápidas para as dúvidas mais comuns.', to: '/faq' },
];

export function PortalNavigation() {
  return (
    <section className="section-space" id="explorar">
      <div className="page-shell">
        <div className="portal-intro">
          <div className="max-w-2xl">
          <p className="eyebrow">EXPLORE A CRAZY MC</p>
          <h2 className="section-title section-title-effect mt-5">TUDO EM SEU <span className="title-accent">PRÓPRIO ESPAÇO</span></h2>
          <p className="mt-5 max-w-xl leading-7 text-muted">Escolha para onde ir. Cada área agora possui conteúdo e endereço próprios.</p>
          </div>
          <HolographicGrassBlock />
        </div>

        <div className="mt-11 grid gap-3 md:grid-cols-2 lg:grid-cols-6">
          {destinations.map((destination, index) => {
            const Icon = destination.icon;
            const size = index < 2 ? 'lg:col-span-3' : 'lg:col-span-2';

            return (
              <Link
                className={`portal-link-card group card-surface stagger-item min-h-[13rem] p-6 sm:p-7 ${size}`}
                key={destination.to}
                style={{ '--stagger-delay': `${index * 65}ms` } as CSSProperties}
                to={destination.to}
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-raised text-brand transition duration-300 group-hover:bg-[#263527] group-hover:text-ink">
                    <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
                  </span>
                  <ArrowUpRight aria-hidden="true" className="text-muted-dark transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-light" size={19} />
                </span>
                <span className="mt-8 block font-display text-xl font-bold tracking-[-.035em] text-ink-soft">{destination.label}</span>
                <span className="mt-2 block max-w-md text-sm leading-6 text-muted">{destination.text}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
