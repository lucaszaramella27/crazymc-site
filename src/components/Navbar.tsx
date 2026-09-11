import { Menu, X } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { serverInfo } from '../data/server';
import { Logo } from './Logo';

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Servidor', to: '/servidor' },
  { label: 'Loja', to: '/loja' },
  { label: 'Regras', to: '/regras' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Status', to: '/status' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${hasScrolled ? 'bg-canvas/90 shadow-[0_12px_38px_rgba(0,0,0,0.24)] backdrop-blur-xl' : 'bg-transparent'}`}>
      <nav aria-label="Navegação principal" className="site-nav page-shell flex h-[72px] items-center justify-between">
        <Link aria-label="Crazy MC — início" className="header-brand" onClick={closeMenu} to="/"><Logo /></Link>
        <div className="nav-group hidden items-center lg:flex">
          {navLinks.map((link) => (
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              end={link.to === '/'}
              key={link.label}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <a className="button-discord header-discord hidden sm:inline-flex" href={serverInfo.discordUrl} rel="noreferrer" target="_blank">
          <FaDiscord aria-hidden="true" size={16} /> Entrar no Discord
        </a>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          className="grid h-10 w-10 place-items-center text-ink-soft lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <div
        className={`lg:hidden ${isOpen ? 'grid' : 'hidden'} bg-surface-deep/98 px-5 pb-6 pt-3 shadow-2xl backdrop-blur-xl`}
        id="mobile-navigation"
      >
        <div className="page-shell grid gap-1">
          {navLinks.map((link) => (
            <NavLink
              className={({ isActive }) => `rounded-full px-4 py-3 text-sm font-medium transition hover:bg-surface-raised hover:text-ink ${isActive ? 'bg-surface-raised text-brand-light' : 'text-ink-soft'}`}
              end={link.to === '/'}
              key={link.label}
              onClick={closeMenu}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
          <a className="button-discord mt-3 justify-center" href={serverInfo.discordUrl} onClick={closeMenu} rel="noreferrer" target="_blank">
            <FaDiscord aria-hidden="true" size={18} /> Entrar no Discord
          </a>
        </div>
      </div>
    </header>
  );
}
