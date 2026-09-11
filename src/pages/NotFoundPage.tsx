import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <section className="page-shell flex min-h-[calc(100svh-72px)] items-center pt-[72px]">
      <div className="py-20">
        <p className="eyebrow">ERRO 404</p>
        <h1 className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] font-semibold leading-[.9] tracking-[-.07em] text-ink">CHUNK NÃO<br /><span className="text-brand">ENCONTRADO.</span></h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-muted">Essa área do mapa não existe ou mudou de endereço.</p>
        <Link className="button-primary mt-8" to="/"><ArrowLeft aria-hidden="true" size={16} /> Voltar ao início</Link>
      </div>
    </section>
  );
}
