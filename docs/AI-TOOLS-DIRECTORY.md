# Creative AI tools directory

The directory adds `/ai-tools/` and five comparison guides:

- `/ai-tools/video-generators/`
- `/ai-tools/image-generators/`
- `/ai-tools/audio-tools/`
- `/ai-tools/video-editors/`
- `/ai-tools/cartoon-animation/`

The initial directory contains 12 providers/features. Search and category filters work locally, and the default view shows 11 entries with some free access. Free basic editing, recurring allowances, and one-time credits are labeled separately. Pika is included as a paid-credit comparison and hidden by the default free-access filter because its reviewed Free account lists zero monthly credits.

Each entry includes an original description, a useful task, an official launch link, a primary-source link, limits, export considerations, and a source-review date. These are documentation-based comparisons, not hands-on ratings or a ranking by popularity. No affiliate parameters, fabricated reviews, or universal zero-price claims are added.

## Updating listings

Provider details live in `lib/ai-tools.ts`. Original category guides, workflows, questions, and metadata live in `lib/ai-categories.ts`. The homepage, navigation, footer, about page, and regular sitemap link to the directory. Each comparison page includes CollectionPage and ItemList structured data matching the initially visible cards; category pages also have breadcrumbs.

Official documentation was reviewed on **2026-10-28**. Review plan details regularly and when a visitor reports a change. Open the linked official source, check the exact feature and free-plan conditions, update the listing, and advance its `reviewedAt` date only after checking. For an individual review, give that entry an explicit date. Advance the shared `aiToolsReviewedAt` value only after rechecking the complete directory, because unchanged entries inherit it. Do not advance dates automatically merely because the site rebuilt.

The daily tech-news workflow refreshes publisher headline links; it does **not** recheck AI-tool prices or allowances. Plans can differ by region, account type, and model. Avoid claiming that every listed editor includes free AI generation or that all free outputs are watermark-free or commercially licensed.

## Validation and publication

Run `npm run build` and `npm run check:export`. The export audit checks titles, descriptions, canonicals, internal links, sitemap coverage, and whether each AI collection's structured list matches its rendered cards and anchors. Check interactive search, category selection, the paid-comparison toggle, reset behavior, and phone layouts when changing the directory interface.

These changes use the existing static-export and deployment workflow. They become public after deployment; local build output does not update devxtool.me. The new pages are discoverable content, with no promise of a particular ranking or traffic level.

Initial validation passed: production build, export audit of 92 content pages and sitemap URLs, and browser checks at 320, 390, 768, 1024, and 1280 pixels. Interactive checks covered task search, empty results, reset, category selection, paid-comparison visibility, category navigation state, official/source link attributes, and mobile navigation. No browser runtime exceptions were observed. Advertising requests were blocked during these checks.
