import type { HTMLAttributes } from 'react';
import logoImage from '../assets/crazy-mc-logo-ui.png';

type LogoProps = HTMLAttributes<HTMLDivElement> & { compact?: boolean };

export function Logo({ compact = false, className = '', ...props }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`} {...props}>
      <img alt="" aria-hidden="true" className="brand-logo-image" decoding="async" height="320" src={logoImage} width="307" />
      {!compact && <span className="font-display text-sm font-bold tracking-[0.17em] text-ink">CRAZY <span className="text-brand">MC</span></span>}
    </div>
  );
}
