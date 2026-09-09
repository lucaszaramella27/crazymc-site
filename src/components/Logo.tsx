import type { HTMLAttributes } from 'react';
import logoImage from '../assets/crazy-mc-logo.png';

type LogoProps = HTMLAttributes<HTMLDivElement> & { compact?: boolean };

export function Logo({ compact = false, className = '', ...props }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`} {...props}>
      <img alt={compact ? '' : 'Crazy MC'} className="brand-logo-image" src={logoImage} />
      {!compact && <span className="font-display text-sm font-bold tracking-[0.17em] text-[#eaf4fa]">CRAZY <span className="text-[#8cc8f5]">MC</span></span>}
    </div>
  );
}
