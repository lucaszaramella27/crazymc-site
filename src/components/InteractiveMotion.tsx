import { useEffect } from 'react';

const resetTilt = (element: HTMLElement) => {
  element.style.setProperty('--tilt-x', '0deg');
  element.style.setProperty('--tilt-y', '0deg');
};

export function InteractiveMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
      if (!(event.target instanceof Element)) return;
      const card = event.target.closest('[data-tilt]') as HTMLElement | null;
      if (!card) return;

      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty('--tilt-x', `${(-y * 2).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 2.4).toFixed(2)}deg`);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const card = event.target.closest('[data-tilt]') as HTMLElement | null;
      if (!card) return;
      if (event.relatedTarget instanceof Node && card.contains(event.relatedTarget)) return;
      resetTilt(card);
    };

    const resetAll = () => {
      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(resetTilt);
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });
    reducedMotion.addEventListener('change', resetAll);
    finePointer.addEventListener('change', resetAll);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
      reducedMotion.removeEventListener('change', resetAll);
      finePointer.removeEventListener('change', resetAll);
    };
  }, []);

  return null;
}
