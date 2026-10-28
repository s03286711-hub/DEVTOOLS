import Link from 'next/link';
import { notFound } from 'next/navigation';
import AiToolDirectory from '@/components/AiToolDirectory';
import { aiTools, aiToolsReviewedAt, hasFreeAccess, toolsForCategory } from '@/lib/ai-tools';
import { aiCategories, findAiCategory } from '@/lib/ai-categories';
import { canonicalUrl, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return aiCategories.map(({ id }) => ({ category: id })); }
export function generateMetadata({ params }: { params: { category: string } }) {
  const category = findAiCategory(params.category);
  if (!category) notFound();
  return pageMetadata({ title: category.title, description: category.description, path: `/ai-tools/${category.id}` });
}

export default function AiCategoryPage({ params }: { params: { category: string } }) {
  const category = findAiCategory(params.category);
  if (!category) notFound();
  const freeTools = toolsForCategory(category.id).filter(hasFreeAccess);
  const url = canonicalUrl(`/ai-tools/${category.id}`);
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: category.heading, description: category.description, url, dateModified: aiToolsReviewedAt, inLanguage: 'en', mainEntity: { '@type': 'ItemList', numberOfItems: freeTools.length, itemListElement: freeTools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.name, url: `${url}#${tool.id}` })) } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl('/') }, { '@type': 'ListItem', position: 2, name: 'AI tools', item: canonicalUrl('/ai-tools') }, { '@type': 'ListItem', position: 3, name: category.name, item: url }] },
  ];
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, '\\u003c') }} />
      <section className="border-b border-[#dce6e3] bg-[#f0fdfa] py-14 sm:py-16"><div className="container"><Link href="/ai-tools/" className="text-sm font-semibold text-[#0f766e]">← All AI tools</Link><p className="eyebrow mt-7">The creator toolbox · {category.name}</p><h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight">{category.heading}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-[#475467]">{category.summary}</p><p className="mt-4 text-sm text-[#667085]">Provider sources reviewed <time dateTime={aiToolsReviewedAt}>{aiToolsReviewedAt}</time>. Access and conditions can change.</p></div></section>
      <section className="bg-[#f8fafb] py-12"><div className="container"><h2 className="mb-5 text-2xl font-extrabold">Compare tools for {category.name.toLowerCase()}</h2><AiToolDirectory key={category.id} tools={aiTools} categories={aiCategories.map(({ id, name }) => ({ id, name }))} initialCategory={category.id} fixedCategory /></div></section>
      <section className="section"><div className="container"><article className="article !mx-0">
        {category.guide.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
        <h2>Try a small workflow first</h2><ol>{category.workflow.map((step) => <li key={step}>{step}</li>)}</ol>
        <h2>Frequently asked questions</h2>{category.questions.map((question) => <div key={question.question}><h3>{question.question}</h3><p>{question.answer}</p></div>)}
        <h2>Explore more creator tools</h2><ul>{aiCategories.filter(({ id }) => id !== category.id).map((item) => <li key={item.id}><Link href={`/ai-tools/${item.id}/`}>{item.name}</Link></li>)}</ul>
        <p className="mt-6">This is a source-reviewed directory with official provider links, not a hands-on ranking. Open the source details in each entry to confirm current terms. <Link href="/contact/">Report a changed plan or suggest a tool</Link>.</p>
      </article></div></section>
    </main>
  );
}
