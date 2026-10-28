'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react';
import { hasFreeAccess, type AiTool, type AiCategoryId } from '@/lib/ai-tools';

export default function AiToolDirectory({ tools, categories, initialCategory, fixedCategory = false }: {
  tools: AiTool[];
  categories: { id: AiCategoryId; name: string }[];
  initialCategory?: AiCategoryId;
  fixedCategory?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<AiCategoryId | 'all'>(initialCategory ?? 'all');
  const [freeOnly, setFreeOnly] = useState(true);
  const filtered = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return tools.filter((tool) => {
      if (category !== 'all' && !tool.categories.includes(category)) return false;
      if (freeOnly && !hasFreeAccess(tool)) return false;
      const text = [tool.name, tool.maker, tool.task, tool.description, tool.bestFor, ...tool.keywords].join(' ').toLowerCase();
      return terms.every((term) => text.includes(term));
    });
  }, [tools, query, category, freeOnly]);

  return (
    <div>
      <div className="rounded-2xl border border-[#dce6e3] bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Find a tool or task</span>
            <div className="relative"><Search size={18} className="pointer-events-none absolute left-3 top-3.5 text-[#667085]" /><input type="search" className="field !pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try voiceover, cartoon, captions, or a tool name" aria-label="Search AI tools" /></div>
          </label>
          {!fixedCategory && <label className="block"><span className="mb-2 block text-sm font-bold">Category</span><select className="field" value={category} onChange={(event) => setCategory(event.target.value as AiCategoryId | 'all')} aria-label="AI tool category"><option value="all">All creative tools</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>}
        </div>
        <label className="mt-4 inline-flex cursor-pointer items-start gap-2.5 text-sm text-[#475467]"><input type="checkbox" checked={freeOnly} onChange={(event) => setFreeOnly(event.target.checked)} className="mt-1" /><span>Show only tools with some free access <span className="block text-xs text-[#667085]">Includes limited credits and free basic features; read each entry’s limits.</span></span></label>
      </div>
      <p className="my-5 flex items-center gap-2 text-sm text-[#667085]" role="status" aria-live="polite"><SlidersHorizontal size={15} /> {filtered.length} {filtered.length === 1 ? 'tool' : 'tools'} shown{freeOnly ? ' with a free entry option' : ', including paid-credit comparisons'}</p>
      <div className="grid gap-5 lg:grid-cols-2">
        {filtered.map((tool) => (
          <article key={tool.id} id={tool.id} data-tool-id={tool.id} className="flex min-w-0 scroll-mt-24 flex-col rounded-2xl border border-[#dce6e3] bg-white p-6 transition hover:border-[#8fd8cd]">
            <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-wider text-[#667085]">{tool.maker}</span><span className={`rounded-full px-3 py-1 text-xs font-bold ${hasFreeAccess(tool) ? 'bg-[#e9f8f1] text-[#166a48]' : 'bg-[#fff3de] text-[#8b570b]'}`}>{tool.accessLabel}</span></div>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{tool.name}</h3>
            <p className="mt-1 text-sm font-semibold text-[#0f766e]">{tool.task}</p>
            <p className="mt-4 text-sm leading-7 text-[#475467]">{tool.description}</p>
            <dl className="mt-5 space-y-4 text-sm leading-6">
              <div><dt className="font-bold text-[#101828]">Useful for</dt><dd className="mt-1 text-[#667085]">{tool.bestFor}</dd></div>
              <div><dt className="font-bold text-[#101828]">Free access</dt><dd className="mt-1 text-[#475467]">{tool.freeAccess}</dd></div>
              <div><dt className="font-bold text-[#101828]">Limits to check</dt><dd className="mt-1 text-[#667085]">{tool.limitation}</dd></div>
              <div><dt className="font-bold text-[#101828]">Export &amp; publishing</dt><dd className="mt-1 text-[#667085]">{tool.exportNote}</dd></div>
            </dl>
            <div className="mt-auto pt-6">
              <div className="flex flex-wrap items-center gap-4"><a href={tool.officialUrl} aria-label={`Open ${tool.name} official website (new tab)`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open official website <ArrowUpRight size={16} aria-hidden="true" /></a><a href={tool.sourceUrl} aria-label={`${tool.name}: plan and source details (new tab)`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#0f766e] underline underline-offset-4">Plan &amp; source details</a></div>
              <p className="mt-4 text-xs text-[#667085]">Source reviewed <time dateTime={tool.reviewedAt}>{tool.reviewedAt}</time> · Provider website opens in a new tab</p>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && <div className="rounded-xl border border-[#dce6e3] bg-white p-7 text-center"><p className="font-bold">No tools match those filters.</p><p className="mt-2 text-sm text-[#667085]">Try fewer search words or change the free-access filter.</p><button type="button" className="btn btn-secondary mt-4" onClick={() => { setQuery(''); setFreeOnly(true); if (!fixedCategory) setCategory('all'); }}>Reset filters</button></div>}
    </div>
  );
}
