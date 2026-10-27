import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'Our commitment to data protection, client-side processing, Google AdSense compliance, and cookie management.',
  path: '/privacy',
});

export default function Privacy() {
  return (
    <main className="section">
      <div className="container">
        <article className="article">
          <p className="eyebrow">Legal & Compliance</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-.05em]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-[#667085]">Effective Date: October 14, 2026</p>

          <p className="mt-5 leading-8 text-[#667085]">
            At DevX Tool (accessible via devxtool.me), the privacy of our visitors is one of our primary priorities. This Privacy Policy document outlines the types of information collected and how it is used.
          </p>

          <h2>1. Client-Side Tool Processing</h2>
          <p>
            Our developer tools (including the JSON Formatter, Text Diff Checker, Base64 Encoder/Decoder, URL Encoder/Decoder, Regex Tester, UUID Generator, SHA Hash Generator, JWT Decoder, Timestamp Converter, Password Generator, and Color Converter) are architected to perform computations entirely client-side within your browser sandbox.
          </p>
          <p>
            The text, code, tokens, or inputs you paste into these tools are <strong>never transmitted to our servers</strong>, logged in application databases, or shared with third parties.
          </p>

          <h2>2. Log Files & Web Hosting</h2>
          <p>
            Like most standard web hosting environments, our servers and content delivery networks (CDNs) automatically log visitors when they access the site. These logs may record internet protocol (IP) addresses, browser user-agent strings, referring/exit pages, timestamps, and page click counts. These logs are utilized strictly for platform reliability, DDoS mitigation, and diagnostic operations, and are not linked to personally identifiable information.
          </p>

          <h2>3. Cookies and Advertising Partners</h2>
          <p>
            We partner with third-party advertising networks, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website.
          </p>
          <ul>
            <li>Google, as a third-party vendor, uses cookies to serve ads on DevX Tool.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to this site and other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting Google's <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-[#0d9488] underline">Ads Settings</a>. Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#0d9488] underline">aboutads.info</a>.</li>
          </ul>

          <h2>4. Third-Party Links</h2>
          <p>
            DevX Tool may contain links to external reference documentation (such as RFC specifications, W3C standards, or official developer portals). We are not responsible for the privacy practices or content of third-party destinations.
          </p>

          <h2>5. Children's Information</h2>
          <p>
            DevX Tool does not knowingly collect any Personal Identifiable Information from children under the age of 13.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have questions about our Privacy Policy or data handling practices, please contact us at <a href="mailto:contact@devxtool.me" className="text-[#0d9488] underline">contact@devxtool.me</a>.
          </p>
        </article>
      </div>
    </main>
  );
}
