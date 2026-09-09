import { MessageCircle } from 'lucide-react';
import { serverInfo } from '../data/server';
import { CopyIpButton } from './CopyIpButton';
import { Logo } from './Logo';

export function CTA() {
  return (
    <section className="page-shell pb-16 sm:pb-24">
      <div className="final-cta relative isolate overflow-hidden rounded-3xl px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="relative grid gap-14 lg:grid-cols-[1.05fr_.75fr] lg:items-center">
          <div>
            <p className="eyebrow">CRAZY MC ESTÁ ONLINE</p>
            <h2 className="section-title section-title-effect mt-5">PRONTO PARA <span className="title-accent">ENTRAR NO CAOS?</span></h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#9aa9b8]">Entre agora, encontre seu território e comece uma história que só existe porque você chegou.</p>
            <div className="server-address mt-8">
              <span>ENDEREÇO DO SERVIDOR</span>
              <strong>{serverInfo.ip}</strong>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CopyIpButton />
              <a className="button-outline" href={serverInfo.discordUrl} rel="noreferrer" target="_blank">
                <MessageCircle size={16} /> Discord
              </a>
            </div>
          </div>

          <div aria-hidden="true" className="portal-stage">
            <span className="portal-pixel portal-pixel-a" />
            <span className="portal-pixel portal-pixel-b" />
            <span className="portal-pixel portal-pixel-c" />
            <div className="portal-frame portal-frame-outer">
              <div className="portal-frame portal-frame-middle">
                <div className="portal-core">
                  <Logo compact className="cta-portal-logo" />
                </div>
              </div>
            </div>
            <span className="portal-status"><i className="status-dot" /> SPAWN DISPONÍVEL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
