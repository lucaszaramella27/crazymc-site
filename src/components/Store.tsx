import { Check } from 'lucide-react';
import type { CSSProperties } from 'react';
import { serverInfo } from '../data/server';
import { products } from '../data/store';

export function Store() {
  return (
    <section className="page-content-section" id="loja">
      <div className="page-shell relative">
        <h2 className="sr-only">Planos da loja Crazy MC</h2>
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3 lg:items-stretch">
          {products.map((product, index) => (
            <article
              className={`depth-card store-card tilt-card stagger-item relative flex flex-col rounded-2xl p-7 transition duration-300 ${product.popular ? 'depth-card-featured lg:-mt-3 lg:mb-3 lg:py-10' : ''}`}
              data-tilt
              key={product.name}
              style={{ '--stagger-delay': `${index * 70}ms` } as CSSProperties}
            >
              {product.popular && (
                <span className="absolute -top-px left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded-t-lg bg-brand px-4 py-1.5 text-[10px] font-bold tracking-[0.15em] text-[#0b100b]">
                  MAIS POPULAR
                </span>
              )}
              <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ink-soft">{product.name}</p>
              <p className="mt-5 font-display text-4xl font-bold tracking-[-0.05em] text-ink">{product.price}</p>
              <ul className="mt-7 flex flex-1 flex-col gap-4">
                {product.benefits.map((benefit) => (
                  <li className="flex gap-3 text-sm leading-5 text-muted" key={benefit}>
                    <Check aria-hidden="true" className="mt-0.5 shrink-0 text-brand" size={16} />
                    {benefit}
                  </li>
                ))}
              </ul>
              <a
                aria-label={`${product.action} pelo Discord oficial`}
                className={product.popular ? 'button-primary mt-9 w-full justify-center' : 'button-outline mt-9 w-full justify-center'}
                href={serverInfo.discordUrl}
                rel="noreferrer"
                target="_blank"
              >
                {product.action}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
