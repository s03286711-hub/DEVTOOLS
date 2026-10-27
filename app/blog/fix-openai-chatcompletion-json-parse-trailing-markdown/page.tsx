import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import BlogLayout from '@/components/blog/BlogLayout';
import EmbeddedTool from '@/components/EmbeddedTool';
import { JsonFormatter } from '@/components/Tools';
import { blogPosts } from '@/lib/blog';

const seoPost = blogPosts.find((post) => post.slug === 'fix-openai-chatcompletion-json-parse-trailing-markdown')!;

export const metadata: Metadata = pageMetadata({
  title: seoPost.title, description: seoPost.excerpt, path: '/blog/fix-openai-chatcompletion-json-parse-trailing-markdown',
  article: { published: seoPost.date, modified: seoPost.modified, author: seoPost.author, tags: seoPost.tags },
});

export default function Page() {
  const post = blogPosts.find((p) => p.slug === 'fix-openai-chatcompletion-json-parse-trailing-markdown')!;

  return (
    <BlogLayout post={post}>

      <h2>1. The Problem: Why LLMs Break JSON Parsing in Production</h2>
      <p>When engineering autonomous agents, LangChain pipelines, or LLM-powered backends, the most prevalent runtime crash is:</p>
      <pre><code>{`SyntaxError: Unexpected token '\`', "\`\`\`json\n{\n..." is not valid JSON
  at JSON.parse (<anonymous>)`}</code></pre>

      <p>Even when system prompts explicitly command: <em>"You must return raw JSON only. Do not wrap in markdown or backticks"</em>, models like GPT-4o, Claude 3.5 Sonnet, and Llama 3 frequently revert to conversational formatting when uncertainty is high or when generating nested objects.</p>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="json-formatter" headline="Live LLM JSON Sanitize & Format Sandbox" description="Paste raw LLM response strings containing markdown fences, trailing commas, or quotes to clean and format into valid JSON."><JsonFormatter /></EmbeddedTool>

      <h2>2. Root Cause 1: Markdown Code Fence Injection</h2>
      <p>LLMs are trained predominantly on GitHub repositories and Stack Overflow markdown documents. During token generation, the prior probability of following an opening brace with a code fence is extraordinarily high.</p>

      <h3>The Production Regex Stripper (Node.js & Python):</h3>
      <pre><code>{`/**
 * Strips markdown code fences from LLM responses in TypeScript
 */
export function extractLlmJson(rawResponse: string): unknown {
  // 1. Remove \`\`\`json and \`\`\` fences
  const clean = rawResponse
    .replace(/^\s*\`\`\`(?:json)?\s*/i, '')
    .replace(/\s*\`\`\`\s*$/i, '')
    .trim();

  // 2. Fallback: Extract innermost JSON object if conversational preamble exists
  const jsonMatch = clean.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error("No JSON structure detected in model response");
  }

  return JSON.parse(jsonMatch[0]);
}`}</code></pre>

      <h2>3. Root Cause 2: Trailing Commas in Auto-Generated Arrays</h2>
      <p>LLMs generate tokens sequentially. When emitting a list, the model frequently emits a trailing comma before deciding to close the array:</p>
      <pre><code>{`// Typical LLM Hallucinated Syntax:
{
  "recommendations": [
    "Upgrade to TypeScript 5.5",
    "Enable strict mode",  // <-- Trailing comma breaks JSON.parse!
  ]
}`}</code></pre>
      <p>To withstand trailing commas, integrate forgiving parsers like <code>dirtyjson</code> in Python or regex-sanitize before passing to standard <code>JSON.parse()</code>.</p>

      <h2>4. The Modern Solution: OpenAI Structured Outputs (JSON Schema Strict Mode)</h2>
      <p>Modern APIs now support constrained decoding:</p>
      <pre><code>{`import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const client = new OpenAI();

const UserExtractionSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  tags: z.array(z.string())
});

const completion = await client.beta.chat.completions.parse({
  model: 'gpt-4o-2024-08-06',
  messages: [{ role: 'user', content: 'Extract details: Alex Smith (alex@example.com)' }],
  response_format: zodResponseFormat(UserExtractionSchema, 'user_info'),
});

// Guarantees 100% valid JSON matching the schema:
const validData = completion.choices[0].message.parsed;`}</code></pre>


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
