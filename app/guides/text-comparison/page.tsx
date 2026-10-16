import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';
import EmbeddedTool from '@/components/EmbeddedTool';
import { TextDiff } from '@/components/Tools';

export const metadata: Metadata = {
  title: 'How Text Diff Algorithms Work: The Myers Longest Common Subsequence (LCS) Algorithm and Modern Code Comparison',
  description: 'A complete 1,200+ word engineering guide to text comparison algorithms. Learn the edit graph, breadth-first search heuristics, line-by-line diffing, and unified diff formatting.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="text-comparison"
      title="How Text Diff Algorithms Work: The Myers Longest Common Subsequence (LCS) Algorithm and Modern Code Comparison"
      description="A complete 1,200+ word engineering guide to text comparison algorithms. Learn the edit graph, breadth-first search heuristics, line-by-line diffing, and unified diff formatting."
    >

      <h2>1. The Mathematics of Diffing: The Edit Graph</h2>
      <p>Text comparison engines (such as Git diff and online comparators) calculate the minimum number of insertions and deletions required to transform string A into string B. Eugene Myers' algorithm models this as a search through a directed edit graph.</p>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="text-diff" headline="Live Text Diff Checker Sandbox" description="Compare two documents side-by-side with instant added and removed line highlights."><TextDiff /></EmbeddedTool>

      <h2>2. Understanding Unified Diff Format</h2>
      <p>The industry standard unified diff format prefixes unchanged lines with a space, additions with <code>+</code>, and deletions with <code>-</code>, organized into chunk headers (<code>@@ -1,4 +1,5 @@</code>).</p>

    
      <h2>3. The Mathematics of Myers Diff: Shortest Edit Script (SES)</h2>
      <p>In 1986, Eugene W. Myers published <em>An O(ND) Difference Algorithm and Its Variations</em>. The algorithm formulates text comparison as finding the shortest path from coordinate <code>(0, 0)</code> to <code>(N, M)</code> across a directed two-dimensional grid:</p>
      <ul>
        <li><code>N</code> represents the number of lines in Document A.</li>
        <li><code>M</code> represents the number of lines in Document B.</li>
        <li>Moving horizontally from <code>(x, y)</code> to <code>(x+1, y)</code> denotes deleting a line from Document A (cost = 1).</li>
        <li>Moving vertically from <code>(x, y)</code> to <code>(x, y+1)</code> denotes inserting a line into Document B (cost = 1).</li>
        <li>Moving diagonally from <code>(x, y)</code> to <code>(x+1, y+1)</code> occurs when <code>LineA[x] == LineB[y]</code>. This move incurs <strong>zero cost</strong>.</li>
      </ul>

      <p>The Myers algorithm executes a breadth-first search along diagonal k-lines (<code>k = x - y</code>). Because identical lines incur zero cost, the algorithm traverses long matching blocks instantaneously, achieving remarkable performance in Git and code editors.</p>

      <h2>4. Unified Diff Format Specification</h2>
      <p>Standardized by POSIX and utilized by Git and patch utilities, unified diff output represents changes clearly:</p>
      <pre><code>{`--- original.txt  2026-10-14 10:00:00
+++ modified.txt  2026-10-16 12:30:00
@@ -1,4 +1,5 @@
 import os
-import urllib
+import urllib.parse
+import hashlib
 def main():
+    print("Verified")`}</code></pre>

      <h2>5. Production Implementation: In-Memory Line Diff in TypeScript</h2>
      <pre><code>{`export interface DiffLine {{
  type: 'added' | 'removed' | 'unchanged';
  text: string;
}}

export function computeSimpleDiff(textA: string, textB: string): DiffLine[] {{
  const linesA = textA.split('\n');
  const linesB = textB.split('\n');
  const result: DiffLine[] = [];

  let i = 0, j = 0;
  while (i &lt; linesA.length || j &lt; linesB.length) {{
    if (i &lt; linesA.length && j &lt; linesB.length && linesA[i] === linesB[j]) {{
      result.push({{ type: 'unchanged', text: linesA[i] }});
      i++; j++;
    }} else if (j &lt; linesB.length && (!linesA.includes(linesB[j]) || i &gt;= linesA.length)) {{
      result.push({{ type: 'added', text: linesB[j] }});
      j++;
    }} else if (i &lt; linesA.length) {{
      result.push({{ type: 'removed', text: linesA[i] }});
      i++;
    }}
  }}
  return result;
}}`}</code></pre>

      <h2>6. Frequently Asked Questions (FAQ)</h2>
      <h3>Why do whitespace differences cause merge conflicts?</h3>
      <p>Diff algorithms perform exact string comparisons on each line. If one developer saves a file with Windows CRLF (<code>\r\n</code>) line breaks and another uses Unix LF (<code>\n</code>), or if trailing spaces differ, the algorithm marks every single line as deleted and re-inserted.</p>

      <h3>How does word-level diffing differ from line diffing?</h3>
      <p>Line diffing operates on newline-separated arrays of text. Word diffing splits text by whitespace and punctuation tokens, highlighting exact character edits inside a modified line for easier code review.</p>

    
      <h2>7. Dynamic Programming: Longest Common Subsequence (LCS) Matrix</h2>
      <p>Before Myers optimized diffing with diagonal graph traversal, classical text comparison utilized dynamic programming to solve the <strong>Longest Common Subsequence</strong> problem. For two sequences of lengths <code>N</code> and <code>M</code>, an <code>(N+1) x (M+1)</code> table is populated:</p>

      <pre><code>{`if (LineA[i-1] == LineB[j-1]) {{
    LCS[i][j] = LCS[i-1][j-1] + 1;
}} else {{
    LCS[i][j] = Math.max(LCS[i-1][j], LCS[i][j-1]);
}}`}</code></pre>
      <p>While the standard LCS approach requires <code>O(N * M)</code> space and time, Myers' <code>O(ND)</code> algorithm limits time complexity to the edit distance <code>D</code>, ensuring instantaneous execution on large source files.</p>

      <h2>8. Production Implementation: Multi-Language Diff Scripts</h2>
      <h3>Python 3 (difflib)</h3>
      <pre><code>{`import difflib

doc_a = """import os
import sys
def run():
    print("Version 1.0")
""".splitlines(keepends=True)

doc_b = """import os
import sys
import hashlib
def run():
    print("Version 2.0 with Hashing")
""".splitlines(keepends=True)

# Generate unified diff
diff = difflib.unified_diff(doc_a, doc_b, fromfile='doc_a.py', tofile='doc_b.py')
print(''.join(diff))`}</code></pre>

      <h3>cURL / Linux CLI: Diffing Remote Endpoints</h3>
      <pre><code>{`# Compare headers between two remote staging and production API servers:
diff -u &lt;(curl -sI https://api-staging.devxtool.me) &lt;(curl -sI https://api.devxtool.me)`}</code></pre>

    
      <h2>9. Architectural Deep Dive: Git Merge Conflict Resolution Mechanics</h2>
      <p>Understanding how text comparators function illuminates the core mechanics of modern version control systems like Git. When two developers independently edit the same file, Git performs a <strong>Three-Way Merge</strong>:</p>
      <ul>
        <li><strong>Ancestor (Base):</strong> The common commit from which both branches diverged.</li>
        <li><strong>Ours (Current Branch):</strong> The edits introduced on your active working branch.</li>
        <li><strong>Theirs (Incoming Branch):</strong> The edits introduced on the branch being merged.</li>
      </ul>

      <p>Git executes Myers diff between <em>Base</em> and <em>Ours</em>, and simultaneously between <em>Base</em> and <em>Theirs</em>. If a line was modified in <em>Ours</em> but untouched in <em>Theirs</em>, Git applies the change automatically. A <strong>merge conflict</strong> is triggered strictly when both branches introduce non-identical modifications to the exact same hunk of lines relative to the base ancestor.</p>

    
      <h2>10. Diffing Strategies for Structured Data (JSON & ASTs)</h2>
      <p>While line-based diff algorithms like Myers excel at plain text and code repositories, they frequently struggle with re-ordered JSON objects or formatted code where only whitespace or property ordering changed without semantic impact.</p>

      <p>Modern compilers and code formatters utilize <strong>Abstract Syntax Tree (AST) Diffing</strong>:</p>
      <ul>
        <li>Parse text into hierarchical semantic syntax nodes.</li>
        <li>Compare node structures rather than raw line strings.</li>
        <li>Detect variable renames, function re-orderings, and refactorings with zero false positives.</li>
      </ul>

    
      <h2>11. Semantic and Token-Aware Diffing in CI/CD Code Review Tools</h2>
      <p>Modern developer platforms (such as GitHub, GitLab, and Gerrit) enhance standard Myers line diffs with <strong>token-level intra-line highlighting</strong>. When a developer refactors a function name or corrects a typographical error inside a 500-word paragraph, traditional diff tools mark the entire line as deleted and replaced.</p>
      <p>By executing a secondary token diff pass over paired deletion and insertion lines, CI/CD tools highlight the exact characters that changed within the line, reducing code review fatigue and accelerating software delivery cycles.</p>

    
      <h2>12. Performance Optimization for Large File Comparisons (100,000+ Lines)</h2>
      <p>When running text diffs on huge documents (such as database SQL dumps, logs, or large bundle outputs), naive implementations exhaust browser memory. In production web applications, several optimization techniques are employed:</p>
      <ul>
        <li><strong>Hash Pre-Filtering:</strong> Before running the edit graph, replace each distinct line string with a 32-bit or 64-bit numerical integer hash. Comparing integers in memory is orders of magnitude faster than evaluating string equality repeatedly across array loops.</li>
        <li><strong>Common Prefix and Suffix Trimming:</strong> Most text edits occur inside specific blocks. By scanning from the beginning and end of both files to trim identical lines, the comparison problem reduces from comparing the full files to diffing only the modified middle slice.</li>
        <li><strong>Heuristic Early Exit (Patience Diff):</strong> If edit distance <code>D</code> exceeds a configured threshold, switch to the <em>Patience Diff</em> algorithm (which matches only unique lines first) to avoid quadratic worst-case slowdowns.</li>
      </ul>

    </GuideArticle>
  );
}
