import type { Metadata } from 'next';
import ToolShell from '@/components/ToolShell';
import { UrlTool } from '@/components/Tools';

export const metadata: Metadata = {
  title: 'Offline URL Encoder & Decoder (RFC 3986 Percent-Encoding) — DevX Tool',
  description: 'Encode URI components and query parameters or decode percent-encoded strings locally in your browser. Handles complex multi-byte character strings with zero server communication.',
  keywords: ['offline url encoder decoder', 'rfc 3986 percent encoding tool', 'browser url component encoder', 'decode query parameters offline', 'safe url encoder'],
};

export default function Page() {
  return (
    <ToolShell
      slug="url-encoder-decoder"
      title="URL Encoder & Decoder"
      description="Encode special characters into RFC 3986 percent-encoded strings or decode encoded query parameters back to human-readable text."
    >
      <UrlTool />
      <section className="article mt-12">
        <h2>What Is URL Encoding (Percent-Encoding)?</h2>
        <p>Uniform Resource Identifiers (URIs) are constrained by the RFC 3986 standard to a restricted subset of the US-ASCII character set. Characters that carry syntactic meaning in URLs (such as <code>?</code>, <code>&amp;</code>, <code>=</code>, <code>/</code>, and <code>#</code>) or characters outside the printable ASCII range (such as spaces and non-Latin alphabets) cannot be transmitted literally inside query parameters.</p>
        <p>URL encoding replaces unsafe or reserved characters with a <code>%</code> followed by their two-digit hexadecimal representation (for instance, a space becomes <code>%20</code>, and an ampersand becomes <code>%26</code>).</p>

        <h2>Component Encoding vs. Full URL Encoding</h2>
        <ul>
          <li><strong>encodeURIComponent:</strong> Used to encode individual parameter values. It encodes delimiters like <code>&amp;</code>, <code>=</code>, and <code>/</code> so they do not inadvertently split URL query strings.</li>
          <li><strong>encodeURI:</strong> Used when encoding a complete URL without escaping structural protocol and domain separators (like <code>https://</code> or <code>?</code>).</li>
        </ul>
        <p>This tool performs strict component encoding and decoding, ideal for preparing search queries, tracking parameters, and OAuth redirect URIs.</p>

        <h2>Common URL Encoding Pitfalls</h2>
        <ul>
          <li><strong>Double Encoding:</strong> Encoding an already encoded string results in corrupt sequences like <code>%2520</code> (where the <code>%</code> itself was re-encoded).</li>
          <li><strong>Plus Signs (+) vs. %20:</strong> In application/x-www-form-urlencoded form data, spaces are frequently represented as <code>+</code>. In standard URI paths, <code>%20</code> should be strictly preferred.</li>
          <li><strong>Truncated Sequences:</strong> Incomplete percent sequences (e.g. <code>hello%2</code>) will trigger URI decode exceptions.</li>
        </ul>
      </section>
    </ToolShell>
  );
}
