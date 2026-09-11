import { CircleHelp } from 'lucide-react';
import { FAQ } from '../components/FAQ';
import { PageHeader } from '../components/PageHeader';
import { faqItems } from '../data/faq';

export function FaqPage() {
  return (
    <>
      <PageHeader
        accent="SEM ENROLAÇÃO."
        description="Reunimos as principais respostas para você resolver dúvidas e entrar no servidor com tranquilidade."
        eyebrow="CENTRAL DE AJUDA"
        title="RESPOSTAS DIRETAS."
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-raised text-brand-light">
          <CircleHelp aria-hidden="true" size={18} strokeWidth={1.8} />
        </span>
        <p className="mt-4 font-display text-3xl font-bold tracking-[-.05em] text-ink">{faqItems.length}</p>
        <p className="mt-1 text-sm text-muted">respostas rápidas reunidas em um só lugar.</p>
      </PageHeader>

      <FAQ />
    </>
  );
}
