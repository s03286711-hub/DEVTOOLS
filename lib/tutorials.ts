import type { BlogPost } from '@/lib/blog';

export interface TutorialSection {
  id: string;
  title: string;
  paragraphs: string[];
  code?: string;
  language?: string;
  steps?: string[];
  table?: { headings: string[]; rows: string[][] };
}

export interface Tutorial {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  relatedTool: string;
  relatedGuide: string;
  tags: string[];
  answer: string;
  sections: TutorialSection[];
  faqs: { question: string; answer: string }[];
  sources: { title: string; url: string }[];
}

export const tutorials: Tutorial[] = [
  {
    slug: 'how-to-open-format-json-file',
    title: 'How to Open and Format a JSON File',
    excerpt: 'Open JSON files on Windows, Mac, or Linux, format them in a browser or terminal, and fix common validation errors with practical examples.',
    category: 'Everyday Developer Tasks',
    relatedTool: 'json-formatter', relatedGuide: 'json-formatting',
    tags: ['JSON', 'Windows', 'macOS', 'Python'],
    answer: 'A JSON file is a text file. Open it in a text editor, or copy its contents into the JSON Formatter and choose Format & validate. Formatting adds indentation; validation checks whether the contents follow JSON syntax.',
    sections: [
      {
        id: 'open-json', title: 'Open a JSON file without changing its data',
        paragraphs: [
          'On Windows, right-click the file and choose Open with, then select a text editor such as Notepad or Visual Studio Code. On macOS, use Open With and a plain-text editor. On Linux, open the file with your preferred text editor. You do not need to install a database or run the file as a program.',
          'Work on a copy when the file belongs to an application. A configuration file may require exact property names, value types, or a particular character encoding. A file that parses successfully can still be rejected by the application if required fields are missing.',
          'For a small file, copy the text into the linked formatter. Its input accepts pasted text rather than file uploads. Avoid copying credentials or customer records into online tools; a local editor is a better choice for confidential files.',
        ],
      },
      {
        id: 'format-example', title: 'Format JSON online in three steps',
        paragraphs: ['The example below describes a fictional order. Indentation makes the nested address easier to inspect, while numbers and booleans remain their original types.'],
        steps: ['Paste the JSON text into the JSON Formatter.', 'Choose an indentation size and click Format & validate.', 'Inspect the result, then copy it or download formatted.json.'],
        language: 'JSON',
        code: '{\n  "orderId": "A-104",\n  "total": 24.5,\n  "paid": true,\n  "address": {\n    "city": "Boston",\n    "country": "US"\n  }\n}',
      },
      {
        id: 'terminal', title: 'Pretty-print a file with Python',
        paragraphs: [
          'If Python 3 is installed, its json.tool module can read a file and write an indented copy. Run the command from the directory containing your file. Use a different output filename so you retain the original. On Windows, the Python launcher is commonly named py; on macOS and Linux, it is commonly python3.',
          'A parsing error includes a location to investigate. Look immediately before that location as well: a missing comma on the previous line can cause an error at the next property. Python’s default parser accepts some extensions, including NaN, so use a strict JSON validator when you need interoperable JSON.',
        ],
        language: 'Terminal', code: '# Windows\npy -m json.tool input.json formatted.json\n\n# macOS / Linux\npython3 -m json.tool input.json formatted.json',
      },
      {
        id: 'errors', title: 'Common reasons a JSON file will not validate',
        paragraphs: ['JSON uses double quotes around property names and strings. It does not support JavaScript comments, trailing commas, undefined, or single-quoted strings. Fix the structure at the source when possible rather than replacing every quote automatically; apostrophes can be legitimate data.'],
        table: { headings: ['Problem', 'Example', 'Correction'], rows: [
          ['Single quotes', "{'name': 'Sam'}", '{"name": "Sam"}'],
          ['Trailing comma', '{"active": true,}', '{"active": true}'],
          ['Wrong boolean case', '{"active": True}', '{"active": true}'],
          ['Missing quotes on a key', '{name: "Sam"}', '{"name": "Sam"}'],
        ] },
      },
      {
        id: 'limits', title: 'Large files, duplicate keys, and long IDs',
        paragraphs: [
          'Browser formatters parse the entire document in memory. For a large export, use a local streaming tool or inspect a small representative sample. JSON Lines files contain separate JSON values on separate lines and are not one ordinary JSON document.',
          'JavaScript numbers cannot represent every integer above 9,007,199,254,740,991 exactly. Store identifiers such as long account numbers as strings before they reach a JavaScript parser. Duplicate property names can also disappear during parsing because parsers often keep only the last value. Keep the original file if either issue is possible.',
        ],
      },
    ],
    faqs: [
      { question: 'Can I open JSON in Excel?', answer: 'Excel versions with a JSON import option can transform JSON into a table. Nested arrays and objects need an explicit expansion step. A text editor or formatter is more appropriate when you want to preserve the original structure.' },
      { question: 'Does formatting repair invalid JSON?', answer: 'No. This formatter reports syntax errors. Correct the error and format again. Guessing missing values or silently removing content could change the meaning of the file.' },
    ],
    sources: [{ title: 'Python documentation: json and the command-line interface', url: 'https://docs.python.org/3/library/json.html' }, { title: 'RFC 8259: The JSON data interchange format', url: 'https://www.rfc-editor.org/rfc/rfc8259' }],
  },
  {
    slug: 'base64-encode-decode-windows-mac-linux',
    title: 'Base64 Encode and Decode on Windows, Mac, and Linux',
    excerpt: 'Copy practical Base64 commands for PowerShell, macOS, and Linux. Learn how to handle UTF-8 text, files, padding, and unexpected newlines.',
    category: 'Everyday Developer Tasks', relatedTool: 'base64-encoder-decoder', relatedGuide: 'base64-encoding',
    tags: ['Base64', 'PowerShell', 'Linux', 'macOS'],
    answer: 'Use the browser Base64 tool for short text. For local files, use PowerShell’s Convert methods on Windows or the base64 command on macOS and Linux. Decode binary files to a file instead of treating their bytes as text.',
    sections: [
      {
        id: 'text-or-file', title: 'Choose text decoding or file decoding',
        paragraphs: ['Base64 represents bytes using printable characters. Those bytes might describe a sentence, an image, a PDF, or compressed data. Successfully decoding Base64 does not mean the result is readable text.', 'The DevX Tool decoder interprets decoded bytes as UTF-8 text. For example, SGVsbG8= becomes Hello. A binary image may produce an invalid UTF-8 error even when its Base64 is valid. Use the file commands below for that case. Encoding is reversible and does not protect secrets.'],
      },
      {
        id: 'windows', title: 'Windows: encode and decode with PowerShell',
        paragraphs: ['Convert the text to UTF-8 bytes before encoding. When decoding text, reverse those two operations. This preserves characters from international alphabets and emoji, unlike treating each character as a single byte.'],
        language: 'PowerShell', code: '$text = "Hello"\n$bytes = [System.Text.Encoding]::UTF8.GetBytes($text)\n[Convert]::ToBase64String($bytes)\n# SGVsbG8=\n\n$decoded = [Convert]::FromBase64String("SGVsbG8=")\n[System.Text.Encoding]::UTF8.GetString($decoded)\n# Hello',
      },
      {
        id: 'mac-linux', title: 'macOS and Linux: use printf instead of echo',
        paragraphs: ['The following commands assume a POSIX-style shell such as bash or zsh. printf sends exactly the five bytes in Hello. A plain echo command usually adds a newline, which changes the Base64 result. GNU base64 on Linux accepts --decode, while macOS provides -D.', 'Both commands produce Hello without adding a display newline, so your shell prompt may appear immediately after the output. That is expected. Check the local command’s help or manual when using another Unix implementation.'],
        language: 'Shell', code: "# Encode on macOS or Linux\nprintf '%s' 'Hello' | base64\n# SGVsbG8=\n\n# Decode on Linux (GNU coreutils)\nprintf '%s' 'SGVsbG8=' | base64 --decode\n\n# Decode on macOS\nprintf '%s' 'SGVsbG8=' | base64 -D",
      },
      {
        id: 'files', title: 'Decode an encoded file to its original bytes',
        paragraphs: ['These examples assume encoded.txt contains only Base64 data. If you copied a data URL, remove the prefix through the first comma, such as data:application/pdf;base64,. Choose a new output path because redirection and WriteAllBytes can replace an existing file.', 'Do not open or execute an unknown decoded file just because decoding succeeded. Base64 describes the representation of the data, not its origin or trustworthiness.'],
        language: 'Shell / PowerShell', code: '# Linux\nbase64 --decode encoded.txt > decoded.bin\n\n# macOS\nbase64 -D -i encoded.txt -o decoded.bin\n\n# Windows PowerShell (run in the folder containing encoded.txt)\n$encoded = Get-Content -Raw -LiteralPath ./encoded.txt\n$bytes = [Convert]::FromBase64String($encoded)\n$outputPath = Join-Path (Get-Location).Path "decoded.bin"\n[System.IO.File]::WriteAllBytes($outputPath, $bytes)',
      },
      {
        id: 'troubleshoot', title: 'Troubleshoot padding and mismatched output',
        paragraphs: ['Standard Base64 uses + and /; Base64url uses - and _. Some Base64url formats omit the trailing = padding. Use a decoder that explicitly supports the format you received rather than repeatedly adding padding to damaged input.', 'GNU base64 wraps long encoded output by default. Its --wrap=0 option disables wrapping when a protocol requires one line. A trailing newline in the original data is different from line wrapping in the encoded representation: removing the former changes the decoded bytes.', 'If a copied value contains spaces where + used to be, it may have passed through a form query parser. Recover the original value and encode it as a query parameter correctly; blindly removing spaces cannot reliably recover lost data.'],
      },
    ],
    faqs: [
      { question: 'Why does Hello encode differently with echo?', answer: 'Hello is SGVsbG8=. Hello followed by a newline is SGVsbG8K. The final newline is an extra input byte, so the encoded strings differ.' },
      { question: 'Can Base64 be decrypted without a key?', answer: 'Base64 is decoded, not decrypted. It has no secret key. Anyone with the string can recover its bytes.' },
    ],
    sources: [{ title: 'GNU coreutils: base64 invocation', url: 'https://www.gnu.org/software/coreutils/manual/html_node/base64-invocation.html' }, { title: 'Microsoft: Convert.ToBase64String', url: 'https://learn.microsoft.com/en-us/dotnet/api/system.convert.tobase64string' }, { title: 'RFC 4648: Base64 and Base64url', url: 'https://www.rfc-editor.org/rfc/rfc4648' }],
  },
  {
    slug: 'url-encode-spaces-plus-signs-query-parameters',
    title: 'URL Encoding: Spaces, Plus Signs, and Query Parameters',
    excerpt: 'Understand %20, +, %2B, and double encoding. Build query parameters correctly with URLSearchParams and fix broken links with concrete examples.',
    category: 'Web Development', relatedTool: 'url-encoder-decoder', relatedGuide: 'url-encoding', tags: ['URLs', 'JavaScript', 'APIs'],
    answer: 'Use URLSearchParams to build a query string from raw values. It represents spaces as + and literal plus signs as %2B. Use encodeURIComponent for an individual URL component; it represents spaces as %20.',
    sections: [
      {
        id: 'characters', title: 'What do %20, +, and %2B mean?',
        paragraphs: ['Percent encoding represents bytes as a percent sign followed by two hexadecimal digits. The rules depend on which part of a URL you are working with. In form-style query strings, + represents a space. In a URL path, it does not automatically have that meaning.', 'A plus sign in an email alias or a programming language name must survive decoding as a literal plus sign. For instance, a search for C++ should not become C followed by two spaces.'],
        table: { headings: ['Original value', 'encodeURIComponent', 'URLSearchParams value'], rows: [['hello world', 'hello%20world', 'hello+world'], ['C++', 'C%2B%2B', 'C%2B%2B'], ['a&b', 'a%26b', 'a%26b'], ['50%', '50%25', '50%25']] },
      },
      {
        id: 'build-query', title: 'Build a query string from raw values',
        paragraphs: ['Give URLSearchParams the unencoded values. It handles reserved characters during serialization. Use a URL object to keep the hostname, path, query, and fragment separate.', 'In this example, the plus sign in the address and the ampersand in the search phrase remain part of their values. Manually concatenating those values into a URL would make the ampersand look like the start of another parameter.'],
        language: 'JavaScript', code: 'const url = new URL("https://example.com/search");\nurl.searchParams.set("q", "coffee & tea");\nurl.searchParams.set("email", "alex+news@example.com");\nconsole.log(url.href);\n// https://example.com/search?q=coffee+%26+tea&email=alex%2Bnews%40example.com\nconsole.log(url.searchParams.get("email"));\n// alex+news@example.com',
      },
      {
        id: 'decode', title: 'Decode a component or parse a complete query',
        paragraphs: ['decodeURIComponent reverses percent encoding, but does not turn a plus sign into a space. That makes it suitable for an encoded component when you know the producer used percent encoding. Use URLSearchParams for a form-style query.', 'The DevX Tool URL decoder follows decodeURIComponent semantics. If you paste hello+world into it, the plus sign stays visible. This behavior is useful when a literal plus is intended, but it is not a substitute for parsing an entire form query.'],
        language: 'JavaScript', code: 'console.log(decodeURIComponent("hello%20world")); // hello world\nconsole.log(decodeURIComponent("hello+world"));   // hello+world\nconst params = new URLSearchParams("q=hello+world&lang=C%2B%2B");\nconsole.log(params.get("q"));    // hello world\nconsole.log(params.get("lang")); // C++',
      },
      {
        id: 'double-encoding', title: 'Fix %2520 and other double-encoding problems',
        paragraphs: ['The value %2520 usually means an existing %20 was encoded again: % becomes %25. This happens when you call encodeURIComponent and then pass the result to URLSearchParams, which performs another encoding pass.', 'Fix the producer so it passes raw values to the serializer exactly once. Do not repeatedly decode every received value until it stops changing. A literal value such as the text %20 may be intentional, and repeated decoding can alter paths or security checks.'],
        language: 'JavaScript', code: 'const wrong = new URLSearchParams({ q: encodeURIComponent("New York") });\nconsole.log(wrong.toString()); // q=New%2520York\n\nconst correct = new URLSearchParams({ q: "New York" });\nconsole.log(correct.toString()); // q=New+York',
      },
      {
        id: 'international', title: 'International text and malformed escapes',
        paragraphs: ['Characters such as é are encoded as UTF-8 bytes, so one visible character can become multiple percent sequences. That is normal and works across countries; a URL does not need to be limited to English words.', 'An incomplete escape such as %2 or invalid UTF-8 can make decodeURIComponent throw URIError. Catch that error and report malformed input rather than silently changing the string. When debugging a request, compare the raw query in the network panel with the parsed value on the server.'],
      },
    ],
    faqs: [{ question: 'Should I encode an entire URL with encodeURIComponent?', answer: 'Only when the complete URL is itself a value, such as a redirect query parameter. Encoding the whole destination URL directly also encodes its colon and slashes, so it is no longer a normal navigable URL.' }, { question: 'Why did a Base64 plus sign turn into a space?', answer: 'A form-style query parser interprets raw + as a space. Pass the original Base64 value to URLSearchParams.set so the plus sign is serialized as %2B.' }],
    sources: [{ title: 'MDN: URLSearchParams', url: 'https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams' }, { title: 'MDN: encodeURIComponent', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent' }],
  },
  {
    slug: 'convert-unix-timestamp-javascript-python-excel',
    title: 'Convert Unix Timestamps in JavaScript, Python, and Excel',
    excerpt: 'Convert epoch seconds and milliseconds to dates, display UTC and US time zones, and avoid spreadsheet and daylight saving time mistakes.',
    category: 'Everyday Developer Tasks', relatedTool: 'timestamp-converter', relatedGuide: 'unix-timestamps', tags: ['Timestamps', 'JavaScript', 'Python', 'Excel'],
    answer: 'Unix timestamps commonly count seconds since January 1, 1970 at 00:00:00 UTC. JavaScript Date uses milliseconds, so multiply epoch seconds by 1,000. Confirm the unit in your data source before converting.',
    sections: [
      {
        id: 'units', title: 'Identify seconds or milliseconds first',
        paragraphs: ['The values 1704067200 seconds and 1704067200000 milliseconds represent the same instant: January 1, 2024 at 00:00:00 UTC. For contemporary dates, ten digits often suggest seconds and thirteen often suggest milliseconds. Digit count is only a clue, not a reliable format definition.', 'Check the API documentation or field name. Very old dates, negative values, and microsecond timestamps break digit-count shortcuts. An unexpected date in January 1970 often means seconds were interpreted as milliseconds.'],
        table: { headings: ['Value', 'Unit', 'UTC result'], rows: [['0', 'seconds', '1970-01-01 00:00:00'], ['1704067200', 'seconds', '2024-01-01 00:00:00'], ['1704067200000', 'milliseconds', '2024-01-01 00:00:00']] },
      },
      {
        id: 'javascript', title: 'Convert epoch time in JavaScript',
        paragraphs: ['Use toISOString for a UTC result with an explicit Z suffix. When going from a date string to epoch seconds, include a timezone offset or Z so the input has an unambiguous meaning.', 'For a visitor-facing display, format the same instant with Intl.DateTimeFormat. Use a named region such as America/New_York rather than subtracting a fixed number of hours; the region’s UTC offset can change with daylight saving time.'],
        language: 'JavaScript', code: 'const seconds = 1704067200;\nconst date = new Date(seconds * 1000);\nconsole.log(date.toISOString()); // 2024-01-01T00:00:00.000Z\n\nconsole.log(new Intl.DateTimeFormat("en-US", {\n  timeZone: "America/New_York",\n  dateStyle: "medium", timeStyle: "short"\n}).format(date)); // Dec 31, 2023, 7:00 PM\n\nconst backToSeconds = Math.floor(\n  Date.parse("2024-01-01T00:00:00Z") / 1000\n);\nconsole.log(backToSeconds); // 1704067200',
      },
      {
        id: 'python', title: 'Convert with an explicit UTC timezone in Python',
        paragraphs: ['Pass timezone.utc to create a timezone-aware datetime. Without an explicit timezone, fromtimestamp uses the machine’s local timezone, so the displayed result may differ between a laptop and a server.', 'For a millisecond input, divide by 1,000 before calling fromtimestamp. Keep the original integer if your application must preserve exact subsecond values through later calculations.'],
        language: 'Python', code: 'from datetime import datetime, timezone\n\nseconds = 1704067200\ndate = datetime.fromtimestamp(seconds, tz=timezone.utc)\nprint(date.isoformat())  # 2024-01-01T00:00:00+00:00\nprint(int(date.timestamp()))  # 1704067200',
      },
      {
        id: 'excel', title: 'Convert a timestamp in Excel or Google Sheets',
        paragraphs: ['If A2 contains epoch seconds, divide by 86,400 to convert seconds to days and add the epoch date. For milliseconds, divide by 86,400,000 instead. Format the result cell as a date and time; otherwise the spreadsheet shows a serial number.', 'These formulas calculate a UTC date and time and do not apply named timezone or daylight saving rules. Label the column UTC to prevent readers from mistaking it for their local time. Some spreadsheet locales use semicolons instead of commas in function arguments.'],
        language: 'Spreadsheet formulas', code: '=DATE(1970,1,1)+A2/86400\n\n=DATE(1970,1,1)+A2/86400000\n\nExample display format: yyyy-mm-dd hh:mm:ss',
      },
      {
        id: 'international-dates', title: 'Avoid ambiguous dates across countries',
        paragraphs: ['The text 03/04/2026 can mean March 4 or April 3. Exchange timestamps as a documented numeric unit or use an ISO 8601 timestamp with an offset. Keep localized formatting for the display layer.', 'A time such as 1:30 AM can occur twice on the day some regions leave daylight saving time. A date without an offset cannot distinguish those instants. Store the instant and, where relevant, the intended named timezone separately. For future appointments, keep the scheduling rules too rather than assuming today’s offset will always apply.'],
      },
    ],
    faqs: [{ question: 'Is a Unix timestamp different in the USA and Europe?', answer: 'The same timestamp identifies the same instant everywhere. The displayed calendar date and time depend on the timezone and formatting locale.' }, { question: 'Why is my converted date in 1970?', answer: 'A common cause is passing epoch seconds directly to a function that expects milliseconds. Confirm the source unit before multiplying; missing or zero values can also produce an epoch-era date.' }],
    sources: [{ title: 'MDN: JavaScript Date', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date' }, { title: 'Python: datetime.fromtimestamp', url: 'https://docs.python.org/3/library/datetime.html#datetime.datetime.fromtimestamp' }, { title: 'Microsoft: DATE function', url: 'https://support.microsoft.com/en-us/office/date-function-e36c0c8c-4104-49da-ab83-82328b832349' }],
  },
  {
    slug: 'regex-cheat-sheet-javascript-examples',
    title: 'Regex Cheat Sheet: Practical JavaScript Examples',
    excerpt: 'Learn regex anchors, character classes, groups, and flags with copyable JavaScript examples, matching test cases, and common mistakes to avoid.',
    category: 'Web Development', relatedTool: 'regex-tester', relatedGuide: 'regex-basics', tags: ['Regex', 'JavaScript', 'Validation'],
    answer: 'Start with a small pattern, test both matching and nonmatching input, and add anchors when the entire value must match. The examples here use JavaScript regular expressions; syntax and Unicode behavior can differ in other engines.',
    sections: [
      {
        id: 'syntax', title: 'The regex syntax you will use most often',
        paragraphs: ['A regex describes a text pattern. Character classes choose which characters may appear, quantifiers control repetition, and anchors constrain where the match starts or ends. Add one constraint at a time so failed matches are easier to explain.'],
        table: { headings: ['Pattern', 'Meaning', 'Example'], rows: [['[0-9]', 'One ASCII digit', '7'], ['[A-Za-z]', 'One ASCII letter', 'Q'], ['[^0-9]', 'One character that is not an ASCII digit', 'x'], ['{2,4}', 'Repeat the previous item two to four times', '[0-9]{2,4}'], ['+', 'One or more repetitions', '[A-Z]+'], ['?', 'Zero or one repetition', 'colou?r'], ['^ and $', 'Start and end boundaries; behavior depends on flags', '^[0-9]+$'], ['(a|b)', 'Group with alternatives', '(cat|dog)']] },
      },
      {
        id: 'examples', title: 'Copyable patterns and expected results',
        paragraphs: ['For the site’s tester, enter only the pattern in the pattern field and set flags separately. JavaScript source code uses slashes to delimit a regex literal; those slashes are not part of the pattern you paste into that field.', 'The ZIP pattern below checks US ZIP code shape only. It does not establish that a postal code exists or that an address is deliverable. Other countries use different formats, so select validation rules based on the address country.'],
        language: 'JavaScript', code: 'const zip = /^[0-9]{5}(?:-[0-9]{4})?$/;\nconsole.log(zip.test("02108"));      // true\nconsole.log(zip.test("02108-1234")); // true\nconsole.log(zip.test("2108"));       // false\n\nconst hexColor = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;\nconsole.log(hexColor.test("#0d9488")); // true\nconsole.log(hexColor.test("#xyz"));    // false\n\nconst slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;\nconsole.log(slug.test("json-format-101")); // true\nconsole.log(slug.test("-json"));           // false',
      },
      {
        id: 'flags', title: 'Choose flags deliberately',
        paragraphs: ['The i flag enables case-insensitive matching. The g flag finds multiple matches. The m flag lets anchors match line boundaries within a multiline string, and s lets a dot match line terminators. The u flag enables Unicode-aware parsing and features such as Unicode property escapes.', 'Repeated test calls on a regex with g or y update lastIndex, which can make validation appear inconsistent. For a simple yes-or-no form validation check, avoid those stateful flags unless you explicitly manage lastIndex.'],
        language: 'JavaScript', code: 'const numbers = "Order 42, batch 17".match(/[0-9]+/g);\nconsole.log(numbers); // ["42", "17"]\n\nconst letters = /^\u005cp{L}+$/u;\nconsole.log(letters.test("Montréal")); // true\nconsole.log(letters.test("Paris7"));   // false',
      },
      {
        id: 'escaping', title: 'Escape a backslash in JavaScript strings',
        paragraphs: ['A regex literal and a string passed to RegExp are parsed differently. In a string, the JavaScript parser consumes escapes before the regular expression parser sees the value. Double the backslash to preserve a regex escape.', 'For a literal dot, use an escaped dot in the pattern. An unescaped dot generally matches any character except line terminators, so a pattern intended for a filename can accidentally accept unrelated text.'],
        language: 'JavaScript', code: 'const literal = /\u005cd+/;\nconst fromString = new RegExp("\\\\d+");\nconsole.log(literal.test("item42"));    // true\nconsole.log(fromString.test("item42")); // true',
      },
      {
        id: 'limits', title: 'Know when regex is the wrong validator',
        paragraphs: ['Use a JSON parser for JSON and a URL parser for URLs. An email regex can check a rough shape, but mailbox verification requires a confirmation flow. International names can include spaces, apostrophes, combining marks, and characters outside Latin alphabets; a short ASCII-only pattern is not a universal name validator.', 'Test empty strings, leading or trailing whitespace, long input, and near-misses. Nested repetition such as (a+)+ can require excessive work on failing input. Keep patterns bounded where practical and avoid testing potentially expensive patterns against large text in a browser tab.', 'A passing match proves only the condition encoded by that pattern. Keep domain checks separate: a correctly shaped date can still be impossible, and a syntactically valid identifier can still be absent from your database.'],
      },
    ],
    faqs: [{ question: 'Why does a regex work in one language but fail in another?', answer: 'Regex engines differ in supported syntax, escaping rules, flags, and Unicode behavior. These examples target JavaScript; check your runtime before reusing them in Python, Java, SQL, or a command-line tool.' }, { question: 'Should I use regex to validate an email address?', answer: 'Use a modest format check to help users catch obvious mistakes, then verify ownership by sending a confirmation message. A regex cannot prove an address exists or can receive mail.' }],
    sources: [{ title: 'MDN: Regular expressions guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions' }, { title: 'MDN: RegExp.prototype.test and lastIndex', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test' }],
  },
  {
    slug: 'check-sha256-checksum-windows-mac-linux',
    title: 'How to Check a SHA-256 Checksum on Windows, Mac, and Linux',
    excerpt: 'Verify a downloaded file with PowerShell Get-FileHash, shasum, or sha256sum. Compare hashes correctly and understand what a checksum can prove.',
    category: 'Everyday Developer Tasks', relatedTool: 'hash-generator', relatedGuide: 'hashing-explained', tags: ['SHA-256', 'Checksums', 'Windows', 'Linux'],
    answer: 'Calculate the downloaded file’s SHA-256 hash and compare all 64 hexadecimal characters with the checksum published by the software provider. Use Get-FileHash on Windows, shasum -a 256 on macOS, or sha256sum on Linux.',
    sections: [
      {
        id: 'before-starting', title: 'Get the expected checksum from the publisher',
        paragraphs: ['A checksum is a compact fingerprint of a file’s bytes. Download the expected SHA-256 value from the publisher’s official release page or verified checksum manifest. Match the exact version, operating system, architecture, and archive format; a ZIP file and an installer for the same program have different hashes.', 'A matching hash helps establish that your file matches the reference. If an attacker can replace both the download and the checksum, the comparison does not establish authenticity. A signed release or signed checksum manifest provides a separate verification step when the publisher supports it.'],
      },
      {
        id: 'windows', title: 'Windows: use Get-FileHash in PowerShell',
        paragraphs: ['Open PowerShell in the download directory and replace example.zip with your filename. LiteralPath treats the filename literally, which avoids interpreting characters such as square brackets as wildcard syntax. The command reads the file without executing it.'],
        language: 'PowerShell', code: 'Get-FileHash -LiteralPath "./example.zip" -Algorithm SHA256\n\n# To print only the hash:\n(Get-FileHash -LiteralPath "./example.zip" -Algorithm SHA256).Hash',
      },
      {
        id: 'mac-linux', title: 'macOS and Linux: calculate the file hash',
        paragraphs: ['Run the appropriate command from the folder containing the download. Quote paths with spaces. The output contains the hexadecimal hash followed by the filename; compare the hash field with the publisher’s value.', 'Hashing a large disk image may take a while because the tool must read all its bytes. Wait for the command to finish before copying the result. A downloaded archive’s checksum applies to the archive itself, not to an extracted file inside it.'],
        language: 'Shell', code: '# macOS\nshasum -a 256 "./example.zip"\n\n# Linux (GNU coreutils)\nsha256sum "./example.zip"\n\n# Linux: verify a trusted checksum manifest\nsha256sum --check SHA256SUMS',
      },
      {
        id: 'compare', title: 'Compare the whole value, then investigate mismatches',
        paragraphs: ['A SHA-256 value contains 64 hexadecimal characters. Uppercase and lowercase A–F represent the same digits. Compare the full value, not only the first or last few characters.', 'If the values differ, stop using the file until you understand why. Check that the download completed, that you selected the right release, and that the expected checksum is SHA-256 rather than SHA-1 or SHA-512. Re-download from the official source and compare again.', 'A mismatch does not by itself prove malware: a partial download, wrong release, or changed archive also changes the hash. It does mean that the file is not byte-for-byte the expected download for practical verification purposes.'],
        steps: ['Confirm the algorithm is SHA-256 on both sides.', 'Check the release version, platform, and filename.', 'Compare all 64 hex characters, ignoring only letter case.', 'Investigate any mismatch before running or installing the file.'],
      },
      {
        id: 'text-versus-file', title: 'Text hashing is different from hashing a file',
        paragraphs: ['The DevX Tool hash generator hashes UTF-8 text entered in its field. It does not upload or inspect a file from your disk. Use the terminal commands above to verify downloads; pasting a filename into a text hash tool hashes the filename, not the file contents.', 'For a reproducible text example, enter abc with no newline. Its SHA-256 is shown below. Adding a newline, changing line endings, or changing the Unicode normalization of text changes the underlying bytes and can change the hash.'],
        language: 'SHA-256 of the three UTF-8 bytes in abc', code: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
      },
    ],
    faqs: [{ question: 'Does a matching SHA-256 checksum mean a file is safe?', answer: 'It means the file matches the expected hash for practical integrity verification. Safety also depends on trusting the publisher and obtaining an authentic reference checksum. A hash alone does not scan for malware.' }, { question: 'Can I recover a file from its SHA-256 hash?', answer: 'No. A hash is not a reversible encoding of the file. To recover a missing file, obtain another copy from a backup or the original source.' }],
    sources: [{ title: 'Microsoft: Get-FileHash', url: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-filehash' }, { title: 'GNU coreutils: sha2 utilities', url: 'https://www.gnu.org/software/coreutils/manual/html_node/sha2-utilities.html' }, { title: 'Perl documentation: shasum', url: 'https://perldoc.perl.org/shasum' }],
  },
];

export const tutorialPosts: BlogPost[] = tutorials.map((tutorial) => {
  const words = [tutorial.answer, ...tutorial.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.steps ?? []), section.code ?? '']), ...tutorial.faqs.flatMap((faq) => [faq.question, faq.answer])].join(' ').split(/\s+/).length;
  return {
    slug: tutorial.slug, title: tutorial.title, excerpt: tutorial.excerpt,
    category: tutorial.category, relatedTool: tutorial.relatedTool, relatedGuide: tutorial.relatedGuide,
    tags: tutorial.tags, date: '2026-10-27', author: 'DevX Tool Team',
    readingTime: `${Math.max(1, Math.ceil(words / 200))} min read`,
  };
});
