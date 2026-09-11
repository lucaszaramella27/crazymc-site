import { MessageCircle, ShoppingBag } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Store } from '../components/Store';
import { serverInfo } from '../data/server';

export function StorePage() {
  return (
    <>
      <PageHeader
        accent="DO SERVIDOR."
        description="Conheça os planos da Crazy MC e escolha uma forma de apoiar o crescimento do projeto."
        eyebrow="LOJA CRAZY MC"
        title="FAÇA PARTE"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-raised text-brand-light">
          <ShoppingBag aria-hidden="true" size={18} strokeWidth={1.8} />
        </span>
        <p className="mt-4 font-display text-lg font-bold tracking-[-.03em] text-ink-soft">Escolha seu plano</p>
        <p className="mt-2 text-sm leading-6 text-muted">Escolha um plano e fale diretamente com a equipe pelo Discord oficial.</p>
        <a className="button-outline mt-5 w-full" href={serverInfo.discordUrl} rel="noreferrer" target="_blank">
          <MessageCircle aria-hidden="true" size={16} /> Falar com a equipe
        </a>
      </PageHeader>

      <Store />
    </>
  );
}
