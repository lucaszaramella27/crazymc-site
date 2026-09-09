import { BadgeCheck, Gamepad2, MessageCircle } from 'lucide-react';
import type { CSSProperties } from 'react';
import { serverInfo } from '../data/server';

const steps = [
  { number: '01', icon: MessageCircle, title: 'Entre no Discord', text: 'Conheça a comunidade e fique por dentro das novidades.' },
  { number: '02', icon: BadgeCheck, title: 'Faça sua verificação', text: 'Complete o processo rápido para liberar todos os canais.' },
  { number: '03', icon: Gamepad2, title: 'Conecte em', text: serverInfo.ip, highlight: true },
];

export function HowToPlay() {
  return (
    <section className="section-space" id="como-jogar">
      <div className="page-shell relative">
        <div className="relative ml-auto max-w-xl lg:text-right">
          <p className="eyebrow lg:justify-end">COMECE AGORA</p>
          <h2 className="section-title section-title-effect section-title-right mt-5">COMO <span className="text-[#d7e1ea]">JOGAR</span></h2>
          <p className="mt-5 leading-7 text-[#8998a7]">Três passos rápidos separam você do seu primeiro bloco na Crazy MC.</p>
        </div>
        <div className="relative mt-12 grid gap-7 md:grid-cols-3 md:gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                className="group stagger-item relative grid grid-cols-[58px_1fr] gap-5 md:block"
                key={step.number}
                style={{ '--stagger-delay': `${index * 70}ms` } as CSSProperties}
              >
                <div className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-[#162330] text-[#8cc8f5] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#1d2c38] group-hover:text-[#eaf4fa] md:mb-9">
                  <Icon size={21} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display text-xs font-bold tracking-[.15em] text-[#6f7e8c]">{step.number}</p>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-[-.03em] text-[#dfeaf2]">{step.title}</h3>
                  <p className={`mt-2 text-sm ${step.highlight ? 'font-mono text-[#b8d8ee]' : 'leading-6 text-[#8998a7]'}`}>{step.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
