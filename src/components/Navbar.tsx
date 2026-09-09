import { Menu, X } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { serverInfo } from '../data/server';
import { Logo } from './Logo';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Servidor', href: '#servidor' },
  { label: 'Loja', href: '#loja' },
  { label: 'Comunidade', href: '#comunidade' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-32% 0px -58%', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${hasScrolled ? 'bg-[#050b13]/90 shadow-[0_12px_38px_rgba(0,0,0,0.24)] backdrop-blur-xl' : 'bg-transparent'}`}>
      <nav aria-label="Navegação principal" className="page-shell flex h-[72px] items-center justify-between">
        <a aria-label="Crazy MC — início" href="#inicio" onClick={closeMenu}><Logo /></a>
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
              className={`nav-link ${activeSection === link.href.slice(1) ? 'is-active' : ''}`}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a className="button-discord header-discord hidden sm:inline-flex" href={serverInfo.discordUrl} rel="noreferrer" target="_blank">
          <FaDiscord aria-hidden="true" size={16} /> Entrar no Discord
        </a>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          className="grid h-10 w-10 place-items-center text-[#dfeaf2] lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <div
        className={`lg:hidden ${isOpen ? 'grid' : 'hidden'} bg-[#07101a]/98 px-5 pb-6 pt-3 shadow-2xl backdrop-blur-xl`}
        id="mobile-navigation"
      >
        <div className="page-shell grid gap-1">
          {navLinks.map((link) => (
            <a
              aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
              className={`rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-[#0f1e2c] hover:text-[#eaf4fa] ${activeSection === link.href.slice(1) ? 'bg-[#0f1e2c] text-[#78afd2]' : 'text-[#b8c9d6]'}`}
              href={link.href}
              key={link.label}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a className="button-discord mt-3 justify-center" href={serverInfo.discordUrl} onClick={closeMenu} rel="noreferrer" target="_blank">
            <FaDiscord aria-hidden="true" size={18} /> Entrar no Discord
          </a>
        </div>
      </div>
    </header>
  );
}
