import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import BlogLayout from '@/components/blog/BlogLayout';
import EmbeddedTool from '@/components/EmbeddedTool';
import { HashTool } from '@/components/NewTools';
import { blogPosts } from '@/lib/blog';

const seoPost = blogPosts.find((post) => post.slug === 'fixing-rag-vector-embedding-dimension-mismatch-error')!;

export const metadata: Metadata = pageMetadata({
  title: seoPost.title, description: seoPost.excerpt, path: '/blog/fixing-rag-vector-embedding-dimension-mismatch-error',
  article: { published: seoPost.date, modified: seoPost.modified, author: seoPost.author, tags: seoPost.tags },
});

export default function Page() {
  const post = blogPosts.find((p) => p.slug === 'fixing-rag-vector-embedding-dimension-mismatch-error')!;

  return (
    <BlogLayout post={post}>

      <h2>1. The Root Cause of Embedding Dimension Mismatch</h2>
      <p>When building Retrieval-Augmented Generation (RAG) pipelines, the most frequent vector database error occurs when upserting chunks or querying vectors:</p>
      <pre><code>{`pinecone.core.client.exceptions.ApiException: (400)
Reason: Bad Request
HTTP response body: {"error":{"code":"INVALID_ARGUMENT","message":"Vector dimension 1536 does not match the dimension of the index 3072"}}`}</code></pre>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="hash-generator" headline="Live Document Checksum & Embedding Hash Sandbox" description="Calculate cryptographic hash digests of ingested document chunks to prevent duplicate vector upserts."><HashTool /></EmbeddedTool>

      <h2>2. Dimension Reference Across Popular Embedding Models</h2>
      <table className="w-full text-left border-collapse my-6">
        <thead>
          <tr className="border-b bg-[#f8f9fc]">
            <th className="py-3 px-3">Model</th>
            <th className="py-3 px-3">Dimensions</th>
            <th className="py-3 px-3">Truncation Allowed?</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">text-embedding-ada-002</td>
            <td className="py-3 px-3 font-mono">1536</td>
            <td className="py-3 px-3 text-[#b91c1c]">No</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">text-embedding-3-small</td>
            <td className="py-3 px-3 font-mono">1536 (or 512)</td>
            <td className="py-3 px-3 text-[#059669]">Yes (via dimensions parameter)</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">text-embedding-3-large</td>
            <td className="py-3 px-3 font-mono">3072 (or 1536, 256)</td>
            <td className="py-3 px-3 text-[#059669]">Yes (Matryoshka embeddings)</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Safe Migration in PostgreSQL (pgvector)</h2>
      <pre><code>{`-- Alter table vector dimension in PostgreSQL pgvector:
ALTER TABLE document_embeddings 
  ALTER COLUMN embedding TYPE vector(3072);

-- Re-index with HNSW index for fast cosine similarity:
CREATE INDEX ON document_embeddings 
  USING hnsw (embedding vector_cosine_ops);`}</code></pre>


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
