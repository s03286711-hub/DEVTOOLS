import type { Metadata } from 'next';
import ToolShell from '@/components/ToolShell';
import { PasswordTool } from '@/components/NewTools';

export const metadata: Metadata = {
  title: 'Strong Password Generator Online — Secure Random Passwords',
  description: 'Generate strong, secure, and customizable passwords with entropy calculation. Protect accounts against brute-force attacks with random password generation.',
};

export default function Page() {
  return (
    <ToolShell
      slug="password-generator"
      title="Strong Password Generator"
      description="Create random, high-entropy passwords with custom length and character sets."
    >
      <PasswordTool />
      <section className="article mt-12">
        <h2>What Makes a Password Truly Strong?</h2>
<p>A secure password relies on high randomness (entropy) and sufficient length rather than complex mnemonic tricks. Attackers utilize automated dictionary attacks and high-speed GPU cracking rigs capable of testing billions of combinations per second. Increasing password length exponentially expands the search space, making brute-force cracking practically impossible.</p>

<h2>Understanding Password Entropy</h2>
<p>Password entropy is measured in bits:</p>
<ul>
  <li><strong>Under 50 bits:</strong> Vulnerable to brute force and automated dictionary attacks.</li>
  <li><strong>50 to 75 bits:</strong> Fair resistance; suitable for low-risk non-sensitive accounts.</li>
  <li><strong>75 to 100 bits:</strong> Strong; resistant to high-grade offline attacks.</li>
  <li><strong>100+ bits:</strong> Extremely secure; computationally infeasible to break with modern technology.</li>
</ul>

<h2>Best Practices for Password Hygiene</h2>
<ul>
  <li><strong>Never reuse passwords:</strong> If one service suffers a credential leak, attackers immediately attempt credential stuffing across other major websites.</li>
  <li><strong>Use a dedicated password manager:</strong> Tools like Bitwarden, 1Password, or KeePass allow you to store unique, high-entropy passwords without needing to memorize them.</li>
  <li><strong>Enable Multi-Factor Authentication (MFA):</strong> Two-factor authentication (such as authenticator apps or security keys) provides a critical defense layer even if your password is compromised.</li>
</ul>
      </section>
    </ToolShell>
  );
}
