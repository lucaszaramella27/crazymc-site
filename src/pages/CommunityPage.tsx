import { MessageCircle, Users } from 'lucide-react';
import { Community } from '../components/Community';
import { PageHeader } from '../components/PageHeader';
import { serverInfo } from '../data/server';

export function CommunityPage() {
  return (
    <>
      <PageHeader
        accent="SOZINHO."
        description="Encontre aliados, acompanhe anúncios, participe de eventos e ajude a construir a história da Crazy MC."
        eyebrow="COMUNIDADE"
        title="NINGUÉM CONQUISTA"
      >
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-raised text-brand-light">
            <Users aria-hidden="true" size={18} strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-dark">Discord oficial</p>
            <p className="mt-1 text-sm font-semibold text-ink-soft">Acompanhe a Crazy MC</p>
          </div>
        </div>
        <a className="button-discord mt-5 w-full" href={serverInfo.discordUrl} rel="noreferrer" target="_blank">
          <MessageCircle aria-hidden="true" size={16} /> Entrar na comunidade
        </a>
      </PageHeader>

      <Community />
    </>
  );
}
