export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  author: string;
  relatedTool?: string;
  relatedGuide?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'fix-jwt-invalid-signature-error',
    title: 'How to Debug and Fix "Invalid Signature" (JsonWebTokenError) in Node.js, Go, and Python',
    excerpt: 'Detailed root-cause analysis of JSON Web Token verification failures. Learn about RS256 vs HS256 algorithm confusion, raw key formatting, whitespace corruption, and clock skew tolerances.',
    category: 'Security & Auth',
    readingTime: '8 min read',
    date: '2026-10-14',
    author: 'DevX Tool Security Engineering',
    relatedTool: 'jwt-decoder',
    relatedGuide: 'jwt-explained',
    tags: ['JWT', 'Node.js', 'Go', 'Python', 'Security', 'Authentication']
  },
  {
    slug: 'resolving-btoa-latin1-character-out-of-range',
    title: 'Resolving "The string to be encoded contains characters outside of the Latin1 range" (DOMException: Failed to execute \'btoa\')',
    excerpt: 'Comprehensive debugging guide for UTF-8 Base64 encoding crashes in web browsers. Understand binary strings, code points, TextEncoder API, and polyfills.',
    category: 'Web Standards',
    readingTime: '7 min read',
    date: '2026-10-12',
    author: 'DevX Tool Core Team',
    relatedTool: 'base64-encoder-decoder',
    relatedGuide: 'base64-encoding',
    tags: ['Base64', 'JavaScript', 'Unicode', 'Web APIs', 'Encoding']
  },
  {
    slug: 'fixing-syntaxerror-unexpected-token-in-json',
    title: 'Mastering "SyntaxError: Unexpected token in JSON at position X": Root Causes and Automated Linting',
    excerpt: 'The complete troubleshooting manual for JSON parsing bugs. Uncover zero-width spaces, unescaped backslashes, trailing commas, single quote accidents, and byte order marks (BOM).',
    category: 'Debugging & Architecture',
    readingTime: '9 min read',
    date: '2026-10-10',
    author: 'DevX Tool Architecture Lab',
    relatedTool: 'json-formatter',
    relatedGuide: 'json-formatting',
    tags: ['JSON', 'Parsing', 'Node.js', 'Debugging', 'APIs']
  },
  {
    slug: 'cors-preflight-missing-allow-headers-troubleshooting',
    title: 'Fixing "Response to preflight request doesn\'t pass access control check: It does not have HTTP ok status" (CORS)',
    excerpt: 'Deep-dive into HTTP OPTIONS preflight handshakes. Learn how Authorization headers, reverse proxies (Nginx/Caddy), AWS API Gateway, and Cloudflare handle CORS headers.',
    category: 'Networking & Protocols',
    readingTime: '10 min read',
    date: '2026-10-08',
    author: 'DevX Tool Systems Engineering',
    relatedTool: 'url-encoder-decoder',
    relatedGuide: 'url-encoding',
    tags: ['CORS', 'HTTP', 'Nginx', 'Cloudflare', 'Security', 'REST APIs']
  },
  {
    slug: 'preventing-catastrophic-backtracking-in-regex',
    title: 'Preventing Catastrophic Backtracking and Regular Expression Denial of Service (ReDoS) in High-Load APIs',
    excerpt: 'Learn how nested quantifiers and non-deterministic finite automata (NFA) create exponential execution complexity. Benchmarks, atomic groups, and safe alternative patterns.',
    category: 'Performance & Algorithms',
    readingTime: '11 min read',
    date: '2026-10-05',
    author: 'DevX Tool Performance Team',
    relatedTool: 'regex-tester',
    relatedGuide: 'regex-basics',
    tags: ['Regex', 'ReDoS', 'Performance', 'Algorithms', 'Security']
  },
  {
    slug: 'database-uuid-v4-vs-v7-btree-fragmentation-benchmarks',
    title: 'Why We Migrated from UUID v4 to UUID v7: Real PostgreSQL B-Tree Index Fragmentation Benchmarks',
    excerpt: 'Empirical benchmark data comparing random UUID v4 vs time-ordered UUID v7 across 50,000,000 records. Disk cache hit ratios, page splits, and query latencies.',
    category: 'Databases & Storage',
    readingTime: '12 min read',
    date: '2026-10-01',
    author: 'DevX Tool Data Infrastructure Team',
    relatedTool: 'uuid-generator',
    relatedGuide: 'uuid-guide',
    tags: ['PostgreSQL', 'UUID', 'B-Tree', 'Databases', 'Performance', 'RFC 9562']
  },
  {
    slug: 'bcrypt-argon2-sha256-password-hashing-comparison',
    title: 'Why You Must Never Hash Passwords with SHA-256: The Math Behind GPU/ASIC Cracking vs Argon2id and BCrypt',
    excerpt: 'An exhaustive analysis of computational cost, memory-hardness, rainbow tables, and salting strategies. Learn why SHA-256 belongs in integrity checking, not authentication.',
    category: 'Security & Auth',
    readingTime: '10 min read',
    date: '2026-09-28',
    author: 'DevX Tool Security Engineering',
    relatedTool: 'hash-generator',
    relatedGuide: 'hashing-explained',
    tags: ['Cryptography', 'Argon2id', 'BCrypt', 'SHA-256', 'Passwords', 'Security']
  },
  {
    slug: 'unix-epoch-millisecond-vs-second-timestamp-gotchas',
    title: 'The 10-Digit vs 13-Digit Disaster: Debugging Unix Epoch Millisecond and Microsecond Serialization Across Distributed APIs',
    excerpt: 'Why timestamps 50 years in the future appear in logs. Resolving Python time.time(), JavaScript Date.now(), Go UnixNano(), and PostgreSQL timestamptz discrepancies.',
    category: 'Distributed Systems',
    readingTime: '8 min read',
    date: '2026-09-24',
    author: 'DevX Tool Systems Engineering',
    relatedTool: 'timestamp-converter',
    relatedGuide: 'unix-timestamps',
    tags: ['Unix Timestamps', 'Timezones', 'JavaScript', 'Python', 'Distributed Systems']
  },
  {
    slug: 'understanding-wcag-contrast-ratios-oklch-vs-hsl',
    title: 'Architecting Accessible Design Systems: WCAG 2.2 Contrast Math and Why OKLCH Is Replacing HSL and RGB',
    excerpt: 'Explore perceptual uniformity, APCA contrast calculations, and CSS Color Module Level 4. Convert legacy HEX/RGB palettes into mathematically accessible color systems.',
    category: 'Design Systems & CSS',
    readingTime: '9 min read',
    date: '2026-09-20',
    author: 'DevX Tool UI Engineering',
    relatedTool: 'color-converter',
    relatedGuide: 'color-formats',
    tags: ['CSS', 'WCAG', 'Accessibility', 'Color Science', 'OKLCH', 'Design Systems']
  },
  {
    slug: 'password-entropy-math-length-vs-character-complexity',
    title: 'Password Entropy Mathematics: Why a 16-Character Passphrase Beats an 8-Character Cryptic Symbol String',
    excerpt: 'Shannon entropy calculations, brute-force search space analysis, and NIST SP 800-63B guidelines. How to build secure client-side password entropy meters.',
    category: 'Security & Auth',
    readingTime: '9 min read',
    date: '2026-09-15',
    author: 'DevX Tool Security Engineering',
    relatedTool: 'password-generator',
    relatedGuide: 'strong-passwords',
    tags: ['Passwords', 'Entropy', 'NIST', 'Security', 'Math']
  },
  {
    slug: 'myers-diff-algorithm-how-git-and-text-comparators-work',
    title: 'Under the Hood of Git Diff: Implementing the Myers Longest Common Subsequence (LCS) Algorithm in TypeScript',
    excerpt: 'A complete mathematical walkthrough of the edit graph, breadth-first search heuristics, and shortest edit script (SES) implementation for fast in-browser text diffs.',
    category: 'Algorithms & Architecture',
    readingTime: '11 min read',
    date: '2026-09-10',
    author: 'DevX Tool Architecture Lab',
    relatedTool: 'text-diff',
    relatedGuide: 'text-comparison',
    tags: ['Algorithms', 'Git', 'Diff', 'TypeScript', 'Computer Science']
  },
  {
    slug: 'url-query-parameter-encoding-rfc-3986-vs-application-x-www-form-urlencoded',
    title: 'The Plus (+) vs %20 Dilemma: RFC 3986 Uniform Resource Identifiers vs application/x-www-form-urlencoded',
    excerpt: 'Why query strings break when encoded incorrectly. Differences between encodeURIComponent, encodeURI, and FormData serialization in Java, Python, and Node.js.',
    category: 'Web Standards',
    readingTime: '8 min read',
    date: '2026-09-05',
    author: 'DevX Tool Core Team',
    relatedTool: 'url-encoder-decoder',
    relatedGuide: 'url-encoding',
    tags: ['URL Encoding', 'HTTP', 'Web Standards', 'RFC 3986', 'Node.js']
  },
  {
    slug: 'preventing-timing-attacks-in-cryptographic-hash-verification',
    title: 'Eliminating Timing Attacks: Why String Equality (===) Breaks Security in Cryptographic Hash Verification',
    excerpt: 'How CPU instruction branching and string comparison short-circuits leak secret tokens byte-by-byte. Implementing constant-time comparison in Node.js, Go, and Python.',
    category: 'Security & Auth',
    readingTime: '9 min read',
    date: '2026-08-30',
    author: 'DevX Tool Security Engineering',
    relatedTool: 'hash-generator',
    relatedGuide: 'hashing-explained',
    tags: ['Cryptography', 'Timing Attacks', 'Security', 'Go', 'Node.js']
  },
  {
    slug: 'jwt-refresh-token-rotation-best-practices',
    title: 'Designing Bulletproof JWT Refresh Token Rotation: Detection of Replay Attacks in Single Page Applications (SPAs)',
    excerpt: 'Architectural patterns for storing tokens in httpOnly SameSite cookies vs localStorage. Implementing refresh token families and automatic session revocation on token reuse.',
    category: 'Security & Auth',
    readingTime: '10 min read',
    date: '2026-08-25',
    author: 'DevX Tool Security Engineering',
    relatedTool: 'jwt-decoder',
    relatedGuide: 'jwt-explained',
    tags: ['JWT', 'Refresh Tokens', 'OAuth2', 'SPA', 'Security', 'Architecture']
  },
  {
    slug: 'year-2038-problem-unix-timestamp-overflow',
    title: 'The Year 2038 Problem (Y2038): Surviving the 32-Bit Signed Integer Unix Epoch Rollover in Legacy Systems',
    excerpt: 'What happens when time_t exceeds 2,147,483,647 seconds on January 19, 2038. Embedded systems, filesystem timestamps (ext3 vs ext4), and database migration plans.',
    category: 'Distributed Systems',
    readingTime: '8 min read',
    date: '2026-08-20',
    author: 'DevX Tool Systems Engineering',
    relatedTool: 'timestamp-converter',
    relatedGuide: 'unix-timestamps',
    tags: ['Unix Timestamps', 'Y2038', 'Linux', 'Databases', 'C Programming']
  },
  {
    slug: 'building-client-side-zero-knowledge-developer-tools',
    title: 'Architecting Zero-Knowledge Web Tools: Leveraging the Web Crypto API for Zero-Server Data Privacy',
    excerpt: 'How modern browser sandboxes, SubtleCrypto, and Content Security Policies (CSP) enable high-utility developer applications that guarantee privacy with zero server roundtrips.',
    category: 'Web Standards & Security',
    readingTime: '9 min read',
    date: '2026-08-15',
    author: 'DevX Tool Architecture Lab',
    relatedTool: 'json-formatter',
    relatedGuide: 'json-formatting',
    tags: ['Web Crypto', 'Privacy', 'Client-Side', 'Architecture', 'Security']
  },
  {
    slug: 'base64-data-url-performance-overhead-in-web-apps',
    title: 'The Hidden 33% Network Overhead: When to Use Base64 Data URLs vs Blob URLs and CDN Assets',
    excerpt: 'Detailed memory allocation and network payload benchmarks comparing inline Base64 data URIs against external HTTP/2 streaming. Garbage collection implications in React and Vue.',
    category: 'Performance & Frontend',
    readingTime: '8 min read',
    date: '2026-08-10',
    author: 'DevX Tool Frontend Team',
    relatedTool: 'base64-encoder-decoder',
    relatedGuide: 'base64-encoding',
    tags: ['Base64', 'Frontend', 'Performance', 'HTTP/2', 'Memory']
  },
  {
    slug: 'regex-lookahead-lookbehind-zero-width-assertions-guide',
    title: 'Mastering Lookaround Assertions: Positive/Negative Lookaheads and Lookbehinds with Zero-Width Matches',
    excerpt: 'Solve complex parsing challenges without consuming characters. Password strength validation, currency formatting, and token sanitization using modern RegExp engines.',
    category: 'Performance & Algorithms',
    readingTime: '9 min read',
    date: '2026-08-05',
    author: 'DevX Tool Core Team',
    relatedTool: 'regex-tester',
    relatedGuide: 'regex-basics',
    tags: ['Regex', 'JavaScript', 'Parsing', 'Algorithms']
  },
  {
    slug: 'distributed-unique-ids-snowflake-ulid-uuidv7',
    title: 'Distributed ID Architecture at Scale: Twitter Snowflake vs ULID vs UUID v7 Compared',
    excerpt: 'Comprehensive comparison of distributed ID strategies for distributed microservices. Clock drift mitigation, worker ID allocation, 64-bit vs 128-bit payload trade-offs.',
    category: 'Distributed Systems',
    readingTime: '11 min read',
    date: '2026-07-30',
    author: 'DevX Tool Data Infrastructure Team',
    relatedTool: 'uuid-generator',
    relatedGuide: 'uuid-guide',
    tags: ['Distributed Systems', 'Snowflake', 'ULID', 'UUID v7', 'Architecture']
  },
  {
    slug: 'handling-bigint-in-json-serialization',
    title: 'Preventing Precision Loss: How to Safely Handle 64-Bit Integers and BigInt in JSON REST APIs',
    excerpt: 'JavaScript Number.MAX_SAFE_INTEGER truncates database IDs over 9,007,199,254,740,991. Custom JSON.stringify replacers, JSON.parse revivers, and schema best practices.',
    category: 'Debugging & Architecture',
    readingTime: '8 min read',
    date: '2026-07-25',
    author: 'DevX Tool Architecture Lab',
    relatedTool: 'json-formatter',
    relatedGuide: 'json-formatting',
    tags: ['JSON', 'BigInt', 'JavaScript', 'APIs', 'PostgreSQL']
  },
  {
    slug: 'color-gamut-srgb-display-p3-css-color-4',
    title: 'Beyond sRGB: Modern Display-P3 Wide Gamuts and High Dynamic Range (HDR) Colors in CSS',
    excerpt: 'Why standard HEX colors clip on modern OLED displays. How CSS Color Module 4 color(display-p3 r g b) creates 25% richer visuals and how to build fallback pipelines.',
    category: 'Design Systems & CSS',
    readingTime: '8 min read',
    date: '2026-07-20',
    author: 'DevX Tool UI Engineering',
    relatedTool: 'color-converter',
    relatedGuide: 'color-formats',
    tags: ['CSS', 'Color Science', 'Display-P3', 'Frontend', 'Design']
  },
  {
    slug: 'merkle-trees-and-cryptographic-hash-verification',
    title: 'How Merkle Trees and Cryptographic Hashes Power Git, BitTorrent, and Blockchain Consensus',
    excerpt: 'Understand cryptographic data verification trees from first principles. Mathematical proofs of consistency, audit paths, and building an in-memory Merkle tree in Python and TypeScript.',
    category: 'Security & Auth',
    readingTime: '10 min read',
    date: '2026-07-15',
    author: 'DevX Tool Architecture Lab',
    relatedTool: 'hash-generator',
    relatedGuide: 'hashing-explained',
    tags: ['Cryptography', 'Merkle Trees', 'Git', 'Blockchain', 'Algorithms']
  }
];
