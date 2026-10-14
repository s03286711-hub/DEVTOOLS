'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Braces, Menu, X, Wrench } from 'lucide-react';
import { tools } from '@/lib/site';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#eceef4] bg-white/95 backdrop-blur-xl">
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0d9488] text-white">
            <Braces size={21} />
          </span>
          <span className="text-[1.05rem] font-extrabold tracking-tight">
            Dev<span className="text-[#0d9488]">Toolbox</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#475467] md:flex">
          <Link href="/#tools" className="hover:text-[#0d9488]">All tools</Link>
          <Link href="/#guides" className="hover:text-[#0d9488]">Guides</Link>
          <Link href="/about" className="hover:text-[#0d9488]">About</Link>
          <Link href="/contact" className="hover:text-[#0d9488]">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link className="btn btn-primary hidden !rounded-[10px] !px-3.5 !py-2.5 sm:inline-flex" href="/#tools">
            <Wrench size={16} /> Explore tools
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe2eb] text-[#475467] md:hidden hover:bg-[#f8f9fc]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-b border-[#eceef4] bg-white px-5 py-6 md:hidden anim-fade-up">
          <nav className="flex flex-col space-y-4 text-base font-bold text-[#475467]">
            <Link href="/#tools" onClick={() => setOpen(false)} className="hover:text-[#0d9488]">All tools</Link>
            <Link href="/#guides" onClick={() => setOpen(false)} className="hover:text-[#0d9488]">Guides</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="hover:text-[#0d9488]">About</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-[#0d9488]">Contact</Link>
            <Link href="/privacy" onClick={() => setOpen(false)} className="hover:text-[#0d9488]">Privacy Policy</Link>
            <Link href="/terms" onClick={() => setOpen(false)} className="hover:text-[#0d9488]">Terms of Service</Link>
          </nav>
          <div className="mt-5 pt-5 border-t border-[#f0f2f7]">
            <Link className="btn btn-primary w-full justify-center" href="/#tools" onClick={() => setOpen(false)}>
              <Wrench size={16} /> Browse 11 free tools
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="flex w-fit items-center gap-2 font-extrabold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d9488] text-white">
              <Braces size={18} />
            </span>
            DevToolbox
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#667085]">
            Free, practical online utilities for developers and curious problem-solvers. Built to be simple, fast, and privacy-conscious with client-side execution.
          </p>
          <p className="mt-4 text-xs text-[#98a2b3]">
            © {new Date().getFullYear()} DevToolbox (devxtool.me). All rights reserved.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold">Popular tools</h3>
          <ul className="space-y-3 text-sm text-[#667085]">
            {tools.slice(0, 6).map((t) => (
              <li key={t.slug}>
                <Link className="hover:text-[#0d9488]" href={`/tools/${t.slug}`}>
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold">Navigation & Legal</h3>
          <ul className="space-y-3 text-sm text-[#667085]">
            <li><Link href="/about">About DevToolbox</Link></li>
            <li><Link href="/contact">Contact Support</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/#guides">Developer Learning Guides</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
