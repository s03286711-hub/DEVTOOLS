# Search targeting and metadata review — October 28, 2026

The site has a working technical SEO foundation. This update replaces generic tool descriptions with specific, accurate summaries and aligns each tool's title, visible heading, introduction, and social metadata with its supported tasks.

These targets describe relevant search intent. They are not a measured list of today's most popular searches: private Search Console query, impression, position, and country data were not available for this review. Public search results were checked for JSON formatting, UTF-8 Base64 decoding, and epoch conversion phrasing; this is contextual evidence, not search-volume measurement.

## Tool query targets

| Landing page | Main query intent | Supporting task or format |
| --- | --- | --- |
| `/tools/json-formatter/` | JSON formatter and validator online | JSON beautifier, minifier, indentation, syntax errors |
| `/tools/base64-encoder-decoder/` | Base64 decoder and encoder online | Base64 to text, text to Base64, UTF-8 |
| `/tools/url-encoder-decoder/` | URL encoder and decoder | Percent encoding, URL components, query values |
| `/tools/text-diff/` | Text diff checker / compare two texts | Corresponding line differences, original vs revised text |
| `/tools/regex-tester/` | JavaScript regex tester | Flags, matches, match positions |
| `/tools/uuid-generator/` | UUID v4 generator / GUID generator | Bulk generation, one to 100 identifiers |
| `/tools/hash-generator/` | SHA-256 hash generator | SHA-512, SHA-384, SHA-1, text hashing |
| `/tools/jwt-decoder/` | JWT decoder | Header, payload claims, expiration inspection |
| `/tools/timestamp-converter/` | Unix timestamp converter / epoch to date | Seconds, milliseconds, UTC and local dates |
| `/tools/password-generator/` | Random password generator | Custom length and character sets |
| `/tools/color-converter/` | HEX to RGB / HEX to HSL | HEX or RGB input, black and white text contrast |

The same relevant aliases are included in the site's own tool search. They are useful for finding a tool and are not rendered as a meta-keyword list.

## What changed

- Added `lib/tool-seo.ts` as the central copy source for all 11 tool titles, descriptions, H1s, and introductions.
- Replaced repeated generic description endings with each tool's actual capabilities.
- Kept promises within implementation limits: UUID v4 rather than v7; standard Base64 text rather than binary file conversion; HEX/RGB input rather than HSL input; JWT decoding rather than signature verification.
- Tightened the homepage and directory titles around the site's main purpose. Tech news remains described on the news pages.
- Shortened three verbose article titles and one long article description without changing URLs.
- Removed the inherited site-wide meta-keyword list. Google states that this tag has no effect on indexing or ranking.
- Retained canonical URLs, index/follow directives, RSS discovery, relevant structured data, and page-specific social metadata.
- Updated affected sitemap modification dates to the actual revision date rather than changing dates on every daily feed refresh.
- Extended export checks to reject duplicate descriptions, duplicate title/description tags, and inconsistent social descriptions.

Google does not specify a universal character limit for titles or descriptions; results can be truncated to fit the device. Length was treated as an editorial review signal, not a ranking score. Google may choose a title or snippet from visible page content instead of displaying the supplied text verbatim.

## How to improve the targets with real data

After deployment and recrawling, inspect Search Console's Search results report by both Query and Page. Compare matching time periods with enough impressions to be useful. Look for:

1. Relevant queries earning impressions but few clicks: inspect the result's position, title, and match to the query before changing copy.
2. Queries landing on an unsuitable page: strengthen the most relevant page and its internal links.
3. Specific tasks appearing repeatedly: expand that page with a tested example or a distinct tutorial where needed.
4. US opportunities: use the Countries filter and compare actual queries; English metadata alone does not create US-only targeting.

Do not add a current year, “today,” or an unrelated popular product name to evergreen tools simply to imitate a trend. Metadata can improve relevance and clarity; it does not guarantee indexing, a particular result appearance, or visitor growth.

References:

- [Google-supported meta tags: unsupported meta-keyword tag](https://developers.google.com/search/docs/crawling-indexing/special-tags)
- [Google: writing descriptive title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google: page-specific meta descriptions](https://developers.google.com/search/docs/appearance/snippet)
