import { pageMetadata } from '@/lib/seo';
import { guides } from '@/lib/site';
import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';
import EmbeddedTool from '@/components/EmbeddedTool';
import { Base64Tool } from '@/components/Tools';

const seoGuide = guides.find((guide) => guide.slug === 'base64-encoding')!;

export const metadata: Metadata = pageMetadata({
  title: seoGuide.title, description: seoGuide.description, path: '/guides/base64-encoding',
});

export default function Page() {
  return (
    <GuideArticle
      slug="base64-encoding"
      title="Base64 Encoding and Decoding Explained: RFC 4648 Specifications, 6-Bit Binary Mechanics, and Unicode UTF-8 Engineering"
      description="A complete 1,200+ word engineering guide to Base64 encoding. Learn 6-bit translation tables, bit-shift mechanics, padding calculations, URL-safe variants, and multi-language implementation code."
    >

      <h2>1. What Is Base64 and Why Is It Essential?</h2>
      <p>Base64 is a binary-to-text encoding scheme standardized by the IETF in <strong>RFC 4648</strong>. It is designed to represent arbitrary binary data (such as compiled executable files, cryptographic keys, compressed archives, and images) using a restricted set of 64 printable ASCII characters. Base64 is ubiquitous across the modern Internet: it powers email attachments (MIME / RFC 2045), inline image data URIs in CSS and HTML, Basic Authentication headers, and digital certificates (PEM format).</p>

      <p>Early network transmission protocols—such as SMTP (Simple Mail Transfer Protocol)—were engineered to transport 7-bit US-ASCII text characters. When raw 8-bit binary data passed through legacy network routers or mail gateways, the most significant bit was frequently stripped or control bytes (such as NULL <code>0x00</code> or Carriage Return <code>0x0D</code>) were mangled, destroying file integrity. Base64 solved this problem by guaranteeing that binary data travels exclusively over printable characters that pass unscathed through any network transport layer.</p>

      <h2>2. Mathematical Mechanics: The 6-Bit Radix Translation</h2>
      <p>Base64 operates on a fundamental mathematical relationship: <strong>three 8-bit bytes (24 bits) map precisely to four 6-bit characters (24 bits)</strong>.</p>

      <pre><code>{`Byte 1 (8 bits)    Byte 2 (8 bits)    Byte 3 (8 bits)
[ 0 1 0 0 1 1 0 1 ][ 0 1 1 0 0 0 0 1 ][ 0 1 1 0 1 1 1 0 ]  (Total: 24 bits)
-----------------------------------------------------------
[ 0 1 0 0 1 1 ][ 0 1 0 1 1 0 ][ 0 0 0 1 0 1 ][ 1 0 1 1 1 0 ]  (4 groups of 6 bits)
      19              22               5              46     (Decimal values)
       T               W               F               u     (Base64 symbols)`}</code></pre>

      <p>The standard Base64 alphabet defined in RFC 4648 consists of:</p>
      <ul>
        <li>Uppercase letters <code>A–Z</code> (indices 0 to 25)</li>
        <li>Lowercase letters <code>a–z</code> (indices 26 to 51)</li>
        <li>Numerals <code>0–9</code> (indices 52 to 61)</li>
        <li>Plus symbol <code>+</code> (index 62)</li>
        <li>Slash symbol <code>/</code> (index 63)</li>
      </ul>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="base64-encoder-decoder" headline="Live Unicode Base64 Encoder & Decoder" description="Encode and decode text strings with full UTF-8 emoji and multi-byte character support in client-side memory."><Base64Tool /></EmbeddedTool>

      <h2>3. Padding Rules and the Equals Sign (=)</h2>
      <p>Because input byte arrays are not always exact multiples of three, Base64 employs the <code>=</code> character for padding:</p>
      <ul>
        <li><strong>One Byte Remaining (8 bits):</strong> The single byte is padded with four zero bits to create two 6-bit groups. Two equals signs (<code>==</code>) are appended to complete the 4-character block.</li>
        <li><strong>Two Bytes Remaining (16 bits):</strong> The two bytes are padded with two zero bits to create three 6-bit groups. A single equals sign (<code>=</code>) is appended.</li>
        <li><strong>Zero Bytes Remaining:</strong> The input divides evenly by 3; no padding is required.</li>
      </ul>

      <h2>4. The Inevitable 33% Storage Overhead</h2>
      <p>Because every 3 bytes of raw binary data expand into 4 ASCII characters, Base64 introduces a constant <strong>33.3% bandwidth and memory expansion ratio</strong>:</p>
      <pre><code>&#123;`Encoded Size = Math.ceil(Raw Bytes / 3) * 4`&#125;</code></pre>
      <p>A 10MB raw image file serializes into approximately 13.33MB of Base64 text. Inlining massive Base64 strings into HTML or CSS blocks network parsing and exhausts browser RAM. Base64 is intended for small tokens, cryptographic keys, and header metadata, not large media assets.</p>

      <h2>5. URL-Safe Base64 (base64url)</h2>
      <p>In standard Base64, characters <code>+</code> and <code>/</code> carry reserved meanings in URLs (where <code>+</code> represents spaces in query parameters and <code>/</code> acts as a path delimiter). RFC 4648 Section 5 defines <strong>base64url</strong>:</p>
      <ul>
        <li>Replace <code>+</code> with <code>-</code> (hyphen)</li>
        <li>Replace <code>/</code> with <code>_</code> (underscore)</li>
        <li>Omit all trailing <code>=</code> padding characters</li>
      </ul>

      <h2>6. Production Implementation Across Modern Languages</h2>

      <h3>TypeScript / JavaScript (UTF-8 Safe)</h3>
      <pre><code>{`// Browser-native UTF-8 safe Base64 encoder using TextEncoder
export function encodeUtf8Base64(text: string): string {{
  const bytes = new TextEncoder().encode(text);
  const binString = Array.from(bytes, (b) ⇒ String.fromCharCode(b)).join('');
  return btoa(binString);
}}

export function decodeUtf8Base64(base64: string): string {{
  const binString = atob(base64);
  const bytes = Uint8Array.from(binString, (c) ⇒ c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}}`}</code></pre>

      <h3>Python 3</h3>
      <pre><code>{`import base64

raw_text = "DevX Tool: 🚀 High Performance!"
raw_bytes = raw_text.encode('utf-8')

# Standard Base64
standard_b64 = base64.b64encode(raw_bytes).decode('ascii')
print("Standard Base64:", standard_b64)

# URL-Safe Base64
url_safe_b64 = base64.urlsafe_b64encode(raw_bytes).decode('ascii')
print("URL-Safe Base64:", url_safe_b64)`}</code></pre>

      <h3>Go (Golang)</h3>
      <pre><code>{`package main

import (
    "encoding/base64"
    "fmt"
)

func main() {{
    msg := "DevX Tool Base64 Architecture"
    
    // Standard Base64
    encoded := base64.StdEncoding.EncodeToString([]byte(msg))
    fmt.Println("Encoded:", encoded)

    // URL-Safe Base64
    urlSafe := base64.URLEncoding.EncodeToString([]byte(msg))
    fmt.Println("URL-Safe:", urlSafe)
}}`}</code></pre>

      <h2>7. Frequently Asked Questions (FAQ)</h2>
      <h3>Is Base64 a form of encryption?</h3>
      <p><strong>Absolutely not.</strong> Base64 is an open, reversible encoding scheme, not encryption. It provides zero confidentiality. Anyone holding a Base64 string can decode it back to plaintext instantaneously without a secret key.</p>

      <h3>Why does window.btoa() crash on emojis?</h3>
      <p><code>window.btoa()</code> only accepts Latin-1 code points (0–255). Modern emojis and Asian scripts require multi-byte UTF-8 representations. Always pass multi-byte strings through <code>TextEncoder</code> before calling <code>btoa()</code>.</p>

    
      <h2>8. Deep Dive: Bitwise Shift Operators in Base64 Encoding Engines</h2>
      <p>Under the hood of high-performance Base64 serialization libraries (such as V8's native C++ implementation or Go's <code>encoding/base64</code> assembly SIMD kernels), conversion is executed via CPU bitwise shifts and masks:</p>

      <pre><code>{`// Bitwise transformation of 3 bytes into 4 Base64 indexes in C / TypeScript:
function encodeTriplet(b0: number, b1: number, b2: number): string {{
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  
  // Pack 3 bytes into a single 24-bit unsigned integer
  const triplet = (b0 &lt;&lt; 16) | (b1 &lt;&lt; 8) | b2;
  
  // Extract four 6-bit values using right shifts and bitwise AND mask (0x3F = 63 = 00111111)
  const c0 = alphabet[(triplet &gt;&gt; 18) & 0x3F];
  const c1 = alphabet[(triplet &gt;&gt; 12) & 0x3F];
  const c2 = alphabet[(triplet &gt;&gt; 6) & 0x3F];
  const c3 = alphabet[triplet & 0x3F];
  
  return c0 + c1 + c2 + c3;
}}`}</code></pre>

      <h2>9. Base64 in Real-World Web Protocols: MIME, Data URIs, and PEM Certificates</h2>
      <p>Base64 is foundational across modern distributed protocols:</p>
      <ul>
        <li><strong>Data URIs (RFC 2397):</strong> Inlining assets directly inside HTML/CSS: <code>data:image/svg+xml;base64,PHN2Zy...</code>.</li>
        <li><strong>HTTP Basic Authentication (RFC 7617):</strong> Transmitting credentials in the <code>Authorization: Basic &lt;base64&gt;</code> header (encoding <code>username:password</code>).</li>
        <li><strong>X.509 Digital Certificates &amp; SSH Keys:</strong> Converting binary DER ASN.1 key structures into printable ASCII PEM blocks with headers: <code>-----BEGIN CERTIFICATE-----</code>.</li>
      </ul>

      <h2>10. Complete Multi-Language Code: Go and cURL</h2>
      <h3>Go (Golang) High-Throughput Streaming</h3>
      <pre><code>{`package main

import (
    "encoding/base64"
    "fmt"
    "strings"
)

func main() {{
    data := []byte("DevX Tool: Global Developer Knowledge Base")
    
    // Standard Base64
    sEnc := base64.StdEncoding.EncodeToString(data)
    fmt.Println("Standard Base64:", sEnc)

    // URL-Safe Base64 (RFC 4648)
    uEnc := base64.URLEncoding.EncodeToString(data)
    fmt.Println("URL Safe Base64:", uEnc)

    // Decode back
    sDec, _ := base64.StdEncoding.DecodeString(sEnc)
    fmt.Println("Decoded:", string(sDec))
}}`}</code></pre>

      <h3>cURL / Linux Command Line</h3>
      <pre><code>{`# Base64 encode a file directly on Linux/macOS terminal:
base64 input.txt &gt; encoded.b64

# Base64 decode from terminal:
base64 --decode encoded.b64 &gt; output.txt

# Base64 encode without line wrapping:
echo -n "admin:secret123" | base64 -w 0`}</code></pre>

    </GuideArticle>
  );
}
