import { ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';
import { faqItems } from '../data/faq';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="page-content-section" id="faq">
      <div className="page-shell">
        <h2 className="sr-only">Perguntas frequentes</h2>
        <div className="relative ml-auto grid max-w-5xl gap-2">
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
                  <span className="font-display text-base font-bold tracking-[-.02em] text-ink-soft sm:text-lg">{item.question}</span>
                  {isOpen ? <ChevronDown className="shrink-0 text-brand" size={19} /> : <Plus className="shrink-0 text-muted-dark" size={19} />}
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  id={`faq-answer-${index}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-sm leading-7 text-muted">{item.answer}</p>
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
