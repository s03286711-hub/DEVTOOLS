import type { Metadata } from 'next';
import ToolShell from '@/components/ToolShell';
import { ColorTool } from '@/components/NewTools';

export const metadata: Metadata = {
  title: 'Client-Side Color Converter & WCAG Contrast Checker — DevX Tool',
  description: 'Convert HEX, RGB, and HSL values instantly with real-time WCAG 2.1 AAA accessibility contrast analysis. Operates 100% in-browser with zero latency.',
  keywords: ['client-side color converter', 'wcag contrast checker offline', 'convert hex to rgb private', 'browser color space calculator', 'accessible text contrast tool'],
};

export default function Page() {
  return (
    <ToolShell
      slug="color-converter"
      title="Color Converter & Contrast Checker"
      description="Convert color formats and test accessibility contrast compliance."
    >
      <ColorTool />
      <section className="article mt-12">
        <h2>Understanding Web Color Formats</h2>
<p>Modern web development relies on several color models to define visual styling across CSS, graphics, and design systems:</p>
<ul>
  <li><strong>HEX (#RRGGBB):</strong> A 6-character hexadecimal notation representing the red, green, and blue color channels from 00 to FF (0 to 255).</li>
  <li><strong>RGB (rgb(r, g, b)):</strong> Specifies color as decimal values between 0 and 255 for Red, Green, and Blue light mixing.</li>
  <li><strong>HSL (hsl(h, s%, l%)):</strong> Represents Hue (0-360 degrees on the color wheel), Saturation (0% to 100%), and Lightness (0% to 100%). HSL is intuitive for creating accessible color palettes, shades, and tints.</li>
</ul>

<h2>WCAG Text Contrast Guidelines</h2>
<p>The Web Content Accessibility Guidelines (WCAG 2.1) require sufficient contrast between text and background colors to ensure readability for users with low vision or color vision deficiencies:</p>
<ul>
  <li><strong>WCAG AA (Normal Text):</strong> Minimum contrast ratio of <strong>4.5:1</strong>.</li>
  <li><strong>WCAG AA (Large Text):</strong> Minimum contrast ratio of <strong>3.0:1</strong> (for text 18pt or 14pt bold).</li>
  <li><strong>WCAG AAA (Enhanced):</strong> Minimum contrast ratio of <strong>7.0:1</strong> for normal text and <strong>4.5:1</strong> for large text.</li>
</ul>
<p>Use the contrast preview on this page to test text visibility against dark and light backgrounds before applying styles to your website.</p>
      </section>
    </ToolShell>
  );
}
