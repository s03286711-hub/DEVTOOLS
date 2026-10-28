import type { AiResearchSourceId } from '@/lib/ai-research-sources';

export const aiQuestionTopics = [
  { id: 'safety', name: 'Safety & future risks' },
  { id: 'jobs', name: 'Jobs & skills' },
  { id: 'robots', name: 'Robots' },
  { id: 'capabilities', name: 'Models & intelligence' },
  { id: 'environment', name: 'Energy & environment' },
] as const;
export type AiQuestionTopic = typeof aiQuestionTopics[number]['id'];

export interface AiQuestionArticle {
  slug: string;
  title: string;
  question: string;
  description: string;
  topic: AiQuestionTopic;
  published: string;
  reviewed: string;
  answer: string;
  answerSources: AiResearchSourceId[];
  evidence: string;
  uncertainty: string;
  sections: { id: string; title: string; paragraphs: string[]; sources?: AiResearchSourceId[]; kind?: 'analysis' }[];
  table?: { caption: string; headings: string[]; rows: string[][]; sources: AiResearchSourceId[] };
  takeaways: string[];
  faqs: { id: string; question: string; answer: string; sources: AiResearchSourceId[] }[];
  related: string[];
}

const published = '2026-10-28';
const reviewed = '2026-10-28';

export const aiQuestionArticles: AiQuestionArticle[] = [
  {
    slug: 'will-ai-kill-humans', title: 'Will AI Kill Humans? What Research Says',
    question: 'Will AI kill humans or cause human extinction?',
    description: 'Understand research on AI danger, loss of control, and human extinction. Separate documented harms, uncertain future scenarios, and expert disagreement.',
    topic: 'safety', published, reviewed,
    answer: 'Human extinction from AI is an uncertain future scenario, not an established prediction. The February 2026 International AI Safety Report describes substantial disagreement about its likelihood. Serious risk deserves investigation, while a confident claim that a catastrophe will happen goes beyond the evidence.',
    answerSources: ['safety-2026'], evidence: 'Scientific review; future outcomes remain uncertain',
    uncertainty: 'There is no settled probability or reliable deadline for human extinction from AI. A forecast is conditional on how systems develop and are deployed.',
    sections: [
      { id: 'different-risks', title: 'A harmful system does not need human intentions', paragraphs: ['NIST’s generative-AI profile describes risks including false information, harmful bias, and privacy failures. These are useful starting points for evaluating a deployed system without assuming it has feelings or a desire to hurt anyone.', 'Consider a fictional scheduling assistant that sends a confidential document to the wrong recipient. The problem is the action, access, and review process. Whether the assistant sounds friendly does not answer the question of who could be harmed.'], sources: ['nist-genai'] },
      { id: 'researchers', title: 'What researchers mean by loss of control', paragraphs: ['The 2026 safety review examines scenarios where people cannot recover effective control over advanced systems. It distinguishes potential severity from probability: a grave outcome can be worth studying even when its likelihood is disputed.', 'The report is a dated review of available evidence, not a guarantee about every later system. Read a new claim alongside its experiment, system version, and deployment conditions before treating it as evidence about all AI.'], sources: ['safety-2026'] },
      { id: 'evaluate-claims', title: 'How to read an alarming AI headline', kind: 'analysis', paragraphs: ['Ask what happened, who observed it, and whether the description concerns an actual deployment, a laboratory test, or a hypothetical future system. A dramatic headline can combine those categories into one story even though they answer different questions.', 'Our reading approach is to identify the proposed chain of events. What capability is required? What access does the system have? Which human controls would have to fail? A precise explanation is more informative than a countdown with no testable assumptions.'] },
    ],
    takeaways: ['Separate documented harm from a proposed future catastrophe.', 'Check the date and conditions of the experiment behind a claim.', 'Look for a stated mechanism, uncertainty, and independent scrutiny.'],
    faqs: [
      { id: 'certain', question: 'Is AI guaranteed to destroy humanity?', answer: 'No such guarantee follows from the cited research. The scientific review describes disagreement about future loss-of-control risks.', sources: ['safety-2026'] },
      { id: 'probability', question: 'What is the probability that AI will kill everyone?', answer: 'The review does not establish a settled probability. An individual expert’s forecast should be identified as a judgment, rather than a measured frequency.', sources: ['safety-2026'] },
      { id: 'intent', question: 'Does AI need to hate humans to cause harm?', answer: 'No. A misleading output or a privacy failure can harm someone without human-like hatred or a stated motive.', sources: ['nist-genai'] },
      { id: 'date', question: 'Is there a known date for an AI takeover?', answer: 'The sources here establish no dependable takeover date. A date without a definition, assumptions, and evidence should be treated as a speculative claim.', sources: ['safety-2026'] },
    ], related: ['will-robots-replace-humans', 'when-will-agi-arrive', 'why-does-ai-hallucinate'],
  },
  {
    slug: 'will-ai-take-all-jobs', title: 'Will AI Take All Jobs? Evidence & Limits',
    question: 'Will AI take all our jobs?',
    description: 'Learn what jobs research says about AI automation, task exposure, displacement, and new work. Understand why exposure is not a count of jobs already lost.',
    topic: 'jobs', published, reviewed,
    answer: 'The cited research does not show that AI will eliminate all jobs. The ILO’s 2025 brief expects changes to many occupations and emphasizes continuing human input. That leaves real uncertainty about who gains, who loses work, and how quickly employers reorganize tasks.',
    answerSources: ['ilo-brief-2025'], evidence: 'Exposure research and employer forecasts; not a universal employment prediction',
    uncertainty: 'Potential automation is different from adoption, actual displacement, and net employment. Outcomes vary across employers, occupations, and countries.',
    sections: [
      { id: 'tasks', title: 'A job contains more than one task', paragraphs: ['An occupation can combine writing, physical work, conversations, judgment, and responsibility for a result. Automating a draft does not describe what happens to the rest of that role. The ILO brief distinguishes occupational transformation from redundancy.', 'For example, imagine an office worker preparing a report. A tool may help write a first draft, while someone still has to check its source data, resolve a disagreement, and decide whether the report answers the business question. This example illustrates the distinction; it is not a forecast for that occupation.'], sources: ['ilo-brief-2025'] },
      { id: 'forecasts', title: 'Job creation and job displacement are separate', paragraphs: ['The World Economic Forum’s 2025 report projects both new roles and displaced roles by 2030. Its forecast covers economic, demographic, environmental, and technological changes together. It should not be presented as a measurement of jobs already removed by AI.', 'A positive global balance would not tell an individual worker whether a suitable replacement role exists in their location. A new job in a different field can require training, relocation, or experience that a displaced worker does not yet have.'], sources: ['wef-jobs-2025'] },
      { id: 'your-work', title: 'Assess your own work at the task level', kind: 'analysis', paragraphs: ['List a normal week of work and separate the parts that are easy to specify from the parts that require context and checking. Then ask where a tool improves the accepted result, including the time you spend reviewing it.', 'Discuss training and workflow changes early rather than relying on a generic list of safe job titles. Our practical suggestion is to keep examples of problems you can solve, explain your checking process, and connect a new tool to an actual task.'] },
    ],
    takeaways: ['Ask whether a number describes potential, a forecast, or an observed outcome.', 'Evaluate the complete role and the cost of checking its output.', 'Treat global projections as context rather than personal guarantees.'],
    faqs: [
      { id: 'already-lost', question: 'Have all jobs exposed to AI already been lost?', answer: 'No. Exposure research assesses potential task impact. It is not a register of redundancies or a causal count of AI-related job losses.', sources: ['ilo-brief-2025'] },
      { id: 'new-jobs', question: 'Can AI also create jobs?', answer: 'New work is possible, but its scale and distribution are uncertain. The WEF projection combines job creation and displacement across several trends, rather than isolating AI.', sources: ['wef-jobs-2025'] },
      { id: 'same-everywhere', question: 'Will AI affect every country in the same way?', answer: 'No single global statistic describes every country. Occupational exposure depends partly on the types of work in an economy.', sources: ['ilo-index-2025'] },
      { id: 'choose-career', question: 'Should I choose a career using an AI-proof jobs list?', answer: 'Treat such a list as a prompt for further research. The task-based ILO approach is more specific than declaring a whole occupation permanently unaffected.', sources: ['ilo-index-2025'] },
    ], related: ['what-percentage-of-jobs-ai-affect', 'which-jobs-most-exposed-to-ai', 'what-skills-to-learn-for-ai'],
  },
  {
    slug: 'what-percentage-of-jobs-ai-affect', title: 'What Percentage of Jobs Could AI Affect?',
    question: 'What percentage of jobs could AI affect?',
    description: 'Compare ILO AI job-exposure estimates and WEF 2030 employment projections. See the population, date, and limits behind widely shared jobs percentages.',
    topic: 'jobs', published, reviewed,
    answer: 'The ILO’s May 2025 index estimates that one in four workers worldwide is in an occupation with some generative-AI exposure, with 3.3% of global employment in its highest exposure category. Neither figure is a percentage of people already made unemployed by AI.',
    answerSources: ['ilo-index-2025'], evidence: 'Task-exposure estimates; a separate employer-survey forecast',
    uncertainty: 'These studies answer different questions. Their percentages should not be added together or treated as interchangeable unemployment forecasts.',
    sections: [
      { id: 'exposure', title: 'Read the denominator before the percentage', paragraphs: ['The ILO index reports exposure across workers and occupations, not a probability that a particular person will lose their job. It estimates 34% exposure in high-income economies and 11% in low-income economies under its method.', 'Think of a percentage as a fraction with a label. Who is counted in the bottom of the fraction? Which condition puts someone in the top? Without both answers, two percentages can appear to disagree while describing different populations.'], sources: ['ilo-index-2025'] },
      { id: 'forecast', title: 'What the 2030 jobs numbers mean', paragraphs: ['The WEF report projects 170 million roles created and 92 million displaced over 2025–2030, for a net increase of 78 million. It describes structural labour-market change across multiple trends, rather than an AI-only result.', 'Creation, displacement, and net change are different quantities. Keeping them separate prevents a headline about total movement from becoming a false claim about one technology or about losses that have already occurred.'], sources: ['wef-jobs-2025'] },
      { id: 'use-statistics', title: 'A quick method for checking a jobs statistic', kind: 'analysis', paragraphs: ['Write down the original publication, its data year, the geography, and the measurement. Then copy the relevant qualification in your own notes: potential exposure, employer expectation, or observed employment change.', 'If a post supplies only a percentage and an alarming caption, follow the link to the original study. For a country-specific decision, look for a national breakdown using a comparable definition instead of silently substituting a global number.'] },
    ],
    table: { caption: 'Different measures, not interchangeable job-loss rates', headings: ['Measure', 'Reported figure', 'What it describes'], rows: [['ILO, 2025: some exposure', 'About 1 in 4 workers', 'Potential generative-AI exposure worldwide'], ['ILO, 2025: highest exposure', '3.3%', 'Global employment in the highest exposure category'], ['WEF, 2025–2030 projection', '170m created; 92m displaced', 'Multiple structural trends; not AI alone']], sources: ['ilo-index-2025', 'wef-jobs-2025'] },
    takeaways: ['Keep the study year and population beside every number.', 'Do not turn an exposure estimate into an observed layoff rate.', 'Compare global and national figures only when their definitions match.'],
    faqs: [
      { id: 'quarter', question: 'Does one in four exposed mean 25% unemployment?', answer: 'No. It is an occupational-exposure estimate, not an unemployment prediction.', sources: ['ilo-index-2025'] },
      { id: 'highest', question: 'What does the 3.3% AI jobs figure mean?', answer: 'It is the share of global employment in the ILO index’s highest exposure category, rather than a measured job-loss rate.', sources: ['ilo-index-2025'] },
      { id: 'ninety-two', question: 'Will AI alone remove 92 million jobs by 2030?', answer: 'That misstates the cited WEF projection, which concerns several structural trends and is not an AI-only forecast.', sources: ['wef-jobs-2025'] },
      { id: 'usa', question: 'Can I use a global AI exposure percentage as the US rate?', answer: 'No. A global estimate should keep its global label. A US claim needs a source with an appropriate national population and method.', sources: ['ilo-index-2025'] },
    ], related: ['will-ai-take-all-jobs', 'which-jobs-most-exposed-to-ai', 'will-ai-replace-programmers'],
  },
  {
    slug: 'which-jobs-most-exposed-to-ai', title: 'Which Jobs Are Most Exposed to AI?',
    question: 'Which jobs are most exposed to generative AI?',
    description: 'Understand AI exposure in clerical and digitized work, why task mix matters, and why a list of exposed occupations is not a prediction of layoffs.',
    topic: 'jobs', published, reviewed,
    answer: 'The ILO’s 2025 index identifies clerical work as particularly exposed and notes growing exposure in some digitized professional and technical roles. Exposure describes tasks that technology could affect; it does not establish that an entire occupation will disappear.',
    answerSources: ['ilo-index-2025'], evidence: 'Task-based occupational research',
    uncertainty: 'Job titles hide different task mixes. The same occupation can involve different responsibilities across organizations and countries.',
    sections: [
      { id: 'task-mix', title: 'Look inside the occupation', paragraphs: ['The ILO index assesses tasks rather than assigning every worker with the same job title an identical future. Its method combines human input, expert discussion, and model-based scoring.', 'As an illustration, two administrative roles can share a title while one handles standardized records and another coordinates unusual requests. Compare the actual work, the information needed, and who is responsible when a result is wrong.'], sources: ['ilo-index-2025'] },
      { id: 'physical-work', title: 'Physical work and software automation differ', paragraphs: ['Generative-AI exposure is not a complete measure of robotic automation. A robot must interact with a physical environment, which introduces different equipment, supervision, and maintenance questions. IFR’s 2026 service-robot summary describes continuing deployment constraints for humanoids.', 'A job with fewer text-based tasks can still change through scheduling tools, new equipment, or altered demand. A task can also be technically possible to automate while remaining impractical for a particular workplace.'], sources: ['ifr-service-2026'] },
      { id: 'personal-audit', title: 'Make a task map before choosing training', kind: 'analysis', paragraphs: ['Write down your recurring tasks and the standard for an acceptable result. Mark which tasks involve repeatable digital inputs, which require context from another person, and which require physical action. This is a planning exercise, not a replacement-risk score.', 'Choose one low-impact task for a supervised trial. Keep the original work, record correction time, and compare accepted results. Use the result to guide training or discussion with your employer instead of attaching a permanent safe or unsafe label to your career.'] },
    ],
    takeaways: ['Compare actual tasks rather than titles alone.', 'Keep software exposure separate from physical-robot deployment.', 'Use exposure research to ask better questions, not to declare a career finished.'],
    faqs: [
      { id: 'clerical', question: 'Why does clerical work appear in AI exposure research?', answer: 'The ILO’s task-based index places clerical occupations at the highest exposure levels. That is an assessment of potential task impact.', sources: ['ilo-index-2025'] },
      { id: 'safe', question: 'Are any jobs completely AI-proof?', answer: 'An exposure index is not a permanent guarantee for any occupation. It describes a particular technology scope and study method.', sources: ['ilo-index-2025'] },
      { id: 'manual', question: 'Are all manual jobs safe from robots?', answer: 'That would be too broad. Robotics deployment differs from generative-AI exposure, and practical constraints vary by application.', sources: ['ifr-service-2026'] },
      { id: 'same-title', question: 'Do workers with the same title have the same AI exposure?', answer: 'Not necessarily. The task-based approach is a reminder to inspect the work behind the title and the study’s occupational definitions.', sources: ['ilo-index-2025'] },
    ], related: ['will-ai-take-all-jobs', 'what-skills-to-learn-for-ai', 'will-robots-replace-humans'],
  },
  {
    slug: 'will-ai-replace-programmers', title: 'Will AI Replace Programmers? Research Explained',
    question: 'Will AI replace programmers and software developers?',
    description: 'Read what developer productivity studies can and cannot tell us about AI replacing programmers, including METR’s 2025 trial and its 2026 research update.',
    topic: 'jobs', published, reviewed,
    answer: 'A tool completing coding tasks does not by itself establish that programmers will disappear. Productivity evidence depends on the task and study. METR’s early-2025 trial found a slowdown in its specific sample; its February 2026 update warns that later estimates have substantial selection problems.',
    answerSources: ['metr-study-2025', 'metr-update-2026'], evidence: 'A randomized trial plus a later, qualified research update',
    uncertainty: 'These studies do not establish a universal speedup, slowdown, or forecast of developer employment. Tool versions, task choice, and review requirements change the result.',
    sections: [
      { id: 'early-study', title: 'What the early-2025 experiment found', paragraphs: ['METR studied 16 experienced open-source developers on 246 tasks in familiar, mature projects. With the early-2025 AI tools allowed, task completion took 19% longer on average. The study is a specific experimental result, not a claim about every developer today.', 'Notice the complete comparison: a particular group, known repositories, selected tasks, and tools available during that period. Those details determine what the result can support.'], sources: ['metr-study-2025'] },
      { id: 'later-update', title: 'Why the 2026 update matters', paragraphs: ['In February 2026, METR reported that a later experiment was affected by developers avoiding no-AI work, task selection, and measurement difficulties. It considered the data an unreliable estimate of the current effect, despite indications that tools had become more useful.', 'Do not combine the first result and the later raw estimate into a clean trend line. A changed sample or study process can affect the comparison even when the technology has also changed.'], sources: ['metr-update-2026'] },
      { id: 'measure-your-work', title: 'Measure accepted work, including review', kind: 'analysis', paragraphs: ['Our suggested trial is a real, bounded task with a clear acceptance condition. Record elapsed time, correction work, tests, and whether someone else can maintain the result. A larger code diff is not automatically a better outcome.', 'Practice explaining requirements, reading an unfamiliar codebase, reproducing a bug, and reviewing a change. These are concrete ways to evaluate a coding assistant. They are learning priorities, rather than a promise that a particular role or salary will remain unchanged.'] },
    ],
    takeaways: ['Keep the 2025 study’s date, sample, and tool scope attached to its result.', 'Include the 2026 methodological caveats when discussing later estimates.', 'Measure quality and correction time alongside speed.'],
    faqs: [
      { id: 'slower', question: 'Did a study really find developers slower with AI?', answer: 'Yes. METR’s early-2025 trial found a 19% increase in completion time for its specific sample and tasks.', sources: ['metr-study-2025'] },
      { id: 'always', question: 'Does the study prove AI always slows programmers down?', answer: 'No. That would exceed its sample, task selection, and tool period. The later update explicitly discusses changing conditions and measurement problems.', sources: ['metr-study-2025', 'metr-update-2026'] },
      { id: 'later', question: 'Did METR establish a reliable new universal speedup in 2026?', answer: 'No. Its February update describes substantial selection and measurement limitations in the later experiment.', sources: ['metr-update-2026'] },
      { id: 'benchmark', question: 'Does solving a coding benchmark prove an AI can replace a developer?', answer: 'A benchmark measures performance on its defined tasks. It does not by itself measure responsibility for an entire software project or job.', sources: ['stanford-index-2026'] },
    ], related: ['will-ai-take-all-jobs', 'what-skills-to-learn-for-ai', 'how-ai-models-improve'],
  },
  {
    slug: 'what-skills-to-learn-for-ai', title: 'What Skills Should You Learn for the AI Era?',
    question: 'What skills should I learn as AI changes work?',
    description: 'Build a practical AI learning plan around domain knowledge, checking results, data literacy, and communication, with context from employer skills research.',
    topic: 'jobs', published, reviewed,
    answer: 'Combine knowledge of your field with the ability to evaluate AI output and explain a result. WEF’s 2025 employer survey highlights analytical thinking and growing demand for AI-related skills. That is useful context for a learning plan, not proof that one certificate guarantees employment.',
    answerSources: ['wef-jobs-2025'], evidence: 'Employer expectations with separately labeled learning suggestions',
    uncertainty: 'A global employer survey cannot identify the best course for every person or guarantee a hiring result. Local requirements and practical experience still matter.',
    sections: [
      { id: 'domain-first', title: 'Start with a problem you understand', kind: 'analysis', paragraphs: ['Pick a task in a field you already know: checking a spreadsheet, drafting a customer response, or explaining a piece of code. Write down what correct work looks like before choosing a tool. Domain knowledge gives you a way to judge the output.', 'Keep a small portfolio with the problem, the inputs you could use, your correction process, and the accepted result. Show the decisions you made, including when a manual approach was simpler. This provides more information about your ability than a list of tools alone.'] },
      { id: 'checking', title: 'Practice checking, not just prompting', paragraphs: ['NIST’s risk profile includes confidently incorrect output as a concern. A useful learning exercise is to check a generated claim against its source and identify what the source actually establishes.', 'For a numeric answer, inspect the unit and denominator. For a written answer, open the cited document. For code, reproduce the behavior in an appropriate test environment. Treat these as task-specific checks rather than assuming that a polished answer is correct.'], sources: ['nist-genai'] },
      { id: 'learning-plan', title: 'Use a short, repeatable learning plan', kind: 'analysis', paragraphs: ['For the first week, learn the task and its acceptance criteria. Next, try one tool on a small sample. Then compare quality and total effort, including corrections. Finish by explaining the result to someone who understands the task.', 'Repeat the process with a harder example after you can explain the first one. Choose training that addresses a real gap you observed, such as data handling, technical reading, or clearer communication, rather than buying a course solely because its title promises an AI-proof future.'] },
    ],
    takeaways: ['Pair tool use with subject knowledge and an acceptance standard.', 'Keep examples that show your checking and reasoning.', 'Choose learning based on a real task and a demonstrated gap.'],
    faqs: [
      { id: 'coding', question: 'Does everyone need to become an AI programmer?', answer: 'The WEF survey describes demand for a mix of technical and human skills. It does not say every worker must move into programming.', sources: ['wef-jobs-2025'] },
      { id: 'certificate', question: 'Will an AI certificate guarantee me a job?', answer: 'The cited survey does not establish that guarantee. Employer expectations are not a controlled evaluation of one credential.', sources: ['wef-jobs-2025'] },
      { id: 'prompting', question: 'Is prompt writing enough to work effectively with AI?', answer: 'Prompting does not remove output reliability concerns. Checking the result remains part of using a generative system responsibly.', sources: ['nist-genai'] },
      { id: 'beginner', question: 'Where can a beginner learn how language models work?', answer: 'Google’s Machine Learning Crash Course has an introductory module explaining large language models and their training concepts.', sources: ['google-llms'] },
    ], related: ['will-ai-replace-programmers', 'which-jobs-most-exposed-to-ai', 'why-does-ai-hallucinate'],
  },
  {
    slug: 'will-robots-replace-humans', title: 'Will Robots Replace Humans? Evidence & Limits',
    question: 'Will robots replace humans at work and at home?',
    description: 'Explore what robotics statistics and humanoid research show, how robots differ from chatbots, and what a demonstration can tell us about real deployment.',
    topic: 'robots', published, reviewed,
    answer: 'Robots already perform specific tasks, but that does not demonstrate a general replacement for humans. IFR’s September 2026 reporting shows large industrial deployment while describing specialized humanoid applications, frequent teleoperation, and continuing practical barriers.',
    answerSources: ['ifr-industrial-2026', 'ifr-service-2026'], evidence: 'Robotics industry statistics and deployment observations',
    uncertainty: 'Robot counts do not map directly to jobs removed. Demonstrations, pilots, sales, and reliable operation in a changing environment are different milestones.',
    sections: [
      { id: 'deployed', title: 'What the deployment statistics measure', paragraphs: ['IFR reports a global industrial-robot stock of about five million in 2025. This is a count of robots operating in factories, not five million humanoids or five million people directly replaced.', 'Industrial equipment and a household assistant face different requirements. A repetitive task in a prepared work area cannot establish that the same system can handle every object, room, or unexpected event in a home.'], sources: ['ifr-industrial-2026'] },
      { id: 'humanoids', title: 'A human shape does not establish general autonomy', paragraphs: ['IFR’s September 2026 service-robot summary says most current humanoid applications remain specialized and often require human teleoperation. It identifies safety, maintenance and training costs, and practical business value as continuing constraints.', 'When watching a demonstration, look for the operator’s role, the setup, failed attempts, and the duration of uninterrupted work. Those details help explain what was actually shown without dismissing progress or assuming every task has been solved.'], sources: ['ifr-service-2026'] },
      { id: 'read-demo', title: 'Questions to ask about a robot demonstration', kind: 'analysis', paragraphs: ['Start with the task and environment: which objects, surfaces, and movements were allowed? Ask whether the robot followed a prepared routine, received remote control, or handled the task independently. These can all be useful capabilities, but they support different claims.', 'Then ask about repeated performance and recovery. A commercial workflow has to account for interruptions, maintenance, and people nearby. Our evaluation approach is to look for clear operating conditions and repeated results before drawing a conclusion about an entire profession.'] },
    ],
    takeaways: ['Identify industrial, service, and humanoid robots separately.', 'Ask what the human operator did during a demonstration.', 'Keep deployment counts separate from employment-impact claims.'],
    faqs: [
      { id: 'humanoid', question: 'Are all factory robots humanoids?', answer: 'No. IFR reports industrial-robot deployment and humanoid developments separately; the industrial stock count is not a humanoid count.', sources: ['ifr-industrial-2026', 'ifr-service-2026'] },
      { id: 'remote', question: 'Does a robot video always show independent AI control?', answer: 'No. IFR notes frequent human teleoperation in current humanoid applications. Check what control method a particular demonstration used.', sources: ['ifr-service-2026'] },
      { id: 'jobs', question: 'Does each new robot mean one worker loses a job?', answer: 'A robot stock or sales statistic does not establish that relationship. A separate employment analysis is needed.', sources: ['ifr-industrial-2026'] },
      { id: 'home', question: 'Does a successful factory task prove a robot can do every home chore?', answer: 'No. Specialized deployment does not establish performance across unrelated environments and tasks.', sources: ['ifr-service-2026'] },
    ], related: ['will-ai-kill-humans', 'which-jobs-most-exposed-to-ai', 'when-will-agi-arrive'],
  },
  {
    slug: 'when-will-agi-arrive', title: 'When Will AGI Arrive? Definitions & Evidence',
    question: 'When will AGI arrive, and what would count as AGI?',
    description: 'Understand artificial general intelligence, the limits of AI timelines, and why capability, generality, and autonomy should be evaluated separately.',
    topic: 'capabilities', published, reviewed,
    answer: 'The sources here do not establish a dependable AGI arrival date. A prediction needs a definition of the capabilities being forecast. The Levels of AGI research framework separates the breadth and depth of performance from autonomy, helping explain why different announcements can mean different things.',
    answerSources: ['agi-levels'], evidence: 'A research framework, not an agreed arrival forecast',
    uncertainty: 'Definitions differ, and a forecast can change when its test or threshold changes. A confident date is not the same as demonstrated capability.',
    sections: [
      { id: 'definition', title: 'Define the claim before comparing timelines', paragraphs: ['The Levels of AGI paper proposes comparing performance, generality, and autonomy. It is a framework for making claims more precise, rather than a calendar of future discoveries.', 'For example, one announcement might concern solving a narrow technical test while another describes operating across unfamiliar tasks. Before comparing their dates, write down the tasks, the required standard, and how success would be independently checked.'], sources: ['agi-levels'] },
      { id: 'benchmarks', title: 'Strong performance can coexist with surprising failures', paragraphs: ['Stanford’s 2026 AI Index describes an uneven capability picture: progress on difficult benchmarks can coexist with weaknesses on other tasks. Its examples help explain why a single impressive score should not be treated as a complete intelligence assessment.', 'A useful comparison uses the same task definition and conditions. If a system receives more attempts, different tools, or extra human help, note that before attributing the difference entirely to its underlying model.'], sources: ['stanford-index-2026'] },
      { id: 'forecast', title: 'Read a prediction as a conditional statement', kind: 'analysis', paragraphs: ['Ask what would have to be true for the prediction to succeed: continued technical progress, a workable evaluation, affordable operation, or reliable access to tools. Also ask what result would make the forecaster revise the estimate.', 'Our suggestion is to follow demonstrated capabilities and unresolved weaknesses alongside dates. That makes the discussion useful even when a timeline proves wrong, because you can still see which part of the forecast changed.'] },
    ],
    takeaways: ['Ask for a definition before accepting an AGI date.', 'Compare breadth, performance, and autonomy separately.', 'Read benchmark results alongside their operating conditions.'],
    faqs: [
      { id: 'meaning', question: 'What does AGI stand for?', answer: 'AGI stands for artificial general intelligence. Research frameworks try to make its breadth and performance requirements explicit, but one proposal is not a universal definition.', sources: ['agi-levels'] },
      { id: 'year', question: 'Is there a proven year when AGI will arrive?', answer: 'The cited framework establishes no proven arrival year. It organizes capability claims rather than certifying a countdown.', sources: ['agi-levels'] },
      { id: 'benchmark', question: 'Does beating humans on one test prove AGI?', answer: 'A narrow result does not establish broad generality. The framework separates depth of performance from breadth across tasks.', sources: ['agi-levels'] },
      { id: 'autonomy', question: 'Are intelligence and autonomy the same thing?', answer: 'No. The framework treats capability and autonomy as distinct considerations, so a strong result does not by itself describe independent operation.', sources: ['agi-levels'] },
    ], related: ['is-ai-conscious', 'how-ai-models-improve', 'will-ai-kill-humans'],
  },
  {
    slug: 'is-ai-conscious', title: 'Is AI Conscious? What Researchers Can Say',
    question: 'Is AI conscious, self-aware, or able to feel?',
    description: 'Explore research on AI consciousness, theory-based indicators, self-reports, and why fluent conversation does not settle whether a system has experiences.',
    topic: 'capabilities', published, reviewed,
    answer: 'A chatbot saying it has feelings does not settle whether it has conscious experience. Researchers investigate theory-based indicators, but these are not a definitive test. A 2023 assessment and a later journal opinion article should be read with their dates and scientific limits attached.',
    answerSources: ['consciousness-2023', 'consciousness-2026'], evidence: 'Theory-based research and scientific opinion; unresolved assessment',
    uncertainty: 'There is no simple, settled test in the cited work that turns a conversation into a definitive consciousness diagnosis for every AI system.',
    sections: [
      { id: 'experience', title: 'Conversation and subjective experience are different claims', paragraphs: ['The consciousness research concerns subjective experience, rather than merely producing human-like language. Its proposed approach examines properties derived from scientific theories.', 'As an illustration, a fictional chatbot could write a convincing first-person account because that is the requested style. The text alone does not tell us which internal properties produced it. An assessment needs a reason to connect observed behavior or architecture to the claim being made.'], sources: ['consciousness-2026'] },
      { id: 'dated-findings', title: 'What the earlier assessment actually concluded', paragraphs: ['Butlin and colleagues’ 2023 preprint judged the systems it examined unlikely to be conscious under its approach. That is a dated assessment of particular systems, not a certificate for every future model.', 'The later opinion article develops indicator-based assessment while emphasizing uncertainty. An indicator can affect a judgment without being sufficient proof by itself.'], sources: ['consciousness-2023', 'consciousness-2026'] },
      { id: 'reading', title: 'How to evaluate a claim about AI feelings', kind: 'analysis', paragraphs: ['Look for the system version, the proposed meaning of consciousness, and the method used. Ask whether the evidence is a prompted conversation, an investigation of the system, or a philosophical argument. These are different kinds of contribution.', 'Our reading approach is to avoid turning uncertainty into certainty in either direction. A dramatic exchange can be interesting without establishing an inner experience, and an older assessment should be reconsidered when the system or the scientific theory changes.'] },
    ],
    takeaways: ['Identify what the author means by consciousness.', 'Keep the assessment tied to its system and date.', 'Distinguish an indicator, an argument, and a demonstrated conclusion.'],
    faqs: [
      { id: 'self-report', question: 'If an AI says it is alive, is that proof?', answer: 'A self-report alone is not the theory-based assessment proposed in the cited work.', sources: ['consciousness-2026'] },
      { id: 'feelings', question: 'Can scientists prove AI feels pain from a chat?', answer: 'The cited research does not provide such a definitive conversational test. Assessment depends on theoretical and empirical questions.', sources: ['consciousness-2026'] },
      { id: 'forever', question: 'Did the 2023 paper prove AI can never be conscious?', answer: 'No. It assessed then-current systems and discussed possible future indicator properties.', sources: ['consciousness-2023'] },
      { id: 'smart', question: 'Is being good at a task the same as being conscious?', answer: 'Task performance and subjective experience are different claims. The consciousness papers assess indicators rather than equating fluency with experience.', sources: ['consciousness-2023', 'consciousness-2026'] },
    ], related: ['when-will-agi-arrive', 'how-ai-models-improve', 'why-does-ai-hallucinate'],
  },
  {
    slug: 'why-does-ai-hallucinate', title: 'Why Does AI Hallucinate? How to Check Answers',
    question: 'Why does AI make things up, and can I trust its answers?',
    description: 'Learn why confident AI answers can be wrong, what hallucination means, and how to verify sources, numbers, quotations, and code before relying on output.',
    topic: 'safety', published, reviewed,
    answer: 'Generative AI can produce plausible text that is incorrect. NIST calls confidently false or erroneous output confabulation, often described as hallucination. Fluency and a list of citations are not sufficient verification; check whether the cited evidence actually supports the claim.',
    answerSources: ['nist-genai'], evidence: 'Technical risk guidance with a practical checking workflow',
    uncertainty: 'There is no universal error percentage that applies to every model, task, language, prompt, and date. A successful check on one answer does not validate all later answers.',
    sections: [
      { id: 'generation', title: 'Prediction and verification are different operations', paragraphs: ['Google’s language-model explanation describes training and token prediction. Producing a plausible continuation is a different operation from independently checking each statement against an original record.', 'Think of a fictional answer containing a convincing report title. The title might be real while the claimed result is wrong, or the document might not exist. You need to open the source and compare its actual contents with the statement.'], sources: ['google-llms'] },
      { id: 'workflow', title: 'A source-checking workflow you can reuse', kind: 'analysis', paragraphs: ['First, isolate the claim you plan to use. Open its original source and check the author, date, population, and relevant passage. For a quotation, compare the exact words. For a percentage, identify the denominator and whether it is an estimate or an observation.', 'Next, test what can be tested. Recalculate a small numeric example or reproduce code with harmless inputs. If you cannot verify a material claim, keep that uncertainty visible instead of allowing a confident writing style to hide it.'] },
      { id: 'confidence', title: 'Why asking the same question again is not enough', kind: 'analysis', paragraphs: ['Repeated agreement can be a reason to investigate, but it is not an original record. A useful checking process needs evidence beyond the answer being assessed. Asking a different system can help find a source, yet the source still needs to be opened and read.', 'For a time-sensitive question, record when you checked it. A correct answer about a plan, product, or study can become outdated. Our practice in this section is to display source-review dates and keep the source’s own publication date visible.'] },
    ],
    takeaways: ['Open the original source rather than trusting a citation label.', 'Check units, dates, populations, and exact wording.', 'Keep uncertain claims qualified when independent verification is missing.'],
    faqs: [
      { id: 'confabulation', question: 'What is an AI hallucination?', answer: 'In this context it means generated content that is false or erroneous, sometimes presented confidently. NIST uses the term confabulation.', sources: ['nist-genai'] },
      { id: 'citations', question: 'Does an answer with citations have to be correct?', answer: 'No. The cited document and the claim still need to be checked; a reference does not remove the risk of incorrect output.', sources: ['nist-genai'] },
      { id: 'paid', question: 'Does a paid AI plan guarantee accurate answers?', answer: 'The cited technical guidance provides no such guarantee. Reliability needs to be evaluated for the task and system.', sources: ['nist-genai'] },
      { id: 'rate', question: 'What is the hallucination rate of all AI models?', answer: 'The cited profile does not establish one universal rate. A meaningful result needs a specified model, evaluation, and task.', sources: ['nist-genai'] },
    ], related: ['will-ai-kill-humans', 'how-ai-models-improve', 'what-skills-to-learn-for-ai'],
  },
  {
    slug: 'how-ai-models-improve', title: 'How Do AI Models Improve and Learn?',
    question: 'How do AI models improve, learn, and gain new features?',
    description: 'Understand model training, context, tool access, and AI benchmarks. Learn why a new feature or a larger model does not automatically prove general intelligence.',
    topic: 'capabilities', published, reviewed,
    answer: 'Model training, information supplied during a conversation, and features added around a model are different mechanisms. Google’s technical introduction explains common training concepts; Stanford’s 2026 review documents uneven progress across evaluations. A new feature should be assessed for the task it actually improves.',
    answerSources: ['google-llms', 'stanford-index-2026'], evidence: 'Technical documentation and a dated benchmark synthesis',
    uncertainty: 'Products differ in training, memory, retrieval, and tool configuration. Do not infer a specific service’s data practices or capabilities from a general description of language models.',
    sections: [
      { id: 'training', title: 'Training is different from information in a prompt', paragraphs: ['Google’s introduction explains how large language models learn patterns through training and use context when generating tokens. A model using text supplied in a conversation does not by itself demonstrate that its underlying parameters were retrained.', 'When a product remembers a preference, retrieves a document, or opens a tool, ask which part of the system provided that behavior. This makes it easier to understand what changed and which conditions are needed to reproduce it.'], sources: ['google-llms'] },
      { id: 'evaluation', title: 'A new model needs more than a launch claim', paragraphs: ['Stanford’s 2026 AI Index presents substantial progress alongside uneven performance. Different evaluations probe different tasks, so a benchmark improvement is useful evidence within its scope rather than a complete description of capability.', 'When comparing announcements, keep the evaluation version, allowed tools, number of attempts, and human assistance visible. Compare an accepted result on the same task before drawing a conclusion about your own workflow.'], sources: ['stanford-index-2026'] },
      { id: 'release', title: 'A checklist for reading a model announcement', kind: 'analysis', paragraphs: ['Start with what users can actually access and under which conditions. Separate a demonstrated capability, a promised rollout, and a product feature that combines several components. Then look for an evaluation that resembles your intended use.', 'Our suggested first test is small enough to inspect in full. Keep the prompt, relevant inputs, tool configuration, output, and corrections. This provides a reproducible comparison for your task without pretending it is a scientific ranking of all models.'] },
    ],
    takeaways: ['Separate model training, supplied context, and product-level features.', 'Read an evaluation’s conditions before comparing scores.', 'Use a small, inspectable task when trying a new release.'],
    faqs: [
      { id: 'chat-learning', question: 'Does every chat instantly train the underlying model?', answer: 'Using conversation context is different from retraining model parameters. A specific product’s training and memory practices need its own documentation.', sources: ['google-llms'] },
      { id: 'largest', question: 'Is the largest AI model always the best for my task?', answer: 'A model description is not a task evaluation. The technical introduction discusses training choices, and a useful comparison still needs the task and conditions.', sources: ['google-llms'] },
      { id: 'better', question: 'Are newer AI models better at everything?', answer: 'The AI Index describes uneven capability. An improvement on one evaluation does not establish improvement on every possible task.', sources: ['stanford-index-2026'] },
      { id: 'evolution', question: 'Is AI evolution the same as biological evolution?', answer: 'These sources describe engineered training and evaluated capabilities. The term evolution in a model announcement should not substitute for an explanation of what changed.', sources: ['google-llms'] },
    ], related: ['when-will-agi-arrive', 'why-does-ai-hallucinate', 'how-much-energy-does-ai-use'],
  },
  {
    slug: 'how-much-energy-does-ai-use', title: 'How Much Energy Does AI Use? IEA Data Explained',
    question: 'How much electricity does AI use?',
    description: 'Read the IEA’s 2026 data-centre electricity outlook, distinguish AI from all data-centre workloads, and understand why energy per prompt is not one fixed number.',
    topic: 'environment', published, reviewed,
    answer: 'Energy use varies by workload and system. The IEA’s April 2026 central projection puts total data-centre electricity demand near 950 TWh in 2030, up from 485 TWh in 2025. These are data-centre totals, including non-AI workloads, rather than electricity used by AI alone.',
    answerSources: ['iea-energy-2026'], evidence: 'Energy analysis and a conditional central projection',
    uncertainty: 'A central projection is not a measured future outcome. Hardware, usage, efficiency, and grid constraints can change the trajectory.',
    sections: [
      { id: 'scope', title: 'AI use and total data-centre use are different totals', paragraphs: ['The IEA’s outlook covers data centres supporting AI and other computing. Keeping that scope visible prevents a total infrastructure number from becoming an exaggerated AI-only statistic.', 'Also distinguish electricity from emissions and water consumption. They are related environmental questions, but they use different units and require different evidence. An electricity total alone does not provide a complete environmental comparison.'], sources: ['iea-energy-2026'] },
      { id: 'per-prompt', title: 'There is no single energy cost for every prompt', paragraphs: ['The 2026 IEA summary distinguishes simple text queries from more intensive video, reasoning, and agentic workloads. It also describes improving task efficiency alongside growing usage.', 'A per-request comparison needs the workload, output length, hardware, and measurement boundary. A short text response and a long video generation should not be treated as equal units simply because both began with one submitted prompt.'], sources: ['iea-energy-2026'] },
      { id: 'reading-data', title: 'How to compare environmental claims', kind: 'analysis', paragraphs: ['Check whether a figure includes model training, everyday operation, cooling, or broader infrastructure. Record the location and time period when they matter. An average from one setting may not represent a different system or electricity supply.', 'Our suggested reading method is to keep the scope and unit in the same sentence as the number. For a future figure, name the scenario and publication date. This makes it easier to compare an updated report without pretending that an earlier projection was a measured result.'] },
    ],
    takeaways: ['Keep AI-specific demand separate from total data-centre demand.', 'Identify the workload behind a per-prompt estimate.', 'Label projections with their date, scope, and assumptions.'],
    faqs: [
      { id: 'all-ai', question: 'Is all data-centre electricity used for AI?', answer: 'No. The IEA data-centre outlook includes non-AI workloads, so the total should not be relabeled as AI alone.', sources: ['iea-energy-2026'] },
      { id: 'one-prompt', question: 'Does every AI prompt use the same electricity?', answer: 'No. The report distinguishes workloads with very different energy requirements; one submitted request is not a standardized unit of computing.', sources: ['iea-energy-2026'] },
      { id: '2030', question: 'Is 950 TWh in 2030 already an observed fact?', answer: 'No. It is the IEA’s April 2026 central projection for total data-centre electricity demand.', sources: ['iea-energy-2026'] },
      { id: 'efficient', question: 'Can AI become more efficient while using more electricity overall?', answer: 'Yes. Improved task efficiency can coexist with more users and more intensive workloads, as the IEA summary explains.', sources: ['iea-energy-2026'] },
    ], related: ['how-ai-models-improve', 'when-will-agi-arrive', 'will-ai-take-all-jobs'],
  },
];

export function findAiQuestionArticle(slug: string) { return aiQuestionArticles.find((article) => article.slug === slug); }
export function aiQuestionSourceIds(article: AiQuestionArticle): AiResearchSourceId[] {
  return Array.from(new Set([...article.answerSources, ...article.sections.flatMap((section) => section.sources ?? []), ...(article.table?.sources ?? []), ...article.faqs.flatMap((faq) => faq.sources)]));
}
export const aiQuestionCount = aiQuestionArticles.reduce((total, article) => total + 1 + article.faqs.length, 0);
export const aiQuestionsUpdatedAt = aiQuestionArticles.reduce((date, article) => article.reviewed > date ? article.reviewed : date, '');
