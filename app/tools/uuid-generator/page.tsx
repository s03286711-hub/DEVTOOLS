import { toolMetadata } from '@/lib/tool-seo';
import type { Metadata } from 'next';
import ToolShell from '@/components/ToolShell';
import { UuidTool } from '@/components/NewTools';

export const metadata: Metadata = toolMetadata('uuid-generator');

export default function Page() {
  return (
    <ToolShell
      slug="uuid-generator"
      title="UUID Generator"
      description="Generate random Version 4 UUIDs instantly. Generated locally using crypto.randomUUID()."
    >
      <UuidTool />
      <section className="article mt-12">
        <h2>What is a UUID v4?</h2>
<p>A UUID (Universally Unique Identifier) version 4 is a 128-bit identifier generated using cryptographically strong pseudo-random numbers. Unlike sequential database IDs (such as auto-incrementing integers), UUIDs can be generated distributedly across multiple systems and servers without risking ID collisions or requiring centralized coordination.</p>

<h2>Standard UUID Format and Structure</h2>
<p>A standard canonical UUID representation consists of 32 hexadecimal digits displayed in five hyphen-separated groups:</p>
<pre><code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code></pre>
<p>In a version 4 UUID, the 13th hexadecimal character indicates the version (which is fixed to <code>4</code>), while the 17th character indicates the variant (usually conforming to RFC 4122 / RFC 9562, where <code>y</code> is 8, 9, a, or b).</p>

<h2>How to Use This UUID Generator</h2>
<ul>
  <li><strong>Quantity:</strong> Choose how many UUIDs you need to generate at once (from 1 up to 100).</li>
  <li><strong>Case selection:</strong> Toggle uppercase or lowercase depending on your language or database conventions.</li>
  <li><strong>Instant generation:</strong> Click "Generate UUIDs" to generate a fresh batch using your browser's cryptographically secure pseudo-random number generator.</li>
  <li><strong>Copy and Export:</strong> Click the copy button to copy all identifiers to your clipboard for use in database seeds, mock data, or test suites.</li>
</ul>

<h2>Security and Privacy Guarantee</h2>
<p>All identifiers generated on this page are produced entirely on your device via <code>crypto.randomUUID()</code>. No requests are transmitted over the network, ensuring that newly generated keys, tokens, or session IDs remain completely confidential.</p>
      </section>
    </ToolShell>
  );
}
