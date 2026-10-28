import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Wrench, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { tools, guides, siteConfig } from '@/lib/site';
import ToolSearchHub from '@/components/ToolSearchHub';

export const metadata: Metadata = pageMetadata({
  title: 'Free Developer Tools: JSON, Base64, Regex & More',
  description: 'Browse the complete directory of free, client-side developer utilities. JSON formatter, regex tester, text diff checker, Base64 encoder, UUID generator, and more.',
  path: '/tools',
});

export default function ToolsPage() {
  const categories = Array.from(new Set(tools.map((t) => t.category)));

  // ItemList Schema for Topic List & Directory SEO
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Online Developer Tools Directory',
    description: 'Complete directory of 11 browser-first developer tools and utilities on DevX Tool.',
    url: `${siteConfig.url}/tools`,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.title,
      url: `${siteConfig.url}/tools/${tool.slug}`,
      description: tool.short,
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
        name: 'Tools Directory',
        item: `${siteConfig.url}/tools`,
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
        {/* Breadcrumb Navigation */}
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#667085] hover:text-[#0d9488]"
        >
          <ArrowLeft size={16} /> Home
        </Link>

        {/* Hero Topic Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="tag inline-flex items-center gap-1.5">
            <Wrench size={13} /> Complete Directory & Topic Hub
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-5xl">
            All Free Developer Tools
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#667085]">
            Explore 11 fast, reliable, and privacy-conscious web utilities engineered for everyday developer workflows.
            Everything runs directly in your browser.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-[#667085]">
            <ShieldCheck size={15} className="text-emerald-600" /> 100% Client-side execution • Zero data transmission
          </div>
        </div>

        {/* Interactive Search Hub & Category Filter */}
        <ToolSearchHub initialTools={tools} />

        {/* Topic Clusters & Category Overview */}
        <section className="mt-20 border-t border-[#edf0f5] pt-14">
          <div className="mb-8">
            <p className="eyebrow">Categorized Hub</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Tools Grouped by Domain
            </h2>
            <p className="mt-2 text-[#667085]">
              Quickly jump into utilities grouped according to functional engineering domains.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const catTools = tools.filter((t) => t.category === cat);
              return (
                <div
                  key={cat}
                  className="rounded-2xl border border-[#e6e8ef] bg-white p-6 shadow-sm transition hover:border-[#8fd8cd]"
                >
                  <span className="rounded-md bg-[#e6f7f3] px-2.5 py-1 text-xs font-bold text-[#0d9488]">
                    {cat}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#101828]">
                    {cat} Utilities
                  </h3>
                  <p className="mt-1 text-xs text-[#667085]">
                    {catTools.length} dedicated tools available
                  </p>

                  <ul className="mt-4 space-y-2.5 border-t border-[#f2f4f7] pt-4">
                    {catTools.map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          href={`/tools/${tool.slug}`}
                          className="group flex items-center justify-between text-sm font-semibold text-[#344054] hover:text-[#0d9488]"
                        >
                          <span>{tool.title}</span>
                          <ArrowUpRight
                            size={14}
                            className="text-[#98a2b3] group-hover:text-[#0d9488]"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interlinking with Educational Guides */}
        <section className="mt-20 rounded-3xl bg-[#0b2523] p-8 text-white sm:p-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[.12em] text-[#99f6e4]">
              Deep Knowledge Base
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              Learn the mechanics behind each tool
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#bfe3dd]">
              Our technical guides explain specifications like RFC 8259, RFC 4648, entropy mathematics, and regex syntax so you can write cleaner code.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/guides"
                className="btn !bg-white !text-[#134e4a] hover:!bg-[#e6f7f3]"
              >
                <BookOpen size={16} /> Browse all 11 guides
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
