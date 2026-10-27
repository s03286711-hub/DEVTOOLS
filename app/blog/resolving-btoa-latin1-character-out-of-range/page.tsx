import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import BlogLayout from '@/components/blog/BlogLayout';
import EmbeddedTool from '@/components/EmbeddedTool';
import { Base64Tool } from '@/components/Tools';
import { blogPosts } from '@/lib/blog';

const seoPost = blogPosts.find((post) => post.slug === 'resolving-btoa-latin1-character-out-of-range')!;

export const metadata: Metadata = pageMetadata({
  title: seoPost.title, description: seoPost.excerpt, path: '/blog/resolving-btoa-latin1-character-out-of-range',
  article: { published: seoPost.date, modified: seoPost.modified, author: seoPost.author, tags: seoPost.tags },
});

export default function Page() {
  const post = blogPosts.find((p) => p.slug === 'resolving-btoa-latin1-character-out-of-range')!;

  return (
    <BlogLayout post={post}>

      <h2>1. The Root Cause of the btoa() Exception</h2>
      <p>Every frontend developer eventually encounters this classic browser exception when attempting to encode localized text or JSON payloads into Base64:</p>

      <pre><code>{`Uncaught DOMException: Failed to execute 'btoa' on 'Window': 
The string to be encoded contains characters outside of the Latin1 range.`}</code></pre>

      <p>The standard JavaScript function <code>window.btoa()</code> (Binary to ASCII) dates back to early Netscape browser APIs. By specification (WHATWG HTML Living Standard), <code>btoa()</code> expects each character in the input string to correspond to a single byte of binary data in the ISO-8859-1 (Latin-1) code point range: <code>U+0000</code> through <code>U+00FF</code> (0 to 255).</p>

      <p>When you pass strings containing characters outside Latin-1—such as emojis (<code>🚀</code>, code point U+1F680), accented non-Western characters, Arabic, Cyrillic, or Chinese glyphs (<code>你好</code>, code point U+4F60)—JavaScript stores them as multi-byte UTF-16 code units. Because these code points exceed 255, <code>btoa()</code> immediately aborts execution and throws a <code>DOMException</code>.</p>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="base64-encoder-decoder" headline="Live Unicode-Safe Base64 Playground" description="Safely encode and decode UTF-8 text containing multi-byte characters, emoji, and non-ASCII glyphs without Latin1 browser exceptions."><Base64Tool /></EmbeddedTool>

      <h2>2. The Flawed Legacy Workaround (unescape + encodeURIComponent)</h2>
      <p>Historically, developers copied this snippet from Stack Overflow:</p>
      <pre><code>{`// LEGACY / DEPRECATED WORKAROUND:
const encoded = btoa(unescape(encodeURIComponent("Hello 🌍!")));`}</code></pre>

      <p>While this hack works by percent-encoding UTF-8 bytes and coercing them via <code>unescape()</code>, the <code>unescape()</code> function was officially deprecated in ECMAScript v3 and is permanently marked obsolete in Web Standards. It also degrades CPU performance under high throughput because it converts strings back and forth through multiple regex transformations.</p>

      <h2>3. Modern, Standard-Compliant Solution: The TextEncoder API</h2>
      <p>Modern browsers and Node.js 16+ natively support the <strong>Encoding API</strong> (<code>TextEncoder</code> and <code>TextDecoder</code>). This is the fastest, standard-compliant mechanism to convert UTF-8 strings to binary byte arrays and safely encode them to Base64:</p>

      <pre><code>{`/**
 * Standard UTF-8 safe Base64 Encoder
 */
function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  const binString = Array.from(bytes, (byte) ⇒ String.fromCharCode(byte)).join('');
  return btoa(binString);
}

/**
 * Standard UTF-8 safe Base64 Decoder
 */
function base64ToUtf8(base64: string): string {
  const binString = atob(base64);
  const bytes = Uint8Array.from(binString, (char) ⇒ char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

// Test with complex multi-byte strings:
const original = "DevX Tool: 🚀 高性能 / Безопасность / $100 & €50";
const encoded = utf8ToBase64(original);
console.log("Encoded:", encoded);
console.log("Decoded:", base64ToUtf8(encoded));`}</code></pre>

      <h2>4. Node.js Buffer Differences</h2>
      <p>In Node.js backend environments, the native <code>Buffer</code> class handles multi-byte UTF-8 natively without throwing exceptions:</p>
      <pre><code>{`// Node.js native buffer encoding:
const encoded = Buffer.from("Hello 🌍!", "utf-8").toString("base64");
const decoded = Buffer.from(encoded, "base64").toString("utf-8");`}</code></pre>

      <h2>5. Summary Best Practices</h2>
      <ul>
        <li>Never pass raw multi-byte text directly into <code>window.btoa()</code>.</li>
        <li>Always use the <code>TextEncoder</code> and <code>TextDecoder</code> APIs for client-side binary marshaling.</li>
        <li>For URL-safe transmission, convert <code>+</code> to <code>-</code> and <code>/</code> to <code>_</code>, and strip trailing <code>=</code> padding characters.</li>
      </ul>

    
      <h2>6. Memory Footprint and Garbage Collection Diagnostics</h2>
      <p>When encoding large string buffers (e.g., inlining 5MB JSON configuration manifests into Base64 for file downloads or data URIs), string concatenation loops in JavaScript create severe memory pressure:</p>

      <pre><code>{`// ANTI-PATTERN: Inefficient string concatenation causing O(N^2) memory allocations!
let binary = '';
for (let i = 0; i &lt; bytes.byteLength; i++) {
  binary += String.fromCharCode(bytes[i]); // Creates millions of transient string objects!
}`}</code></pre>

      <p>In modern high-performance frontend engineering, batch chunking through <code>String.fromCharCode.apply</code> or <code>FileReader.readAsDataURL()</code> completely bypasses memory bloat:</p>

      <pre><code>{`// OPTIMIZED BATCH CHUNKING (O(N) CPU execution):
function uint8ArrayToBase64Fast(bytes: Uint8Array): string {
  const CHUNK_SIZE = 0x8000; // 32KB chunk limit to prevent stack overflow
  const chunks: string[] = [];
  for (let i = 0; i &lt; bytes.length; i += CHUNK_SIZE) {
    chunks.push(String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK_SIZE) as unknown as number[]));
  }
  return btoa(chunks.join(''));
}`}</code></pre>

    </BlogLayout>
  );
}
