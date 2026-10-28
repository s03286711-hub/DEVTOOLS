'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Braces, Menu, X, Wrench, BookOpen, Newspaper } from 'lucide-react';
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
            DevX<span className="text-[#0d9488]"> Tool</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-5 text-sm font-semibold text-[#475467] lg:flex">
          <Link href="/tools" prefetch={false} className="hover:text-[#0d9488]">All tools</Link>
          <Link href="/ai-tools/" prefetch={false} className="hover:text-[#0d9488]">AI Tools</Link>
          <Link href="/ai-questions/" prefetch={false} className="hover:text-[#0d9488]">AI Questions</Link>
          <Link href="/guides" prefetch={false} className="hover:text-[#0d9488] flex items-center gap-1.5">
            <BookOpen size={15} className="text-[#0d9488]" /> Guides
          </Link>
          <Link href="/blog" prefetch={false} className="hover:text-[#0d9488] flex items-center gap-1.5">
            <Newspaper size={15} className="text-[#0d9488]" /> Tech Blog
          </Link>
          <Link href="/news/" prefetch={false} className="hover:text-[#0d9488]">Tech News</Link>
          <Link href="/about" prefetch={false} className="hover:text-[#0d9488]">About</Link>
          <Link href="/contact" prefetch={false} className="hover:text-[#0d9488]">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link className="btn btn-primary !hidden !rounded-[10px] !px-3.5 !py-2.5 xl:!inline-flex" href="/#tools" prefetch={false}>
            <Wrench size={16} /> Explore tools
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dfe2eb] text-[#475467] lg:hidden hover:bg-[#f8f9fc]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-b border-[#eceef4] bg-white px-5 py-6 lg:hidden anim-fade-up">
          <nav className="flex flex-col space-y-4 text-base font-bold text-[#475467]">
            <Link href="/tools" prefetch={false} onClick={() => setOpen(false)} className="hover:text-[#0d9488]">All tools</Link>
            <Link href="/ai-tools/" prefetch={false} onClick={() => setOpen(false)} className="hover:text-[#0d9488]">Creative AI Tools</Link>
            <Link href="/ai-questions/" prefetch={false} onClick={() => setOpen(false)} className="hover:text-[#0d9488]">AI Questions &amp; Research</Link>
            <Link href="/guides" prefetch={false} onClick={() => setOpen(false)} className="hover:text-[#0d9488]">Developer Guides</Link>
            <Link href="/blog" prefetch={false} onClick={() => setOpen(false)} className="hover:text-[#0d9488]">Engineering Tech Blog</Link>
            <Link href="/news/" prefetch={false} onClick={() => setOpen(false)} className="hover:text-[#0d9488]">Tech News</Link>
            <Link href="/about" prefetch={false} onClick={() => setOpen(false)} className="hover:text-[#0d9488]">About DevX</Link>
            <Link href="/contact" prefetch={false} onClick={() => setOpen(false)} className="hover:text-[#0d9488]">Contact Support</Link>
            <Link href="/privacy" prefetch={false} onClick={() => setOpen(false)} className="hover:text-[#0d9488]">Privacy Policy</Link>
            <Link href="/terms" prefetch={false} onClick={() => setOpen(false)} className="hover:text-[#0d9488]">Terms of Service</Link>
          </nav>
          <div className="mt-5 pt-5 border-t border-[#f0f2f7]">
            <Link className="btn btn-primary w-full justify-center" href="/#tools" prefetch={false} onClick={() => setOpen(false)}>
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
        <div className="lg:col-span-1">
          <Link href="/" className="flex w-fit items-center gap-2 font-extrabold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d9488] text-white">
              <Braces size={18} />
            </span>
            DevX Tool
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#667085]">
            Browser-based developer utilities, practical tech guides, and a source-reviewed directory of creative AI tools.
          </p>
          <p className="mt-4 text-xs text-[#98a2b3]">
            © {new Date().getFullYear()} DevX Tool (devxtool.me). All rights reserved.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold">Popular tools</h3>
          <ul className="space-y-3 text-sm text-[#667085]">
            {tools.slice(0, 6).map((t) => (
              <li key={t.slug}>
                <Link className="hover:text-[#0d9488]" href={`/tools/${t.slug}`} prefetch={false}>
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold">Educational Hub</h3>
          <ul className="space-y-3 text-sm text-[#667085]">
            <li><Link href="/ai-tools/" className="hover:text-[#0d9488]">Creative AI Tools Directory</Link></li>
            <li><Link href="/ai-questions/" className="hover:text-[#0d9488]">AI Questions &amp; Research</Link></li>
            <li><Link href="/news/" className="hover:text-[#0d9488]">Tech News &amp; Explainers</Link></li>
            <li><Link href="/news/google/" className="hover:text-[#0d9488]">Google AI &amp; Gemini News</Link></li>
            <li><Link href="/news/microsoft/" className="hover:text-[#0d9488]">Microsoft &amp; Copilot News</Link></li>
            <li><a href="/feed.xml" className="hover:text-[#0d9488]">Subscribe with RSS</a></li>
            <li><Link href="/guides" prefetch={false} className="hover:text-[#0d9488]">Developer Knowledge Base</Link></li>
            <li><Link href="/blog" prefetch={false} className="hover:text-[#0d9488]">Engineering Tech Blog</Link></li>
            <li><Link href="/guides/uuid-guide" prefetch={false} className="hover:text-[#0d9488]">RFC 9562 UUID Deep Dive</Link></li>
            <li><Link href="/guides/jwt-explained" prefetch={false} className="hover:text-[#0d9488]">JWT Cryptography & Security</Link></li>
            <li><Link href="/guides/hashing-explained" prefetch={false} className="hover:text-[#0d9488]">SHA Hashing & Passwords</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold">About &amp; Legal</h3>
          <ul className="space-y-3 text-sm text-[#667085]">
            <li><Link href="/about" prefetch={false} className="hover:text-[#0d9488]">About DevX Tool</Link></li>
            <li><Link href="/contact" prefetch={false} className="hover:text-[#0d9488]">Contact Support</Link></li>
            <li><Link href="/privacy" prefetch={false} className="hover:text-[#0d9488]">Privacy Policy</Link></li>
            <li><Link href="/terms" prefetch={false} className="hover:text-[#0d9488]">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
