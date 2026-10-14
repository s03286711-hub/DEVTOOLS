import type { Metadata } from 'next';
import GuideArticle from '@/components/GuideArticle';

export const metadata: Metadata = {
  title: 'How to Format and Validate JSON: The Complete Guide',
  description: 'Master JSON formatting, syntax validation rules, escaping rules, schema checking, and practical debugging techniques in modern development.',
};

export default function Page() {
  return (
    <GuideArticle
      slug="json-formatting"
      title="How to Format and Validate JSON"
      description="A practical, comprehensive guide to structured JSON data, syntax validation, common parsing errors, and best practices for web development."
    >
      <h2>What is JSON and Why Is It Ubiquitous?</h2>
      <p>JavaScript Object Notation (JSON) is a lightweight, language-agnostic text format defined by RFC 8259 and ECMA-404. Originating in early JavaScript specifications, JSON quickly superseded XML as the dominant format for data interchange across web applications, REST APIs, microservices, and modern document databases (such as MongoDB and PostgreSQL JSONB columns).</p>
      <p>JSON’s widespread adoption stems from its simplicity: it is easily readable by humans, straightforward for computer parsers to tokenize, and maps natively into data structures across virtually every programming language (arrays, dictionaries, maps, and objects).</p>

      <h2>JSON Syntax Specification: The Core Rules</h2>
      <p>Unlike loose scripting languages, JSON enforce strict syntax constraints. Violating any of the following constraints will cause parsers to reject the entire document:</p>
      <ul>
        <li><strong>Double Quotes Exclusively:</strong> All property names and string values must be enclosed in ASCII double quotation marks (<code>"</code>). Single quotes (<code>'</code>) or backticks (<code>`</code>) are strictly illegal.</li>
        <li><strong>No Trailing Commas:</strong> Commas are delimiters, not terminators. Placing a comma after the final key in an object or the final item in an array (e.g., <code>[1, 2, 3,]</code>) violates the grammar.</li>
        <li><strong>Restricted Value Types:</strong> JSON accepts only six data types:
          <ol>
            <li><strong>String:</strong> Unicode characters wrapped in double quotes.</li>
            <li><strong>Number:</strong> Integer or floating-point (scientific notation allowed; no <code>NaN</code> or <code>Infinity</code>).</li>
            <li><strong>Boolean:</strong> Literal <code>true</code> or <code>false</code> (case-sensitive).</li>
            <li><strong>Null:</strong> Literal <code>null</code>.</li>
            <li><strong>Object:</strong> Unordered collection of key/value pairs enclosed in curly braces <code>{}</code>.</li>
            <li><strong>Array:</strong> Ordered list of values enclosed in square brackets <code>[]</code>.</li>
          </ol>
        </li>
        <li><strong>No Comments:</strong> Standard JSON does not permit comments (neither <code>//</code> nor <code>/* */</code>). If comments are needed, developers must use extended formats such as JSON5 or YAML.</li>
      </ul>

      <h2>Minification vs. Beautification (Formatting)</h2>
      <p>When APIs serialize JSON for wire transmission across networks, they minify the payload by removing all unnecessary whitespace characters, tabs, and newlines. While this reduces bandwidth consumption, it turns complex data into an illegible wall of text.</p>
      <p>Beautification introduces 2-space or 4-space indentation and line breaks matching the depth of each nested array or object. This allows developers to inspect nested structures, verify relationship hierarchy, and review changes during pull requests.</p>

      <h2>Troubleshooting Common JSON Syntax Errors</h2>
      <ul>
        <li><strong>Unexpected token:</strong> Check immediately before the reported character position. This frequently denotes a missing comma between properties or an extra trailing comma.</li>
        <li><strong>Unescaped Quotes Inside Strings:</strong> If your string contains quotation marks, escape them with a backslash (e.g., <code>"description": "A \"quoted\" word"</code>).</li>
        <li><strong>Copy-Paste Smart Quotes:</strong> Text copied from rich text editors or chat apps often converts straight quotes to slanted "smart" quotes (<code>“ ”</code>), which JSON parsers reject.</li>
      </ul>
    <h2>Frequently Asked Questions About JSON</h2>
      <h3>Can JSON have comments?</h3>
      <p>No. Standard JSON (RFC 8259) deliberately excludes comments to prevent people from using parsing directives or annotations that break interoperability across languages. Douglas Crockford removed comments from early specs so that parsers would remain lightweight and deterministic. If your application requires comments in configuration files, consider adopting YAML, JSON5, or TOML instead.</p>

      <h3>What is the difference between JSON and JavaScript objects?</h3>
      <p>While JSON syntax is derived from JavaScript object literal notation, they are distinct standards. In JavaScript, keys do not require quotes unless they contain special characters, single quotes are valid for strings, and values can be functions, symbols, or undefined. In JSON, keys and strings <em>must</em> be double-quoted, trailing commas are strictly invalid, and functions or undefined are completely forbidden.</p>

      <h3>How do I handle very large numbers in JSON?</h3>
      <p>JSON numbers are arbitrary-precision decimal numbers according to the specification. However, most JavaScript parsers decode numbers into 64-bit IEEE 754 floating-point values (floats). Integers greater than <code>Number.MAX_SAFE_INTEGER</code> (2<sup>53</sup> - 1, or 9,007,199,254,740,991) will lose precision. When exchanging 64-bit database IDs (such as Twitter snowflakes or BigInt integers), always serialize them as quoted strings.</p>

      <h2>JSON Schema: Validating Data Structure</h2>
      <p>While basic syntax validation confirms whether a string can be parsed, <strong>JSON Schema</strong> provides a vocabulary that allows you to annotate and validate the structure, constraints, and data types of JSON documents. JSON Schema can enforce:</p>
      <ul>
        <li>Required object fields and permissible property names.</li>
        <li>Minimum and maximum numerical boundaries.</li>
        <li>String formats such as regular expression patterns, email addresses, and date-times.</li>
        <li>Array length constraints and element type consistency.</li>
      </ul>
    </GuideArticle>
  );
}
