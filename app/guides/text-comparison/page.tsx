import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';

export const metadata: Metadata = {
  title: 'How to Compare Two Text Files: Diff Algorithms & Best Practices',
  description: 'Understand line-by-line diffs, Myers diff algorithm, Longest Common Subsequence (LCS), unified diff formats, and how code version control tracks modifications.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="text-comparison"
      title="How to Compare Two Text Files"
      description="Explore the science of text comparison, diff algorithms, patch formats, and how developers inspect software revisions effectively."
    >
      <h2>The Fundamentals of Text Differencing</h2>
      <p>Text differencing (computing a "diff") is the algorithmic process of comparing two versions of a document, file, or string to calculate the minimum set of edit operations required to transform the original into the updated version. First popularized by Douglas McIlroy's 1974 Unix <code>diff</code> utility, text comparison is the foundational engine behind modern version control systems like Git, Mercurial, and Subversion.</p>

      <h2>The Longest Common Subsequence (LCS) Problem</h2>
      <p>At the mathematical core of most diff utilities lies the <em>Longest Common Subsequence</em> problem. Given two sequences of text lines, the algorithm seeks the longest ordered sequence of lines that appear in both files without reordering:</p>
      <ul>
        <li>Lines present in the original file but absent from the LCS are flagged as <strong>deletions</strong> (displayed with a minus <code>-</code> prefix, traditionally highlighted in red).</li>
        <li>Lines present in the modified file but absent from the LCS are marked as <strong>insertions</strong> (displayed with a plus <code>+</code> prefix, highlighted in green).</li>
        <li>Lines existing in both files without change are designated as <strong>context</strong> lines.</li>
      </ul>

      <h2>The Myers Diff Algorithm</h2>
      <p>Eugene W. Myers published a breakthrough paper in 1986 detailing an O(ND) time and space algorithm that models text differencing as finding the shortest path through an edit graph. Because of its exceptional speed and minimal memory footprint, the Myers algorithm remains the default diff algorithm inside Git and most developer tooling.</p>

      <h2>Practical Diffing Techniques for Developers</h2>
      <ol>
        <li><strong>Normalize Line Endings:</strong> Discrepancies between Unix line breaks (<code>
</code> / LF) and Windows line breaks (<code>
</code> / CRLF) can cause an entire file to register as changed. Always ensure your editor or diff tool standardizes line terminators before comparing.</li>
        <li><strong>Ignore Trailing Whitespace:</strong> Stray spaces at the end of lines often clutter diffs without impacting code execution. Configure diff tools to trim trailing spaces.</li>
        <li><strong>Use Semantic Comparisons for Structured Data:</strong> For JSON or XML documents, property ordering can vary without altering data semantics. Use specialized JSON diff tools or format both files with identical indentation before computing text diffs.</li>
      </ol>
    </GuideArticle>
  );
}
