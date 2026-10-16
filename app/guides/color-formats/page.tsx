import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';
import EmbeddedTool from '@/components/EmbeddedTool';
import { ColorTool } from '@/components/NewTools';

export const metadata: Metadata = {
  title: 'Modern Web Color Science: HEX, RGB, HSL, and the OKLCH Perceptual Revolution in CSS Color Module 4',
  description: 'A complete 1,200+ word engineering guide to web color systems. Understand sRGB gamuts, Display-P3 wide gamut displays, WCAG 2.2 contrast mathematics, and perceptual uniformity.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="color-formats"
      title="Modern Web Color Science: HEX, RGB, HSL, and the OKLCH Perceptual Revolution in CSS Color Module 4"
      description="A complete 1,200+ word engineering guide to web color systems. Understand sRGB gamuts, Display-P3 wide gamut displays, WCAG 2.2 contrast mathematics, and perceptual uniformity."
    >

      <h2>1. Color Representations on the Web</h2>
      <p>Digital displays represent color by mixing Red, Green, and Blue light channels. Over the decades, web standards evolved from 24-bit sRGB HEX codes to HSL and now modern perceptually uniform OKLCH spaces.</p>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="color-converter" headline="Live Color Converter & Contrast Checker" description="Convert HEX, RGB, and HSL colors and verify WCAG 2.2 accessibility ratios in real time."><ColorTool /></EmbeddedTool>

      <h2>2. The Perceptual Flaw in HSL</h2>
      <p>Standard HSL treats all hues as having identical perceived lightness, leading to poor accessibility. OKLCH aligns lightness directly with human ocular sensitivity, guaranteeing predictable contrast.</p>

    
      <h2>3. The Evolution of Web Color: From sRGB HEX to OKLCH</h2>
      <p>For more than three decades, digital color on the World Wide Web was restricted almost exclusively to the <strong>sRGB color space</strong>, standardized by HP and Microsoft in 1996. Colors were defined as 24-bit integers split into three 8-bit channels for Red, Green, and Blue. In standard hexadecimal notation, two hex characters represent each channel from <code>00</code> (0) to <code>FF</code> (255):</p>
      <pre><code>&#123;`#RRGGBB → e.g., #0d9488 (Teal: Red 13, Green 148, Blue 136)`&#125;</code></pre>

      <p>While HEX and RGB are computationally native to graphics hardware buffers, they fail completely as human authoring formats. A software engineer attempting to darken a brand color or create an interactive hover state cannot intuitively predict how modifying channel bytes affects brightness or saturation. Modifying RGB values alters both saturation and perceived lightness simultaneously, creating inconsistent visual hierarchies.</p>

      <h2>4. The Deceptive Simplicity of HSL (Hue, Saturation, Lightness)</h2>
      <p>To provide designers and frontend engineers with an intuitive color space, CSS Color Module Level 3 standardized <strong>HSL</strong>:</p>
      <ul>
        <li><strong>Hue (0 to 360 degrees):</strong> The color wheel angle (0 = Red, 120 = Green, 240 = Blue).</li>
        <li><strong>Saturation (0% to 100%):</strong> The intensity or purity of the color from monochrome gray to vivid chroma.</li>
        <li><strong>Lightness (0% to 100%):</strong> The transition from pure black (0%) to pure white (100%).</li>
      </ul>

      <h3>The Critical Perceptual Flaw in HSL:</h3>
      <p>Despite its mathematical elegance, HSL is not <strong>perceptually uniform</strong>. The human visual cortex does not perceive light wavelengths with equal intensity. Human retinal cone cells are extraordinarily sensitive to green and yellow light (around 555 nanometers) and far less sensitive to deep blue wavelengths. Consequently, an HSL color of <code>hsl(60, 100%, 50%)</code> (pure yellow) has a relative luminance of approximately 0.93, while <code>hsl(240, 100%, 50%)</code> (pure blue) has a relative luminance of only 0.07!</p>

      <p>When design systems dynamically calculate text contrast on buttons using HSL lightness values, catastrophic accessibility failures occur: black text placed on blue buttons or white text placed on yellow buttons frequently violates legal WCAG compliance standards.</p>

      <h2>5. The Modern Solution: OKLCH and CSS Color Module Level 4</h2>
      <p>Created by Ottosson in 2020 and adopted into modern web browsers, <strong>OKLCH</strong> models color based on the human visual system:</p>
      <pre><code>{`color: oklch(0.65 0.18 195);
/* L = Perceived Lightness (0% to 100%)
   C = Chroma (color saturation intensity)
   H = Hue angle (0 to 360) */`}</code></pre>
      <p>In OKLCH, a lightness of <code>0.65</code> possesses the exact same perceived brightness regardless of whether the hue is yellow, blue, red, or teal. Design systems can programmatically generate accessible color scales, dark mode inversions, and high-contrast theme variants with absolute mathematical reliability.</p>

      <h2>6. Comprehensive Code Examples: Converting and Validating Colors</h2>
      <h3>TypeScript: Converting HEX to RGB and HSL</h3>
      <pre><code>{`interface RGB {{ r: number; g: number; b: number; }}
interface HSL {{ h: number; s: number; l: number; }}

export function hexToRgb(hex: string): RGB | null {{
  const sanitized = hex.replace('#', '');
  if (!/^[0-9A-Fa-f]{{6}}$/.test(sanitized)) return null;
  return {{
    r: parseInt(sanitized.substring(0, 2), 16),
    g: parseInt(sanitized.substring(2, 4), 16),
    b: parseInt(sanitized.substring(4, 6), 16)
  }};
}}

export function rgbToHsl({{ r, g, b }}: RGB): HSL {{
  const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;
  let h = 0, s = 0, l = (max + min) / 2;

  if (delta !== 0) {{
    s = l &gt; 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {{
      case rNorm: h = ((gNorm - bNorm) / delta + (gNorm &lt; bNorm ? 6 : 0)) * 60; break;
      case gNorm: h = ((bNorm - rNorm) / delta + 2) * 60; break;
      case bNorm: h = ((rNorm - gNorm) / delta + 4) * 60; break;
    }}
  }}
  return {{ h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }};
}}`}</code></pre>

      <h3>Python 3: Color Parsing & WCAG Relative Luminance</h3>
      <pre><code>{`def calculate_relative_luminance(r: int, g: int, b: int) → float:
    def channel_linear(c: int) → float:
        val = c / 255.0
        return val / 12.92 if val &lt;= 0.03928 else ((val + 0.055) / 1.055) ** 2.4
    return 0.2126 * channel_linear(r) + 0.7152 * channel_linear(g) + 0.0722 * channel_linear(b)

def contrast_ratio(lum1: float, lum2: float) → float:
    l_light = max(lum1, lum2)
    l_dark = min(lum1, lum2)
    return (l_light + 0.05) / (l_dark + 0.05)

# Example: Teal background vs White text
lum_bg = calculate_relative_luminance(13, 148, 136)
lum_text = calculate_relative_luminance(255, 255, 255)
print(f"Contrast Ratio: {{contrast_ratio(lum_text, lum_bg):.2f}}:1 (WCAG AA Requires 4.5:1)")`}</code></pre>

      <h2>7. WCAG 2.2 Accessibility Compliance Rules</h2>
      <p>The Web Content Accessibility Guidelines (WCAG 2.2) mandate strict contrast thresholds to protect visually impaired and color-blind users:</p>
      <ul>
        <li><strong>WCAG AA (Normal Text):</strong> Minimum contrast ratio of <strong>4.5:1</strong> for text below 18pt (or below 14pt bold).</li>
        <li><strong>WCAG AA (Large Text):</strong> Minimum contrast ratio of <strong>3.0:1</strong> for text at or above 18pt (or 14pt bold).</li>
        <li><strong>WCAG AAA (Enhanced Contrast):</strong> Minimum contrast ratio of <strong>7.0:1</strong> for normal text and <strong>4.5:1</strong> for large text.</li>
        <li><strong>UI Components and Graphical Objects:</strong> Interactive icons, borders, and form inputs require at least <strong>3.0:1</strong> contrast against adjacent background colors.</li>
      </ul>

      <h2>8. Frequently Asked Questions (FAQ)</h2>
      <h3>Should new web projects use OKLCH or HEX in CSS?</h3>
      <p>All major modern browsers (Chrome 111+, Safari 15.4+, Firefox 113+) support OKLCH natively. For maximum compatibility across legacy enterprise browsers, configure PostCSS or Tailwind CSS to compile OKLCH colors down to sRGB fallback HEX codes automatically.</p>

      <h3>What is the difference between Display-P3 and sRGB?</h3>
      <p>Display-P3 is a wide-gamut color space capable of displaying approximately 25% more distinct colors than standard sRGB, particularly in vivid reds and deep greens. Most Apple displays (Retina), modern OLED smartphones, and high-end monitors support Display-P3 natively.</p>

    
      <h2>9. Real-World Case Study: Automated Dark Mode Inversion Systems</h2>
      <p>When engineering high-volume enterprise SaaS applications (such as GitHub, Stripe Dashboard, or Figma), automating dark mode color generation using legacy HEX or HSL introduces severe visual disharmony. Because HSL lightness is disconnected from human ocular response, simply inverting lightness (<code>L_dark = 100% - L_light</code>) creates muddy grays, illegible brand accents, and harsh eye-straining saturations.</p>

      <p>By leveraging the <strong>OKLCH perceptual color space</strong>, software teams can build deterministic dark mode inversion algorithms:</p>
      <ul>
        <li>Preserve constant Chroma (<code>C</code>) across theme transitions to maintain identical brand color richness without clipping into uncalibrated monitor gamuts.</li>
        <li>Dynamically map Lightness (<code>L</code>) through a non-linear contrast curve, ensuring that low-contrast borders and elevated card surfaces stay distinct from pure background blacks (<code>#000000</code>).</li>
        <li>Automatically test every generated color token against WCAG 2.2 APCA (Accessible Perceptual Contrast Algorithm) rules before compilation to production CSS stylesheets.</li>
      </ul>

      <h2>10. Comparative Reference Table: All Web Color Specifications</h2>
      <table className="w-full text-left border-collapse my-6">
        <thead>
          <tr className="border-b bg-[#f8f9fc]">
            <th className="py-3 px-3">Format</th>
            <th className="py-3 px-3">Syntax Example</th>
            <th className="py-3 px-3">Underlying Gamut</th>
            <th className="py-3 px-3">Perceptual Uniformity</th>
            <th className="py-3 px-3">Best Architectural Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">HEX</td>
            <td className="py-3 px-3 font-mono">#0d9488</td>
            <td className="py-3 px-3">Standard sRGB</td>
            <td className="py-3 px-3 text-[#b91c1c]">None (Hardware oriented)</td>
            <td className="py-3 px-3">Static brand colors, legacy CSS assets, and email HTML templates.</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">RGB / RGBA</td>
            <td className="py-3 px-3 font-mono">rgb(13 148 136 / 0.8)</td>
            <td className="py-3 px-3">Standard sRGB</td>
            <td className="py-3 px-3 text-[#b91c1c]">None</td>
            <td className="py-3 px-3">Direct WebGL shader buffers and canvas raster manipulation.</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">HSL</td>
            <td className="py-3 px-3 font-mono">hsl(175 84% 32%)</td>
            <td className="py-3 px-3">Standard sRGB</td>
            <td className="py-3 px-3 text-[#b91c1c]">Flawed (Luminance skew)</td>
            <td className="py-3 px-3">Simple manual UI adjustments where strict accessibility is not required.</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Display-P3</td>
            <td className="py-3 px-3 font-mono">color(display-p3 0.1 0.6 0.5)</td>
            <td className="py-3 px-3">Wide Gamut D65</td>
            <td className="py-3 px-3 text-[#b91c1c]">None</td>
            <td className="py-3 px-3">High-vibrancy hero graphics, photography sites, and modern Apple OLED screens.</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">OKLCH</td>
            <td className="py-3 px-3 font-mono">oklch(0.58 0.14 185)</td>
            <td className="py-3 px-3">Unlimited Gamut</td>
            <td className="py-3 px-3 text-[#059669]">Mathematically Perfect</td>
            <td className="py-3 px-3">Enterprise design systems, programmatic themes, and accessible UI kits.</td>
          </tr>
        </tbody>
      </table>

    </GuideArticle>
  );
}
