import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import BlogLayout from '@/components/blog/BlogLayout';
import EmbeddedTool from '@/components/EmbeddedTool';
import { RegexTool } from '@/components/Tools';
import { blogPosts } from '@/lib/blog';

const seoPost = blogPosts.find((post) => post.slug === 'preventing-catastrophic-backtracking-in-regex')!;

export const metadata: Metadata = pageMetadata({
  title: seoPost.title, description: seoPost.excerpt, path: '/blog/preventing-catastrophic-backtracking-in-regex',
  article: { published: seoPost.date, modified: seoPost.modified, author: seoPost.author, tags: seoPost.tags },
});

export default function Page() {
  const post = blogPosts.find((p) => p.slug === 'preventing-catastrophic-backtracking-in-regex')!;

  return (
    <BlogLayout post={post}>

      <h2>1. The Mechanics of Non-Deterministic Finite Automata (NFA)</h2>
      <p>Most modern regular expression engines (found in JavaScript, Python, Java, and Ruby) utilize backtracking NFA algorithms. When a pattern contains nested quantifiers, such as <code>(a+)+$</code>, and tests an invalid input string like <code>aaaaaaaaaaaaaaaaaaaaaaaa!</code>, the engine attempts every possible combination of splits before declaring failure.</p>

      <p>The number of states explored grows exponentially: <strong>O(2^n)</strong>. A string of merely 30 characters can cause an API thread to lock at 100% CPU utilization for hours, bringing down production servers in a ReDoS attack.</p>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="regex-tester" headline="Live Regular Expression Testing Sandbox" description="Test regex patterns against edge-case input strings with real-time match highlighting and flags."><RegexTool /></EmbeddedTool>

      <h2>2. Identifying Vulnerable Regex Patterns</h2>
      <p>Look out for these common anti-patterns in your codebase:</p>
      <ul>
        <li>Nested quantifiers: <code>(a*)*</code>, <code>(a+)+</code>, <code>(x+y+)+</code></li>
        <li>Overlapping alternation: <code>(a|a)+</code>, <code>([a-z]|[0-9])+</code></li>
        <li>Quantified groups with trailing wildcards: <code>.*[a-z]+.*</code></li>
      </ul>

      <h2>3. Remediation Strategies</h2>
      <p>To eliminate ReDoS vulnerabilities:</p>
      <ul>
        <li>Use linear-time DFA engines (such as Google's <code>RE2</code> in Go or Rust's <code>regex</code> crate).</li>
        <li>Specify strict character classes instead of greedy wildcards (e.g., use <code>[^\s&gt;]+</code> instead of <code>.+</code>).</li>
        <li>Set execution timeouts on regex operations.</li>
      </ul>

    
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
