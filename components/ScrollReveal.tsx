'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.section, .tool-card, .panel'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('in');
            io.unobserve(el);
            window.setTimeout(() => el.classList.remove('reveal', 'in'), 850);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => {
      el.classList.add('reveal');
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
