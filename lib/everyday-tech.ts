import { developerArticles } from '@/lib/developer-articles';
import type { Tutorial } from '@/lib/tutorials';

export const everydayTechArticles: Tutorial[] = [
  ...developerArticles,
  {
    slug: 'clear-browser-cache-without-deleting-passwords',
    title: 'How to Clear Browser Cache Without Deleting Passwords',
    excerpt: 'Understand cache, cookies, and saved passwords. Clear cached files in Chrome or Firefox while keeping the data you still need.',
    category: 'Browsers & everyday tech', tags: ['Browser cache', 'Chrome', 'Firefox', 'Troubleshooting'],
    answer: 'Choose only the cached-files category in your browser’s browsing-data settings. Leave passwords, cookies, history, and autofill unchecked unless you intentionally want to remove them. Read the selected categories before confirming.',
    sections: [
      { id: 'different-data', title: 'Cache, cookies, and passwords are different', paragraphs: [
        'A browser cache stores copies of resources such as images, scripts, and stylesheets. Cookies and other site storage can hold sessions, preferences, and application data. Saved passwords belong to a separate credential-management feature. Clearing one category does not mean you have cleared all three.',
        'That distinction matters when a site looks broken but you want to stay signed in. Start with a normal reload, then try clearing cached resources if the problem persists. Selecting every browsing-data category creates extra work and can remove information unrelated to the original problem.',
      ], table: { headings: ['Category', 'Typical contents', 'What removing it may change'], rows: [['Cached files', 'Downloaded page resources', 'Resources are downloaded again'], ['Cookies and site data', 'Sessions, preferences, local app data', 'Sign-ins or site settings may be lost'], ['Saved passwords', 'Stored login credentials', 'The browser may no longer fill those credentials']] } },
      { id: 'chrome', title: 'Clear cached files in Chrome', paragraphs: [
        'Open Chrome’s Settings and find Delete browsing data. On desktop this is in the privacy and security area. On Android it is also available from the main menu; open the more detailed options if you need to choose categories individually. Labels can vary by device and version.',
        'Select Cached images and files. Review the time range and leave other data types unselected. Confirm only after checking the summary. Removing saved account data can affect other devices when that data is synchronized, so avoid treating this dialog as a general cleanup button.',
      ], steps: ['Save any unfinished work in open tabs.', 'Open the browsing-data dialog and inspect every selected category.', 'Select only cached images and files, then choose the time range.', 'Confirm and reload the affected page.'] },
      { id: 'firefox', title: 'Clear temporary cached files in Firefox', paragraphs: [
        'In Firefox Settings, open Privacy & Security and locate the browsing-data or cookies-and-site-data area. Open its clear-data dialog and select only Temporary cached files and pages, or the equivalent cache category shown by your version. Leave cookies and other categories unchecked if you want to retain them.',
        'Return to the affected site and test the same action that failed earlier. A first load may need to download resources again. If the problem disappears, you have evidence that the old local resources contributed; it does not prove every future issue has the same cause.',
      ] },
      { id: 'still-broken', title: 'If clearing cache does not fix the website', paragraphs: [
        'Record the exact symptom before trying another change. A layout that looks old, a sign-in loop, and a network error can have different causes. Compare a private window, another browser, or another device using non-sensitive test input. Change one variable at a time so the result tells you something useful.',
        'If only one browser profile fails, investigate extensions and site-specific settings. If every device fails, check the service’s status page or contact its support team. Repeatedly deleting all browser data is unlikely to explain an outage on the website’s server.',
        'For a support request, include the page address, browser version, time of the error, and what you already tried. Remove session tokens or personal details from screenshots and copied URLs. This gives the recipient enough context to reproduce the issue without exposing unrelated data.',
      ] },
    ],
    faqs: [{ question: 'Will clearing cache sign me out?', answer: 'Clearing only cached resources usually preserves the cookies used for sign-in. Removing cookies or site data can sign you out. Read the categories because some cleanup options combine them.' }, { question: 'Should I clear cache every day?', answer: 'It is a troubleshooting step, not a daily requirement. The cache normally helps the browser reuse downloaded resources. Investigate a recurring problem instead of repeatedly clearing everything.' }],
    sources: [{ title: 'Google Chrome: delete browsing data', url: 'https://support.google.com/chrome/answer/2392709?hl=en' }, { title: 'Mozilla: clear the Firefox cache', url: 'https://support.mozilla.org/en-US/kb/how-clear-firefox-cache' }],
  },
  {
    slug: 'passkeys-vs-passwords-explained',
    title: 'Passkeys vs Passwords: How They Work and What to Choose',
    excerpt: 'Learn how passkeys differ from passwords and two-factor codes, what happens when you change devices, and how to prepare account recovery.',
    category: 'Security & everyday tech', relatedTool: 'password-generator', relatedGuide: 'strong-passwords', tags: ['Passkeys', 'Passwords', 'Account security'],
    answer: 'A password is a secret you enter or autofill. A passkey uses a cryptographic credential and usually asks you to approve sign-in with your device unlock method. Before switching, check where the passkey is stored and how you would recover access.',
    sections: [
      { id: 'how-they-work', title: 'What changes when you sign in with a passkey?', paragraphs: [
        'With a password, you prove knowledge of a shared secret. With a passkey, the service checks a cryptographic response associated with your account. The private credential is managed by your authenticator or credential provider; the website does not need to receive a reusable password for that sign-in.',
        'The fingerprint, face check, or device PIN is used to authorize access locally. It is not a new password that you must give to the website. On the web, passkeys use WebAuthn, which binds authentication to the intended site. That helps resist lookalike login pages that try to capture credentials.',
      ] },
      { id: 'comparison', title: 'Compare the experience, not just the name', paragraphs: ['The right setup depends on your devices, the service’s support, and the recovery options available to you. Review those three things before changing an important account.'], table: { headings: ['Question', 'Password', 'Passkey'], rows: [['What do I provide?', 'A secret string', 'Approval to use a credential'], ['Can I type it on any device?', 'Usually, if the service accepts passwords', 'Depends on your provider and sign-in options'], ['What about phishing?', 'A secret can be entered into a fake form', 'The credential is bound to the intended site'], ['What if I lose a device?', 'Use your password manager and account recovery', 'Use another available passkey or the service’s recovery flow']] } },
      { id: 'new-phone', title: 'Plan for a new or lost phone', paragraphs: [
        'Some passkeys synchronize through a credential provider; others remain bound to a particular authenticator, such as a hardware security key. Do not assume that every credential automatically follows you to every device or operating system.',
        'Before replacing a phone, list the accounts you would need immediately: primary email, the credential provider, and services you use for work. Open each account’s security settings and confirm which recovery methods and other sign-in options are actually enabled. Test access from another trusted device while your current device still works.',
        'Write down a recovery plan that describes the route, not the secret. For example: “Use the spare security key stored at home, then update the account’s device list.” Keep recovery codes in a protected location and never paste them into a troubleshooting form or chatbot.',
      ] },
      { id: 'setup', title: 'A practical way to start', paragraphs: [
        'Start with one supported account and follow its official security settings. Notice where the device says it is saving the passkey. After setup, sign out and try a fresh sign-in before removing any existing method. If an employer manages the account, follow its policy rather than changing recovery options independently.',
        'Passkeys do not make every account problem disappear. A compromised device, an active stolen session, or a weak recovery process can still matter. Keep software updated and review unfamiliar sessions when the service provides that option. For accounts that still require passwords, use unique generated passwords stored in a password manager.',
      ] },
    ],
    faqs: [{ question: 'Is a passkey the same as a six-digit authentication code?', answer: 'No. A one-time code is a value you enter during a sign-in flow. A passkey authorizes a cryptographic response for the intended service. Both the user experience and the underlying protocol differ.' }, { question: 'Can I generate a passkey in an online password tool?', answer: 'No. A random-password generator produces a string. A passkey must be registered with the service through a supported authenticator and registration flow.' }],
    sources: [{ title: 'FIDO Alliance: passkeys', url: 'https://fidoalliance.org/passkeys/' }, { title: 'MDN: Web Authentication API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API' }, { title: 'Google Account: sign in with a passkey', url: 'https://support.google.com/accounts/answer/13548313?hl=en' }],
  },
  {
    slug: 'what-is-an-ai-agent-vs-chatbot',
    title: 'What Is an AI Agent? Agents vs Chatbots vs Automation',
    excerpt: 'Understand AI agents with practical examples. Compare chatbots, fixed automation, and tool-using agents, then learn how to evaluate a real task.',
    category: 'AI explained', relatedTool: 'text-diff', relatedGuide: 'text-comparison', tags: ['AI agents', 'AI chatbots', 'Automation'],
    answer: 'An AI agent uses a model to choose actions toward a goal, often through connected tools. A chatbot mainly exchanges messages, while a fixed automation follows predefined rules. Products can combine all three, so inspect their actual capabilities.',
    sections: [
      { id: 'example', title: 'One task, three different approaches', paragraphs: [
        'Imagine you need to update a project’s setup instructions. A chatbot can suggest a rewritten paragraph. A fixed automation can replace a known version number whenever a release is published. An agent can inspect the repository, identify the relevant file, propose or make a change, and run a check if it has the necessary tools.',
        'These are illustrative workflows, not a guarantee about every product sold as an agent. The important difference is whether the system only produces text, follows a fixed sequence, or selects its next action from the results of earlier actions.',
      ], table: { headings: ['Approach', 'How the next step is chosen', 'Example result'], rows: [['Chatbot', 'Responds to the conversation', 'Suggested setup instructions'], ['Fixed automation', 'Prewritten trigger and rules', 'A known field is updated'], ['AI agent', 'Model-driven decisions within tool and permission limits', 'An inspected change plus a test result']] } },
      { id: 'building-blocks', title: 'The parts behind an agent workflow', paragraphs: [
        'An agent system generally combines a model, instructions, available tools, and a way to track task state. A tool may search documents, read a file, run a calculation, or call a service. A loop lets the system examine a result and decide whether another step is necessary.',
        'The tool list limits what the system can actually do. A confident sentence saying “I sent the report” is not evidence of delivery. Look for the service response or a visible result. Likewise, finding a document is different from understanding it correctly, and producing code is different from running its tests.',
      ] },
      { id: 'good-task', title: 'Give an agent a task you can evaluate', paragraphs: [
        'Replace a broad request such as “improve my project” with a concrete outcome: “Update the installation section for the documented runtime, preserve the troubleshooting section, and show the diff.” Name the input, expected result, constraints, and what the system should do when information is missing.',
        'For a first trial, use a copy of a small project or a sample document. Decide what success looks like before reading the result. If the task is a text revision, compare the old and new versions; if it changes code, run a check that exercises the changed behavior. Human review should focus on correctness as well as style.',
      ], steps: ['Choose a bounded task with a recoverable result.', 'Provide the necessary context and only the access the task needs.', 'Ask for an observable result, such as a diff or an output file.', 'Check the result independently before using it in important work.'] },
      { id: 'limits', title: 'Why more autonomy is not always more useful', paragraphs: [
        'Every additional step is another opportunity to misunderstand an instruction, select the wrong input, or act on an unreliable result. For a repetitive job with a stable rule, a short script may be easier to verify and maintain than a model-driven workflow.',
        'An agent becomes more useful when the task requires interpreting variable context and when mistakes are detectable. Keep irreversible or externally visible actions behind an appropriate review step. Reading an untrusted webpage should not give that page permission to redefine the task or demand access to unrelated files.',
        'Evaluate cost and elapsed time against the completed outcome. A longer transcript is not evidence of better work. Track how often the result is accepted, how many corrections are needed, and whether the same task can be repeated reliably with a different input.',
      ] },
    ],
    faqs: [{ question: 'Does an AI agent work without any human input?', answer: 'Some systems can run several steps independently, but autonomy is a configuration and product-design choice. Goals, permissions, stopping conditions, and review requirements still need to be defined.' }, { question: 'Do I need an AI agent for a simple formatting task?', answer: 'Usually a deterministic tool is enough. Formatting JSON, encoding text, or converting a timestamp has a clear rule and can be checked directly without a model choosing the steps.' }],
    sources: [{ title: 'IBM: What are AI agents?', url: 'https://www.ibm.com/think/topics/ai-agents' }],
  },
  {
    slug: 'how-to-check-suspicious-link-before-clicking',
    title: 'How to Check a Suspicious Link Before Clicking',
    excerpt: 'Learn to read a URL, spot misleading domains, inspect encoded text, and understand the limits of HTTPS and website reputation checks.',
    category: 'Security & everyday tech', relatedTool: 'url-encoder-decoder', relatedGuide: 'url-encoding', tags: ['URLs', 'Phishing', 'Browser safety'],
    answer: 'Inspect the actual destination and hostname, not just the text displayed in a message. When a message asks you to sign in or pay, open the service through your own bookmark or app instead. A padlock or a clean reputation result is not proof that the sender is trustworthy.',
    sections: [
      { id: 'destination', title: 'Look at the destination without opening it', paragraphs: [
        'On a desktop browser, hovering a link usually reveals its destination. On a phone, the available preview or copy-link controls depend on the app; take care not to activate the link while inspecting it. The visible words in a message can describe one service while the actual link points elsewhere.',
        'A reliable first step is often to leave the message and navigate independently. If a notification claims that your account needs attention, open the app or use a bookmark you already trust. This avoids relying on the message’s destination at all.',
      ] },
      { id: 'hostname', title: 'Separate the hostname from the rest of the URL', paragraphs: [
        'For an ordinary HTTPS URL, the host comes after the scheme and before the path. A brand name in a path or query parameter does not make that brand the owner of the destination. Text before an @ sign can be user information rather than the hostname.',
        'The examples below use reserved example domains. They demonstrate URL structure only. For real domains, ownership boundaries can involve multi-part public suffixes, so simply reading the last two dot-separated words is not a universal rule.',
      ], table: { headings: ['Example URL', 'Actual hostname', 'What to notice'], rows: [['https://accounts.example.com/login', 'accounts.example.com', 'accounts is a subdomain'], ['https://example.com.login.example.net/', 'example.com.login.example.net', 'A familiar name appears inside a different domain'], ['https://example.com@account.example.net/', 'account.example.net', 'The text before @ is not the host'], ['https://account.example.net/example.com', 'account.example.net', 'The familiar name is only in the path']] } },
      { id: 'encoding', title: 'Encoded characters and short links need context', paragraphs: [
        'Percent-encoded text such as %2F is a normal part of many URLs, not automatic evidence of a threat. Decoding a component can help explain its contents, but it does not determine whether the destination is safe. Our URL decoder transforms text locally; it does not visit the address or scan it for malware.',
        'A short link hides the final destination, and a redirect can send a browser elsewhere after the first request. If you cannot establish why the sender provided it, use an independent route to the service. Do not assume that a familiar shortening service endorses every destination.',
      ] },
      { id: 'reputation', title: 'Use reputation checks as one signal', paragraphs: [
        'Google’s Safe Browsing site-status tool can report whether its systems currently identify dangerous content at an address. A warning is a reason to stop. An absence of a warning is not a guarantee, especially for a newly created page or a message that uses a legitimate service deceptively.',
        'HTTPS protects the connection to the hostname shown by the browser. It does not establish that the page is the organization you intended to visit. Compare the address with a destination obtained independently, and pay attention to the action being requested.',
      ] },
      { id: 'already-clicked', title: 'If you already opened the link', paragraphs: [
        'Opening a page, downloading a file, and entering a password are different events. Close an unexpected page and avoid approving prompts or opening downloaded files. If you entered credentials, navigate independently to the legitimate service, change the affected password, and review its session and recovery settings.',
        'For a work account, report the message to your organization’s support or security team with the time and what you did. Do not forward passwords, recovery codes, or private sign-in links. A precise account of the action is more useful than guessing what the page might have done.',
      ] },
    ],
    faqs: [{ question: 'Can an online URL decoder tell me whether a link is safe?', answer: 'No. Decoding reveals encoded characters. It does not verify ownership, inspect the remote page, or predict later redirects.' }, { question: 'Should I paste a private invitation link into a public scanner?', answer: 'Avoid submitting links that contain sign-in tokens, private document access, or other secrets. Use the service’s own support or your organization’s approved process instead.' }],
    sources: [{ title: 'Google Safe Browsing and the site-status tool', url: 'https://safebrowsing.google.com/' }, { title: 'MDN: URL hostname', url: 'https://developer.mozilla.org/en-US/docs/Web/API/URL/hostname' }],
  },
];
