import type { Metadata } from 'next';
import ToolShell from '@/components/ToolShell';
import { Base64Tool } from '@/components/Tools';

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder Online — UTF-8 Supported',
  description: 'Encode text to Base64 or decode Base64 strings back to readable UTF-8 text online. Fast, secure, and client-side processing with Unicode support.',
};

export default function Page() {
  return (
    <ToolShell
      slug="base64-encoder-decoder"
      title="Base64 Encoder & Decoder"
      description="Convert plain text to Base64 format and decode Base64 strings to UTF-8 text. Includes full Unicode and emoji compatibility."
    >
      <Base64Tool />
      <section className="article mt-12">
        <h2>What Is Base64 Encoding?</h2>
        <p>Base64 is a binary-to-text encoding scheme that translates raw bytes into a sequence of 64 printable ASCII characters (<code>A-Z</code>, <code>a-z</code>, <code>0-9</code>, <code>+</code>, and <code>/</code>, with <code>=</code> reserved for padding). It is standardized by RFC 4648.</p>
        <p>Base64 was engineered to transmit binary assets across communication channels that only reliably transport textual ASCII data—such as email (via MIME protocol), inline web fonts, data URIs in CSS, and JSON-based API payloads.</p>

        <h2>How Base64 Works Internally</h2>
        <p>Every group of 3 input bytes (24 bits) is partitioned into 4 groups of 6 bits each. Each 6-bit chunk maps to a decimal value from 0 to 63, which corresponds directly to a character in the Base64 alphabet table. Because 3 bytes become 4 characters, Base64 encoding introduces an approximate <strong>33% increase in data size</strong>.</p>

        <h2>Proper Unicode (UTF-8) Handling</h2>
        <p>Many legacy web tools rely on JavaScript's native <code>btoa()</code> and <code>atob()</code> functions, which historically crash with a <code>Character Out of Range</code> exception when encountering non-ASCII characters or emojis. Our tool utilizes the modern <code>TextEncoder</code> and <code>TextDecoder</code> APIs, ensuring full compatibility with international alphabets, symbols, and emoji sets.</p>

        <h2>Important Security Note: Encoding is Not Encryption</h2>
        <p>Base64 provides <strong>zero cryptographic confidentiality</strong>. It requires no secret key, password, or cipher to decode; anyone with access to the encoded string can reconstruct the original content within milliseconds. Never use Base64 to conceal passwords, API secrets, or personally identifiable information (PII).</p>
      </section>
    </ToolShell>
  );
}
