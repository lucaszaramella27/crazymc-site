import { useEffect, useRef, useState, type PropsWithChildren } from 'react';

export function Reveal({ children }: PropsWithChildren) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`scroll-reveal ${isVisible ? 'is-visible' : ''}`} ref={elementRef}>
      {children}
    </div>
  );
}
