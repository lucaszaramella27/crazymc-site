import { CalendarDays, Headphones, MessageCircle, Users } from 'lucide-react';
import type { CSSProperties } from 'react';
import { serverInfo } from '../data/server';

const communityPoints = [
  { icon: Users, label: 'Discord', value: '+1.000 membros' },
  { icon: CalendarDays, label: 'Eventos', value: 'Toda semana' },
  { icon: Headphones, label: 'Suporte', value: 'Equipe ativa' },
];

export function Community() {
  return (
    <section className="section-space" id="comunidade">
      <div className="page-shell">
        <div className="community-panel relative overflow-hidden rounded-3xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="relative grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">COMUNIDADE</p>
              <h2 className="section-title section-title-effect mt-5">
                MAIS QUE UM SERVIDOR.<br />
                <span className="text-[#d7e1ea]">UMA COMUNIDADE.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#9aa9b8] sm:text-lg">
                Entre no Discord da Crazy MC, encontre aliados, acompanhe anúncios e participe da comunidade.
              </p>
              <a className="button-discord mt-9" href={serverInfo.discordUrl} rel="noreferrer" target="_blank">
                <MessageCircle aria-hidden="true" size={17} /> Entrar no Discord
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {communityPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    className="depth-card tilt-card stagger-item flex items-center gap-4 rounded-xl p-4"
                    data-tilt
                    key={point.label}
                    style={{ '--stagger-delay': `${index * 70}ms` } as CSSProperties}
                  >
                    <Icon className="text-[#8cc8f5]" size={19} strokeWidth={1.7} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#71808f]">{point.label}</p>
                      <p className="mt-1 text-sm font-medium text-[#dfeaf2]">{point.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
