export const aiResearchSources = {
  'safety-2026': {
    title: 'International AI Safety Report 2026', organization: 'International AI Safety Report',
    published: 'February 2026', kind: 'Scientific evidence review',
    url: 'https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026',
    limitation: 'A synthesis of research available for the February report; future-risk estimates remain disputed.',
  },
  'ilo-brief-2025': {
    title: 'Generative AI and jobs: A 2025 update', organization: 'International Labour Organization',
    published: '20 May 2025', kind: 'Research brief',
    url: 'https://www.ilo.org/publications/generative-ai-and-jobs-2025-update',
    limitation: 'Occupational exposure measures potential task changes, rather than observed job losses.',
  },
  'ilo-index-2025': {
    title: 'Generative AI and Jobs: A Refined Global Index of Occupational Exposure', organization: 'ILO and NASK researchers',
    published: '20 May 2025', kind: 'Working paper and exposure estimates',
    url: 'https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure',
    limitation: 'Task-based estimates depend on the study method, occupational classifications, and country composition.',
  },
  'wef-jobs-2025': {
    title: 'The Future of Jobs Report 2025', organization: 'World Economic Forum',
    published: '7 January 2025', kind: 'Employer survey and projections',
    url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/',
    limitation: 'Employer expectations for 2025–2030 cover multiple economic and technological trends, not AI alone.',
  },
  'metr-study-2025': {
    title: 'Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity', organization: 'METR',
    published: 'July 2025', kind: 'Randomized controlled trial',
    url: 'https://arxiv.org/abs/2507.09089',
    limitation: 'A small, specific sample using early-2025 tools; it does not estimate every developer’s current productivity.',
  },
  'metr-update-2026': {
    title: 'We are Changing our Developer Productivity Experiment Design', organization: 'METR',
    published: '24 February 2026', kind: 'Research update and methodological caveats',
    url: 'https://metr.org/blog/2026-02-24-uplift-update/',
    limitation: 'The later experiment has substantial selection and measurement problems; its raw estimates are unreliable.',
  },
  'ifr-industrial-2026': {
    title: 'Five Million Robots now Operate in Factories Globally', organization: 'International Federation of Robotics',
    published: '24 September 2026', kind: 'Industry statistics',
    url: 'https://ifr.org/ifr-press-releases/news/five-million-robots-now-operate-in-factories-globally',
    limitation: 'Industrial robot stock and installation counts do not directly measure employment displacement.',
  },
  'ifr-service-2026': {
    title: 'Global Sales of Professional Service Robots Surge 24%', organization: 'International Federation of Robotics',
    published: '30 September 2026', kind: 'Industry report summary',
    url: 'https://ifr.org/ifr-press-releases/news/global-sales-of-professional-service-robots-surge-24-percent',
    limitation: 'The federation represents the robotics industry; service robots and humanoids are different categories.',
  },
  'agi-levels': {
    title: 'Levels of AGI for Operationalizing Progress on the Path to AGI', organization: 'Morris and colleagues',
    published: 'November 2023; revised September 2025', kind: 'Research framework',
    url: 'https://arxiv.org/abs/2311.02462',
    limitation: 'A proposed way to define capabilities, not an agreed countdown or prediction of an AGI arrival date.',
  },
  'consciousness-2023': {
    title: 'Consciousness in Artificial Intelligence: Insights from the Science of Consciousness', organization: 'Butlin and colleagues',
    published: 'August 2023', kind: 'Research preprint',
    url: 'https://arxiv.org/abs/2308.08708',
    limitation: 'Its assessment concerns the systems examined in 2023 and should not be applied automatically to later models.',
  },
  'consciousness-2026': {
    title: 'Identifying indicators of consciousness in AI systems', organization: 'Butlin, Long, and colleagues; Trends in Cognitive Sciences',
    published: 'June 2026 journal issue', kind: 'Scientific opinion article',
    url: 'https://www.sciencedirect.com/science/article/pii/S1364661325002864',
    limitation: 'Theory-based indicators can inform judgments; they are not a definitive consciousness test.',
  },
  'nist-genai': {
    title: 'Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile', organization: 'NIST',
    published: '26 July 2024', kind: 'Technical risk-management guidance',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf',
    limitation: 'A voluntary technical profile, not a guarantee of safety or a measurement of one product’s error rate.',
  },
  'stanford-index-2026': {
    title: 'The 2026 AI Index Report', organization: 'Stanford HAI',
    published: '2026 edition', kind: 'Research and data synthesis',
    url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report',
    limitation: 'Benchmarks and underlying datasets have their own dates and limits; scores are not universal intelligence measures.',
  },
  'google-llms': {
    title: 'LLMs: What’s a large language model?', organization: 'Google for Developers',
    published: 'Living technical documentation; accessed 28 October 2026', kind: 'Technical explanation',
    url: 'https://developers.google.com/machine-learning/crash-course/llm/transformers',
    limitation: 'Introduces common model concepts; it does not describe every product’s training or memory configuration.',
  },
  'iea-energy-2026': {
    title: 'Key Questions on Energy and AI: Executive summary', organization: 'International Energy Agency',
    published: '16 April 2026', kind: 'Energy analysis and scenario projections',
    url: 'https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary',
    limitation: 'Data-centre totals include non-AI workloads; projections and per-task consumption depend on assumptions.',
  },
} as const;

export type AiResearchSourceId = keyof typeof aiResearchSources;
