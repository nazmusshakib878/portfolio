import {
  getSystemPrompt,
  getProjectCardDataList,
  getResumeCardData,
  getSkillsData,
  getContactDirectData,
} from './knowledge'
import { portfolioData } from '@/data/portfolio'
import { socialLinks } from '@/constants/social-links'
import type { AiActionCard, ChatResponseBody, AiMode } from '@/types/ai'

export interface MessageItem {
  role: 'user' | 'assistant'
  content: string
}

interface ParsedConstraints {
  exactSentences?: number
  exactBullets?: number
  isDetailed: boolean
}

// ============================================================================
// 1. Language Detection & Parsing
// ============================================================================

const BANGLA_UNICODE_REGEX = /[\u0980-\u09FF]/

const BANGLA_EXPLICIT_PATTERNS = [
  /\b(in\s*bangla|in\s*bengali|bangla\s*te|banglay|bangla\s*bhasay|bangla\s*language)\b/i,
  /(বাংলায়|বাংলা\s*ভাষায়|বাংলাতে|বাংলায়\s*বলো|বাংলায়\s*বলো|বাংলায়\s*লিখুন|বাংলায়\s*লিখুন|বাংলায়\s*ব্যাখ্যা|বাংলায়\s*ব্যাখ্যা)/i,
]

const ENGLISH_EXPLICIT_PATTERNS = [
  /\b(in\s*english|english\s*e|english\s*version|english\s*language)\b/i,
  /(ইংরেজিতে|ইংরেজিতে\s*বলো|ইংলিশে|ইংলিশে\s*বলো)/i,
]

const BANGLISH_PATTERNS = [
  /\b(kemon|acho|achen|achi|valo|bhalo|ki\s*khobor|khbr)\b/i,
  /\b(daw|dao|den|diben|dibo|dite|korbo|kore|koro|koren|bolo|bolen|bolte|janan|dekhaw|dekhao)\b/i,
  /\b(apnar|apni|tumi|tomar|amr|amar|shakib\s*er|shakiber|shomporke|somporke)\b/i,
  /\b(bistarito|kothay|kothai|koto|keno|kobe|kivabe|ki\s*ki)\b/i,
  /\b(thako|thaken|bari|porashona|porasuna|chakri|jogajog|prokolpo)\b/i,
]

export function detectRequestedLanguage(
  text: string,
  history: MessageItem[] = []
): 'bangla' | 'english' {
  if (!text) return 'english'

  // 1. Explicit request takes absolute highest precedence
  if (BANGLA_EXPLICIT_PATTERNS.some((pattern) => pattern.test(text))) {
    return 'bangla'
  }
  if (ENGLISH_EXPLICIT_PATTERNS.some((pattern) => pattern.test(text))) {
    return 'english'
  }

  // 2. Check for Bengali Unicode script
  if (BANGLA_UNICODE_REGEX.test(text)) {
    return 'bangla'
  }

  // 3. Check for Banglish phonetic phrases
  if (BANGLISH_PATTERNS.some((pattern) => pattern.test(text))) {
    return 'bangla'
  }

  // 4. Short ambiguous follow-ups: inherit from recent history if applicable
  const trimmed = text.trim()
  if (trimmed.length < 25 && history.length > 0) {
    const lastUserMsg = [...history].reverse().find((m) => m.role === 'user')?.content
    if (lastUserMsg) {
      if (
        BANGLA_EXPLICIT_PATTERNS.some((p) => p.test(lastUserMsg)) ||
        BANGLA_UNICODE_REGEX.test(lastUserMsg) ||
        BANGLISH_PATTERNS.some((p) => p.test(lastUserMsg))
      ) {
        return 'bangla'
      }
    }
  }

  return 'english'
}

/**
 * Backward compatibility export.
 */
export function isBanglaOrBanglish(text: string): boolean {
  return detectRequestedLanguage(text) === 'bangla'
}

/**
 * Detects if user requested detailed answer.
 */
export function isDetailRequested(text: string): boolean {
  if (!text) return false
  const detailPatterns = [
    /\b(detail|details|detailed|elaborate|deep\s*dive|in-depth|explain\s*in\s*detail|breakdown|architecture)\b/i,
    /\b(step\s*by\s*step|how\s*it\s*works|how\s*does\s*it\s*work)\b/i,
    /(বিস্তারিত|ব্যাখ্যা|বিশদ|সবকিছু|ভেঙ্গে\s*বলো|ভেঙে\s*বলো|কীভাবে\s*কাজ\s*করে)/i,
  ]
  return detailPatterns.some((pattern) => pattern.test(text))
}

// ============================================================================
// 2. Formatting & Constraint Parsing
// ============================================================================

export function parseConstraints(query: string): ParsedConstraints {
  const isDetailed = isDetailRequested(query)

  // Sentence count parsing: "in just 2 sentences", "exactly 2 sentences", "in 1 sentence", "২ বাক্যে"
  let exactSentences: number | undefined
  const sentenceMatchEn = query.match(
    /\b(?:in|just|exactly|only|within)\s*(?:just|only)?\s*(\d+|one|two|three|four|five)\s*sentences?\b/i
  )
  if (sentenceMatchEn) {
    const val = sentenceMatchEn[1].toLowerCase()
    const wordToNum: Record<string, number> = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
    }
    exactSentences = wordToNum[val] ?? parseInt(val, 10)
  }

  const sentenceMatchBn = query.match(/(?:মাত্র|ঠিক|শুধুমাত্র)?\s*(\d+|১|২|৩|৪|৫)\s*(?:টি\s*)?বাক্যে?/i)
  if (sentenceMatchBn && !exactSentences) {
    const bnToNum: Record<string, number> = { '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5 }
    const char = sentenceMatchBn[1]
    exactSentences = bnToNum[char] ?? parseInt(char, 10)
  }

  // Bullet point count parsing: "in 4 bullet points", "4 bullets", "৪টি পয়েন্টে"
  let exactBullets: number | undefined
  const bulletMatchEn = query.match(
    /\b(?:in|with|exactly|only)?\s*(\d+|one|two|three|four|five)\s*(?:bullet\s*points?|bullets?|points?)\b/i
  )
  if (bulletMatchEn) {
    const val = bulletMatchEn[1].toLowerCase()
    const wordToNum: Record<string, number> = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
    }
    exactBullets = wordToNum[val] ?? parseInt(val, 10)
  }

  const bulletMatchBn = query.match(
    /(?:ঠিক|মাত্র|মোট)?\s*(\d+|১|২|৩|৪|৫)\s*(?:টি\s*)?(?:বুলেট\s*পয়েন্ট|বুলেট|পয়েন্ট|পয়েন্টে)/i
  )
  if (bulletMatchBn && !exactBullets) {
    const bnToNum: Record<string, number> = { '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5 }
    const char = bulletMatchBn[1]
    exactBullets = bnToNum[char] ?? parseInt(char, 10)
  }

  return { exactSentences, exactBullets, isDetailed }
}

/**
 * Splits text into sentences safely while protecting abbreviations like "Md.", "e.g.", "vs.", "3.60".
 */
export function splitSentences(text: string): string[] {
  if (!text) return []

  // Replace common periods that are not sentence terminators
  const placeholderMap: Array<[RegExp, string]> = [
    [/\bMd\./g, '__MD__'],
    [/\be\.g\./gi, '__EG__'],
    [/\bi\.e\./gi, '__IE__'],
    [/\bvs\./gi, '__VS__'],
    [/\bBSc\./gi, '__BSC__'],
    [/\bCSE\./gi, '__CSE__'],
    [/\bNo\./gi, '__NO__'],
    [/(\d+)\.(\d+)/g, '$1__DECIMAL__$2'], // protects "3.60"
  ]

  let safe = text
  for (const [regex, placeholder] of placeholderMap) {
    safe = safe.replace(regex, placeholder)
  }

  // Split on sentence terminators: . ! ? । followed by whitespace or string end
  const rawParts = safe.split(/(?<=[.!?।])\s+/g)

  const restore = (str: string): string => {
    return str
      .replace(/__MD__/g, 'Md.')
      .replace(/__EG__/g, 'e.g.')
      .replace(/__IE__/g, 'i.e.')
      .replace(/__VS__/g, 'vs.')
      .replace(/__BSC__/g, 'BSc.')
      .replace(/__CSE__/g, 'CSE.')
      .replace(/__NO__/g, 'No.')
      .replace(/__DECIMAL__/g, '.')
      .trim()
  }

  return rawParts.map(restore).filter((s) => s.length > 0)
}

/**
 * Ensures output string adheres strictly to an exact sentence count constraint.
 */
export function enforceExactSentenceCount(
  text: string,
  targetCount: number,
  _isBangla?: boolean
): string {
  const sentences = splitSentences(text)
  if (sentences.length === 0) return text
  if (sentences.length === targetCount) return sentences.join(' ')

  if (sentences.length > targetCount) {
    return sentences.slice(0, targetCount).join(' ')
  }

  // If fewer sentences than requested, keep clean as is without duplicating
  return sentences.join(' ')
}

/**
 * Ensures a list of bullet points adheres strictly to requested bullet count.
 */
export function enforceExactBulletCount(bullets: string[], targetCount: number): string {
  const selected = bullets.slice(0, targetCount)
  return selected.join('\n')
}

// ============================================================================
// 3. Conversational Context Resolution
// ============================================================================

function resolveContextTopic(query: string, history: MessageItem[] = []): string | null {
  const q = query.toLowerCase()
  const isAnaphoric =
    /\b(it|its|this|that|the project|the app|the system|the repo|the platform|oita|eta|aita|sheta|seta|এইটা|ওইটা|সেটা|demo|link|url)\b/i.test(
      q
    )

  if (!isAnaphoric || history.length === 0) {
    return null
  }

  // Look backwards at previous messages to find the mentioned project or subject
  for (let i = history.length - 1; i >= 0; i--) {
    const text = history[i].content.toLowerCase()
    if (text.includes('resumate') || text.includes('ai cv') || text.includes('resume builder')) {
      return 'resumate'
    }
    if (text.includes('cv payment') || text.includes('n8n') || text.includes('payment reminder')) {
      return 'cv-payment'
    }
    if (text.includes('securex') || text.includes('cctv')) {
      return 'securex'
    }
    if (text.includes('smart campus') || text.includes('campus system') || text.includes('cse4204')) {
      return 'smart-campus'
    }
    if (text.includes('logistica')) {
      return 'logistica'
    }
    if (text.includes('nur foodes') || text.includes('food software') || /\bpos\b/i.test(text)) {
      return 'nur-foodes'
    }
    if (text.includes('library')) {
      return 'library'
    }
  }

  return null
}

// ============================================================================
// 4. Intent Handlers
// ============================================================================

/**
 * Intent 1: Unverified Employers & Negative Verification (Google, Microsoft, Meta, etc.)
 * Strictly answers "No" first followed by verified experience.
 */
function handleUnverifiedEmployers(
  query: string,
  isBangla: boolean,
  constraints: ParsedConstraints
): { reply: string; cards: AiActionCard[]; suggestedQueries: string[] } | null {
  const q = query.toLowerCase()

  const unverifiedCompanies = [
    'google',
    'microsoft',
    'meta',
    'facebook company',
    'amazon',
    'apple',
    'netflix',
    'tesla',
    'uber',
    'twitter',
    'oracle',
    'ibm',
    'intel',
    'cisco',
    'brain station',
    'kaz software',
  ]

  // Find all unverified companies mentioned in the query (English and Bengali)
  const matched = unverifiedCompanies.filter((c) => {
    if (c === 'google') return q.includes('google') || q.includes('গুগল')
    if (c === 'microsoft') return q.includes('microsoft') || q.includes('মাইক্রোসফট')
    if (c === 'meta' || c === 'facebook company') {
      return (
        q.includes('meta') ||
        q.includes('মেটা') ||
        q.includes('facebook company') ||
        q.includes('work at facebook') ||
        q.includes('facebook employee')
      )
    }
    if (c === 'amazon') return q.includes('amazon') || q.includes('অ্যামাজন')
    if (c === 'apple') return q.includes('apple') || q.includes('অ্যাপল')
    return q.includes(c)
  })

  const mentionsAppstick = q.includes('appstick')

  if (matched.length === 0) return null

  // Check if user is asking about work experience / employment at this company
  const isWorkInquiry =
    q.includes('work') ||
    q.includes('job') ||
    q.includes('experience') ||
    q.includes('employed') ||
    q.includes('intern') ||
    q.includes('history') ||
    q.includes('role') ||
    q.includes('career') ||
    q.includes('at google') ||
    q.includes('at microsoft') ||
    q.includes('or microsoft') ||
    q.includes('and microsoft') ||
    q.includes('or google') ||
    q.includes('and google') ||
    q.includes('চাকরি') ||
    q.includes('অভিজ্ঞতা') ||
    q.includes('কাজ করেছেন') ||
    q.includes('কাজ করেছে') ||
    q.includes('কাজ করছেন') ||
    q.includes('কাজ') ||
    q.startsWith('does shakib have') ||
    q.startsWith('did shakib') ||
    q.startsWith('has shakib') ||
    q.includes('shakib working at')

  if (!isWorkInquiry) return null

  const formatName = (c: string) => {
    if (c === 'google') return 'Google'
    if (c === 'microsoft') return 'Microsoft'
    if (c === 'meta' || c === 'facebook company') return 'Meta'
    if (c === 'amazon') return 'Amazon'
    if (c === 'apple') return 'Apple'
    if (c === 'netflix') return 'Netflix'
    if (c === 'tesla') return 'Tesla'
    if (c === 'uber') return 'Uber'
    if (c === 'twitter') return 'Twitter (X)'
    if (c === 'oracle') return 'Oracle'
    if (c === 'ibm') return 'IBM'
    if (c === 'intel') return 'Intel'
    if (c === 'cisco') return 'Cisco'
    if (c === 'brain station') return 'Brain Station 23'
    if (c === 'kaz software') return 'Kaz Software'
    return c.charAt(0).toUpperCase() + c.slice(1)
  }

  const formatNameBn = (c: string) => {
    if (c === 'google') return 'গুগল (Google)'
    if (c === 'microsoft') return 'মাইক্রোসফট (Microsoft)'
    if (c === 'meta' || c === 'facebook company') return 'মেটা (Meta)'
    if (c === 'amazon') return 'অ্যামাজন (Amazon)'
    if (c === 'apple') return 'অ্যাপল (Apple)'
    return formatName(c)
  }

  const companyNamesEn = matched.map(formatName)
  const companyNamesBn = matched.map(formatNameBn)

  const isConjAnd = q.includes('and') || q.includes('এবং') || q.includes('ও')
  const conjEn = isConjAnd ? 'and' : 'or'
  const conjBn = isConjAnd ? 'এবং' : 'বা'

  const formattedCompaniesEn =
    companyNamesEn.length === 1
      ? companyNamesEn[0]
      : companyNamesEn.length === 2
        ? `${companyNamesEn[0]} ${conjEn} ${companyNamesEn[1]}`
        : `${companyNamesEn.slice(0, -1).join(', ')}, ${conjEn} ${companyNamesEn[companyNamesEn.length - 1]}`

  const formattedCompaniesBn =
    companyNamesBn.length === 1
      ? companyNamesBn[0]
      : companyNamesBn.length === 2
        ? `${companyNamesBn[0]} ${conjBn} ${companyNamesBn[1]}`
        : `${companyNamesBn.slice(0, -1).join(', ')}, ${conjBn} ${companyNamesBn[companyNamesBn.length - 1]}`

  const expPeriod = portfolioData.experience[0]?.period || 'Feb 2026 – Mar 2026'

  if (isBangla) {
    let reply = ''
    if (mentionsAppstick) {
      reply = `অ্যাপস্টিকের (Appstick) ক্ষেত্রে হ্যাঁ, তবে ${formattedCompaniesBn}-এর ক্ষেত্রে না। মোঃ নাজমুল শাকিব অ্যাপস্টিক টেক ফার্মে ব্যাকএন্ড ডেভেলপার ইন্টার্ন হিসেবে কাজ করেছেন (${expPeriod}, খুলনা), তবে ${formattedCompaniesBn}-এ তাঁর কোনো কাজের অভিজ্ঞতা নেই।`
    } else {
      reply = `না, মোঃ নাজমুল শাকিবের ${formattedCompaniesBn}-এ কাজ করার পূর্ব অভিজ্ঞতা নেই। তাঁর ভেরিফায়েড কাজের অভিজ্ঞতা হলো অ্যাপস্টিক টেক ফার্মে (Appstick Tech Firm) ব্যাকএন্ড ডেভেলপার ইন্টার্ন হিসেবে (${expPeriod}, খুলনা)।`
    }
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: [
        'অ্যাপস্টিক ইন্টার্নশিপ সম্পর্কে বলো',
        'শাকিবের সেরা প্রজেক্টগুলো কি?',
        'তাঁর টেকনোলজি স্ট্যাক কি?',
        'রেজুমে ডাউনলোড',
      ],
    }
  }

  let reply = ''
  if (mentionsAppstick) {
    reply = `Yes for Appstick, but no for ${formattedCompaniesEn}. Shakib completed a verified internship as a Backend Developer Intern at Appstick Tech Firm (${expPeriod} in Khulna), but he does not have experience working at ${formattedCompaniesEn}.`
  } else {
    reply = `No, Shakib does not have experience working at ${formattedCompaniesEn}. His verified professional experience is as a Backend Developer Intern at Appstick Tech Firm (${expPeriod} in Khulna).`
  }

  if (constraints.exactSentences) {
    reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
  }

  return {
    reply,
    cards: [],
    suggestedQueries: [
      'Tell me about his Appstick internship',
      'Show his best projects',
      'What technologies does he use?',
      'Download his resume',
    ],
  }
}

