import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import AiCategoryCards from '@/components/AiCategoryCards';

export default function AiToolsPreview() {
  return <section className="border-y border-[#e4e7ec] bg-[#f8fafb] py-16" aria-labelledby="ai-directory-heading"><div className="container"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow inline-flex items-center gap-2"><Sparkles size={15} /> The creator toolbox</p><h2 id="ai-directory-heading" className="mt-3 text-3xl font-black tracking-tight">Find the right AI tool for your idea.</h2><p className="mt-3 max-w-2xl leading-7 text-[#667085]">Explore tools for video, images, audio, editing, and cartoons. Compare free access, credit limits, and official sources before you choose.</p></div><Link href="/ai-tools/" className="inline-flex items-center gap-1 text-sm font-bold text-[#0f766e]">Open the AI tools directory <ArrowUpRight size={15} /></Link></div><AiCategoryCards /></div></section>;
}
