import type { NewsStory } from '@/lib/news';

export const newsUpdates: NewsStory[] = [
  {
    slug: 'github-copilot-fusion-model-routing-explained',
    title: 'GitHub Copilot Fusion: Model Routing and Effort Levels',
    description: 'Copilot Fusion is generally available. Learn how model routing, Standard, High, and Max effort levels, organization policies, and billing fit together.',
    topic: 'AI & developer tools', published: '2026-10-29', eventDate: '2026-10-28',
    source: { name: 'GitHub Changelog', url: 'https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/' },
    summary: 'GitHub announced Copilot Fusion general availability on October 28. This October 29 explainer covers a system that chooses and coordinates models for a coding task, with the developer selecting an effort level.',
    facts: [
      'Fusion offers Standard, High, and Max effort settings. Its execution can involve one model, escalation after a quality check, or a separate model reviewing a draft.',
      'GitHub lists support across Copilot plans in VS Code, the Copilot app, Copilot CLI, and JetBrains IDEs. Enterprise and organization model policies constrain the available models.',
      'Usage is charged for each model involved at its standard rate. Check current billing documentation before estimating a workload; an effort setting does not promise a fixed price per task.',
    ],
    analysis: [
      { title: 'Choose an effort level around a concrete coding task', paragraphs: [
        'Our analysis: automatic routing moves the choice of model into the execution system. Developers still need to define the task and decide whether the result is acceptable. A small documentation edit and a change to a shared parser need different evidence before merging.',
        'Start with a task whose expected behavior you can describe. Save the starting revision, give the tool the relevant constraints, and review both the resulting diff and the validation output. A longer reasoning process is useful only if it improves the work you need to ship.',
      ] },
      { title: 'Measure the complete workflow when comparing settings', paragraphs: [
        'Try the same representative task at two effort levels in separate copies of a test project. Record correctness, review time, correction time, and reported usage. Include failed attempts so the comparison reflects the cost of reaching an acceptable result.',
        'Keep the task description and acceptance checks consistent. Treat your observations as evidence about that task and setup. A result from one repository does not establish a universal ranking for every language, project, or team.',
      ] },
    ],
    checklist: ['Update a supported client and check whether Fusion appears in its model picker.', 'Confirm which models your organization permits.', 'Compare effort settings on a repeatable task with clear acceptance checks.', 'Review recorded usage alongside the diff and validation results.'],
    questions: [{ question: 'Is Copilot Fusion a single model?', answer: 'GitHub describes Fusion as a routing and orchestration system. Selecting it lets the system choose how to use available models for a task.' }, { question: 'Which effort levels can I choose?', answer: 'The announcement lists Standard, High, and Max. Check your updated client and organization settings for the options available to your account.' }],
    related: [{ title: 'Understand AI agents and their tools', href: '/blog/what-is-an-ai-agent-vs-chatbot/' }, { title: 'Copilot assisted permissions explained', href: '/news/github-copilot-assisted-permissions-explained/' }, { title: 'Compare an AI-generated change', href: '/tools/text-diff/' }],
  },
  {
    slug: 'github-agentic-workflows-general-availability',
    title: 'GitHub Agentic Workflows: General Availability Explained',
    description: 'GitHub Agentic Workflows is generally available for AI tasks in GitHub Actions. Understand Markdown workflows, permissions, safeguards, and pilot checks.',
    topic: 'AI & automation', published: '2026-10-29', eventDate: '2026-10-28',
    source: { name: 'GitHub Changelog', url: 'https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/' },
    summary: 'GitHub announced general availability of Agentic Workflows on October 28. Teams can describe reasoning tasks in Markdown and compile them into Actions YAML for work such as issue triage or investigation of a failed CI run.',
    facts: [
      'The open source project runs coding agents through GitHub Actions and uses existing runner groups and policy constraints.',
      'GitHub describes read-only defaults, sandboxing, a network firewall, output validation, and threat detection for proposed changes.',
      'Availability includes GitHub Free, Team, and Enterprise on github.com. The default Copilot CLI engine requires a Copilot license. The release also adds model routing and expanded budget forecasting.',
    ],
    analysis: [
      { title: 'Begin with an automation whose output you can review', paragraphs: [
        'Our analysis: a useful first trial is a report that explains a failed test and links back to its evidence. Define which logs the agent can read and ask it to distinguish observed failures from possible causes. A clear report is easier to evaluate than an open-ended request to fix everything.',
        'Collect a few previous failures with known causes. Compare the generated explanation against those cases and record where it misses a detail or invents a connection. Use those observations to decide whether the workflow helps the people maintaining the repository.',
      ] },
      { title: 'Review generated workflow files as executable configuration', paragraphs: [
        'Read the compiled workflow alongside the Markdown instructions before enabling it. Check its triggers, inputs, permissions, and expected outputs. Decide who will receive a report and who can stop the workflow when its results are unhelpful.',
        'For a pilot, set a bounded schedule and inspect actual usage after several runs. If one event produces repeated runs, investigate the trigger behavior before increasing the budget. These are suggested evaluation steps; we have not benchmarked this release.',
      ] },
    ],
    checklist: ['Confirm the chosen engine and its license requirements.', 'Start with a small report or triage task and known example inputs.', 'Review compiled YAML, triggers, permissions, and output handling.', 'Check usage and document how to pause the workflow.'],
    questions: [{ question: 'How are Agentic Workflows defined?', answer: 'GitHub describes natural-language Markdown files that compile into standard GitHub Actions YAML.' }, { question: 'Do the safeguards guarantee a correct result?', answer: 'No. Access controls and output checks address different concerns from whether an explanation or code change is correct. Review the result against the original evidence.' }],
    related: [{ title: 'Copilot server-to-server authentication', href: '/news/github-copilot-server-to-server-authentication-preview/' }, { title: 'Understand prompt injection in tools', href: '/blog/preventing-prompt-injection-in-sql-and-api-tools/' }, { title: 'Inspect workflow configuration differences', href: '/tools/text-diff/' }],
  },
  {
    slug: 'github-actions-workflow-lockfiles-general-availability',
    title: 'GitHub Actions Workflow Lockfiles: What to Check',
    description: 'GitHub Actions workflow lockfiles are generally available. Learn about pinned commits, transitive dependencies, Dependabot updates, and gradual adoption.',
    topic: 'Developer security', published: '2026-10-29', eventDate: '2026-10-28',
    source: { name: 'GitHub Changelog', url: 'https://github.blog/changelog/2026-10-28-github-actions-workflow-lockfiles-are-generally-available/' },
    summary: 'GitHub announced general availability of Actions workflow dependency lockfiles on October 28. This October 29 guide explains how readable action references can be paired with recorded commits for more predictable workflow runs.',
    facts: [
      'The gh actions-lock CLI extension generates .github/workflows/actions.lock for actions and their transitive dependencies. Workflows can adopt locking individually.',
      'Onboarded workflows must have their dependencies recorded and execute the locked commits. Dependabot action version updates also regenerate the corresponding lockfile entry.',
      'Administrators can enforce adoption with a Require lockfile policy. GitHub lists support for Free, Team, Enterprise Cloud, and Enterprise Cloud with data residency, and cautions that locking does not establish dependency safety.',
    ],
    analysis: [
      { title: 'Make the first adoption small enough to inspect', paragraphs: [
        'Our analysis: start with a workflow that has a familiar set of actions and a reliable test result. Generate its lockfile in a branch, inspect the dependencies, and run the workflow. This gives reviewers a concrete before-and-after comparison.',
        'Keep the first pull request focused on locking so an unexpected result is easier to diagnose. Record which workflow was onboarded and how dependencies will be updated. A predictable process is especially useful when several maintainers share responsibility for CI.',
      ] },
      { title: 'Treat a dependency update as a reviewable change', paragraphs: [
        'When an action changes, inspect its release information and the recorded commit alongside the workflow diff. Confirm that the expected checks still run and that permissions remain appropriate for the job. A passing run gives evidence about your tested path.',
        'After validating a few workflows, decide whether enforcement fits the repository. Ensure maintainers know how to regenerate the file and diagnose a stale entry before enabling a requirement across every workflow.',
      ] },
    ],
    checklist: ['Choose one existing workflow for initial adoption.', 'Generate and review the lockfile with the official CLI extension.', 'Run the workflow and inspect a dependency update in a branch.', 'Document regeneration and stale-file checks before requiring lockfiles.'],
    questions: [{ question: 'Where is the GitHub Actions lockfile stored?', answer: 'The announcement specifies .github/workflows/actions.lock, generated using the gh actions-lock extension.' }, { question: 'Does locking make an action safe?', answer: 'No. A lockfile records the commits to execute. Review the dependency and its requested permissions before adopting it.' }],
    related: [{ title: 'GitHub Agentic Workflows explained', href: '/news/github-agentic-workflows-general-availability/' }, { title: 'Compare changes to a workflow', href: '/tools/text-diff/' }, { title: 'JSON, YAML, and TOML configuration formats', href: '/blog/json-vs-yaml-vs-toml-config-files/' }],
  },
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