/**
 * Intent 2: Project Comparisons (Side-by-side comparison, honoring bullet constraints)
 */
function handleProjectComparison(
  query: string,
  isBangla: boolean,
  constraints: ParsedConstraints
): { reply: string; cards: AiActionCard[]; suggestedQueries: string[] } | null {
  const q = query.toLowerCase()

  // Check which projects are mentioned
  const mentionsSecurex = q.includes('securex')
  const mentionsSmartCampus =
    q.includes('smart campus') || q.includes('campus system') || q.includes('cse4204')
  const mentionsPaymentReminder =
    q.includes('cv payment') || q.includes('payment reminder') || q.includes('n8n')
  const mentionsNurFoodes = q.includes('nur foodes') || q.includes('food software')
  const mentionsResumate = q.includes('resumate')
  const mentionsLogistica = q.includes('logistica')

  // Count how many projects are in the query
  const projectMentions = [
    mentionsSecurex,
    mentionsSmartCampus,
    mentionsPaymentReminder,
    mentionsNurFoodes,
    mentionsResumate,
    mentionsLogistica,
  ].filter(Boolean).length

  // Project comparison strictly requires at least two mentioned projects
  if (projectMentions < 2) {
    return null
  }

  // Specific Comparison: Securex vs AI Smart Campus System
  if (mentionsSecurex && (mentionsSmartCampus || (!mentionsPaymentReminder && !mentionsNurFoodes))) {
    if (isBangla) {
      const bulletsBn = [
        '• **ডোমেন ও উদ্দেশ্য**: Securex হলো একটি পূর্ণাঙ্গ সিসিটিভি ও সিকিউরিটি সার্ভিস বুকিং ম্যানেজমেন্ট প্ল্যাটফর্ম, অন্যদিকে AI Smart Campus System হলো বিশ্ববিদ্যালয় অ্যাকাডেমিক প্রশাসন ও শিক্ষার্থী সহায়তার প্ল্যাটফর্ম।',
        '• **সফটওয়্যার আর্কিটেকচার**: Securex লারাভেল এমভিসি, ব্লেড ভিউ এবং মাইএসকিউএল মনোলিথ দিয়ে তৈরি, আর AI Smart Campus System-এ লারাভেল ১২ রেস্ট এপিআই ব্যাকএন্ড এবং রিঅ্যাক্ট/ভাইট ফ্রন্টএন্ড ডিকাপলড আর্কিটেকচার ব্যবহার করা হয়েছে।',
        '• **মূল ফিচার ও এপিআই**: Securex-এ কনফ্লিক্ট-অ্যাওয়ার টাইম-স্লট বুকিং, গুগল ওঅথ ২.০ এবং ডায়নামিক পিডিএফ ইনভয়েসিং রয়েছে, যেখানে AI Smart Campus System-এ গুগল জেমিনাই ও ওপেনএআই এআই এপিআই এবং স্যাঙ্কটাম অথেন্টিকেশন ব্যবহৃত হয়েছে।',
        '• **শাকিবের ভূমিকা ও অবদান**: Securex-এ শাকিব এককভাবে সম্পূর্ণ ফুল-স্ট্যাক সিস্টেম তৈরি করেন ও Zenodo-তে টেকনিক্যাল পেপার প্রকাশ করেন; অপরদিকে AI Smart Campus System-এ তিনি টিম লিডার ও ডেটাবেস লিড হিসেবে ৩এনএফ স্কিমা প্রণয়ন করেন।',
      ]

      const bulletCount = constraints.exactBullets ?? 4
      const formattedBullets = enforceExactBulletCount(bulletsBn, bulletCount)
      const reply = `**Securex এবং AI Smart Campus System-এর প্রযুক্তিগত তুলনা (${bulletCount}টি পয়েন্টে):**\n\n${formattedBullets}`

      return {
        reply,
        cards: [], // Avoid favoring one single project card during comparison
        suggestedQueries: [
          'Securex-এর লাইভ লিংক বা কোড দেখাও',
          'AI Smart Campus System-এর লাইভ লিংক',
          'লারাভেল ও নেক্সট.জেএস-এর মধ্যে কোনটা ভালো?',
          'হায়ার করতে চাই',
        ],
      }
    }

    const bulletsEn = [
      '• **Domain & Purpose**: Securex is an end-to-end commercial CCTV and security service booking platform, whereas AI Smart Campus System is a unified academic management platform engineered for university administration and students.',
      '• **Architecture & Tech Stack**: Securex is built with full-stack Laravel MVC, Blade, and MySQL, whereas AI Smart Campus System implements a decoupled architecture featuring a Laravel 12 REST API backend and a React/Vite frontend.',
      '• **Core Capabilities & Integrations**: Securex provides conflict-aware time-slot booking, Google OAuth 2.0, automated SMTP notifications, and dynamic PDF invoices, whereas AI Smart Campus System integrates Google Gemini & OpenAI APIs alongside Laravel Sanctum authentication.',
      '• **Shakib\'s Role & Impact**: On Securex, Shakib served as sole full-stack engineer and published an academic technical report on Zenodo (DOI: 10.5281/zenodo.21893082); on AI Smart Campus System, he served as Team Leader and Database Lead, designing the normalized 3NF MySQL schema.',
    ]

    const bulletCount = constraints.exactBullets ?? 4
    const formattedBullets = enforceExactBulletCount(bulletsEn, bulletCount)
    const reply = `**Comparison between Securex and AI Smart Campus System (${bulletCount} key bullet points):**\n\n${formattedBullets}`

    return {
      reply,
      cards: [],
      suggestedQueries: [
        'Show GitHub repo for Securex',
        'Show live demo of AI Smart Campus',
        'Which is better, Laravel or Next.js?',
        'How to hire Shakib?',
      ],
    }
  }

  // Generic two-project comparison fallback
  const pList = getProjectCardDataList()
  const p1 = pList[0]
  const p2 = pList[1]

  const replyEn = `• **${p1.title}**: Built with ${p1.technologies.slice(0, 3).join(', ')}. Focuses on ${p1.summary}\n• **${p2.title}**: Built with ${p2.technologies.slice(0, 3).join(', ')}. Focuses on ${p2.summary}`
  return {
    reply: replyEn,
    cards: [],
    suggestedQueries: ['Tell me more about Securex', 'Tell me about AI Smart Campus System', 'How to hire Shakib?'],
  }
}

/**
 * Intent 3: Technical Framework Comparisons (Laravel vs Next.js, etc.)
 * Provides in-depth architectural reasoning.
 */
function handleFrameworkComparison(
  query: string,
  isBangla: boolean,
  constraints: ParsedConstraints
): { reply: string; cards: AiActionCard[]; suggestedQueries: string[] } | null {
  const q = query.toLowerCase()

  const hasLaravel = q.includes('laravel') || q.includes('লারাবেল') || q.includes('লারাভেল')
  const hasNextOrReact =
    q.includes('next') || q.includes('react') || q.includes('নেক্সট') || q.includes('রিঅ্যাক্ট')

  const isComparison =
    q.includes('better') ||
    q.includes('vs') ||
    q.includes('versus') ||
    q.includes('compare') ||
    q.includes('comparison') ||
    q.includes('difference') ||
    q.includes('which') ||
    q.includes('or') ||
    q.includes('নাকি') ||
    q.includes('কোনটি') ||
    q.includes('পার্থক্য') ||
    q.includes('তুলনা')

  if (!hasLaravel || !hasNextOrReact || !isComparison) {
    return null
  }

  if (isBangla) {
    let reply = `কোনো ফ্রেমওয়ার্কই চূড়ান্তভাবে 'সেরা' নয়—সঠিক পছন্দটি নির্ভর করে আপনার প্রজেক্টের আর্কিটেকচারাল চাহিদার ওপর।\n\n- **Laravel** মূলত একটি শক্তিশালী পিএইচপি ব্যাকএন্ড ফ্রেমওয়ার্ক, যা এমভিসি (MVC) স্ট্রাকচার, রিলেশনাল ডেটাবেস হ্যান্ডলিং (Eloquent ORM), ব্যাকগ্রাউন্ড জবস এবং নিরাপদ RESTful API তৈরিতে অতুলনীয়।\n- **Next.js** হলো একটি আধুনিক রিঅ্যাক্ট ফ্রেমওয়ার্ক, যা সুপার-ফাস্ট ফ্রন্টএন্ড ইউজার ইন্টারফেস, সার্ভার-সাইড রেন্ডারিং (SSR), ডায়নামিক ইন্টারঅ্যাক্টিভিটি এবং উচ্চমানের এসইও (SEO)-এর জন্য আদর্শ (পাশাপাশি সার্ভারলেস এপিআই সুবিধা দেয়)।\n\nআপনার প্রজেক্টে যদি জটিল ডেটাবেস রিলেশন ও ব্যাকএন্ড বিজনেস লজিক প্রাধান্য পায়, তবে লারাভেল সেরা; আর যদি ডায়নামিক রিঅ্যাক্টিভ ইউআই ও গতিশীল ক্লায়েন্ট অভিজ্ঞতা দরকার হয়, তবে নেক্সট.জেএস সেরা। বাস্তবে নাজমুল শাকিব প্রায়শই উভয়কে একত্রে ডিকাপলড আর্কিটেকচারে ব্যবহার করেন (লারাভেল ব্যাকএন্ড এপিআই + নেক্সট.জেএস ফ্রন্টএন্ড)।`

    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
    }

    return {
      reply,
      cards: [],
      suggestedQueries: [
        'শাকিবের লারাভেল প্রজেক্টগুলো দেখাও',
        'নেক্সট.জেএস প্রজেক্টগুলো দেখাও',
        'তাঁর টেক স্ট্যাক কি কি?',
        'হায়ার করার উপায়',
      ],
    }
  }

  let reply = `Neither framework is universally 'better'—the optimal choice depends on your project's architectural requirements. Laravel is primarily a robust PHP backend framework specializing in MVC architecture, complex relational database modeling with Eloquent ORM, background queues, and secure RESTful APIs. In contrast, Next.js is a React full-stack framework specializing in high-performance frontend interfaces, server-side rendering (SSR), dynamic client interactivity, and SEO, while also offering serverless API capabilities. If your application centers on complex database transactions and enterprise business logic, Laravel is ideal; if your priority is a fast, reactive user interface and dynamic SEO, Next.js is preferred. In production, Shakib often leverages both together by utilizing Laravel as the dedicated REST API backend and Next.js as the interactive frontend.`

  if (constraints.exactSentences) {
    reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
  }

  return {
    reply,
    cards: [],
    suggestedQueries: [
      'Show projects built with Laravel',
      'Show projects built with Next.js',
      'Can Shakib build a complete e-commerce website?',
      'How to hire Shakib?',
    ],
  }
}

/**
 * Intent 4: Capability & Yes/No Questions ("Can Shakib build...", "Is he able to...", etc.)
 * Strictly starts with "Yes" or "No".
 */
