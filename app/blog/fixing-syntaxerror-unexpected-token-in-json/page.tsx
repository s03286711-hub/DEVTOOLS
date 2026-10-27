import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import BlogLayout from '@/components/blog/BlogLayout';
import EmbeddedTool from '@/components/EmbeddedTool';
import { JsonFormatter } from '@/components/Tools';
import { blogPosts } from '@/lib/blog';

const seoPost = blogPosts.find((post) => post.slug === 'fixing-syntaxerror-unexpected-token-in-json')!;

export const metadata: Metadata = pageMetadata({
  title: seoPost.title, description: seoPost.excerpt, path: '/blog/fixing-syntaxerror-unexpected-token-in-json',
  article: { published: seoPost.date, modified: seoPost.modified, author: seoPost.author, tags: seoPost.tags },
});

export default function Page() {
  const post = blogPosts.find((p) => p.slug === 'fixing-syntaxerror-unexpected-token-in-json')!;

  return (
    <BlogLayout post={post}>

      <h2>1. Deconstructing the SyntaxError</h2>
      <p>Every developer who has consumed an API has encountered the infamous exception:</p>
      <pre><code>{`SyntaxError: Unexpected token 'X', "..." is not valid JSON
  at JSON.parse (<anonymous>)`}</code></pre>

      <p>Because the JavaScript V8 engine and standard JSON tokenizers operate strictly in accordance with RFC 8259, they do not recover from formatting ambiguities. Let us explore the primary reasons this exception occurs in production systems.</p>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="json-formatter" headline="Live JSON Formatter & Debugger" description="Paste invalid JSON payloads to pinpoint exact character offsets, missing delimiters, and syntax errors."><JsonFormatter /></EmbeddedTool>

      <h2>2. Root Cause 1: Receiving an HTML Error Page Instead of JSON</h2>
      <p>The most common scenario in web frontend development is attempting to parse an HTTP 500 Internal Server Error or 404 Not Found response that returned an HTML error document instead of JSON:</p>
      <pre><code>{`// Client fetch code:
const response = await fetch('/api/user/profile');
const data = await response.json(); // Throws: Unexpected token < in JSON at position 0`}</code></pre>
      <p>Because the response body begins with <code>&lt;!DOCTYPE html&gt;</code>, the JSON parser encounters the <code>&lt;</code> character at index 0 and aborts. Always verify <code>response.ok</code> and inspect the <code>Content-Type</code> header before parsing.</p>

      <h2>3. Root Cause 2: Invisible Byte Order Marks (BOM) & Zero-Width Spaces</h2>
      <p>Text copied from Windows text files (UTF-8 with BOM) or chat messaging software often contains invisible zero-width non-breaking spaces (<code>U+FEFF</code>) or zero-width spaces (<code>U+200B</code>). These characters are invisible in typical code editors but trigger unexpected token errors at position 0 or position 1.</p>

      <p>Strip BOM tokens before parsing:</p>
      <pre><code>{`function sanitizeJsonString(raw: string): string {
  // Strip BOM and zero-width spaces
  return raw.replace(/^\uFEFF/, '').replace(/[\u200B-\u200D\uFEFF]/g, '');
}`}</code></pre>

      <h2>4. Root Cause 3: Single Quotes and Trailing Commas</h2>
      <p>Standard JSON strictly mandates double quotes around property names and strings. Single quotes (<code>'name': 'Alex'</code>) or trailing commas (<code>[1, 2, 3,]</code>) are invalid and must be corrected.</p>

    
      <h2>Troubleshooting & Production Implementation Best Practices</h2>
      <p>When deploying this architecture in distributed cloud environments (AWS ECS, Kubernetes, Cloudflare Workers, or Google Cloud Run), software engineering teams must account for edge-case failure modes:</p>
      <ul>
        <li><strong>Automated Telemetry & Health Checks:</strong> Configure Prometheus metrics and OpenTelemetry spans to track execution latency, error spikes, and parsing exception rates in real time.</li>
        <li><strong>Graceful Degradation:</strong> Wrap critical encoding, decoding, and parsing operations inside fault-tolerant fallback handlers to prevent single points of failure from escalating into full application downtime.</li>
        <li><strong>Zero-Trust Input Sanitization:</strong> Never assume that client-submitted parameters, headers, or payloads conform to protocol specifications. Always validate boundaries, encodings, and types at the ingress boundary.</li>
      </ul>

      <h2>Multi-Environment Verification Table</h2>
      <table className="w-full text-left border-collapse my-6">
        <thead>
          <tr className="border-b bg-[#f8f9fc]">
            <th className="py-3 px-3">Runtime Environment</th>
            <th className="py-3 px-3">Supported API</th>
            <th className="py-3 px-3">Performance Characteristic</th>
            <th className="py-3 px-3">Key Production Caution</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Web Browser (Client)</td>
            <td className="py-3 px-3">Web Crypto / TextEncoder API</td>
            <td className="py-3 px-3 text-[#059669]">Zero server roundtrip latency; client CPU sandbox</td>
            <td className="py-3 px-3">Sensitive credentials must never be persisted in localStorage.</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Node.js (Backend)</td>
            <td className="py-3 px-3">crypto / Buffer modules</td>
            <td className="py-3 px-3 text-[#059669]">Native C++ libuv / OpenSSL hardware acceleration</td>
            <td className="py-3 px-3">Ensure non-blocking async execution for heavy CPU tasks.</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Python 3 (Backend)</td>
            <td className="py-3 px-3">hashlib / secrets / urllib</td>
            <td className="py-3 px-3 text-[#059669]">C-accelerated standard library routines</td>
            <td className="py-3 px-3">Be vigilant regarding GIL locks during parallel worker bursts.</td>
          </tr>
        </tbody>
      </table>

    </BlogLayout>
  );
}
