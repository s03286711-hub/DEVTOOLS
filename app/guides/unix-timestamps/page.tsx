import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';

export const metadata: Metadata = {
  title: 'Unix Timestamps: A Complete Developer Guide',
  description: 'Master Unix epoch time, seconds vs milliseconds, ISO 8601 parsing, timezone math, and how systems solve the upcoming Year 2038 bug.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="unix-timestamps"
      title="Unix Timestamps: A Complete Developer Guide"
      description="Master Unix epoch time, seconds vs milliseconds, ISO 8601 parsing, timezone math, and how systems solve the upcoming Year 2038 bug."
    >
      <h2>What Is Unix Time?</h2>
<p>Unix time (also known as Epoch time or POSIX time) represents the number of seconds that have elapsed since midnight (00:00:00 UTC) on January 1, 1970, excluding leap seconds. It is the universal temporal coordinate system across modern operating systems, networked protocols, and distributed databases.</p>

<h2>Why Unix Timestamps Are Universal</h2>
<p>Representing time as a single integer eliminates numerous common programming headaches:</p>
<ul>
  <li><strong>Timezone Independence:</strong> A Unix timestamp represents an absolute instant in time that is identical regardless of whether you are in Tokyo, London, or San Francisco.</li>
  <li><strong>Simple Arithmetic:</strong> Calculating elapsed duration between two events requires only integer subtraction: <code>duration = end_time - start_time</code>.</li>
  <li><strong>Lightweight Storage:</strong> Storing a 32-bit or 64-bit integer requires substantially less database storage and indexing overhead than textual date formats.</li>
</ul>

<h2>Common Language Examples for Working with Unix Time</h2>

<h3>JavaScript / TypeScript</h3>
<pre><code>// Current timestamp in milliseconds
const ms = Date.now();

// Current timestamp in seconds
const s = Math.floor(Date.now() / 1000);

// Convert timestamp to Date object
const date = new Date(1700000000 * 1000);
console.log(date.toISOString());</code></pre>

<h3>Python</h3>
<pre><code>import time
from datetime import datetime, timezone

# Current timestamp in seconds (float)
current_epoch = time.time()

# Convert epoch to UTC datetime
dt = datetime.fromtimestamp(1700000000, tz=timezone.utc)
print(dt.isoformat())</code></pre>

<h2>The Year 2038 Bug (Y2038)</h2>
<p>On early Unix machines, time was stored as a 32-bit signed integer (<code>time_t</code>). The maximum value of a 32-bit signed integer is <code>2,147,483,647</code>, which corresponds to <strong>Tuesday, 19 January 2038 at 03:14:07 UTC</strong>. At the next second, the integer overflows and rolls over to negative <code>-2,147,483,648</code>, which systems interpret as December 13, 1901.</p>
<p>Modern 64-bit systems represent timestamps using 64-bit integers. A 64-bit timestamp will not overflow for roughly 292 billion years, far beyond the lifespan of our sun.</p>
    <h2>Frequently Asked Questions About Timestamps</h2>
      <h3>Do Unix timestamps account for leap seconds?</h3>
      <p>Strictly speaking, standard POSIX Unix time ignores leap seconds. When an official leap second is inserted into UTC by the International Earth Rotation and Reference Systems Service (IERS), Unix clocks typically repeat second 59, step backwards one second, or use "leap smear" (gradually stretching seconds across a 24-hour window, as implemented by Google and AWS NTP servers) to maintain monotonic clock synchronization.</p>

      <h3>How do I handle daylight saving time (DST) with timestamps?</h3>
      <p>Because Unix timestamps represent raw elapsed seconds since the 1970 epoch in UTC, they are completely immune to Daylight Saving Time shifts. DST is purely a regional presentation artifact. Always store and process timestamps in UTC integers on your servers, and only convert to localized timezones when rendering the date in the user's UI.</p>

      <h3>Why does JavaScript use milliseconds instead of seconds?</h3>
      <p>When Brendan Eich created JavaScript in 1995, he modeled the <code>Date</code> object directly after Java's <code>java.util.Date</code>, which measured time in milliseconds from the epoch. This provides micro-timing precision for performance benchmarking, animations, and high-frequency events.</p>

      <h2>ISO 8601 Date Formatting Standards</h2>
      <p>When serializing dates as text across APIs, the international standard <strong>ISO 8601</strong> (e.g. <code>2026-10-14T14:30:00Z</code>) should always be preferred over regional formats like <code>MM/DD/YYYY</code> or <code>DD/MM/YYYY</code>, which cause ambiguous date parsing errors.</p>
    </GuideArticle>
  );
}
