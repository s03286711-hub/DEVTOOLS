import { pageMetadata } from '@/lib/seo';
import { tools } from '@/lib/site';
import type { Metadata } from 'next';
import ToolShell from '@/components/ToolShell';
import { RegexTool } from '@/components/Tools';

const seoTool = tools.find((tool) => tool.slug === 'regex-tester')!;

export const metadata: Metadata = pageMetadata({
  title: `${seoTool.title} Online — Free`,
  description: `${seoTool.short} Free online tool with browser-based processing, examples, and a practical guide. No account required.`,
  path: '/tools/regex-tester',
});

export default function Page() {
  return (
    <ToolShell
      slug="regex-tester"
      title="Regex Tester"
      description="Test, validate, and debug JavaScript regular expressions with real-time match indexing and flag controls."
    >
      <RegexTool />
      <section className="article mt-12">
        <h2>What Is a Regular Expression (Regex)?</h2>
        <p>A regular expression (regex) is a sequence of characters that forms a search pattern. In software engineering, regular expressions are essential for validating form inputs (such as emails or telephone numbers), extracting structured substrings from logs, and performing complex text search-and-replace operations.</p>

        <h2>Common Regular Expression Flags Explained</h2>
        <ul>
          <li><code>g</code> (Global): Searches for all matches throughout the text rather than stopping after the first occurrence.</li>
          <li><code>i</code> (Case-Insensitive): Ignores uppercase vs. lowercase distinctions during matching.</li>
          <li><code>m</code> (Multiline): Treats the beginning (<code>^</code>) and end (<code>$</code>) anchors as matching the start and end of each individual line, rather than the entire input string.</li>
          <li><code>s</code> (DotAll): Allows the wildcard dot (<code>.</code>) to match newline characters as well.</li>
          <li><code>u</code> (Unicode): Enables full Unicode pattern matching and surrogate pair support.</li>
        </ul>

        <h2>Essential Regex Cheatsheet</h2>
        <ul>
          <li><code>\d</code>: Matches any digit (equivalent to <code>[0-9]</code>).</li>
          <li><code>\w</code>: Matches any word character (alphanumeric plus underscore).</li>
          <li><code>\s</code>: Matches whitespace characters (spaces, tabs, newlines).</li>
          <li><code>+</code>: Matches one or more repetitions of the preceding token.</li>
          <li><code>*</code>: Matches zero or more repetitions.</li>
          <li><code>?</code>: Matches zero or one repetition (makes matches optional or lazy).</li>
          <li><code>[abc]</code>: Character class matching any character inside the brackets.</li>
          <li><code>(abc)</code>: Capturing group.</li>
        </ul>

        <h2>Security Reminder: Catastrophic Backtracking (ReDoS)</h2>
        <p>Be cautious when nesting quantifiers like <code>(a+)+</code> against adversarial inputs. Complex, non-deterministic regular expressions can cause exponential execution times known as Regular Expression Denial of Service (ReDoS). Always test your patterns against varied edge-case inputs.</p>
      </section>
    </ToolShell>
  );
}
