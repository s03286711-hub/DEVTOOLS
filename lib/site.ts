export const siteConfig = {
  name: 'DevToolbox',
  description: 'Free, fast and privacy-conscious online tools for developers. Format JSON, compare text, encode URLs, decode Base64 and test regular expressions.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
};

export const tools = [
  { slug: 'json-formatter', title: 'JSON Formatter & Validator', short: 'Format, validate and inspect JSON with clear syntax errors.', category: 'Developer tools', icon: 'Braces', color: 'teal', keywords: 'json formatter, json validator, format json online' },
  { slug: 'text-diff', title: 'Text Diff Checker', short: 'Compare two text blocks and spot added or removed lines.', category: 'Text utilities', icon: 'GitCompare', color: 'blue', keywords: 'text diff checker, compare two texts, online text comparison' },
  { slug: 'base64-encoder-decoder', title: 'Base64 Encoder & Decoder', short: 'Encode or decode Base64 text with Unicode support.', category: 'Encoding', icon: 'Binary', color: 'green', keywords: 'base64 encoder, base64 decoder, base64 online' },
  { slug: 'url-encoder-decoder', title: 'URL Encoder & Decoder', short: 'Encode URL components and decode percent-encoded text.', category: 'Encoding', icon: 'Link', color: 'orange', keywords: 'url encoder, url decoder, percent encoding' },
  { slug: 'regex-tester', title: 'Regex Tester', short: 'Test regular expressions, flags and matches against sample text.', category: 'Developer tools', icon: 'Regex', color: 'pink', keywords: 'regex tester, regular expression tester, regex online' },
];

export const guides = [
  { slug:'json-formatting', title:'How to Format and Validate JSON', description:'Learn what JSON formatting does, how to validate JSON, and how to understand common syntax errors.' },
  { slug:'base64-encoding', title:'Base64 Encoding and Decoding Explained', description:'Understand Base64, common use cases, Unicode text, and why encoding is not encryption.' },
  { slug:'url-encoding', title:'URL Encoding: A Practical Guide', description:'Learn percent encoding, URL components, reserved characters, and safe decoding.' },
  { slug:'text-comparison', title:'How to Compare Two Text Files', description:'Compare text, understand line-based diffs, and find changes between versions.' },
  { slug:'regex-basics', title:'Regular Expressions for Beginners', description:'Learn regex patterns, character classes, quantifiers, flags, and practical examples.' },
];
