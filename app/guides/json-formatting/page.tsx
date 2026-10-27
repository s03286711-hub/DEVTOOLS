import { pageMetadata } from '@/lib/seo';
import { guides } from '@/lib/site';
import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';
import EmbeddedTool from '@/components/EmbeddedTool';
import { JsonFormatter } from '@/components/Tools';

const seoGuide = guides.find((guide) => guide.slug === 'json-formatting')!;

export const metadata: Metadata = pageMetadata({
  title: seoGuide.title, description: seoGuide.description, path: '/guides/json-formatting',
});

export default function Page() {
  return (
    <GuideArticle
      slug="json-formatting"
      title="How to Format, Validate, and Debug JSON: RFC 8259 Specifications, Parser Internals, and BigInt Precision Gotchas"
      description="A complete 1,200+ word engineering guide to JSON serialization, RFC 8259 rules, tokenizer errors, schema validation, streaming parsers, and multi-language implementation code."
    >

      <h2>1. The Foundation of JSON: RFC 8259 and ECMA-404 Specifications</h2>
      <p>JavaScript Object Notation (JSON) is an open, text-based, language-agnostic data interchange format originally discovered and popularized by Douglas Crockford in 2001 and formalized under <strong>IETF RFC 8259</strong> and <strong>ECMA-404</strong>. Over the past two decades, JSON has completely displaced XML and SOAP across modern RESTful APIs, GraphQL response payloads, microservice messaging layers, and document database storage engines (such as PostgreSQL's binary <code>jsonb</code> and MongoDB's BSON).</p>

      <p>JSON's global dominance stems from its minimal grammar: it maps directly to standard programming language memory structures (hash maps, associative arrays, lists, strings, and numbers) while maintaining strict human readability. However, because JSON was derived from the ECMAScript programming language, developers frequently make incorrect assumptions regarding syntax flexibility, number precision, and comment support.</p>

      <h2>2. The Rigid Lexical Grammar of Standard JSON</h2>
      <p>Unlike flexible programming languages, standard RFC 8259 JSON is extremely strict. A parser must reject the entire document if a single token violates the following foundational constraints:</p>

      <ul>
        <li><strong>Strict Double Quotation Marks:</strong> All object keys and string values must be enclosed in standard ASCII double quotes (<code>"key": "value"</code>). Single quotes (<code>'key': 'value'</code>) or backticks (<code>`key`: `value`</code>) are strictly invalid.</li>
        <li><strong>Prohibition of Trailing Commas:</strong> Commas in JSON are strictly <em>delimiters</em> between elements, never terminators. A trailing comma following the final key of an object or final array item (e.g., <code>&#123;"id": 1, "status": "active",&#125;</code>) triggers fatal syntax parsing errors in standard parsers.</li>
        <li><strong>The Six Permitted Value Types:</strong>
          <ol>
            <li><strong>String:</strong> A sequence of zero or more Unicode code points wrapped in double quotes. Control characters (U+0000 through U+001F) must be escaped (e.g., <code>\n</code>, <code>\t</code>, <code>\r</code>, or <code>\uXXXX</code>).</li>
            <li><strong>Number:</strong> Decimal numbers in base 10 (e.g., <code>42</code>, <code>-3.1415</code>, <code>1.5e10</code>). Octal prefixes (<code>077</code>), hex prefixes (<code>0xFF</code>), <code>NaN</code>, <code>Infinity</code>, and <code>-Infinity</code> are completely illegal.</li>
            <li><strong>Boolean:</strong> Exact literal tokens <code>true</code> or <code>false</code> (case-sensitive; <code>True</code> or <code>FALSE</code> fail).</li>
            <li><strong>Null:</strong> Literal token <code>null</code>.</li>
            <li><strong>Object:</strong> Unordered collection of zero or more key-value pairs wrapped in curly brackets <code>&#123;&#125;</code>.</li>
            <li><strong>Array:</strong> Ordered list of zero or more values wrapped in square brackets <code>[]</code>.</li>
          </ol>
        </li>
        <li><strong>Complete Absence of Comments:</strong> RFC 8259 explicitly forbids comments (neither <code>//</code> single-line nor <code>/* */</code> block comments are allowed). Douglas Crockford removed comments from early drafts to prevent proprietary configuration annotations and ensure universal cross-language determinism.</li>
      </ul>

      {/* Embedded Tool */}
      <EmbeddedTool toolSlug="json-formatter" headline="Interactive JSON Formatter & Validator" description="Validate, beautify with custom indentation, or minify JSON payloads instantly in your local browser sandbox."><JsonFormatter /></EmbeddedTool>

      <h2>3. Beautification (Formatting) vs Minification in Network Pipelines</h2>
      <p>In web application engineering, JSON formatting exists in two operational modes:</p>

      <table className="w-full text-left border-collapse my-6">
        <thead>
          <tr className="border-b bg-[#f8f9fc]">
            <th className="py-3 px-3">Mode</th>
            <th className="py-3 px-3">Structural Characteristics</th>
            <th className="py-3 px-3">Primary Operational Purpose</th>
            <th className="py-3 px-3">Bandwidth / CPU Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Minification</td>
            <td className="py-3 px-3">Strips all optional whitespace, tabs, and newline tokens</td>
            <td className="py-3 px-3">Wire serialization across HTTP/gRPC networks; Redis and cache storage</td>
            <td className="py-3 px-3 text-[#059669]">Reduces payload size by 15% to 45%; maximizes network throughput.</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono font-bold text-[#0f766e]">Beautification</td>
            <td className="py-3 px-3">Injects hierarchical 2-space or 4-space indentation and newlines</td>
            <td className="py-3 px-3">Developer debugging, visual inspection, git diff reviews, configuration files</td>
            <td className="py-3 px-3 text-[#d97706]">Expands text footprint; ideal for human comprehension during local testing.</td>
          </tr>
        </tbody>
      </table>

      <h2>4. The IEEE 754 Floating-Point Precision Trap (BigInt)</h2>
      <p>One of the most insidious production bugs in distributed web applications occurs when handling 64-bit integer IDs (such as Twitter snowflakes, Discord snowflake IDs, or 64-bit database auto-increments). The JSON specification allows numbers of arbitrary length. However, JavaScript and standard JSON parsers decode numerical tokens into <strong>64-bit IEEE 754 double-precision floating-point numbers</strong>.</p>

      <p>The maximum safe integer that can be represented in standard JavaScript without precision loss is:</p>
      <pre><code>&#123;`Number.MAX_SAFE_INTEGER = 2^53 - 1 = 9,007,199,254,740,991`&#125;</code></pre>

      <p>If a PostgreSQL backend serializes an order ID of <code>9007199254740995</code> into JSON:</p>
      <pre><code>{`// Browser parses JSON response:
const data = JSON.parse('{"order_id": 9007199254740995}');
console.log(data.order_id); 
// Output: 9007199254740996 (SILENT DATA CORRUPTION!)`}</code></pre>

      <p><strong>The Architectural Rule:</strong> Any numerical identifier exceeding 53 bits must be serialized over the wire as a double-quoted string (e.g., <code>"order_id": "9007199254740995"</code>) and deserialized using <code>BigInt()</code>.</p>

      <h2>5. Deep-Dive Syntax Error Troubleshooting Matrix</h2>
      <p>When an application throws <code>SyntaxError: Unexpected token</code>, use this diagnostic reference to identify the exact root cause:</p>

      <table className="w-full text-left border-collapse my-6">
        <thead>
          <tr className="border-b bg-[#f8f9fc]">
            <th className="py-3 px-3">Reported Error</th>
            <th className="py-3 px-3">Underlying Cause</th>
            <th className="py-3 px-3">Correct Remediation</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono text-xs text-[#b91c1c]">Unexpected token &apos; in JSON</td>
            <td className="py-3 px-3">Property keys or string values are wrapped in single quotation marks instead of double quotes.</td>
            <td className="py-3 px-3">Replace all single quotes with standard double quotes (<code>"key": "value"</code>).</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono text-xs text-[#b91c1c]">Unexpected token &rcub; at position X</td>
            <td className="py-3 px-3">A trailing comma exists after the final key-value pair before the closing curly brace.</td>
            <td className="py-3 px-3">Remove the trailing comma immediately preceding the closing curly brace.</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono text-xs text-[#b91c1c]">Unexpected token &lt; in JSON</td>
            <td className="py-3 px-3">An HTTP fetch call expected a JSON response but received an HTML 404/500 error page starting with <code>&lt;!DOCTYPE html&gt;</code>.</td>
            <td className="py-3 px-3">Inspect <code>response.ok</code> and HTTP status codes before invoking <code>response.json()</code>.</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 px-3 font-mono text-xs text-[#b91c1c]">Bad control character in string literal</td>
            <td className="py-3 px-3">Raw, unescaped ASCII newline (<code>\n</code>) or tab characters are embedded directly inside a string.</td>
            <td className="py-3 px-3">Escape control characters with double backslashes (<code>\\n</code>, <code>\\t</code>).</td>
          </tr>
        </tbody>
      </table>

      <h2>6. Production Implementation Across Modern Languages</h2>

      <h3>TypeScript / JavaScript (Node.js &amp; Browsers)</h3>
      <pre><code>{`interface UserProfile {{
  id: string;
  name: string;
  roles: string[];
  active: boolean;
}}

// 1. Safe serialization with 2-space indentation
const profile: UserProfile = {{
  id: "usr_9912",
  name: "Sarah Chen",
  roles: ["admin", "developer"],
  active: true
}};
const formattedJson: string = JSON.stringify(profile, null, 2);
console.log(formattedJson);

// 2. Safe deserialization with try/catch guard
function parsePayload&lt;T&gt;(rawText: string): {{ data: T | null; error: string | null }} {{
  try {{
    const parsed = JSON.parse(rawText) as T;
    return {{ data: parsed, error: null }};
  }} catch (err) {{
    return {{ data: null, error: err instanceof Error ? err.message : "Unknown error" }};
  }}
}}`}</code></pre>

      <h3>Python 3</h3>
      <pre><code>{`import json

payload = {{
    "service": "authentication-gateway",
    "replicas": 4,
    "enabled": True,
    "tags": ["prod", "us-east-1"]
}}

# Beautify with 4-space indentation and sorted keys
beautified = json.dumps(payload, indent=4, sort_keys=True)
print("Formatted JSON:\n", beautified)

# Minify for Redis cache storage
minified = json.dumps(payload, separators=(',', ':'))
print("Minified payload size (bytes):", len(minified.encode('utf-8')))`}</code></pre>

      <h3>Go (Golang)</h3>
      <pre><code>{`package main

import (
    "bytes"
    "encoding/json"
    "fmt"
)

type Config struct {{
    Host string   \`json:"host"\`
    Port int      \`json:"port"\`
    Tags []string \`json:"tags"\`
}}

func main() {{
    cfg := Config{{Host: "api.devxtool.me", Port: 443, Tags: []string{{"proxy", "tls"}}}}
    
    // Indent with 2 spaces
    pretty, err := json.MarshalIndent(cfg, "", "  ")
    if err != nil {{
        panic(err)
    }}
    fmt.Println(string(pretty))
}}`}</code></pre>

      <h3>cURL / CLI Formatting with jq</h3>
      <pre><code>{`# Pretty-print remote API endpoint payload with cURL and jq
curl -s https://api.github.com/zen | jq .

# Validate local JSON file syntax
jq empty invalid_config.json || echo "Invalid JSON detected!"`}</code></pre>

      <h2>7. JSON Schema: Automated Structural Validation</h2>
      <p>While standard parsers confirm lexical syntax, <strong>JSON Schema (Draft 2020-12)</strong> provides a declarative vocabulary to enforce structural contracts, type checks, and required fields across distributed microservices:</p>

      <pre><code>{`{{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "UserRegistration",
  "type": "object",
  "properties": {{
    "email": {{ "type": "string", "format": "email" }},
    "age": {{ "type": "integer", "minimum": 18 }},
    "subscription": {{ "type": "string", "enum": ["free", "pro", "enterprise"] }}
  }},
  "required": ["email", "subscription"],
  "additionalProperties": false
}}`}</code></pre>

      <h2>8. Frequently Asked Questions (FAQ)</h2>
      <h3>Why doesn't JSON support dates natively?</h3>
      <p>The original specification deliberately omitted a Date primitive because dates vary wildly in format, calendar system, and timezone offsets across operating systems. The industry standard convention is to serialize timestamps as ISO 8601 strings (e.g., <code>"2026-10-16T18:30:00.000Z"</code>) or numerical Unix epoch milliseconds.</p>

      <h3>What is the difference between JSON and JSON5?</h3>
      <p>JSON5 is an unofficial extension designed for human-written configuration files. It permits single quotes, comments, trailing commas, unquoted keys, and hex numbers. However, because standard web APIs and database drivers do not natively parse JSON5, it must be compiled into standard RFC 8259 JSON before wire transmission.</p>

      <h3>Are JSON object keys guaranteed to be ordered?</h3>
      <p>According to RFC 8259, JSON objects are strictly <em>unordered collections</em> of key-value pairs. While modern ECMAScript engines preserve string key insertion order in practice, relying on key ordering across different programming languages or microservices will lead to intermittent bugs.</p>

    </GuideArticle>
  );
}
