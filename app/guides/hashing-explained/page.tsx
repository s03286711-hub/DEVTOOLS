import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';

export const metadata: Metadata = {
  title: 'Hash Functions Explained: SHA-256, SHA-1 and Beyond',
  description: 'Understand cryptographic hash functions, the SHA-2 family, collision resistance, rainbow tables, and why password storage demands specialized algorithms.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="hashing-explained"
      title="Hash Functions Explained: SHA-256, SHA-1 and Beyond"
      description="Understand cryptographic hash functions, the SHA-2 family, collision resistance, rainbow tables, and why password storage demands specialized algorithms."
    >
      <h2>What Is a Cryptographic Hash Function?</h2>
<p>A cryptographic hash function takes an arbitrary-length message and processes it into a fixed-length string of bits (a digest). Hash functions serve as the digital fingerprint of data in modern computer science, forming the foundational bedrock for digital signatures, message authentication codes (HMAC), Git commit trees, and cryptographic blockchains.</p>

<h2>Key Properties of Secure Hash Functions</h2>
<ol>
  <li><strong>Deterministic:</strong> Feeding the exact same message will always yield the exact same digest.</li>
  <li><strong>Pre-image Resistance (One-Way):</strong> Given a digest <code>H</code>, it should be computationally infeasible to find an input <code>m</code> such that <code>hash(m) = H</code>.</li>
  <li><strong>Second Pre-image Resistance:</strong> Given an input <code>m1</code>, it is infeasible to find a distinct input <code>m2</code> such that <code>hash(m1) = hash(m2)</code>.</li>
  <li><strong>Collision Resistance:</strong> It must be infeasible to locate any two arbitrary inputs that map to the identical digest.</li>
  <li><strong>Avalanche Effect:</strong> Changing even a single bit in the input message completely changes the resulting hash output (typically flipping ~50% of digest bits).</li>
</ol>

<h2>The Evolution of the SHA Family</h2>
<p>The Secure Hash Algorithms are a family of cryptographic hash functions published by the National Institute of Standards and Technology (NIST):</p>
<ul>
  <li><strong>SHA-1 (160-bit):</strong> Published in 1995. In 2017, researchers at CWI Amsterdam and Google announced the SHAttered attack, demonstrating practical collision generation. SHA-1 is deprecated for all cryptographic signing.</li>
  <li><strong>SHA-2 Family (224, 256, 384, 512 bits):</strong> Published in 2001. SHA-256 and SHA-512 remain unbroken and are universally trusted across TLS certificates, HTTPS encryption, Bitcoin mining, and secure code signing.</li>
  <li><strong>SHA-3 (Keccak):</strong> Released in 2015 based on the sponge construction. SHA-3 provides an alternative cryptographic internal structure completely different from the Merkle-Damg&aring;rd construction used by SHA-2.</li>
</ul>

<h2>Why Plain Hashes Fail for Password Storage</h2>
<p>A frequent beginner security flaw is hashing user passwords with fast algorithms like MD5 or SHA-256. Modern consumer graphics cards (GPUs) can compute hundreds of billions of SHA-256 hashes per second. Using precomputed rainbow tables or dictionary attacks, attackers can crack leaked SHA-256 passwords in seconds.</p>
<p>To safely hash passwords, modern engineering standards mandate <em>adaptive, memory-hard key derivation functions</em>:</p>
<ul>
  <li><strong>Argon2id:</strong> Winner of the Password Hashing Competition; the current gold standard recommended by OWASP.</li>
  <li><strong>bcrypt:</strong> Battle-tested, built-in blowfish-based algorithm with adjustable work factors.</li>
  <li><strong>PBKDF2:</strong> NIST-standardized key derivation function using repeated iterations with salt.</li>
</ul>
    </GuideArticle>
  );
}
