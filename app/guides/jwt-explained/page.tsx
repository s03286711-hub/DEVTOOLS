import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';

export const metadata: Metadata = {
  title: 'JSON Web Tokens (JWT) Explained: Architecture & Security',
  description: 'A comprehensive technical guide to JSON Web Tokens (RFC 7519). Learn header and payload structure, digital signatures, common security flaws, and best practices.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="jwt-explained"
      title="JSON Web Tokens (JWT) Explained: Architecture & Security"
      description="A comprehensive technical guide to JSON Web Tokens (RFC 7519). Learn header and payload structure, digital signatures, common security flaws, and best practices."
    >
      <h2>What Is a JSON Web Token?</h2>
<p>JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact, self-contained method for securely transmitting claims between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.</p>

<h2>The Three Components of a JWT</h2>
<p>A JWT appears as three Base64URL-encoded strings separated by periods:</p>
<pre><code>header.payload.signature</code></pre>

<h3>1. Header</h3>
<p>The header typically contains two fields: the signing algorithm being used (such as HS256, RS256, or ES256) and the type of token (which is "JWT"):</p>
<pre><code>{`{
  "alg": "HS256",
  "typ": "JWT"
}`}</code></pre>

<h3>2. Payload</h3>
<p>The payload contains the claims. Claims are statements about an entity (typically, the authenticated user) and additional metadata:</p>
<ul>
  <li><strong>Registered claims:</strong> Predefined claims that are recommended to provide interoperability: <code>iss</code> (issuer), <code>exp</code> (expiration time), <code>sub</code> (subject), <code>aud</code> (audience), <code>nbf</code> (not before), <code>iat</code> (issued at).</li>
  <li><strong>Public claims:</strong> Custom claims defined by application developers, typically registered in the IANA JSON Web Token Registry or named with collision-resistant namespaces.</li>
  <li><strong>Private claims:</strong> Custom claims agreed upon by the producer and consumer of the token, such as <code>role: "admin"</code> or <code>organization_id: "org_123"</code>.</li>
</ul>

<h3>3. Signature</h3>
<p>To create the signature part, you take the encoded header, the encoded payload, a secret key, and the algorithm specified in the header, and sign them:</p>
<pre><code>HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)</code></pre>

<h2>Critical JWT Security Vulnerabilities to Avoid</h2>
<ul>
  <li><strong>The "alg: none" Exploit:</strong> Some flawed verification libraries historically allowed tokens with <code>"alg": "none"</code>, accepting unsigned forged tokens. Always reject tokens with algorithm "none" in production.</li>
  <li><strong>Algorithm Confusion (HMAC vs RSA):</strong> If a server expects an asymmetric RSA public key but the attacker supplies an HS256 token signed with the server's public key as an HMAC secret, poorly written libraries can accept the spoofed signature. Explicitly specify the permitted algorithms on your server.</li>
  <li><strong>Storing Sensitive Secrets in Payloads:</strong> Remember that JWT payloads are only encoded in Base64URL, not encrypted! Anyone who intercepts the token can read the claims. Never store database passwords, API tokens, or credit card numbers in a JWT payload.</li>
  <li><strong>Indefinite Lifespans:</strong> Always configure reasonable <code>exp</code> timestamps (e.g., 15 minutes for access tokens) coupled with secure, rotating refresh tokens stored in HTTP-only, SameSite cookies.</li>
</ul>
    <h2>Frequently Asked Questions About JWT</h2>
      <h3>Where should I store JWTs in a web browser?</h3>
      <p>The most secure storage location for authentication JWTs is an <strong>HTTP-only, Secure, SameSite=Lax (or Strict) cookie</strong>. Storing tokens inside browser <code>localStorage</code> or <code>sessionStorage</code> exposes them to Cross-Site Scripting (XSS) attacks; any third-party script or compromised dependency can read <code>localStorage</code> and steal the token. HTTP-only cookies cannot be accessed by client-side JavaScript, mitigating XSS token theft.</p>

      <h3>How do I revoke or invalidate a JWT before it expires?</h3>
      <p>Because standard JWTs are stateless, once signed they remain valid until their <code>exp</code> timestamp passes. To support instant revocation (e.g., when a user logs out or changes their password):</p>
      <ul>
        <li><strong>Short-lived access tokens:</strong> Configure access tokens with very brief lifetimes (5 to 15 minutes), paired with stateful refresh tokens stored in a database or Redis cache.</li>
        <li><strong>Token Blocklists:</strong> Store revoked token IDs (<code>jti</code> claim) in a high-speed in-memory store like Redis until their original expiration passes.</li>
        <li><strong>Token Versioning:</strong> Store a <code>token_version</code> integer on the user's database record and include it in the JWT claims; incrementing the version instantly invalidates all previously issued tokens.</li>
      </ul>

      <h3>What is the difference between JWS, JWE, and JWT?</h3>
      <p>JWT (JSON Web Token) is the overarching data format. <strong>JWS (JSON Web Signature)</strong> signs the content so its integrity is verifiable, but leaves the payload readable in Base64URL text. <strong>JWE (JSON Web Encryption)</strong> encrypts the payload so that only authorized parties possessing the decryption key can read the claims.</p>
    </GuideArticle>
  );
}
