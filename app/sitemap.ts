import { newsStories, headlineFeed } from '@/lib/news';
import { canonicalUrl } from '@/lib/seo';
import type { MetadataRoute } from 'next';
import { tools, guides } from '@/lib/site';
import { blogPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const releaseDate = new Date('2026-10-27T00:00:00.000Z');
  const seoRevisionDate = new Date('2026-10-28T00:00:00.000Z');
  const contentDate = new Date(Math.max(...newsStories.map((story) => Date.parse(story.published)), ...blogPosts.map((post) => Date.parse(post.modified ?? post.date))));
  const newsDate = new Date(Math.max(contentDate.getTime(), headlineFeed.updatedAt ? Date.parse(headlineFeed.updatedAt) : 0));

  const staticPages = [
    { path: '', priority: 1.0, freq: 'daily' as const },
    { path: '/tools', priority: 0.95, freq: 'weekly' as const },
    { path: '/guides', priority: 0.95, freq: 'daily' as const },
    { path: '/blog', priority: 0.95, freq: 'daily' as const },
    { path: '/about', priority: 0.6, freq: 'monthly' as const },
    { path: '/contact', priority: 0.6, freq: 'monthly' as const },
    { path: '/privacy', priority: 0.4, freq: 'monthly' as const },
    { path: '/terms', priority: 0.4, freq: 'monthly' as const },
  ];

  return [
    { url: canonicalUrl('/news'), lastModified: newsDate, changeFrequency: 'daily' as const, priority: 0.85 },
    ...newsStories.map((story) => ({ url: canonicalUrl(`/news/${story.slug}`), lastModified: new Date(`${story.published}T00:00:00Z`), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...staticPages.map((item) => ({
      url: canonicalUrl(item.path),
      lastModified: ['', '/tools', '/guides', '/blog'].includes(item.path) ? new Date(Math.max(contentDate.getTime(), seoRevisionDate.getTime())) : releaseDate,
      changeFrequency: item.freq,
      priority: item.priority,
    })),
    ...tools.map((t) => ({
      url: canonicalUrl(`/tools/${t.slug}`),
      lastModified: seoRevisionDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...guides.map((g) => ({
      url: canonicalUrl(`/guides/${g.slug}`),
      lastModified: releaseDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    })),
    ...blogPosts.map((b) => ({
      url: canonicalUrl(`/blog/${b.slug}`),
      lastModified: new Date(`${b.modified ?? b.date}T00:00:00.000Z`),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  ];
}
