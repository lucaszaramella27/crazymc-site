import { MessageSquareWarning, Scale, ShieldCheck, Swords } from 'lucide-react';
import type { CSSProperties } from 'react';
import { PageHeader } from '../components/PageHeader';
import { serverInfo } from '../data/server';

const ruleGroups = [
  {
    icon: Swords,
    title: 'Liberdade com limites',
    text: 'PvP, disputas e rivalidades fazem parte do mundo. As ações dentro do jogo ainda devem respeitar as regras da comunidade.',
  },
  {
    icon: ShieldCheck,
    title: 'Jogo limpo',
    text: 'Hacks, clientes que oferecem vantagens injustas, macros proibidas e exploração de falhas não são permitidos.',
  },
  {
    icon: MessageSquareWarning,
    title: 'Respeito sempre',
    text: 'A competição pode ser intensa, mas assédio, ameaças e ataques pessoais não fazem parte da Crazy MC.',
  },
  {
    icon: Scale,
    title: 'Decisões da equipe',
    text: 'A administração analisa cada situação pelo contexto. Evidências e denúncias devem ser enviadas pelos canais oficiais.',
  },
];

export function RulesPage() {
  return (
    <>
      <PageHeader
        accent="CONTINUA SENDO LIBERDADE."
        description="Poucas regras, objetivos claros: proteger a experiência sem controlar a história criada pelos jogadores."
        eyebrow="REGRAS"
        title="ORDEM O SUFICIENTE."
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-raised text-brand-light">
          <ShieldCheck aria-hidden="true" size={18} strokeWidth={1.8} />
        </span>
        <p className="mt-4 font-display text-3xl font-bold tracking-[-.05em] text-ink">04</p>
        <p className="mt-1 text-sm leading-6 text-muted">princípios essenciais para manter o jogo livre e justo.</p>
      </PageHeader>
      <section className="page-content-section">
          <div className="page-shell">
            <div className="grid gap-3 md:grid-cols-2">
              {ruleGroups.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <article
                    className="card-surface stagger-item min-h-[15rem] p-6 sm:p-8"
                    key={rule.title}
                    style={{ '--stagger-delay': `${index * 70}ms` } as CSSProperties}
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-raised text-brand">
                      <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
                    </span>
                    <h2 className="mt-8 font-display text-2xl font-bold tracking-[-.04em] text-ink-soft">{rule.title}</h2>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{rule.text}</p>
                  </article>
                );
              })}
            </div>

            <div className="rule-note mt-5 rounded-2xl p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
              <div>
                <p className="font-display text-lg font-bold text-ink-soft">Consulte sempre a versão completa</p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Este é um resumo de convivência. Atualizações, detalhes e canais de denúncia ficam no Discord oficial.</p>
              </div>
              <a className="button-discord mt-5 shrink-0 sm:mt-0" href={serverInfo.discordUrl} rel="noreferrer" target="_blank">Abrir Discord</a>
            </div>
          </div>
        </section>
    </>
  );
}
