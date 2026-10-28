import Link from 'next/link';
import { publisherStories, displayDate, type NewsPublisher } from '@/lib/news';
import { canonicalUrl, pageMetadata } from '@/lib/seo';

const publisherCopy = {
  google: {
    name: 'Google', title: 'Google AI & Gemini News Explained',
    description: 'Read sourced Google AI, Gemini, and DeepMind news explainers. Check announcement dates, access details, practical examples, and what the demos establish.',
    intro: 'Follow Google AI announcements with their original dates and source links. Our explainers examine what was demonstrated, what access is described, and how to evaluate a result for your own task.',
    context: 'A model showcase can combine several products, account types, and tools. Check which experience produced an example before assuming the same workflow is available everywhere. We distinguish provider descriptions from our own suggested evaluation steps.',
    questions: [{ title: 'Where do these stories come from?', answer: 'Each explainer links to the Google announcement it discusses and shows that announcement’s date separately from our publication date.' }, { title: 'Are the demos independently benchmarked here?', answer: 'No. Our articles identify provider-selected examples and explain ways to test a task. Any independent measurements would need a documented method and results.' }],
  },
  microsoft: {
    name: 'Microsoft', title: 'Microsoft Copilot, Windows & AI News Explained',
    description: 'Explore Microsoft Copilot, Windows, and enterprise AI news. Read sourced explainers with announcement dates, rollout caveats, and practical next steps.',
    intro: 'Understand Microsoft Copilot, Windows, and organizational AI announcements. Read the source, distinguish planned capabilities from availability, and use concrete questions to evaluate a workflow.',
    context: 'A personal account, a managed work account, and a developer integration can have different capabilities. Our explainers identify the scope described by the source and encourage checking current rollout information for the account you use.',
    questions: [{ title: 'Does a new announcement mean I can use the feature today?', answer: 'Not necessarily. An announcement may describe a preview, staged rollout, or future plan. The article’s source and current product documentation are the right places to confirm availability.' }, { title: 'Are reported customer outcomes guaranteed for my organization?', answer: 'No. We attribute provider-reported examples and keep them separate from suggestions for measuring your own workload.' }],
  },
};

export function publisherMetadata(publisher: NewsPublisher) {
  const copy = publisherCopy[publisher];
  return pageMetadata({ title: copy.title, description: copy.description, path: `/news/${publisher}` });
}

export default function PublisherNews({ publisher }: { publisher: NewsPublisher }) {
  const copy = publisherCopy[publisher];
  const stories = publisherStories(publisher);
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: copy.title, description: copy.description,
    url: canonicalUrl(`/news/${publisher}`), inLanguage: 'en',
    mainEntity: { '@type': 'ItemList', itemListElement: stories.map((story, index) => ({ '@type': 'ListItem', position: index + 1, name: story.title, url: canonicalUrl(`/news/${story.slug}`) })) },
  };
  return (
    <main className="section bg-[#fcfcff]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <div className="container">
        <Link href="/news/" className="text-sm font-semibold text-[#0f766e]">← All tech news</Link>
        <div className="mt-7 max-w-3xl">
          <p className="eyebrow">The tech brief · {copy.name}</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight">{copy.title}</h1>
          <p className="mt-5 text-lg leading-8 text-[#475467]">{copy.intro}</p>
          <p className="mt-4 leading-7 text-[#667085]">{copy.context}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {stories.map((story) => <article key={story.slug} className="rounded-2xl border border-[#e4e7ec] bg-white p-6">
            <span className="text-xs font-bold text-[#0f766e]">{story.topic}</span>
            <h2 className="mt-3 text-2xl font-extrabold leading-snug"><Link href={`/news/${story.slug}/`} className="hover:text-[#0d9488]">{story.title}</Link></h2>
            <p className="mt-3 text-sm leading-7 text-[#667085]">{story.description}</p>
            <p className="mt-4 text-xs leading-6 text-[#667085]">Published <time dateTime={story.published}>{displayDate(story.published)}</time> · Announcement <time dateTime={story.eventDate}>{displayDate(story.eventDate)}</time></p>
            <Link href={`/news/${story.slug}/`} className="mt-4 inline-block text-sm font-bold text-[#0f766e]">Read the explainer →</Link>
          </article>)}
        </div>
        <section className="article !mx-0 mt-12">
          <h2>About this coverage</h2>
          {copy.questions.map((question) => <div key={question.title}><h3>{question.title}</h3><p>{question.answer}</p></div>)}
          <p className="mt-6">Browse <Link href="/news/">all technology news</Link>, explore <Link href="/guides/">practical developer guides</Link>, or <a href="/feed.xml">follow our original articles by RSS</a>.</p>
        </section>
      </div>
    </main>
  );
}
