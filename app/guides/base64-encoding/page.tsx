import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';

export const metadata: Metadata = {
  title: 'Base64 Encoding and Decoding Explained: Architecture & Use Cases',
  description: 'Deep dive into Base64 encoding. Understand bitwise conversions, padding rules, URL-safe variants, Unicode handling, and why Base64 is not encryption.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="base64-encoding"
      title="Base64 Encoding and Decoding Explained"
      description="Understand how Base64 transforms binary data into printable ASCII text, how the mathematics work, and when to use URL-safe variants."
    >
      <h2>What is Base64 Encoding?</h2>
      <p>Base64 is a binary-to-text encoding algorithm designed to translate raw binary data into a set of 64 printable ASCII characters. Standardized under RFC 4648, Base64 ensures that arbitrary binary streams (such as image files, cryptographic keys, or compiled binaries) can be transmitted over text-oriented protocols without data corruption.</p>

      <h2>The Mathematics of Base64: How the Transformation Works</h2>
      <p>Computers represent data in bytes, where each byte consists of 8 bits. In Base64 encoding:</p>
      <ol>
        <li>Three 8-bit bytes are grouped together, creating a block of <strong>24 bits</strong> (<code>3 &times; 8 = 24</code>).</li>
        <li>This 24-bit block is sliced into four 6-bit chunks (<code>4 &times; 6 = 24</code>).</li>
        <li>Each 6-bit chunk has a numeric value ranging from <code>0</code> (binary <code>000000</code>) to <code>63</code> (binary <code>111111</code>).</li>
        <li>Each integer index maps to an ASCII character defined by the standard 64-character alphabet:
          <ul>
            <li><code>0&ndash;25</code>: <code>A&ndash;Z</code></li>
            <li><code>26&ndash;51</code>: <code>a&ndash;z</code></li>
            <li><code>52&ndash;61</code>: <code>0&ndash;9</code></li>
            <li><code>62</code>: <code>+</code></li>
            <li><code>63</code>: <code>/</code></li>
          </ul>
        </li>
      </ol>

      <h2>Understanding Padding with Equals Signs (<code>=</code>)</h2>
      <p>Because the algorithm processes inputs in 3-byte blocks, what happens when your data length is not divisible by 3?</p>
      <ul>
        <li>If <strong>1 byte</strong> remains at the end (8 bits), it is padded with four zero bits to make two 6-bit characters, followed by two <code>==</code> padding characters.</li>
        <li>If <strong>2 bytes</strong> remain (16 bits), they are padded with two zero bits to make three 6-bit characters, followed by a single <code>=</code> padding character.</li>
        <li>If the input length is an exact multiple of 3 bytes, no <code>=</code> padding is appended.</li>
      </ul>

      <h2>Standard Base64 vs. URL-Safe Base64</h2>
      <p>In standard Base64, the characters <code>+</code> and <code>/</code> are used for indices 62 and 63. However, in URLs, <code>+</code> is often parsed as a space, and <code>/</code> acts as a directory path separator. In filenames, <code>/</code> is forbidden.</p>
      <p>To solve this, <strong>URL-Safe Base64 (RFC 4648 &sect; 5)</strong> modifies the alphabet:</p>
      <ul>
        <li>Replaces <code>+</code> with hyphen (<code>-</code>).</li>
        <li>Replaces <code>/</code> with underscore (<code>_</code>).</li>
        <li>Frequently omits trailing <code>=</code> padding characters (unpadded Base64URL), as used in JSON Web Tokens (JWT).</li>
      </ul>

      <h2>Crucial Reminder: Encoding vs. Encryption</h2>
      <p>Base64 contains <strong>no key, secret, or cryptographic protection</strong>. It is purely an encoding mechanism designed for data transport, not confidentiality. Anyone who can inspect a Base64 string can decode it instantly. Always use proven encryption standards (such as AES-GCM or ChaCha20) when securing sensitive data.</p>
    <h2>Frequently Asked Questions About Base64</h2>
      <h3>Why does Base64 increase data size by ~33%?</h3>
      <p>Standard binary files store data in 8-bit bytes (values from 0 to 255). Base64 restricts itself to 64 safe ASCII characters, meaning each character only carries 6 bits of informational entropy (<code>2^6 = 64</code>). To transmit 24 bits of data, you need 3 standard 8-bit bytes, but you need 4 Base64 characters (<code>4 x 6 = 24 bits</code>). The ratio of 4 characters to 3 bytes results in an exact 33.33% payload expansion.</p>

      <h3>What happens if I try to decode corrupted Base64?</h3>
      <p>If characters outside the 64-character alphabet appear (excluding whitespace and padding), or if the total character length is not a multiple of 4, standard decoders throw an exception. If the decoded binary represents compressed data or UTF-8 text, any flipped bit will cause either a character decoding failure or a corrupted unreadable file.</p>

      <h3>How are data URLs used with Base64 in web development?</h3>
      <p>Data URLs allow small assets (such as SVGs, PNG icons, or web fonts) to be embedded directly inside HTML or CSS files without triggering separate HTTP requests: <code>background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAE...")</code>. While convenient for reducing request counts in legacy HTTP/1.1 environments, inline Base64 eliminates browser caching advantages and inflates file transfer size, so modern HTTP/2 and HTTP/3 workflows generally prefer separate static asset caching.</p>

      <h2>Base64 vs. Other Binary-to-Text Encodings</h2>
      <table className="w-full text-left border-collapse my-4">
        <thead>
          <tr className="border-b">
            <th className="py-2">Encoding</th>
            <th className="py-2">Alphabet Size</th>
            <th className="py-2">Overhead</th>
            <th className="py-2">Primary Domain</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2"><strong>Base16 (Hex)</strong></td>
            <td className="py-2">16 (0-9, a-f)</td>
            <td className="py-2">100% (2x size)</td>
            <td className="py-2">Cryptographic hashes, color codes, memory dumps.</td>
          </tr>
          <tr className="border-b">
            <td className="py-2"><strong>Base32</strong></td>
            <td className="py-2">32 (A-Z, 2-7)</td>
            <td className="py-2">60%</td>
            <td className="py-2">TOTP two-factor auth seeds (case-insensitive for human typing).</td>
          </tr>
          <tr className="border-b">
            <td className="py-2"><strong>Base64</strong></td>
            <td className="py-2">64</td>
            <td className="py-2">33.3%</td>
            <td className="py-2">MIME email, data URLs, JWT tokens, API payloads.</td>
          </tr>
          <tr className="border-b">
            <td className="py-2"><strong>Base85 (Ascii85)</strong></td>
            <td className="py-2">85</td>
            <td className="py-2">25%</td>
            <td className="py-2">PostScript, PDF file embedding, Git binary patches.</td>
          </tr>
        </tbody>
      </table>
    </GuideArticle>
  );
}
