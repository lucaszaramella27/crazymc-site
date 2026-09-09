import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  depth: number;
  radius: number;
  alpha: number;
  phase: number;
  speed: number;
  color: string;
  offsetX: number;
  offsetY: number;
};

const FRAME_INTERVAL = 1000 / 30;
const TAU = Math.PI * 2;

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let stars: Star[] = [];
    let width = 1;
    let height = 1;
    let frameId = 0;
    let lastFrame = 0;
    let lastDrawTime = 0;
    let elapsed = 0;
    let scrollParallax = -window.scrollY * 0.1;
    const pointer = { x: 0, y: 0, active: false };
    const parallax = { x: 0, y: 0 };

    function createStar(): Star {
      const depth = 0.25 + Math.random() * 0.75;
      const edgeCluster = Math.random() < 0.58;
      const x = edgeCluster
        ? (Math.random() < 0.5 ? 0.02 + Math.random() ** 1.7 * 0.32 : 0.98 - Math.random() ** 1.7 * 0.32)
        : Math.random();
      return {
        x,
        y: Math.random(),
        depth,
        radius: 0.5 + depth * 0.95,
        alpha: 0.2 + Math.random() * 0.34,
        phase: Math.random() * TAU,
        speed: 0.35 + Math.random() * 0.45,
        color: Math.random() > 0.3 ? '#eaf4fa' : '#8cc8f5',
        offsetX: 0,
        offsetY: 0,
      };
    }

    function draw(delta: number) {
      if (!context) return;
      const reducedMotion = motionPreference.matches;
      const interactive = pointer.active && finePointer.matches && !reducedMotion;
      const easing = 1 - Math.exp(-delta * 3);
      elapsed += delta;
      const targetX = interactive ? (pointer.x / width - 0.5) * 18 : 0;
      const targetY = interactive ? (pointer.y / height - 0.5) * 14 : 0;
      parallax.x = reducedMotion ? 0 : parallax.x + (targetX - parallax.x) * easing;
      parallax.y = reducedMotion ? 0 : parallax.y + (targetY - parallax.y) * easing;
      const scrollEasing = 1 - Math.exp(-delta * 8);
      scrollParallax = reducedMotion
        ? 0
        : scrollParallax + (-window.scrollY * 0.1 - scrollParallax) * scrollEasing;
      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        // Normalized coordinates keep the field stable when the viewport resizes.
        if (!reducedMotion) {
          star.x = (star.x + delta * (4 + star.depth * 8) / width) % 1;
          star.y = (star.y - delta * (6 + star.depth * 12) / height + 1) % 1;
        }
        const baseX = star.x * width;
        const baseY = star.y * height;
        let pushX = 0;
        let pushY = 0;
        if (interactive) {
          const dx = baseX - pointer.x;
          const dy = baseY - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < 150) {
            const force = (1 - distance / 150) ** 2 * 16 * star.depth;
            pushX = dx / distance * force;
            pushY = dy / distance * force;
          }
        }
        star.offsetX = reducedMotion ? 0 : star.offsetX + (pushX - star.offsetX) * easing;
        star.offsetY = reducedMotion ? 0 : star.offsetY + (pushY - star.offsetY) * easing;
        const x = ((baseX + parallax.x * star.depth + star.offsetX) % width + width) % width;
        const scrollDepth = 0.35 + star.depth * 0.65;
        const y = ((baseY + parallax.y * star.depth + star.offsetY + scrollParallax * scrollDepth) % height + height) % height;
        const shimmer = reducedMotion ? 0.85 : 0.82 + Math.sin(elapsed * star.speed + star.phase) * 0.18;
        const alpha = star.alpha * shimmer;

        context.fillStyle = star.color;
        if (star.depth > 0.88) {
          context.globalAlpha = alpha * 0.08;
          context.beginPath();
          context.arc(x, y, star.radius * 4, 0, TAU);
          context.fill();
        }
        context.globalAlpha = alpha;
        context.beginPath();
        context.arc(x, y, star.radius, 0, TAU);
        context.fill();
      }
      context.globalAlpha = 1;
    }

    function tick(time: number) {
      frameId = 0;
      if (document.hidden || motionPreference.matches) return;
      if (!lastFrame) {
        lastFrame = time;
        lastDrawTime = time;
      }
      const delta = time - lastFrame;
      if (delta >= FRAME_INTERVAL) {
        draw(Math.min((time - lastDrawTime) / 1000, 0.08));
        lastDrawTime = time;
        lastFrame = time - delta % FRAME_INTERVAL;
      }
      frameId = window.requestAnimationFrame(tick);
    }

    function syncAnimation() {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      lastFrame = 0;
      lastDrawTime = 0;
      if (document.hidden) return;
      draw(0);
      if (!motionPreference.matches) frameId = window.requestAnimationFrame(tick);
    }

    function resize() {
      if (!canvas || !context) return;
      width = Math.max(1, canvas.clientWidth);
      height = Math.max(1, canvas.clientHeight);
      // Cap both the particle count and the backing resolution on high-DPI screens.
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const compact = width < 768 || !finePointer.matches;
      const count = Math.min(
        compact ? 44 : 108,
        Math.max(compact ? 28 : 58, Math.round(width * height / 11200)),
      );
      stars = stars.slice(0, count);
      while (stars.length < count) stars.push(createStar());
      syncAnimation();
    }

    function onPointerMove(event: PointerEvent) {
      if (motionPreference.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }

    function resetPointer() {
      pointer.active = false;
    }

    function onVisibilityChange() {
      resetPointer();
      syncAnimation();
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', resetPointer);
    window.addEventListener('blur', resetPointer);
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    motionPreference.addEventListener('change', syncAnimation);
    finePointer.addEventListener('change', resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', resetPointer);
      window.removeEventListener('blur', resetPointer);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionPreference.removeEventListener('change', syncAnimation);
      finePointer.removeEventListener('change', resize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="galaxy-background">
      <canvas className="galaxy-stars" ref={canvasRef} />
      <span className="shooting-star" />
    </div>
  );
}
