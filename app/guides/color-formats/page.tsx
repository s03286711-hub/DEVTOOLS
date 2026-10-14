import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';

export const metadata: Metadata = {
  title: 'HEX, RGB and HSL Colors Explained for Web Developers',
  description: 'Master digital color models for web design. Learn the differences between HEX, RGB, RGBA, and HSL, and discover how to calculate WCAG color contrast ratios.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="color-formats"
      title="HEX, RGB and HSL Colors Explained for Web Developers"
      description="Master digital color models for web design. Learn the differences between HEX, RGB, RGBA, and HSL, and discover how to calculate WCAG color contrast ratios."
    >
      <h2>The Science of Digital Color</h2>
<p>Computer monitors and smartphone displays emit color using the additive color model, combining Red, Green, and Blue light. In web development, CSS provides several complementary syntaxes to instruct screens on how much intensity to emit for each color channel.</p>

<h2>1. HEX Color Codes (#RRGGBB)</h2>
<p>HEX notation represents RGB color channels in hexadecimal base-16 format (ranging from <code>00</code> for 0 intensity up to <code>FF</code> for 255 maximum intensity):</p>
<ul>
  <li><code>#ff0000</code>: Pure red (Red: 255, Green: 0, Blue: 0).</li>
  <li><code>#00ff00</code>: Pure green.</li>
  <li><code>#0000ff</code>: Pure blue.</li>
  <li><code>#ffffff</code>: White (all channels at full intensity).</li>
  <li><code>#000000</code>: Black (all channels off).</li>
</ul>
<p>You can also supply an optional 8-digit HEX code (<code>#RRGGBBAA</code>) where the last two digits denote alpha transparency.</p>

<h2>2. RGB and RGBA Notation</h2>
<p>RGB explicitly specifies decimal values between 0 and 255 for each channel:</p>
<pre><code>/* Standard decimal syntax */
color: rgb(13, 148, 136);

/* With alpha channel in modern CSS */
background-color: rgb(13 148 136 / 85%);</code></pre>

<h2>3. HSL (Hue, Saturation, Lightness)</h2>
<p>While HEX and RGB describe color from the hardware perspective of light emitters, HSL models color intuitively as perceived by human vision:</p>
<ul>
  <li><strong>Hue (0&deg; to 360&deg;):</strong> The angle on the standard color wheel (0&deg; is Red, 120&deg; is Green, 240&deg; is Blue).</li>
  <li><strong>Saturation (0% to 100%):</strong> Color intensity (0% is completely grayscale, 100% is vibrant).</li>
  <li><strong>Lightness (0% to 100%):</strong> Brightness (0% is pure black, 50% is normal balance, 100% is pure white).</li>
</ul>
<p>HSL makes creating consistent UI hover states and accessible color palettes effortless: to create a darker button hover state, simply decrement the lightness percentage without altering the hue or saturation.</p>

<h2>WCAG Accessibility & Text Contrast Ratios</h2>
<p>Ensuring readable text contrast is a legal and moral requirement for modern web applications under the Web Content Accessibility Guidelines (WCAG 2.1):</p>
<ul>
  <li><strong>Level AA Standard:</strong> Requires a minimum contrast ratio of <strong>4.5:1</strong> for body text and <strong>3.0:1</strong> for headlines (18pt or 14pt bold).</li>
  <li><strong>Level AAA Enhanced:</strong> Demands <strong>7.0:1</strong> for body text and <strong>4.5:1</strong> for large text.</li>
</ul>
<p>Use our interactive Color Converter tool to test contrast ratios against both light and dark backgrounds instantly.</p>
    </GuideArticle>
  );
}
