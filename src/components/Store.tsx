import { Check, X } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import { products, type StoreProduct } from '../data/store';

export function Store() {
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);

  return (
    <section className="section-space" id="loja">
      <div className="page-shell relative">
        <div className="relative text-center">
          <p className="eyebrow mx-auto w-fit">LOJA CRAZY MC</p>
          <h2 className="section-title section-title-effect section-title-center mt-5">APOIE A <span className="title-accent">CRAZY MC</span></h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#9aa9b8]">
            Ajude o servidor a crescer e receba benefícios exclusivos.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-4 lg:grid-cols-3 lg:items-stretch">
          {products.map((product, index) => (
            <article
              className={`depth-card store-card tilt-card stagger-item relative flex flex-col rounded-2xl p-7 transition duration-300 ${product.popular ? 'depth-card-featured lg:-mt-3 lg:mb-3 lg:py-10' : ''}`}
              data-tilt
              key={product.name}
              style={{ '--stagger-delay': `${index * 70}ms` } as CSSProperties}
            >
              {product.popular && (
                <span className="absolute -top-px left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded-t-lg bg-[#8cc8f5] px-4 py-1.5 text-[10px] font-bold tracking-[0.15em] text-[#06111b]">
                  MAIS POPULAR
                </span>
              )}
              <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-[#b8c9d6]">{product.name}</p>
              <p className="mt-5 font-display text-4xl font-bold tracking-[-0.05em] text-[#eaf4fa]">{product.price}</p>
              <ul className="mt-7 flex flex-1 flex-col gap-4">
                {product.benefits.map((benefit) => (
                  <li className="flex gap-3 text-sm leading-5 text-[#9aa7b4]" key={benefit}>
                    <Check aria-hidden="true" className="mt-0.5 shrink-0 text-[#8cc8f5]" size={16} />
                    {benefit}
                  </li>
                ))}
              </ul>
              <button
                className={product.popular ? 'button-primary mt-9 w-full justify-center' : 'button-outline mt-9 w-full justify-center'}
                onClick={() => setSelectedProduct(product)}
                type="button"
              >
                {product.action}
              </button>
            </article>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <div aria-modal="true" className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-5 backdrop-blur-sm" role="dialog">
          <div className="depth-card relative w-full max-w-md rounded-2xl p-7 shadow-2xl">
            <button
              aria-label="Fechar"
              className="absolute right-4 top-4 rounded-full p-2 text-[#9aa9b8] transition hover:bg-white/5 hover:text-white"
              onClick={() => setSelectedProduct(null)}
              type="button"
            >
              <X size={20} />
            </button>
            <p className="eyebrow">LOJA EM BREVE</p>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.04em]">{selectedProduct.name}</h3>
            <p className="mt-3 leading-7 text-[#9aa9b8]">
              O checkout ainda está sendo preparado. Entre no Discord para receber ajuda da equipe e acompanhar o lançamento da loja.
            </p>
            <button className="button-primary mt-7" onClick={() => setSelectedProduct(null)} type="button">Entendi</button>
          </div>
        </div>
      )}
    </section>
  );
}
