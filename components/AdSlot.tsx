'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export default function AdSlot({
  slotId = '1234567890',
  format = 'auto',
  className = '',
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // @ts-expect-error Google AdSense global
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Ignore if AdSense script is blocked or not yet active during review
    }
  }, []);

  return (
    <div
      ref={adRef}
      className={`ad-container-safe my-10 w-full overflow-hidden rounded-2xl border border-dashed border-[#e2e8f0] bg-[#fafbfc] p-3 text-center ${className}`}
      aria-label="Advertisement"
    >
      {/* Official AdSense label mandated by Google policies */}
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
        Advertisement
      </span>

      <ins
        className="adsbygoogle block"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client="ca-pub-1887267392383699"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
