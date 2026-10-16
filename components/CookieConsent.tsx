'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent choice
    const consent = localStorage.getItem('devxtool_cookie_consent');
    if (!consent) {
      // Delay showing banner slightly to avoid layout shift on first paint
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem('devxtool_cookie_consent', 'accepted');
    setShow(false);
  }

  function acceptNecessaryOnly() {
    localStorage.setItem('devxtool_cookie_consent', 'necessary_only');
    setShow(false);
  }

  if (!show) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl anim-fade-up"
    >
      <div className="rounded-2xl border-2 border-[#0d9488]/30 bg-white/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-start gap-3.5">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#e6f7f3] text-[#0d9488]">
            <ShieldCheck size={22} />
          </span>
          <div className="text-sm">
            <h3 className="font-extrabold text-[#101828]">
              We respect your privacy &amp; data choice
            </h3>
            <p className="mt-1 leading-relaxed text-[#475467]">
              DevX Tool processes all code, JSON, and inputs 100% locally in your browser. We and our advertising partner Google use cookies to analyze web traffic and deliver compliant, personalized ads under GDPR / ePrivacy regulations.
            </p>
            <div className="mt-2 text-xs">
              <Link href="/privacy" className="font-bold text-[#0d9488] underline hover:text-[#0f766e]">
                Read our Privacy Policy &amp; Cookie Details
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-shrink-0 flex-wrap items-center gap-2.5 sm:mt-0">
          <button
            type="button"
            onClick={acceptNecessaryOnly}
            className="btn btn-secondary !py-2.5 !px-4 text-xs font-bold"
          >
            Necessary only
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="btn btn-primary !py-2.5 !px-5 text-xs font-bold shadow-md"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={acceptNecessaryOnly}
            aria-label="Close cookie banner"
            className="rounded-lg p-1.5 text-[#98a2b3] hover:bg-[#f2f4f7] hover:text-[#475467]"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
