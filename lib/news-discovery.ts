import type { NewsStory } from '@/lib/news';
import { siteConfig } from '@/lib/site';
import { canonicalUrl } from '@/lib/seo';

export const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[character]!));

export function createNewsSitemap(stories: NewsStory[], now = new Date()) {
  const cutoff = now.getTime() - 48 * 60 * 60 * 1000;
  // Date-only publications are included conservatively using their known date.
  // Excluding an older entry here never removes it from the regular sitemap.
  const recent = stories.filter((story) => {
    const published = Date.parse(story.published);
    return Number.isFinite(published) && published >= cutoff && published <= now.getTime();
  }).slice(0, 1000);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recent.map((story) => `<url><loc>${escapeXml(canonicalUrl(`/news/${story.slug}`))}</loc><news:news><news:publication><news:name>${escapeXml(siteConfig.name)}</news:name><news:language>en</news:language></news:publication><news:publication_date>${escapeXml(story.published)}</news:publication_date><news:title>${escapeXml(story.title)}</news:title></news:news></url>`).join('\n')}
</urlset>`;
}
