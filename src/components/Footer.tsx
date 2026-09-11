import { Link } from 'react-router';
import { FaDiscord, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { serverInfo } from '../data/server';
import { Logo } from './Logo';

const footerLinks = [
  { label: 'Início', to: '/' },
  { label: 'Servidor', to: '/servidor' },
  { label: 'Loja', to: '/loja' },
  { label: 'Regras', to: '/regras' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Status', to: '/status' },
  { label: 'Termos', to: '/termos' },
  { label: 'Privacidade', to: '/privacidade' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { href: serverInfo.tiktokUrl, icon: FaTiktok, label: 'TikTok', name: 'tiktok' },
    { href: serverInfo.discordUrl, icon: FaDiscord, label: 'Discord', name: 'discord' },
    { href: serverInfo.youtubeUrl, icon: FaYoutube, label: 'YouTube', name: 'youtube' },
  ];

  return (
    <footer className="relative z-10 bg-canvas/90 shadow-[0_-18px_46px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <div className="page-shell py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="footer-brand-group">
            <Logo />
            <div aria-label="Redes sociais da Crazy MC" className="footer-socials">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return social.href ? (
                  <a
                    aria-label={social.label}
                    className={`footer-social-link footer-social-${social.name}`}
                    href={social.href}
                    key={social.label}
                    rel="noreferrer"
                    target="_blank"
                    title={social.label}
                  >
                    <Icon aria-hidden="true" size={17} />
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    aria-label={`${social.label} em breve`}
                    className={`footer-social-link footer-social-${social.name} is-disabled`}
                    key={social.label}
                    title={`${social.label} em breve`}
                  >
                    <Icon aria-hidden="true" size={17} />
                  </span>
                );
              })}
            </div>
          </div>
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
