import Link from 'next/link';
import { ArrowUpRight, Rss } from 'lucide-react';
import { newsStories, headlineFeed, displayDate } from '@/lib/news';
import { everydayTechArticles } from '@/lib/everyday-tech';
import { canonicalUrl, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Tech News & AI Updates Explained',
  description: 'Read technology news explainers and recent official headlines. Understand AI agents, apps, passkeys, browsers, and what changes mean for you.',
  path: '/news',
});

export default function NewsPage() {
  const list = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'DevX Tool tech news explainers',
    itemListElement: newsStories.map((story, index) => ({ '@type': 'ListItem', position: index + 1, name: story.title, url: canonicalUrl(`/news/${story.slug}`) })),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(list).replace(/</g, '\\u003c') }} />
      <section className="bg-[#0b2523] py-16 text-white sm:py-20">
        <div className="container">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-[#99f6e4]">The tech brief · DevX Tool</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Make sense of what’s next in tech.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#c4e4de]">Follow Google and Microsoft AI updates alongside apps, browsers, and digital security. Read the sources, understand the changes, and find useful next steps.</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-[#99f6e4]"><Link href="/news/google/">Google AI &amp; Gemini →</Link><Link href="/news/microsoft/">Microsoft &amp; Copilot →</Link></div>
          <nav aria-label="News sections" className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
            <a href="#explained" className="rounded-full bg-white px-4 py-2 text-[#134e4a]">News explained</a>
            <a href="#headlines" className="rounded-full border border-white/30 px-4 py-2">Publisher headlines</a>
            <a href="#learn" className="rounded-full border border-white/30 px-4 py-2">Everyday tech</a>
            <Link href="/ai-questions/" className="rounded-full border border-white/30 px-4 py-2">AI questions &amp; research</Link>
            <a href="/feed.xml" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2"><Rss size={15} /> RSS feed</a>
          </nav>
        </div>
      </section>
      <section id="explained" className="section scroll-mt-20">
        <div className="container">
          <p className="eyebrow">The context behind the headline</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">News explained</h2>
          <p className="mt-3 max-w-2xl leading-7 text-[#667085]">Original explainers with announcement dates, primary sources, and practical takeaways. Our analysis is labeled separately from reported facts.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {newsStories.map((story) => (
              <article key={story.slug} className="flex flex-col rounded-2xl border border-[#e4e7ec] p-6 transition hover:border-[#8fd8cd]">
                <span className="text-xs font-bold text-[#0f766e]">{story.topic}</span>
                <h3 className="mt-3 text-2xl font-extrabold leading-snug"><Link href={`/news/${story.slug}/`} className="hover:text-[#0d9488]">{story.title}</Link></h3>
                <p className="mt-3 text-sm leading-7 text-[#667085]">{story.description}</p>
                <div className="mt-auto pt-5 text-xs leading-6 text-[#667085]">
                  <p>Published <time dateTime={story.published}>{displayDate(story.published)}</time></p>
                  <p>Announcement: <time dateTime={story.eventDate}>{displayDate(story.eventDate)}</time></p>
                </div>
                <Link href={`/news/${story.slug}/`} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#0f766e]">Read the explainer <ArrowUpRight size={15} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="headlines" className="scroll-mt-20 border-y border-[#e4e7ec] bg-[#f8fafb] py-16">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow">Direct from the source</p><h2 className="mt-3 text-3xl font-black">Recent publisher headlines</h2></div>
            {headlineFeed.updatedAt && <p className="text-xs text-[#667085]">Last successful feed refresh: <time dateTime={headlineFeed.updatedAt}>{displayDate(headlineFeed.updatedAt)}</time> (UTC)</p>}
          </div>
          <p className="mt-4 max-w-3xl leading-7 text-[#667085]">Follow announcements from official publisher feeds. These links open the publisher’s article. Dates below are the original publication dates; new headlines appear when publishers post them and the next refresh completes.</p>
          {headlineFeed.items.length ? (
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {headlineFeed.items.map((item) => <li key={item.url} className="rounded-xl border border-[#e4e7ec] bg-white p-5">
                <p className="text-xs text-[#667085]"><span className="font-bold text-[#0f766e]">{item.source}</span> · <time dateTime={item.publishedAt}>{displayDate(item.publishedAt)}</time></p>
                <a href={item.url} className="mt-2 block text-base font-bold leading-7 hover:text-[#0d9488]">{item.title} <ArrowUpRight size={15} className="inline" aria-hidden="true" /></a>
              </li>)}
            </ul>
          ) : <p className="mt-6 rounded-xl border border-[#e4e7ec] bg-white p-5">No recent publisher headlines are available in the current snapshot. Explore our explainers above or visit the official sources below.</p>}
          <details className="mt-6 text-sm text-[#667085]">
            <summary className="cursor-pointer font-semibold">Sources and refresh status</summary>
            <ul className="mt-3 space-y-2">{headlineFeed.sources.map((source) => <li key={source.name}><a className="underline" href={source.feedUrl}>{source.name}</a>: {source.checkedAt ? `last retrieved ${displayDate(source.checkedAt)} (UTC)` : 'not yet retrieved successfully'}</li>)}</ul>
          </details>
        </div>
      </section>
      <section id="learn" className="section scroll-mt-20">
        <div className="container">
          <p className="eyebrow">Useful beyond today</p><h2 className="mt-3 text-3xl font-black">Everyday technology, explained</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {everydayTechArticles.map((article) => <article key={article.slug} className="rounded-2xl border border-[#e4e7ec] p-6"><span className="text-xs font-bold text-[#0f766e]">{article.category}</span><h3 className="mt-2 text-xl font-extrabold"><Link href={`/blog/${article.slug}/`} className="hover:text-[#0d9488]">{article.title}</Link></h3><p className="mt-3 text-sm leading-7 text-[#667085]">{article.excerpt}</p></article>)}
          </div>
          <p className="mt-8 text-sm text-[#667085]">Found an error? <Link href="/contact/" className="font-semibold text-[#0f766e] underline">Send a correction</Link>. Our <Link href="/about/" className="font-semibold text-[#0f766e] underline">about page</Link> explains how to use our articles.</p>
        </div>
      </section>
    </main>
  );
}
