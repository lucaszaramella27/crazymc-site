import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Footer } from './Footer';
import { InteractiveMotion } from './InteractiveMotion';
import { Navbar } from './Navbar';
import { Reveal } from './Reveal';

const pageMetadata: Record<string, { description: string; title: string }> = {
  '/': { title: 'Crazy MC — Servidor Minecraft', description: 'Crazy MC é um servidor Minecraft semi-anárquico focado em liberdade, alianças e histórias criadas pelos jogadores.' },
  '/servidor': { title: 'Servidor — Crazy MC', description: 'Conheça o gameplay, os recursos e como entrar no servidor Minecraft Crazy MC.' },
  '/loja': { title: 'Loja — Crazy MC', description: 'Conheça os planos oficiais para apoiar o servidor Crazy MC.' },
  '/comunidade': { title: 'Comunidade — Crazy MC', description: 'Entre na comunidade oficial da Crazy MC e acompanhe anúncios, eventos e suporte.' },
  '/regras': { title: 'Regras — Crazy MC', description: 'Consulte os princípios essenciais para jogar e participar da comunidade Crazy MC.' },
  '/faq': { title: 'FAQ — Crazy MC', description: 'Respostas para as dúvidas mais comuns sobre o servidor Crazy MC.' },
  '/status': { title: 'Status — Crazy MC', description: 'Veja a disponibilidade, versão e jogadores conectados na Crazy MC em tempo real.' },
  '/termos': { title: 'Termos de uso — Crazy MC', description: 'Termos gerais de uso do site e dos serviços da Crazy MC.' },
  '/privacidade': { title: 'Privacidade — Crazy MC', description: 'Informações sobre privacidade e serviços externos utilizados pelo site da Crazy MC.' },
};

const fallbackMetadata = {
  title: 'Página não encontrada — Crazy MC',
  description: 'A página solicitada não foi encontrada no site da Crazy MC.',
};

function setMetaContent(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = pageMetadata[pathname] ?? fallbackMetadata;
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = metadata.title;
    setMetaContent('meta[name="description"]', metadata.description);
    setMetaContent('meta[property="og:title"]', metadata.title);
    setMetaContent('meta[property="og:description"]', metadata.description);
    setMetaContent('meta[name="twitter:title"]', metadata.title);
    setMetaContent('meta[name="twitter:description"]', metadata.description);

    const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim();
    if (configuredSiteUrl) {
      try {
        const pageUrl = new URL(pathname, configuredSiteUrl).toString();
        let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) {
          canonical = document.createElement('link');
          canonical.rel = 'canonical';
          document.head.appendChild(canonical);
        }
        canonical.href = pageUrl;
        const socialImageUrl = new URL('/og-crazymc.jpg', configuredSiteUrl).toString();
        upsertMeta('property', 'og:url', pageUrl);
        upsertMeta('property', 'og:image', socialImageUrl);
        upsertMeta('name', 'twitter:image', socialImageUrl);
      } catch {
        document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.remove();
        document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.remove();
        document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.remove();
        document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.remove();
      }
    } else {
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.remove();
      document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.remove();
      document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.remove();
      document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.remove();
    }
  }, [pathname]);

  return null;
}

function PageLoading() {
  return (
    <div aria-live="polite" className="page-shell flex min-h-[55svh] items-center justify-center pt-[72px] text-sm text-muted" role="status">
      <span className="status-dot mr-3" /> Carregando página
    </div>
  );
}

export function SiteLayout() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-canvas text-ink">
      <RouteEffects />
      <InteractiveMotion />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </main>
      <Reveal><Footer /></Reveal>
    </div>
  );
}
