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
    </GuideArticle>
  );
}
