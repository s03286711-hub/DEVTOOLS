import Link from 'next/link';
import { notFound } from 'next/navigation';
import { aiQuestionArticles, aiQuestionSourceIds, aiQuestionTopics, findAiQuestionArticle } from '@/lib/ai-questions';
import { aiResearchSources, type AiResearchSourceId } from '@/lib/ai-research-sources';
import { canonicalUrl, pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return aiQuestionArticles.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = findAiQuestionArticle(params.slug);
  if (!article) notFound();
  return pageMetadata({ title: article.title, description: article.description, path: `/ai-questions/${article.slug}`, article: { published: article.published, modified: article.reviewed, author: 'DevX Tool', tags: [aiQuestionTopics.find((topic) => topic.id === article.topic)!.name, 'AI research explained'] } });
}

function Citations({ ids }: { ids: AiResearchSourceId[] }) {
  return <p className="!mt-3 text-sm leading-6" data-citations>{ids.map((id, index) => <span key={id}>{index > 0 && ' · '}<a href={aiResearchSources[id].url} className="font-semibold" data-research-source={id}>{aiResearchSources[id].organization}: {aiResearchSources[id].title}</a></span>)}</p>;
}

export default function AiQuestionArticlePage({ params }: { params: { slug: string } }) {
  const article = findAiQuestionArticle(params.slug);
  if (!article) notFound();
  const topic = aiQuestionTopics.find((item) => item.id === article.topic)!;
  const sourceIds = aiQuestionSourceIds(article);
  const url = canonicalUrl(`/ai-questions/${article.slug}`);
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: article.question, description: article.description, url, mainEntityOfPage: { '@type': 'WebPage', '@id': url }, inLanguage: 'en', datePublished: article.published, dateModified: article.reviewed, articleSection: topic.name, author: { '@type': 'Organization', name: 'DevX Tool', url: canonicalUrl('/about') }, publisher: { '@type': 'Organization', name: siteConfig.name, url: canonicalUrl('/') }, citation: sourceIds.map((id) => aiResearchSources[id].url) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl('/') }, { '@type': 'ListItem', position: 2, name: 'AI questions', item: canonicalUrl('/ai-questions') }, { '@type': 'ListItem', position: 3, name: article.question, item: url }] },
  ];
  return <main className="bg-[#fcfcff] py-10 sm:py-14">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <div className="container"><article className="article">
      <Link href="/ai-questions/" className="text-sm font-semibold text-[#0f766e]">← All AI questions</Link>
      <p className="eyebrow mt-7">{topic.name} · Research explained</p>
      <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">{article.question}</h1>
      <p className="mt-5 text-lg">{article.description}</p>
      <p className="mt-5 text-sm">By <Link href="/about/">DevX Tool</Link> · Published <time dateTime={article.published}>{article.published}</time> · Sources reviewed <time dateTime={article.reviewed}>{article.reviewed}</time></p>
      <aside className="mt-8 rounded-2xl border border-[#99d8cb] bg-[#f0fdfa] p-5 sm:p-6" aria-labelledby="short-answer"><h2 id="short-answer" className="!mt-0">The short answer</h2><p>{article.answer}</p><Citations ids={article.answerSources} /></aside>
      <aside className="mt-5 rounded-xl border border-[#e4e7ec] bg-white p-5" aria-label="Evidence and uncertainty"><p className="text-sm"><strong>Evidence:</strong> {article.evidence}</p><p className="text-sm"><strong>What remains uncertain:</strong> {article.uncertainty}</p></aside>
      <nav aria-label="Article contents" className="my-8 rounded-xl border border-[#e4e7ec] bg-white p-5"><h2 className="!mt-0">On this page</h2><ul>{article.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}{article.table && <li><a href="#numbers">Read the numbers in context</a></li>}<li><a href="#takeaways">Practical takeaways</a></li><li><a href="#questions">Related questions</a></li><li><a href="#sources">Sources and study limits</a></li></ul></nav>
      {article.sections.map((section) => <section id={section.id} key={section.id} className="scroll-mt-24"><h2>{section.title}</h2>{section.kind === 'analysis' && <p className="!mt-0 text-xs font-bold uppercase tracking-wider !text-[#0f766e]">Our analysis and suggested approach</p>}{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.sources && <Citations ids={section.sources} />}</section>)}
      {article.table && <section id="numbers" className="scroll-mt-24"><h2>Read the numbers in context</h2><div className="my-5 max-w-full overflow-x-auto" role="region" aria-label={article.table.caption} tabIndex={0}><table className="w-full border-collapse text-left text-sm"><caption className="mb-3 text-left font-semibold text-[#475467]">{article.table.caption}</caption><thead><tr>{article.table.headings.map((heading) => <th scope="col" key={heading} className="border border-[#dce6e3] bg-[#f0fdfa] p-3">{heading}</th>)}</tr></thead><tbody>{article.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index} className="border border-[#dce6e3] bg-white p-3">{cell}</td>)}</tr>)}</tbody></table></div><Citations ids={article.table.sources} /></section>}
      <section id="takeaways" className="scroll-mt-24"><h2>Practical takeaways</h2><p>Our suggested approach when using or reading about this research:</p><ul>{article.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul></section>
      <section id="questions" className="scroll-mt-24"><h2>Related questions</h2>{article.faqs.map((faq) => <section id={faq.id} key={faq.id} className="scroll-mt-24" data-answer-id={faq.id}><h3>{faq.question}</h3><p>{faq.answer}</p><Citations ids={faq.sources} /></section>)}</section>
      <section id="sources" className="scroll-mt-24"><h2>Sources and study limits</h2><p>Original sources keep their own dates. These links support the explanation; they do not mean the source authors reviewed or endorsed this article.</p><ol>{sourceIds.map((id) => { const source = aiResearchSources[id]; return <li id={`source-${id}`} key={id} className="mb-5 scroll-mt-24" data-source-id={id}><a href={source.url} className="font-semibold">{source.title}</a><p className="!mt-1 text-sm">{source.organization} · {source.published} · {source.kind}</p><p className="!mt-1 text-sm">{source.limitation}</p></li>; })}</ol><p className="text-sm">This is an editorial explanation of published evidence. Read our <Link href="/ai-questions/#editorial-method">research and corrections approach</Link> or <Link href="/contact/">report a correction</Link> with a primary-source link.</p></section>
      <section className="mt-10 border-t border-[#dce6e3] pt-2"><h2>Keep exploring</h2><ul>{article.related.map((slug) => { const related = findAiQuestionArticle(slug)!; return <li key={slug}><Link href={`/ai-questions/${related.slug}/`}>{related.question}</Link></li>; })}</ul><p className="mt-5">Explore the <Link href="/ai-tools/">creative AI tools directory</Link> or follow our <Link href="/news/">technology news explainers</Link>.</p></section>
    </article></div>
  </main>;
}
