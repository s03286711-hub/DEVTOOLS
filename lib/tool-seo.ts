import { pageMetadata } from '@/lib/seo';

// Describe supported tasks and formats. Search demand must be checked in Search Console.
export const toolSearchContent: Record<string, {
  title: string;
  description: string;
  heading: string;
  intro: string;
}> = {
  'json-formatter': {
    title: 'JSON Formatter & Validator Online (Free)',
    description: 'Format, validate, beautify, and minify JSON online. Choose indentation, inspect syntax errors, and copy or download the result. No account needed.',
    heading: 'JSON Formatter & Validator Online',
    intro: 'Paste JSON to format it with readable indentation, validate its syntax, or minify it. Copy the output or download a formatted JSON file. Processing runs in your browser.',
  },
  'base64-encoder-decoder': {
    title: 'Base64 Decoder & Encoder Online (UTF-8)',
    description: 'Decode Base64 to text or encode text to Base64 online. Supports UTF-8, accented characters, and emoji. Copy or download the result. No sign-up.',
    heading: 'Base64 Encoder & Decoder Online',
    intro: 'Encode text to Base64 or decode standard Base64 to UTF-8 text, including international characters and emoji. Copy or download the result. This tool processes text rather than binary files.',
  },
  'url-encoder-decoder': {
    title: 'URL Encoder & Decoder Online: Percent Encoding',
    description: 'Encode URL components or decode percent-encoded text online. Handle spaces, symbols, and UTF-8 characters, with examples of query parameter encoding.',
    heading: 'URL Encoder & Decoder Online',
    intro: 'Convert text into a percent-encoded URL component or decode percent escapes. This tool uses encodeURIComponent and decodeURIComponent; a literal plus sign stays a plus sign when decoding.',
  },
  'text-diff': {
    title: 'Text Diff Checker: Compare Two Texts Online',
    description: 'Compare two texts side by side and find changed lines online. Paste an original and revised version, then review line differences in your browser.',
    heading: 'Text Diff Checker: Compare Two Texts',
    intro: 'Paste the original and revised text to compare corresponding lines side by side. Review changed, missing, and added lines without creating an account.',
  },
  'regex-tester': {
    title: 'Regex Tester Online: JavaScript Regular Expressions',
    description: 'Test JavaScript regular expressions online with custom flags. Inspect matches and positions against sample text, and see errors for invalid patterns.',
    heading: 'JavaScript Regex Tester Online',
    intro: 'Test a JavaScript regular expression against sample text, adjust flags, and inspect matches and their positions. Enter the pattern without enclosing slashes and choose the flags separately.',
  },
  'uuid-generator': {
    title: 'UUID v4 Generator: Generate GUIDs in Bulk',
    description: 'Generate random UUID v4 identifiers online, one at a time or in batches of up to 100. Choose uppercase output and copy all GUIDs. No account needed.',
    heading: 'UUID v4 Generator: Generate GUIDs Online',
    intro: 'Generate one to 100 random UUID v4 identifiers using crypto.randomUUID() in your browser. Choose uppercase output if needed, then copy the generated GUIDs.',
  },
  'hash-generator': {
    title: 'SHA-256 Hash Generator Online: SHA-1 & SHA-512',
    description: 'Generate SHA-256, SHA-512, SHA-384, or SHA-1 hashes from text online. Inspect and copy the hexadecimal digest. Text is hashed locally in your browser.',
    heading: 'SHA-256 & SHA-512 Hash Generator',
    intro: 'Hash UTF-8 text with SHA-256, SHA-512, SHA-384, or SHA-1 and copy the hexadecimal digest. This tool hashes the text you enter; use a local file-hashing command to verify a download.',
  },
  'jwt-decoder': {
    title: 'JWT Decoder Online: Inspect Claims & Expiration',
    description: 'Decode a JWT header and payload online. Inspect JSON claims and expiration status in your browser. Decoding does not verify the token signature.',
    heading: 'JWT Decoder: Inspect Claims & Expiration',
    intro: 'Decode a JSON Web Token to inspect its header, payload claims, and expiration status. Decoding reveals the content; it does not verify the signature or establish whether a server will accept the token.',
  },
  'timestamp-converter': {
    title: 'Unix Timestamp Converter: Epoch to Date & Back',
    description: 'Convert Unix timestamps to UTC and local dates, or a date to epoch time. Supports seconds and milliseconds. Copy results directly from your browser.',
    heading: 'Unix Timestamp Converter: Epoch to Date',
    intro: 'Convert Unix epoch seconds or milliseconds to UTC and local dates, or convert a date back to a timestamp. Confirm the input unit and include a timezone offset when entering a date.',
  },
  'password-generator': {
    title: 'Random Password Generator: Custom Length & Symbols',
    description: 'Generate random passwords with custom length, letters, numbers, and symbols. Review an estimated strength score and copy the result in your browser.',
    heading: 'Random Password Generator Online',
    intro: 'Choose a password length and allowed character sets, then generate and copy a random password in your browser. The displayed strength and entropy are estimates, not a guarantee against compromise.',
  },
  'color-converter': {
    title: 'HEX to RGB & HSL Color Converter with Contrast',
    description: 'Convert HEX or RGB colors to HEX, RGB, and HSL online. Preview the color and compare its contrast with black and white text using WCAG ratios.',
    heading: 'HEX to RGB & HSL Color Converter',
    intro: 'Enter a HEX or RGB color to see its HEX, RGB, and HSL values. Preview the color and compare contrast ratios for black and white text. This tool accepts HEX and RGB input.',
  },
};

export function toolMetadata(slug: string) {
  const copy = toolSearchContent[slug];
  if (!copy) throw new Error(`Missing search metadata for tool: ${slug}`);
  return pageMetadata({ title: copy.title, description: copy.description, path: `/tools/${slug}` });
}
