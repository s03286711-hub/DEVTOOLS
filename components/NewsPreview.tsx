import Link from 'next/link';
import { ArrowUpRight, Newspaper } from 'lucide-react';
import { newsStories, displayDate } from '@/lib/news';

export default function NewsPreview() {
  return (
    <section className="border-y border-[#dcece8] bg-[#f0fdfa] py-16" aria-labelledby="news-heading">
      <div className="container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow inline-flex items-center gap-2"><Newspaper size={15} /> The tech brief</p>
            <h2 id="news-heading" className="mt-3 text-3xl font-black tracking-tight">What changed. Why it matters.</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#475467]">Technology news explained, plus recent headlines from the companies building it.</p>
          </div>
          <Link href="/news/" className="inline-flex items-center gap-1 text-sm font-bold text-[#0f766e]">Explore tech news <ArrowUpRight size={16} /></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {newsStories.map((story) => (
            <article key={story.slug} className="rounded-2xl border border-[#cce6df] bg-white p-6">
              <div className="text-xs font-bold text-[#0f766e]">{story.topic}</div>
              <h3 className="mt-3 text-xl font-extrabold leading-snug"><Link href={`/news/${story.slug}/`} className="hover:text-[#0d9488]">{story.title}</Link></h3>
              <p className="mt-3 text-sm leading-6 text-[#667085]">{story.description}</p>
              <p className="mt-4 text-xs text-[#667085]">Published <time dateTime={story.published}>{displayDate(story.published)}</time> · News explained</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
