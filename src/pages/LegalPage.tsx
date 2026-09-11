import { PageHeader } from '../components/PageHeader';

type LegalSection = {
  title: string;
  text: string;
};

function LegalDocument({ accent, description, sections, title }: {
  accent: string;
  description: string;
  sections: LegalSection[];
  title: string;
}) {
  return (
    <>
      <PageHeader accent={accent} description={description} eyebrow="INFORMAÇÕES LEGAIS" title={title} />
      <section className="page-content-section pt-4">
        <div className="page-shell grid max-w-4xl gap-3">
          {sections.map((section) => (
            <article className="depth-card rounded-2xl p-6 sm:p-8" key={section.title}>
              <h2 className="font-display text-xl font-bold tracking-[-.03em] text-ink-soft">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{section.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

const termsSections: LegalSection[] = [
  { title: 'Uso do site', text: 'Este site apresenta informações oficiais da Crazy MC. Ao utilizar os canais da comunidade e acessar o servidor, você também deve respeitar as regras publicadas pela equipe.' },
  { title: 'Acesso ao servidor', text: 'A disponibilidade pode variar por manutenção, atualizações ou incidentes técnicos. A equipe pode aplicar medidas de moderação para proteger a comunidade e a experiência de jogo.' },
  { title: 'Loja e atendimento', text: 'O site não processa pagamentos diretamente. Os botões dos planos direcionam ao Discord oficial, onde condições, disponibilidade e atendimento devem ser confirmados antes de qualquer aquisição.' },
  { title: 'Propriedade intelectual', text: 'Crazy MC é um projeto independente e não possui afiliação com Mojang Studios ou Microsoft. Marcas e conteúdos de terceiros pertencem aos seus respectivos proprietários.' },
];

const privacySections: LegalSection[] = [
  { title: 'Dados coletados', text: 'Atualmente, o site não possui cadastro, formulários, analytics ou armazenamento próprio de dados pessoais no navegador.' },
  { title: 'Status do servidor', text: 'A página consulta o serviço público mcstatus.io para exibir disponibilidade e quantidade de jogadores. Essa consulta pode transmitir dados técnicos básicos da conexão ao provedor do serviço.' },
  { title: 'Links externos', text: 'Ao abrir o Discord ou outro serviço externo, passam a valer os termos e políticas da plataforma acessada. A Crazy MC não controla o tratamento de dados realizado por esses serviços.' },
  { title: 'Alterações futuras', text: 'Se recursos como cadastro, pagamento ou métricas forem adicionados, esta página deverá ser atualizada antes da publicação dessas funcionalidades.' },
];

export function TermsPage() {
  return <LegalDocument accent="DA CRAZY MC." description="Condições gerais para utilizar o site, acessar o servidor e falar com a equipe." sections={termsSections} title="TERMOS DE USO" />;
}

export function PrivacyPage() {
  return <LegalDocument accent="E TRANSPARÊNCIA." description="Como o site funciona hoje e quais serviços externos participam da experiência." sections={privacySections} title="PRIVACIDADE" />;
}
