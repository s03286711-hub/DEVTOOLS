import headlineData from '@/data/tech-headlines.json';

export interface NewsStory {
  slug: string;
  title: string;
  description: string;
  topic: string;
  published: string;
  eventDate: string;
  source: { name: string; url: string };
  summary: string;
  facts: string[];
  analysis: { title: string; paragraphs: string[] }[];
  checklist: string[];
  related: { title: string; href: string }[];
}

export const newsStories: NewsStory[] = [
  {
    slug: 'github-copilot-assisted-permissions-explained',
    title: 'GitHub Copilot Assisted Permissions: What Changed',
    description: 'GitHub expanded assisted permissions across Copilot clients. Understand the announcement, approval boundaries, and checks before using an AI coding agent.',
    topic: 'AI & developer tools', published: '2026-10-27', eventDate: '2026-10-26',
    source: { name: 'GitHub Changelog', url: 'https://github.blog/changelog/2026-10-26-github-copilot-assisted-permissions-generally-available/' },
    summary: 'GitHub announced general availability of assisted permissions for Copilot CLI, the Copilot app, and Visual Studio Code on October 26. The feature evaluates requested actions before deciding whether a person needs to approve them.',
    facts: [
      'GitHub says a language model evaluates requests involving commands, filesystem paths, and URLs. Actions classified as clearly safe can proceed automatically; other requests ask for approval.',
      'Administrators can control which modes are available and set a default. The announcement distinguishes assisted permissions from allowing every action.',
    ],
    analysis: [
      { title: 'Why approval mode matters', paragraphs: [
        'Our analysis: permission settings affect what an agent can do after producing a plan. A chat response suggests an action; a tool-enabled agent may actually change files or contact another service. The useful question is therefore which actions can happen without a person inspecting them.',
        'For a small project, start with a disposable copy and one well-defined task. Record the expected files to change, run the relevant checks, and inspect the diff. A more convenient approval flow does not replace checking whether the result meets the task.',
      ] },
      { title: 'A practical trial before using it on important work', paragraphs: [
        'Consider a test that asks the agent to improve a README and run a local formatter. Compare the requested permissions with that scope. A request involving deployment credentials or an unrelated directory deserves closer attention even when the edit itself is straightforward.',
        'Keep permission review and output review separate. An allowed command can still produce incorrect code. Conversely, an unnecessary approval prompt does not prove an action is dangerous. Evaluate both the proposed action and the resulting change.',
      ] },
    ],
    checklist: ['Check which permission mode is selected in the client you actually use.', 'Start on a test repository with recoverable changes.', 'Keep credentials and unrelated directories outside the task scope.', 'Review the diff and test results before merging or deploying.'],
    related: [{ title: 'AI agents vs chatbots: a practical explanation', href: '/blog/what-is-an-ai-agent-vs-chatbot/' }, { title: 'Compare before-and-after text', href: '/tools/text-diff/' }],
  },
  {
    slug: 'apple-multiseat-app-subscriptions-business-schools',
    title: 'Apple Expands App Subscriptions for Businesses and Schools',
    description: 'Apple announced multiseat app subscriptions for organizations. See what is available, what is planned for groups, and what app teams should test.',
    topic: 'Apps & platforms', published: '2026-10-27', eventDate: '2026-10-22',
    source: { name: 'Apple Developer News', url: 'https://developer.apple.com/news/?id=yfo21auu' },
    summary: 'Apple announced on October 22 that organizations and schools can buy multiple seats for app subscriptions through its organizational purchasing channels. The change gives app developers another distribution option to evaluate.',
    facts: [
      'Apple says organizations can purchase seats together, assign them through existing device-management tools, and adjust seat counts.',
      'Multiseat purchasing is enabled by default in App Store Connect unless the setting was previously changed. Developers can review availability options there.',
      'The announcement separates organizational purchasing from upcoming group purchases: sandbox testing is planned from November 2026, with consumer group availability described as coming in winter. Those are announced timelines, not a claim that group purchasing is live now.',
    ],
    analysis: [
      { title: 'Why an app team should look beyond the checkout screen', paragraphs: [
        'Our analysis: buying several seats changes the relationship between the buyer and the person using an app. Product teams should identify who can assign access, who receives support, and what a user sees when a seat is removed. A successful purchase is only one part of that experience.',
        'For example, a language-learning app used by a school may need different onboarding instructions for the purchaser and the student. Treat that as a product-design question to test, rather than assuming an individual subscription flow already covers every case.',
      ] },
      { title: 'Prepare clear availability and support information', paragraphs: [
        'Document the purchasing route your app currently supports. If a feature is still scheduled for a later date, keep it out of instructions for a feature available today. This prevents administrators from searching for settings they cannot yet use.',
        'Create a small test matrix covering a new seat, reassignment, removal, and renewal. Record the expected access outcome and the screen a person should see. Use the platform documentation to confirm the entitlement behavior before presenting it as a promise to customers.',
      ] },
    ],
    checklist: ['Review subscription availability settings in App Store Connect.', 'Separate organization purchasing instructions from future group-purchase plans.', 'Test assignment and removal flows before marketing the feature.', 'Write separate onboarding instructions for purchasers and end users.'],
    related: [{ title: 'Inspect sample JSON responses', href: '/tools/json-formatter/' }, { title: 'Compare changes in product documentation', href: '/tools/text-diff/' }],
  },
  {
    slug: 'windows-hybrid-ai-local-cloud-explained',
    title: 'Windows Hybrid AI: Local and Cloud Processing Explained',
    description: 'Microsoft outlined its hybrid AI direction for Windows. Learn what the announcement says and what local processing, permissions, and device requirements mean.',
    topic: 'AI & computing', published: '2026-10-27', eventDate: '2026-10-07',
    source: { name: 'Microsoft Source', url: 'https://news.microsoft.com/source/emea/2026/10/building-windows-for-hybrid-intelligence/' },
    summary: 'Microsoft’s October 7 announcement described a Windows direction that combines on-device AI with cloud processing. It also discussed controls for agents and new hardware. This is a recap of that announcement, not a new release dated today.',
    facts: [
      'Microsoft describes routing work between local and cloud models according to the task and available capabilities.',
      'The announcement says Microsoft Execution Containers are generally available and describes policy controls over agent access.',
      'It also outlines further Copilot capabilities and new devices. Individual feature availability and hardware requirements must be checked separately; the announcement does not mean every PC has every feature.',
    ],
    analysis: [
      { title: 'Local processing is a question about a specific task', paragraphs: [
        'Our analysis: the label “AI PC” is too broad to answer where a particular request is processed. Ask which model handles the task, whether it needs a connection, and which inputs leave the device. An offline text transformation and a cloud-assisted research task can have very different data flows.',
        'A useful evaluation separates capability from location. Can the task be completed correctly? Where is the computation performed? What is stored afterward? Answering those questions is more informative than relying only on a device category or a marketing label.',
      ] },
      { title: 'Check your actual workload before changing hardware', paragraphs: [
        'Make a short list of the tasks you expect to use: searching local documents, editing images, writing code, or summarizing meetings. For each, record the software version, connection requirement, and any hardware condition documented by its provider.',
        'Try a small, non-sensitive example first and inspect the result. If a feature is unavailable, distinguish a rollout restriction from a hardware limitation. Do not assume that buying a newer machine resolves an account, region, or organization-policy restriction.',
      ] },
    ],
    checklist: ['Check the availability of the particular feature, not just the Windows version.', 'Confirm whether the task needs cloud access.', 'Review file-access permissions before connecting personal documents.', 'Compare results on your own workload before making a purchase decision.'],
    related: [{ title: 'What an AI agent can do', href: '/blog/what-is-an-ai-agent-vs-chatbot/' }, { title: 'Try a browser-based text tool', href: '/tools/text-diff/' }],
  },
];

export const headlineFeed: {
  updatedAt: string | null;
  sources: { name: string; feedUrl: string; checkedAt: string | null }[];
  items: { title: string; url: string; source: string; publishedAt: string }[];
} = headlineData;

export function displayDate(value: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));
}
