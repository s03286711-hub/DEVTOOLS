import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { aiQuestionArticles, aiQuestionCount } from '@/lib/ai-questions';

export default function AiQuestionsPreview() {
  const featured = ['will-ai-kill-humans', 'will-ai-take-all-jobs', 'will-robots-replace-humans'].map((slug) => aiQuestionArticles.find((article) => article.slug === slug)!);
  return <section className="section" aria-labelledby="ai-questions-preview-heading"><div className="container">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow inline-flex items-center gap-2"><BookOpen size={15} aria-hidden="true" /> Understand AI</p><h2 id="ai-questions-preview-heading" className="mt-3 text-3xl font-black tracking-tight">Big AI questions. Read the evidence.</h2><p className="mt-3 max-w-2xl leading-7 text-[#667085]">Explore {aiQuestionCount} questions about jobs, robots, intelligence, and future risks, with research links and clear limits on what we know.</p></div><Link href="/ai-questions/" className="inline-flex items-center gap-1 text-sm font-bold text-[#0f766e]">Explore AI questions <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
    <div className="grid gap-5 md:grid-cols-3">{featured.map((article) => <article key={article.slug} className="flex flex-col rounded-2xl border border-[#dce6e3] bg-[#f8fafb] p-6"><h3 className="text-xl font-extrabold leading-snug"><Link href={`/ai-questions/${article.slug}/`} className="hover:text-[#0f766e]">{article.question}</Link></h3><p className="mt-3 text-sm leading-7 text-[#667085]">{article.description}</p><Link href={`/ai-questions/${article.slug}/`} className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-[#0f766e]">Read the research guide <ArrowUpRight size={14} aria-hidden="true" /></Link></article>)}</div>
  </div></section>;
}
