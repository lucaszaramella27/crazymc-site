import { Link } from 'react-router';
import { serverInfo } from '../data/server';
import { Logo } from './Logo';

const footerLinks = [
  { label: 'Início', to: '/' },
  { label: 'Servidor', to: '/servidor' },
  { label: 'Loja', to: '/loja' },
  { label: 'Comunidade', to: '/comunidade' },
  { label: 'Regras', to: '/regras' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Status', to: '/status' },
  { label: 'Termos', to: '/termos' },
  { label: 'Privacidade', to: '/privacidade' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-canvas/90 shadow-[0_-18px_46px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <div className="page-shell py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <Logo />
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                className="text-xs text-muted-dark transition hover:text-ink-soft"
                key={link.label}
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
            <a className="text-xs text-muted-dark transition hover:text-ink-soft" href={serverInfo.discordUrl} rel="noreferrer" target="_blank">Discord</a>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 pt-6 text-xs leading-5 text-muted-dark md:flex-row">
          <p>© {currentYear} Crazy MC. Todos os direitos reservados.</p>
          <p>Crazy MC não é afiliada à Mojang Studios ou Microsoft.</p>
        </div>
      </div>
    </footer>
  );
}
