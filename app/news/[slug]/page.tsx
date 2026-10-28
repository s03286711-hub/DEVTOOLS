import Link from 'next/link';
import { notFound } from 'next/navigation';
import { newsStories, displayDate } from '@/lib/news';
import { canonicalUrl, pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return newsStories.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const story = newsStories.find((item) => item.slug === params.slug);
  if (!story) notFound();
  return pageMetadata({ title: story.title, description: story.description, path: `/news/${story.slug}`, article: { published: story.published, author: 'DevX Tool Team', tags: [story.topic] } });
}

export default function NewsStoryPage({ params }: { params: { slug: string } }) {
  const story = newsStories.find((item) => item.slug === params.slug);
  if (!story) notFound();
  const url = canonicalUrl(`/news/${story.slug}`);
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: story.title, description: story.description, datePublished: story.published, dateModified: story.published, inLanguage: 'en', url, mainEntityOfPage: url, articleSection: story.topic, author: { '@type': 'Organization', name: 'DevX Tool Team', url: canonicalUrl('/about') }, publisher: { '@type': 'Organization', name: siteConfig.name, url: canonicalUrl('/') }, citation: story.source.url },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl('/') }, { '@type': 'ListItem', position: 2, name: 'Tech news', item: canonicalUrl('/news') }, { '@type': 'ListItem', position: 3, name: story.title, item: url }] },
  ];
  return (
    <main className="section bg-[#fcfcff]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, '\\u003c') }} />
      <div className="container">
        <article className="article">
          <Link href="/news/" className="text-sm font-semibold text-[#0f766e]">← All tech news</Link>
          <p className="mt-7 text-xs font-bold uppercase tracking-wider text-[#0f766e]">{story.topic} · News explained</p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">{story.title}</h1>
          <p className="mt-5 text-lg">{story.description}</p>
          <p className="mt-5 text-sm">By <Link href="/about/">DevX Tool Team</Link> · Published <time dateTime={story.published}>{displayDate(story.published)}</time></p>
          <div className="my-7 rounded-xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
            <p className="text-sm"><strong>Announcement date:</strong> <time dateTime={story.eventDate}>{displayDate(story.eventDate)}</time></p>
            <p className="text-sm"><strong>Primary source:</strong> <a href={story.source.url}>{story.source.name}</a>. Details reflect the source as checked on {displayDate(story.published)}; later availability may change.</p>
          </div>
          <h2>What was announced</h2>
          <p>{story.summary}</p>
          <ul>{story.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
          <p className="mt-4 text-sm">Source: <a href={story.source.url}>Read the official {story.source.name} announcement</a>.</p>
          {story.analysis.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
          <h2>What to check next</h2>
          <ol>{story.checklist.map((step) => <li key={step}>{step}</li>)}</ol>
          <section className="mt-10 rounded-2xl border border-[#e4e7ec] p-6">
            <h2 className="!mt-0">Explore the topic</h2>
            <ul>{story.related.map((item) => <li key={item.href}><Link href={item.href}>{item.title}</Link></li>)}</ul>
          </section>
          <section className="mt-10">
            <h2>More news explained</h2>
            <ul>{newsStories.filter((item) => item.slug !== story.slug).map((item) => <li key={item.slug}><Link href={`/news/${item.slug}/`}>{item.title}</Link></li>)}</ul>
          </section>
          <p className="mt-8 text-sm">If something has changed, <Link href="/contact/">send us a correction</Link> with the article URL and a primary source.</p>
        </article>
      </div>
    </main>
  );
}
