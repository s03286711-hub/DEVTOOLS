import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export function canonicalUrl(path = '/') {
  const base = siteConfig.url.replace(/\/+$/, '');
  const pathname = path.replace(/^\/+|\/+$/g, '');
  return pathname ? `${base}/${pathname}/` : `${base}/`;
}

export function pageMetadata({
  title, description, path, article,
}: {
  title: string;
  description: string;
  path: string;
  article?: { published: string; modified?: string; author: string; tags: string[] };
}): Metadata {
  const url = canonicalUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url,
      siteName: siteConfig.name,
      locale: 'en_US',
      ...(article ? {
        type: 'article' as const,
        publishedTime: article.published,
        modifiedTime: article.modified ?? article.published,
        authors: [article.author],
        tags: article.tags,
      } : { type: 'website' as const }),
    },
    twitter: { card: 'summary', title, description },
  };
}
