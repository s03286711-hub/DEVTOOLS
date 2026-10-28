import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, BookOpen, Sparkles, GraduationCap } from 'lucide-react';
import { guides, tools, siteConfig } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Developer Guides: JSON, Base64, Regex & JWT',
  description: 'In-depth engineering guides, protocol tutorials, and best practices. Learn JSON validation, Base64 encoding, regex patterns, JWT security, and password entropy.',
  path: '/guides',
});

export default function GuidesPage() {
  // ItemList Schema for Topic List & Guide Hub SEO
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Developer Technical Guides & Educational Hub',
    description: 'Comprehensive tutorials explaining data formats, hashing algorithms, and developer concepts.',
    url: `${siteConfig.url}/guides`,
    numberOfItems: guides.length,
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title,
      url: `${siteConfig.url}/guides/${guide.slug}`,
      description: guide.description,
    })),
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
        name: 'Developer Guides',
        item: `${siteConfig.url}/guides`,
      },
    ],
  };

  return (
    <main className="section bg-[#fcfcff]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#667085] hover:text-[#0d9488]"
        >
          <ArrowLeft size={16} /> Home
        </Link>

        {/* Hero Topic Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="tag inline-flex items-center gap-1.5">
            <GraduationCap size={14} /> Developer Knowledge Base
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-5xl">
            Technical Guides & Concepts
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#667085]">
            Master the core specifications, security nuances, and encoding algorithms behind everyday developer tools.
            Structured, practical, and clear.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => {
            const relatedTool = tools.find((t) => t.guide === g.slug);

            return (
              <article
                key={g.slug}
                className="group flex flex-col justify-between rounded-2xl border border-[#e6e8ef] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#8fd8cd] hover:shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5f938a]">
                      Article 0{i + 1}
                    </span>
                    {relatedTool && (
                      <span className="rounded-md bg-[#f2f4f7] px-2 py-0.5 text-[11px] font-semibold text-[#475467]">
                        {relatedTool.category}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3 text-xl font-extrabold leading-snug tracking-tight text-[#101828]">
                    <Link
                      href={`/guides/${g.slug}`}
                      className="hover:text-[#0d9488] transition"
                    >
                      {g.title}
                    </Link>
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#667085]">
                    {g.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#f2f4f7] pt-4">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/guides/${g.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#0d9488] hover:underline"
                    >
                      Read full guide <ArrowUpRight size={15} />
                    </Link>

                    {relatedTool && (
                      <Link
                        href={`/tools/${relatedTool.slug}`}
                        className="text-xs font-semibold text-[#667085] hover:text-[#0d9488]"
                        title={`Open ${relatedTool.title}`}
                      >
                        Try tool →
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Banner Linking back to Tools */}
        <section className="mt-20 rounded-3xl bg-[#0b2523] p-8 text-white sm:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[.12em] text-[#99f6e4]">
                Put Knowledge Into Action
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                Ready to format, test, or convert?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#bfe3dd]">
                All our developer tools are completely free, private, and execute locally in your web browser.
              </p>
            </div>
            <Link
              href="/tools"
              className="btn !bg-white !text-[#134e4a] hover:!bg-[#e6f7f3]"
            >
              Explore all tools <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
