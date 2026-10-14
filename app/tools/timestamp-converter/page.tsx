import type { Metadata } from 'next';
import ToolShell from '@/components/ToolShell';
import { TimestampTool } from '@/components/NewTools';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter — Epoch to Date & Human Time',
  description: 'Convert Unix timestamps (seconds & milliseconds) to human-readable dates and convert ISO 8601 dates to Unix epoch timestamps. Fast online converter.',
};

export default function Page() {
  return (
    <ToolShell
      slug="timestamp-converter"
      title="Unix Timestamp Converter"
      description="Convert between Unix epoch timestamps and human-readable dates."
    >
      <TimestampTool />
      <section className="article mt-12">
        <h2>What is a Unix Epoch Timestamp?</h2>
<p>The Unix timestamp (also known as POSIX time or Unix Epoch time) is the number of seconds that have elapsed since Thursday, 1 January 1970 00:00:00 Coordinated Universal Time (UTC), minus leap seconds. It provides a standardized, universal numerical timestamp across different operating systems, databases, and programming languages.</p>

<h2>Seconds vs. Milliseconds</h2>
<p>A frequent stumbling block for developers is distinguishing seconds from milliseconds:</p>
<ul>
  <li><strong>10-digit timestamps</strong> (e.g., <code>1700000000</code>): Represent seconds. Commonly used in Linux system tools, Python (<code>time.time()</code>), PHP, and SQL databases.</li>
  <li><strong>13-digit timestamps</strong> (e.g., <code>1700000000000</code>): Represent milliseconds. Standard in JavaScript (<code>Date.now()</code>) and Java.</li>
</ul>
<p>This tool automatically detects whether your input is in seconds or milliseconds and displays conversions in UTC, ISO 8601, and your local browser timezone.</p>

<h2>The Year 2038 Problem (Y2038)</h2>
<p>On 19 January 2038 at 03:14:07 UTC, 32-bit signed integers will overflow, reaching their maximum value of 2,147,483,647 and wrapping into negative numbers. Modern 64-bit systems represent timestamps using 64-bit integers, effectively future-proofing systems for hundreds of billions of years.</p>
      </section>
    </ToolShell>
  );
}
