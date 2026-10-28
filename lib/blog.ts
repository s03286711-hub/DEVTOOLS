import { tutorialPosts } from '@/lib/tutorials';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  author: string;
  modified?: string;
  relatedTool?: string;
  relatedGuide?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  ...tutorialPosts,
  {
    slug: "base64-data-url-performance-overhead-in-web-apps",
    title: "Base64 Data URLs vs Blob URLs: Size and Performance",
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
    title: "Argon2id vs bcrypt vs SHA-256 for Password Hashing",
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
    title: "Building Browser-Based Tools with the Web Crypto API",
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
    title: "sRGB vs Display-P3: Wide-Gamut Colors in CSS",
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
    title: "How to Fix CORS Preflight Request Errors",
    excerpt: "Fixing \"Response to preflight request doesn't pass access control check: It does not have HTTP ok status\" (CORS)",
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
    title: "UUID v4 vs v7: PostgreSQL Index Performance",
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
    title: "How to Fix Invalid UUID Formats in AI-Generated Code",
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
    title: "Snowflake vs ULID vs UUID v7: Choosing Unique IDs",
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
    title: "Fix CORS and Streaming Errors in Next.js SSE Apps",
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
    title: "How to Fix a JWT Invalid Signature Error",
    excerpt: "How to Debug and Fix \"Invalid Signature\" (JsonWebTokenError) in Node.js, Go, and Python",
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
    title: "Fix LangChain OutputParserException and Truncated Output",
    excerpt: "Debugging \"OutputParserException: Failed to parse\" and Regex Truncation in LangChain and LlamaIndex",
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
    title: "Fix JSON Parsing Errors Caused by AI Markdown Output",
    excerpt: "Fixing \"SyntaxError: Unexpected token ` in JSON at position 0\" when Parsing OpenAI & Claude LLM Structured JSON Output",
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
    title: "API 429 Errors: Rate Limits, Quotas, and Retry Backoff",
    excerpt: "Handling \"RateLimitError: 429 You exceeded your current quota\" & TPM Exhaustion with Exponential Backoff and Jitter",
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
    title: "How to Fix Context Window Exceeded Errors in RAG",
    excerpt: "Fixing \"InvalidRequestError: This model's maximum context length is X tokens, however your messages resulted in Y tokens\"",
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
    title: "How to Fix Vector Embedding Dimension Mismatch Errors",
    excerpt: "Resolving \"ValueError: Vector dimension mismatch\" (1536 vs 3072) in Pinecone, ChromaDB, and pgvector",
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
    title: "How to Fix Unexpected Token in JSON Errors",
    excerpt: "Mastering \"SyntaxError: Unexpected token in JSON at position X\": Root Causes and Automated Linting",
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
    title: "BigInt in JSON: Serialize Large Integers Safely",
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
    title: "JWT Refresh Token Rotation and Replay Detection",
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
    title: "Merkle Trees Explained: Hashes and Data Verification",
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
    title: "How the Myers Diff Algorithm Compares Text",
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
    title: "Password Entropy: Length, Randomness, and Complexity",
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
    title: "How to Prevent Regex Backtracking and ReDoS",
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
    title: "Prompt Injection Risks in SQL and API Tools",
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
    title: "Prevent Timing Attacks When Comparing Hashes",
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
    title: "Regex Lookahead and Lookbehind Explained",
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
    title: "Fix the btoa Latin1 Error with UTF-8 Encoding",
    excerpt: "Resolving \"The string to be encoded contains characters outside of the Latin1 range\" (DOMException: Failed to execute 'btoa')",
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
    title: "WCAG Contrast Ratios and OKLCH vs HSL Colors",
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
    title: "Unix Timestamps: Seconds vs Milliseconds vs Microseconds",
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
    title: "URL Query Encoding: RFC 3986 vs Form Encoding",
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
    title: "The Year 2038 Problem: Unix Timestamp Overflow",
    excerpt: "The Year 2038 Problem (Y2038): Surviving the 32-Bit Signed Integer Unix Epoch Rollover in Legacy Systems",
    category: "Distributed Systems",
    readingTime: "9 min read",
    date: "2026-10-16",
    author: "DevX Tool Engineering Lab",
    relatedTool: "timestamp-converter",
    relatedGuide: "unix-timestamps",
    tags: ["Engineering", "Distributed", "Debugging"]
  },
  {
    slug: "fixing-syntaxerror-expected-double-quoted-property-name-in-json",
    title: "Fix Expected Double-Quoted Property Name in JSON",
    excerpt: "Diagnose and resolve 'Expected double-quoted property name in JSON' errors. Learn how ECMA-404 differs from Python dicts and JS objects with automated regex and AST fixes.",
    category: "Web Standards & Debugging",
    readingTime: "10 min read",
    date: "2026-10-17",
    author: "DevX Tool Engineering Lab",
    relatedTool: "json-formatter",
    relatedGuide: "json-formatting",
    tags: ["JSON", "JavaScript", "Python", "Debugging", "Web"]
  },
  {
    slug: "fix-openai-invalid-schema-for-response-format-json-schema",
    title: "Fix Invalid JSON Schema Errors in Structured Outputs",
    excerpt: "Fix Structured Outputs schema errors: additionalProperties, required fields, and Pydantic or Zod definitions. Includes JSON Schema debugging examples.",
    category: "AI & LLM Architecture",
    readingTime: "11 min read",
    date: "2026-10-17",
    author: "DevX Tool Engineering Lab",
    relatedTool: "json-formatter",
    relatedGuide: "json-formatting",
    tags: ["AI", "OpenAI", "LLM", "JSON Schema", "Python", "TypeScript"]
  },
];
