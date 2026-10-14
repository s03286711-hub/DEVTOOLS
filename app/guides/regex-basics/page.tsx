import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';

export const metadata: Metadata = {
  title: 'Regular Expressions for Beginners: Architecture, Syntax & Practical Patterns',
  description: 'Master regex fundamentals. Character classes, quantifiers, lookahead and lookbehind assertions, greedy vs lazy matching, and avoiding ReDoS vulnerabilities.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="regex-basics"
      title="Regular Expressions for Beginners"
      description="A complete guide to regular expressions: understand pattern syntax, meta-characters, grouping, lookarounds, and how regex engines evaluate text."
    >
      <h2>What is a Regular Expression?</h2>
      <p>A regular expression (regex) is a formal sequence of characters defining a search pattern. Developed from theoretical computer science and formal language theory by Stephen Cole Kleene in the 1950s, regular expressions provide a declarative syntax to search, match, validate, and replace textual substrings efficiently.</p>

      <h2>Core Syntax and Metacharacters</h2>
      <table className="w-full text-left border-collapse my-4">
        <thead>
          <tr className="border-b">
            <th className="py-2">Token</th>
            <th className="py-2">Description</th>
            <th className="py-2">Example Match</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2"><code>.</code></td>
            <td className="py-2">Wildcard: matches any character except newline</td>
            <td className="py-2"><code>a.c</code> matches "abc", "a9c"</td>
          </tr>
          <tr className="border-b">
            <td className="py-2"><code>^</code> / <code>$</code></td>
            <td className="py-2">Anchors: start and end of string (or line in multiline mode)</td>
            <td className="py-2"><code>^Hello</code> matches "Hello world"</td>
          </tr>
          <tr className="border-b">
            <td className="py-2"><code>\d</code> / <code>\D</code></td>
            <td className="py-2">Any digit (0-9) / Any non-digit</td>
            <td className="py-2"><code>\d{3}</code> matches "456"</td>
          </tr>
          <tr className="border-b">
            <td className="py-2"><code>\w</code> / <code>\W</code></td>
            <td className="py-2">Any word character (alphanumeric + underscore) / Non-word</td>
            <td className="py-2"><code>\w+</code> matches "dev_tool"</td>
          </tr>
          <tr className="border-b">
            <td className="py-2"><code>\s</code> / <code>\S</code></td>
            <td className="py-2">Whitespace (space, tab, newline) / Non-whitespace</td>
            <td className="py-2"><code>\s+</code> matches multiple spaces</td>
          </tr>
        </tbody>
      </table>

      <h2>Quantifiers: Greedy vs. Lazy Matching</h2>
      <p>Quantifiers determine how many times a preceding token may repeat:</p>
      <ul>
        <li><code>*</code>: 0 or more occurrences.</li>
        <li><code>+</code>: 1 or more occurrences.</li>
        <li><code>?</code>: 0 or 1 occurrence (optional).</li>
        <li><code>{'{n,m}'}</code>: Between <code>n</code> and <code>m</code> occurrences.</li>
      </ul>
      <p>By default, quantifiers are <strong>greedy</strong>: they consume as much text as possible while still allowing the pattern to match. Appending a question mark (e.g., <code>*?</code> or <code>+?</code>) makes the quantifier <strong>lazy</strong> (or reluctant), causing it to stop matching at the earliest possible boundary.</p>

      <h2>Capturing Groups and Non-Capturing Groups</h2>
      <p>Enclosing part of a pattern in parentheses <code>(abc)</code> creates a <em>capturing group</em>, allowing you to extract specific matched values or backreference them later. If you only need parentheses for logical alternation without the overhead of capturing, use a <em>non-capturing group</em>: <code>(?:abc)</code>.</p>

      <h2>Guarding Against ReDoS (Catastrophic Backtracking)</h2>
      <p>Most programming languages use NFA (Nondeterministic Finite Automaton) regex engines that rely on backtracking. When evaluating ambiguous patterns with nested quantifiers (such as <code>(a+)+$</code>) against non-matching input strings like <code>aaaaaaaaaaaaaaaaaaaa!</code>, the engine tests every combinatorial variation. This causes execution time to explode exponentially, freezing the CPU thread in what is termed a Regular Expression Denial of Service (ReDoS). Always audit regex patterns for overlapping quantifiers.</p>
    </GuideArticle>
  );
}