function handleCapabilityInquiry(
  query: string,
  isBangla: boolean,
  constraints: ParsedConstraints
): { reply: string; cards: AiActionCard[]; suggestedQueries: string[] } | null {
  const q = query.toLowerCase()

  const isAbilityQuestion =
    q.startsWith('can shakib') ||
    q.startsWith('can he') ||
    q.startsWith('is shakib able') ||
    q.startsWith('could shakib') ||
    q.startsWith('does shakib build') ||
    q.startsWith('does shakib know') ||
    q.startsWith('does shakib use') ||
    q.startsWith('does shakib have') ||
    q.startsWith('does he know') ||
    q.startsWith('does he use') ||
    q.startsWith('does he have') ||
    q.startsWith('will shakib') ||
    q.includes('can you build') ||
    q.includes('able to build') ||
    q.includes('বানাতে পারবে') ||
    q.includes('করতে পারবে') ||
    q.includes('তৈরি করতে পারবে') ||
    q.includes('কি পারে') ||
    q.includes('কি জানে')

  // Case 4-Docker: Docker Containerization
  const isDocker = q.includes('docker') || q.includes('ডকার')
  if (isDocker && (isAbilityQuestion || q.includes('use') || q.includes('know') || q.includes('ব্যবহার'))) {
    if (isBangla) {
      let reply = `হ্যাঁ, নাজমুল শাকিব ডকার (Docker) ব্যবহারে পারদর্শী। তিনি কনটেইনারাইজড পরিবেশে অটোমেশন পাইপলাইন পরিচালনা করেন, যেমন তাঁর CV Payment Reminder Automation প্রজেক্টে তিনি ডকার কনটেইনার ও পারসিস্টেন্ট ভলিউম স্টোরেজে সেলফ-হোস্টেড n8n ইনস্ট্যান্স সফলভাবে পরিচালনা করেছেন।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['CV Payment Reminder সম্পর্কে বলো', 'অন্যান্য টেকনোলজি স্ট্যাক', 'হায়ার করার উপায়'],
      }
    }
    let reply = `Yes, Shakib knows and actively uses Docker. He leverages Docker containerization for self-hosted production workflows, such as running containerized n8n instances with persistent volume storage in his CV Payment Reminder Automation pipeline.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['Tell me about CV Payment Reminder Automation', 'What other tools does he use?', 'How to hire Shakib?'],
    }
  }

  const isWeb =
    q.includes('web') || q.includes('website') || q.includes('web app') || q.includes('ওয়েব')

  const isEcommerce =
    q.includes('e-commerce') ||
    q.includes('ecommerce') ||
    q.includes('online shop') ||
    q.includes('online store') ||
    q.includes('ই-কমার্স') ||
    q.includes('দোকান')

  const isPosOrErp =
    /\bpos\b/i.test(q) ||
    q.includes('restaurant') ||
    q.includes('inventory system') ||
    q.includes('রেস্টুরেন্ট') ||
    q.includes('ইনভেন্টরি')

  const isMobileApp =
    q.includes('mobile app') ||
    q.includes('android app') ||
    q.includes('ios app') ||
    q.includes('flutter') ||
    q.includes('react native') ||
    q.includes('মোবাইল অ্যাপ') ||
    (q.includes('mobile') && !q.includes('phone') && !q.includes('number') && !q.includes('call'))

  // Case 4-Multi: Both Web Apps and Mobile Apps asked
  if (isWeb && isMobileApp && isAbilityQuestion) {
    if (isBangla) {
      let reply = `ওয়েব অ্যাপ্লিকেশনের ক্ষেত্রে হ্যাঁ, কিন্তু নেটিভ মোবাইল অ্যাপের ক্ষেত্রে না। নাজমুল শাকিব লারাভেল, নেক্সট.জেএস, রিঅ্যাক্ট এবং মাইএসকিউএল দিয়ে পূর্ণাঙ্গ রেসপনসিভ ওয়েব অ্যাপ্লিকেশন তৈরিতে পারদর্শী, তবে তিনি নেটিভ অ্যান্ড্রয়েড বা আইওএস মোবাইল অ্যাপ (যেমন ফ্লাটার বা সুইফট) তৈরি করেন না।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['তাঁর ওয়েব প্রজেক্টগুলো দেখাও', 'টেকনোলজি স্ট্যাক কি?', 'যোগাযোগের মাধ্যম'],
      }
    }

    let reply = `Yes for web applications, but no for native mobile apps. Shakib specializes in building full-stack web applications with Laravel, Next.js, React, and MySQL, which are fully responsive on mobile devices, but he does not develop native Android or iOS apps (such as with Flutter or React Native).`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['Show his web projects', 'What is his tech stack?', 'How to contact him?'],
    }
  }

  // Case 4a: E-commerce Website (grounded in verified skills and Nur Foodes)
  if (isEcommerce) {
    if (isBangla) {
      let reply = `হ্যাঁ, নাজমুল শাকিব কাস্টম ই-কমার্স ও রিটেইল ম্যানেজমেন্ট ওয়েব অ্যাপ্লিকেশন তৈরি করতে সক্ষম। তিনি লারাভেল ব্যাকএন্ড ও মাইএসকিউএল ডেটাবেস দিয়ে প্রোডাক্ট ক্যাটালগ, কার্ট ওয়ার্কফ্লো ও অর্ডার ম্যানেজমেন্ট এবং নেক্সট.জেএস/রিঅ্যাক্ট দিয়ে রেসপনসিভ ইউজার ইন্টারফেস তৈরি করেন। রিটেইল অপারেশনের বাস্তব উদাহরণ হিসেবে তিনি 'Nur Foodes' পিওএস ও ইআরপি সিস্টেম সফলভাবে তৈরি করেছেন।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: [
          'Nur Foodes POS প্রজেক্ট দেখাও',
          'শাকিবকে হায়ার করার পরবর্তী ধাপ কি?',
          'যোগাযোগের মাধ্যম',
          'রেজুমে ডাউনলোড',
        ],
      }
    }

    let reply = `Yes, Shakib can build custom e-commerce and retail management web applications. He utilizes Laravel and normalized MySQL databases for backend architectures (catalog management, cart workflows, order statuses, and role-based permissions) and Next.js/React for responsive interfaces. For retail workflows, he engineered 'Nur Foodes', a POS and ERP application featuring catalog ordering, split payments, and automated invoice delivery.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }

    return {
      reply,
      cards: [],
      suggestedQueries: [
        'Tell me about Nur Foodes POS & ERP',
        'I want to hire Shakib. What should I do next?',
        'What backend technologies does he use?',
        'Download his resume',
      ],
    }
  }

  // Case 4b: Mobile Apps (Native Android/iOS/Flutter) -> Answer "No" factually
  if (isMobileApp && isAbilityQuestion) {
    if (isBangla) {
      let reply = `না, নাজমুল শাকিব নেটিভ মোবাইল অ্যাপ (যেমন ফ্লাটার বা সুইফট) ডেভেলপমেন্টে বিশেষজ্ঞ নন। তাঁর মূল বিশেষত্ব হলো পূর্ণাঙ্গ ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন (Laravel, Next.js, React), ডেটাবেস ইঞ্জিনিয়ারিং (MySQL) এবং অটোমেশন পাইপলাইন (n8n, Docker)। তবে তিনি এমন আধুনিক রেসপনসিভ ওয়েব অ্যাপ ও পিডব্লিউএ (PWA) তৈরি করেন যা মোবাইল ডিভাইসে চমৎকার কাজ করে।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['তাঁর ওয়েব প্রজেক্টগুলো দেখাও', 'টেকনোলজি স্ট্যাক কি?', 'যোগাযোগের মাধ্যম'],
      }
    }

    let reply = `No, Shakib does not specialize in native mobile application development (such as Flutter or React Native). His verified expertise is centered on full-stack web engineering (Laravel, Next.js, React), normalized MySQL relational databases, and n8n backend workflow automations. However, all of his web platforms are designed to be mobile-first and fully responsive across smartphones and tablets.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }

    return {
      reply,
      cards: [],
      suggestedQueries: ['Show his web projects', 'What is his tech stack?', 'How to contact him?'],
    }
  }

  // Case 4c: POS / Inventory / Management systems
  if (isPosOrErp && isAbilityQuestion) {
    if (isBangla) {
      let reply = `হ্যাঁ, নাজমুল শাকিব রেস্টুরেন্ট পিওএস ও ইনভেন্টরি ম্যানেজমেন্ট সিস্টেম তৈরিতে অভিজ্ঞ। তিনি ইতোমধ্যে 'Nur Foodes' নামক একটি টাচ-অপ্টিমাইজড পিওএস ও ইআরপি সিস্টেম সফলভাবে তৈরি করেছেন, যাতে স্প্লিট পেমেন্ট, সৌদি ১৫% ভ্যাট এবং ZATCA কিউআর ইনভয়েসিং সুবিধা রয়েছে।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      const proj = getProjectCardDataList().find((p) => p.title.toLowerCase().includes('nur foodes'))
      return {
        reply,
        cards: proj ? [{ type: 'project-detail', data: proj }] : [],
        suggestedQueries: ['Nur Foodes-এর লাইভ ডেমো দেখাও', 'হায়ার করার উপায়', 'রেজুমে ডাউনলোড'],
      }
    }

    let reply = `Yes, Shakib has direct experience building point-of-sale (POS) and inventory management systems. He engineered 'Nur Foodes', a touch-optimized restaurant POS and store ERP featuring instant cashier ordering, split payments, Saudi 15% VAT calculation, and ZATCA Phase-2 QR invoicing.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    const proj = getProjectCardDataList().find((p) => p.title.toLowerCase().includes('nur foodes'))
    return {
      reply,
      cards: proj ? [{ type: 'project-detail', data: proj }] : [],
      suggestedQueries: ['Show Nur Foodes live demo', 'How to hire Shakib?', 'Download resume'],
    }
  }

  // Case 4d: Full-Stack (Both Frontend and Backend)
  const isFullstack =
    (q.includes('frontend') || q.includes('front-end') || q.includes('ফ্রন্টএন্ড')) &&
    (q.includes('backend') || q.includes('back-end') || q.includes('ব্যাকএন্ড'))

  if (isFullstack && isAbilityQuestion) {
    if (isBangla) {
      let reply = `হ্যাঁ, নাজমুল শাকিব ফুল-স্ট্যাক ডেভেলপার হিসেবে ফ্রন্টএন্ড এবং ব্যাকএন্ড উভয় অংশেই কাজ করেন। ব্যাকএন্ডে তিনি Laravel 12 (PHP) এবং MySQL (3NF) ব্যবহার করেন, আর ফ্রন্টএন্ডে Next.js 16, React 19, TypeScript এবং Tailwind CSS নিয়ে কাজ করেন।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['তাঁর ওয়েব প্রজেক্টগুলো দেখাও', 'টেকনোলজি স্ট্যাক কি?', 'যোগাযোগের মাধ্যম'],
      }
    }

    let reply = `Yes, Shakib handles both frontend and backend development as a full-stack engineer. For backend architectures, he specializes in Laravel (PHP) and normalized MySQL databases, while for frontend interfaces, he builds with Next.js 16, React 19, TypeScript, and Tailwind CSS.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['Show his full-stack projects', 'What is his tech stack?', 'How to contact him?'],
    }
  }

  // Case 4e: Payment Workflows & Gateways (Honest, no unverified claims)
  const isPayment =
    q.includes('payment') ||
    q.includes('payment gateway') ||
    q.includes('stripe') ||
    q.includes('bkash') ||
    q.includes('nagad') ||
    q.includes('পেমেন্ট')

  if (isPayment && isAbilityQuestion) {
    if (isBangla) {
      let reply = `হ্যাঁ, নাজমুল শাকিব পেমেন্ট ওয়ার্কফ্লো এবং ইনভয়েসিং সিস্টেমে অভিজ্ঞ। তিনি CV Payment Reminder প্রজেক্টে n8n ও টেলিগ্রামের মাধ্যমে স্বয়ংক্রিয় পেমেন্ট ট্র্যাকিং এবং Nur Foodes-এ স্প্লিট পেমেন্ট ও ZATCA QR ইনভয়েসিং বাস্তবায়ন করেছেন। বাণিজ্যিক পেমেন্ট গেটওয়ের জন্য তিনি লারাভেলের মাধ্যমে স্ট্যান্ডার্ড REST API ও সুরক্ষিত ওয়েবহুক ইন্টিগ্রেট করতে পারেন।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['CV Payment Reminder দেখাও', 'Nur Foodes POS দেখাও', 'যোগাযোগের মাধ্যম'],
      }
    }

    let reply = `Yes, Shakib can integrate payment workflows and billing features. He implemented automated payment reminder pipelines using n8n and Telegram in CV Payment Reminder, dynamic PDF invoices in Securex, and retail split payments with ZATCA Phase-2 QR invoicing in Nur Foodes. For standard payment processors, he integrates standard REST APIs and secure webhooks via Laravel.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['Tell me about CV Payment Reminder', 'Tell me about Nur Foodes POS', 'Contact Shakib'],
    }
  }

  // General capability question starting with Can/Does
  if (isAbilityQuestion && (q.includes('website') || q.includes('software') || q.includes('api') || q.includes('system'))) {
    if (isBangla) {
      let reply = `হ্যাঁ, নাজমুল শাকিব আপনার প্রয়োজনীয় কাস্টম ওয়েব অ্যাপ্লিকেশন বা সফটওয়্যার সিস্টেম ডেভেলপ করতে সক্ষম। তিনি লারাভেল ব্যাকএন্ড, ৩এনএফ মাইএসকিউএল ডেটাবেস, নেক্সট.জেএস/রিঅ্যাক্ট ফ্রন্টএন্ড এবং n8n অটোমেশন নিয়ে উচ্চমানের কাজ করেন।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['হায়ার করার উপায়', 'সেরা প্রজেক্টগুলো কি?', 'যোগাযোগের তথ্য'],
      }
    }

    let reply = `Yes, Shakib can build custom web applications, RESTful API backends, and database-driven software tailored to your requirements. He specializes in full-stack engineering with Laravel, Next.js, React, MySQL, and n8n automations.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['I want to hire Shakib. What should I do next?', 'Show his best projects', 'Contact Shakib'],
    }
  }

  return null
}

/**
 * Intent 5: Hiring & Actionable Next Steps
 * Provides verified contact details, clear steps, and rich cards.
 */
function handleHiringInquiry(
  query: string,
  isBangla: boolean,
  constraints: ParsedConstraints
): { reply: string; cards: AiActionCard[]; suggestedQueries: string[] } | null {
  const q = query.toLowerCase()
  const contact = getContactDirectData()

  // Salary / Rates / Pricing grounded response (Never fabricate; acknowledge unavailable)
  const isSalaryOrRate =
    q.includes('salary') ||
    q.includes('rate') ||
    q.includes('pricing') ||
    q.includes('cost') ||
    q.includes('how much') ||
    q.includes('charge') ||
    q.includes('বেতন') ||
    q.includes('খরচ') ||
    q.includes('পারিশ্রমিক')

  if (isSalaryOrRate) {
    if (isBangla) {
      let reply = `মোঃ নাজমুল শাকিবের নির্দিষ্ট বেতন বা প্রজেক্ট রেট পোর্টফোলিওতে উন্মুক্তভাবে নির্ধারিত নেই। আপনার প্রজেক্ট স্কোপ, বাজেট বা চাকরির অফার নিয়ে সরাসরি তাঁর সাথে ইমেইলে ([${portfolioData.email}](mailto:${portfolioData.email})) অথবা হোয়াটসঅ্যাপে ([${portfolioData.phone}](tel:${portfolioData.phone})) আলোচনা করতে পারেন। তিনি ফুল-টাইম রোল ও কনট্রাক্ট প্রজেক্টের জন্য উন্মুক্ত।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [{ type: 'contact-direct', data: contact }],
        suggestedQueries: ['যোগাযোগের মাধ্যম', 'সেরা প্রজেক্ট দেখাও', 'রেজুমে ডাউনলোড'],
      }
    }
    let reply = `Shakib's specific salary expectations and project pricing are not publicly listed in this portfolio. You can discuss compensation, project scope, or employment terms directly by emailing [${portfolioData.email}](mailto:${portfolioData.email}) or messaging via WhatsApp at [${portfolioData.phone}](tel:${portfolioData.phone}). He is currently available for full-time engineering roles and remote contracts.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [{ type: 'contact-direct', data: contact }],
      suggestedQueries: ['How to contact him?', 'Show his best projects', 'Download his resume'],
    }
  }

  const isHireIntent =
    q.includes('hire') ||
    q.includes('hiring') ||
    q.includes('what should i do next') ||
    q.includes('what to do next') ||
    q.includes('next step') ||
    q.includes('how to start') ||
    q.includes('work with shakib') ||
    q.includes('start a project') ||
    q.includes('হায়ার') ||
    q.includes('কাজে নিতে চাই') ||
    q.includes('পরবর্তী পদক্ষেপ') ||
    q.includes('পরবর্তী ধাপ')

  if (!isHireIntent) return null

  if (isBangla) {
    let reply = `নাজমুল শাকিবকে হায়ার করতে বা প্রজেক্ট শুরু করতে নিচের ৩টি সহজ পদক্ষেপ গ্রহণ করতে পারেন:

1. **সরাসরি যোগাযোগ**: আপনার প্রজেক্টের বিস্তারিত বা কাজের বিবরণ লিখে সরাসরি ইমেইল ([${portfolioData.email}](mailto:${portfolioData.email})) অথবা হোয়াটসঅ্যাপে ([${portfolioData.phone}](tel:${portfolioData.phone})) মেসেজ পাঠান।
2. **ডিসকাশন ও কনসালটেশন**: সিস্টেম আর্কিটেকচার, ডেলিভারি টাইমলাইন এবং প্রয়োজনীয় ফিচার নিয়ে একটি প্রাথমিক মিটিং বা টেকনিক্যাল ডিসকাশন করুন।
3. **প্রপোজাল ও প্রজেক্ট শুরু**: শাকিব প্রজেক্টের স্পষ্ট রোডম্যাপ ও বাজেট এস্টিমেট প্রদান করবেন এবং কাজ শুরু হবে।

নিচের হায়ার ইনকোয়ারি কার্ড অথবা সরাসরি যোগাযোগ কার্ড ব্যবহার করতে পারেন:`

    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
    }

    return {
      reply,
      cards: [
        { type: 'hire-inquiry' },
        { type: 'contact-direct', data: contact },
      ],
      suggestedQueries: [
        'নাজমুল শাকিবের রেজুমে ডাউনলোড',
        'তাঁর সেরা প্রজেক্টগুলো দেখাও',
        'হোয়াটসঅ্যাপ নাম্বার দাও',
      ],
    }
  }

  let reply = `To hire Shakib or initiate a project collaboration, here are your actionable next steps:

1. **Initial Outreach**: Send an email to [${portfolioData.email}](mailto:${portfolioData.email}) or message directly on WhatsApp at [${portfolioData.phone}](tel:${portfolioData.phone}) with your project scope, requirements, or role description.
2. **Discovery & Discussion**: Schedule an introductory technical consultation to align on system architecture, milestones, and timelines.
3. **Proposal & Kickoff**: Shakib will review the specifications, provide an architectural implementation plan and timeline, and begin development.

You can also submit your inquiry or reach out directly using the cards below:`

  if (constraints.exactSentences) {
    reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
  }

  return {
    reply,
    cards: [
      { type: 'hire-inquiry' },
      { type: 'contact-direct', data: contact },
    ],
    suggestedQueries: [
      'Download his verified resume',
      'Show his best projects',
      'What technologies does he use?',
    ],
  }
}

/**
 * Intent 6: Work Experience & Internship (Honoring sentence constraints)
 */
function handleExperienceInquiry(
  query: string,
  isBangla: boolean,
  constraints: ParsedConstraints
): { reply: string; cards: AiActionCard[]; suggestedQueries: string[] } | null {
  const q = query.toLowerCase()

  const isExpInquiry =
    q.includes('experience') ||
    q.includes('internship') ||
    q.includes('appstick') ||
    q.includes('work history') ||
    q.includes('past job') ||
    q.includes('career') ||
    q.includes('অভিজ্ঞতা') ||
    q.includes('ইন্টার্নশিপ') ||
    q.includes('কাজের অভিজ্ঞতা')

  if (!isExpInquiry) return null

  // Guard: If the query is specifically asking about technology skills (e.g. React, Angular, Laravel, Next.js)
  // and NOT asking about Appstick or his internship/job/workplace, let technology inquiry handle it.
  const isTechSpecific =
    q.includes('react') ||
    q.includes('angular') ||
    q.includes('vue') ||
    q.includes('django') ||
    q.includes('spring') ||
    q.includes('java') ||
    q.includes('python') ||
    q.includes('laravel') ||
    q.includes('next.js') ||
    q.includes('nextjs') ||
    q.includes('node') ||
    q.includes('php') ||
    q.includes('docker') ||
    q.includes('n8n') ||
    q.includes('mysql') ||
    q.includes('sql')

  const isCompanyOrJobSpecific =
    q.includes('intern') ||
    q.includes('appstick') ||
    q.includes('job') ||
    q.includes('work history') ||
    q.includes('company') ||
    q.includes('career') ||
    q.includes('past role') ||
    q.includes('employer') ||
    q.includes('firm') ||
    q.includes('ইন্টার্ন') ||
    q.includes('চাকরি') ||
    q.includes('কোম্পানি')

  if (isTechSpecific && !isCompanyOrJobSpecific) {
    return null
  }

  const resume = getResumeCardData()
  const expPeriod = portfolioData.experience[0]?.period || 'Feb 2026 – Mar 2026'

  // Detailed breakdown requested
  if (constraints.isDetailed) {
    if (isBangla) {
      return {
        reply: `### **অ্যাপস্টিক টেক ফার্মে ইন্টার্নশিপ অভিজ্ঞতা**\n\nমোঃ নাজমুল শাকিব **অ্যাপস্টিক টেক ফার্মে (Appstick Tech Firm)** ব্যাকএন্ড ডেভেলপার ইন্টার্ন হিসেবে কাজ করেছেন (${expPeriod}, খুলনা)।\n\n**মূল দায়িত্বসমূহ:**\n- **লারাভেল ও পিএইচপি ব্যাকএন্ড**: লারাভেল এমভিসি স্ট্রাকচার ও রিইউজেবল বিজনেস লজিক বাস্তবায়ন।\n- **ডেটাবেস ইন্টিগ্রিটি**: মাইএসকিউএল রিলেশনাল স্কিমা তৈরি ও ৩এনএফ ডেটা ইন্টিগ্রিটি নিশ্চিতকরণ।\n- **রেস্ট এপিআই ও সিকিউরিটি**: স্যাঙ্কটাম অথেন্টিকেশন ও সুরক্ষিত এপিআই এন্ডপয়েন্ট তৈরি।\n- **Logistica প্ল্যাটফর্ম**: সাপ্লাই চেইন ও শিপমেন্ট ট্র্যাকিং ফিচার বাস্তবায়নে অবদান।\n- **টিম কোলাবোরেশন**: এজাইল স্প্রিন্টে গিট ও গিটহাব ব্যবহার করে কোড রিভিউ সম্পন্ন।`,
        cards: [{ type: 'resume-card', data: resume }],
        suggestedQueries: ['Logistica প্রজেক্ট সম্পর্কে বলো', 'লারাভেল স্কিল কি কি?', 'রেজুমে ডাউনলোড'],
      }
    }
    return {
      reply: `### **Professional Experience at Appstick Tech Firm**\n\nMd. Nazmus Shakib served as a **Backend Developer Intern at Appstick Tech Firm** (${expPeriod}, Khulna).\n\n**Key Responsibilities & Impact:**\n- **Laravel & PHP Backend**: Built clean MVC application logic and modular service layers.\n- **Database Architecture**: Designed normalized 3NF MySQL schemas and ensured relational data integrity.\n- **Secure APIs**: Created structured RESTful endpoints with Laravel Sanctum authentication.\n- **Logistica Project**: Developed backend consignment tracking and status workflow features.\n- **Agile Collaboration**: Worked in team sprints using Git, GitHub branching, and code reviews.`,
      cards: [{ type: 'resume-card', data: resume }],
      suggestedQueries: ['Tell me about Logistica', 'What backend skills does he have?', 'Download his resume'],
    }
  }

  // Exact 2 sentences explicitly requested (as in regression test 6)
  if (constraints.exactSentences === 2) {
    if (isBangla) {
      const sentence1 =
        `মোঃ নাজমুল শাকিব অ্যাপস্টিক টেক ফার্মে (Appstick Tech Firm) ব্যাকএন্ড ডেভেলপার ইন্টার্ন হিসেবে দায়িত্ব পালন করেছেন (${expPeriod}, খুলনা), যেখানে তিনি লারাভেল এমভিসি, সিকিউর রেস্ট এপিআই এবং ৩এনএফ মাইএসকিউএল ডেটাবেস নিয়ে কাজ করেছেন।`
      const sentence2 =
        'তিনি এজাইল টিম স্প্রিন্টে Logistica সাপ্লাই চেইন প্ল্যাটফর্ম তৈরিতে সক্রিয়ভাবে কাজ করেছেন এবং ডেটাবেস ইন্টিগ্রিটি নিশ্চিত করেছেন।'
      return {
        reply: `${sentence1} ${sentence2}`,
        cards: [],
        suggestedQueries: ['অ্যাপস্টিক ইন্টার্নশিপের বিস্তারিত বলো', 'Logistica প্রজেক্ট দেখাও', 'রেজুমে ডাউনলোড'],
      }
    }

    const sentence1 =
      `Md. Nazmus Shakib served as a Backend Developer Intern at Appstick Tech Firm (${expPeriod} in Khulna), where he engineered Laravel MVC backend architectures, secure REST APIs with Sanctum, and normalized 3NF MySQL databases.`
    const sentence2 =
      'He contributed to the Logistica supply chain platform within an Agile development team, delivering reliable server-side workflows and ensuring relational data integrity.'
    return {
      reply: `${sentence1} ${sentence2}`,
      cards: [],
      suggestedQueries: ['Explain his internship in detail', 'Show Logistica project', 'Download his resume'],
    }
  }

  // Standard concise answer
  if (isBangla) {
    let reply = `মোঃ নাজমুল শাকিব **অ্যাপস্টিক টেক ফার্মে (Appstick Tech Firm)** ব্যাকএন্ড ডেভেলপার ইন্টার্ন হিসেবে দায়িত্ব পালন করেছেন (${expPeriod}, খুলনা)। সেখানে তিনি লারাভেল এমভিসি আর্কিটেকচার, সিকিউর রেস্ট এপিআই, ৩এনএফ মাইএসকিউএল ডেটাবেস এবং **Logistica** প্ল্যাটফর্মে এজাইল টিম স্প্রিন্টে কাজ করেছেন।`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['অ্যাপস্টিক ইন্টার্নশিপের বিস্তারিত বলো', 'Logistica প্রজেক্ট দেখাও', 'রেজুমে ডাউনলোড'],
    }
  }

  let reply = `Md. Nazmus Shakib worked as a **Backend Developer Intern at Appstick Tech Firm** (${expPeriod}, Khulna). He engineered Laravel MVC backend systems, developed secure REST APIs with Sanctum, optimized normalized MySQL databases, and contributed to the **Logistica** supply chain platform in an Agile team.`
  if (constraints.exactSentences) {
    reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
  }
  return {
    reply,
    cards: [],
    suggestedQueries: ['Explain his internship in detail', 'Show Logistica project', 'Download his resume'],
  }
}

