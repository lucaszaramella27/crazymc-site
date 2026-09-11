import { useCallback, useEffect, useRef, type CSSProperties, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import grassBlock from '../assets/grass-block-je2.webp';

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

export function HolographicGrassBlock() {
  const controlRef = useRef<HTMLButtonElement>(null);
  const artworkRef = useRef<HTMLSpanElement>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({ active: false, x: 0, y: 0 });
  const visibleRef = useRef(true);

  const updateArtwork = useCallback((automaticX = 0, automaticY = 0) => {
    const artwork = artworkRef.current;
    if (!artwork) return;
    artwork.style.setProperty('--block-tilt-x', `${tiltRef.current.x + automaticX}deg`);
    artwork.style.setProperty('--block-tilt-y', `${tiltRef.current.y + automaticY}deg`);
  }, []);

  useEffect(() => {
    const control = controlRef.current;
    if (!control) return;

    updateArtwork();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animationFrame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    observer.observe(control);

    const animate = (time: number) => {
      if (visibleRef.current && !dragRef.current.active) {
        const seconds = time / 1000;
        updateArtwork(Math.sin(seconds * 0.72) * 1.8, Math.cos(seconds * 0.56) * 3.2);
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [updateArtwork]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    dragRef.current = { active: true, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add('is-dragging');
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current.active) return;

    const deltaX = event.clientX - dragRef.current.x;
    const deltaY = event.clientY - dragRef.current.y;
    dragRef.current.x = event.clientX;
    dragRef.current.y = event.clientY;
    tiltRef.current.x = clamp(tiltRef.current.x - deltaY * 0.08, -14, 14);
    tiltRef.current.y = clamp(tiltRef.current.y + deltaX * 0.1, -14, 14);
    updateArtwork();
  };

  const finishDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    dragRef.current.active = false;
    event.currentTarget.classList.remove('is-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 4 : 2;

    if (event.key === 'ArrowLeft') tiltRef.current.y = clamp(tiltRef.current.y - step, -14, 14);
    else if (event.key === 'ArrowRight') tiltRef.current.y = clamp(tiltRef.current.y + step, -14, 14);
    else if (event.key === 'ArrowUp') tiltRef.current.x = clamp(tiltRef.current.x - step, -14, 14);
    else if (event.key === 'ArrowDown') tiltRef.current.x = clamp(tiltRef.current.x + step, -14, 14);
    else return;

    event.preventDefault();
    updateArtwork();
  };

  const artworkStyle = {
    '--grass-block-mask': `url("${grassBlock}")`,
  } as CSSProperties;

  return (
    <div className="grass-hologram">
      <button
        aria-label="Bloco de grama holografico interativo. Arraste ou use as setas para inclinar."
        className="hologram-control"
        onKeyDown={handleKeyDown}
        onPointerCancel={finishDrag}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        ref={controlRef}
        type="button"
      >
        <span aria-hidden="true" className="hologram-aura" />

        <span aria-hidden="true" className="hologram-block-float">
          <span className="hologram-block-art" ref={artworkRef} style={artworkStyle}>
            <img alt="" className="hologram-block-image" draggable="false" src={grassBlock} />
            <span className="hologram-block-scan" />
          </span>
        </span>
        <span aria-hidden="true" className="hologram-platform" />
      </button>
    </div>
  );
}
