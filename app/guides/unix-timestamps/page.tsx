import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';
import EmbeddedTool from '@/components/EmbeddedTool';
import { TimestampTool } from '@/components/NewTools';

export const metadata: Metadata = {
  title: 'Unix Timestamps: A Complete Guide to Epoch Time, 64-Bit Transitions, Leap Seconds, and the Year 2038 Bug',
  description: 'A complete 1,200+ word engineering guide to Unix epoch time. Learn seconds vs milliseconds, timezone normalization, UTC conversions, and distributed timestamp synchronization.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="unix-timestamps"
      title="Unix Timestamps: A Complete Guide to Epoch Time, 64-Bit Transitions, Leap Seconds, and the Year 2038 Bug"
      description="A complete 1,200+ word engineering guide to Unix epoch time. Learn seconds vs milliseconds, timezone normalization, UTC conversions, and distributed timestamp synchronization."
    >

      <h2>1. The Foundation of Unix Time (POSIX Time)</h2>
      <p>Unix time (also known as POSIX time or Epoch time) is defined as the total number of non-leap seconds elapsed since <strong>00:00:00 UTC on Thursday, 1 January 1970</strong> (the Unix Epoch). Created by Ken Thompson and Dennis Ritchie during the original architecture of Unix at Bell Labs, Unix time provides a universal, timezone-independent scalar integer that simplifies time measurement across distributed operating systems.</p>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="timestamp-converter" headline="Live Unix Timestamp Converter Sandbox" description="Convert Unix seconds, milliseconds, and ISO-8601 UTC dates in real time without network latency."><TimestampTool /></EmbeddedTool>

      <h2>2. Seconds vs Milliseconds vs Nanoseconds</h2>
      <p>Different runtime environments represent epoch time at varying resolutions:</p>
      <ul>
        <li><strong>Unix Seconds (10 digits):</strong> Standard C/POSIX, Python <code>time.time()</code>, Linux system kernels. E.g., <code>1700000000</code>.</li>
        <li><strong>Unix Milliseconds (13 digits):</strong> JavaScript <code>Date.now()</code>, Java <code>System.currentTimeMillis()</code>. E.g., <code>1700000000000</code>.</li>
        <li><strong>Unix Microseconds (16 digits):</strong> Python <code>datetime.timestamp()</code>, PostgreSQL <code>timestamp</code>. E.g., <code>1700000000000000</code>.</li>
        <li><strong>Unix Nanoseconds (19 digits):</strong> Go <code>time.Now().UnixNano()</code>.</li>
      </ul>

      <h2>3. The Year 2038 Problem (Y2038)</h2>
      <p>On legacy 32-bit systems, epoch time is stored as a signed 32-bit integer (<code>time_t</code>). At 03:14:07 UTC on 19 January 2038, the value reaches <code>2,147,483,647</code>. The next second overflows to <code>-2,147,483,648</code>, wrapping the clock back to December 13, 1901.</p>
      <p>Modern 64-bit operating systems use 64-bit integers, pushing the overflow limit to <strong>292 billion years into the future</strong>.</p>

    
      <h2>3. Deep Dive into Epoch Math and Timezone Offsets</h2>
      <p>One of the most persistent misconceptions among junior developers is the assumption that Unix timestamps possess timezone information. <strong>A Unix timestamp has no timezone.</strong> It represents an absolute moment in time identical across Tokyo, London, San Francisco, and the International Space Station.</p>
      <p>When an application displays a timestamp as <code>"2026-10-16 18:30:00 EST"</code>, the conversion is performed by applying a local timezone offset (such as UTC-5 for Eastern Standard Time or UTC+9 for Japan Standard Time) to the universal scalar integer.</p>

      <h2>4. The Leap Second Controversy and POSIX Compromise</h2>
      <p>Earth's rotational velocity is slightly irregular and decelerates over geological timescales due to tidal friction. To keep civil time synchronized with astronomical solar position, the International Earth Rotation and Reference Systems Service (IERS) historically inserted occasional <strong>leap seconds</strong> into UTC.</p>
      <p>However, the POSIX standard governing Unix time explicitly dictates that every day consists of exactly <strong>86,400 seconds</strong> (<code>60 * 60 * 24</code>). When a leap second occurs, POSIX systems typically repeat the 86,400th second (stepping the clock backward by one second) or employ <strong>leap second smearing</strong> (gradually slewing the clock by microseconds over a 24-hour window, as pioneered by Google NTP and AWS Chrony).</p>

      <h2>5. Production Implementation Across Modern Languages</h2>
      <h3>TypeScript & JavaScript (Node.js & Browsers)</h3>
      <pre><code>{`// 1. Get current Unix timestamp
const currentSeconds: number = Math.floor(Date.now() / 1000);
const currentMilliseconds: number = Date.now();

// 2. Convert timestamp to ISO 8601 UTC
function epochToIso(epochSeconds: number): string {{
  return new Date(epochSeconds * 1000).toISOString();
}}

// 3. Parse ISO string back to Unix seconds
function isoToEpoch(isoString: string): number {{
  return Math.floor(new Date(isoString).getTime() / 1000);
}}

console.log("Current Unix Epoch (Seconds):", currentSeconds);
console.log("ISO UTC Date:", epochToIso(currentSeconds));`}</code></pre>

      <h3>Python 3</h3>
      <pre><code>{`import time
from datetime import datetime, timezone

# 1. Native Unix Epoch Float (Seconds with microsecond fraction)
current_epoch = time.time()
print(f"Current Epoch: {{int(current_epoch)}} (Seconds)")

# 2. Convert Unix Epoch to UTC Datetime
utc_dt = datetime.fromtimestamp(current_epoch, tz=timezone.utc)
print(f"UTC String: {{utc_dt.strftime('%Y-%m-%d %H:%M:%S UTC')}}")

# 3. Convert Datetime back to Unix Epoch Integer
epoch_roundtrip = int(utc_dt.timestamp())
print(f"Roundtrip Epoch: {{epoch_roundtrip}}")`}</code></pre>

      <h3>Go (Golang)</h3>
      <pre><code>{`package main

import (
    "fmt"
    "time"
)

func main() {{
    now := time.Now()
    
    // Seconds, Milliseconds, and Nanoseconds
    seconds := now.Unix()
    milli := now.UnixMilli()
    nano := now.UnixNano()
    
    fmt.Printf("Seconds: %d\nMilliseconds: %d\nNanoseconds: %d\n", seconds, milli, nano)

    // Reconstructing time from epoch seconds
    parsedTime := time.Unix(seconds, 0).UTC()
    fmt.Println("Parsed UTC Time:", parsedTime.Format(time.RFC3339))
}}`}</code></pre>

      <h2>6. Database Timestamps: TIMESTAMP WITHOUT TIME ZONE Anti-Pattern</h2>
      <p>In PostgreSQL and MySQL, storing user event records as <code>TIMESTAMP WITHOUT TIME ZONE</code> is a severe architectural hazard. If the database server moves to a new cloud region with a different operating system timezone, previously inserted records become ambiguous. Always use <code>TIMESTAMPTZ</code> (timestamp with time zone in PostgreSQL) or store raw integer epoch milliseconds.</p>

      <h2>7. Frequently Asked Questions (FAQ)</h2>
      <h3>How does the 2038 bug affect 64-bit systems?</h3>
      <p>64-bit systems allocate 63 bits to positive integers and 1 bit to sign. The maximum representable timestamp is <code>9,223,372,036,854,775,807</code> seconds. This corresponds to the year <strong>292,277,026,596 AD</strong>—well beyond the expected lifespan of our solar system.</p>

      <h3>Can Unix timestamps represent dates before 1970?</h3>
      <p>Yes. Because Unix time is stored as a signed integer, negative numbers represent moments prior to 1970. For example, <code>-86400</code> represents December 31, 1969 at 00:00:00 UTC.</p>

    
      <h2>8. The Architectural Chaos of Timezones and Daylight Saving Time (DST)</h2>
      <p>Software applications that fail to separate point-in-time event logging from civil wall-clock scheduling inevitably experience severe production failures during biannual Daylight Saving Time transitions. Consider an automated batch process scheduled to execute every morning at 02:30 AM:</p>
      <ul>
        <li><strong>Spring Forward Transition:</strong> In March, clocks in the United States jump directly from 01:59:59 AM to 03:00:00 AM. The time 02:30 AM does not exist on that calendar day! If the scheduler evaluates local time naively, the scheduled job will be skipped entirely.</li>
        <li><strong>Fall Back Transition:</strong> In November, clocks step backward from 01:59:59 AM to 01:00:00 AM. The time 02:30 AM occurs twice! Without strict UTC epoch checks, financial batch settlements and cron jobs will execute twice, duplicating database transactions.</li>
      </ul>
      <p><strong>The Universal Best Practice:</strong> Store all database records, log events, and messaging queue triggers as absolute scalar Unix timestamps in UTC. Convert to local civil time (e.g., America/New_York) strictly at the final rendering layer on the client frontend.</p>

    
      <h2>9. Network Time Protocol (NTP) Synchronization and Clock Drift</h2>
      <p>In distributed database architectures (such as CockroachDB, Google Spanner, and Apache Cassandra), relying on hardware system clocks is hazardous. Physical computer clock crystals drift by several milliseconds or seconds per day depending on server thermal load.</p>
      <p>Distributed clusters maintain clock synchronization using <strong>NTP (Network Time Protocol / RFC 5905)</strong> or PTP (Precision Time Protocol / IEEE 1588). Google Spanner solves clock uncertainty using <strong>TrueTime</strong>, an API supported by atomic clocks and GPS receivers in each datacenter, bounding clock skew to a tight epsilon window (typically under 7 milliseconds).</p>

    
      <h2>10. Relational Database Implementation: PostgreSQL, MySQL, and SQLite</h2>
      <table className="w-full text-left border-collapse my-6">
        <thead>
          <tr className="border-b bg-[#f8f9fc]">
            <th className="py-3 px-3">Database</th>
            <th className="py-3 px-3">Current Timestamp Function</th>
            <th className="py-3 px-3">Epoch Conversion Syntax</th>
            <th className="py-3 px-3">Storage Best Practice</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">PostgreSQL</td>
            <td className="py-3 px-3 font-mono">NOW()</td>
            <td className="py-3 px-3 font-mono">EXTRACT(EPOCH FROM NOW())</td>
            <td className="py-3 px-3">TIMESTAMPTZ (8 bytes, stores UTC internally)</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">MySQL 8.0</td>
            <td className="py-3 px-3 font-mono">CURRENT_TIMESTAMP(3)</td>
            <td className="py-3 px-3 font-mono">UNIX_TIMESTAMP()</td>
            <td className="py-3 px-3">TIMESTAMP (converts to UTC for storage)</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">SQLite</td>
            <td className="py-3 px-3 font-mono">CURRENT_TIMESTAMP</td>
            <td className="py-3 px-3 font-mono">strftime('%s', 'now')</td>
            <td className="py-3 px-3">INTEGER (store scalar milliseconds)</td>
          </tr>
        </tbody>
      </table>

    </GuideArticle>
  );
}