/**
 * Intent 7: Specific Project Inquiries
 */
function handleSpecificProject(
  query: string,
  isBangla: boolean,
  constraints: ParsedConstraints,
  contextTopic: string | null
): { reply: string; cards: AiActionCard[]; suggestedQueries: string[] } | null {
  const q = query.toLowerCase()
  const projects = getProjectCardDataList()

  // 7a. CV Payment Reminder Automation (n8n, Google Sheets, Telegram)
  if (
    q.includes('cv payment') ||
    q.includes('payment reminder') ||
    q.includes('telegram bot') ||
    q.includes('telegram reminder') ||
    (q.includes('n8n') && !q.includes('stack') && !q.includes('skill')) ||
    contextTopic === 'cv-payment'
  ) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('cv payment'))!
    if (constraints.isDetailed) {
      if (isBangla) {
        return {
          reply: `### **CV Payment Reminder Automation — n8n আর্কিটেকচার**\n\nএটি ডকারে চালিত একটি শিডিউলড অটোমেশন পাইপলাইন যা ক্লায়েন্ট বিলিং লাইফসাইকেল স্বয়ংক্রিয় করে:\n\n1. **শিডিউল ট্রিগার**: নিয়মিত নির্দিষ্ট সময়ে পেমেন্ট অডিট শুরু করে।\n2. **গুগল শিট নোড**: ক্লায়েন্টের বকেয়া পেমেন্ট রেকর্ড স্বয়ংক্রিয়ভাবে পড়ে।\n3. **কন্ডিশনাল IF লজিক**: পেমেন্ট স্ট্যাটাস এবং বকেয়া দিন যাচাই করে ফিল্টার করে।\n4. **টেলিগ্রাম বট এপিআই**: নির্ধারিত ক্লায়েন্টকে ফরম্যাটেড মেসেজ পাঠায়।\n5. **রো আপডেট**: ডুপ্লিকেট নোটিফিকেশন বন্ধে গুগল শিটে কনফার্মেশন টাইমস্ট্যাম্প সংরক্ষণ করে।`,
          cards: [{ type: 'project-detail', data: proj }],
          suggestedQueries: ['Securex সম্পর্কে বলো', 'অন্যান্য প্রজেক্ট দেখাও', 'হায়ার করতে চাই'],
        }
      }
      return {
        reply: `### **CV Payment Reminder Automation — n8n Architecture**\n\nA containerized Docker workflow automating client billing reminders:\n\n1. **Schedule Trigger**: Periodically triggers automated payment check cycles.\n2. **Google Sheets Node**: Securely queries pending invoice rows via Google Cloud API.\n3. **Conditional IF Logic**: Evaluates overdue and unnotified client criteria.\n4. **Telegram Bot API**: Formats and dispatches instant reminder messages.\n5. **Row Update**: Writes confirmation timestamps back to Google Sheets to ensure idempotency.`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['Tell me about Securex', 'Show all projects', 'How to hire him?'],
      }
    }

    if (isBangla) {
      let reply = `**CV Payment Reminder Automation** হলো ডকারে চালিত একটি শিডিউলড n8n অটোমেশন ওয়ার্কফ্লো। এটি গুগল শিট থেকে ক্লায়েন্টের বকেয়া পেমেন্ট রেকর্ড পড়ে, শর্তানুযায়ী ফিল্টার করে টেলিগ্রাম বট এপিআই-এর মাধ্যমে নোটিফিকেশন পাঠায় এবং স্প্রেডশিটে কনফার্মেশন টাইমস্ট্যাম্প আপডেট করে।\n\n*ব্যবহৃত টেকনোলজি: n8n, Google Sheets, Telegram Bot API, Docker.*`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['CV Payment Reminder বিস্তারিত ব্যাখ্যা করো', 'Securex প্রজেক্ট দেখাও', 'অন্যান্য প্রজেক্ট'],
      }
    }

    let reply = `**CV Payment Reminder Automation** is a scheduled n8n automation pipeline running in Docker. It queries client billing records from Google Sheets, evaluates payment conditions with IF logic, dispatches automated Telegram reminders via Bot API, and updates spreadsheet records with confirmation timestamps.\n\n*Tech Stack: n8n, Google Sheets, Telegram Bot API, Docker.*`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Explain CV Payment Reminder in detail', 'Tell me about Securex', 'Show all projects'],
    }
  }

  // 7b. Securex
  if (
    q.includes('securex') ||
    q.includes('cctv') ||
    q.includes('security service') ||
    contextTopic === 'securex'
  ) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('securex'))!
    if (constraints.isDetailed) {
      if (isBangla) {
        return {
          reply: `### **Securex — সিসিটিভি ও সিকিউরিটি সার্ভিস প্ল্যাটফর্ম**\n\nলারাভেল এমভিসি এবং মাইএসকিউএল দিয়ে নির্মিত ফুল-স্ট্যাক প্ল্যাটফর্ম:\n- **অথেন্টিকেশন**: Google OAuth 2.0 ও ক্রেডেনশিয়াল লগইন (Sanctum)।\n- **স্মার্ট বুকিং লজিক**: টাইম-স্লট কনফ্লিক্ট ডিটেকশন ও বিকল্প স্লট সাজেশন।\n- **অটোমেশন**: বুকিং কনফার্মেশনের সাথে সাথে স্বয়ংক্রিয় এসএমটিপি ইমেইল পাঠানো।\n- **ইনভয়েস**: ডায়নামিক পিডিএফ ইনভয়েস জেনারেশন ও ডাউনলোড।\n- **রিসার্চ ও কোড**: Zenodo-তে গবেষণাপত্র প্রকাশিত এবং গিটহাবে ওপেন সোর্স।`,
          cards: [{ type: 'project-detail', data: proj }],
          suggestedQueries: ['AI Smart Campus সম্পর্কে বলো', 'অন্যান্য প্রজেক্ট দেখাও', 'গিটহাব কোড দেখাও'],
        }
      }
      return {
        reply: `### **Securex — Security Service Management Platform**\n\nA full-stack Laravel MVC and MySQL application:\n- **Authentication**: Google OAuth 2.0 and credential authentication via Sanctum.\n- **Conflict-Aware Booking**: Smart algorithm that detects overlapping time-slots and suggests alternatives.\n- **Automated Workflow**: Dispatches transactional SMTP emails with dynamic PDF invoices.\n- **RBAC**: Multi-tenant admin review dashboard and client self-service portal.\n- **GitHub**: [github.com/nazmusshakib878/Securex](https://github.com/nazmusshakib878/Securex)`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['Tell me about AI Smart Campus', 'Show all projects', 'How to hire him?'],
      }
    }

    if (isBangla) {
      let reply = `**Securex** হলো লারাভেল এমভিসি ও মাইএসকিউএল দিয়ে তৈরি একটি সিসিটিভি ও সিকিউরিটি সার্ভিস ম্যানেজমেন্ট সিস্টেম। এতে গুগল ওঅথ ২.০ (Google OAuth 2.0), কনফ্লিক্ট-অ্যাওয়ার বুকিং স্লট ম্যানেজমেন্ট, স্বয়ংক্রিয় এসএমটিপি ইমেইল এবং ডায়নামিক পিডিএফ ইনভয়েস তৈরির সুবিধা রয়েছে।\n\n*গিটহাব: [github.com/nazmusshakib878/Securex](https://github.com/nazmusshakib878/Securex)*`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['Securex বিস্তারিত ব্যাখ্যা করো', 'AI Smart Campus দেখাও', 'অন্যান্য প্রজেক্ট'],
      }
    }

    let reply = `**Securex** is a full-stack security service management platform built with Laravel MVC and MySQL. It features Google OAuth 2.0 and Sanctum authentication, conflict-aware time-slot booking logic, automated SMTP transactional emails, and dynamic PDF invoice generation.\n\n*GitHub: [github.com/nazmusshakib878/Securex](https://github.com/nazmusshakib878/Securex)*`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Explain Securex in detail', 'Tell me about AI Smart Campus System', 'Show all projects'],
    }
  }

  // 7c. AI Smart Campus System
  if (
    q.includes('smart campus') ||
    q.includes('campus system') ||
    q.includes('cse4204') ||
    contextTopic === 'smart-campus'
  ) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('smart campus'))!
    if (isBangla) {
      let reply = `**AI Smart Campus System** হলো একটি আধুনিক ক্যাম্পাস ম্যানেজমেন্ট প্ল্যাটফর্ম যেখানে নাজমুল শাকিব **টিম লিডার ও ডেটাবেস লিড** ছিলেন। এতে রিঅ্যাক্ট/ভাইট ফ্রন্টএন্ডের সাথে লারাভেল ১২ রেস্ট এপিআই, স্যাঙ্কটাম অথেন্টিকেশন, ৩এনএফ মাইএসকিউএল ডেটাবেস এবং জেমিনাই/ওপেনএআই এপিআই সমন্বিত রয়েছে।\n\n*লাইভ ডেমো: [ai-smart-campus-system-ce9i.onrender.com](https://ai-smart-campus-system-ce9i.onrender.com/)*`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['Securex প্রজেক্ট দেখাও', 'CV Payment Reminder দেখাও', 'অন্যান্য প্রজেক্ট'],
      }
    }

    let reply = `**AI Smart Campus System** is an academic management platform where Shakib served as **Team Leader & Database Lead**. It connects a React/Vite frontend with a secure Laravel 12 REST API, featuring Sanctum auth, normalized 3NF MySQL schema, and Google Gemini/OpenAI API integrations for student assistance.\n\n*Live Demo: [ai-smart-campus-system-ce9i.onrender.com](https://ai-smart-campus-system-ce9i.onrender.com/)*`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Tell me about Securex', 'Tell me about CV Payment Reminder', 'Show all projects'],
    }
  }

  // 7d. Logistica
  if (q.includes('logistica') || contextTopic === 'logistica') {
    const proj = projects.find((p) => p.title.toLowerCase().includes('logistica'))!
    if (isBangla) {
      return {
        reply: `**Logistica** হলো অ্যাপস্টিক টেক ফার্মে ইন্টার্নশিপের সময় লারাভেল এমভিসি ও মাইএসকিউএল দিয়ে তৈরি একটি সাপ্লাই চেইন ও লজিস্টিকস প্ল্যাটফর্ম। এটি পার্সেল ট্র্যাকিং, ইনভেন্টরি ম্যানেজমেন্ট এবং ডেলিভারি স্ট্যাটাস ওয়ার্কফ্লো পরিচালনা করে।`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['অ্যাপস্টিক ইন্টার্নশিপ সম্পর্কে বলো', 'অন্যান্য প্রজেক্ট দেখাও', 'যোগাযোগের তথ্য'],
      }
    }
    return {
      reply: `**Logistica** is an enterprise supply chain and logistics management application built with Laravel MVC and MySQL during Shakib's internship at Appstick Tech Firm. It handles consignment tracking, inventory management, status workflows, and relational data integrity.`,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Tell me about his internship', 'Show his best projects', 'Contact Shakib'],
    }
  }

  // 7e. Library Management
  if (q.includes('library') || q.includes('লাইব্রেরি') || contextTopic === 'library') {
    const proj = projects.find((p) => p.title.toLowerCase().includes('library'))!
    if (isBangla) {
      return {
        reply: `**Library Management System** হলো পিএইচপি ও মাইএসকিউএল (3NF নরম্যালাইজড) দিয়ে তৈরি একটি লাইব্রেরি ম্যানেজমেন্ট সিস্টেম। এটি বই ধার দেওয়া, ক্যাটালগ সার্চ, জরিমানা হিসাব এবং স্টুডেন্ট রোল ম্যানেজমেন্ট পরিচালনা করে।`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['অন্যান্য প্রজেক্ট দেখাও', 'ব্যাকএন্ড স্কিল কি কি?', 'হায়ার করতে চাই'],
      }
    }
    return {
      reply: `**Library Management System** is a database-driven application built with PHP, Laravel concepts, and MySQL strictly normalized to Third Normal Form (3NF). It manages book checkouts, member catalogs, fines, and student account permissions with server-side data validation.`,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Show all projects', 'What backend skills does he have?', 'How to hire Shakib?'],
    }
  }

  // 7f. Nur Foodes POS
  if (
    q.includes('nur foodes') ||
    q.includes('food software') ||
    /\bpos\b/i.test(q) ||
    q.includes('রেস্টুরেন্ট') ||
    contextTopic === 'nur-foodes'
  ) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('nur foodes'))!
    if (isBangla) {
      return {
        reply: `**Nur Foodes** হলো জাভাস্ক্রিপ্ট, এইচটিএমএল৫ ও সিএসএস৩ দিয়ে তৈরি একটি টাচ-অপ্টিমাইজড রেস্টুরেন্ট পিওএস ও ইআরপি সিস্টেম। এতে ক্যাশিয়ার অর্ডারিং, স্প্লিট পেমেন্ট, সৌদি ১৫% ভ্যাট ও ZATCA ফেজ-২ কিউআর ইনভয়েসিং এবং আরবি/ইংরেজি ইন্টারফেস রয়েছে।\n\n*লাইভ ডেমো: [food-software-sigma.vercel.app](https://food-software-sigma.vercel.app/)*`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['অন্যান্য প্রজেক্ট দেখাও', 'Securex প্রজেক্ট দেখাও', 'হায়ার করতে চাই'],
      }
    }
    return {
      reply: `**Nur Foodes** is a touch-optimized restaurant POS and store ERP built with modular JavaScript, HTML5, CSS3, and Vite. It features fast cashier order entry, split payments, Saudi 15% VAT calculation, ZATCA Phase-2 QR invoicing, and bilingual Arabic/English support.\n\n*Live Demo: [food-software-sigma.vercel.app](https://food-software-sigma.vercel.app/)*`,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Show all projects', 'Tell me about Securex', 'How to hire Shakib?'],
    }
  }

  // 7g. Resumate AI
  if (
    q.includes('resumate') ||
    q.includes('resume builder') ||
    q.includes('ai cv') ||
    contextTopic === 'resumate'
  ) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('resumate'))!
    if (isBangla) {
      return {
        reply: `**Resumate AI** হলো নেক্সট.জেএস ১৬, গুগল জেমিনাই এবং সুপাবেস দিয়ে তৈরি একটি এআই রেজুমে প্ল্যাটফর্ম। এটি বাংলা ও ইংরেজিতে কনভার্সেশনাল রেজুমে এডিটিং, সিভি ডকুমেন্ট পার্সিং, ৮টি আন্তর্জাতিক টেমপ্লেট এবং হাই-কোয়ালিটি পিডিএফ এক্সপোর্ট সাপোর্ট করে।\n\n*লাইভ ডেমো: [ai-cv-builder-sli4.onrender.com](https://ai-cv-builder-sli4.onrender.com)*`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['Securex প্রজেক্ট দেখাও', 'অন্যান্য প্রজেক্ট দেখাও', 'হায়ার করতে চাই'],
      }
    }
    return {
      reply: `**Resumate AI** is an AI resume platform built with Next.js 16, Google Gemini AI, and Supabase PostgreSQL. It supports trilingual conversational resume editing (English, Bengali, Banglish), multimodal document parsing, 8 regional templates, and headless Chromium PDF export.\n\n*Live Demo: [ai-cv-builder-sli4.onrender.com](https://ai-cv-builder-sli4.onrender.com)*`,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Tell me about Securex', 'Show all projects', 'How to contact him?'],
    }
  }

  return null
}

