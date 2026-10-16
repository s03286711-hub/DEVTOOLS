import type { Metadata } from 'next';
import BlogLayout from '@/components/blog/BlogLayout';
import EmbeddedTool from '@/components/EmbeddedTool';
import { JwtTool } from '@/components/NewTools';
import { blogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: "How to Debug and Fix \"Invalid Signature\" (JsonWebTokenError) in Node.js, Go, and Python \u2014 DevX Tool Blog",
  description: "In-depth engineering article: How to Debug and Fix \"Invalid Signature\" (JsonWebTokenError) in Node.js, Go, and Python. Read the complete technical guide, code examples, and debugging steps.",
};

export default function Page() {
  const post = blogPosts.find((p) => p.slug === 'fix-jwt-invalid-signature-error')!;

  return (
    <BlogLayout post={post}>

      <h2>1. Anatomy of the "JsonWebTokenError: invalid signature"</h2>
      <p>In distributed microservice architectures and OAuth2 / OpenID Connect authorization flows, few errors cause as much developer frustration as <code>JsonWebTokenError: invalid signature</code>. Whether you are using <code>jsonwebtoken</code> in Node.js, <code>golang-jwt/jwt</code> in Go, or <code>PyJWT</code> in Python, this cryptographic failure indicates that the mathematical digest computed over the token's header and payload does not match the signature segment appended to the token.</p>

      <p>Before diving into debugging strategies, let us recall the tripartite structure of a standard RFC 7519 JSON Web Token:</p>
      <pre><code>{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXgiLCJpYXQiOjE1MTYyMzkwMjJ9.4z...
[----- Header (Base64URL) -----].[----- Payload (Base64URL) -----].[----- Cryptographic Signature -----]`}</code></pre>

      <p>The signature is computed over the raw ASCII bytes of <code>Base64URL(Header) + "." + Base64URL(Payload)</code> using a secret key (symmetric HMAC) or a private key (asymmetric RSA/ECDSA). If a single byte, space, or key format character differs between the issuing server and the verifying server, verification fails instantly.</p>

      {/* Embedded Live Tool */}
      <EmbeddedTool toolSlug="jwt-decoder" headline="Live JWT Token Decoder & Verification Sandbox" description="Inspect JSON Web Token headers, claims payload, signature algorithms, and expiration timestamps locally in your browser."><JwtTool /></EmbeddedTool>

      <h2>2. Root Cause 1: Algorithm Confusion (HS256 vs RS256)</h2>
      <p>The most dangerous and frequent cause of signature failure stems from <strong>algorithm mismatch</strong>. In an asymmetric setup (such as Auth0, Okta, AWS Cognito, or Firebase Auth), the identity provider signs the token using an RSA private key with the <code>RS256</code> algorithm. Clients and resource servers verify the token using the provider's public key (retrieved via JWKS - JSON Web Key Set).</p>

      <h3>The Classic Mistake:</h3>
      <p>A backend developer frequently configures the verifying library with a secret string, or passes an RSA public key into a library expecting an HMAC secret. If the library allows the token header's <code>alg</code> claim to dictate the verification algorithm without an explicit server-side whitelist, the server may attempt to verify an RS256 token using HS256, or vice-versa.</p>

      <pre><code>{`// VULNERABLE / BROKEN NODE.JS CODE:
jwt.verify(token, process.env.PUBLIC_KEY); // Fails if algorithm is not strictly locked!

// SECURE, CORRECT IMPLEMENTATION:
jwt.verify(token, publicKey, {
  algorithms: ['RS256'], // Explicitly whitelist expected algorithm!
  issuer: 'https://auth.devxtool.me/',
  audience: 'https://api.devxtool.me/'
});`}</code></pre>

      <h2>3. Root Cause 2: PEM Key Formatting & Newline Corruption</h2>
      <p>When loading RSA or ECDSA public keys from environment variables (such as Kubernetes Secrets, AWS SSM Parameter Store, or <code>.env</code> files), newline characters (<code>\n</code>) are frequently mangled into literal two-character strings (<code>"\\n"</code>) or stripped entirely.</p>

      <p>A valid PEM public key must include exact boundary headers and line-wrapped base64 content:</p>
      <pre><code>{`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy1...
...
-----END PUBLIC KEY-----`}</code></pre>

      <p>If your environment variable loaded the key as a single flat string without line breaks, Node.js and OpenSSL will throw <code>Error: error:0909006C:PEM routines:get_name:no start line</code> or <code>invalid signature</code>. In Node.js, sanitize your key string using:</p>
      <pre><code>&#123;`const cleanPublicKey = process.env.RSA_PUBLIC_KEY.replace(/\\n/g, '\n');`&#125;</code></pre>

      <h2>4. Root Cause 3: Clock Skew and Token Expiry Misunderstandings</h2>
      <p>Although expired tokens typically trigger <code>TokenExpiredError: jwt expired</code>, some custom middleware layers conflate claims validation errors into generic signature errors. Distributed servers experience clock drift of several seconds unless synchronized with NTP. Always configure a generous clock tolerance (leeway) in your verification options:</p>

      <pre><code>{`// Adding 60 seconds of clock skew tolerance:
jwt.verify(token, secret, { clockTolerance: 60 });`}</code></pre>

      <h2>5. Multi-Language Verification Diagnostics</h2>

      <h3>Python (PyJWT)</h3>
      <pre><code>{`import jwt
from jwt.exceptions import InvalidSignatureError, DecodeError

def verify_user_token(raw_token: str, secret_key: str):
    try:
        decoded = jwt.decode(
            raw_token,
            secret_key,
            algorithms=["HS256"],
            options={"require": ["exp", "iss", "sub"]}
        )
        return decoded
    except InvalidSignatureError:
        print("CRITICAL: Signature mismatch! Check secret key encoding or algorithm.")
        return None
    except DecodeError:
        print("CRITICAL: Malformed JWT token structure.")
        return None`}</code></pre>

      <h3>Go (golang-jwt/jwt/v5)</h3>
      <pre><code>{`package main

import (
    "fmt"
    "github.com/golang-jwt/jwt/v5"
)

func validateToken(tokenString string, hmacSecret []byte) (*jwt.Token, error) {
    return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        // Enforce HMAC algorithm to prevent algorithm substitution attacks
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("unexpected signing algorithm: %v", token.Header["alg"])
        }
        return hmacSecret, nil
    })
}`}</code></pre>

      <h2>6. Production Checklist: Resolving JWT Errors</h2>
      <ul>
        <li><strong>Verify Token Cleanliness:</strong> Ensure no <code>Bearer </code> prefix is accidentally passed into the decoder string.</li>
        <li><strong>Check Secret Encoding:</strong> Confirm whether your secret was encoded as UTF-8 plaintext or raw Base64 bytes when signed.</li>
        <li><strong>Enforce Algorithm Whitelists:</strong> Never allow incoming tokens to dictate verification algorithms dynamically.</li>
      </ul>

    
      <h2>7. Real-World Production Debugging Walkthrough</h2>
      <p>Consider an enterprise scenario where a frontend Single Page Application (SPA) authenticates through AWS Cognito or Okta and dispatches bearer tokens to a Golang microservice. The Go service logs the following failure:</p>

      <pre><code>{`2026-10-16T12:04:12Z [ERROR] (auth.middleware): Failed to parse token: crypto/rsa: verification error
