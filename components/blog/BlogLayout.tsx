import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight, BookOpen, Calendar, Clock, Tag, User, Wrench } from 'lucide-react';
import { BlogPost, blogPosts } from '@/lib/blog';
import { tools, guides, siteConfig } from '@/lib/site';

export default function BlogLayout({
  post,
  children,
}: {
  post: BlogPost;
  children: ReactNode;
}) {
  const relatedTool = tools.find((t) => t.slug === post.relatedTool);
  const relatedGuide = guides.find((g) => g.slug === post.relatedGuide);
  const recentPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 4);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    inLanguage: 'en',
    url: `${siteConfig.url}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="section bg-[#fcfcff]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container">
        {/* Breadcrumb Back Link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#667085] hover:text-[#0d9488]"
        >
          <ArrowLeft size={16} /> Back to Tech Blog
        </Link>

        {/* Article Container */}
        <article className="article mx-auto max-w-4xl">
          {/* Metadata pill badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="rounded-md bg-[#0d9488]/10 px-2.5 py-1 text-[#0f766e]">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-[#667085]">
              <Calendar size={13} /> {post.date}
            </span>
            <span className="flex items-center gap-1 text-[#667085]">
              <Clock size={13} /> {post.readingTime}
            </span>
            <span className="flex items-center gap-1 text-[#667085]">
              <User size={13} /> {post.author}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-black leading-tight tracking-[-.045em] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-[#475467] font-medium border-l-4 border-[#0d9488] pl-4 bg-[#f0fdfa]/50 py-2 rounded-r-lg">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full bg-[#f2f4f7] px-2.5 py-0.5 text-[11px] font-semibold text-[#344054]"
              >
                <Tag size={10} /> {t}
              </span>
            ))}
          </div>

          {/* Article Main Body */}
          <div className="mt-10">{children}</div>

          {/* Cross-linking interactive block: Tool & Guide integration */}
          <div className="my-12 rounded-2xl border-2 border-[#8fd8cd] bg-[#f0fdfa] p-6 sm:p-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#0f766e]">
              Put Knowledge Into Practice
            </span>
            <h3 className="!mt-1 text-2xl font-black text-[#134e4a]">
              Integrated Tools & Learning Resources
            </h3>
            <p className="mt-1 text-sm text-[#334155]">
              DevX Tool combines deep engineering tutorials with client-side interactive tooling so you can test code, verify outputs, and troubleshoot bugs right away.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {relatedTool && (
                <Link
                  href={`/tools/${relatedTool.slug}`}
                  prefetch={false}
                  className="group flex flex-col justify-between rounded-xl bg-white p-5 border border-[#99f6e4] shadow-sm hover:border-[#0d9488] hover:shadow-soft transition"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0d9488]">
                      <Wrench size={15} /> Integrated Tool
                    </div>
                    <div className="mt-2 font-bold text-[#101828] group-hover:text-[#0d9488] transition">
                      {relatedTool.title}
                    </div>
                    <p className="mt-1 text-xs text-[#667085] leading-relaxed">
                      {relatedTool.short}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-extrabold text-[#0d9488]">
                    Launch tool sandbox <ArrowUpRight size={14} />
                  </div>
                </Link>
              )}

              {relatedGuide && (
                <Link
                  href={`/guides/${relatedGuide.slug}`}
                  prefetch={false}
                  className="group flex flex-col justify-between rounded-xl bg-white p-5 border border-[#99f6e4] shadow-sm hover:border-[#0d9488] hover:shadow-soft transition"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0d9488]">
                      <BookOpen size={15} /> Comprehensive Guide
                    </div>
                    <div className="mt-2 font-bold text-[#101828] group-hover:text-[#0d9488] transition">
                      {relatedGuide.title}
                    </div>
                    <p className="mt-1 text-xs text-[#667085] leading-relaxed">
                      {relatedGuide.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-extrabold text-[#0d9488]">
                    Read full tutorial <ArrowUpRight size={14} />
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* More Engineering Articles */}
          <section className="mt-14 border-t border-[#e4e7ec] pt-10">
            <h2 className="!mt-0 text-2xl font-black">Recommended Engineering Articles</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {recentPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  prefetch={false}
                  className="group rounded-xl border border-[#e4e7ec] bg-white p-5 shadow-xs transition hover:border-[#8fd8cd] hover:shadow-soft"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
                    {p.category}
                  </span>
                  <h3 className="!mt-1 text-base font-bold leading-snug text-[#101828] group-hover:text-[#0d9488] transition">
                    {p.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#667085]">
                    {p.excerpt}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0d9488]">
                    Read article <ArrowUpRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
