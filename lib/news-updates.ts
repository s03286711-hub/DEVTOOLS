import type { NewsStory } from '@/lib/news';

export const newsUpdates: NewsStory[] = [
  {
    slug: 'github-copilot-server-to-server-authentication-preview',
    title: 'GitHub Copilot Server-to-Server Authentication Preview',
    description: 'GitHub announced organization-owned authentication for Copilot SDK services. Understand the public preview, app permissions, and rollout checks.',
    topic: 'AI & developer tools', published: '2026-10-28', eventDate: '2026-10-27',
    source: { name: 'GitHub Changelog', url: 'https://github.blog/changelog/2026-10-27-github-copilot-supports-server-to-server-authentication/' },
    summary: 'GitHub announced a public preview of server-to-server authentication for Copilot on October 27. Services built with the Copilot SDK can use an organization-installed GitHub App instead of depending on an individual user’s signed-in session.',
    facts: [
      'The announcement describes a read-only Copilot Requests organization permission and short-lived installation access tokens supplied to the SDK.',
      'Requests are attributed and billed to the organization owning the installation. Its model policies, budgets, and spending controls apply.',
      'Organization owners can inspect app access and app-attributed usage, and suspend or uninstall an app to stop its access. This is a public preview, so teams should verify the current documentation before relying on it.',
    ],
    analysis: [
      { title: 'Why a service identity changes the operational model', paragraphs: [
        'Our analysis: an automated workflow needs a clear owner even when no person is currently using it. A service that depends on a developer’s personal session can become difficult to reason about when that person changes teams, leaves, or updates their account settings.',
        'An organization-owned installation provides a more explicit place to connect access, usage review, and responsibility. It still needs an owner who can explain what the app does, why it has access, and when it should be disabled. Treat that ownership record as part of the integration.',
      ] },
      { title: 'Evaluate a small workflow before a broad rollout', paragraphs: [
        'Consider a service that prepares a summary of a pull request. Define the repository inputs, expected output, and maximum amount of work for one run. Test the happy path alongside an expired credential, a denied request, and a temporary provider error. Each should produce an understandable outcome rather than an endless retry loop.',
        'Keep authentication and application permissions separate in your review. Successfully obtaining a credential does not prove that every planned action is permitted. Likewise, accepting a request does not establish that the generated summary is correct. Check the resulting artifact against the original change.',
        'For a pilot, record a request identifier, the associated installation, and the result category without writing raw tokens into logs. This makes support investigations easier while reducing the chance that routine debugging exposes credentials. Use synthetic inputs when testing the logging path.',
      ] },
      { title: 'Keep the integration easy to stop', paragraphs: [
        'Before enabling a scheduled job, document who can pause it and where that control lives. Try a controlled failure in a test environment so the team knows what a revoked permission looks like. A clear shutdown procedure is easier to use when it has already been exercised.',
        'Compare the pilot’s actual usage with its expected workload. A sudden increase can come from a legitimate larger input, duplicate scheduling, or a retry bug. Investigate the cause before simply increasing a budget. These are deployment checks for a proposed integration, not claims about the preview’s measured performance.',
      ] },
    ],
    checklist: ['Confirm public-preview requirements in the current official documentation.', 'Assign an owner to the GitHub App and its scheduled workloads.', 'Test expired credentials, denied access, and bounded retries.', 'Review organization usage and confirm the app can be suspended when needed.'],
    related: [{ title: 'Understand HTTP errors when an API request fails', href: '/blog/http-status-codes-400-401-403-404-429-500-explained/' }, { title: 'Understand AI agents and their tools', href: '/blog/what-is-an-ai-agent-vs-chatbot/' }, { title: 'Inspect a sample JSON response', href: '/tools/json-formatter/' }],
  },
  {
    slug: 'github-universe-2026-dates-online-watch-guide',
    title: 'GitHub Universe 2026: Dates & Online Viewing Guide',
    description: 'GitHub Universe runs October 28–29 in San Francisco and online. Find the official virtual registration and a practical way to evaluate developer announcements.',
    topic: 'Developer events', published: '2026-10-28', eventDate: '2026-10-28',
    source: { name: 'GitHub Universe official event site', url: 'https://githubuniverse.com/' },
    summary: 'GitHub lists Universe 2026 for October 28–29 in San Francisco, with virtual participation available. This guide points to the official event information and explains how to follow announcements without treating a demonstration as a finished production rollout.',
    facts: [
      'The official site lists free virtual registration and access to streamed keynote content. It describes recordings as available once published.',
      'The event site says in-person tickets are sold out. Check the official registration and session pages for the current access options and schedule.',
      'The event dates are the dates advertised for San Francisco. Viewers elsewhere should convert individual session times to their own timezone; this article does not claim that every session is streamed.',
    ],
    analysis: [
      { title: 'Choose sessions around problems you actually need to solve', paragraphs: [
        'Our analysis: a conference is easier to use when you arrive with a short question list. You might want to understand how to review agent-written changes, diagnose a slow workflow, or manage access to a repository. A session that answers one of those questions can be more useful than collecting every product name mentioned on stage.',
        'Keep a simple viewing note with three columns: the problem, the demonstrated approach, and the evidence you still need. For example, a compelling demo of an automated code change should lead to questions about supported repositories, permissions, tests, and the review process.',
      ] },
      { title: 'Separate announcements from your migration plan', paragraphs: [
        'When a feature is announced, look for its linked release note or documentation. Record whether it is generally available, in preview, or described as a future plan. Also record who can use it: a personal account, an organization, or a particular managed environment may have different access conditions.',
        'Do not rewrite a working project around an inferred feature. First reproduce a narrow example in a test repository and compare its output with your existing workflow. Capture a diff or another observable result so the evaluation is something a teammate can review.',
        'If the claim is about saving time, define the task and measure a complete run, including correction and review. A shorter command sequence does not automatically produce a more reliable result. This is a suggested evaluation method, not an event benchmark or an endorsement of a particular tool.',
      ] },
      { title: 'Make event notes useful after the broadcast', paragraphs: [
        'Save the official source link beside each note, along with the date you checked it. This helps distinguish a later product change from a misunderstanding of the original announcement. Avoid copying a whole transcript into your team’s documentation when a short explanation and a precise reference will do.',
        'After the event, choose one improvement to investigate rather than creating an oversized migration list. Write a small acceptance check: what should work, which existing behavior must still work, and what would make the experiment worth keeping. Share that result with the people who maintain the workflow.',
      ] },
    ],
    checklist: ['Use the official event site for virtual registration and the session schedule.', 'Convert session times using the timezone shown by the organizer.', 'Check the release status and documentation of any feature you want to try.', 'Evaluate one relevant workflow in a test project before changing production.'],
    related: [{ title: 'Compare an experiment’s before-and-after output', href: '/tools/text-diff/' }, { title: 'Read about Copilot assisted permissions', href: '/news/github-copilot-assisted-permissions-explained/' }, { title: 'Compare configuration formats', href: '/blog/json-vs-yaml-vs-toml-config-files/' }],
  },
];
