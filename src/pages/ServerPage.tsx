import { Radio, Users } from 'lucide-react';
import { CopyIpButton } from '../components/CopyIpButton';
import { Features } from '../components/Features';
import { GameplayShowcase } from '../components/GameplayShowcase';
import { HowToPlay } from '../components/HowToPlay';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { ServerStats } from '../components/ServerStats';
import { useServerStatus } from '../context/ServerStatusContext';

export function ServerPage() {
  const status = useServerStatus();
  const statusLabel = status.loading
    ? 'Consultando servidor'
    : status.online === true
      ? 'Servidor online'
      : status.online === false
        ? 'Servidor offline'
        : 'Status indisponível';
  const playersLabel = status.onlinePlayers === null
    ? 'Jogadores indisponíveis'
    : `${status.onlinePlayers} / ${status.maxPlayers ?? '—'} jogadores`;

  return (
    <>
      <PageHeader
        accent="PELOS JOGADORES."
        description="Conheça o semi-anárquico da Crazy MC, explore o gameplay e veja tudo o que precisa para começar sua história."
        eyebrow="O SERVIDOR"
        title="UM MUNDO MOVIDO"
      >
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-raised text-brand-light">
            <Radio aria-hidden="true" size={18} strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-dark">Agora na rede</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-ink-soft">
              <span className={`status-dot ${status.online === false ? 'status-dot-offline' : status.online === true ? '' : 'status-dot-unavailable'}`} />
              {statusLabel}
            </p>
          </div>
        </div>
        <p className="mt-5 flex items-center gap-2 text-sm text-muted">
          <Users aria-hidden="true" size={16} /> {playersLabel}
        </p>
        <CopyIpButton className="mt-5" fullWidth variant="hero" />
      </PageHeader>

      <ServerStats />
      <Features />
      <Reveal><GameplayShowcase /></Reveal>
      <Reveal><HowToPlay /></Reveal>
    </>
  );
}
