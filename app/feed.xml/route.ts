import { newsStories } from '@/lib/news';
import { blogPosts } from '@/lib/blog';
import { canonicalUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { aiQuestionArticles } from '@/lib/ai-questions';

export const dynamic = 'force-static';
const xml = (text: string) => text.replace(/[<>&"']/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[character]!));

export function GET() {
  const items = [
    ...aiQuestionArticles.map((article) => ({ title: article.question, description: article.description, date: article.published, url: canonicalUrl(`/ai-questions/${article.slug}`) })),
    ...newsStories.map((story) => ({ title: story.title, description: story.description, date: story.published, url: canonicalUrl(`/news/${story.slug}`) })),
    ...blogPosts.map((post) => ({ title: post.title, description: post.excerpt, date: post.date, url: canonicalUrl(`/blog/${post.slug}`) })),
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30);
  const feedUrl = `${siteConfig.url.replace(/\/+$/, '')}/feed.xml`;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>DevX Tool — Tech News, AI Questions &amp; Tutorials</title><link>${xml(canonicalUrl('/'))}</link>
<description>Original technology explainers, AI research questions, and practical tutorials from DevX Tool.</description><language>en</language>
<atom:link href="${xml(feedUrl)}" rel="self" type="application/rss+xml" />
${items.map((item) => `<item><title>${xml(item.title)}</title><link>${xml(item.url)}</link><guid isPermaLink="true">${xml(item.url)}</guid><description>${xml(item.description)}</description><pubDate>${new Date(`${item.date}T00:00:00Z`).toUTCString()}</pubDate></item>`).join('\n')}
</channel></rss>`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
