import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact DevToolbox — Feedback, Support & Bug Reports',
  description: 'Get in touch with the DevToolbox team for technical questions, bug reports, feature requests, or partnership inquiries.',
};

export default function Contact() {
  return (
    <main className="section">
      <div className="container">
        <article className="article">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-.05em]">We Value Your Feedback</h1>
          <p className="mt-5 text-lg leading-8 text-[#667085]">
            Whether you have spotted an error in one of our guides, experienced an issue with a conversion tool, or have a suggestion for a utility you would like us to build, we would love to hear from you.
          </p>

          <div className="my-8 rounded-2xl border border-[#e6e8ef] bg-[#f2fbf9] p-6">
            <h2 className="!mt-0">Direct Email Support</h2>
            <p className="text-[#475467]">
              You can contact our engineering and editorial team directly at:
            </p>
            <p className="mt-2 text-lg font-bold text-[#0d9488]">
              <a href="mailto:contact@devxtool.me" className="hover:underline">contact@devxtool.me</a>
            </p>
            <p className="mt-2 text-xs text-[#667085]">
              We aim to review and respond to inquiries within 1 to 2 business days.
            </p>
          </div>

          <h2>How to Submit a Helpful Bug Report</h2>
          <p>When reporting a reproducible issue with any of our tools, including the following details helps us diagnose and deploy fixes quickly:</p>
          <ul>
            <li><strong>Tool Name:</strong> The specific URL or utility page where the issue occurred.</li>
            <li><strong>Operating System & Browser:</strong> Your browser version (Chrome, Firefox, Safari, Edge) and OS.</li>
            <li><strong>Sample Input (Sanitized):</strong> A sanitized snippet of the text or code that caused the unexpected output. <em>Please remove any confidential credentials or private tokens before sending.</em></li>
            <li><strong>Observed vs. Expected Behavior:</strong> What actually occurred, and what you anticipated seeing.</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
