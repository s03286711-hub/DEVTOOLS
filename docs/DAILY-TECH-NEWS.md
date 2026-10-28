# Tech news and everyday technology articles

## Added content

- `/news/`: original news explainers, recent official publisher headlines, and links to everyday technology articles.
- Three sourced explainers: GitHub Copilot assisted permissions, Apple organization subscriptions, and Windows hybrid AI.
- Four evergreen articles: clearing browser cache, passkeys versus passwords, AI agents versus chatbots, and inspecting suspicious links.
- `/feed.xml`: RSS for the site's original articles, with stable URLs and publication dates.

## Daily updates

The existing GitHub Pages workflow now runs on pushes to main, manual dispatch, and a daily schedule at **06:17 UTC / 11:17 Asia/Karachi**. The schedule becomes active after this workflow reaches the repository's default branch and GitHub Actions is enabled. GitHub can delay scheduled runs; public repositories can have inactive schedules disabled after 60 days without repository activity. Check the Actions tab when a refresh is overdue.

Each run retrieves up to three recent headline links from each official feed: Google Blog, Microsoft Blog, and Apple Developer. It renders the snapshot into the static news page and deploys through the existing Pages job. No API key or paid news service is needed. The initial snapshot contains nine links. GitHub's RSS response failed validation in the initial check, so it is not an automatic feed source; the GitHub explainer uses its separately verified announcement.

**The daily automation refreshes publisher headline links. It does not write new original articles each day.** Original explainers are maintained in `lib/news.ts`; new everyday articles go in `lib/everyday-tech.ts`. This keeps reporting and analysis separate from an automated source list.

The updater reads titles, destinations, and publication dates. It does not republish full source articles or their images. It accepts only HTTPS destinations on the configured publisher hosts, rejects invalid XML and future or old dates, and removes duplicate links. Items older than 45 days are removed from the current headline list. Original article pages remain available.

The workflow caches the last successful snapshot. If one source fails, its recent previous links are retained while other sources update. A source's “last retrieved” date advances only after a successful fetch. If every source fails, the overall successful-refresh timestamp is preserved. If the cache is unavailable, the committed snapshot is the fallback. The page shows original headline dates so old stories are not presented as today's news.

## Local commands

```sh
npm run news:update
npm run news:test
npm run build
npm run check:export
```

The first command needs network access. Ordinary builds use the saved JSON snapshot, so a publisher outage does not prevent local development. Deployment runs the refresh automatically before building.

## Publishing original explainers

For a new story in `lib/news.ts`, provide a unique slug, original title and description, the article's publication date, the announcement date, and the exact primary-source URL. Summarize verified facts briefly, label analysis, and add useful next steps. Do not change an old announcement's date to make it look new. Verify product availability and distinguish shipping features from announced plans.

The static routes, news cards, RSS feed, and sitemap pick up the new entry. Add related links to useful existing content. For material corrections, update the visible copy and date handling deliberately rather than changing every page's date during a daily feed refresh.

## Checks

- Feed tests cover RSS/Atom parsing, invalid XML, unexpected domains, dates, duplicates, and partial or complete publisher failures.
- Export checks cover canonical URLs, descriptions, unique titles, H1 counts, indexing directives, internal links, sitemap coverage, RSS XML and destinations, and news structured data.
- The first build generated 76 content pages and 30 RSS items. RSS intentionally contains a rolling selection of original articles, not every external publisher headline.

No claim is made that these are the world's highest-volume keywords. Use Search Console queries and country reports to decide which topics to expand. Headline refreshes keep the page useful to returning visitors; original articles, reliable tools, and relevant links remain the content that can earn traffic.

Reference: [GitHub scheduled workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).
