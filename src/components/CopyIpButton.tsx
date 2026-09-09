import { Check, CheckCircle2, Copy } from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { serverInfo } from '../data/server';

type CopyIpButtonProps = {
  className?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'hero';
};

const particles = [
  { x: -38, y: -28, rotate: -70, delay: 0 },
  { x: -18, y: -40, rotate: -35, delay: 25 },
  { x: 8, y: -43, rotate: 25, delay: 10 },
  { x: 34, y: -28, rotate: 65, delay: 35 },
  { x: 42, y: -2, rotate: 95, delay: 5 },
  { x: 31, y: 25, rotate: 130, delay: 40 },
  { x: 5, y: 35, rotate: 175, delay: 15 },
  { x: -25, y: 27, rotate: 220, delay: 30 },
  { x: -43, y: 3, rotate: 265, delay: 20 },
];

export function CopyIpButton({ className = '', fullWidth = false, variant = 'default' }: CopyIpButtonProps) {
  const [copied, setCopied] = useState(false);
  const [burstId, setBurstId] = useState(0);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyIp() {
    try {
      await navigator.clipboard.writeText(serverInfo.ip);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = serverInfo.ip;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    setCopied(true);
    setBurstId((current) => current + 1);
  }

  return (
    <>
      <span className={`copy-action ${fullWidth ? 'w-full' : ''}`}>
        {variant === 'hero' ? (
          <button
            aria-label={copied ? `IP ${serverInfo.ip} copiado` : `Copiar IP ${serverInfo.ip}`}
            className={`copy-server-button ${copied ? 'is-copied' : ''} ${fullWidth ? 'w-full' : ''} ${className}`}
            onClick={copyIp}
            type="button"
          >
            <span className="copy-server-meta">
              <span>{copied ? 'Pronto, IP copiado' : 'IP do servidor'}</span>
              <strong>{serverInfo.ip}</strong>
            </span>
            <span aria-hidden="true" className="copy-server-icon">
              {copied ? <Check size={18} strokeWidth={2.5} /> : <Copy size={17} strokeWidth={2.2} />}
            </span>
          </button>
        ) : (
          <button className={`button-primary ${fullWidth ? 'w-full' : ''} ${className}`} onClick={copyIp} type="button">
            {copied ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
            {copied ? 'IP copiado ✓' : 'Copiar IP'}
          </button>
        )}
        {burstId > 0 && (
          <span aria-hidden="true" className="copy-particle-field" key={burstId}>
            {particles.map((particle, index) => (
              <span
                className="copy-particle"
                key={index}
                style={{
                  '--particle-x': `${particle.x}px`,
                  '--particle-y': `${particle.y}px`,
                  '--particle-rotate': `${particle.rotate}deg`,
                  '--particle-delay': `${particle.delay}ms`,
                } as CSSProperties}
              />
            ))}
          </span>
        )}
      </span>
      {copied && (
        <div aria-live="polite" className="copy-toast" role="status">
          <CheckCircle2 aria-hidden="true" size={17} />
          <span><strong>IP copiado</strong>{serverInfo.ip}</span>
        </div>
      )}
    </>
  );
}
