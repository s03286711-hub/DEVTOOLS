import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, BookOpen, Calendar, Clock, Newspaper, Tag, Wrench } from 'lucide-react';
import { blogPosts } from '@/lib/blog';
import { tools, guides, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Engineering Blog: Technical Debugging, System Architecture & Protocols — DevX Tool',
  description: 'In-depth engineering articles resolving production runtime errors, explaining distributed system architectures, cryptography, Unicode standards, and web protocols.',
  keywords: [
    'developer blog',
    'software engineering tutorials',
    'debugging web errors',
    'JWT signature error',
    'btoa Latin1 error',
    'B-tree index fragmentation UUID v7',
    'ReDoS prevention',
    'cryptographic hashes',
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export default function BlogIndexPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'DevX Tool Technical Engineering Blog',
    description: 'Articles resolving real-world development errors, debugging edge cases, and explaining system architecture.',
    url: `${siteConfig.url}/blog`,
    numberOfItems: blogPosts.length,
    itemListElement: blogPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      description: post.excerpt,
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
        name: 'Engineering Blog',
        item: `${siteConfig.url}/blog`,
      },
    ],
  };

  // Group by category for filtering display
  const categories = Array.from(new Set(blogPosts.map((p) => p.category)));

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
            <Newspaper size={14} /> DevX Engineering Publication
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-5xl">
            Tech Blog &amp; Error Solvers
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#667085]">
            Deep-dive architectural essays, error triage walkthroughs, and practical guides to debugging complex distributed web systems.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-full bg-[#f0fdfa] border border-[#99f6e4] px-3 py-1 text-xs font-bold text-[#0f766e]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Post Card */}
        {blogPosts.length > 0 && (
          <div className="mb-12">
            <article className="group relative overflow-hidden rounded-3xl border-2 border-[#8fd8cd] bg-gradient-to-br from-white via-[#f8fdfc] to-[#e6f7f3] p-8 shadow-sm transition hover:shadow-soft sm:p-10">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#0f766e]">
                <span className="rounded-md bg-[#0d9488] px-2.5 py-1 text-white">
                  Featured Article
                </span>
                <span>{blogPosts[0].category}</span>
                <span>•</span>
                <span>{blogPosts[0].readingTime}</span>
                <span>•</span>
                <span>{blogPosts[0].date}</span>
              </div>

              <h2 className="mt-4 text-2xl font-black tracking-tight text-[#101828] sm:text-3xl lg:text-4xl">
                <Link
                  href={`/blog/${blogPosts[0].slug}`}
                  className="hover:text-[#0d9488] transition"
                >
                  {blogPosts[0].title}
                </Link>
              </h2>

              <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#475467]">
                {blogPosts[0].excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#ccfbf1] pt-6">
                <div className="flex flex-wrap gap-1.5">
                  {blogPosts[0].tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-[#475467] border border-[#e2e8f0]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${blogPosts[0].slug}`}
                  className="btn btn-primary !rounded-xl"
                >
                  Read full analysis <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map((p) => {
            const tool = tools.find((t) => t.slug === p.relatedTool);

            return (
              <article
                key={p.slug}
                className="group flex flex-col justify-between rounded-2xl border border-[#e4e7ec] bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-[#8fd8cd] hover:shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-[#f0fdfa] px-2 py-0.5 text-[11px] font-bold text-[#0f766e]">
                      {p.category}
                    </span>
                    <span className="text-[11px] font-medium text-[#98a2b3]">
                      {p.readingTime}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-black leading-snug tracking-tight text-[#101828]">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="hover:text-[#0d9488] transition"
                    >
                      {p.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#667085] line-clamp-3">
                    {p.excerpt}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#f2f4f7] pt-4">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0d9488] hover:underline"
                    >
                      Read article <ArrowUpRight size={14} />
                    </Link>

                    {tool && (
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#667085] hover:text-[#0d9488]"
                      >
                        <Wrench size={11} /> {tool.title}
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Integrated Learning & Tool Callout */}
        <section className="mt-20 rounded-3xl bg-[#0b2523] p-8 text-white sm:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[.12em] text-[#99f6e4]">
                Integrated Developer Ecosystem
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                Read the Theory, Test with Live Tools
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#bfe3dd]">
                Every article and guide links directly to our browser-native developer tools. Validate hashes, test regular expressions, decode JWT tokens, and format JSON in real time without external requests.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides"
                className="btn !bg-white !text-[#134e4a] hover:!bg-[#e6f7f3]"
              >
                <BookOpen size={16} /> Learning Guides
              </Link>
              <Link
                href="/tools"
                className="btn btn-secondary !border-white/30 !text-white hover:!bg-white/10"
              >
                <Wrench size={16} /> Explore Tools
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
