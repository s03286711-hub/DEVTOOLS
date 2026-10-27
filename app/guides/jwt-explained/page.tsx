import { pageMetadata } from '@/lib/seo';
import { guides } from '@/lib/site';
import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';
import EmbeddedTool from '@/components/EmbeddedTool';
import { JwtTool } from '@/components/NewTools';

const seoGuide = guides.find((guide) => guide.slug === 'jwt-explained')!;

export const metadata: Metadata = pageMetadata({
  title: seoGuide.title, description: seoGuide.description, path: '/guides/jwt-explained',
});

export default function Page() {
  return (
    <GuideArticle
      slug="jwt-explained"
      title="JSON Web Tokens (JWT) Explained: RFC 7519 Architecture, Cryptographic Signatures (RS256 vs HS256), and Production Security Pitfalls"
      description="A complete 1,200+ word engineering guide to JSON Web Tokens. Understand header structures, registered claims, asymmetric public key verification, refresh token rotation, and vulnerability mitigation."
    >

      <h2>1. The Architecture of JSON Web Tokens: RFC 7519</h2>
      <p>A JSON Web Token (JWT), standardized by the IETF in <strong>RFC 7519</strong>, is a compact, URL-safe container format for securely transmitting claims between two parties. Paired with JSON Web Signature (JWS / RFC 7515) and JSON Web Encryption (JWE / RFC 7516), JWTs represent the foundation of modern decentralized authentication, Single Sign-On (SSO), and microservice API authorization.</p>

      <p>Before JWTs gained wide adoption, stateful session cookies dominated web architecture. In stateful systems, the server generated an arbitrary session token, stored all session metadata in an in-memory cache (such as Redis or Memcached), and transmitted the session ID to the client in an HTTP cookie. While stateful sessions provide immediate server-side revocation, they introduce a state bottleneck that hinders horizontal autoscaling across multi-region server clusters.</p>

      <p>JWTs introduced <strong>stateless authentication</strong>: the token itself contains all necessary user identity claims, permission scopes, and cryptographic signatures. Any resource server possessing the verification key can independently validate the token without performing a database lookup.</p>

      <h2>2. Anatomical Structure of a JWT</h2>
      <p>A canonical JWT is constructed by concatenating three distinct segments with periods (<code>.</code>):</p>
      <pre><code>{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXgiLCJyb2xlcyI6WyJhZG1pbiJdfQ.4z28...
[------------ Header ------------].[------------- Payload -------------].[------------- Signature -------------]`}</code></pre>

      <h3>Part 1: The Header (JOSE Header)</h3>
      <p>The header specifies the cryptographic metadata required to verify the token:</p>
      <pre><code>{`{{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "key_2026_q4"
}}`}</code></pre>
      <ul>
        <li><code>alg</code> (Algorithm): The cryptographic signing algorithm (e.g., <code>HS256</code>, <code>RS256</code>, <code>ES256</code>).</li>
        <li><code>typ</code> (Type): The media type, typically <code>JWT</code>.</li>
        <li><code>kid</code> (Key ID): A unique identifier indicating which public key in a JWKS (JSON Web Key Set) signed the token.</li>
      </ul>

      <h3>Part 2: The Payload (Claims)</h3>
      <p>The payload contains the statement of truth (claims) asserted about the authenticated subject. RFC 7519 establishes seven <strong>Registered Claims</strong>:</p>
      <ul>
        <li><code>iss</code> (Issuer): The URI identifying the identity provider (e.g., <code>https://auth.devxtool.me</code>).</li>
        <li><code>sub</code> (Subject): The unique identifier of the user (e.g., <code>usr_550e8400</code>).</li>
        <li><code>aud</code> (Audience): The intended recipient or resource API (e.g., <code>https://api.devxtool.me</code>).</li>
        <li><code>exp</code> (Expiration Time): Unix epoch timestamp after which the token must be rejected.</li>
        <li><code>nbf</code> (Not Before): Unix timestamp before which the token must not be accepted.</li>
        <li><code>iat</code> (Issued At): Unix timestamp when the token was created.</li>
        <li><code>jti</code> (JWT ID): A unique UUID for the token, used to prevent replay attacks.</li>
      </ul>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="jwt-decoder" headline="Live JWT Token Decoder & Claims Sandbox" description="Decode JWT headers, parse JSON claims payload, check expiry status, and inspect signature algorithms in local browser memory."><JwtTool /></EmbeddedTool>

      <h2>3. Symmetric (HS256) vs Asymmetric (RS256 / ES256) Signing</h2>
      <p>Choosing between symmetric and asymmetric cryptography is the most critical architectural decision in JWT deployment:</p>

      <table className="w-full text-left border-collapse my-6">
        <thead>
          <tr className="border-b bg-[#f8f9fc]">
            <th className="py-3 px-3">Feature</th>
            <th className="py-3 px-3">HMAC SHA-256 (HS256)</th>
            <th className="py-3 px-3">RSA Signature (RS256)</th>
            <th className="py-3 px-3">ECDSA (ES256)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Key Model</td>
            <td className="py-3 px-3">Shared symmetric secret key (both sides share the same secret)</td>
            <td className="py-3 px-3">Private key signs; Public key verifies</td>
            <td className="py-3 px-3">Elliptic curve private key signs; Public key verifies</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Trust Boundary</td>
            <td className="py-3 px-3 text-[#b91c1c]">Internal monoliths only. Any service verifying a token can forge tokens.</td>
            <td className="py-3 px-3 text-[#059669]">Microservices &amp; 3rd-party APIs. Public key can be shared globally.</td>
            <td className="py-3 px-3 text-[#059669]">Zero trust. Optimal for mobile &amp; edge devices.</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Key Size</td>
            <td className="py-3 px-3">256+ bits (32+ bytes string)</td>
            <td className="py-3 px-3">2048 to 4096 bits</td>
            <td className="py-3 px-3">256 bits (P-256 curve)</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Token Overhead</td>
            <td className="py-3 px-3">Compact (32-byte signature)</td>
            <td className="py-3 px-3">Large (256-byte signature)</td>
            <td className="py-3 px-3">Compact (64-byte signature)</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Lethal JWT Security Vulnerabilities &amp; Prevention</h2>

      <h3>1. The "None" Algorithm Attack</h3>
      <p>RFC 7515 specifies a <code>none</code> algorithm for unsigned tokens. Early naive libraries read the <code>alg</code> header from incoming tokens without validation. Attackers changed <code>"alg": "HS256"</code> to <code>"alg": "none"</code>, deleted the signature segment, and achieved full privilege escalation. Modern libraries automatically reject unsigned tokens unless explicitly commanded otherwise.</p>

      <h3>2. Algorithm Substitution Attack</h3>
      <p>If an API server uses asymmetric RS256, an attacker can obtain the server's public key (which is public by design). The attacker signs a forged token using <code>HS256</code>, supplying the public key string as the HMAC secret. If the backend fails to verify the algorithm explicitly, it treats the public key as an HMAC secret and verifies the forged signature.</p>
      <p><strong>Remediation:</strong> Always specify <code>algorithms: ['RS256']</code> in verification options.</p>

      <h2>5. Production Implementation Across Modern Languages</h2>

      <h3>TypeScript / Node.js</h3>
      <pre><code>{`import jwt from 'jsonwebtoken';

const payload = {{
  sub: "usr_9912",
  iss: "https://auth.devxtool.me",
  aud: "https://api.devxtool.me",
  roles: ["billing_admin"]
}};

// 1. Sign token with 15-minute expiry
const secretKey = process.env.JWT_SECRET!;
const token = jwt.sign(payload, secretKey, {{
  algorithm: 'HS256',
  expiresIn: '15m'
}});

// 2. Verify token with clock leeway
try {{
  const verified = jwt.verify(token, secretKey, {{
    algorithms: ['HS256'],
    issuer: 'https://auth.devxtool.me',
    audience: 'https://api.devxtool.me',
    clockTolerance: 30 // 30 seconds leeway
  }});
  console.log("Verified claims:", verified);
}} catch (err) {{
  console.error("JWT verification failed:", err);
}}`}</code></pre>

      <h3>Python (PyJWT)</h3>
      <pre><code>{`import jwt
import datetime

# Sign payload
payload = {{
    "sub": "usr_9912",
    "iss": "https://auth.devxtool.me",
    "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=15)
}}

token = jwt.encode(payload, "super-secret-key-32-chars-long!", algorithm="HS256")
print("Generated JWT:", token)

# Verify payload
try:
    decoded = jwt.decode(
        token, 
        "super-secret-key-32-chars-long!", 
        algorithms=["HS256"],
        issuer="https://auth.devxtool.me"
    )
    print("Decoded subject:", decoded["sub"])
except jwt.ExpiredSignatureError:
    print("Error: Token has expired!")
except jwt.InvalidTokenError:
    print("Error: Token signature invalid!")`}</code></pre>

      <h2>6. Frequently Asked Questions (FAQ)</h2>
      <h3>Is a JWT encrypted?</h3>
      <p>No. Standard JWTs (JWS) are merely signed and Base64URL-encoded, not encrypted. Anyone holding the token can decode the header and payload to view all claims. Never store sensitive secrets, passwords, or PII inside a standard JWT payload. If encryption is required, use JWE (JSON Web Encryption).</p>

      <h3>Where should JWTs be stored in the browser?</h3>
      <p>Never store JWTs in <code>localStorage</code> or <code>sessionStorage</code>, as they are vulnerable to Cross-Site Scripting (XSS) token exfiltration. Store authentication tokens in an <code>HttpOnly; Secure; SameSite=Strict</code> cookie, preventing malicious JavaScript from reading the credential.</p>

    
      <h2>7. Token Revocation Strategies in Stateless Architectures</h2>
      <p>The primary critique of stateless JWTs is the difficulty of immediate revocation. If a user's account is compromised, or an employee is terminated, an issued access token remains mathematically valid until its <code>exp</code> timestamp elapses.</p>

      <h3>Architectural Mitigations:</h3>
      <ul>
        <li><strong>Short-Lived Access Tokens (5 to 15 minutes):</strong> Minimize the exposure window by issuing brief access tokens paired with long-lived refresh tokens.</li>
        <li><strong>Distributed Redis Blacklists / Bloom Filters:</strong> Store revoked <code>jti</code> identifiers in an in-memory Redis cluster with a TTL equal to the remaining token lifetime.</li>
        <li><strong>User Token Version Counters:</strong> Store an integer <code>token_version</code> on the user's database record. Embed this counter in the JWT payload. Incrementing the database counter immediately invalidates all previously issued tokens during permission checks.</li>
      </ul>

    </GuideArticle>
  );
}
