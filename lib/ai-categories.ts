import type { AiCategory } from '@/lib/ai-tools';

export const aiCategories: AiCategory[] = [
  {
    id: 'video-generators', name: 'Video generation', icon: 'video',
    title: 'Free AI Video Generators: Credits & Limits',
    description: 'Compare AI video generators with free entry options. Check one-time credits, daily limits, account requirements, model access, and export conditions.',
    heading: 'AI video generators with free entry options',
    summary: 'Find a tool for a short generated clip, then check the actual generation allowance. A free account, a one-time credit balance, and an ongoing free feature are different offers.',
    guide: [
      { title: 'Choose the input before choosing the generator', paragraphs: ['Text-to-video starts from a scene description. Image-to-video starts from a reference image and adds motion. For a first attempt, use one subject, one action, and a clear camera direction. A request for a complete film is harder to evaluate and can use the allowance before you have a usable shot.', 'Decide whether you need a short visual experiment or material for an ongoing project. Runway’s reviewed allowance is one-time; HeyGen’s reviewed free plan covers a small number of watermarked avatar videos. Adobe’s free Firefly access is limited to selected generation options. Check the model shown in the current interface before spending credits.'] },
      { title: 'Count usable clips, not just listed credits', paragraphs: ['Credit costs can depend on model, duration, and quality. Several attempts may be needed to get one useful clip. Compare tools using the same small scene and include failed attempts when estimating the allowance you need.', 'Before a longer project, test a download and inspect its resolution, aspect ratio, watermark, and rights information. Keep individual shots short and assemble them in an editor afterward. A generator produces visual material; it may not supply the timeline, captioning, and audio controls needed to finish a video.'] },
    ],
    workflow: ['Write a single-shot scene with one subject and action.', 'Check the current model and generation cost.', 'Generate a small test and download it before using more credits.', 'Assemble accepted shots in a separate editor.'],
    questions: [{ question: 'Is a free account the same as free video generation?', answer: 'No. The account may provide no included generation credits. Pika’s reviewed Free account lists zero monthly credits, so it is marked as paid-credit generation in this directory.' }, { question: 'Can I make unlimited videos for free?', answer: 'Do not assume that. Availability, queues, model access, credits, and export limits vary. Compare the current provider terms rather than a headline promising unlimited output.' }],
  },
  {
    id: 'image-generators', name: 'Image generation', icon: 'image',
    title: 'Free AI Image Generators: Compare Plans',
    description: 'Find AI image tools with free access and compare daily allowances, public creations, model restrictions, and editing needs. Includes official provider links.',
    heading: 'Free AI image tools for your next visual idea',
    summary: 'Explore image generators for illustrations, thumbnails, and concept art. Compare access limits and output requirements before deciding where to create your final image.',
    guide: [
      { title: 'Match the tool to the image you need', paragraphs: ['A thumbnail, an illustration, and a product concept have different acceptance checks. Write down the intended size, subject, composition, and space needed for text. For a thumbnail, a clear silhouette and readable layout may matter more than extra background detail.', 'Use the same short brief when comparing providers. Inspect hands, small objects, embedded lettering, and whether the result follows the requested composition. Provider-selected examples can show possibilities, but your own brief is a more useful test of the result you need.'] },
      { title: 'Check privacy and the path to a finished asset', paragraphs: ['Some free creation plans make outputs public. Leonardo’s reviewed Free plan explicitly lists public creations, so check that setting before uploading a confidential reference or planning an unreleased design. Do not infer privacy from the fact that you signed in.', 'The generated image may still need cropping, typography, or a background adjustment. Keep the original and inspect the final download at its intended display size. Check the current provider and model terms for the way you plan to publish, especially when a tool offers multiple third-party models.'] },
    ],
    workflow: ['Write a brief with subject, composition, aspect ratio, and intended use.', 'Check whether inputs or outputs are public on the selected plan.', 'Compare a small set of outputs against the same brief.', 'Inspect the downloaded file and finish layout or text in an editor.'],
    questions: [{ question: 'Does every image generator also animate images?', answer: 'No. A still image is not a video. Use the video or cartoon category if you need motion, and confirm the exact animation feature is available on your plan.' }, { question: 'Does one token always equal one image?', answer: 'No. Tokens and credits are accounting units defined by the provider. Model choice, image count, quality, and other settings can change the cost of a request.' }],
  },
  {
    id: 'audio-tools', name: 'Audio & voice', icon: 'audio',
    title: 'Free AI Voice & Audio Tools: Compare Options',
    description: 'Compare free-entry AI voice and audio tools for text-to-speech, voiceover drafts, and speech cleanup. Check credits, publishing terms, and output needs.',
    heading: 'AI voice, voiceover, and audio cleanup tools',
    summary: 'Choose between generating speech from a script and improving a recording you already have. The right tool depends on which of those jobs you need done.',
    guide: [
      { title: 'Start with the type of audio work', paragraphs: ['Text-to-speech turns a script into spoken audio. Speech enhancement processes an existing recording. Captions turn spoken material into text on screen. These tasks can appear in the same product, but they are different workflows and do not necessarily share the same free allowance.', 'For a voiceover, test a short script containing the names, numbers, or abbreviations you actually need. Listen for pronunciation, emphasis, and unnatural pauses. For enhancement, compare the original with the processed audio and check that important words were not damaged.'] },
      { title: 'Review the whole recording before publishing', paragraphs: ['A clear opening sentence does not establish that the rest of the audio is usable. Listen through the full output and check sentence boundaries, clipping, missing words, and synchronization if it will accompany video. Keep the original source so you can compare a correction.', 'Publishing conditions matter as much as the sound. ElevenLabs lists a commercial license beginning on a paid tier in the reviewed pricing. Check attribution and allowed use for the selected plan. Use voices and recordings you are entitled to use; do not treat an available voice feature as permission to imitate another person.'] },
    ],
    workflow: ['Choose generation from text or cleanup of an existing recording.', 'Test a short, representative script or audio segment.', 'Listen to the complete output and compare corrections.', 'Check usage terms and synchronize the accepted audio with your video.'],
    questions: [{ question: 'Can a speech enhancer create a new voiceover from text?', answer: 'Not necessarily. Adobe Podcast Enhance Speech is listed here for improving recorded speech. Choose a text-to-speech tool when you need spoken audio from a script.' }, { question: 'Can I monetize audio made on a free plan?', answer: 'That depends on the provider, plan, voice, and feature. Review the official license and attribution conditions before publishing rather than assuming free generation includes commercial rights.' }],
  },
  {
    id: 'video-editors', name: 'Video editing', icon: 'edit',
    title: 'Free Video Editors with AI Features',
    description: 'Compare video editors with free access and AI-assisted features. Check captions, voiceovers, premium assets, watermark conditions, and export resolution.',
    heading: 'Free video editors and AI-assisted editing tools',
    summary: 'Finish a video by arranging clips, adding audio, and checking captions. Free basic editing and free access to every AI feature are different things.',
    guide: [
      { title: 'Editing starts with material you can use', paragraphs: ['An editor assembles footage, images, text, and audio on a timeline or scene layout. It can be the final step after an AI generator creates a short clip, but it can also work entirely with your own recordings. Decide which finishing tasks you need: trimming, captions, voiceover, or a particular output format.', 'For a first trial, use a small project with one clip, a title, and a short audio track. Check whether your chosen effect, stock asset, or caption feature is included. A free editor can still contain premium elements that change what you can export without paying.'] },
      { title: 'Test export before building the full project', paragraphs: ['Download a short sample early. Inspect the actual file for resolution, frame shape, watermark, and audio synchronization. A preview in the editor may not reveal all export restrictions. Keep an editable copy so a late discovery does not require rebuilding the project.', 'Microsoft’s personal Clipchamp free plan lists up to 1080p exports without watermarks and includes several AI-assisted features. CapCut’s reviewed Free tier explicitly lists basic tools; additional AI access can be paid. Compare the feature you need rather than treating every editor as the same offer.'] },
    ],
    workflow: ['Create a small project using assets you own or can use.', 'Try the required caption, voiceover, or cleanup feature.', 'Export a sample and inspect the downloaded file.', 'Finish the full edit only after confirming the plan fits the workflow.'],
    questions: [{ question: 'Which listed editor has a verified free watermark-free export?', answer: 'Microsoft’s reviewed personal Clipchamp plan lists watermark-free exports up to 1080p using included or personal assets. Premium assets and work-account licensing have separate conditions.' }, { question: 'Does an AI video editor generate an entire video from a prompt?', answer: 'Some products offer generation alongside editing, but it is a separate feature with its own limits. Use the video generation category for that task and verify its allowance separately.' }],
  },
  {
    id: 'cartoon-animation', name: 'Cartoons & animation', icon: 'cartoon',
    title: 'Free AI Cartoon & Animation Tools',
    description: 'Find tools for cartoon character images, talking avatars, and scene assembly. Compare free access and learn the difference between artwork and animation.',
    heading: 'AI cartoon artwork and character animation tools',
    summary: 'A cartoon image, a talking character, and a complete animated scene require different tools. Start with the result you want, then choose the smallest workflow that can create it.',
    guide: [
      { title: 'Choose artwork, a talking character, or an animated scene', paragraphs: ['For a profile picture or character sheet, an image generator may be enough. For a character that speaks a prepared script, Adobe Express offers an audio-driven animation workflow with supplied characters. For a multi-scene story, expect to combine artwork, animation, voice, and editing rather than obtain a finished film from one free prompt.', 'Plan one short scene first. Give it a character, an action, and a line of dialogue if needed. That makes it easier to check continuity and understand which part of the workflow needs improvement. A new visual style will not fix a weak script or a scene with no clear action.'] },
      { title: 'Keep the character recognizable across shots', paragraphs: ['Record a simple character description, palette, and reference image. Compare clothing, proportions, and distinguishing details when generating another pose or scene. If you use a template character, confirm that its available movements and expressions suit the script before recording the full dialogue.', 'Review lip synchronization, voice timing, and scene transitions after assembling the video. Use original characters and assets you can use, and inspect the final download. A free still-image allowance does not guarantee free animation, unrestricted publishing, or enough credits for a whole episode.'] },
    ],
    workflow: ['Write a short scene and decide whether it needs a still image or motion.', 'Create or select a character reference and record its important details.', 'Add a short recording or a separately permitted voiceover.', 'Animate, assemble, and inspect one finished scene before expanding the story.'],
    questions: [{ question: 'Which tool can make a cartoon character speak?', answer: 'Adobe Express Animate Characters accepts recorded or uploaded audio and animates a selected character. Its reviewed documentation describes up to two minutes of audio. That is different from generating a complete cartoon film from a story prompt.' }, { question: 'Can a still-image tool make a full cartoon episode?', answer: 'A character image is one asset. A full episode also needs shots, motion, timing, sound, and editing. Check the available features and allowances at each stage instead of assuming the whole process is included.' }],
  },
];

export function findAiCategory(id: string) { return aiCategories.find((category) => category.id === id); }
