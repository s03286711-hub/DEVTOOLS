import type { Tutorial } from '@/lib/tutorials';

export const developerArticles: Tutorial[] = [
  {
    slug: 'http-status-codes-400-401-403-404-429-500-explained',
    title: 'HTTP Error Codes: 400, 401, 403, 404, 429 & 500',
    excerpt: 'Find what common HTTP errors mean, what to check in an API response, and when a retry can help. Includes a status-code comparison and debugging steps.',
    date: '2026-10-28', category: 'Web troubleshooting', relatedTool: 'json-formatter', relatedGuide: 'json-formatting', tags: ['HTTP errors', 'API debugging', 'Status codes'],
    answer: 'An HTTP status code describes the outcome of a request. Start by recording the code, response headers, and body together. A 401 points to authentication, a 403 to refused access, a 429 to request limits, and a 5xx response to a server-side failure category.',
    sections: [
      { id: 'quick-reference', title: 'Common HTTP errors at a glance', paragraphs: ['The code narrows the investigation; it rarely explains the whole cause. An application may provide a useful error message or request identifier in the body or headers. Preserve that context when reporting a problem.'], table: { headings: ['Code', 'Meaning', 'First thing to inspect'], rows: [['400', 'Bad Request', 'Request shape and validation details'], ['401', 'Unauthorized: authentication is required or failed', 'Credentials and authentication challenge'], ['403', 'Forbidden', 'Account permissions and access policy'], ['404', 'Not Found', 'Route, resource identifier, and access behavior'], ['409', 'Conflict', 'Current state and conflicting change'], ['422', 'Unprocessable Content', 'Semantically invalid input'], ['429', 'Too Many Requests', 'Rate limits and Retry-After if provided'], ['500', 'Internal Server Error', 'Request identifier and server logs'], ['502', 'Bad Gateway', 'Response from the upstream service'], ['503', 'Service Unavailable', 'Service status and retry guidance'], ['504', 'Gateway Timeout', 'Upstream timeout and request duration']] } },
      { id: 'inspect', title: 'Inspect the actual request before changing code', paragraphs: [
        'Open the browser’s Network panel and reproduce the failing action once. Select the request that failed, then inspect its URL, method, status, response headers, and response body. A page can make several requests; do not assume the first error visible in the console is the underlying cause.',
        'For a command-line request, curl -i includes response headers. The example below uses a public demonstration hostname as a placeholder; replace it with your own test endpoint. Keep credentials out of copied commands, screenshots, and public issue reports.',
      ], language: 'Shell', code: 'curl -i "https://example.com/api/items"' },
      { id: 'authentication', title: '401 vs 403 vs 404: different questions', paragraphs: [
        'For a 401, check whether the expected authentication was actually sent and whether it is still valid. For a 403, examine which operation the account or app is allowed to perform. Repeatedly signing in may not change a policy that refuses access.',
        'For a 404, compare the requested path and identifier with the API documentation and the environment you intended to call. A development identifier may not exist in production. Some services also avoid disclosing the existence of a protected resource, so a 404 is not universal proof that no such resource exists.',
        'An authorization header can be present yet contain the wrong credential type. A decoded token can help you inspect claims, but decoding alone does not verify its signature or establish that the receiving service accepts it. Use the provider’s documented authentication flow.',
      ] },
      { id: 'retry', title: 'When should you retry a failed request?', paragraphs: [
        'An unchanged request with a validation error is unlikely to improve on retry. For a rate limit or temporary service problem, read the provider’s retry guidance and honor Retry-After when it is supplied. Add a maximum number of attempts rather than retrying forever.',
        'Before retrying a write, determine whether the first operation may already have succeeded. A connection failure after a payment or job submission can leave the outcome uncertain. Use the service’s documented idempotency mechanism or query the operation’s status instead of creating a duplicate.',
        'Treat retries as a response to an understood failure mode. Record how many attempts occurred and what finally happened. That evidence is more useful than a generic message saying the request failed, especially when a temporary problem later disappears.',
      ] },
      { id: 'response-body', title: 'Why an HTTP error can also become a JSON parse error', paragraphs: [
        'An API client might expect JSON but receive an HTML error page from a proxy or hosting service. Calling a JSON parser on that page can produce an “Unexpected token” error that obscures the original HTTP status. Check status and Content-Type before deciding how to parse the response.',
        'If the body is JSON, use the formatter to inspect a non-sensitive sample. Formatting helps reveal error fields and nested details; it does not fix the failed request or verify the server’s explanation. Keep the original status alongside the formatted body in your debugging notes.',
      ] },
    ],
    faqs: [{ question: 'Does a 500 error mean my internet connection is broken?', answer: 'It indicates that the responding server encountered an internal failure. The code alone does not identify which component failed. Compare the service status, request identifier, and reproducibility before drawing a conclusion.' }, { question: 'Will clearing cookies fix a 403?', answer: 'It may change a browser session, but it does not grant a permission the account lacks. Inspect the service’s error details and access policy before deleting browser data.' }],
    sources: [{ title: 'MDN: HTTP response status codes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status' }, { title: 'RFC 9110: HTTP semantics', url: 'https://www.rfc-editor.org/rfc/rfc9110.html' }],
  },
  {
    slug: 'json-vs-yaml-vs-toml-config-files',
    title: 'JSON vs YAML vs TOML: Which Configuration Format Fits?',
    excerpt: 'Compare JSON, YAML, and TOML using the same configuration example. Understand comments, indentation, data types, and safe conversion between formats.',
    date: '2026-10-28', category: 'Developer fundamentals', relatedTool: 'json-formatter', relatedGuide: 'json-formatting', tags: ['JSON', 'YAML', 'TOML', 'Configuration'],
    answer: 'Choose the format your application supports first. JSON is common for data interchange, YAML supports readable nested configuration, and TOML uses explicit key-value pairs and tables. File syntax does not replace the application’s rules about permitted settings.',
    sections: [
      { id: 'comparison', title: 'A quick comparison', paragraphs: ['A format can represent a value correctly while the consuming application still rejects it. Check its schema, documentation, and supported parser version before deciding that a file is valid for that application.'], table: { headings: ['Feature', 'JSON', 'YAML 1.2', 'TOML'], rows: [['Comments', 'Not in standard JSON', 'Supported with #', 'Supported with #'], ['Common structure', 'Objects and arrays', 'Mappings and sequences', 'Keys, tables, and arrays'], ['Nested layout', 'Braces and brackets', 'Often indentation', 'Table headings and dotted keys'], ['Null value', 'Supported', 'Supported', 'No null value in TOML 1.0'], ['Useful starting point', 'API data and generated settings', 'Readable nested documents', 'Application configuration']] } },
      { id: 'json-example', title: 'The same settings in JSON', paragraphs: [
        'This example configures a fictional development server. The port is a number, enabled is a boolean, and allowedOrigins is an array of strings. The hostname and domain are demonstration values, not instructions for a specific framework.',
        'JSON requires double-quoted property names and string values. Comments and trailing commas are not part of standard JSON. If an editor accepts those extensions, verify whether the application expects JSON or a separate format such as JSONC.',
      ], language: 'JSON', code: '{\n  "server": {\n    "host": "localhost",\n    "port": 8080,\n    "enabled": true,\n    "allowedOrigins": ["https://example.com"]\n  }\n}' },
      { id: 'yaml-example', title: 'The same settings in YAML', paragraphs: [
        'YAML can express this mapping with indentation and a sequence. Use spaces for indentation and keep sibling keys aligned. The quoted URL below is intentional: explicit quoting can make configuration easier to read and avoids unnecessary ambiguity in strings that resemble other values.',
        'Parser versions and application conventions matter. Do not assume that a value interpreted one way by an older parser will be interpreted identically by every newer tool. Test the exact parser used by the application, especially when moving configuration between ecosystems.',
      ], language: 'YAML', code: 'server:\n  host: "localhost"\n  port: 8080\n  enabled: true\n  allowedOrigins:\n    - "https://example.com"' },
      { id: 'toml-example', title: 'The same settings in TOML', paragraphs: [
        'TOML groups these settings under a server table. Each key has an explicit value, and the list uses square brackets. This example uses syntax compatible with TOML 1.0; consult the version supported by your application before using features from a different revision.',
        'A section heading changes where following keys belong. When editing a long file, inspect the nearest table heading instead of looking only at the line you changed. A correctly spelled key in the wrong table can be just as ineffective as an unknown setting.',
      ], language: 'TOML', code: '[server]\nhost = "localhost"\nport = 8080\nenabled = true\nallowedOrigins = ["https://example.com"]' },
      { id: 'conversion', title: 'Convert by parsing values, then verify behavior', paragraphs: [
        'Changing a filename extension does not convert its contents. Parse the original format, inspect the resulting data structure, and serialize to the destination format. Regular-expression replacements are unreliable when strings contain punctuation or a document contains nested structures.',
        'Check values whose types might change: quoted numbers, dates, nulls, multiline strings, and long integers. Comments and presentation choices may not survive a data-only conversion. For an application configuration, compare the behavior after loading the new file rather than judging only its appearance.',
        'Keep the original file and a small expected-settings checklist during a migration. Start with a representative sample like the server configuration above. Validate it with the application’s own checks, then expand the migration once the important fields are confirmed.',
      ], steps: ['Confirm which formats and parser versions the application accepts.', 'Parse and inspect a representative sample.', 'Check types and any information lost in conversion.', 'Run the application’s validation or a focused startup test.'] },
    ],
    faqs: [{ question: 'Can the JSON formatter validate YAML or TOML?', answer: 'No. The JSON formatter parses JSON. Use a parser for the original format to convert its data, then validate the resulting JSON separately.' }, { question: 'Is YAML always better because it has fewer braces?', answer: 'No. Readability depends on the document and its editors, while correctness depends on parser and application rules. Prefer the supported format that your team can review and validate reliably.' }],
    sources: [{ title: 'RFC 8259: JSON', url: 'https://www.rfc-editor.org/rfc/rfc8259' }, { title: 'YAML specification 1.2.2', url: 'https://yaml.org/spec/1.2.2/' }, { title: 'TOML specification 1.0.0', url: 'https://toml.io/en/v1.0.0' }],
  },
];
