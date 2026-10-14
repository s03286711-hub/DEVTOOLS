import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';

export const metadata: Metadata = {
  title: 'What Is a UUID? Versions, Formats and Best Practices',
  description: 'Comprehensive guide to UUIDs and GUIDs. Learn about UUID v1, v4, v7, collision probability, RFC 9562 standards, and database indexing tips.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="uuid-guide"
      title="What Is a UUID? Versions, Formats and Best Practices"
      description="Comprehensive guide to UUIDs and GUIDs. Learn about UUID v1, v4, v7, collision probability, RFC 9562 standards, and database indexing tips."
    >
      <h2>Introduction to Universally Unique Identifiers (UUID)</h2>
<p>A Universally Unique Identifier (UUID), also known in Microsoft ecosystems as a Globally Unique Identifier (GUID), is a 128-bit label used for identifying information in computer systems. Standardized by RFC 4122 and updated by RFC 9562, UUIDs enable distributed systems to assign identifiers without coordinating through a central authority or database lock.</p>

<h2>How UUIDs Are Structured</h2>
<p>In its standard text representation, a UUID consists of 32 hexadecimal digits separated into five hyphens: <code>8-4-4-4-12</code>, totaling 36 characters (e.g., <code>550e8400-e29b-41d4-a716-446655440000</code>).</p>
<p>The parts consist of:</p>
<ul>
  <li><code>time_low</code> (8 hex chars / 32 bits)</li>
  <li><code>time_mid</code> (4 hex chars / 16 bits)</li>
  <li><code>time_hi_and_version</code> (4 hex chars / 16 bits)</li>
  <li><code>clock_seq_hi_and_reserved</code> + <code>clock_seq_low</code> (4 hex chars / 16 bits)</li>
  <li><code>node</code> (12 hex chars / 48 bits)</li>
</ul>

<h2>Comparison of UUID Versions</h2>
<table className="w-full text-left border-collapse my-4">
  <thead>
    <tr className="border-b">
      <th className="py-2">Version</th>
      <th className="py-2">Generation Basis</th>
      <th className="py-2">Primary Use Case</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b">
      <td className="py-2"><strong>UUID v1</strong></td>
      <td className="py-2">Host MAC address + 60-bit timestamp</td>
      <td className="py-2">Legacy distributed systems (leaks hardware MAC address).</td>
    </tr>
    <tr className="border-b">
      <td className="py-2"><strong>UUID v3 & v5</strong></td>
      <td className="py-2">Namespace + name hashed with MD5 (v3) or SHA-1 (v5)</td>
      <td className="py-2">Deterministic identifiers derived from URLs or domain names.</td>
    </tr>
    <tr className="border-b">
      <td className="py-2"><strong>UUID v4</strong></td>
      <td className="py-2">122 bits of cryptographically secure random entropy</td>
      <td className="py-2">General-purpose web applications, API keys, session tokens, IDs.</td>
    </tr>
    <tr className="border-b">
      <td className="py-2"><strong>UUID v7 (RFC 9562)</strong></td>
      <td className="py-2">Unix timestamp millisecond prefix + random bits</td>
      <td className="py-2">Database primary keys requiring natural chronological B-Tree sorting.</td>
    </tr>
  </tbody>
</table>

<h2>What Are the Odds of a UUID v4 Collision?</h2>
<p>Because UUID v4 has 122 random bits, the total number of possible UUIDs is 2<sup>122</sup>, which is roughly 5.3 &times; 10<sup>36</sup> (5.3 undecillion). To put this in perspective: you would need to generate approximately 1 billion UUIDs per second for 85 years before having a 50% probability of a single collision. For virtually all software architectures, UUID v4 collisions can be treated as mathematically impossible.</p>

<h2>Database Performance Considerations</h2>
<p>While UUIDs provide excellent isolation in distributed architectures, storing random UUID v4 values as primary keys in traditional relational databases (like PostgreSQL or MySQL InnoDB) can lead to index fragmentation. Because v4 values are uniformly random, each insertion hits a random location in the B-Tree index, causing frequent page splits and cache eviction once the index exceeds RAM.</p>
<p>To optimize database performance:</p>
<ul>
  <li>Use native 128-bit binary types (such as PostgreSQL's <code>UUID</code> or MySQL's <code>BINARY(16)</code>) rather than 36-character <code>VARCHAR</code> strings.</li>
  <li>Consider time-ordered identifiers like UUID v7 or ULID for primary keys that need high insertion throughput with clustered indexing.</li>
</ul>
    </GuideArticle>
  );
}
