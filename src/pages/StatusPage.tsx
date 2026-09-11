import { Clock3, Radio, RefreshCw, Server } from 'lucide-react';
import { CopyIpButton } from '../components/CopyIpButton';
import { PageHeader } from '../components/PageHeader';
import { ServerStats } from '../components/ServerStats';
import { useServerStatus } from '../context/ServerStatusContext';
import { serverInfo } from '../data/server';

export function StatusPage() {
  const status = useServerStatus();
  const stateLabel = status.loading
    ? 'Consultando servidor'
    : status.online === true
      ? 'Servidor online'
      : status.online === false
        ? 'Servidor offline'
        : 'Status indisponível';
  const updateLabel = status.lastUpdated
    ? status.lastUpdated.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    : 'Aguardando primeira consulta';

  const details = [
    { icon: Radio, label: 'Estado atual', value: stateLabel },
    { icon: Server, label: 'Endereço', value: serverInfo.ip },
    { icon: RefreshCw, label: 'Atualização', value: 'Automática a cada 60 segundos' },
    { icon: Clock3, label: 'Última consulta', value: updateLabel },
  ];

  return (
    <>
      <PageHeader
        accent="EM TEMPO REAL."
        description="Acompanhe disponibilidade, jogadores conectados e versão diretamente pela consulta pública do servidor."
        eyebrow="STATUS DA REDE"
        title="CRAZY MC"
      >
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-raised text-brand-light">
            <Radio aria-hidden="true" size={18} strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-dark">Estado atual</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-ink-soft">
              <span className={`status-dot ${status.online === false ? 'status-dot-offline' : status.online === true ? '' : 'status-dot-unavailable'}`} />
              {stateLabel}
            </p>
          </div>
        </div>
        <CopyIpButton className="mt-5" fullWidth variant="hero" />
      </PageHeader>
      <ServerStats />
      <section className="page-content-section pt-6">
          <div className="page-shell">
            <div className="grid gap-3 sm:grid-cols-2">
              {details.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div className="depth-card flex min-h-[8.5rem] items-start gap-4 rounded-xl p-5 sm:p-6" key={detail.label}>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-raised text-brand">
                      <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-dark">{detail.label}</p>
                      <p className="mt-2 text-sm font-medium leading-6 text-ink-soft">{detail.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
    </>
  );
}