Headers: map[alg:RS256 kid:k_prod_us_east_1 typ:JWT]
Subject: usr_992144
Error: signature is invalid`}</code></pre>

      <h3>Step-by-Step Triage Checklist:</h3>
      <ol>
        <li><strong>Step 1: Check JWKS Public Key Rotation:</strong> Identity providers periodically rotate cryptographic key pairs. If the verifying backend caches public keys indefinitely in memory without refreshing from <code>/.well-known/jwks.json</code> upon encountering a new <code>kid</code> (Key ID), previously valid verifications will fail immediately after provider rotation.</li>
        <li><strong>Step 2: Compare Trailing Whitespace:</strong> If a proxy or API gateway (such as Envoy or Traefik) sanitizes or formats headers, ensure no trailing spaces (<code>" "</code>) or carriage returns (<code>"\r"</code>) were appended to the base64 signature chunk.</li>
        <li><strong>Step 3: Verify Claims Leeway:</strong> When multiple Kubernetes pods run without NTP clock synchronization, pod system clocks may differ by 5–15 seconds. If the verifying pod's clock is behind the issuing server, an <code>nbf</code> (Not Before) or <code>iat</code> (Issued At) assertion fails.</li>
      </ol>

      <h2>8. Common Error Codes and Resolution Matrix</h2>
      <table className="w-full text-left border-collapse my-6">
        <thead>
          <tr className="border-b bg-[#f8f9fc]">
            <th className="py-3 px-3">Library / Language</th>
            <th className="py-3 px-3">Reported Error Message</th>
            <th className="py-3 px-3">Underlying Root Cause</th>
            <th className="py-3 px-3">Immediate Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Node.js (jsonwebtoken)</td>
            <td className="py-3 px-3 font-mono text-xs text-[#b91c1c]">JsonWebTokenError: invalid signature</td>
            <td className="py-3 px-3">Secret key string mismatch or passing an RSA public key into an HMAC verification function.</td>
            <td className="py-3 px-3">Verify that <code>algorithms: ['RS256']</code> or <code>['HS256']</code> matches the signer configuration.</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Python (PyJWT)</td>
            <td className="py-3 px-3 font-mono text-xs text-[#b91c1c]">jwt.exceptions.InvalidSignatureError</td>
            <td className="py-3 px-3">Secret was encoded with different string encoding or public key missing PEM header.</td>
            <td className="py-3 px-3">Pass raw UTF-8 bytes and check for <code>-----BEGIN PUBLIC KEY-----</code> boundaries.</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Go (golang-jwt)</td>
            <td className="py-3 px-3 font-mono text-xs text-[#b91c1c]">key is of invalid type</td>
            <td className="py-3 px-3">Keyfunc callback returned <code>string</code> instead of <code>[]byte</code> or <code>*rsa.PublicKey</code>.</td>
            <td className="py-3 px-3">Cast HMAC keys to <code>[]byte(secret)</code> and RSA keys to <code>*rsa.PublicKey</code>.</td>
          </tr>
        </tbody>
      </table>

    </BlogLayout>
  );
}