/**
 * Intent 8: Direct Social & Contact Channels
 */
function handleDirectContacts(
  query: string,
  isBangla: boolean
): { reply: string; cards: AiActionCard[]; suggestedQueries: string[] } | null {
  const q = query.toLowerCase()
  const contact = getContactDirectData()

  const wantsEmail = q.includes('email') || q.includes('gmail') || q.includes('mail') || q.includes('ইমেইল')
  const wantsPhone = q.includes('phone') || q.includes('mobile') || q.includes('call') || q.includes('ফোন') || q.includes('নাম্বার')
  const wantsWhatsApp = q.includes('whatsapp') || q.includes('wa.me') || q.includes('হোয়াটসঅ্যাপ')
  const wantsFb =
    q.includes('facebook') ||
    q.includes('fb link') ||
    q.includes('fb id') ||
    q.includes('fb profile') ||
    q === 'fb' ||
    q.includes('ফেসবুক') ||
    q.includes('fb daw') ||
    q.includes('fb dao')
  const wantsLinkedIn = q.includes('linkedin') || q.includes('linked in') || q.includes('লিঙ্কডইন')
  const wantsGitHub =
    q.includes('github') ||
    q.includes('git repo') ||
    q.includes('repositories') ||
    q.includes('source code') ||
    q.includes('গিটহাব')

  // Multi-channel contact request (e.g. email and phone, facebook and linkedin)
  const requestedChannels: string[] = []
  if (wantsEmail) requestedChannels.push('email')
  if (wantsPhone) requestedChannels.push('phone')
  if (wantsWhatsApp && !wantsPhone) requestedChannels.push('whatsapp')
  if (wantsFb) requestedChannels.push('facebook')
  if (wantsLinkedIn) requestedChannels.push('linkedin')
  if (wantsGitHub) requestedChannels.push('github')

  if (requestedChannels.length >= 2) {
    if (isBangla) {
      const itemsBn: string[] = []
      if (wantsEmail) itemsBn.push(`- 📧 **ইমেইল**: [${portfolioData.email}](mailto:${portfolioData.email})`)
      if (wantsPhone && wantsWhatsApp) {
        itemsBn.push(`- 📞 **ফোন ও হোয়াটসঅ্যাপ**: [${portfolioData.phone}](tel:${portfolioData.phone}) ([হোয়াটসঅ্যাপ চ্যাট](${socialLinks.whatsapp}))`)
      } else if (wantsPhone) {
        itemsBn.push(`- 📞 **ফোন**: [${portfolioData.phone}](tel:${portfolioData.phone})`)
      } else if (wantsWhatsApp) {
        itemsBn.push(`- 💬 **হোয়াটসঅ্যাপ**: [সরাসরি মেসেজ দিন](${socialLinks.whatsapp})`)
      }
      if (wantsFb) itemsBn.push(`- 🌐 **ফেসবুক**: [${socialLinks.facebook}](${socialLinks.facebook})`)
      if (wantsLinkedIn) itemsBn.push(`- 💼 **লিঙ্কডইন**: [${socialLinks.linkedin}](${socialLinks.linkedin})`)
      if (wantsGitHub) itemsBn.push(`- 🐙 **গিটহাব**: [github.com/${portfolioData.githubUsername}](${portfolioData.githubUrl})`)

      return {
        reply: `মোঃ নাজমুল শাকিবের অনুরোধকৃত যোগাযোগের মাধ্যমসমূহ:\n\n${itemsBn.join('\n')}`,
        cards: [],
        suggestedQueries: ['হায়ার করার উপায়', 'সেরা প্রজেক্টগুলো দেখাও', 'রেজুমে ডাউনলোড'],
      }
    }

    const itemsEn: string[] = []
    if (wantsEmail) itemsEn.push(`- 📧 **Email**: [${portfolioData.email}](mailto:${portfolioData.email})`)
    if (wantsPhone && wantsWhatsApp) {
      itemsEn.push(`- 📞 **Phone & WhatsApp**: [${portfolioData.phone}](tel:${portfolioData.phone}) ([Chat on WhatsApp](${socialLinks.whatsapp}))`)
    } else if (wantsPhone) {
      itemsEn.push(`- 📞 **Phone**: [${portfolioData.phone}](tel:${portfolioData.phone})`)
    } else if (wantsWhatsApp) {
      itemsEn.push(`- 💬 **WhatsApp**: [Chat on WhatsApp](${socialLinks.whatsapp})`)
    }
    if (wantsFb) itemsEn.push(`- 🌐 **Facebook**: [${socialLinks.facebook}](${socialLinks.facebook})`)
    if (wantsLinkedIn) itemsEn.push(`- 💼 **LinkedIn**: [${socialLinks.linkedin}](${socialLinks.linkedin})`)
    if (wantsGitHub) itemsEn.push(`- 🐙 **GitHub**: [github.com/${portfolioData.githubUsername}](${portfolioData.githubUrl})`)

    return {
      reply: `Here are the requested contact details for **Md. Nazmus Shakib**:\n\n${itemsEn.join('\n')}`,
      cards: [],
      suggestedQueries: ['How to hire Shakib?', 'Show his best projects', 'Download his resume'],
    }
  }

  // Facebook
  if (
    q.includes('facebook') ||
    q.includes('fb link') ||
    q.includes('fb id') ||
    q.includes('fb profile') ||
    q === 'fb' ||
    q.includes('ফেসবুক') ||
    q.includes('fb daw') ||
    q.includes('fb dao')
  ) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিবের অফিশিয়াল ফেসবুক প্রোফাইল লিংক:\n\n🌐 **ফেসবুক**: [${socialLinks.facebook}](${socialLinks.facebook})\n\nপ্রয়োজনে সরাসরি মেসেজ দিয়ে কানেক্ট করতে পারেন।`,
        cards: [],
        suggestedQueries: [
          'হোয়াটসঅ্যাপ নাম্বার দাও',
          'লিঙ্কডইন প্রোফাইল লিংক',
          'তাঁর সেরা প্রজেক্টগুলো দেখাও',
          'যোগাযোগের তথ্য',
        ],
      }
    }
    return {
      reply: `Here is Md. Nazmus Shakib's official Facebook profile link:\n\n🌐 **Facebook**: [${socialLinks.facebook}](${socialLinks.facebook})\n\nFeel free to connect or send a direct message!`,
      cards: [],
      suggestedQueries: [
        'Show his WhatsApp number',
        'Show his LinkedIn profile',
        'Show his best projects',
        'Download his resume',
      ],
    }
  }

  // WhatsApp & Phone
  if (
    q.includes('whatsapp') ||
    q.includes('wa.me') ||
    q.includes('হোয়াটসঅ্যাপ') ||
    q.includes('phone') ||
    q.includes('mobile') ||
    q.includes('number') ||
    q.includes('call') ||
    q.includes('ফোন') ||
    q.includes('নাম্বার')
  ) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিবের ফোন ও হোয়াটসঅ্যাপ যোগাযোগের তথ্য:\n\n- 📞 **ফোন**: [${portfolioData.phone}](tel:${portfolioData.phone})\n- 💬 **হোয়াটসঅ্যাপ**: [সরাসরি মেসেজ দিন](${socialLinks.whatsapp})\n\nযেকোনো আলোচনা বা প্রজেক্টের প্রয়োজনে সরাসরি কল বা মেসেজ পাঠাতে পারেন।`,
        cards: [],
        suggestedQueries: ['ফেসবুক লিংকটা দাও', 'লিঙ্কডইন প্রোফাইল লিংক', 'ইমেইল অ্যাড্রেস', 'প্রজেক্ট দেখাও'],
      }
    }
    return {
      reply: `You can reach Md. Nazmus Shakib directly via Phone or WhatsApp:\n\n- 📞 **Phone**: [${portfolioData.phone}](tel:${portfolioData.phone})\n- 💬 **WhatsApp**: [Chat on WhatsApp](${socialLinks.whatsapp})\n\nAvailable for engineering discussions and new project inquiries!`,
      cards: [],
      suggestedQueries: ['Give me Facebook link', 'Show his LinkedIn profile', 'Send an email', 'How to hire him?'],
    }
  }

  // LinkedIn
  if (q.includes('linkedin') || q.includes('linked in') || q.includes('লিঙ্কডইন')) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিবের অফিশিয়াল লিঙ্কডইন প্রোফাইল লিংক:\n\n💼 **LinkedIn**: [${socialLinks.linkedin}](${socialLinks.linkedin})\n\nপ্রফেশনাল নেটওয়ার্কিং ও ক্যারিয়ার সংযোগের জন্য কানেক্ট করতে পারেন।`,
        cards: [],
        suggestedQueries: ['ফেসবুক লিংকটা দাও', 'হোয়াটসঅ্যাপ নাম্বার দাও', 'প্রজেক্ট দেখাও', 'রেজুমে ডাউনলোড'],
      }
    }
    return {
      reply: `Here is Md. Nazmus Shakib's verified LinkedIn profile:\n\n💼 **LinkedIn**: [${socialLinks.linkedin}](${socialLinks.linkedin})\n\nFeel free to connect for professional networking and engineering opportunities!`,
      cards: [],
      suggestedQueries: ['Give me Facebook link', 'Give me WhatsApp number', 'Show his best projects', 'Download his resume'],
    }
  }

  // GitHub
  if (
    q.includes('github') ||
    q.includes('git repo') ||
    q.includes('repositories') ||
    q.includes('source code') ||
    q.includes('গিটহাব')
  ) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিবের অফিশিয়াল গিটহাব প্রোফাইল লিংক:\n\n🐙 **GitHub**: [github.com/${portfolioData.githubUsername}](${portfolioData.githubUrl})\n\nএখানে তাঁর লারাভেল, নেক্সট.জেএস এবং অটোমেশন প্রজেক্টগুলোর ওপেন-সোর্স কোড দেখতে পাবেন।`,
        cards: [],
        suggestedQueries: ['Securex প্রজেক্ট সম্পর্কে বলো', 'CV Payment Reminder সম্পর্কে বলো', 'টেকনোলজি স্ট্যাক কি?'],
      }
    }
    return {
      reply: `Here is Md. Nazmus Shakib's GitHub profile:\n\n🐙 **GitHub**: [github.com/${portfolioData.githubUsername}](${portfolioData.githubUrl})\n\nYou can inspect the open-source code for his Laravel, Next.js, and automation projects.`,
      cards: [],
      suggestedQueries: ['Tell me about Securex', 'Tell me about CV Payment Reminder', 'What technologies does he use?'],
    }
  }

  // Email
  if (q.includes('email') || q.includes('gmail') || q.includes('mail') || q.includes('ইমেইল')) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিবের অফিসিয়াল ইমেইল অ্যাড্রেস:\n\n📧 **ইমেইল**: [${portfolioData.email}](mailto:${portfolioData.email})\n\nযেকোনো প্রজেক্ট রিকোয়ারমেন্ট বা কাজের প্রয়োজনে সরাসরি ইমেইল পাঠাতে পারেন।`,
        cards: [],
        suggestedQueries: ['ফেসবুক লিংকটা দাও', 'হোয়াটসঅ্যাপ নাম্বার দাও', 'রেজুমে ডাউনলোড', 'প্রজেক্ট দেখাও'],
      }
    }
    return {
      reply: `You can email Md. Nazmus Shakib directly at:\n\n📧 **Email**: [${portfolioData.email}](mailto:${portfolioData.email})\n\nHe responds promptly to project inquiries and engineering opportunities.`,
      cards: [],
      suggestedQueries: ['Give me Facebook link', 'Give me WhatsApp number', 'Download his resume', 'Show me his best projects'],
    }
  }

  // General Contacts / Reach Out / Jogajog
  if (
    q.includes('social') ||
    q.includes('contact') ||
    q.includes('jogajog') ||
    q.includes('যোগাযোগ') ||
    q.includes('reach out') ||
    q.includes('connect')
  ) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিবের যোগাযোগের সরাসরি মাধ্যমসমূহ:\n\n- 📧 **ইমেইল**: [${portfolioData.email}](mailto:${portfolioData.email})\n- 📞 **ফোন / হোয়াটসঅ্যাপ**: [${portfolioData.phone}](tel:${portfolioData.phone})\n- 📍 **লোকেশন**: ${portfolioData.location} (${portfolioData.availability})`,
        cards: [{ type: 'contact-direct', data: contact }],
        suggestedQueries: ['ফেসবুক লিংকটা দাও', 'রেজুমে ডাউনলোড', 'কেন তাঁকে হায়ার করবেন?'],
      }
    }
    return {
      reply: `Here are the verified contact channels for **Md. Nazmus Shakib**:\n\n- 📧 **Email**: [${portfolioData.email}](mailto:${portfolioData.email})\n- 📞 **Phone / WhatsApp**: [${portfolioData.phone}](tel:${portfolioData.phone})\n- 📍 **Location**: ${portfolioData.location} (${portfolioData.availability})`,
      cards: [{ type: 'contact-direct', data: contact }],
      suggestedQueries: ['Give me Facebook link', 'Download his resume', 'Why should I hire him?'],
    }
  }

  return null
}

/**
 * Intent 9: Education, CGPA & Location
 */
function handleEducationAndLocation(
  query: string,
  isBangla: boolean,
  constraints: ParsedConstraints
): { reply: string; cards: AiActionCard[]; suggestedQueries: string[] } | null {
  const q = query.toLowerCase()
  const resume = getResumeCardData()

  const wantsLocation =
    q.includes('location') ||
    q.includes('address') ||
    q.includes('where do you live') ||
    q.includes('where is shakib') ||
    q.includes('where are you') ||
    q.includes('kothai thako') ||
    q.includes('thaken kothai') ||
    q.includes('bari kothai') ||
    q.includes('khulna') ||
    q.includes('satkhira') ||
    q.includes('কোথায় থাকো') ||
    q.includes('ঠিকানা')

  const wantsEduOrCgpa =
    q.includes('education') ||
    q.includes('cgpa') ||
    q.includes('gpa') ||
    q.includes('সিজিপিএ') ||
    q.includes('জিপিএ') ||
    q.includes('university') ||
    q.includes('nubtk') ||
    q.includes('degree') ||
    q.includes('academic') ||
    q.includes('bsc') ||
    q.includes('coursework') ||
    q.includes('graduation') ||
    q.includes('study') ||
    q.includes('porashona') ||
    q.includes('varsity') ||
    q.includes('versity') ||
    q.includes('পড়াশোনা') ||
    q.includes('রেজাল্ট') ||
    q.includes('ভার্সিটি') ||
    q.includes('বিশ্ববিদ্যালয়')

  // Multi-entity: Both Location and Education / CGPA requested
  if (wantsLocation && wantsEduOrCgpa) {
    if (isBangla) {
      let reply = `মোঃ নাজমুল শাকিব বর্তমানে **খুলনা, বাংলাদেশ**-এ অবস্থান করছেন (হোমটাউন: সাতক্ষীরা) এবং নর্দান ইউনিভার্সিটি অব বিজনেস অ্যান্ড টেকনোলজি খুলনা-তে সিএসই ফাইনাল সেমিস্টারে অধ্যয়নরত (বর্তমান **CGPA ৩.৬০ / ৪.০০**)।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['সার্টিফিকেশন কি কি আছে?', 'কাজের অভিজ্ঞতা কেমন?', 'রেজুমে ডাউনলোড'],
      }
    }

    let reply = `Md. Nazmus Shakib is located in **Khulna, Bangladesh** (hometown: Satkhira) and is currently in his final semester of BSc in CSE at Northern University of Business and Technology Khulna with a **3.60 / 4.00 CGPA**.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['What certifications does he hold?', 'Tell me about his experience', 'Download his resume'],
    }
  }

  // Location
  if (wantsLocation) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিব বর্তমানে **খুলনা, বাংলাদেশ**-এ অবস্থান করছেন (হোমটাউন: সাতক্ষীরা)। তিনি খুলনা/ঢাকায় অন-সাইট রোলের পাশাপাশি বিশ্বব্যাপী রিমোট প্রজেক্টে কাজ করতে প্রস্তুত।`,
        cards: [],
        suggestedQueries: ['যোগাযোগের মাধ্যম', 'সেরা প্রজেক্ট দেখাও', 'কেন তাঁকে হায়ার করবেন?'],
      }
    }
    return {
      reply: `Md. Nazmus Shakib is based in **Khulna, Bangladesh** (Hometown: Satkhira). He is available for on-site engineering roles in Khulna/Dhaka as well as remote engineering positions worldwide.`,
      cards: [],
      suggestedQueries: ['How to contact him?', 'Show his best projects', 'Why should I hire him?'],
    }
  }

  // Academic Education & CGPA
  if (wantsEduOrCgpa) {
    if (isBangla) {
      let reply = `মোঃ নাজমুল শাকিব নর্দান ইউনিভার্সিটি অব বিজনেস অ্যান্ড টেকনোলজি খুলনা (NUBTK)-তে **কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (BSc in CSE)**-এর ফাইনাল সেমিস্টারে অধ্যয়নরত। তাঁর বর্তমান **CGPA ৩.৬০ / ৪.০০** এবং গ্র্যাজুয়েশন ২০২৬ সালে। পূর্বে তিনি HSC (GPA ৫.০০) এবং SSC (GPA ৫.০০) অর্জন করেছেন।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: q.includes('card') || q.includes('দেখাও') ? [{ type: 'resume-card', data: resume }] : [],
        suggestedQueries: ['সার্টিফিকেশন কি কি আছে?', 'কাজের অভিজ্ঞতা কেমন?', 'রেজুমে ডাউনলোড'],
      }
    }

    let reply = `Md. Nazmus Shakib is in his final semester of **BSc in Computer Science & Engineering** at Northern University of Business and Technology Khulna. He holds a current **CGPA of 3.60 / 4.00** with expected graduation in 2026. His prior academics include HSC (GPA 5.00/5.00) and SSC (GPA 5.00/5.00).`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: q.includes('card') || q.includes('show') ? [{ type: 'resume-card', data: resume }] : [],
      suggestedQueries: ['What certifications does he hold?', 'Tell me about his experience', 'Download his resume'],
    }
  }

  return null
}

