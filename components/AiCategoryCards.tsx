import Link from 'next/link';
import { Clapperboard, Film, Image, Mic2, PencilRuler, ArrowUpRight } from 'lucide-react';
import { aiCategories } from '@/lib/ai-categories';
import { hasFreeAccess, toolsForCategory } from '@/lib/ai-tools';

const icons = { video: Film, image: Image, audio: Mic2, edit: PencilRuler, cartoon: Clapperboard };

export default function AiCategoryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {aiCategories.map((category) => {
        const Icon = icons[category.icon];
        const count = toolsForCategory(category.id).filter(hasFreeAccess).length;
        return <Link key={category.id} href={`/ai-tools/${category.id}/`} className="group rounded-2xl border border-[#dce6e3] bg-white p-5 transition hover:-translate-y-1 hover:border-[#8fd8cd] hover:shadow-sm"><Icon size={24} className="text-[#0d9488]" /><h3 className="mt-4 text-lg font-extrabold leading-snug">{category.name}</h3><p className="mt-2 text-xs leading-6 text-[#667085]">{count} free-entry options</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0f766e]">Compare tools <ArrowUpRight size={13} /></span></Link>;
      })}
    </div>
  );
}
