'use client';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Wrench, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { tools } from '@/lib/site';

interface EmbeddedToolProps {
  toolSlug: string;
  headline?: string;
  description?: string;
  children: ReactNode;
}

export default function EmbeddedTool({
  toolSlug,
  headline,
  description,
  children,
}: EmbeddedToolProps) {
  const [collapsed, setCollapsed] = useState(false);
  const tool = tools.find((t) => t.slug === toolSlug);

  return (
    <section className="my-10 rounded-2xl border-2 border-[#14b8a6]/40 bg-[#f8fdfc] p-5 shadow-sm transition sm:p-7 not-prose">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ccfbf1] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0d9488] text-white shadow-sm">
            <Wrench size={18} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#0f766e]">
                Interactive In-Guide Tool
              </span>
              <span className="rounded-full bg-[#ccfbf1] px-2 py-0.5 text-[10px] font-bold text-[#0f766e]">
                Client-Side Sandbox
              </span>
            </div>
            <h3 className="!mt-0.5 !mb-0 text-lg font-black text-[#134e4a]">
              {headline || `Live Playground: ${tool?.title || 'Interactive Tool'}`}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {tool && (
            <Link
              href={`/tools/${tool.slug}`}
              prefetch={false}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#0f766e] border border-[#99f6e4] hover:bg-[#ccfbf1] transition"
            >
              Open Fullscreen <ArrowUpRight size={13} />
            </Link>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle tool visibility"
            className="rounded-lg border border-[#ccfbf1] bg-white p-1.5 text-[#0f766e] hover:bg-[#ccfbf1]"
          >
            {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {description && !collapsed && (
        <p className="mt-3 text-sm leading-relaxed text-[#475467]">
          {description}
        </p>
      )}

      {!collapsed && (
        <div className="mt-5 rounded-xl border border-[#d1fae5] bg-white p-2 sm:p-4 shadow-inner">
          {children}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-[#667085]">
        <span>⚡ 100% Private: All calculations happen locally inside your browser</span>
        {tool && (
          <Link href={`/tools/${tool.slug}`} className="hover:text-[#0d9488] underline">
            Dedicated Tool Page →
          </Link>
        )}
      </div>
    </section>
  );
}
