import { Component, type ReactNode } from 'react';

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="grid min-h-screen place-items-center bg-canvas px-5 text-ink">
        <section className="w-full max-w-xl rounded-2xl bg-surface p-7 shadow-2xl sm:p-10">
          <p className="eyebrow">FALHA DE CARREGAMENTO</p>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-[-.05em] sm:text-4xl">Não foi possível abrir esta página.</h1>
          <p className="mt-4 leading-7 text-muted">Sua conexão pode ter sido interrompida durante uma atualização. Recarregue para tentar novamente.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button className="button-primary" onClick={() => window.location.reload()} type="button">Recarregar página</button>
            <a className="button-outline" href="/">Voltar ao início</a>
          </div>
        </section>
      </main>
    );
  }
}
