import { ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';
import { faqItems } from '../data/faq';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-space" id="faq">
      <div className="page-shell relative grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
        <div className="section-intro relative">
          <p className="eyebrow">PRECISA DE AJUDA?</p>
          <h2 className="section-title section-title-effect mt-5">PERGUNTAS <span className="text-[#d7e1ea]">FREQUENTES</span></h2>
          <p className="mt-6 max-w-sm leading-7 text-[#8998a7]">Tudo o que você precisa saber antes de começar sua história.</p>
        </div>
        <div className="relative grid gap-2">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                className="depth-card rounded-xl px-5 sm:px-7"
                key={item.question}
              >
                <button
                  aria-controls={`faq-answer-${index}`}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  type="button"
                >
                  <span className="font-display text-base font-bold tracking-[-.02em] text-[#d5e2ec] sm:text-lg">{item.question}</span>
                  {isOpen ? <ChevronDown className="shrink-0 text-[#8cc8f5]" size={19} /> : <Plus className="shrink-0 text-[#7f91a0]" size={19} />}
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  id={`faq-answer-${index}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-sm leading-7 text-[#8f9eac]">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
