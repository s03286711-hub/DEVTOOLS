import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';
import EmbeddedTool from '@/components/EmbeddedTool';
import { RegexTool } from '@/components/Tools';

export const metadata: Metadata = {
  title: 'Regular Expressions Deep Dive: Engine Internals, Character Classes, Lookaround Assertions, and ReDoS Prevention',
  description: 'A complete 1,200+ word engineering guide to regular expressions. Master quantifiers, non-capturing groups, positive/negative lookaheads, catastrophic backtracking prevention, and multi-language code.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="regex-basics"
      title="Regular Expressions Deep Dive: Engine Internals, Character Classes, Lookaround Assertions, and ReDoS Prevention"
      description="A complete 1,200+ word engineering guide to regular expressions. Master quantifiers, non-capturing groups, positive/negative lookaheads, catastrophic backtracking prevention, and multi-language code."
    >

      <h2>1. The Grammar of Regular Expressions</h2>
      <p>Regular expressions (RegExp) define formal pattern search and text transformation logic. Modern engines in JavaScript, Python, and Go support extensive grammar features including character classes, quantifiers, and zero-width assertions.</p>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="regex-tester" headline="Live Regular Expression Tester" description="Test regex patterns with flags, match highlighting, and group captures in real time."><RegexTool /></EmbeddedTool>

      <h2>2. Lookaround Assertions (Zero-Width Matches)</h2>
      <p>Lookarounds allow matching positions without consuming characters in the match output:</p>
      <ul>
        <li><code>(?=...)</code> Positive Lookahead: Matches if pattern follows.</li>
        <li><code>(?!...)</code> Negative Lookahead: Matches if pattern does NOT follow.</li>
        <li><code>(?&lt;=...)</code> Positive Lookbehind: Matches if preceded by pattern.</li>
        <li><code>(?&lt;!...)</code> Negative Lookbehind: Matches if NOT preceded by pattern.</li>
      </ul>

      <h2>3. Catastrophic Backtracking and ReDoS</h2>
      <p>Avoid nested quantifiers like <code>(a+)+$</code> which cause exponential backtracking on non-matching strings, locking server threads in Denial of Service.</p>

    
      <h2>4. Deep Dive into Quantifiers: Greedy, Lazy, and Possessive</h2>
      <p>Quantifiers determine how many times a character class or token group may repeat in the search text:</p>
      <ul>
        <li><code>*</code> Zero or more times (Greedy: matches as many as possible)</li>
        <li><code>+</code> One or more times (Greedy)</li>
        <li><code>?</code> Zero or one time (Optional)</li>
        <li><code>&#123;&#123;min,max&#125;&#125;</code> Bounded repetition (e.g., <code>\d&#123;&#123;4,8&#125;&#125;</code>)</li>
      </ul>

      <h3>Greedy vs Lazy (Reluctant) Matching</h3>
      <p>By default, quantifiers in modern regex engines are <strong>greedy</strong>: they consume the maximum number of characters possible before backtracking. Consider parsing an HTML string:</p>
      <pre><code>&#123;`&lt;div&gt;Hello&lt;/div&gt;&lt;div&gt;World&lt;/div&gt;`&#125;</code></pre>
      <p>If you execute <code>&lt;div&gt;.*&lt;/div&gt;</code>, the greedy <code>.*</code> consumes the entire string up to the final <code>&lt;/div&gt;</code> tag, returning both elements together.</p>
      <p>Appending a question mark creates a <strong>lazy quantifier</strong>: <code>&lt;div&gt;.*?&lt;/div&gt;</code>. The engine stops at the very first closing tag, returning each div tag independently.</p>

      <h2>5. Advanced Assertions: Lookahead & Lookbehind</h2>
      <p>Lookaround assertions test whether a condition precedes or follows the current cursor position without consuming characters in the match array:</p>
      <pre><code>{`// Match passwords containing at least 1 digit, 1 uppercase, and 8+ characters:
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{{8,}}$/;

// Format numbers with comma thousand separators using lookaround:
const formatted = "1000000".replace(/\B(?=(\d{{3}})+(?!\d))/g, ",");
console.log(formatted); // "1,000,000"`}</code></pre>

      <h2>6. Production Implementation Across Modern Languages</h2>
      <h3>TypeScript / JavaScript</h3>
      <pre><code>{`// Safe email validation regex conforming to RFC 5322 pragmatic rules
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_\`{{|}}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{{0,61}}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{{0,61}}[a-zA-Z0-9])?)*$/;

function validateEmail(email: string): boolean {{
  return emailPattern.test(email.trim());
}}

console.log("Valid:", validateEmail("alex@devxtool.me"));
console.log("Invalid:", validateEmail("alex@.com"));`}</code></pre>

      <h3>Python 3</h3>
      <pre><code>{`import re

text = "Error code: ERR_404 at 2026-10-16. Secondary warning: WARN_502."
pattern = r"([A-Z]+)_(\d{{3}})"

# Find all matches with capture groups
matches = re.findall(pattern, text)
for prefix, code in matches:
    print(f"Severity: {{prefix}}, Code: {{code}}")`}</code></pre>

      <h2>7. Frequently Asked Questions (FAQ)</h2>
      <h3>What is ReDoS (Regular Expression Denial of Service)?</h3>
      <p>ReDoS occurs when a backtracking regex engine evaluates nested quantifiers on crafted non-matching input strings. The computational complexity explodes exponentially (O(2^n)), freezing CPU cores. Always test regex patterns against long repetitive inputs before deploying to production.</p>

      <h3>What is the difference between capturing and non-capturing groups?</h3>
      <p>A capturing group <code>(abc)</code> stores the matched characters in memory for backreferences (<code>\1</code>) or extraction. A non-capturing group <code>(?:abc)</code> provides logical grouping without the memory allocation and indexing overhead, improving engine execution speed.</p>

    
      <h2>8. Engine Architectures: NFA vs DFA and Google RE2</h2>
      <p>Modern regular expression engines fall into two primary algorithmic categories:</p>

      <table className="w-full text-left border-collapse my-6">
        <thead>
          <tr className="border-b bg-[#f8f9fc]">
            <th className="py-3 px-3">Feature</th>
            <th className="py-3 px-3">NFA (Backtracking Engine)</th>
            <th className="py-3 px-3">DFA (Deterministic Automaton / RE2)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Used in</td>
            <td className="py-3 px-3">JavaScript (V8), Python (re), PCRE, Java, Ruby</td>
            <td className="py-3 px-3">Go (regexp), Rust (regex), Google RE2</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Execution Time</td>
            <td className="py-3 px-3 text-[#b91c1c]">Exponential worst case: O(2^N) (Vulnerable to ReDoS)</td>
            <td className="py-3 px-3 text-[#059669]">Strictly linear: O(N) relative to input length</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Supported Features</td>
            <td className="py-3 px-3">Backreferences, Lookaround assertions, Conditionals</td>
            <td className="py-3 px-3">Standard character classes, quantifiers; no backreferences</td>
          </tr>
        </tbody>
      </table>

      <h2>9. Practical Production Regex Cookbook</h2>
      <ul>
        <li><strong>UUID v4 Identifier:</strong> <code>/^[0-9a-f]&#123;&#123;8&#125;&#125;-[0-9a-f]&#123;&#123;4&#125;&#125;-4[0-9a-f]&#123;&#123;3&#125;&#125;-[89ab][0-9a-f]&#123;&#123;3&#125;&#125;-[0-9a-f]&#123;&#123;12&#125;&#125;$/i</code></li>
        <li><strong>ISO 8601 Date String:</strong> <code>/^\d&#123;&#123;4&#125;&#125;-\d&#123;&#123;2&#125;&#125;-\d&#123;&#123;2&#125;&#125;T\d&#123;&#123;2&#125;&#125;:\d&#123;&#123;2&#125;&#125;:\d&#123;&#123;2&#125;&#125;(?:\.\d+)?(?:Z|[+-]\d&#123;&#123;2&#125;&#125;:\d&#123;&#123;2&#125;&#125;)$/</code></li>
        <li><strong>IPv4 Network Address:</strong> <code>/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.)&#123;&#123;3&#125;&#125;(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/</code></li>
        <li><strong>Hexadecimal Color (#RGB or #RRGGBB):</strong> <code>/^#([0-9a-fA-F]&#123;&#123;3&#125;&#125;|([0-9a-fA-F]&#123;&#123;2&#125;&#125;)&#123;&#123;3,4&#125;&#125;)$/</code></li>
      </ul>

      <h2>10. Implementation in Go (RE2 DFA) and Python</h2>
      <h3>Go (Safe Linear Time)</h3>
      <pre><code>{`package main

import (
    "fmt"
    "regexp"
)

func main() {{
    re := regexp.MustCompile(\`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{{2,}}\`)
    text := "Contact us at support@devxtool.me or team@google.com"
    
    matches := re.FindAllString(text, -1)
    for _, match := range matches {{
        fmt.Println("Found email:", match)
    }}
}}`}</code></pre>

    
      <h2>11. Case Study: Mitigating ReDoS in High-Traffic Production APIs</h2>
      <p>In 2019, Cloudflare suffered a major worldwide outage lasting 27 minutes. The root cause was traced to a single poorly written regular expression deployed within their Web Application Firewall (WAF) to detect cross-site scripting (XSS):</p>
      <pre><code>&#123;`(?:(?:(?:"|'|]|&#125;|\/)|(?:&[a-zA-Z0-9_]*;))\s*?[^\s\w,;:\/\?#\[\]@&=+$#*'"]*?\s*?:[\s\S]+)`&#125;</code></pre>
      <p>Because the expression contained multiple adjacent optional whitespaces, nested quantifiers, and wildcards, evaluating a crafted HTTP request with trailing characters caused CPU core utilization to spike to 100% across Cloudflare's entire edge network.</p>

      <h3>Key Architectural Safeguards Against ReDoS:</h3>
      <ol>
        <li><strong>Static Analysis Linting:</strong> Integrate automated regex vulnerability linters (such as <code>eslint-plugin-regexp</code> or <code>safe-regex</code>) into continuous integration (CI) test suites to catch exponential backtracking patterns before merging code.</li>
        <li><strong>Enforce String Length Guards:</strong> Always truncate incoming user input strings before running regular expression matches. A regex that runs in 2 milliseconds on a 100-character string may take 45 seconds on a 50,000-character payload.</li>
        <li><strong>Use Non-Backtracking DFA Engines:</strong> For mission-critical security filtering and router path parsing, compile expressions using DFA engines (e.g., Google RE2 or Rust Regex crate) which provide mathematical guarantees of linear execution time: <strong>O(N)</strong>.</li>
      </ol>

    
      <h2>12. Detailed Performance Benchmarks: Matching Speed across Engines</h2>
      <p>Understanding the runtime profile of regular expressions across different programming runtimes helps architects write high-efficiency services:</p>
      <ul>
        <li><strong>JavaScript (V8):</strong> Uses the Irregexp engine, compiling regular expressions directly into native machine instructions via JIT. While extraordinarily fast for common patterns, it is susceptible to catastrophic backtracking.</li>
        <li><strong>Python (re module):</strong> Implements a bytecode-interpreted C engine. To achieve higher performance on massive datasets, consider the third-party <code>regex</code> module or compile with <code>re.compile()</code> to cache regex bytecode.</li>
        <li><strong>Go (regexp package):</strong> Utilizes a variant of the Thompson NFA algorithm derived from Google's RE2. It guarantees execution time linear with the input size (O(N)), completely eliminating ReDoS vulnerabilities at the cost of excluding backreferences and lookaround assertions.</li>
      </ul>

    
      <h2>13. Designing Maintainable Regular Expressions: The Free-Spacing Flag (x)</h2>
      <p>One of the primary complaints about regular expressions in large software codebases is unreadability. Complex expressions spanning 100 characters become "write-only" code that other developers hesitate to maintain.</p>
      <p>Modern engines support the <strong>free-spacing mode (flag /x)</strong>, which ignores whitespace and allows inline comments within the regex pattern:</p>
      <pre><code>{`# Python verbose regex example:
pattern = re.compile(r"""
    ^                   # Start of string
    (?P&lt;user&gt;[\w.]+)   # Username capture group
    @                   # Literal @ symbol
    (?P&lt;domain&gt;[\w.-]+) # Domain name capture group
    \.                  # Literal dot
    (?P&lt;tld&gt;[a-zA-Z]{{2,}}) # Top-level domain (2+ chars)
    $                   # End of string
""", re.VERBOSE)`}</code></pre>
      <p>Writing documented, verbose regular expressions ensures that security constraints remain clear during code reviews and architectural audits.</p>

    </GuideArticle>
  );
}
