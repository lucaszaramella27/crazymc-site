import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useServerStatus } from '../context/ServerStatusContext';
import { serverInfo } from '../data/server';

type AnimatedStatValueProps = {
  animate: boolean;
  value: string;
};

function parseValue(value: string) {
  const match = value.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return null;
  const numericText = match[1].replace(',', '.');
  return {
    decimals: numericText.includes('.') ? numericText.split('.')[1].length : 0,
    suffix: match[2],
    target: Number(numericText),
  };
}

function AnimatedStatValue({ animate, value }: AnimatedStatValueProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const parsed = parseValue(value);
  const initialValue = animate && parsed ? `${(0).toFixed(parsed.decimals)}${parsed.suffix}` : value;
  const [displayValue, setDisplayValue] = useState(initialValue);

  useEffect(() => {
    const element = elementRef.current;
    const nextValue = parseValue(value);
    if (!element || !animate || !nextValue) {
      setDisplayValue(value);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }

    let frameId = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const startedAt = performance.now();
      const duration = 1150;

      const tick = (time: number) => {
        const progress = Math.min(1, (time - startedAt) / duration);
        const eased = 1 - (1 - progress) ** 3;
        const current = nextValue.target * eased;
        setDisplayValue(`${current.toFixed(nextValue.decimals)}${nextValue.suffix}`);
        if (progress < 1) frameId = window.requestAnimationFrame(tick);
      };

      frameId = window.requestAnimationFrame(tick);
    }, { threshold: 0.55 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [animate, value]);

  return <span aria-label={value} ref={elementRef}><span aria-hidden="true">{displayValue}</span></span>;
}

export function ServerStats() {
  const serverStatus = useServerStatus();
  const statusValue = serverStatus.loading
    ? 'Consultando...'
    : serverStatus.online === true
      ? 'Online'
      : serverStatus.online === false
        ? 'Offline'
      : 'Indisponível';
  const updateValue = serverStatus.lastUpdated
    ? serverStatus.lastUpdated.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    : serverStatus.loading
      ? 'Consultando...'
      : '—';

  const serverStats = [
    {
      label: 'Servidor',
      value: statusValue,
      status: serverStatus.online === true ? 'online' : serverStatus.online === false ? 'offline' : 'unavailable',
    },
    {
      label: 'Jogadores',
      value: serverStatus.onlinePlayers === null ? '—' : `${serverStatus.onlinePlayers} online`,
    },
    { label: 'Versão', value: serverStatus.version ?? '—' },
    { label: 'Modo', value: serverInfo.mode },
    { label: 'Atualizado', value: updateValue },
  ];

  return (
    <section aria-label="Status do servidor" className="py-6">
      <div className="page-shell grid grid-cols-2 gap-2 md:grid-cols-5">
        {serverStats.map((stat, index) => (
          <div
            className="depth-card tilt-card stagger-item rounded-xl px-5 py-6 sm:px-7 lg:px-8"
            data-tilt
            key={stat.label}
            style={{ '--stagger-delay': `${index * 70}ms` } as CSSProperties}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-dark">{stat.label}</p>
            <p className={`mt-2 text-sm font-medium sm:text-base ${stat.status ? 'flex items-center gap-2 text-ink-soft' : 'text-ink-soft'}`}>
              {stat.status && <span className={`status-dot ${stat.status === 'offline' ? 'status-dot-offline' : stat.status === 'unavailable' ? 'status-dot-unavailable' : ''}`} />}
              <AnimatedStatValue animate={stat.label === 'Jogadores'} value={stat.value} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
} 
