# DevToolbox

A starter project for a global, SEO-focused online developer tools website. Built with Next.js App Router, React, TypeScript, and Tailwind CSS. The five tools run client-side and do not require a database or paid API.

## Included

- Responsive landing page and tool directory
- JSON formatter, validator, and minifier
- Side-by-side text diff checker (simple line-by-line comparison)
- UTF-8 Base64 encoder/decoder
- URL component encoder/decoder
- JavaScript regex tester
- Five original educational guides
- About, Contact, Privacy Policy, and Terms pages
- Page metadata, sitemap, and robots.txt generation
- Keyboard-accessible native controls and mobile-responsive layouts

## Requirements

- Node.js 18.17+ (Node.js 20 LTS recommended)
- npm

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Before publishing

1. Buy and configure your real domain.
2. Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL in your hosting environment. The fallback `https://example.com` is only a development placeholder.
3. Replace the suggested contact email with a real monitored address.
4. Review and customize the Privacy Policy and Terms for your real providers, data flows, jurisdiction, analytics, and advertising. The included legal pages are templates, not legal advice.
5. Test every tool on desktop and mobile, including empty input, invalid input, Unicode, large input, keyboard navigation, and browser compatibility.
6. Add a favicon, social sharing image, and final brand assets.
7. Connect Google Search Console, verify the domain, submit `/sitemap.xml`, and monitor indexing.
8. Add analytics only if you need them and disclose actual data collection. Configure consent where required.
9. Apply for AdSense only after the website is complete, useful, and compliant. Approval and revenue are not guaranteed.

## Privacy and security notes

- Tool input is handled by client-side JavaScript in the included implementation; do not claim this for future server-backed features without checking their implementation.
- The regex tester uses JavaScript's native regular-expression engine. Avoid testing complex patterns on very large or untrusted inputs.
- The text diff tool is intentionally a simple line-by-line positional comparison, not a Git-compatible diff algorithm.
- Base64 is encoding, not encryption.
- Do not paste secrets into online tools unless you have reviewed and trust their implementation.

## SEO notes

- Each tool and guide has a unique title and description.
- The sitemap and robots routes use `NEXT_PUBLIC_SITE_URL`; set it correctly before deployment.
- This project avoids generating near-duplicate pages for trivial keyword variants. Add new pages only when they serve a distinct user need.
- Search Console can take time to collect data; sitemap submission does not guarantee indexing or ranking.

## Deployment

### Vercel

1. Push this project to a Git repository.
2. Import the repository into Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to your HTTPS domain in project environment variables.
4. Deploy and connect the domain using the hosting provider's current instructions.

### Cloudflare Pages / static export

The default project uses standard Next.js deployment behavior. If you want a fully static export, configure `output: 'export'` in `next.config.mjs` and test the build. Static export has feature limitations; review the current Next.js static export documentation before choosing this route.

## License

No license is provided by default. Add a license file if you want to grant reuse rights to others.
