import Link from 'next/link';
import AiQuestionSearch, { type AiQuestionEntry } from '@/components/AiQuestionSearch';
import { aiQuestionArticles, aiQuestionCount, aiQuestionTopics, aiQuestionsUpdatedAt } from '@/lib/ai-questions';
import { canonicalUrl, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'AI Questions Answered: Jobs, Robots & Future Risks',
  description: 'Explore research-backed AI questions about jobs, robots, AGI, consciousness, safety, and energy. Read direct answers, original explanations, and primary sources.',
  path: '/ai-questions',
});

export default function AiQuestionsPage() {
  const entries: AiQuestionEntry[] = aiQuestionArticles.flatMap((article) => [
    { id: article.slug, question: article.question, answer: article.answer, href: `/ai-questions/${article.slug}/`, topic: article.topic, primary: true },
    ...article.faqs.map((faq) => ({ id: `${article.slug}-${faq.id}`, question: faq.question, answer: faq.answer, href: `/ai-questions/${article.slug}/#${faq.id}`, topic: article.topic, primary: false })),
  ]);
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'AI questions answered', url: canonicalUrl('/ai-questions'),
    description: 'Research guides with direct answers, primary sources, and clearly stated uncertainty.', inLanguage: 'en', dateModified: aiQuestionsUpdatedAt,
    mainEntity: { '@type': 'ItemList', numberOfItems: aiQuestionArticles.length, itemListElement: aiQuestionArticles.map((article, index) => ({ '@type': 'ListItem', position: index + 1, name: article.question, url: canonicalUrl(`/ai-questions/${article.slug}`) })) },
  };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="border-b border-[#dce6e3] bg-[#0b2523] py-16 text-white sm:py-20"><div className="container"><p className="text-xs font-bold uppercase tracking-wider text-[#99f6e4]">Understand AI · DevX Tool</p><h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">Your AI questions, answered with evidence.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-[#c4e4de]">Will AI change your job? Can robots work independently? What do researchers know about future risks? Start with a clear answer, then read the evidence and its limits.</p><p className="mt-6 text-sm leading-7 text-[#99f6e4]">{aiQuestionArticles.length} original guides · {aiQuestionCount} answered questions · Sources reviewed <time dateTime={aiQuestionsUpdatedAt}>{aiQuestionsUpdatedAt}</time></p><a href="#answers" className="btn mt-6 bg-white text-[#134e4a]">Find a question</a></div></section>
    <section id="answers" className="scroll-mt-24 bg-[#f8fafb] py-12"><div className="container"><h2 className="mb-3 text-2xl font-extrabold tracking-tight">Find a question or explore a topic</h2><p className="mb-6 max-w-3xl leading-7 text-[#667085]">Guides distinguish observed results, exposure estimates, forecasts, and open scientific questions. Original studies keep their publication dates; a newly published explanation does not make old data new.</p><AiQuestionSearch entries={entries} topics={[...aiQuestionTopics]} /></div></section>
    <section id="editorial-method" className="section scroll-mt-24"><div className="container"><article className="article !mx-0"><h2 className="!mt-0">How these answers are researched</h2><p>We link to original research, institutional reports, technical documentation, and relevant industry statistics. Each article identifies the kind of evidence and what it cannot establish. Practical examples and suggested reading methods are labeled as our analysis.</p><p>A working paper, an employer survey, and a product demonstration answer different questions. Our editorial explanations are not a claim of independent experimental testing or scientific peer review. Where researchers disagree, we keep that disagreement visible.</p><h2>Dates and corrections</h2><p>Publication dates describe our guides; source dates describe the research underneath them. We update a source-review date after checking the evidence, rather than automatically making an old article look fresh. Use the <Link href="/contact/">contact page</Link> to report a correction, ideally with the article URL and a primary-source link.</p><h2>Explore tools and current announcements</h2><p>Choose a creative service in the <Link href="/ai-tools/">AI tools directory</Link>, follow <Link href="/news/">technology news explainers</Link>, or use our <Link href="/tools/">browser-based developer utilities</Link>. These research guides explain the broader questions behind the headlines.</p></article></div></section>
  </main>;
}
