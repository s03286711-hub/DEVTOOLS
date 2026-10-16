import type { Metadata } from 'next';
import ToolShell from '@/components/ToolShell';
import { TextDiff } from '@/components/Tools';

export const metadata: Metadata = {
  title: 'Private Text & Code Diff Checker (100% In-Browser Comparison) — DevX Tool',
  description: 'Compare source code, API responses, or documents side-by-side. Uses the Myers diff algorithm directly inside your browser so sensitive proprietary code never leaves your computer.',
  keywords: ['private text diff checker', 'offline code comparison tool', 'compare two files locally', 'browser side text difference', 'confidential diff tool'],
};

export default function Page() {
  return (
    <ToolShell
      slug="text-diff"
      title="Text Diff Checker"
      description="Compare two text blocks side-by-side to detect additions, deletions, and modifications. Fast, secure, and browser-based."
    >
      <TextDiff />
      <section className="article mt-12">
        <h2>What Is a Text Diff Checker?</h2>
        <p>A text diff checker is a comparison tool that evaluates two versions of a document, source code file, or text block to isolate changes between them. By juxtaposing the "original" reference text with the "modified" revision, developers, editors, and writers can pinpoint exact line differences, additions, and removals without tedious manual inspection.</p>

        <h2>How to Compare Text Using This Utility</h2>
        <ol>
          <li><strong>Enter Original Text:</strong> Paste your initial reference document into the left-hand text area.</li>
          <li><strong>Enter Modified Text:</strong> Paste your updated version into the right-hand text area.</li>
          <li><strong>Click "Compare text":</strong> The utility generates a side-by-side visual analysis highlighting matching lines in neutral tones, deleted lines in red, and newly inserted lines in green.</li>
          <li><strong>Copy Diff Summary:</strong> Click "Copy summary" to export an annotated text log of all differences for Git commit notes, pull requests, or audit records.</li>
        </ol>

        <h2>Common Use Cases for Text Differences</h2>
        <ul>
          <li><strong>Code Review & Debugging:</strong> Quickly comparing snippets of code or configuration files (YAML, JSON, INI) between staging and production environments to diagnose regressions.</li>
          <li><strong>Legal & Contract Revisions:</strong> Verifying edits across contract versions to ensure no clauses were unexpectedly removed or altered.</li>
          <li><strong>Copywriting & Content Editing:</strong> Reviewing editorial revisions made by teammates before publishing articles or documentation.</li>
          <li><strong>Database SQL Queries:</strong> Checking queries across migrations to catch missing clauses or updated columns.</li>
        </ul>

        <h2>Privacy & Confidentiality</h2>
        <p>Document comparison is computed locally within your browser sandbox. None of the text you enter is sent over the network, ensuring complete privacy for proprietary source code, legal agreements, and internal documentation.</p>
      </section>
    </ToolShell>
  );
}
