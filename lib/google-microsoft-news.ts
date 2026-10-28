import type { NewsStory } from '@/lib/news';

export const googleMicrosoftNews: NewsStory[] = [
  {
    slug: 'google-genie-4-world-model-explained',
    title: 'Google Genie 4: Interactive AI Worlds Explained',
    description: 'Google announced Genie 4 research with interactive scenes and native audio. Understand world models, the limited rollout, and what the demos can establish.',
    topic: 'Google AI', published: '2026-10-28', eventDate: '2026-10-27',
    source: { name: 'Google Blog', url: 'https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-genie-4/' },
    summary: 'Google announced Genie 4 research on October 27, describing a model for interactive simulation with generated audio. The announcement outlines a limited tester rollout rather than immediate access for every user.',
    facts: [
      'Google describes scenes that respond to natural-language changes, including camera movement, weather, and characters.',
      'The announcement includes generated ambient sound, music, and dialogue alongside the visual simulation.',
      'Google says access has begun with trusted testers. Wider access through Project Genie and selected developer channels is described as coming later.',
    ],
    analysis: [
      { title: 'A world model changes what happens after the first frame', paragraphs: [
        'Our analysis: an ordinary video clip follows a fixed sequence after playback begins. An interactive simulation must also respond to what a person does next. That makes continuity an important question: do objects stay recognizable, and do changes remain consistent when the camera moves?',
        'A useful demonstration would revisit a scene after several actions instead of showing only a beautiful opening. For example, a tester could move an object, leave the room, and return. The question is whether the changed state persists in a way the viewer can understand.',
      ] },
      { title: 'Realistic appearance and reliable behavior are different tests', paragraphs: [
        'A scene can look plausible without being a trustworthy model of physical behavior. For a creative experiment, a surprising visual result might be useful. For a task involving training or measurement, the same surprise can be an error. Define the intended use before deciding what a convincing result should look like.',
        'Create a short sequence of actions with an expected observable outcome. Repeat it and record which details stay stable. Note visual continuity, the effect of an instruction, and whether sound matches the event. This is a proposed evaluation approach, not a benchmark we have performed on Genie 4.',
      ] },
      { title: 'Check access before planning a project around a demo', paragraphs: [
        'A research announcement and a broadly available product have different practical implications. Before committing a project, verify the current access route, account eligibility, supported inputs, and usage terms on the official product pages.',
        'Keep an experiment small enough that it can be repeated and reviewed. Save your instructions and observations rather than judging the system from a single impressive clip. If a tool is unavailable to your account, separate that access issue from an evaluation of its capabilities.',
      ] },
    ],
    checklist: ['Check the official access status before assuming the model is available.', 'Test a sequence of changes rather than only the opening scene.', 'Evaluate visual continuity and audio alignment separately.', 'Label experimental results clearly and retain the instructions used.'],
    questions: [{ question: 'Can everyone use Genie 4 now?', answer: 'The October 27 announcement describes trusted-tester access and future expansion. Check Google’s current product pages for changes; this article does not establish access for a particular account.' }, { question: 'Does a realistic demo prove that a simulation is physically accurate?', answer: 'No. Appearance, continuity, and the accuracy needed for a particular task should be evaluated separately.' }],
    related: [{ title: 'Google AI and Gemini news', href: '/news/google/' }, { title: 'Gemini 4 Argon demonstrations explained', href: '/news/google-gemini-4-argon-examples-explained/' }, { title: 'Understand AI agents', href: '/blog/what-is-an-ai-agent-vs-chatbot/' }],
  },
  {
    slug: 'microsoft-copilot-iq-agent-365-platform-strategy',
    title: 'Microsoft Copilot, IQ, and Agent 365: What Each Does',
    description: 'Microsoft outlined its AI platform strategy around Copilot, Microsoft IQ, and Agent 365. Understand the roles and how to evaluate a business workflow.',
    topic: 'Microsoft AI', published: '2026-10-28', eventDate: '2026-10-27',
    source: { name: 'Official Microsoft Blog', url: 'https://blogs.microsoft.com/blog/2026/10/27/the-platform-approach-to-becoming-frontier/' },
    summary: 'Microsoft’s October 27 strategy update describes three connected roles: Copilot for interacting with AI, Microsoft IQ for organizational context, and Agent 365 for managing and observing agents. The post also presents customer examples.',
    facts: [
      'Microsoft positions Copilot as the interaction point for people working with its AI capabilities.',
      'The post describes Microsoft IQ as a way to connect organizational knowledge and context, and Agent 365 as a management and governance layer.',
      'Customer outcomes in the post are Microsoft-reported examples. They do not establish what a different organization will achieve.',
    ],
    analysis: [
      { title: 'Separate the interface, information, and oversight', paragraphs: [
        'Our analysis: a business AI project has at least three questions to answer. What does the employee use? Which information can the system retrieve? Who can observe or stop its actions? A product demonstration often emphasizes the first question while the other two determine whether the workflow is maintainable.',
        'Map a proposed task onto those three questions before choosing features. For a support assistant, the interface might be a conversation, the information might be approved troubleshooting documents, and the oversight might include ownership, access review, and an escalation route.',
      ] },
      { title: 'Customer examples are starting points for questions', paragraphs: [
        'A reported result is easier to interpret when you know its baseline, measurement period, and scope. Ask whether a figure describes adoption, time spent, completion rate, or quality. Those measures answer different questions and should not be treated as interchangeable.',
        'For your own pilot, define one outcome and a way to measure it before rollout. A document assistant could be evaluated on whether a reviewer can locate and verify the cited information. A high volume of generated answers would not by itself show that the answers were useful.',
        'Record corrections and escalations as part of the result. If a workflow saves drafting time but creates additional review work, include both in the evaluation. This makes the outcome understandable to the people who will operate the system after the pilot.',
      ] },
      { title: 'Choose an owner before adding another agent', paragraphs: [
        'Keep a small inventory of active workflows with their purpose, inputs, owner, and stopping procedure. An entry such as “summarize approved support documents; owner: service desk lead” is more useful than a list of agent names without context.',
        'When a workflow changes, review the permissions and information sources together. A harmless-looking new task can require a different access boundary. Treat that change as a concrete implementation decision, not simply an extra prompt added to an existing assistant.',
      ] },
    ],
    checklist: ['Identify the employee interface, information sources, and oversight controls.', 'Define one measurable pilot outcome with a baseline.', 'Include correction and review work in the result.', 'Record an accountable owner and a way to stop each workflow.'],
    questions: [{ question: 'Are Copilot, Microsoft IQ, and Agent 365 the same thing?', answer: 'The strategy post assigns them different roles: interaction, organizational context, and agent management. It does not present them as interchangeable names.' }, { question: 'Do the reported customer results predict my return on investment?', answer: 'No. Treat them as examples to investigate and measure your own workload, costs, review effort, and outcomes.' }],
    related: [{ title: 'Microsoft AI and Windows news', href: '/news/microsoft/' }, { title: 'Copilot Home, Code, and Autopilot explained', href: '/news/microsoft-copilot-home-code-autopilot-explained/' }, { title: 'Inspect sample structured output', href: '/tools/json-formatter/' }],
  },
  {
    slug: 'google-gemini-4-argon-examples-explained',
    title: 'Gemini 4 Argon: What Google’s Examples Demonstrate',
    description: 'Google showed Gemini 4 Argon handling code, visual inputs, and multi-step tasks. Learn how to assess the examples and design a useful trial of your own.',
    topic: 'Google AI', published: '2026-10-28', eventDate: '2026-10-27',
    source: { name: 'Google Blog', url: 'https://blog.google/products-and-platforms/products/gemini/gemini-4-argon-in-action/' },
    summary: 'Google’s October 27 showcase presents Gemini 4 Argon examples spanning interactive visuals, generated tools, and complex document workflows. They show the tasks Google chose to demonstrate, not an independent performance comparison.',
    facts: [
      'The examples combine reasoning, code generation, and visual inputs across several Google AI experiences.',
      'The showcase includes interactive 3D work and organizing source material into a presentation.',
      'Google lists developer and subscriber access routes. Check the linked product documentation for the requirements of the experience you intend to use.',
    ],
    analysis: [
      { title: 'Read a demonstration as a task with inputs and outputs', paragraphs: [
        'Our analysis: a polished result becomes more informative when you can identify what the system received and what it produced. A request to explain a chart, a request to generate code, and a request to coordinate several tools need different checks, even when they appear in the same showcase.',
        'Start with a small input you already understand. If the task is document synthesis, choose material with a few known facts and an explicit output structure. If the task is a visual interface, define the controls that must work. This gives you a way to distinguish a plausible answer from a correct result.',
      ] },
      { title: 'Test the artifact, not only the first response', paragraphs: [
        'For generated code, run the application and exercise the behavior you asked for. Inspect whether controls work after the first click, whether errors are reported clearly, and whether the output can be used in the environment you specified.',
        'For a summary or presentation, trace a sample of the claims back to the input. Check numbers, units, and omitted qualifications. Clear writing can make a mistaken statement easier to believe, so review the factual content separately from its presentation.',
        'Keep a record of revisions. Compare the first and final versions to see whether a correction fixed the original problem or introduced a different one. A text diff is useful for that review when the output is text, configuration, or source code.',
      ] },
      { title: 'Use a comparison that reflects your own work', paragraphs: [
        'If you compare tools, use the same task, input, and acceptance criteria. Include elapsed time, review effort, and whether the result was usable. Avoid turning one successful example into a conclusion about every programming language or document type.',
        'A useful next step is a repeatable trial with a second input that the system has not seen in your earlier test. That helps expose instructions that worked only because the first example was unusually simple. These are evaluation suggestions, not results from our own Argon benchmark.',
      ] },
    ],
    checklist: ['Identify the exact product and account requirements for your trial.', 'Use a small input whose important facts you can verify.', 'Test generated artifacts and trace factual claims to the input.', 'Compare complete outcomes using the same acceptance criteria.'],
    questions: [{ question: 'Do the examples establish that Argon is best for every task?', answer: 'No. A provider-selected showcase does not establish comparative performance on your workload. Use a repeatable trial with explicit acceptance criteria.' }, { question: 'What is a useful first experiment?', answer: 'Choose a small task with a known result, such as revising a short document while preserving named facts, then inspect the complete output.' }],
    related: [{ title: 'More Google AI news', href: '/news/google/' }, { title: 'Compare two versions of generated text', href: '/tools/text-diff/' }, { title: 'Understand agent workflows', href: '/blog/what-is-an-ai-agent-vs-chatbot/' }],
  },
  {
    slug: 'microsoft-copilot-home-code-autopilot-explained',
    title: 'Copilot Home, Code, and Autopilot: Differences Explained',
    description: 'Understand Microsoft’s Copilot Home, Code, and Autopilot announcement. Compare their intended roles and the rollout details to check before trying them.',
    topic: 'Microsoft Copilot', published: '2026-10-28', eventDate: '2026-09-25',
    source: { name: 'Official Microsoft Blog', url: 'https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/' },
    summary: 'Microsoft’s September 25 announcement introduced Home, Code, and Autopilot as different parts of its Copilot direction. This explainer revisits those roles; it does not present the September announcement as a new release today.',
    facts: [
      'Home is described as the starting point for conversational and delegated work. Code is intended for building small applications and workflows.',
      'Autopilot is described as a persistent, cloud-hosted agent that can continue work over time.',
      'The announcement describes staged availability and preview programs. Its rollout plans are not proof that a particular account has every feature now.',
    ],
    analysis: [
      { title: 'Match the interaction style to the job', paragraphs: [
        'Our analysis: asking a question, producing an application, and running recurring work are different tasks. They need different ways to define completion. A short answer can be checked against a document; an application needs behavior checks; a recurring process needs ownership and a stopping condition.',
        'Write the desired outcome before choosing a mode. “Explain this policy and cite the relevant paragraph” describes a different result from “build a tracker with these fields.” Naming that distinction helps you review what the system actually delivered.',
      ] },
      { title: 'A generated application needs an acceptance check', paragraphs: [
        'For a small tracker, define a sample record, the permitted edits, and what should happen when required information is missing. Exercise those cases after generation. Inspect any data connections and sharing settings before inviting other people to use it.',
        'Keep a copy of the initial requirements. If you ask for a change later, compare the revised behavior with both the new requirement and the original ones. A successful cosmetic edit should not quietly remove a working validation rule or expose information to a wider audience.',
      ] },
      { title: 'Recurring work needs clear boundaries', paragraphs: [
        'A persistent workflow should have a named owner, a schedule or trigger, and a definition of which actions require review. Consider what happens when an input is missing, a connected service fails, or a task is no longer relevant.',
        'Test the stopping procedure during a trial. A useful system should be understandable when it is paused as well as when it succeeds. Keep a short record of completed work so that a person taking over later can distinguish finished tasks from planned ones.',
        'Before making a rollout decision, verify current account eligibility and the exact product surface. A term used in an announcement may describe a direction or a preview rather than a feature already exposed to your organization. Use official availability information for the final check.',
      ] },
    ],
    checklist: ['Choose a task with an observable completion condition.', 'Check the account and rollout requirements of the specific capability.', 'Test generated applications with representative inputs.', 'Assign an owner and stopping procedure to recurring workflows.'],
    questions: [{ question: 'Is Code simply another name for GitHub Copilot?', answer: 'Microsoft describes Code as related to the underlying technology, while distinguishing it from developers’ existing GitHub Copilot workflow. Check the product surface and supported tasks rather than assuming identical features.' }, { question: 'Is this a new October 28 product launch?', answer: 'No. This article explains Microsoft’s September 25 announcement and labels that announcement date separately from this article’s publication date.' }],
    related: [{ title: 'Microsoft news and explainers', href: '/news/microsoft/' }, { title: 'Copilot, Microsoft IQ, and Agent 365', href: '/news/microsoft-copilot-iq-agent-365-platform-strategy/' }, { title: 'How AI agents differ from chatbots', href: '/blog/what-is-an-ai-agent-vs-chatbot/' }],
  },
];
