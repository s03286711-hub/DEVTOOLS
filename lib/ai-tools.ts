export type AiCategoryId = 'video-generators' | 'image-generators' | 'audio-tools' | 'video-editors' | 'cartoon-animation';
export type AiAccess = 'free-plan' | 'one-time-credits' | 'free-feature' | 'free-editor' | 'paid-generation';

export interface AiTool {
  id: string;
  name: string;
  maker: string;
  categories: AiCategoryId[];
  task: string;
  description: string;
  bestFor: string;
  access: AiAccess;
  accessLabel: string;
  freeAccess: string;
  limitation: string;
  exportNote: string;
  officialUrl: string;
  sourceUrl: string;
  reviewedAt: string;
  keywords: string[];
}

export interface AiCategory {
  id: AiCategoryId;
  name: string;
  title: string;
  description: string;
  heading: string;
  summary: string;
  icon: 'video' | 'image' | 'audio' | 'edit' | 'cartoon';
  guide: { title: string; paragraphs: string[] }[];
  workflow: string[];
  questions: { question: string; answer: string }[];
}

export const aiToolsReviewedAt = '2026-10-28';

export const aiTools: AiTool[] = [
  {
    id: 'heygen', name: 'HeyGen', maker: 'HeyGen', categories: ['video-generators'],
    task: 'AI avatar and presenter videos',
    description: 'Create a short presenter-led video from a script using an avatar workflow. This is a different job from generating a cinematic landscape clip, so evaluate the speaker, pronunciation, and timing together.',
    bestFor: 'A brief avatar presentation or a script-led explainer draft.',
    access: 'free-plan', accessLabel: 'Monthly free video allowance',
    freeAccess: 'The free plan lists three videos per month, up to one minute each, with watermarks.',
    limitation: 'The free allowance is small. Features, avatars, and generation methods differ by plan; do not assume every video model is included.',
    exportNote: 'Free videos are watermarked. Check output quality and language support before a full project.',
    officialUrl: 'https://www.heygen.com/', sourceUrl: 'https://www.heygen.com/pricing', reviewedAt: aiToolsReviewedAt,
    keywords: ['video', 'avatar', 'presenter', 'text to video', 'heygen', 'script'],
  },
  {
    id: 'runway', name: 'Runway', maker: 'Runway', categories: ['video-generators'],
    task: 'Generative video experiments',
    description: 'A creative platform for generating and transforming visual media. Its free entry plan is useful for a small concept test; the models and features available to that plan are a subset of the wider product.',
    bestFor: 'A tightly scoped visual concept with a limited number of attempts.',
    access: 'one-time-credits', accessLabel: 'One-time free credits',
    freeAccess: 'The free plan lists 125 one-time credits, rather than a monthly refill.',
    limitation: 'Model choice and generation cost affect how far the credits go. Do not plan an ongoing free workflow around the initial allowance.',
    exportNote: 'Watermark removal and some export features are listed on paid plans.',
    officialUrl: 'https://runway.com/', sourceUrl: 'https://runway.com/pricing', reviewedAt: aiToolsReviewedAt,
    keywords: ['video', 'image to video', 'runway', 'generative clips'],
  },
  {
    id: 'adobe-firefly', name: 'Adobe Firefly', maker: 'Adobe', categories: ['image-generators', 'video-generators', 'cartoon-animation'],
    task: 'Generative images and selected creative models',
    description: 'Generate visual ideas and explore image, video, and illustration workflows in Adobe’s creative AI app. Use a still image for character exploration or check the selected video model before spending a limited generation.',
    bestFor: 'Comparing visual directions and developing a consistent character reference.',
    access: 'free-plan', accessLabel: 'Limited free generations',
    freeAccess: 'Adobe lists a free plan with limited daily generations on a curated set of models.',
    limitation: 'The free allowance does not unlock every model. Video, audio, and partner-model access depend on the feature and plan.',
    exportNote: 'Check export settings and the terms of the exact model you selected.',
    officialUrl: 'https://firefly.adobe.com/', sourceUrl: 'https://www.adobe.com/products/firefly/plans.html', reviewedAt: aiToolsReviewedAt,
    keywords: ['image', 'video', 'art', 'cartoon', 'character', 'illustration', 'adobe'],
  },
  {
    id: 'bing-image-creator', name: 'Bing Image Creator', maker: 'Microsoft', categories: ['image-generators', 'cartoon-animation'],
    task: 'Text-to-image and character artwork',
    description: 'Turn a scene description into a still image in Microsoft’s image creation experience. Describe the subject, composition, and intended format when trying an illustration or an original cartoon character.',
    bestFor: 'An illustration, concept image, or character reference rather than an animated scene.',
    access: 'free-feature', accessLabel: 'Free image creation',
    freeAccess: 'Microsoft offers free image creation; generation speed and credits vary by experience.',
    limitation: 'Guest creation is limited; sign in for more creation options and models. Check the current allowance instead of assuming unlimited fast output.',
    exportNote: 'Still images need a separate animation or editing step to become a video.',
    officialUrl: 'https://www.bing.com/images/create', sourceUrl: 'https://www.bing.com/images/create/ai-image-generator', reviewedAt: aiToolsReviewedAt,
    keywords: ['images', 'bing', 'microsoft', 'text to image', 'cartoon images', 'illustrations'],
  },
  {
    id: 'leonardo', name: 'Leonardo.Ai', maker: 'Leonardo.Ai', categories: ['image-generators', 'cartoon-animation'],
    task: 'AI artwork and character concepts',
    description: 'Explore visual concepts and illustration styles through an AI creation workspace. For a cartoon project, develop a clear still reference first and compare the character’s appearance across a few variations.',
    bestFor: 'Character concept art and testing a small set of visual directions.',
    access: 'free-plan', accessLabel: 'Daily free tokens',
    freeAccess: 'The free plan lists 150 fast tokens per day with basic settings and limited model access.',
    limitation: 'Free-plan creations are listed as public. A token is not necessarily one finished image, and private creation is not included in the reviewed free tier.',
    exportNote: 'Inspect the output resolution and plan terms before using a final asset.',
    officialUrl: 'https://leonardo.ai/', sourceUrl: 'https://leonardo.ai/pricing', reviewedAt: aiToolsReviewedAt,
    keywords: ['images', 'art', 'character', 'cartoons', 'illustration', 'leonardo'],
  },
  {
    id: 'elevenlabs', name: 'ElevenLabs', maker: 'ElevenLabs', categories: ['audio-tools'],
    task: 'AI voice and sound experiments',
    description: 'Generate spoken audio from text and explore other sound tools. Try a short script first so you can inspect pronunciation, pacing, and pauses before using more of the allowance.',
    bestFor: 'A voiceover draft or a small sound experiment.',
    access: 'free-plan', accessLabel: 'Monthly free credits',
    freeAccess: 'The free plan lists 10,000 credits per month, shared across supported products.',
    limitation: 'Credit cost depends on the feature and model. The pricing page lists a commercial license from the Starter tier; check free-plan publishing and attribution terms.',
    exportNote: 'Review voice, usage rights, and available download formats for the selected plan.',
    officialUrl: 'https://elevenlabs.io/', sourceUrl: 'https://elevenlabs.io/pricing', reviewedAt: aiToolsReviewedAt,
    keywords: ['audio', 'voice', 'text to speech', 'tts', 'voiceover', 'sound effects'],
  },
  {
    id: 'adobe-podcast', name: 'Adobe Podcast Enhance Speech', maker: 'Adobe', categories: ['audio-tools'],
    task: 'Clean up recorded speech',
    description: 'Enhance an existing speech recording rather than generating a new speaker from a script. Compare the processed audio with the original to hear whether background reduction also changed the voice.',
    bestFor: 'Improving a short spoken recording for a presentation or draft video.',
    access: 'free-feature', accessLabel: 'Free speech enhancement',
    freeAccess: 'Adobe documents free daily use of Enhance Speech, with a premium option.',
    limitation: 'Upload size, daily processing, supported media, and adjustment controls depend on the current plan.',
    exportNote: 'Keep the original recording and check the full result for lost or altered words.',
    officialUrl: 'https://podcast.adobe.com/enhance', sourceUrl: 'https://podcast.adobe.com/en/guides/what-is-enhance-speech', reviewedAt: aiToolsReviewedAt,
    keywords: ['audio', 'speech', 'noise reduction', 'podcast', 'enhance voice', 'cleanup'],
  },
  {
    id: 'clipchamp', name: 'Microsoft Clipchamp', maker: 'Microsoft', categories: ['video-editors', 'audio-tools'],
    task: 'Edit video, add captions, and make voiceovers',
    description: 'Combine your clips, images, and audio on an editing timeline. The personal free plan includes AI-assisted editing features, making it a practical finishing step after you create assets elsewhere.',
    bestFor: 'Assembling a short video with captions and a voiceover.',
    access: 'free-editor', accessLabel: 'Free editor with AI features',
    freeAccess: 'The personal free plan lists AI subtitles, voiceovers, and silence removal, with up to 1080p exports.',
    limitation: 'A personal Microsoft account is required. Work-account licensing, premium stock assets, and 4K export have different conditions.',
    exportNote: 'Microsoft lists watermark-free free-plan exports using included or personal assets.',
    officialUrl: 'https://clipchamp.com/', sourceUrl: 'https://clipchamp.com/en/pricing/', reviewedAt: aiToolsReviewedAt,
    keywords: ['editing', 'video editor', 'captions', 'subtitles', 'voiceovers', 'audio', '1080p'],
  },
  {
    id: 'capcut', name: 'CapCut', maker: 'CapCut', categories: ['video-editors'],
    task: 'Short-form video editing',
    description: 'Trim and arrange clips, work with templates, and prepare a short social video. Inspect the exact effect or AI feature in your project before relying on it for a free export.',
    bestFor: 'Basic edits and a template-based draft built from existing clips.',
    access: 'free-editor', accessLabel: 'Free basic editing',
    freeAccess: 'The reviewed free tier lists basic editing tools and free templates.',
    limitation: 'AI features and premium assets can require a paid plan or credits. Availability and final pricing vary by account and region.',
    exportNote: 'Check the export screen for premium assets, watermark behavior, and resolution.',
    officialUrl: 'https://www.capcut.com/', sourceUrl: 'https://www.capcut.com/pricing/', reviewedAt: aiToolsReviewedAt,
    keywords: ['video editing', 'shorts', 'reels', 'templates', 'capcut', 'editor'],
  },
  {
    id: 'canva', name: 'Canva', maker: 'Canva', categories: ['image-generators', 'video-editors', 'cartoon-animation'],
    task: 'Design, limited AI creation, and scene assembly',
    description: 'Combine layouts, text, images, and animated elements into a design or video. It can be a useful place to assemble cartoon scenes or presentation assets after choosing a consistent visual style.',
    bestFor: 'A designed scene, thumbnail, or short video assembled from selected assets.',
    access: 'free-plan', accessLabel: 'Free plan; AI allowance varies',
    freeAccess: 'Canva documents a shared allowance for supported AI tools on Free, alongside its free editor.',
    limitation: 'Free does not include Ultra AI tools such as Create a video clip. Some assets, effects, and higher AI access require an upgrade.',
    exportNote: 'Use included or owned assets and inspect the download screen for paid elements.',
    officialUrl: 'https://www.canva.com/', sourceUrl: 'https://www.canva.com/help/ai-access/', reviewedAt: aiToolsReviewedAt,
    keywords: ['images', 'design', 'cartoon maker', 'animation', 'video editing', 'canva'],
  },
  {
    id: 'adobe-express-animation', name: 'Adobe Express Animate Characters', maker: 'Adobe', categories: ['cartoon-animation'],
    task: 'Make a character talk from recorded audio',
    description: 'Choose a supplied character and upload or record dialogue to produce an animated speaking character. This is an audio-driven character workflow, rather than a generator that turns an entire story prompt into a finished cartoon film.',
    bestFor: 'A short talking-character explainer using your own script and recording.',
    access: 'free-feature', accessLabel: 'Free character animation',
    freeAccess: 'Adobe offers the Animate Characters feature for free with an Express free plan.',
    limitation: 'The source describes audio up to two minutes. Character choices and downstream editing or premium assets have their own limits.',
    exportNote: 'Preview the animation, download it, or continue editing in Express.',
    officialUrl: 'https://www.adobe.com/express/feature/video/animation/audio', sourceUrl: 'https://www.adobe.com/express/feature/video/animation/audio', reviewedAt: aiToolsReviewedAt,
    keywords: ['cartoon', 'animation', 'lip sync', 'talking character', 'audio to animation'],
  },
  {
    id: 'pika', name: 'Pika', maker: 'Pika', categories: ['video-generators', 'cartoon-animation'],
    task: 'Paid-credit video and visual creation',
    description: 'A creative generation platform with video, image, and audio tools. It is included as a comparison option because the existence of a free account should not be confused with a recurring free generation allowance.',
    bestFor: 'Comparing a credit-based platform after checking the exact model and generation cost.',
    access: 'paid-generation', accessLabel: 'Paid generation credits',
    freeAccess: 'The reviewed Free account lists zero monthly credits and credit packs only.',
    limitation: 'No recurring free generation is established by that plan. It is excluded when the free-access filter is enabled.',
    exportNote: 'The reviewed pricing lists no watermark, while the free account excludes a commercial license.',
    officialUrl: 'https://pika.art/', sourceUrl: 'https://pika.art/pricing', reviewedAt: aiToolsReviewedAt,
    keywords: ['pika', 'ai video', 'image to video', 'cartoon animation', 'paid credits'],
  },
];

export function hasFreeAccess(tool: AiTool) { return tool.access !== 'paid-generation'; }
export function toolsForCategory(category: AiCategoryId) { return aiTools.filter((tool) => tool.categories.includes(category)); }
