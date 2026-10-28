'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import type { AiQuestionTopic } from '@/lib/ai-questions';

export interface AiQuestionEntry {
  id: string;
  question: string;
  answer: string;
  href: string;
  topic: AiQuestionTopic;
  primary: boolean;
}

export default function AiQuestionSearch({ entries, topics }: {
  entries: AiQuestionEntry[];
  topics: { id: AiQuestionTopic; name: string }[];
}) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState<AiQuestionTopic | 'all'>('all');
  const [related, setRelated] = useState(false);
  const filtered = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return entries.filter((entry) => {
      if (topic !== 'all' && entry.topic !== topic) return false;
      if (!words.length && !related && !entry.primary) return false;
      const text = `${entry.question} ${entry.answer} ${entry.topic}`.toLowerCase();
      return words.every((word) => text.includes(word));
    });
  }, [entries, query, topic, related]);

  return <div>
    <div className="rounded-2xl border border-[#dce6e3] bg-white p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <label><span className="mb-2 block text-sm font-bold">What do you want to understand?</span><span className="relative block"><Search size={18} className="pointer-events-none absolute left-3 top-3.5 text-[#667085]" aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="field !pl-10" aria-label="Search AI questions" placeholder="Try jobs, robots, consciousness, or energy" /></span></label>
        <label><span className="mb-2 block text-sm font-bold">Topic</span><select className="field" value={topic} onChange={(event) => setTopic(event.target.value as AiQuestionTopic | 'all')} aria-label="AI question topic"><option value="all">All topics</option>{topics.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      </div>
      <label className="mt-4 inline-flex items-center gap-2 text-sm text-[#475467]"><input type="checkbox" checked={related} onChange={(event) => setRelated(event.target.checked)} /> Show related questions too</label>
      <p className="mt-2 text-xs leading-6 text-[#667085]">Search checks all {entries.length} questions. With no search, start with the main guides or include their related questions.</p>
    </div>
    <p className="my-5 text-sm text-[#667085]" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'answer' : 'answers'} shown</p>
    <div className="grid gap-5 md:grid-cols-2">
      {filtered.map((entry) => <article key={entry.id} data-question-id={entry.id} className="flex min-w-0 flex-col rounded-2xl border border-[#dce6e3] bg-white p-6">
        <p className="text-xs font-bold text-[#0f766e]">{topics.find((item) => item.id === entry.topic)?.name} · {entry.primary ? 'Research guide' : 'Related question'}</p>
        <h3 className="mt-3 text-xl font-extrabold leading-snug"><Link href={entry.href} className="hover:text-[#0f766e]">{entry.question}</Link></h3>
        <p className="mt-3 text-sm leading-7 text-[#667085]">{entry.answer}</p>
        <Link href={entry.href} className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-[#0f766e]">Read the answer and sources <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </article>)}
    </div>
    {!filtered.length && <div className="rounded-xl border border-[#dce6e3] bg-white p-7 text-center"><p className="font-bold">No questions match those filters.</p><p className="mt-2 text-sm text-[#667085]">Try fewer words or another topic.</p><button type="button" className="btn btn-secondary mt-4" onClick={() => { setQuery(''); setTopic('all'); setRelated(false); }}>Reset filters</button></div>}
  </div>;
}
