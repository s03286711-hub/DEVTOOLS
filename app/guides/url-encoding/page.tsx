import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';

export const metadata: Metadata = {
  title: 'URL Encoding: A Practical Guide to Percent-Encoding & RFC 3986',
  description: 'Learn percent-encoding principles, reserved vs unreserved characters, query string escaping, and how to avoid double-encoding issues in web development.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="url-encoding"
      title="URL Encoding: A Practical Guide"
      description="Understand URI character rules, percent-encoding syntax, reserved characters, and safe parameter passing across modern web applications."
    >
      <h2>Why Do URLs Require Encoding?</h2>
      <p>Uniform Resource Identifiers (URIs) are governed by the RFC 3986 specification, which limits permitted URL characters to a narrow subset of the US-ASCII character set. Furthermore, within that subset, specific characters serve structural duties as delimiters (such as <code>/</code> separating path components, <code>?</code> denoting the query string start, and <code>&amp;</code> separating key-value pairs).</p>
      <p>If user data or text contains these delimiter characters literally, it would corrupt the syntax of the URL. URL encoding (often termed <em>percent-encoding</em>) solves this by translating reserved or unprintable characters into safe, unambiguous hexadecimal triplets.</p>

      <h2>Character Classifications in RFC 3986</h2>
      <h3>1. Unreserved Characters</h3>
      <p>These characters never require escaping and should always be represented literally:</p>
      <ul>
        <li>Uppercase and lowercase letters: <code>A-Z</code>, <code>a-z</code></li>
        <li>Decimal digits: <code>0-9</code></li>
        <li>Four special symbols: <code>-</code> (hyphen), <code>_</code> (underscore), <code>.</code> (period), and <code>~</code> (tilde)</li>
      </ul>

      <h3>2. Reserved Characters</h3>
      <p>These characters have structural meaning in URIs and must be percent-encoded if they are used as raw data inside a query parameter:</p>
      <ul>
        <li><code>:</code>, <code>/</code>, <code>?</code>, <code>#</code>, <code>[</code>, <code>]</code>, <code>@</code> (General delimiters)</li>
        <li><code>!</code>, <code>$</code>, <code>&amp;</code>, <code>'</code>, <code>(</code>, <code>)</code>, <code>*</code>, <code>+</code>, <code>,</code>, <code>;</code>, <code>=</code> (Sub-delimiters)</li>
      </ul>

      <h2>How Percent-Encoding Operates</h2>
      <p>When an unsafe character is encoded, its binary byte value in UTF-8 is converted to a two-digit uppercase hexadecimal number preceded by a percent sign (<code>%</code>):</p>
      <ul>
        <li>A space (ASCII 32) becomes <code>%20</code>.</li>
        <li>An ampersand <code>&amp;</code> (ASCII 38) becomes <code>%26</code>.</li>
        <li>An equals sign <code>=</code> (ASCII 61) becomes <code>%3D</code>.</li>
        <li>A question mark <code>?</code> (ASCII 63) becomes <code>%3F</code>.</li>
      </ul>

      <h2>The Danger of Double-Encoding</h2>
      <p>Double encoding occurs when an already encoded string is mistakenly passed through an encoder a second time. Because the percent symbol (<code>%</code>) is itself encoded as <code>%25</code>, the sequence <code>%20</code> transforms into <code>%2520</code>. When decoded once by the server, the application receives <code>%20</code> instead of the intended space character, leading to subtle database bugs, broken search queries, and 404 errors.</p>
    </GuideArticle>
  );
}