/**
 * Intent 10: Multi-Technology & Single-Technology Inquiry Handler
 * Directly answers multi-entity questions (e.g., React and Angular, Laravel and Next.js, PHP and Python, Java or Spring Boot).
 * Strictly avoids claiming unverified expertise and remains natural and concise.
 */
interface TechDescriptor {
  id: string
  nameEn: string
  nameBn: string
  category: 'verified-primary' | 'verified-secondary' | 'academic' | 'unverified'
  detailEn: string
  detailBn: string
  detect: (q: string) => boolean
}

const TECH_CATALOG: TechDescriptor[] = [
  {
    id: 'laravel',
    nameEn: 'Laravel',
    nameBn: 'লারাভেল',
    category: 'verified-primary',
    detailEn: 'Laravel 12 is his primary backend framework for clean MVC architectures, Sanctum authentication, and RESTful APIs',
    detailBn: 'লারাভেল ১২ শাকিবের প্রধান ব্যাকএন্ড ফ্রেমওয়ার্ক (MVC আর্কিটেকচার, স্যাঙ্কটাম অথেন্টিকেশন ও REST API)',
    detect: (q) => /\b(laravel|lara)\b/i.test(q) || q.includes('লারাবেল') || q.includes('লারাভেল'),
  },
  {
    id: 'nextjs',
    nameEn: 'Next.js',
    nameBn: 'নেক্সট.জেএস',
    category: 'verified-primary',
    detailEn: 'Next.js 16 is his primary full-stack React framework (App Router, SSR, and TypeScript, used in Resumate AI)',
    detailBn: 'Next.js 16 হলো শাকিবের আধুনিক ফুল-স্ট্যাক ফ্রেমওয়ার্ক (Resumate AI ও পোর্টফোলিওতে ব্যবহৃত)',
    detect: (q) => /\b(next\.?js|nextjs)\b/i.test(q) || q.includes('নেক্সট'),
  },
  {
    id: 'react',
    nameEn: 'React',
    nameBn: 'রিঅ্যাক্ট',
    category: 'verified-primary',
    detailEn: 'React 19 & Vite is his core UI library for dynamic, responsive web interfaces (used in AI Smart Campus System)',
    detailBn: 'রিঅ্যাক্ট ১৯ ও ভাইট শাকিবের মূল ইউআই লাইব্রেরি (AI Smart Campus System-এ ব্যবহৃত)',
    detect: (q) => (/\b(react|reactjs)\b/i.test(q) || q.includes('রিঅ্যাক্ট')) && !q.includes('react native') && !q.includes('রিঅ্যাক্ট নেটিভ'),
  },
  {
    id: 'php',
    nameEn: 'PHP',
    nameBn: 'পিএইচপি',
    category: 'verified-primary',
    detailEn: 'PHP is his primary backend language, reinforced by OOP design patterns and 80 hours of ICT Division training from Khulna University',
    detailBn: 'পিএইচপি তাঁর মূল ব্যাকএন্ড ভাষা (ওওপি এবং খুলনা বিশ্ববিদ্যালয়ের ৮০ ঘণ্টার প্রফেশনাল ট্রেনিং)',
    detect: (q) => /\bphp\b/i.test(q) || q.includes('পিএইচপি'),
  },
  {
    id: 'mysql',
    nameEn: 'MySQL',
    nameBn: 'মাইএসকিউএল',
    category: 'verified-primary',
    detailEn: 'MySQL is his primary relational database, strictly normalized to Third Normal Form (3NF) for relational integrity',
    detailBn: 'MySQL শাকিবের মূল রিলেশনাল ডেটাবেস (3NF নরম্যালাইজড ডেটা স্কিমা)',
    detect: (q) => /\b(mysql|sql|3nf)\b/i.test(q) || q.includes('মাইএসকিউএল') || (/\bdatabase\b/i.test(q) && !q.includes('postgres') && !q.includes('mongo')) || q.includes('ডেটাবেস'),
  },
  {
    id: 'n8n',
    nameEn: 'n8n',
    nameBn: 'n8n',
    category: 'verified-primary',
    detailEn: 'n8n is his self-hosted workflow automation platform for webhook triggers, Google Sheets sync, and Telegram notifications',
    detailBn: 'n8n শাকিবের সেলফ-হোস্টেড অটোমেশন টুল (টেলিগ্রাম বট ও গুগল শিটস ওয়ার্কফ্লো)',
    detect: (q) => /\bn8n\b/i.test(q),
  },
  {
    id: 'docker',
    nameEn: 'Docker',
    nameBn: 'ডকার',
    category: 'verified-secondary',
    detailEn: 'Docker is used for containerized local development and hosting n8n automation instances',
    detailBn: 'ডকার শাকিব কনটেইনারাইজেশন এবং n8n সেলফ-হোস্টিংয়ে ব্যবহার করেন',
    detect: (q) => /\b(docker)\b/i.test(q) || q.includes('ডকার'),
  },
  {
    id: 'typescript',
    nameEn: 'TypeScript',
    nameBn: 'টাইপস্ক্রিপ্ট',
    category: 'verified-primary',
    detailEn: 'TypeScript is used across modern Next.js and React codebases for strict type safety and cleaner architecture',
    detailBn: 'টাইপস্ক্রিপ্ট শাকিব আধুনিক নেক্সট.জেএস ও রিঅ্যাক্ট কোডবেসে টাইপ সেফটির জন্য ব্যবহার করেন',
    detect: (q) => /\b(typescript|ts)\b/i.test(q) || q.includes('টাইপস্ক্রিপ্ট'),
  },
  {
    id: 'javascript',
    nameEn: 'JavaScript',
    nameBn: 'জাভাস্ক্রিপ্ট',
    category: 'verified-primary',
    detailEn: 'JavaScript is used extensively across interactive frontends and modular vanilla builds like Nur Foodes POS',
    detailBn: 'জাভাস্ক্রিপ্ট শাকিব আধুনিক ফ্রন্টএন্ড এবং Nur Foodes POS-এ ব্যবহার করেছেন',
    detect: (q) => (/\bjavascript\b/i.test(q) || q.includes('জাভাস্ক্রিপ্ট')) || (/\bjs\b/i.test(q) && !q.includes('next.js') && !q.includes('nextjs') && !q.includes('reactjs') && !q.includes('vuejs') && !q.includes('node.js') && !q.includes('nodejs')),
  },
  {
    id: 'tailwind',
    nameEn: 'Tailwind CSS',
    nameBn: 'টেইলউইন্ড সিএসএস',
    category: 'verified-primary',
    detailEn: 'Tailwind CSS is his primary styling framework for responsive and accessible UI design',
    detailBn: 'টেইলউইন্ড সিএসএস শাকিবের প্রধান স্টাইলিং ফ্রেমওয়ার্ক',
    detect: (q) => /\b(tailwind|tailwindcss)\b/i.test(q) || q.includes('টেইলউইন্ড'),
  },
  {
    id: 'supabase',
    nameEn: 'Supabase / PostgreSQL',
    nameBn: 'সুপাবেস / পোস্টগ্রেসকিউএল',
    category: 'verified-secondary',
    detailEn: 'Supabase PostgreSQL was integrated in Resumate AI for cloud authentication and database storage',
    detailBn: 'সুপাবেস পোস্টগ্রেসকিউএল Resumate AI-তে ক্লাউড স্টোরেজ ও অথেন্টিকেশনে ব্যবহৃত হয়েছে',
    detect: (q) => /\b(supabase|postgres|postgresql)\b/i.test(q) || q.includes('সুপাবেস'),
  },
  {
    id: 'python',
    nameEn: 'Python',
    nameBn: 'পাইথন',
    category: 'academic',
    detailEn: 'Python is part of his academic coursework at Northern University (OOP, data structures, and automation scripts)',
    detailBn: 'পাইথন শাকিবের বিশ্ববিদ্যালয়ে একাডেমিক কোর্সওয়ার্ক এবং স্ক্রিপ্টিংয়ের অভিজ্ঞতা রয়েছে',
    detect: (q) => /\bpython\b/i.test(q) || q.includes('পাইথন') || q.includes('পাইভন'),
  },
  {
    id: 'angular',
    nameEn: 'Angular',
    nameBn: 'অ্যাঙ্গুলার',
    category: 'unverified',
    detailEn: 'Angular is not in his verified portfolio stack',
    detailBn: 'অ্যাঙ্গুলারে তাঁর কোনো কাজের অভিজ্ঞতা নেই',
    detect: (q) => /\b(angular|angularjs)\b/i.test(q) || q.includes('অ্যাঙ্গুলার'),
  },
  {
    id: 'vue',
    nameEn: 'Vue.js',
    nameBn: 'ভ্যু.জেএস',
    category: 'unverified',
    detailEn: 'Vue.js is not in his verified portfolio stack',
    detailBn: 'ভ্যু.জেএস-এ তাঁর কোনো ভেরিফায়েড অভিজ্ঞতা নেই',
    detect: (q) => /\b(vue|vuejs)\b/i.test(q) || q.includes('ভ্যু'),
  },
  {
    id: 'django',
    nameEn: 'Django',
    nameBn: 'ডিজ্যাঙ্গো',
    category: 'unverified',
    detailEn: 'Django is not in his verified portfolio stack',
    detailBn: 'ডিজ্যাঙ্গোতে তাঁর কোনো কাজের অভিজ্ঞতা নেই',
    detect: (q) => /\bdjango\b/i.test(q) || q.includes('ডিজ্যাঙ্গো'),
  },
  {
    id: 'flask',
    nameEn: 'Flask',
    nameBn: 'ফ্লাস্ক',
    category: 'unverified',
    detailEn: 'Flask is not in his verified portfolio stack',
    detailBn: 'ফ্লাস্কে তাঁর কোনো কাজের অভিজ্ঞতা নেই',
    detect: (q) => /\bflask\b/i.test(q) || q.includes('ফ্লাস্ক'),
  },
  {
    id: 'spring',
    nameEn: 'Spring Boot',
    nameBn: 'স্প্রিং বুট',
    category: 'unverified',
    detailEn: 'Spring Boot is not in his verified portfolio stack',
    detailBn: 'স্প্রিং বুটে তাঁর কোনো কাজের অভিজ্ঞতা নেই',
    detect: (q) => /\b(spring|springboot|spring boot)\b/i.test(q) || q.includes('স্প্রিং'),
  },
  {
    id: 'java',
    nameEn: 'Java',
    nameBn: 'জাভা',
    category: 'unverified',
    detailEn: 'Java enterprise backend engineering is not in his verified portfolio stack',
    detailBn: 'জাভা ব্যাকএন্ড স্ট্যাকে তাঁর কোনো কাজের অভিজ্ঞতা নেই',
    detect: (q) => (/\bjava\b/i.test(q) || q.includes('জাভা')) && !q.includes('javascript') && !q.includes('জাভাস্ক্রিপ্ট'),
  },
  {
    id: 'flutter',
    nameEn: 'Flutter',
    nameBn: 'ফ্লাটার',
    category: 'unverified',
    detailEn: 'Flutter mobile app development is not in his verified portfolio stack',
    detailBn: 'ফ্লাটার মোবাইল ডেভেলপমেন্টে তাঁর কোনো কাজের অভিজ্ঞতা নেই',
    detect: (q) => /\bflutter\b/i.test(q) || q.includes('ফ্লাটার'),
  },
  {
    id: 'react-native',
    nameEn: 'React Native',
    nameBn: 'রিঅ্যাক্ট নেটিভ',
    category: 'unverified',
    detailEn: 'React Native mobile app development is not in his verified portfolio stack',
    detailBn: 'রিঅ্যাক্ট নেটিভে তাঁর কোনো কাজের অভিজ্ঞতা নেই',
    detect: (q) => /\b(react native)\b/i.test(q) || q.includes('রিঅ্যাক্ট নেটিভ'),
  },
  {
    id: 'ruby',
    nameEn: 'Ruby on Rails',
    nameBn: 'রুবি অন রেইলস',
    category: 'unverified',
    detailEn: 'Ruby on Rails is not in his verified portfolio stack',
    detailBn: 'রুবি অন রেইলসে তাঁর কোনো কাজের অভিজ্ঞতা নেই',
    detect: (q) => /\b(ruby|rails)\b/i.test(q) || q.includes('রুবি'),
  },
  {
    id: 'golang',
    nameEn: 'Go / Golang',
    nameBn: 'গো / গোল্যাং',
    category: 'unverified',
    detailEn: 'Go / Golang is not in his verified portfolio stack',
    detailBn: 'গোল্যাংয়ে তাঁর কোনো কাজের অভিজ্ঞতা নেই',
    detect: (q) => /\b(golang|go language)\b/i.test(q) || q.includes('গোল্যাং'),
  },
  {
    id: 'dotnet',
    nameEn: 'ASP.NET / C#',
    nameBn: '.নেট / সি#',
    category: 'unverified',
    detailEn: '.NET / C# is not in his verified portfolio stack',
    detailBn: '.নেট / সি#-এ তাঁর কোনো কাজের অভিজ্ঞতা নেই',
    detect: (q) => /\b(asp\.net|dotnet|\.net|c#)\b/i.test(q),
  },
]

function handleTechnologyInquiry(
  query: string,
  isBangla: boolean,
  constraints: ParsedConstraints
): { reply: string; cards: AiActionCard[]; suggestedQueries: string[] } | null {
  const q = query.toLowerCase()

  // Guard: If the query explicitly asks about work history or internship at Appstick, let handleExperienceInquiry handle it.
  if (
    q.includes('appstick') ||
    q.includes('intern') ||
    q.includes('work history') ||
    q.includes('past role') ||
    q.includes('employer') ||
    q.includes('career')
  ) {
    return null
  }

  const matched = TECH_CATALOG.filter((t) => t.detect(q))
  if (matched.length === 0) return null

  const verified = matched.filter((t) => t.category === 'verified-primary' || t.category === 'verified-secondary')
  const academic = matched.filter((t) => t.category === 'academic')
  const unverified = matched.filter((t) => t.category === 'unverified')

  // Case 1: Multi-Technology Inquiries (Answers EVERY requested entity)
  if (matched.length >= 2) {
    if (isBangla) {
      let reply = ''
      if (verified.length > 0 && unverified.length > 0) {
        reply = `${verified.map((v) => v.nameBn).join(', ')}-এর ক্ষেত্রে হ্যাঁ, কিন্তু ${unverified.map((u) => u.nameBn).join(', ')}-এর ক্ষেত্রে না। নাজমুল শাকিব ${verified.map((v) => `${v.nameBn} (${v.detailBn})`).join(' ও ')} নিয়ে দক্ষ, তবে ${unverified.map((u) => u.nameBn).join(' বা ')}-এ তাঁর কোনো কাজের অভিজ্ঞতা নেই।`
      } else if (verified.length > 0 && academic.length > 0) {
        reply = `${verified.map((v) => v.nameBn).join(', ')}-এর ক্ষেত্রে হ্যাঁ, তবে ${academic.map((a) => a.nameBn).join(', ')}-এ তাঁর অভিজ্ঞতা একাডেমিক। ${verified.map((v) => `${v.nameBn} (${v.detailBn})`).join(' ও ')}-এ তাঁর বাস্তব কাজের অভিজ্ঞতা রয়েছে। অন্যদিকে ${academic.map((a) => a.nameBn).join(' ও ')}-এ তাঁর অভিজ্ঞতা মূলত বিশ্ববিদ্যালয়ের কোর্সওয়ার্ক ও স্ক্রিপ্টিংয়ের মধ্যে সীমাবদ্ধ।`
      } else if (unverified.length > 0 && verified.length === 0 && academic.length === 0) {
        reply = `না, নাজমুল শাকিবের ${unverified.map((u) => u.nameBn).join(' বা ')}-তে কোনো কাজের অভিজ্ঞতা নেই। তাঁর মূল ইঞ্জিনিয়ারিং দক্ষতা পিএইচপি, লারাভেল, মাইএসকিউএল, নেক্সট.জেএস এবং রিঅ্যাক্ট-এর ওপর প্রতিষ্ঠিত।`
      } else {
        reply = `হ্যাঁ, নাজমুল শাকিবের ${verified.map((v) => v.nameBn).join(' এবং ')} উভয় প্রযুক্তিতেই বাস্তব কাজের অভিজ্ঞতা রয়েছে। ${verified.map((v) => v.detailBn).join(', ')}।`
      }

      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }

      return {
        reply,
        cards: [],
        suggestedQueries: ['লারাভেল প্রজেক্ট দেখাও', 'অন্যান্য টেকনোলজি স্ট্যাক', 'হায়ার করার উপায়'],
      }
    }

    let reply = ''
    if (verified.length > 0 && unverified.length > 0) {
      reply = `Yes for ${verified.map((v) => v.nameEn).join(', ')}, but no for ${unverified.map((u) => u.nameEn).join(', ')}. Shakib is proficient in ${verified.map((v) => `${v.nameEn} (${v.detailEn})`).join(' and ')}, but he does not have verified experience with ${unverified.map((u) => u.nameEn).join(' or ')} in his portfolio.`
    } else if (verified.length > 0 && academic.length > 0) {
      reply = `Yes for ${verified.map((v) => v.nameEn).join(', ')}, while his experience with ${academic.map((a) => a.nameEn).join(', ')} is academic. He has extensive production experience with ${verified.map((v) => `${v.nameEn} (${v.detailEn})`).join(' and ')}. For ${academic.map((a) => a.nameEn).join(', ')}, his experience is based on university coursework and scripting rather than commercial web backend engineering.`
    } else if (unverified.length > 0 && verified.length === 0 && academic.length === 0) {
      reply = `No, Shakib does not have verified production experience with ${unverified.map((u) => u.nameEn).join(' or ')}. His primary engineering stack centers on PHP, Laravel, MySQL, Next.js, and React.`
    } else {
      reply = `Yes, Shakib has verified experience with both ${verified.map((v) => v.nameEn).join(' and ')}. ${verified.map((v) => v.detailEn).join(', while ')}.`
    }

    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }

    return {
      reply,
      cards: [],
      suggestedQueries: ['Show projects using Laravel', 'Show projects using Next.js & React', 'How to hire him?'],
    }
  }

  // Case 2: Single Technology Inquiries
  const single = matched[0]
  if (single.category === 'unverified') {
    if (isBangla) {
      let reply = `না, নাজমুল শাকিবের **${single.nameBn}**-এ কোনো ভেরিফায়েড কাজের অভিজ্ঞতা নেই। তাঁর মূল স্ট্যাক হলো লারাভেল (পিএইচপি), মাইএসকিউএল, নেক্সট.জেএস এবং রিঅ্যাক্ট।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['লারাভেল প্রজেক্ট দেখাও', 'টেকনোলজি স্ট্যাক কি?', 'যোগাযোগের মাধ্যম'],
      }
    }

    let reply = `No, Shakib does not have verified experience with **${single.nameEn}**. His verified development stack centers on Laravel (PHP), MySQL, Next.js, and React.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['Show projects using Laravel', 'What technologies does he use?', 'Contact Shakib'],
    }
  }

  if (single.category === 'academic') {
    if (isBangla) {
      let reply = `**${single.nameBn}**-এ নাজমুল শাকিবের অভিজ্ঞতা মূলত নর্দান ইউনিভার্সিটির একাডেমিক কোর্সওয়ার্ক (ডাটা স্ট্রাকচার, অ্যালগরিদম ও স্ক্রিপ্টিং)-এর মধ্যে সীমাবদ্ধ, এটি তাঁর কমার্শিয়াল ওয়েব ব্যাকএন্ড স্ট্যাক নয়। তাঁর প্রধান ব্যাকএন্ড স্ট্যাক হলো লারাভেল ও পিএইচপি।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['লারাভেল প্রজেক্ট দেখাও', 'টেকনোলজি স্ট্যাক কি?', 'রেজুমে ডাউনলোড'],
      }
    }

    let reply = `For **${single.nameEn}**, Shakib's experience is primarily academic coursework at Northern University (covering data structures, algorithms, and scripting) rather than commercial production web backend development. His primary backend stack is Laravel and PHP.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['Show projects using Laravel', 'What technologies does he use?', 'Download his resume'],
    }
  }

  // Single Verified Technology
  if (single.id === 'laravel') {
    if (isBangla) {
      let reply = `হ্যাঁ, **Laravel** হলো নাজমুল শাকিবের প্রধান ব্যাকএন্ড ফ্রেমওয়ার্ক। তিনি Laravel 12, Laravel MVC আর্কিটেকচার, Sanctum API অথেন্টিকেশন, Eloquent ORM এবং সুরক্ষিত RESTful API তৈরিতে পারদর্শী। তিনি খুলনা বিশ্ববিদ্যালয় থেকে আইসিটি ডিভিশনের আওতায় ৮০ ঘণ্টার প্রফেশনাল লারাভেল ট্রেনিংও সম্পন্ন করেছেন।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['Securex প্রজেক্ট দেখাও', 'অন্যান্য টেকনোলজি স্ট্যাক', 'হায়ার করতে চাই'],
      }
    }
    let reply = `Yes, **Laravel** is Md. Nazmus Shakib's primary backend framework. He has extensive production experience with Laravel 12, clean MVC architectures, Sanctum API authentication, Eloquent ORM relationships, and RESTful web services. He also completed 80 hours of formal PHP & Laravel training from Khulna University under the ICT Division.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['Show projects using Laravel', 'What other skills does he have?', 'How to hire him?'],
    }
  }

  if (single.id === 'mysql') {
    if (isBangla) {
      let reply = `হ্যাঁ, নাজমুল শাকিব **MySQL রিলেশনাল ডেটাবেস** আর্কিটেকচারে পারদর্শী। তিনি রিলেশনাল স্কিমা ডিজাইন, থার্ড নরমাল ফর্ম (3NF) বাস্তবায়ন, ইনডেক্সিং এবং কুয়েরি ইন্টিগ্রিটি অপ্টিমাইজেশনে দক্ষ। AI Smart Campus System-এ তিনি ডেটাবেস লিড হিসেবে দায়িত্ব পালন করেছেন।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['AI Smart Campus সিস্টেম দেখাও', 'লারাভেল স্কিল কি কি?', 'অন্যান্য প্রজেক্ট'],
      }
    }
    let reply = `Yes, Md. Nazmus Shakib specializes in **MySQL relational database engineering**. He focuses on designing schemas normalized strictly to Third Normal Form (3NF), foreign key cascading, query indexing, and relational integrity. He served as Database Lead for the AI Smart Campus System.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['Tell me about AI Smart Campus System', 'What backend skills does he have?', 'How to hire him?'],
    }
  }

  if (single.id === 'nextjs') {
    if (isBangla) {
      let reply = `হ্যাঁ, নাজমুল শাকিব ফ্রন্টএন্ড ও ফুল-স্ট্যাকে **Next.js 16** ব্যবহার করেন। তিনি App Router, সার্ভার/ক্লায়েন্ট কম্পোনেন্ট, এসএসআর এবং টাইপস্ক্রিপ্ট দিয়ে আধুনিক ও দ্রুতগতির ওয়েব অ্যাপ্লিকেশন নির্মাণে পারদর্শী, যেমনটি Resumate AI এবং এই পোর্টফোলিওতে রয়েছে।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['রেজুমেট এআই দেখাও', 'অন্যান্য প্রজেক্ট দেখাও', 'হায়ার করতে চাই'],
      }
    }
    let reply = `Yes, Md. Nazmus Shakib builds modern full-stack web applications with **Next.js 16**. He leverages the App Router, server-side rendering (SSR), and TypeScript for high-performance responsive platforms, demonstrated in Resumate AI and this portfolio.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['Tell me about Resumate AI', 'Show all projects', 'Contact Shakib'],
    }
  }

  if (single.id === 'react') {
    if (isBangla) {
      let reply = `হ্যাঁ, **React 19** হলো নাজমুল শাকিবের প্রধান ফ্রন্টএন্ড ইউআই লাইব্রেরি। Vite, TypeScript, এবং Tailwind CSS-এর সমন্বয়ে তিনি রেসপনসিভ ও ইন্টারঅ্যাক্টিভ ওয়েব ইন্টারফেস তৈরি করেন, যেমনটি AI Smart Campus System ও Nur Foodes-এ দেখা যায়।`
      if (constraints.exactSentences) {
        reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
      }
      return {
        reply,
        cards: [],
        suggestedQueries: ['AI Smart Campus সিস্টেম দেখাও', 'রেজুমেট এআই দেখাও', 'ব্যাকএন্ড স্কিল কি কি?'],
      }
    }
    let reply = `Yes, **React 19** is Md. Nazmus Shakib's primary frontend UI library. Combined with Vite, TypeScript, and Tailwind CSS, he builds fast, responsive client interfaces, showcased in the AI Smart Campus System and Nur Foodes POS.`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['Show projects using React', 'What backend skills does he have?', 'Contact Shakib'],
    }
  }

  // Any other single verified technology (PHP, n8n, Docker, TypeScript, JavaScript, Tailwind, Supabase)
  if (isBangla) {
    let reply = `হ্যাঁ, নাজমুল শাকিবের **${single.nameBn}**-এ বাস্তব অভিজ্ঞতা রয়েছে। ${single.detailBn}।`
    if (constraints.exactSentences) {
      reply = enforceExactSentenceCount(reply, constraints.exactSentences, true)
    }
    return {
      reply,
      cards: [],
      suggestedQueries: ['তাঁর সেরা প্রজেক্টগুলো দেখাও', 'টেকনোলজি স্ট্যাক কি?', 'যোগাযোগের মাধ্যম'],
    }
  }

  let reply = `Yes, Shakib has verified experience with **${single.nameEn}**. ${single.detailEn}.`
  if (constraints.exactSentences) {
    reply = enforceExactSentenceCount(reply, constraints.exactSentences, false)
  }
  return {
    reply,
    cards: [],
    suggestedQueries: ['Show his best projects', 'What is his tech stack?', 'Contact Shakib'],
  }
}

