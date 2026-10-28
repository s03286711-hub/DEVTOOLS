import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import AiCategoryCards from '@/components/AiCategoryCards';
import AiToolDirectory from '@/components/AiToolDirectory';
import { aiTools, aiToolsReviewedAt, hasFreeAccess } from '@/lib/ai-tools';
import { aiCategories } from '@/lib/ai-categories';
import { canonicalUrl, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'AI Tools Directory: Free Plans for Creators',
  description: 'Find AI tools for video, images, audio, editing, and cartoons. Compare free access, credit limits, export conditions, and official links before you choose.',
  path: '/ai-tools',
});

export default function AiToolsPage() {
  const freeTools = aiTools.filter(hasFreeAccess);
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'AI tools directory for creators',
    description: 'Source-reviewed third-party creative tools with free-entry access notes and official provider links.',
    url: canonicalUrl('/ai-tools'), dateModified: aiToolsReviewedAt, inLanguage: 'en',
    mainEntity: { '@type': 'ItemList', numberOfItems: freeTools.length, itemListElement: freeTools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.name, url: `${canonicalUrl('/ai-tools')}#${tool.id}` })) },
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <section className="border-b border-[#dce6e3] bg-[radial-gradient(ellipse_at_80%_0%,#d8f4eb_0%,#f6faf8_55%,#fff_100%)] py-16 sm:py-20">
        <div className="container">
          <p className="eyebrow inline-flex items-center gap-2"><Sparkles size={15} /> The creator toolbox</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">Find AI tools for your next idea.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#475467]">Make a video, explore an image, improve a recording, or bring a character to life. Compare tools by the job they do and what their free access actually includes.</p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm"><span className="rounded-full border border-[#d5e8df] bg-white px-4 py-2">{aiTools.length} source-reviewed tools</span><span className="rounded-full border border-[#d5e8df] bg-white px-4 py-2">{aiCategories.length} creative categories</span><span className="rounded-full border border-[#d5e8df] bg-white px-4 py-2">Reviewed <time dateTime={aiToolsReviewedAt}>{aiToolsReviewedAt}</time></span></div>
          <a href="#directory" className="btn btn-primary mt-7">Explore the directory <ArrowRight size={16} /></a>
        </div>
      </section>
      <section className="py-12" aria-labelledby="ai-categories-heading"><div className="container"><h2 id="ai-categories-heading" className="mb-6 text-2xl font-extrabold tracking-tight">What do you want to create?</h2><AiCategoryCards /></div></section>
      <section id="directory" className="scroll-mt-24 border-t border-[#e4e7ec] bg-[#f8fafb] py-12">
        <div className="container">
          <div className="mb-7 max-w-3xl"><h2 className="text-3xl font-black tracking-tight">Compare creative AI tools</h2><p className="mt-3 leading-7 text-[#667085]">These are third-party services. Open an official website to use its tools; accounts and uploaded media are handled by that provider. The default view shows options with some free access, including limited credits or basic features.</p><p className="mt-3 text-sm leading-7 text-[#667085]">Descriptions are based on linked provider documentation, not a hands-on ranking. Plans can change by date, region, account, or model. Our direct links contain no affiliate parameters.</p></div>
          <AiToolDirectory key="all" tools={aiTools} categories={aiCategories.map(({ id, name }) => ({ id, name }))} />
        </div>
      </section>
      <section className="section"><div className="container"><article className="article !mx-0">
        <h2>What does “free” mean here?</h2>
        <p>A recurring free allowance can support small experiments over time. One-time credits support a limited first trial. A free basic editor can help finish a project while reserving advanced AI features for a paid plan. Read the entry for the specific task you need.</p>
        <p>A free account with zero included generation credits is marked separately and hidden by the free-access filter. We do not label every tool as unlimited or assume that a free generation includes watermark removal or publishing rights.</p>
        <h2>A practical way to compare tools</h2>
        <ol><li>Choose a small task and define the result you need.</li><li>Check the exact free allowance and feature before generating.</li><li>Try a short sample and inspect the downloaded result.</li><li>Review export settings and usage terms before expanding the project.</li></ol>
        <h2>Frequently asked questions</h2>
        <h3>Does DevX Tool generate videos or images here?</h3><p>This directory helps you choose external services and links to their official websites. The <Link href="/tools/">developer tools directory</Link> contains our separate browser utilities for tasks such as JSON formatting and Base64 conversion.</p>
        <h3>Are the listed tools all completely free?</h3><p>No. The entries explain the available free access and its limits. You can also include paid-credit comparison options by changing the filter. Provider terms are the final source for current availability.</p>
        <h3>Can I suggest a tool or report a changed plan?</h3><p>Use our <Link href="/contact/">contact page</Link> and include the official product or plan URL. We can then review the source and update the listing.</p>
        <p className="mt-8">Explore our <Link href="/news/">AI and technology news</Link> or learn more about <Link href="/blog/what-is-an-ai-agent-vs-chatbot/">AI agents and automation</Link>.</p>
      </article></div></section>
    </main>
  );
}
