import type { MetadataRoute } from 'next';
import { siteConfig, tools, guides } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a realistic fixed release date to ensure search engines recognize accurate modified dates
  const releaseDate = new Date('2026-10-14T00:00:00.000Z');

  const staticPages = [
    { path: '', priority: 1.0, freq: 'weekly' as const },
    { path: '/about', priority: 0.5, freq: 'monthly' as const },
    { path: '/contact', priority: 0.5, freq: 'monthly' as const },
    { path: '/privacy', priority: 0.4, freq: 'monthly' as const },
    { path: '/terms', priority: 0.4, freq: 'monthly' as const },
  ];

  return [
    ...staticPages.map((item) => ({
      url: `${siteConfig.url}${item.path}/`,
      lastModified: releaseDate,
      changeFrequency: item.freq,
      priority: item.priority,
    })),
    ...tools.map((t) => ({
      url: `${siteConfig.url}/tools/${t.slug}/`,
      lastModified: releaseDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...guides.map((g) => ({
      url: `${siteConfig.url}/guides/${g.slug}/`,
      lastModified: releaseDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
