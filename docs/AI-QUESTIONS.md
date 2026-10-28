# AI questions and research guides

The `/ai-questions/` hub starts with 12 original guides and 60 answered questions: one main answer plus four related answers in each guide. Readers can search every question, select a topic, and include related answers in the default browsing view. Each answer links to its article or exact answer anchor.

Topics cover human safety, jobs and exposure statistics, programming, learning skills, robots, AGI, consciousness, model development, unreliable output, and electricity demand. These are relevant questions, not a claim of measured search volume or guaranteed rankings. Future expansion should follow actual Search Console queries and evidence that can support a useful answer.

## Content and sources

- `lib/ai-questions.ts`: article copy, metadata, dates, related questions, internal links, and per-section citations.
- `lib/ai-research-sources.ts`: 15 original research, institutional, documentation, and industry sources, with publication labels, evidence types, and limitations.
- `app/ai-questions/[slug]/page.tsx`: static article renderer with a direct answer, uncertainty, contents, explanatory sections, practical takeaways, related answers, sources, and Article/BreadcrumbList structured data.
- `components/AiQuestionSearch.tsx`: local search and filters; the hub supplies summaries rather than full article bodies.

Initial source checks were made on **2026-10-28**. Research publication dates remain separate from our article dates. A 2025 report is not presented as new 2026 data. The June 2026 consciousness source is labeled as a scientific opinion article; the 2023 assessment remains tied to its historical scope. METR's February 2026 update is included alongside its earlier trial so the old result is not presented as a universal current productivity finding.

Important statistical distinctions are visible in the content: ILO exposure is potential task impact, not unemployment; WEF's 2030 projection covers several structural trends, not AI alone; robot stock is not a one-to-one job-loss count; and IEA data-centre electricity totals include non-AI workloads. Predictions about catastrophic AI outcomes and AGI timelines remain qualified.

Examples, reading methods, and practical takeaways are editorial analysis. We do not claim original experiments, expert credentials, endorsement by cited researchers, or scientific peer review of these guides. Research articles use Article markup and the regular sitemap; they are not labeled as breaking news or inserted into the time-limited news sitemap. The RSS feed includes original guides in its rolling 30-item selection. No FAQ rich-result eligibility is claimed.

## Adding and maintaining answers

Start with a distinct reader question. Find and read relevant primary sources, check their dates and scope, and write an original explanation. Link evidence close to the associated claim. State disagreements and uncertainty where relevant, and label practical analysis. Avoid combining incompatible statistics or turning a forecast into an observed fact.

Use unique article slugs, section IDs, and answer IDs. Keep related article slugs valid. Preserve `published` on an existing guide; update its `reviewed` value explicitly after rechecking its sources. The initial shared date constants are a publication-batch convenience: override an individual article's dates when reviewing it alone instead of advancing the shared constants for every guide. The hub and sitemap derive their dates from those article values. A scheduled build does not constitute a research review.

Update an existing guide for overlapping questions instead of publishing many near-identical pages. Add a new guide when it needs a distinct explanation and sources. Correct material errors through the existing contact process, and document a material correction in the affected article.

## Checks and deployment

Run `npm run build` and `npm run check:export`. The export audit includes article URLs, visible publication/review dates, source citations, source lists, answer IDs, hub collection consistency, cross-page anchors, metadata, RSS links, and sitemap coverage. When changing search or navigation, also check a phone layout and the interactive controls.

The existing deployment workflow publishes the static export. Local changes and build output become public only after deployment. The daily publisher-headline updater does not generate or scientifically review new question guides.

Initial checks passed: production compilation, lint and types, export audit of 105 content pages and 105 sitemap URLs, data/reference integrity for 12 guides and 60 unique questions, and inclusion of the new guides in the rolling RSS feed. Browser checks covered every guide on a phone, the hub at 320–1280 pixels, the statistics article at 320 pixels, search, topic filters, related-question expansion, reset, all 60 answer destinations, and navigation to an exact answer. No browser runtime exceptions or horizontal page overflow were observed. Advertising requests were blocked during browser checks.
