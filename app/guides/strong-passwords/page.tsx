import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';

export const metadata: Metadata = {
  title: 'How to Create Strong Passwords: The Science of Entropy',
  description: 'Learn how modern attackers crack passwords with GPU rigs, how to calculate password entropy, why length beats complexity, and how to stay secure.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="strong-passwords"
      title="How to Create Strong Passwords: The Science of Entropy"
      description="Learn how modern attackers crack passwords with GPU rigs, how to calculate password entropy, why length beats complexity, and how to stay secure."
    >
      <h2>The Reality of Modern Password Cracking</h2>
<p>Many users still create passwords by substituting letters with symbols (e.g., replacing 'E' with '3' or 'A' with '@') and appending an exclamation mark. To human memory this feels clever, but to modern password-cracking software like Hashcat or John the Ripper running on GPU arrays, these rule-based permutations are tested within milliseconds.</p>
<p>A single dedicated modern cracking rig equipped with high-end GPUs can compute over 100 billion NTLM or SHA-1 hashes every single second. Under this level of computing throughput, character complexity rules provide far less security than sheer password length.</p>

<h2>Understanding Information Entropy</h2>
<p>Password entropy is the measure of uncertainty or randomness in a password, expressed in bits. It is calculated using the formula:</p>
<pre><code>E = L &times; log<sub>2</sub>(R)</code></pre>
<p>Where:</p>
<ul>
  <li><code>L</code> is the number of characters in the password (length).</li>
  <li><code>R</code> is the size of the character pool (character set).</li>
</ul>

<p>For example, a password of 8 characters choosing from lowercase letters and numbers (pool size 36) has:</p>
<pre><code>8 &times; log<sub>2</sub>(36) &asymp; 41.4 bits of entropy (crackable in hours)</code></pre>

<p>Increasing the length to 20 characters from the same pool produces:</p>
<pre><code>20 &times; log<sub>2</sub>(36) &asymp; 103.4 bits of entropy (takes millions of years to crack)</code></pre>

<h2>Why Length Trumps Complexity</h2>
<p>Notice that doubling the character set only adds a small fraction to entropy, whereas doubling the password length multiplies entropy directly. A 16-character random lowercase password is substantially more resilient against brute-force attacks than an 8-character password featuring uppercase letters, numbers, and symbols.</p>

<h2>The Passphrase Approach (Diceware)</h2>
<p>For master passwords that must be memorized, the Diceware method or random word passphrases (e.g., <code>correct-horse-battery-staple</code>) offer high entropy combined with human memorability. By selecting four to six random words from a dictionary of 7,776 words, you achieve 50 to 75+ bits of entropy with a phrase that is easy to type and remember.</p>

<h2>Core Rules for Digital Security</h2>
<ol>
  <li><strong>Never reuse passwords:</strong> Every website, service, and email account must have a unique password.</li>
  <li><strong>Use a Password Manager:</strong> Generate and store 20+ character random strings inside trusted password vaults like Bitwarden or 1Password.</li>
  <li><strong>Adopt Hardware 2FA / Passkeys:</strong> Whenever possible, upgrade to WebAuthn / FIDO2 security keys to neutralize phishing attacks completely.</li>
</ol>
    </GuideArticle>
  );
}
