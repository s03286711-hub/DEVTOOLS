import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About DevToolbox — Mission & Privacy-First Developer Tools',
  description: 'Learn about DevToolbox, our commitment to client-side data privacy, and our mission to provide lightning-fast web developer utilities.',
};

export default function About() {
  return (
    <main className="section">
      <div className="container">
        <article className="article">
          <p className="eyebrow">About DevToolbox</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-.05em]">Fast, Free, and Privacy-Conscious Developer Utilities</h1>
          <p className="mt-5 text-lg leading-8 text-[#667085]">
            DevToolbox was built with a straightforward mission: eliminate friction from repetitive developer workflows by providing clean, fast, and secure web-based utilities that respect user privacy.
          </p>

          <h2>Why We Built DevToolbox</h2>
          <p>
            Every software engineer, system administrator, and web developer encounters the same routine tasks daily: formatting an API JSON payload, comparing configuration diffs, encoding URL query strings, checking regular expressions, or converting timestamps.
          </p>
          <p>
            Unfortunately, many online tool websites are bloated with intrusive popups, sluggish tracking scripts, and questionable privacy models where sensitive payload data is silently forwarded to remote servers. DevToolbox provides a clean, modern alternative built on local client-side execution.
          </p>

          <h2>Our Core Engineering Principles</h2>
          <ol>
            <li><strong>Browser-First Privacy:</strong> Wherever technically possible, data transformations are executed locally in your browser sandbox using modern Web APIs (such as the Web Crypto API, native JSON parser, and TextEncoder/TextDecoder). Your code, logs, and tokens never touch our backend servers.</li>
            <li><strong>Zero Artificial Paywalls:</strong> Every tool and technical guide on DevToolbox is 100% free with no account creation, credit cards, or subscription tiers required.</li>
            <li><strong>Educational Clarity:</strong> Beyond simply producing an output, each utility includes detailed reference guides explaining the underlying protocols, RFC specifications, and common pitfalls.</li>
          </ol>

          <h2>Get in Touch</h2>
          <p>
            We are actively expanding our collection of developer tools. If you have recommendations for new features, have identified a bug, or want to suggest improvements to our technical guides, please reach out via our <Link href="/contact" className="text-[#0d9488] font-bold underline">Contact Page</Link>.
          </p>
        </article>
      </div>
    </main>
  );
}