function handleSingleTechFocus(
  query: string,
  isBangla: boolean,
  constraints: ParsedConstraints
): { reply: string; cards: AiActionCard[]; suggestedQueries: string[] } | null {
  return handleTechnologyInquiry(query, isBangla, constraints)
}

// ============================================================================
// 5. Main Processing & Local Brain
// ============================================================================

export async function processAiMessage(
  query: string,
  history: MessageItem[] = [],
  mode: AiMode = 'all'
): Promise<ChatResponseBody> {
  const cleanQuery = query.trim()
  if (!cleanQuery) {
    return generateLocalResponse('', mode, history)
  }

  // 1. Check for Gemini API Key
  const geminiKey = process.env.GEMINI_API_KEY?.trim()
  if (geminiKey) {
    try {
      const response = await callGeminiApi(cleanQuery, history, geminiKey)
      if (response) {
        const enriched = enrichReplyWithCards(cleanQuery, response, mode)
        return {
          reply: response,
          cards: enriched.cards,
          suggestedQueries: enriched.suggestedQueries,
          provider: 'gemini',
        }
      }
    } catch {
      // Fall through to next provider or local engine
    }
  }

  // 2. Check for OpenAI API Key
  const openaiKey = process.env.OPENAI_API_KEY?.trim()
  if (openaiKey) {
    try {
      const response = await callOpenAiApi(cleanQuery, history, openaiKey)
      if (response) {
        const enriched = enrichReplyWithCards(cleanQuery, response, mode)
        return {
          reply: response,
          cards: enriched.cards,
          suggestedQueries: enriched.suggestedQueries,
          provider: 'openai',
        }
      }
    } catch {
      // Fall through to local engine
    }
  }

  // 3. High-precision Deterministic Knowledge Engine
  return generateLocalResponse(cleanQuery, mode, history)
}

function formatGeminiContents(
  history: MessageItem[],
  query: string
): Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> {
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = []
  let lastRole: 'user' | 'model' | null = null

  const relevantHistory = history.slice(-6)

  for (const m of relevantHistory) {
    const text = m.content?.trim()
    if (!text) continue
    const role: 'user' | 'model' = m.role === 'assistant' ? 'model' : 'user'

    if (contents.length === 0 && role !== 'user') {
      continue
    }

    if (role !== lastRole) {
      contents.push({ role, parts: [{ text }] })
      lastRole = role
    } else {
      contents[contents.length - 1].parts[0].text += `\n\n${text}`
    }
  }

  if (contents.length === 0 || contents[contents.length - 1].role === 'model') {
    contents.push({ role: 'user', parts: [{ text: query }] })
  } else if (contents[contents.length - 1].role === 'user') {
    if (!contents[contents.length - 1].parts[0].text.includes(query)) {
      contents[contents.length - 1].parts[0].text += `\n\n${query}`
    }
  }

  return contents
}

async function callGeminiApi(
  query: string,
  history: MessageItem[],
  apiKey: string
): Promise<string | null> {
  const systemPrompt = getSystemPrompt()
  const contents = formatGeminiContents(history, query)

  const payload = {
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 600,
    },
  }

  const models = ['gemini-2.0-flash', 'gemini-1.5-flash']

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      })

      if (res.ok) {
        const data = (await res.json()) as {
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
        }
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        if (text) return text
      }
    } catch {
      continue
    }
  }

  return null
}

async function callOpenAiApi(
  query: string,
  history: MessageItem[],
  apiKey: string
): Promise<string | null> {
  const systemPrompt = getSystemPrompt()
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
  ]

  const relevantHistory = history.slice(-6)
  for (const m of relevantHistory) {
    if (m.content?.trim()) {
      messages.push({ role: m.role, content: m.content.trim() })
    }
  }

  if (
    messages.length === 1 ||
    messages[messages.length - 1].role !== 'user' ||
    messages[messages.length - 1].content !== query
  ) {
    messages.push({ role: 'user', content: query })
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.3,
        max_tokens: 600,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    })

    if (res.ok) {
      const data = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>
      }
      return data.choices?.[0]?.message?.content?.trim() || null
    }
  } catch {
    // Fall back
  }

  return null
}

/**
 * Selectively attaches cards ONLY when directly relevant.
 */
function enrichReplyWithCards(
  query: string,
  reply: string,
  mode: AiMode
): { cards: AiActionCard[]; suggestedQueries: string[] } {
  const q = query.toLowerCase()
  const cards: AiActionCard[] = []
  let suggested: string[] = []
  const projects = getProjectCardDataList()

  // Avoid dumping project cards during comparisons
  const isComparison = q.includes('compare') || q.includes('vs') || q.includes('difference') || q.includes('তুলনা')

  if (!isComparison) {
    if (q.includes('cv payment') || q.includes('payment reminder') || q.includes('telegram bot')) {
      const proj = projects.find((p) => p.title.toLowerCase().includes('cv payment'))
      if (proj) cards.push({ type: 'project-detail', data: proj })
      suggested = ['Tell me about Securex', 'Show all projects', 'How to hire Shakib?']
    } else if (q.includes('securex') || q.includes('cctv')) {
      const proj = projects.find((p) => p.title.toLowerCase().includes('securex'))
      if (proj) cards.push({ type: 'project-detail', data: proj })
      suggested = ['Tell me about AI Smart Campus System', 'Show all projects', 'How to hire Shakib?']
    } else if (q.includes('smart campus') || q.includes('campus system') || q.includes('cse4204')) {
      const proj = projects.find((p) => p.title.toLowerCase().includes('smart campus'))
      if (proj) cards.push({ type: 'project-detail', data: proj })
      suggested = ['Tell me about CV Payment Reminder', 'What is his tech stack?', 'How to contact him?']
    } else if (q.includes('nur foodes') || q.includes('food software') || q.includes('restaurant pos')) {
      const proj = projects.find((p) => p.title.toLowerCase().includes('nur foodes'))
      if (proj) cards.push({ type: 'project-detail', data: proj })
      suggested = ['Show live demo of Nur Foodes', 'Tell me about Securex', 'How to hire Shakib?']
    } else if (q.includes('resumate') || q.includes('resume builder') || q.includes('ai cv')) {
      const proj = projects.find((p) => p.title.toLowerCase().includes('resumate'))
      if (proj) cards.push({ type: 'project-detail', data: proj })
      suggested = ['Tell me about Securex', 'Show all projects', 'How to contact him?']
    }
  }

  // Project list card ONLY when explicitly requested or in projects mode
  if (
    cards.length === 0 &&
    (q.includes('project') || q.includes('প্রজেক্ট')) &&
    (q.includes('show') || q.includes('list') || q.includes('see') || q.includes('all') || q.includes('গুলো কি') || q.includes('দেখাও') || mode === 'projects')
  ) {
    cards.push({ type: 'project-list', data: projects })
    suggested = ['Tell me about CV Payment Reminder', 'Tell me about Securex', 'Why hire him?']
  }

  // Resume card ONLY when explicitly asked for resume/CV
  if (
    cards.length === 0 &&
    (q.includes('resume') || q.includes('cv') || q.includes('রেজুমে') || q.includes('সিভি') || mode === 'resume')
  ) {
    cards.push({ type: 'resume-card', data: getResumeCardData() })
    suggested = ['View his projects', 'What is his experience?', 'How to hire him?']
  }

  // Hire inquiry ONLY when asked about hiring
  if (
    cards.length === 0 &&
    (q.includes('hire') || q.includes('hire me') || q.includes('হায়ার') || q.includes('start a project') || mode === 'hire')
  ) {
    cards.push({ type: 'hire-inquiry' })
    cards.push({ type: 'contact-direct', data: getContactDirectData() })
    suggested = ['What services does he offer?', 'Download his resume', 'Show his best projects']
  }

  if (suggested.length === 0) {
    suggested = [
      'Who is Shakib?',
      'Show me his best projects',
      'What technologies does he use?',
      'How to contact him?',
    ]
  }

  return { cards, suggestedQueries: suggested }
}

/**
 * High-precision Local Knowledge Engine.
 * Formats direct, factual, constraint-compliant answers without canned loops.
 */
