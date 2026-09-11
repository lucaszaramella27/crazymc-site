import type { ReactNode } from 'react';

type PageHeaderProps = {
  accent: string;
  children?: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
};

export function PageHeader({ accent, children, description, eyebrow, title }: PageHeaderProps) {
  return (
    <header className="pt-[72px]">
      <div className={`page-shell grid min-w-0 gap-8 py-10 sm:py-14 ${children ? 'lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-end lg:gap-16' : ''}`}>
        <div className="w-full min-w-0 max-w-4xl animate-enter">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-full break-words font-display text-[clamp(2.35rem,5.2vw,4.75rem)] font-semibold leading-[.94] tracking-[-.06em] text-ink">
            {title}
            <span className="mt-1 block text-brand-light">{accent}</span>
          </h1>
          <p className="mt-5 w-full min-w-0 max-w-2xl break-words text-base leading-7 text-muted sm:text-lg">{description}</p>
        </div>

        {children && (
          <aside className="page-context-card animate-enter-delay rounded-2xl p-5 sm:p-6">
            {children}
          </aside>
        )}
      </div>
    </header>
  );
}
