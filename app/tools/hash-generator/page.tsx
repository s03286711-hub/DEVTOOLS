import { toolMetadata } from '@/lib/tool-seo';
import type { Metadata } from 'next';
import ToolShell from '@/components/ToolShell';
import { HashTool } from '@/components/NewTools';

export const metadata: Metadata = toolMetadata('hash-generator');

export default function Page() {
  return (
    <ToolShell
      slug="hash-generator"
      title="SHA Hash Generator"
      description="Generate secure cryptographic message digests for any text string."
    >
      <HashTool />
      <section className="article mt-12">
        <h2>What is a Cryptographic Hash Function?</h2>
<p>A cryptographic hash function is a mathematical algorithm that transforms an arbitrary block of data into a fixed-size string of characters, known as a digest or hash. Modern cryptographic hash functions are deterministic (the same input always produces the identical digest) and one-way (it is computationally infeasible to reverse or reconstruct the original input from the digest alone).</p>

<h2>Supported Hashing Algorithms</h2>
<ul>
  <li><strong>SHA-256 (Secure Hash Algorithm 256-bit):</strong> Part of the SHA-2 family designed by the NSA. SHA-256 is the modern industry standard for digital certificates, SSL/TLS, Git revisions, and blockchain verification.</li>
  <li><strong>SHA-512:</strong> A higher-security member of the SHA-2 family producing a 512-bit digest, frequently utilized in high-security applications and 64-bit architectures.</li>
  <li><strong>SHA-384:</strong> A truncated 384-bit version of SHA-512 offering high collision resistance.</li>
  <li><strong>SHA-1:</strong> A legacy 160-bit algorithm. Note: SHA-1 is cryptographically broken and prone to collision attacks; it is provided here exclusively for legacy checksum verification.</li>
</ul>

<h2>Common Practical Use Cases</h2>
<ul>
  <li><strong>File Integrity & Checksums:</strong> Comparing downloaded file digests against official checksums to verify files have not been corrupted or tampered with.</li>
  <li><strong>Data Deduplication:</strong> Indexing large datasets by hash to quickly identify duplicates without comparing raw payloads.</li>
  <li><strong>Digital Signatures:</strong> Hashing document contents prior to signing with asymmetric public/private keys.</li>
</ul>

<h2>Password Storage Warning</h2>
<p>Do not use raw SHA-256 or SHA-512 for password storage. General-purpose hashes are engineered for high throughput, which makes them susceptible to brute-force and GPU dictionary attacks. Always use dedicated, memory-hard key derivation functions such as Argon2id, bcrypt, or PBKDF2 for password hashing.</p>
      </section>
    </ToolShell>
  );
}
