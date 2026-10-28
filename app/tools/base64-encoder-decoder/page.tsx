import { toolMetadata } from '@/lib/tool-seo';
import type { Metadata } from 'next';
import ToolShell from '@/components/ToolShell';
import { Base64Tool } from '@/components/Tools';

export const metadata: Metadata = toolMetadata('base64-encoder-decoder');

export default function Page() {
  return (
    <ToolShell
      slug="base64-encoder-decoder"
      title="Base64 Encoder & Decoder"
      description="Convert plain text to Base64 format and decode Base64 strings to UTF-8 text. Includes full Unicode and emoji compatibility."
    >
      <Base64Tool />
      <section className="article mt-12">
        <h2>How to encode or decode Base64 online</h2>
        <ol>
          <li>Paste plain text into the input field to encode it, or paste a Base64 string to decode it.</li>
          <li>Select <strong>Encode to Base64</strong> or <strong>Decode Base64</strong>.</li>
          <li>Copy the result or download it as a text file. Use Reset to clear the input and result.</li>
        </ol>
        <p>This tool handles text, including UTF-8 characters from different languages and emoji. It does not convert images or PDFs into downloadable binary files. The transformation runs in your browser and does not require an account.</p>

        <h2>Base64 examples you can try</h2>
        <div className="overflow-x-auto" role="region" aria-label="Base64 examples" tabIndex={0}>
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Plain text and its UTF-8 Base64 encoding</caption>
            <thead><tr><th scope="col" className="border p-3">Plain text</th><th scope="col" className="border p-3">Base64</th></tr></thead>
            <tbody>
              <tr><td className="border p-3">Hello</td><td className="border p-3"><code>SGVsbG8=</code></td></tr>
              <tr><td className="border p-3">Hello World</td><td className="border p-3"><code>SGVsbG8gV29ybGQ=</code></td></tr>
              <tr><td className="border p-3">café</td><td className="border p-3"><code>Y2Fmw6k=</code></td></tr>
              <tr><td className="border p-3">{'{"ok":true}'}</td><td className="border p-3"><code>eyJvayI6dHJ1ZX0=</code></td></tr>
            </tbody>
          </table>
        </div>
        <p>Spaces and line breaks are part of the original text. Encoding <code>Hello</code> with a trailing newline produces <code>SGVsbG8K</code>, so an unexpected difference can come from an invisible character.</p>

        <h2>What Is Base64 Encoding?</h2>
        <p>Base64 is a binary-to-text encoding scheme that translates raw bytes into a sequence of 64 printable ASCII characters (<code>A-Z</code>, <code>a-z</code>, <code>0-9</code>, <code>+</code>, and <code>/</code>, with <code>=</code> reserved for padding). It is standardized by RFC 4648.</p>
        <p>Base64 was engineered to transmit binary assets across communication channels that only reliably transport textual ASCII data—such as email (via MIME protocol), inline web fonts, data URIs in CSS, and JSON-based API payloads.</p>

        <h2>How Base64 Works Internally</h2>
        <p>Every group of 3 input bytes (24 bits) is partitioned into 4 groups of 6 bits each. Each 6-bit chunk maps to a decimal value from 0 to 63, which corresponds directly to a character in the Base64 alphabet table. Because 3 bytes become 4 characters, Base64 encoding introduces an approximate <strong>33% increase in data size</strong>.</p>

        <h2>Proper Unicode (UTF-8) Handling</h2>
        <p>JavaScript's <code>btoa()</code> expects a string representing bytes and rejects characters whose values exceed 255. This tool first converts text to UTF-8 bytes with <code>TextEncoder</code>. When decoding, it uses <code>TextDecoder</code> in strict mode to report bytes that are not valid UTF-8 instead of displaying replacement characters.</p>

        <h2>Important Security Note: Encoding is Not Encryption</h2>
        <p>Base64 provides <strong>zero cryptographic confidentiality</strong>. It requires no secret key, password, or cipher to decode; anyone with access to the encoded string can reconstruct the original content within milliseconds. Never use Base64 to conceal passwords, API secrets, or personally identifiable information (PII).</p>

        <h2>Why does Base64 decoding fail?</h2>
        <ul>
          <li><strong>Incomplete input:</strong> copy the entire value, including any trailing <code>=</code> padding supplied by the source.</li>
          <li><strong>A data URL prefix:</strong> this text decoder expects only the encoded part, not a prefix such as <code>data:text/plain;base64,</code>.</li>
          <li><strong>A different alphabet:</strong> Base64url uses <code>-</code> and <code>_</code> instead of <code>+</code> and <code>/</code>. This tool expects standard Base64. Use the JWT Decoder for a complete JSON Web Token.</li>
          <li><strong>Binary content:</strong> valid Base64 can represent an image, archive, or other non-text data. Such bytes may fail the UTF-8 check.</li>
        </ul>

        <h2>Frequently asked questions</h2>
        <h3>Can I decode Base64 containing another language?</h3>
        <p>Yes, if the original bytes use UTF-8. Arabic, Chinese, accented Latin text, and emoji can all be encoded and decoded. Text stored in another encoding, such as Windows-1252, needs a decoder configured for that encoding.</p>
        <h3>Is Base64 the same as a hash?</h3>
        <p>No. Base64 preserves the original bytes in a reversible representation. A cryptographic hash such as SHA-256 produces a fixed-size fingerprint and cannot be decoded back into the original input.</p>
        <h3>Why does Base64 end with an equals sign?</h3>
        <p>Standard padded Base64 uses one or two <code>=</code> characters when the final input group contains fewer than three bytes. Some protocols omit padding; follow the requirements of the system receiving your value.</p>
        <p>Reference: <a href="https://www.rfc-editor.org/rfc/rfc4648">RFC 4648, Base64 and Base64url encoding</a>.</p>
      </section>
    </ToolShell>
  );
}
