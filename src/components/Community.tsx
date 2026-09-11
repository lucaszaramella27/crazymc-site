import { CalendarDays, Headphones, Users } from 'lucide-react';
import type { CSSProperties } from 'react';

const communityPoints = [
  { icon: Users, label: 'Discord', value: 'Comunidade oficial' },
  { icon: CalendarDays, label: 'Eventos', value: 'Avisos no Discord' },
  { icon: Headphones, label: 'Suporte', value: 'Canais dedicados' },
];

export function Community() {
  return (
    <section className="page-content-section" id="comunidade">
      <div className="page-shell">
        <div className="community-panel relative overflow-hidden rounded-3xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="relative grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">NO DISCORD</p>
              <h2 className="section-title section-title-effect mt-5">
                TUDO ACONTECE<br />
                <span className="text-ink-soft">EM UM SÓ LUGAR.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
                Entre no Discord da Crazy MC, encontre aliados, acompanhe anúncios e participe da comunidade.
              </p>
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
                    <Icon className="text-brand" size={19} strokeWidth={1.7} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-dark">{point.label}</p>
                      <p className="mt-1 text-sm font-medium text-ink-soft">{point.value}</p>
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
