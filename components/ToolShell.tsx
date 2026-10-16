import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight, BookOpen, ShieldCheck } from 'lucide-react';
import { tools, guides, siteConfig } from '@/lib/site';
import AdSlot from '@/components/AdSlot';

export default function ToolShell({
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
  const current = tools.find((t) => t.slug === slug);
  const guide = guides.find((g) => g.slug === current?.guide);
  const others = tools.filter((t) => t.slug !== slug).slice(0, 6);

  // Structured Data Schema for WebApplication
  const toolJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    url: `${siteConfig.url}/tools/${slug}`,
    description: description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires HTML5 support',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Client-side execution',
      'Local browser-first processing',
      'Zero server transmission',
      'Instant real-time output',
    ],
    applicationSubCategory: current?.category || 'Developer Tool',
  };

  // Structured Data Schema for FAQPage Rich Snippet
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Does DevX Tool store my ${title} data?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `No, DevX Tool operates on a browser-first approach. All processing and computation happen locally on your computer, meaning your sensitive data never leaves your device.`,
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
        name: 'Tools',
        item: `${siteConfig.url}/#tools`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${siteConfig.url}/tools/${slug}`,
      },
    ],
  };

  return (
    <main className="tool-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
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
        <Link
          href="/#tools"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#667085] hover:text-[#0d9488]"
        >
          <ArrowLeft size={16} /> All tools
        </Link>
        <div className="mx-auto max-w-3xl">
          <div className="mb-7 text-center">
            <span className="tag">{current?.category || 'Free online tool'}</span>
            <h1 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-4xl">{title}</h1>
            <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#667085]">{description}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#667085]">
              <ShieldCheck size={14} className="text-emerald-600" /> Designed for local browser processing
            </p>
          </div>

          {children}

          
          {/* Safe Ad Placement: Separated from Tool card and action buttons by 40px+ margin */}
          <div className="my-10 border-t border-b border-[#f1f5f9] py-4">
            <AdSlot slotId="tool-page-bottom" format="auto" />
          </div>

          {guide && (
            <Link
              href={`/guides/${guide.slug}`}
              prefetch={false}
              className="mt-10 flex items-center justify-between gap-3 rounded-2xl border border-[#e6e8ef] bg-[#f2fbf9] p-5 font-bold text-[#0f766e] hover:border-[#8fd8cd]"
            >
              <span className="flex items-center gap-2">
                <BookOpen size={18} /> Read the technical guide: {guide.title}
              </span>
              <ArrowUpRight size={17} />
            </Link>
          )}

          <section className="mt-12 border-t border-[#edf0f5] pt-10">
            <h2 className="mb-4 text-xl font-extrabold">Explore more free developer tools</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {others.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  prefetch={false}
                  className="rounded-xl border border-[#e6e8ef] p-4 transition duration-200 hover:border-[#8fd8cd] hover:shadow-soft"
                >
                  <span className="font-bold text-[#1f2937]">{t.title}</span>
                  <span className="mt-1 block text-sm text-[#667085]">{t.short}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
