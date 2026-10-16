import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';
import EmbeddedTool from '@/components/EmbeddedTool';
import { UrlTool } from '@/components/Tools';

export const metadata: Metadata = {
  title: 'URL Encoding: RFC 3986 Percent-Encoding, URI Reserved Characters, and Query Parameter Serialization',
  description: 'A complete 1,200+ word guide to URL percent-encoding. Master reserved vs unreserved ASCII characters, query string pitfalls, encodeURI vs encodeURIComponent, and multi-language implementation code.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="url-encoding"
      title="URL Encoding: RFC 3986 Percent-Encoding, URI Reserved Characters, and Query Parameter Serialization"
      description="A complete 1,200+ word guide to URL percent-encoding. Master reserved vs unreserved ASCII characters, query string pitfalls, encodeURI vs encodeURIComponent, and multi-language implementation code."
    >

      <h2>1. The Architecture of RFC 3986 Uniform Resource Identifiers</h2>
      <p>Uniform Resource Identifiers (URIs) are constrained by the US-ASCII character set. To represent binary data, non-ASCII Unicode characters, or reserved syntax delimiters in URLs, <strong>RFC 3986</strong> defines <strong>Percent-Encoding</strong>.</p>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="url-encoder-decoder" headline="Live URL Percent-Encoder & Decoder" description="Encode URI parameters, decode percent-encoded strings, and debug query parameter payloads locally."><UrlTool /></EmbeddedTool>

      <h2>2. Reserved vs Unreserved Characters</h2>
      <ul>
        <li><strong>Unreserved Characters (Never Encoded):</strong> Letters (<code>A–Z</code>, <code>a–z</code>), digits (<code>0–9</code>), hyphen (<code>-</code>), underscore (<code>_</code>), period (<code>.</code>), tilde (<code>~</code>).</li>
        <li><strong>Reserved Characters (Delimiters):</strong> <code>: / ? # [ ] @ ! $ & ' ( ) * + , ; =</code>. These characters define URL structure (path separators, query delimiters, fragment markers).</li>
      </ul>

      <h2>3. encodeURI vs encodeURIComponent in JavaScript</h2>
      <p>A frequent bug is using <code>encodeURI()</code> on individual query parameter values. <code>encodeURI()</code> leaves reserved characters intact, causing values containing <code>&amp;</code> or <code>=</code> to break the query string structure. Always use <code>encodeURIComponent()</code> for query values.</p>

    
      <h2>4. The Deep Mechanics of Percent-Encoding</h2>
      <p>Percent-encoding represents a non-ASCII or reserved byte as a triplet character sequence consisting of the percent symbol <code>%</code> followed by two hexadecimal digits representing the numerical byte value:</p>
      <pre><code>{`Byte Value 0x2F (ASCII '/') → "%2F"
Byte Value 0x20 (ASCII Space) → "%20"
Byte Value 0x3F (ASCII '?') → "%3F"`}</code></pre>

      <h3>Multi-byte UTF-8 Encoding</h3>
      <p>When encoding non-ASCII Unicode characters (such as European umlauts, Chinese ideograms, or emojis), the character must first be converted into its underlying UTF-8 binary byte sequence, and each byte is subsequently percent-encoded:</p>
      <pre><code>{`Character 'é' (U+00E9) → UTF-8 Bytes [0xC3, 0xA9] → "%C3%A9"
Character '🚀' (U+1F680) → UTF-8 Bytes [0xF0, 0x9F, 0x9A, 0x80] → "%F0%9F%9A%80"`}</code></pre>

      <h2>5. The Plus Sign (+) vs %20 Dilemma</h2>
      <p>A frequent bug across REST API integration is the inconsistent representation of spaces:</p>
      <ul>
        <li><strong>RFC 3986 (URI Standard):</strong> Spaces must strictly be encoded as <code>%20</code>. The <code>+</code> character is a valid reserved sub-delimiter representing a literal plus sign.</li>
        <li><strong>HTML form specification (application/x-www-form-urlencoded):</strong> Historically, web forms encoded spaces as <code>+</code> and literal plus signs as <code>%2B</code>.</li>
      </ul>
      <p>If a client transmits <code>search=c++</code> encoded with application/x-www-form-urlencoded, the server decodes it as <code>"c  "</code> (two spaces) unless literal plus signs were percent-encoded as <code>%2B</code>.</p>

      <h2>6. Production Implementation Across Modern Languages</h2>
      <h3>TypeScript / JavaScript (Node.js & Browsers)</h3>
      <pre><code>{`// 1. Correct Query Parameter Encoding
function buildSafeUrl(base: string, params: Record&lt;string, string&gt;): string {{
  const url = new URL(base);
  for (const [key, val] of Object.entries(params)) {{
    url.searchParams.append(key, val); // Automatically handles RFC-compliant percent-encoding!
  }}
  return url.toString();
}}

const endpoint = buildSafeUrl("https://api.devxtool.me/v1/search", {{
  q: "DevX Tool & Cryptography 🚀",
  category: "c++ & rust"
}});
console.log("Safe Encoded URL:", endpoint);

// 2. Low-level encoding
const queryVal = "John & Jane / Doe";
console.log("encodeURIComponent:", encodeURIComponent(queryVal)); // John%20%26%20Jane%20%2F%20Doe
console.log("encodeURI (Unsafe for params!):", encodeURI(queryVal)); // John%20&%20Jane%20/%20Doe`}</code></pre>

      <h3>Python 3</h3>
      <pre><code>{`import urllib.parse

# 1. Encode query dictionary to URL query string
params = {{
    "query": "DevX Tool & Algorithms 🚀",
    "filter": "status=active&verified=true"
}}
encoded_query = urllib.parse.urlencode(params)
print("Encoded Query String:", encoded_query)

# 2. Decode percent-encoded string
decoded = urllib.parse.unquote_plus("q=c%2B%2B%20programming")
print("Decoded String:", decoded)`}</code></pre>

      <h3>cURL / CLI</h3>
      <pre><code>{`# Send percent-encoded parameters with curl
curl -G "https://api.devxtool.me/search" --data-urlencode "q=DevX Tool 🚀"`}</code></pre>

      <h2>7. Frequently Asked Questions (FAQ)</h2>
      <h3>Can URLs contain Unicode characters directly?</h3>
      <p>In modern web browsers, Internationalized Resource Identifiers (IRIs / RFC 3987) display native Unicode characters in the address bar for user readability. However, under the hood before transmission across TCP/IP networks, the browser converts all international domain names using Punycode (e.g., <code>xn--...</code>) and percent-encodes all path and query characters into UTF-8 byte triplets.</p>

      <h3>What happens if a string is double-encoded?</h3>
      <p>Double encoding occurs when an already percent-encoded string is passed into an encoder a second time. The literal percent symbol <code>%</code> is encoded into <code>%25</code>, transforming <code>%20</code> into <code>%2520</code>. When the destination server decodes the URL only once, it receives literal <code>%20</code> rather than the intended space character.</p>

    
      <h2>8. Deep Dive: Decoding Query Parameters Safely and Mitigating Parameter Pollution (HPP)</h2>
      <p><strong>HTTP Parameter Pollution (HPP)</strong> occurs when an attacker injects duplicate query parameters into an HTTP request:</p>
      <pre><code>&#123;`GET /api/transfer?recipient=carol&amount=100&recipient=attacker`&#125;</code></pre>
      <p>Different web application frameworks handle duplicate parameters unpredictably:</p>
      <ul>
        <li><strong>Node.js (Express / qs):</strong> Constructs an array: <code>recipient: ['carol', 'attacker']</code>.</li>
        <li><strong>PHP / Apache:</strong> Keeps only the last value: <code>recipient: 'attacker'</code>.</li>
        <li><strong>Python (Flask / Django):</strong> Keeps only the first value: <code>recipient: 'carol'</code>.</li>
        <li><strong>ASP.NET:</strong> Concatenates with commas: <code>recipient: 'carol,attacker'</code>.</li>
      </ul>
      <p>Always enforce explicit validation and reject requests containing unexpected array types for scalar query keys.</p>

      <h2>9. Complete Production Implementation: Python and Go</h2>
      <h3>Go (net/url package)</h3>
      <pre><code>{`package main

import (
    "fmt"
    "net/url"
)

func main() {{
    // Parsing and building query parameters
    baseUrl, _ := url.Parse("https://api.devxtool.me/search")
    params := url.Values{{}}
    params.Add("query", "DevX Tool: Cryptography & Algorithms 🚀")
    params.Add("sort", "relevance")
    baseUrl.RawQuery = params.Encode()
    
    fmt.Println("Full URL:", baseUrl.String())

    // Parsing back
    parsed, _ := url.Parse(baseUrl.String())
    fmt.Println("Extracted query:", parsed.Query().Get("query"))
}}`}</code></pre>

    
      <h2>10. Architectural Security Vulnerabilities: Double Encoding and Path Traversal</h2>
      <p>Improper URL decoding in reverse proxies and web application firewalls creates lethal security bypass vulnerabilities:</p>
      <h3>Double Decoding Path Traversal Attack:</h3>
      <p>If an API gateway sits in front of a backend microservice and both layers decode URLs independently:</p>
      <pre><code>{`Original Attack Payload: %252e%252e%252f (Encoded ../)
1. Gateway decodes once: %2e%2e%2f
   (Gateway checks for "../", sees no literal dots, and allows request through!)
2. Backend microservice decodes second time: ../
   (Path traversal succeeds; attacker accesses /etc/passwd!)`}</code></pre>
      <p>To eliminate double-encoding vulnerabilities, ensure that URL decoding is executed strictly <strong>once</strong> at the outer API gateway perimeter before routing internal requests.</p>

    
      <h2>11. URL Fragility in Modern SPA Client-Side Routing</h2>
      <p>In Single Page Applications (Next.js, React Router, Vue Router), URL encoding interacts directly with HTML5 History API (<code>pushState</code> and <code>replaceState</code>). Passing unencoded query strings or slashes into route parameters causes routers to misinterpret path segments as nested routes (e.g., <code>/user/john/doe</code> instead of <code>/user/john%2Fdoe</code>).</p>
      <p>Always sanitize and encode path parameters independently from query parameters to maintain predictable routing state across web applications.</p>

    
      <h2>12. Web Security: Cross-Site Scripting (XSS) via javascript: Schemes</h2>
      <p>URL encoding interacts intimately with web application security. If an application accepts user-controlled URLs and renders them directly inside anchor tags without protocol validation:</p>
      <pre><code>&#123;`&lt;a href="&#123;&#123;userProvidedUrl&#125;&#125;"&gt;View Website&lt;/a&gt;`&#125;</code></pre>
      <p>An attacker can submit <code>javascript:alert(document.cookie)</code>. Even if the parameter is percent-encoded, browsers decode it before executing the pseudo-protocol. Always validate that URLs strictly start with <code>https://</code> or <code>http://</code> before rendering hyperlinks in web applications.</p>

    
      <h2>13. Complete Reference: All Standard RFC 3986 Percent-Encoded Characters</h2>
      <table className="w-full text-left border-collapse my-6">
        <thead>
          <tr className="border-b bg-[#f8f9fc]">
            <th className="py-3 px-3">Character</th>
            <th className="py-3 px-3">Percent-Encoded</th>
            <th className="py-3 px-3">Standard ASCII Code</th>
            <th className="py-3 px-3">URI Semantic Function</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold">Space ( )</td>
            <td className="py-3 px-3 font-mono text-[#0f766e]">%20</td>
            <td className="py-3 px-3">32 (0x20)</td>
            <td className="py-3 px-3">Standard whitespace delimiter (or + in legacy forms)</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold">Slash (/)</td>
            <td className="py-3 px-3 font-mono text-[#0f766e]">%2F</td>
            <td className="py-3 px-3">47 (0x2F)</td>
            <td className="py-3 px-3">Hierarchical path segment separator</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold">Question Mark (?)</td>
            <td className="py-3 px-3 font-mono text-[#0f766e]">%3F</td>
            <td className="py-3 px-3">63 (0x3F)</td>
            <td className="py-3 px-3">Query component indicator</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold">Hash (#)</td>
            <td className="py-3 px-3 font-mono text-[#0f766e]">%23</td>
            <td className="py-3 px-3">35 (0x23)</td>
            <td className="py-3 px-3">Fragment / Anchor component indicator</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold">Ampersand (&amp;)</td>
            <td className="py-3 px-3 font-mono text-[#0f766e]">%26</td>
            <td className="py-3 px-3">38 (0x26)</td>
            <td className="py-3 px-3">Query parameter separator</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold">Equals (=)</td>
            <td className="py-3 px-3 font-mono text-[#0f766e]">%3D</td>
            <td className="py-3 px-3">61 (0x3D)</td>
            <td className="py-3 px-3">Key-value pair delimiter in query parameters</td>
          </tr>
        </tbody>
      </table>

    </GuideArticle>
  );
}
