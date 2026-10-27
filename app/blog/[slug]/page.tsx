import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogLayout from '@/components/blog/BlogLayout';
import { tutorials, tutorialPosts } from '@/lib/tutorials';
import { tools } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return tutorials.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = tutorialPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();
  return pageMetadata({
    title: post.title, description: post.excerpt, path: `/blog/${post.slug}`,
    article: { published: post.date, author: post.author, tags: post.tags },
  });
}

export default function TutorialPage({ params }: { params: { slug: string } }) {
  const tutorial = tutorials.find((item) => item.slug === params.slug);
  const post = tutorialPosts.find((item) => item.slug === params.slug);
  if (!tutorial || !post) notFound();
  const tool = tools.find((item) => item.slug === tutorial.relatedTool)!;

  return (
    <BlogLayout post={post}>
      <aside className="rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] p-5" aria-label="Quick answer">
        <h2 className="!mt-0">Quick answer</h2>
        <p>{tutorial.answer}</p>
        <Link className="btn btn-primary mt-3" href={`/tools/${tool.slug}/`}>Open {tool.title}</Link>
      </aside>
      <nav aria-label="Article contents" className="my-8 rounded-xl border border-[#e4e7ec] p-5">
        <h2 className="!mt-0">On this page</h2>
        <ul>
          {tutorial.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}
          <li><a href="#questions">Frequently asked questions</a></li>
          <li><a href="#references">References</a></li>
        </ul>
      </nav>
      {tutorial.sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24">
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.steps && <ol>{section.steps.map((step) => <li key={step}>{step}</li>)}</ol>}
          {section.table && (
            <div className="my-6 overflow-x-auto" role="region" aria-label={section.title} tabIndex={0}>
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">{section.title}</caption>
                <thead><tr>{section.table.headings.map((heading) => <th scope="col" key={heading} className="border border-[#e4e7ec] bg-[#f0fdfa] p-3">{heading}</th>)}</tr></thead>
                <tbody>{section.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index} className="border border-[#e4e7ec] p-3">{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
          {section.code && <figure className="my-6"><figcaption className="text-sm font-semibold text-[#475467]">{section.language}</figcaption><pre><code>{section.code}</code></pre></figure>}
        </section>
      ))}
      <section id="questions" className="scroll-mt-24">
        <h2>Frequently asked questions</h2>
        {tutorial.faqs.map((faq) => <div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}
      </section>
      <section id="references" className="scroll-mt-24">
        <h2>References</h2>
        <p>Check the official documentation for command options and runtime-specific behavior.</p>
        <ul>{tutorial.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer">{source.title}</a></li>)}</ul>
      </section>
    </BlogLayout>
  );
}
