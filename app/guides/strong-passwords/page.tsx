import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';
import EmbeddedTool from '@/components/EmbeddedTool';
import { PasswordTool } from '@/components/NewTools';

export const metadata: Metadata = {
  title: 'The Engineering of Strong Passwords: NIST SP 800-63B Guidelines, Shannon Entropy, and Modern Credential Defense',
  description: 'A complete 1,200+ word guide to password security and entropy. Explore brute-force mathematics, passphrases vs random character strings, credential stuffing defense, and password manager design.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="strong-passwords"
      title="The Engineering of Strong Passwords: NIST SP 800-63B Guidelines, Shannon Entropy, and Modern Credential Defense"
      description="A complete 1,200+ word guide to password security and entropy. Explore brute-force mathematics, passphrases vs random character strings, credential stuffing defense, and password manager design."
    >

      <h2>1. The Mathematics of Password Entropy</h2>
      <p>Password security is governed by Shannon entropy measured in bits: <code>E = L * log2(R)</code>. A 16-character alphanumeric passphrase provides over 95 bits of entropy, rendering brute-force attacks mathematically impossible for modern supercomputers.</p>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="password-generator" headline="Live Password & Entropy Generator Sandbox" description="Generate high-entropy random passwords and passphrases with client-side cryptographic security."><PasswordTool /></EmbeddedTool>

      <h2>2. NIST SP 800-63B Guidelines</h2>
      <p>Modern NIST standards advise against periodic password rotations and arbitrary special character rules, recommending long passphrases and checks against breached password lists (HaveIBeenPwned API).</p>

    
      <h2>3. The Flawed Psychology of Complexity vs Length</h2>
      <p>For decades, enterprise IT security policies enforced arbitrary password rules: at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 obscure punctuation symbol (e.g., <code>P@$$w0rd1!</code>). Modern security research by NIST and cryptographers proved that these rules are counterproductive:</p>
      <ul>
        <li>Users predictably substitute obvious characters (<code>a → @</code>, <code>o → 0</code>, <code>s → $</code>), which automated dictionary crackers test instantly.</li>
        <li>Users predictably append an exclamation mark or year at the end of the word (<code>Company2026!</code>).</li>
        <li>Users write difficult-to-remember short passwords on sticky notes or reuse them across personal and work accounts.</li>
      </ul>

      <h2>4. Shannon Entropy Calculations</h2>
      <p>True cryptographic strength is determined strictly by entropy bits:</p>
      <pre><code>&#123;`Entropy (bits) = Length * log2(Character Pool Size)`&#125;</code></pre>

      <table className="w-full text-left border-collapse my-6">
        <thead>
          <tr className="border-b bg-[#f8f9fc]">
            <th className="py-3 px-3">Password Type</th>
            <th className="py-3 px-3">Pool Size</th>
            <th className="py-3 px-3">Length</th>
            <th className="py-3 px-3">Entropy Bits</th>
            <th className="py-3 px-3">Crack Time (at 10 Billion SHA-256/sec)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#b91c1c]">Simple 8-Char</td>
            <td className="py-3 px-3">26 (lowercase)</td>
            <td className="py-3 px-3">8</td>
            <td className="py-3 px-3 text-[#b91c1c]">37.6 bits</td>
            <td className="py-3 px-3 text-[#b91c1c]">0.02 seconds</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#d97706]">Complex 8-Char</td>
            <td className="py-3 px-3">94 (ASCII symbols)</td>
            <td className="py-3 px-3">8</td>
            <td className="py-3 px-3 text-[#d97706]">52.4 bits</td>
            <td className="py-3 px-3 text-[#d97706]">6.9 hours</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#059669]">16-Char Passphrase</td>
            <td className="py-3 px-3">62 (alphanumeric)</td>
            <td className="py-3 px-3">16</td>
            <td className="py-3 px-3 text-[#059669]">95.3 bits</td>
            <td className="py-3 px-3 text-[#059669]">152,000,000 Years</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#059669]">4-Word Diceware</td>
            <td className="py-3 px-3">7,776 (wordlist)</td>
            <td className="py-3 px-3">4 words</td>
            <td className="py-3 px-3 text-[#059669]">51.7 bits</td>
            <td className="py-3 px-3 text-[#059669]">Easy to remember; highly secure</td>
          </tr>
        </tbody>
      </table>

      <h2>5. Production Implementation: Cryptographically Secure Password Generator</h2>
      <h3>TypeScript (Browser Web Crypto API)</h3>
      <pre><code>{`export function generateSecurePassword(
  length: number = 20,
  includeSymbols: boolean = true
): string {{
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghijkmnopqrstuvwxyz';
  const digits = '23456789';
  const symbols = '!@#$%^&*()-_=+[]{{}};:,.&lt;&gt;?';

  const pool = upper + lower + digits + (includeSymbols ? symbols : '');
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = '';
  for (let i = 0; i &lt; length; i++) {{
    password += pool[array[i] % pool.length];
  }}
  return password;
}}`}</code></pre>

      <h3>Python 3 (secrets module)</h3>
      <pre><code>{`import secrets
import string

def generate_strong_passphrase(num_words: int = 5) → str:
    # 7,776-word EFF Large Wordlist simulation
    words = ["correct", "horse", "battery", "staple", "galaxy", "protocol", "quantum", "cipher"]
    return "-".join(secrets.choice(words) for _ in range(num_words))

print("Secure Passphrase:", generate_strong_passphrase())`}</code></pre>

      <h2>6. Frequently Asked Questions (FAQ)</h2>
      <h3>Why does NIST recommend against 90-day password expiration?</h3>
      <p>Mandatory frequent password expiration causes "password fatigue." Users make trivial sequential alterations (<code>Spring2026! → Summer2026!</code>) instead of generating high-entropy credentials.</p>

      <h3>How does credential stuffing work?</h3>
      <p>Credential stuffing is an automated attack where bots test millions of username/password pairs obtained from public corporate data breaches against other web services, exploiting user password reuse.</p>

    
      <h2>7. Modern Authentication Defense: Credential Stuffing & Breach Checking</h2>
      <p>Over 80% of corporate account takeovers are caused by <strong>credential stuffing attacks</strong>. Malicious automated bots test billions of username and password combinations dumped on the dark web from public corporate breaches against hundreds of consumer web applications.</p>
      <p>Even if an end-user creates a 16-character alphanumeric password, if they reuse that exact password across a compromised e-commerce forum and your SaaS application, an attacker will compromise their account without performing any mathematical brute-forcing.</p>

      <h2>8. The NIST SP 800-63B Authentication Standard: Key Rules</h2>
      <p>The United States National Institute of Standards and Technology (NIST) published updated authentication guidelines (SP 800-63B) that overturned decades of flawed enterprise password practices:</p>
      <ul>
        <li><strong>Abolish Periodic Password Rotations:</strong> Forcing users to change passwords every 90 days degrades security because users make predictable alterations (e.g., <code>Autumn2025! → Winter2026!</code>). Passwords should only be reset when evidence of a compromise exists.</li>
        <li><strong>Enforce Minimum Length over Arbitrary Complexity:</strong> Mandate passwords of at least 8 to 15 characters. Permit spaces and all printable Unicode characters (including emojis).</li>
        <li><strong>Automated Breach Screening (k-Anonymity):</strong> Applications must screen newly chosen passwords against known compromised password corpora (such as Troy Hunt's <em>Have I Been Pwned</em> database containing over 800 million breached credentials).</li>
      </ul>

      <h2>9. Implementing HaveIBeenPwned k-Anonymity API in TypeScript</h2>
      <pre><code>{`// Safe client-side password breach checker using SHA-1 prefix k-Anonymity
export async function isPasswordPwned(password: string): Promise&lt;number&gt; {{
  const utf8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', utf8);
  const sha1 = Array.from(new Uint8Array(hashBuffer))
    .map(b ⇒ b.toString(16).toUpperCase().padStart(2, '0'))
    .join('');

  const prefix = sha1.substring(0, 5);
  const suffix = sha1.substring(5);

  // Send only the first 5 characters to the API (Zero Knowledge!)
  const response = await fetch(\`https://api.pwnedpasswords.com/range/\${{prefix}}\`);
  const text = await response.text();

  const lines = text.split('\n');
  for (const line of lines) {{
    const [hashSuffix, count] = line.trim().split(':');
    if (hashSuffix === suffix) {{
      return parseInt(count, 10); // Number of times breached in public dumps!
    }}
  }}
  return 0; // Safe: 0 public breaches detected
}}`}</code></pre>

    
      <h2>10. Architectural Threat Modeling: How Hackers Crack Passwords</h2>
      <p>To design truly resilient password policies, software engineers must understand the exact hardware workflows and mathematical models used by security researchers and criminal adversaries:</p>

      <h3>1. Mask and Rule-Based Attacks (Hashcat)</h3>
      <p>Modern password cracking software (such as <em>Hashcat</em> and <em>John the Ripper</em>) does not test characters blindly. Instead, they apply sophisticated statistical heuristics derived from billions of leaked credentials. For instance, Hashcat applies rules like <code>c</code> (capitalize first letter), <code>$!</code> (append exclamation), and <code>sa@</code> (substitute 'a' with '@'). An 8-character password following these human patterns is cracked in less than a second regardless of character variety.</p>

      <h3>2. GPU-Accelerated Mass Parallelism</h3>
      <p>A specialized password cracking rig containing eight NVIDIA GeForce RTX 4090 GPUs can compute over <strong>200 billion NTLM hashes per second</strong> and over <strong>25 billion SHA-256 hashes per second</strong>. A random 8-character password across all 95 ASCII keys has <code>95^8 ≈ 6.6 × 10^15</code> permutations. An attacker can search the entire keyspace in under 4.4 hours.</p>

      <h3>3. Why 16+ Characters Completely Breaks the Attacker's Budget</h3>
      <p>When the password length is expanded to 16 characters, the search space balloons to <code>95^16 ≈ 4.4 × 10^31</code> permutations. Even with a dedicated supercomputer computing 1 trillion hashes every second, searching the keyspace requires <strong>over 1.39 billion years</strong>. Length is mathematically unbeatable.</p>

    </GuideArticle>
  );
}