export function generateLocalResponse(
  query: string,
  mode: AiMode = 'all',
  history: MessageItem[] = []
): ChatResponseBody {
  const q = query.toLowerCase().trim()
  const isBangla = detectRequestedLanguage(query, history) === 'bangla'
  const constraints = parseConstraints(query)
  const contextTopic = resolveContextTopic(query, history)

  const projects = getProjectCardDataList()
  const skills = getSkillsData()
  const resume = getResumeCardData()

  // ── 1. Greetings & Salutations ─────────────────────────────────────────────
  if (
    !q ||
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.startsWith('hey ') ||
    q.includes('good morning') ||
    q.includes('good afternoon') ||
    q.includes('good evening') ||
    q.includes('greetings') ||
    q.includes('salam') ||
    q.includes('assalamu alaikum') ||
    q.includes('kemon acho') ||
    q.includes('kemon achen') ||
    q.includes('ki khobor') ||
    q.includes('কেমন আছো') ||
    q.includes('কেমন আছেন') ||
    q.includes('সালাম')
  ) {
    if (isBangla) {
      return {
        reply: `হ্যালো! আমি **Shakib AI**, মোঃ নাজমুল শাকিবের ডিজিটাল পোর্টফোলিও অ্যাসিস্ট্যান্ট। আমি ভালো আছি, ধন্যবাদ! শাকিবের **প্রজেক্ট**, **লারাভেল ও নেক্সট.জেএস ব্যাকএন্ড/ফ্রন্টএন্ড**, **কাজের অভিজ্ঞতা**, বা **যোগাযোগের তথ্য** সম্পর্কে কীভাবে সাহায্য করতে পারি?`,
        cards: [],
        suggestedQueries: [
          'নাজমুল শাকিব কে?',
          'তাঁর সেরা প্রজেক্টগুলো দেখাও',
          'টেকনোলজি স্ট্যাক কি?',
          'যোগাযোগের মাধ্যম',
        ],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Hello! I am **Shakib AI**, the portfolio assistant for **Md. Nazmus Shakib**.\n\nHow can I help you today? You can ask me about Shakib's **Laravel & Next.js projects**, **database engineering**, **experience at Appstick**, or **how to contact him**.`,
      cards: [],
      suggestedQueries: [
        'Who is Shakib?',
        'Show me his best projects',
        'What technologies does he use?',
        'How to contact him?',
      ],
      provider: 'local-brain',
    }
  }

  // ── 2. Unverified Employers & Negative Verification (Priority 1) ───────────
  const unverifiedResult = handleUnverifiedEmployers(query, isBangla, constraints)
  if (unverifiedResult) {
    return { ...unverifiedResult, provider: 'local-brain' }
  }

  // ── 3. Project Comparisons (Priority 2) ────────────────────────────────────
  const projectComparisonResult = handleProjectComparison(query, isBangla, constraints)
  if (projectComparisonResult) {
    return { ...projectComparisonResult, provider: 'local-brain' }
  }

  // ── 4. Technical Framework Comparisons (Priority 3) ────────────────────────
  const frameworkComparisonResult = handleFrameworkComparison(query, isBangla, constraints)
  if (frameworkComparisonResult) {
    return { ...frameworkComparisonResult, provider: 'local-brain' }
  }

  // ── 5. Capability & Yes/No Questions (Priority 4) ───────────────────────────
  const capabilityResult = handleCapabilityInquiry(query, isBangla, constraints)
  if (capabilityResult) {
    return { ...capabilityResult, provider: 'local-brain' }
  }

  // ── 6. Hiring & Actionable Next Steps (Priority 5) ─────────────────────────
  const hiringResult = handleHiringInquiry(query, isBangla, constraints)
  if (hiringResult) {
    return { ...hiringResult, provider: 'local-brain' }
  }

  // ── 7. Technology Inquiries (Multi-tech & Single-tech) ─────────────────────
  const techResult = handleTechnologyInquiry(query, isBangla, constraints)
  if (techResult) {
    return { ...techResult, provider: 'local-brain' }
  }

  // ── 8. Work Experience & Appstick Internship ───────────────────────────────
  const expResult = handleExperienceInquiry(query, isBangla, constraints)
  if (expResult) {
    return { ...expResult, provider: 'local-brain' }
  }

  // ── 8. Specific Project Inquiries ──────────────────────────────────────────
  const specificProjResult = handleSpecificProject(query, isBangla, constraints, contextTopic)
  if (specificProjResult) {
    return { ...specificProjResult, provider: 'local-brain' }
  }

  // ── 9. Direct Contact & Social Links ───────────────────────────────────────
  const contactResult = handleDirectContacts(query, isBangla)
  if (contactResult) {
    return { ...contactResult, provider: 'local-brain' }
  }

  // ── 10. Education, CGPA & Location ─────────────────────────────────────────
  const eduResult = handleEducationAndLocation(query, isBangla, constraints)
  if (eduResult) {
    return { ...eduResult, provider: 'local-brain' }
  }

  // ── 11. Single Technology Inquiry (Laravel, MySQL, Next.js) ────────────────
  const singleTechResult = handleSingleTechFocus(query, isBangla, constraints)
  if (singleTechResult) {
    return { ...singleTechResult, provider: 'local-brain' }
  }

  // ── 12. Show All Projects / General Project List ───────────────────────────
  if (
    q.includes('project') ||
    q.includes('প্রজেক্ট') ||
    q.includes('portfolio') ||
    mode === 'projects'
  ) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিবের প্রধান প্রজেক্টগুলো হলো:\n1. **CV Payment Reminder Automation** — n8n, Google Sheets ও Telegram Bot অটোমেশন\n2. **Securex** — Laravel MVC, MySQL, OAuth 2.0 ও ইনভয়েস ডেলিভারি\n3. **AI Smart Campus System** — Laravel 12 REST API, React/Vite ও জেমিনাই এআই\n4. **Logistica** — সাপ্লাই চেইন প্ল্যাটফর্ম (অ্যাপস্টিক ইন্টার্নশিপ)\n5. **Nur Foodes** — রেস্টুরেন্ট POS ও ERP\n6. **Resumate AI** — নেক্সট.জেএস এআই সিভি বিল্ডার\n\nযেকোনো প্রজেক্টের নাম লিখে বিস্তারিত জানতে চাইতে পারেন!`,
        cards: [{ type: 'project-list', data: projects }],
        suggestedQueries: [
          'CV Payment Reminder Automation সম্পর্কে বলো',
          'Securex সম্পর্কে বলো',
          'AI Smart Campus সম্পর্কে বলো',
          'যোগাযোগের তথ্য',
        ],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Here are Md. Nazmus Shakib's primary engineering projects:\n1. **CV Payment Reminder Automation** — n8n, Google Sheets & Telegram Bot workflow\n2. **Securex** — Laravel MVC, MySQL, OAuth 2.0 & PDF invoice delivery\n3. **AI Smart Campus System** — Laravel 12 REST API, React/Vite, Gemini AI\n4. **Logistica** — Supply chain & operations platform (Appstick internship)\n5. **Nur Foodes** — Restaurant POS & ERP (Vite, JS, ZATCA QR)\n6. **Resumate AI** — AI Resume Builder (Next.js 16, Supabase, Gemini)\n\nAsk for any project by name to see its architectural details!`,
      cards: [{ type: 'project-list', data: projects }],
      suggestedQueries: [
        'Tell me about CV Payment Reminder Automation',
        'Tell me about Securex',
        'Tell me about AI Smart Campus System',
        'How to contact him?',
      ],
      provider: 'local-brain',
    }
  }

  // ── 13. Full Tech Stack / Skills Overview ──────────────────────────────────
  if (
    q.includes('skill') ||
    q.includes('tech stack') ||
    q.includes('technolog') ||
    q.includes('tools') ||
    q.includes('toolkit') ||
    q.includes('ki ki jano') ||
    q.includes('ki ki paro') ||
    q.includes('দক্ষতা')
  ) {
    const showCard =
      q.includes('list') || q.includes('card') || q.includes('matrix') || q.includes('লিস্ট') || q.includes('সব')
    if (isBangla) {
      return {
        reply: `নাজমুল শাকিবের প্রধান টেকনোলজি স্ট্যাক:\n- **ব্যাকএন্ড**: Laravel 12, PHP, RESTful APIs, Sanctum, MVC Architecture\n- **ডেটাবেস**: MySQL, Relational Schema (1NF–3NF), Eloquent ORM, Indexing\n- **ফ্রন্টএন্ড**: Next.js 16, React 19, TypeScript, Tailwind CSS\n- **অটোমেশন ও এআই**: n8n, Docker, Google Gemini ও OpenAI APIs`,
        cards: showCard ? [{ type: 'skills', data: skills }] : [],
        suggestedQueries: ['লারাভেল প্রজেক্ট দেখাও', 'CV Payment Reminder দেখাও', 'যোগাযোগের তথ্য'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Md. Nazmus Shakib's primary engineering stack includes:\n- **Backend & APIs**: Laravel 12, PHP, Laravel Sanctum, RESTful APIs, MVC\n- **Database Architecture**: MySQL, Relational Schema (1NF–3NF), Indexing\n- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS\n- **AI & Automation**: n8n, Docker, Google Gemini & OpenAI APIs`,
      cards: showCard ? [{ type: 'skills', data: skills }] : [],
      suggestedQueries: ['Show projects using Laravel', 'Tell me about CV Payment Reminder', 'How to contact him?'],
      provider: 'local-brain',
    }
  }

  // ── 14. Bio / Who is Shakib ───────────────────────────────────────────────
  if (
    q.includes('who is') ||
    q.includes('who are you') ||
    q.includes('introduce') ||
    q.includes('about shakib') ||
    q.includes('about nazmus') ||
    q.includes('about yourself') ||
    q.includes('bio') ||
    q.includes('tumi ke') ||
    q.includes('tumi ki') ||
    q.includes('apni ke') ||
    q.includes('shakib ke') ||
    q.includes('তুমি কে') ||
    q.includes('আপনি কে') ||
    q.includes('পরিচয়')
  ) {
    if (isBangla) {
      return {
        reply: `আমি **Shakib AI**, মোঃ নাজমুল শাকিবের ডিজিটাল পোর্টফোলিও অ্যাসিস্ট্যান্ট।\n\n**মোঃ নাজমুল শাকিব** একজন ফুল-স্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার (লারাভেল, নেক্সট.জেএস এবং মাইএসকিউএল বিশেষজ্ঞ), খুলনাতে অবস্থান করছেন। তিনি অ্যাপস্টিক টেক ফার্মে ইন্টার্ন হিসেবে কাজ করেছেন এবং নর্দান ইউনিভার্সিটিতে সিএসই ফাইনাল সেমিস্টারে অধ্যয়নরত (CGPA ৩.৬০/৪.০০)।`,
        cards: [],
        suggestedQueries: ['তাঁর সেরা প্রজেক্টগুলো দেখাও', 'ফেসবুক লিংকটা দাও', 'যোগাযোগের মাধ্যম', 'হায়ার করতে চাই'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `I am **Shakib AI**, the portfolio assistant for **Md. Nazmus Shakib**.\n\n**Md. Nazmus Shakib** is a Full Stack Developer specializing in robust Laravel backend systems, normalized MySQL databases, modern Next.js/React frontends, and n8n workflow automations. He is based in Khulna, Bangladesh, and holds a CGPA of 3.60/4.00 in BSc CSE.`,
      cards: [],
      suggestedQueries: ['Show me his best projects', 'Give me Facebook link', 'What technologies does he use?', 'How to hire him?'],
      provider: 'local-brain',
    }
  }

  // ── 15. Resume / CV ────────────────────────────────────────────────────────
  if (
    q.includes('resume') ||
    q.includes('cv') ||
    q.includes('curriculum vitae') ||
    q.includes('রেজুমে') ||
    q.includes('সিভি') ||
    mode === 'resume'
  ) {
    if (isBangla) {
      return {
        reply: `নাজমুল শাকিবের অফিশিয়াল রেজুমে (PDF) ডাউনলোড লিংক:\n\n📄 **রেজুমে ডাউনলোড**: [Nazmus_Shakib_CV.pdf](${portfolioData.resumeDownloadHref})\n\nরেজুমের সারসংক্ষেপ কার্ড নিচে দেওয়া হলো:`,
        cards: [{ type: 'resume-card', data: resume }],
        suggestedQueries: ['প্রজেক্ট দেখাও', 'কাজের অভিজ্ঞতা কেমন?', 'যোগাযোগের তথ্য'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `You can review and download Md. Nazmus Shakib's verified resume (PDF) here:\n\n📄 **Official Resume**: [Nazmus_Shakib_CV.pdf](${portfolioData.resumeDownloadHref})\n\nA summary of his credentials is provided below:`,
      cards: [{ type: 'resume-card', data: resume }],
      suggestedQueries: ['View his projects', 'What is his experience?', 'How to hire him?'],
      provider: 'local-brain',
    }
  }

  // ── 16. Certifications & Formal Training ───────────────────────────────────
  if (
    q.includes('certificat') ||
    q.includes('edge') ||
    q.includes('training') ||
    q.includes('সার্টিফিকেট')
  ) {
    if (isBangla) {
      return {
        reply: `নাজমুল শাকিব খুলনা বিশ্ববিদ্যালয়ে আইসিটি ডিভিশনের EDGE প্রকল্পের অধীনে **৮০ ঘণ্টার প্রফেশনাল পিএইচপি ও লারাভেল ট্রেনিং** সম্পন্ন করেছেন। এছাড়াও তিনি প্রোগ্রামিং হিরো ওয়েব ডেভেলপমেন্ট বুটক্যাম্প সনদপ্রাপ্ত।`,
        cards: [{ type: 'resume-card', data: resume }],
        suggestedQueries: ['লারাভেল প্রজেক্ট দেখাও', 'পড়াশোনা ও সিজিপিএ', 'হায়ার করতে চাই'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Md. Nazmus Shakib completed **80 hours of formal PHP & Laravel training** under the EDGE Project (ICT Division) at Khulna University, along with the Programming Hero Web Development Bootcamp and competitive programming certifications.`,
      cards: [{ type: 'resume-card', data: resume }],
      suggestedQueries: ['Tell me about his Laravel projects', 'Explain his education', 'How to hire him?'],
      provider: 'local-brain',
    }
  }

  // ── 17. Publications & Research ───────────────────────────────────────────
  if (
    q.includes('publication') ||
    q.includes('research') ||
    q.includes('zenodo') ||
    q.includes('doi') ||
    q.includes('গবেষণা')
  ) {
    const pubs = portfolioData.publications.map((p) => ({
      title: p.title,
      publisher: p.publisher,
      doi: p.doi,
      url: p.url,
    }))
    if (isBangla) {
      return {
        reply: `নাজমুল শাকিবের জেনোডো (Zenodo)-তে প্রকাশিত গবেষণাপত্র:\n1. **SecureX Technical Report** (DOI: 10.5281/zenodo.21893082)\n2. **Machine Learning for Liver Disease Severity Prediction** (DOI: 10.5281/zenodo.21980753)`,
        cards: [{ type: 'publications', data: pubs }],
        suggestedQueries: ['Securex প্রজেক্ট দেখাও', 'অন্যান্য প্রজেক্ট দেখাও', 'যোগাযোগের তথ্য'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Md. Nazmus Shakib has co-authored technical research publications on Zenodo:\n1. **SecureX: A CCTV & Security Service Booking and Management System** (DOI: 10.5281/zenodo.21893082)\n2. **Explainable and Bias-Aware Machine Learning for Liver Disease Severity Prediction** (DOI: 10.5281/zenodo.21980753)`,
      cards: [{ type: 'publications', data: pubs }],
      suggestedQueries: ['Tell me about Securex', 'Show all projects', 'How to contact him?'],
      provider: 'local-brain',
    }
  }

  // ── 18. Thank you & Courtesy ──────────────────────────────────────────────
  if (
    q.includes('thank') ||
    q.includes('thanks') ||
    q.includes('bye') ||
    q.includes('goodbye') ||
    q.includes('ধন্যবাদ')
  ) {
    if (isBangla) {
      return {
        reply: `আপনাকে অনেক ধন্যবাদ! যেকোনো সময় শাকিবের প্রজেক্ট বা কাজের ব্যাপারে প্রশ্ন করতে পারেন। আপনার দিনটি শুভ হোক!`,
        cards: [],
        suggestedQueries: ['সেরা প্রজেক্ট দেখাও', 'রেজুমে ডাউনলোড', 'নাজমুল শাকিব কে?'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `You are very welcome! If you have any further questions or wish to discuss an opportunity, feel free to reach out anytime. Have a great day!`,
      cards: [],
      suggestedQueries: ['Show his best projects', 'Download his resume', 'Who is Shakib?'],
      provider: 'local-brain',
    }
  }

  // ── 19. Intelligent Dynamic Fallback (Grounded in Verified Facts) ──────────
  if (isBangla) {
    return {
      reply: `আমি **Shakib AI**, মোঃ নাজমুল শাকিবের ডিজিটাল পোর্টফোলিও অ্যাসিস্ট্যান্ট।\n\nআপনি নাজমুল শাকিবের **প্রজেক্ট (Securex, AI Smart Campus, CV Payment Reminder)**, **টেকনোলজি স্ট্যাক (লারাভেল, নেক্সট.জেএস, মাইএসকিউএল, n8n)**, **অ্যাপস্টিক ইন্টার্নশিপ**, বা **হায়ার ও যোগাযোগের তথ্য** সম্পর্কে যেকোনো নির্দিষ্ট প্রশ্ন করতে পারেন।`,
      cards: [],
      suggestedQueries: [
        'তাঁর সেরা প্রজেক্টগুলো দেখাও',
        'টেকনোলজি স্ট্যাক কি?',
        'হায়ার করতে চাই',
        'যোগাযোগের মাধ্যম',
      ],
      provider: 'local-brain',
    }
  }

  return {
    reply: `I am **Shakib AI**, the portfolio assistant for **Md. Nazmus Shakib**.\n\nYou can ask me specific questions about Shakib's **projects (Securex, AI Smart Campus, CV Payment Reminder)**, **technical stack (Laravel, Next.js, MySQL, n8n)**, **Appstick internship experience**, or **how to hire and contact him**.`,
    cards: [],
    suggestedQueries: [
      'Show me his best projects',
      'What technologies does he use?',
      'I want to hire Shakib. What should I do next?',
      'How to contact him?',
    ],
    provider: 'local-brain',
  }
}
