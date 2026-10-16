import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { guides, tools, siteConfig } from '@/lib/site';
import AdSlot from '@/components/AdSlot';

export default function GuideArticle({
  slug,
  title,
  description,
  children,
}: {
  slug: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const related = tools.filter((t) => t.guide === slug).map((t) => t.slug);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: description,
    inLanguage: 'en',
    url: `${siteConfig.url}/guides/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/favicon.svg`,
      },
    },
    author: {
      '@type': 'Organization',
      name: `${siteConfig.name} Team`,
    },
    dependencies: 'No special requirements, works online in browser.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Does DevX Tool store my data when reading or using this guide?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, DevX Tool operates on a browser-first approach. All text formatting, decoding, and processing happen locally on your computer, meaning your sensitive data never leaves your device.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is DevX Tool completely free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all 11 utilities and developer tools on DevX Tool are 100% free to use with no account creation or subscription required.',
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: `${siteConfig.url}/#guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${siteConfig.url}/guides/${slug}`,
      },
    ],
  };

  return (
    <main className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container">
        <article className="article">
          <Link
            href="/#guides"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#667085] hover:text-[#0d9488]"
          >
            <ArrowLeft size={16} /> All guides
          </Link>
          <span className="tag">DevX Tool guide</span>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-[-.05em]">{title}</h1>
          <p className="mt-4 text-lg leading-8 text-[#667085]">{description}</p>

          <div className="mt-8">{children}</div>

          
          {/* Safe in-content Ad slot: 32px vertical clearance */}
          <AdSlot slotId="guide-bottom-content" format="auto" />

          <div className="my-10 rounded-2xl border border-[#e6e8ef] bg-[#f2fbf9] p-5">
            <h2 className="!mt-0">Try the related tool</h2>
            {tools
              .filter((t) => related.includes(t.slug))
              .map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  prefetch={false}
                  className="mt-2 flex items-center justify-between rounded-xl bg-white p-4 font-bold text-[#0f766e] hover:shadow-soft transition"
                >
                  {t.title}
                  <ArrowUpRight size={17} />
                </Link>
              ))}
          </div>

          <h2>More guides</h2>
          <ul>
            {guides
              .filter((g) => g.slug !== slug)
              .map((g) => (
                <li key={g.slug}>
                  <Link className="font-semibold text-[#0d9488] hover:underline" href={`/guides/${g.slug}`} prefetch={false}>
                    {g.title}
                  </Link>
                </li>
              ))}
          </ul>
        </article>
      </div>
    </main>
  );
}
