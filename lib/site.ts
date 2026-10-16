export interface Tool {
  slug: string;
  guide: string;
  title: string;
  short: string;
  category: string;
  icon: string;
  color: string;
  keywords: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
}

export const siteConfig = {
  name: 'DevX Tool',
  description: 'Free, fast and privacy-conscious online tools for developers. Format JSON, compare text, encode URLs, decode Base64 and test regular expressions.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://devxtool.me',
};

export const tools = [
  { slug: 'json-formatter', guide: 'json-formatting', title: 'JSON Formatter & Validator', short: 'Format, validate and inspect JSON with clear syntax errors.', category: 'Developer tools', icon: 'Braces', color: 'teal', keywords: 'json formatter, json validator, format json online' },
  { slug: 'text-diff', guide: 'text-comparison', title: 'Text Diff Checker', short: 'Compare two text blocks and spot added or removed lines.', category: 'Text utilities', icon: 'GitCompare', color: 'blue', keywords: 'text diff checker, compare two texts, online text comparison' },
  { slug: 'base64-encoder-decoder', guide: 'base64-encoding', title: 'Base64 Encoder & Decoder', short: 'Encode or decode Base64 text with Unicode support.', category: 'Encoding', icon: 'Binary', color: 'green', keywords: 'base64 encoder, base64 decoder, base64 online' },
  { slug: 'url-encoder-decoder', guide: 'url-encoding', title: 'URL Encoder & Decoder', short: 'Encode URL components and decode percent-encoded text.', category: 'Encoding', icon: 'Link', color: 'orange', keywords: 'url encoder, url decoder, percent encoding' },
  { slug: 'regex-tester', guide: 'regex-basics', title: 'Regex Tester', short: 'Test regular expressions, flags and matches against sample text.', category: 'Developer tools', icon: 'Regex', color: 'pink', keywords: 'regex tester, regular expression tester, regex online' },
  { slug: 'uuid-generator', guide: 'uuid-guide', title: 'UUID Generator', short: 'Generate random UUID v4 identifiers in bulk, instantly.', category: 'Generators', icon: 'Fingerprint', color: 'teal', keywords: 'uuid generator, guid generator, uuid v4 online' },
  { slug: 'hash-generator', guide: 'hashing-explained', title: 'SHA Hash Generator', short: 'Create SHA-1, SHA-256, SHA-384 and SHA-512 hashes of text.', category: 'Security', icon: 'Hash', color: 'blue', keywords: 'sha256 generator, hash generator, sha512 online' },
  { slug: 'jwt-decoder', guide: 'jwt-explained', title: 'JWT Decoder', short: 'Decode JSON Web Token headers and payloads and check expiry.', category: 'Security', icon: 'KeyRound', color: 'green', keywords: 'jwt decoder, decode jwt online, json web token' },
  { slug: 'timestamp-converter', guide: 'unix-timestamps', title: 'Unix Timestamp Converter', short: 'Convert Unix epoch time to readable dates and back.', category: 'Converters', icon: 'Clock', color: 'orange', keywords: 'unix timestamp converter, epoch converter, timestamp to date' },
  { slug: 'password-generator', guide: 'strong-passwords', title: 'Password Generator', short: 'Generate strong random passwords with entropy estimates.', category: 'Generators', icon: 'Lock', color: 'pink', keywords: 'password generator, strong password, random password' },
  { slug: 'color-converter', guide: 'color-formats', title: 'Color Converter', short: 'Convert HEX, RGB and HSL colors and check text contrast.', category: 'Design', icon: 'Palette', color: 'teal', keywords: 'hex to rgb, color converter, rgb to hsl, contrast checker' },
];

export const guides = [
  { slug:'json-formatting', title:'How to Format and Validate JSON', description:'Learn what JSON formatting does, how to validate JSON, and how to understand common syntax errors.' },
  { slug:'base64-encoding', title:'Base64 Encoding and Decoding Explained', description:'Understand Base64, common use cases, Unicode text, and why encoding is not encryption.' },
  { slug:'url-encoding', title:'URL Encoding: A Practical Guide', description:'Learn percent encoding, URL components, reserved characters, and safe decoding.' },
  { slug:'text-comparison', title:'How to Compare Two Text Files', description:'Compare text, understand line-based diffs, and find changes between versions.' },
  { slug:'regex-basics', title:'Regular Expressions for Beginners', description:'Learn regex patterns, character classes, quantifiers, flags, and practical examples.' },
  { slug:'uuid-guide', title:'What Is a UUID? Versions, Formats and Best Practices', description:'Understand UUID structure, the difference between v1, v4 and v7, collision odds, and database tips.' },
  { slug:'hashing-explained', title:'Hash Functions Explained: SHA-256, SHA-1 and Beyond', description:'Learn what cryptographic hashes are, how SHA algorithms differ, and when not to use them.' },
  { slug:'jwt-explained', title:'JSON Web Tokens (JWT) Explained', description:'How JWTs are structured, signed and verified, common claims, and security pitfalls to avoid.' },
  { slug:'unix-timestamps', title:'Unix Timestamps: A Complete Guide', description:'What epoch time is, seconds vs milliseconds, time zones, the 2038 problem, and code examples.' },
  { slug:'strong-passwords', title:'How to Create Strong Passwords', description:'Password entropy, length versus complexity, passphrases, and how password managers help.' },
  { slug:'color-formats', title:'HEX, RGB and HSL Colors Explained', description:'Understand web color formats, how to convert between them, and how to meet contrast guidelines.' },
];
