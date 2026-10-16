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
    slug: "base64-data-url-performance-overhead-in-web-apps",
    title: "The Hidden 33% Network Overhead: When to Use Base64 Data URLs vs Blob URLs and CDN Assets \\u2014 DevX Tool Blog",
    excerpt: "The Hidden 33% Network Overhead: When to Use Base64 Data URLs vs Blob URLs and CDN Assets",
    category: "Web Standards & Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "base64-encoder-decoder",
    relatedGuide: "base64-encoding",
    tags: ["Engineering", "Web", "Debugging"]
  },
  {
    slug: "bcrypt-argon2-sha256-password-hashing-comparison",
    title: "Why You Must Never Hash Passwords with SHA-256: The Math Behind GPU/ASIC Cracking vs Argon2id and BCrypt \\u2014 DevX Tool Blog",
    excerpt: "Why You Must Never Hash Passwords with SHA-256: The Math Behind GPU/ASIC Cracking vs Argon2id and BCrypt",
    category: "Security & Auth",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "hash-generator",
    relatedGuide: "hashing-explained",
    tags: ["Engineering", "Security", "Debugging"]
  },
  {
    slug: "building-client-side-zero-knowledge-developer-tools",
    title: "Architecting Zero-Knowledge Web Tools: Leveraging the Web Crypto API for Zero-Server Data Privacy \\u2014 DevX Tool Blog",
    excerpt: "Architecting Zero-Knowledge Web Tools: Leveraging the Web Crypto API for Zero-Server Data Privacy",
    category: "Web Standards & Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "json-formatter",
    relatedGuide: "json-formatting",
    tags: ["Engineering", "Web", "Debugging"]
  },
  {
    slug: "color-gamut-srgb-display-p3-css-color-4",
    title: "Beyond sRGB: Modern Display-P3 Wide Gamuts and High Dynamic Range (HDR) Colors in CSS \\u2014 DevX Tool Blog",
    excerpt: "Beyond sRGB: Modern Display-P3 Wide Gamuts and High Dynamic Range (HDR) Colors in CSS",
    category: "Design Systems & CSS",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "color-converter",
    relatedGuide: "color-formats",
    tags: ["Engineering", "Design", "Debugging"]
  },
  {
    slug: "cors-preflight-missing-allow-headers-troubleshooting",
    title: "Fixing \\",
    excerpt: "Fixing \\\"Response to preflight request doesn't pass access control check: It does not have HTTP ok status\\\" (CORS)",
    category: "Web Standards & Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "url-encoder-decoder",
    relatedGuide: "url-encoding",
    tags: ["Engineering", "Web", "Debugging"]
  },
  {
    slug: "database-uuid-v4-vs-v7-btree-fragmentation-benchmarks",
    title: "Why We Migrated from UUID v4 to UUID v7: Real PostgreSQL B-Tree Index Fragmentation Benchmarks \\u2014 DevX Tool Blog",
    excerpt: "Why We Migrated from UUID v4 to UUID v7: Real PostgreSQL B-Tree Index Fragmentation Benchmarks",
    category: "AI & LLM Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "uuid-generator",
    relatedGuide: "uuid-guide",
    tags: ["Prompting", "AI", "UUID", "Engineering", "Debugging", "LLM"]
  },
  {
    slug: "debugging-ai-hallucinated-uuid-v4-format-errors",
    title: "Why AI Code Assistants Hallucinate Invalid UUID Formats: Fixing Regex, Version Bits, and Database Failures \\u2014 DevX Tool Blog",
    excerpt: "Why AI Code Assistants Hallucinate Invalid UUID Formats: Fixing Regex, Version Bits, and Database Failures",
    category: "AI & LLM Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "uuid-generator",
    relatedGuide: "uuid-guide",
    tags: ["Prompting", "AI", "UUID", "Engineering", "Debugging", "LLM"]
  },
  {
    slug: "distributed-unique-ids-snowflake-ulid-uuidv7",
    title: "Distributed ID Architecture at Scale: Twitter Snowflake vs ULID vs UUID v7 Compared \\u2014 DevX Tool Blog",
    excerpt: "Distributed ID Architecture at Scale: Twitter Snowflake vs ULID vs UUID v7 Compared",
    category: "Databases & Storage",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "uuid-generator",
    relatedGuide: "uuid-guide",
    tags: ["Engineering", "Databases", "Debugging", "UUID"]
  },
  {
    slug: "fix-cors-and-origin-errors-in-nextjs-ai-streaming",
    title: "Fixing CORS & Missing Chunk Errors in Next.js Server-Sent Events (SSE) AI Streaming Applications \\u2014 DevX Tool Blog",
    excerpt: "Fixing CORS & Missing Chunk Errors in Next.js Server-Sent Events (SSE) AI Streaming Applications",
    category: "AI & LLM Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "url-encoder-decoder",
    relatedGuide: "url-encoding",
    tags: ["Prompting", "AI", "Engineering", "Debugging", "LLM"]
  },
  {
    slug: "fix-jwt-invalid-signature-error",
    title: "How to Debug and Fix \\",
    excerpt: "How to Debug and Fix \\\"Invalid Signature\\\" (JsonWebTokenError) in Node.js, Go, and Python",
    category: "Security & Auth",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "jwt-decoder",
    relatedGuide: "jwt-explained",
    tags: ["Engineering", "JWT", "Security", "Debugging"]
  },
  {
    slug: "fix-langchain-outputparser-regex-truncation-error",
    title: "Debugging \\",
    excerpt: "Debugging \\\"OutputParserException: Failed to parse\\\" and Regex Truncation in LangChain and LlamaIndex",
    category: "AI & LLM Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "regex-tester",
    relatedGuide: "regex-basics",
    tags: ["Prompting", "AI", "Engineering", "Debugging", "LLM"]
  },
  {
    slug: "fix-openai-chatcompletion-json-parse-trailing-markdown",
    title: "Fixing \\",
    excerpt: "Fixing \\\"SyntaxError: Unexpected token ` in JSON at position 0\\\" when Parsing OpenAI & Claude LLM Structured JSON Output",
    category: "AI & LLM Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "json-formatter",
    relatedGuide: "json-formatting",
    tags: ["Prompting", "AI", "Engineering", "JSON", "Debugging", "LLM"]
  },
  {
    slug: "fix-openai-ratelimiterror-429-exponential-backoff",
    title: "Handling \\",
    excerpt: "Handling \\\"RateLimitError: 429 You exceeded your current quota\\\" & TPM Exhaustion with Exponential Backoff and Jitter",
    category: "AI & LLM Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "json-formatter",
    relatedGuide: "json-formatting",
    tags: ["Prompting", "AI", "Engineering", "Debugging", "LLM"]
  },
  {
    slug: "fix-token-context-window-exceeded-rag-truncation",
    title: "Fixing \\",
    excerpt: "Fixing \\\"InvalidRequestError: This model's maximum context length is X tokens, however your messages resulted in Y tokens\\\"",
    category: "AI & LLM Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "text-diff",
    relatedGuide: "text-comparison",
    tags: ["Prompting", "AI", "Engineering", "Debugging", "LLM"]
  },
  {
    slug: "fixing-rag-vector-embedding-dimension-mismatch-error",
    title: "Resolving \\",
    excerpt: "Resolving \\\"ValueError: Vector dimension mismatch\\\" (1536 vs 3072) in Pinecone, ChromaDB, and pgvector",
    category: "AI & LLM Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "json-formatter",
    relatedGuide: "json-formatting",
    tags: ["Prompting", "AI", "Engineering", "Debugging", "LLM"]
  },
  {
    slug: "fixing-syntaxerror-unexpected-token-in-json",
    title: "Mastering \\",
    excerpt: "Mastering \\\"SyntaxError: Unexpected token in JSON at position X\\\": Root Causes and Automated Linting",
    category: "AI & LLM Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "json-formatter",
    relatedGuide: "json-formatting",
    tags: ["Prompting", "AI", "Engineering", "JSON", "Debugging", "LLM"]
  },
  {
    slug: "handling-bigint-in-json-serialization",
    title: "Preventing Precision Loss: How to Safely Handle 64-Bit Integers and BigInt in JSON REST APIs \\u2014 DevX Tool Blog",
    excerpt: "Preventing Precision Loss: How to Safely Handle 64-Bit Integers and BigInt in JSON REST APIs",
    category: "Web Standards & Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "json-formatter",
    relatedGuide: "json-formatting",
    tags: ["Engineering", "Web", "Debugging", "JSON"]
  },
  {
    slug: "jwt-refresh-token-rotation-best-practices",
    title: "Designing Bulletproof JWT Refresh Token Rotation: Detection of Replay Attacks in Single Page Applications (SPAs) \\u2014 DevX Tool Blog",
    excerpt: "Designing Bulletproof JWT Refresh Token Rotation: Detection of Replay Attacks in Single Page Applications (SPAs)",
    category: "AI & LLM Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "jwt-decoder",
    relatedGuide: "jwt-explained",
    tags: ["Prompting", "AI", "Engineering", "JWT", "Debugging", "LLM"]
  },
  {
    slug: "merkle-trees-and-cryptographic-hash-verification",
    title: "How Merkle Trees and Cryptographic Hashes Power Git, BitTorrent, and Blockchain Consensus \\u2014 DevX Tool Blog",
    excerpt: "How Merkle Trees and Cryptographic Hashes Power Git, BitTorrent, and Blockchain Consensus",
    category: "Security & Auth",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "hash-generator",
    relatedGuide: "hashing-explained",
    tags: ["Engineering", "Security", "Debugging"]
  },
  {
    slug: "myers-diff-algorithm-how-git-and-text-comparators-work",
    title: "Under the Hood of Git Diff: Implementing the Myers Longest Common Subsequence (LCS) Algorithm in TypeScript \\u2014 DevX Tool Blog",
    excerpt: "Under the Hood of Git Diff: Implementing the Myers Longest Common Subsequence (LCS) Algorithm in TypeScript",
    category: "Performance & Algorithms",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "text-diff",
    relatedGuide: "text-comparison",
    tags: ["Engineering", "Performance", "Debugging"]
  },
  {
    slug: "password-entropy-math-length-vs-character-complexity",
    title: "Password Entropy Mathematics: Why a 16-Character Passphrase Beats an 8-Character Cryptic Symbol String \\u2014 DevX Tool Blog",
    excerpt: "Password Entropy Mathematics: Why a 16-Character Passphrase Beats an 8-Character Cryptic Symbol String",
    category: "Security & Auth",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "password-generator",
    relatedGuide: "strong-passwords",
    tags: ["Engineering", "Security", "Debugging"]
  },
  {
    slug: "preventing-catastrophic-backtracking-in-regex",
    title: "Preventing Catastrophic Backtracking and Regular Expression Denial of Service (ReDoS) in High-Load APIs \\u2014 DevX Tool Blog",
    excerpt: "Preventing Catastrophic Backtracking and Regular Expression Denial of Service (ReDoS) in High-Load APIs",
    category: "Performance & Algorithms",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "regex-tester",
    relatedGuide: "regex-basics",
    tags: ["Engineering", "Performance", "Debugging"]
  },
  {
    slug: "preventing-prompt-injection-in-sql-and-api-tools",
    title: "Preventing Prompt Injection in Autonomous AI Agents Calling External APIs & SQL Databases \\u2014 DevX Tool Blog",
    excerpt: "Preventing Prompt Injection in Autonomous AI Agents Calling External APIs & SQL Databases",
    category: "AI Security",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "json-formatter",
    relatedGuide: "json-formatting",
    tags: ["Prompting", "AI", "Engineering", "Debugging", "LLM"]
  },
  {
    slug: "preventing-timing-attacks-in-cryptographic-hash-verification",
    title: "Eliminating Timing Attacks: Why String Equality (===) Breaks Security in Cryptographic Hash Verification \\u2014 DevX Tool Blog",
    excerpt: "Eliminating Timing Attacks: Why String Equality (===) Breaks Security in Cryptographic Hash Verification",
    category: "Security & Auth",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "hash-generator",
    relatedGuide: "hashing-explained",
    tags: ["Engineering", "Security", "Debugging"]
  },
  {
    slug: "regex-lookahead-lookbehind-zero-width-assertions-guide",
    title: "Mastering Lookaround Assertions: Positive/Negative Lookaheads and Lookbehinds with Zero-Width Matches \\u2014 DevX Tool Blog",
    excerpt: "Mastering Lookaround Assertions: Positive/Negative Lookaheads and Lookbehinds with Zero-Width Matches",
    category: "Performance & Algorithms",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "regex-tester",
    relatedGuide: "regex-basics",
    tags: ["Engineering", "Performance", "Debugging"]
  },
  {
    slug: "resolving-btoa-latin1-character-out-of-range",
    title: "Resolving \\",
    excerpt: "Resolving \\\"The string to be encoded contains characters outside of the Latin1 range\\\" (DOMException: Failed to execute 'btoa')",
    category: "Web Standards & Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "base64-encoder-decoder",
    relatedGuide: "base64-encoding",
    tags: ["Engineering", "Web", "Debugging"]
  },
  {
    slug: "understanding-wcag-contrast-ratios-oklch-vs-hsl",
    title: "Architecting Accessible Design Systems: WCAG 2.2 Contrast Math and Why OKLCH Is Replacing HSL and RGB \\u2014 DevX Tool Blog",
    excerpt: "Architecting Accessible Design Systems: WCAG 2.2 Contrast Math and Why OKLCH Is Replacing HSL and RGB",
    category: "Design Systems & CSS",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "color-converter",
    relatedGuide: "color-formats",
    tags: ["Engineering", "Design", "Debugging"]
  },
  {
    slug: "unix-epoch-millisecond-vs-second-timestamp-gotchas",
    title: "The 10-Digit vs 13-Digit Disaster: Debugging Unix Epoch Millisecond and Microsecond Serialization Across Distributed APIs \\u2014 DevX Tool Blog",
    excerpt: "The 10-Digit vs 13-Digit Disaster: Debugging Unix Epoch Millisecond and Microsecond Serialization Across Distributed APIs",
    category: "Distributed Systems",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "timestamp-converter",
    relatedGuide: "unix-timestamps",
    tags: ["Engineering", "Distributed", "Debugging"]
  },
  {
    slug: "url-query-parameter-encoding-rfc-3986-vs-application-x-www-form-urlencoded",
    title: "The Plus (+) vs %20 Dilemma: RFC 3986 Uniform Resource Identifiers vs application/x-www-form-urlencoded \\u2014 DevX Tool Blog",
    excerpt: "The Plus (+) vs %20 Dilemma: RFC 3986 Uniform Resource Identifiers vs application/x-www-form-urlencoded",
    category: "Web Standards & Debugging",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "url-encoder-decoder",
    relatedGuide: "url-encoding",
    tags: ["Engineering", "Web", "Debugging"]
  },
  {
    slug: "year-2038-problem-unix-timestamp-overflow",
    title: "The Year 2038 Problem (Y2038): Surviving the 32-Bit Signed Integer Unix Epoch Rollover in Legacy Systems \\u2014 DevX Tool Blog",
    excerpt: "The Year 2038 Problem (Y2038): Surviving the 32-Bit Signed Integer Unix Epoch Rollover in Legacy Systems",
    category: "Distributed Systems",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "timestamp-converter",
    relatedGuide: "unix-timestamps",
    tags: ["Engineering", "Distributed", "Debugging"]
  },
];
