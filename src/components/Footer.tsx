import { serverInfo } from '../data/server';
import { Logo } from './Logo';

const footerLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Loja', href: '#loja' },
  { label: 'Regras', href: serverInfo.discordUrl },
  { label: 'Discord', href: serverInfo.discordUrl },
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#050b13]/90 shadow-[0_-18px_46px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <div className="page-shell py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <Logo />
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <a
                className="text-xs text-[#7d8c9b] transition hover:text-[#d8e6ef]"
                href={link.href}
                key={link.label}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                target={link.href.startsWith('http') ? '_blank' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 pt-6 text-xs leading-5 text-[#657382] md:flex-row">
          <p>© 2026 Crazy MC. Todos os direitos reservados.</p>
          <p>Crazy MC não é afiliada à Mojang Studios ou Microsoft.</p>
        </div>
      </div>
    </footer>
  );
}
