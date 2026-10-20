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

interface MessageItem {
  role: 'user' | 'assistant'
  content: string
}

export async function processAiMessage(
  query: string,
  history: MessageItem[] = [],
  mode: AiMode = 'all'
): Promise<ChatResponseBody> {
  const cleanQuery = query.trim()
  if (!cleanQuery) {
    return generateLocalResponse('', mode)
  }

  // 1. Check for Gemini API Key first
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

  // 3. High-precision Local Knowledge Reasoning Engine
  return generateLocalResponse(cleanQuery, mode)
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
 * Natural language detector for Bangla script and common Banglish transliterations.
 */
export function isBanglaOrBanglish(text: string): boolean {
  if (!text) return false
  // Check for Bengali Unicode characters
  if (/[\u0980-\u09FF]/.test(text)) return true

  // Common Banglish patterns
  const banglishPatterns = [
    /\b(kemon|acho|achen|achi|valo|bhalo|ki\s*khobor|khbr)\b/i,
    /\b(daw|dao|den|diben|dibo|dite|korbo|kore|koro|koren|bolo|bolen|bolte|janan|dekhaw|dekhao)\b/i,
    /\b(apnar|apni|tumi|tomar|amr|amar|shakib\s*er|shakiber|shomporke|somporke)\b/i,
    /\b(bistarito|kothay|kothai|koto|keno|kobe|kivabe|ki\s*ki)\b/i,
    /\b(thako|thaken|bari|porashona|porasuna|chakri|jogajog|prokolpo)\b/i,
  ]
  return banglishPatterns.some((pattern) => pattern.test(text))
}

/**
 * Detects if the user is explicitly requesting a detailed / in-depth response.
 */
export function isDetailRequested(text: string): boolean {
  if (!text) return false
  const detailPatterns = [
    /\b(detail|details|detailed|elaborate|deep\s*dive|in-depth|explain\s*in\s*detail|breakdown|architecture)\b/i,
    /\b(step\s*by\s*step|how\s*it\s*works|how\s*does\s*it\s*work)\b/i,
    /(বিস্তারিত|ব্যাখ্যা|বিশদ|সবকিছু|ভেঙ্গে\s*বলো|কীভাবে\s*কাজ\s*করে)/i,
  ]
  return detailPatterns.some((pattern) => pattern.test(text))
}

/**
 * Selectively attaches cards ONLY when directly relevant to the user's intent.
 * Avoids dumping unrelated cards on simple questions.
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

  // 1. Specific project detail card
  if (
    q.includes('n8n') ||
    q.includes('cv payment') ||
    q.includes('payment reminder') ||
    q.includes('telegram bot')
  ) {
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
  } else if (q.includes('logistica')) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('logistica'))
    if (proj) cards.push({ type: 'project-detail', data: proj })
    suggested = ['Tell me about his internship', 'Show his best projects', 'Contact Shakib']
  } else if (q.includes('library') || q.includes('book checkout')) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('library'))
    if (proj) cards.push({ type: 'project-detail', data: proj })
    suggested = ['Show all projects', 'What backend skills does he have?', 'How to hire Shakib?']
  } else if (q.includes('nur foodes') || q.includes('food software') || q.includes('restaurant pos')) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('nur foodes'))
    if (proj) cards.push({ type: 'project-detail', data: proj })
    suggested = ['Show live demo of Nur Foodes', 'Tell me about Securex', 'How to hire Shakib?']
  } else if (q.includes('resumate') || q.includes('resume builder') || q.includes('ai cv')) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('resumate'))
    if (proj) cards.push({ type: 'project-detail', data: proj })
    suggested = ['Tell me about Securex', 'Show all projects', 'How to contact him?']
  }
  // 2. Project list card ONLY when explicitly requested or in projects mode
  else if (
    (q.includes('project') || q.includes('প্রজেক্ট')) &&
    (q.includes('show') || q.includes('list') || q.includes('see') || q.includes('all') || q.includes('গুলো কি') || q.includes('দেখাও') || mode === 'projects')
  ) {
    cards.push({ type: 'project-list', data: projects })
    suggested = ['Tell me about CV Payment Reminder', 'Tell me about Securex', 'Why hire him?']
  }
  // 3. Skills card ONLY when explicitly requested
  else if (
    q.includes('skill list') ||
    q.includes('skills list') ||
    q.includes('show skills') ||
    q.includes('all skills') ||
    q.includes('skills matrix') ||
    q.includes('স্কিল লিস্ট') ||
    q.includes('সব স্কিল')
  ) {
    cards.push({ type: 'skills', data: getSkillsData() })
    suggested = ['Show me his best projects', 'Tell me about his experience', 'How to contact him?']
  }
  // 4. Resume card ONLY when explicitly asked for resume/CV
  else if (
    q.includes('resume') ||
    q.includes('cv') ||
    q.includes('রেজুমে') ||
    q.includes('সিভি') ||
    mode === 'resume'
  ) {
    cards.push({ type: 'resume-card', data: getResumeCardData() })
    suggested = ['View his projects', 'What is his experience?', 'How to hire him?']
  }
  // 5. Contact card ONLY when asked for general contact or multiple channels
  else if (
    (q.includes('contact') || q.includes('jogajog') || q.includes('যোগাযোগ') || q.includes('reach out')) &&
    !q.includes('facebook') &&
    !q.includes('fb')
  ) {
    cards.push({ type: 'contact-direct', data: getContactDirectData() })
    suggested = ['Give me Facebook link', 'Show his WhatsApp number', 'Download his resume']
  }
  // 6. Hire inquiry ONLY when asked about hiring
  else if (
    q.includes('hire') ||
    q.includes('hire me') ||
    q.includes('হায়ার') ||
    q.includes('start a project') ||
    mode === 'hire'
  ) {
    cards.push({ type: 'hire-inquiry' })
    cards.push({ type: 'contact-direct', data: getContactDirectData() })
    suggested = ['What services does he offer?', 'Download his resume', 'Show his best projects']
  } else {
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
 * Local Knowledge Reasoning Engine.
 * - Gives short, direct, natural answers (3–5 lines by default).
 * - Detailed explanations only when requested.
 * - Answers the exact question directly without unrelated information dumps.
 * - Supports both Bangla and English fluently.
 * - Shows cards only when strictly relevant.
 */
export function generateLocalResponse(query: string, mode: AiMode = 'all'): ChatResponseBody {
  const q = query.toLowerCase().trim()
  const isBangla = isBanglaOrBanglish(query)
  const isDetailed = isDetailRequested(query)

  const projects = getProjectCardDataList()
  const skills = getSkillsData()
  const resume = getResumeCardData()
  const contact = getContactDirectData()

  // ── 1. Greetings & Small Talk ──────────────────────────────────────────────
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
        reply: `হ্যালো! আমি **Shakib AI**, মোঃ নাজমুল শাকিবের পোর্টফোলিও অ্যাসিস্ট্যান্ট।\n\nআমি ভালো আছি, ধন্যবাদ! শাকিবের **প্রজেক্ট**, **লারাভেল ও নেক্সট.জেএস স্কিল**, **কাজের অভিজ্ঞতা**, বা **যোগাযোগের তথ্য** সম্পর্কে কীভাবে সাহায্য করতে পারি?`,
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

  // ── 2. Facebook Profile (Direct Answer: no unrelated info, no extra cards) ──
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
        provider: 'local-brain',
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
      provider: 'local-brain',
    }
  }

  // ── 3. WhatsApp & Direct Phone ─────────────────────────────────────────────
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
        provider: 'local-brain',
      }
    }
    return {
      reply: `You can reach Md. Nazmus Shakib directly via Phone or WhatsApp:\n\n- 📞 **Phone**: [${portfolioData.phone}](tel:${portfolioData.phone})\n- 💬 **WhatsApp**: [Chat on WhatsApp](${socialLinks.whatsapp})\n\nAvailable for engineering discussions and new project inquiries!`,
      cards: [],
      suggestedQueries: ['Give me Facebook link', 'Show his LinkedIn profile', 'Send an email', 'How to hire him?'],
      provider: 'local-brain',
    }
  }

  // ── 4. LinkedIn Profile ────────────────────────────────────────────────────
  if (q.includes('linkedin') || q.includes('linked in') || q.includes('লিঙ্কডইন')) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিবের অফিশিয়াল লিঙ্কডইন প্রোফাইল লিংক:\n\n💼 **LinkedIn**: [${socialLinks.linkedin}](${socialLinks.linkedin})\n\nপ্রফেশনাল নেটওয়ার্কিং ও ক্যারিয়ার সংযোগের জন্য কানেক্ট করতে পারেন।`,
        cards: [],
        suggestedQueries: ['ফেসবুক লিংকটা দাও', 'হোয়াটসঅ্যাপ নাম্বার দাও', 'প্রজেক্ট দেখাও', 'রেজুমে ডাউনলোড'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Here is Md. Nazmus Shakib's verified LinkedIn profile:\n\n💼 **LinkedIn**: [${socialLinks.linkedin}](${socialLinks.linkedin})\n\nFeel free to connect for professional networking and engineering opportunities!`,
      cards: [],
      suggestedQueries: ['Give me Facebook link', 'Give me WhatsApp number', 'Show his best projects', 'Download his resume'],
      provider: 'local-brain',
    }
  }

  // ── 5. GitHub Profile ──────────────────────────────────────────────────────
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
        provider: 'local-brain',
      }
    }
    return {
      reply: `Here is Md. Nazmus Shakib's GitHub profile:\n\n🐙 **GitHub**: [github.com/${portfolioData.githubUsername}](${portfolioData.githubUrl})\n\nYou can inspect the open-source code for his Laravel, Next.js, and automation projects.`,
      cards: [],
      suggestedQueries: ['Tell me about Securex', 'Tell me about CV Payment Reminder', 'What technologies does he use?'],
      provider: 'local-brain',
    }
  }

  // ── 6. Email Address ───────────────────────────────────────────────────────
  if (q.includes('email') || q.includes('gmail') || q.includes('mail') || q.includes('ইমেইল')) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিবের অফিসিয়াল ইমেইল অ্যাড্রেস:\n\n📧 **ইমেইল**: [${portfolioData.email}](mailto:${portfolioData.email})\n\nযেকোনো প্রজেক্ট রিকোয়ারমেন্ট বা কাজের প্রয়োজনে সরাসরি ইমেইল পাঠাতে পারেন।`,
        cards: [],
        suggestedQueries: ['ফেসবুক লিংকটা দাও', 'হোয়াটসঅ্যাপ নাম্বার দাও', 'রেজুমে ডাউনলোড', 'প্রজেক্ট দেখাও'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `You can email Md. Nazmus Shakib directly at:\n\n📧 **Email**: [${portfolioData.email}](mailto:${portfolioData.email})\n\nHe responds promptly to project inquiries and engineering opportunities.`,
      cards: [],
      suggestedQueries: ['Give me Facebook link', 'Give me WhatsApp number', 'Download his resume', 'Show me his best projects'],
      provider: 'local-brain',
    }
  }

  // ── 7. General Contacts / Reach Out / Jogajog ─────────────────────────────
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
        provider: 'local-brain',
      }
    }
    return {
      reply: `Here are the verified contact channels for **Md. Nazmus Shakib**:\n\n- 📧 **Email**: [${portfolioData.email}](mailto:${portfolioData.email})\n- 📞 **Phone / WhatsApp**: [${portfolioData.phone}](tel:${portfolioData.phone})\n- 📍 **Location**: ${portfolioData.location} (${portfolioData.availability})`,
      cards: [{ type: 'contact-direct', data: contact }],
      suggestedQueries: ['Give me Facebook link', 'Download his resume', 'Why should I hire him?'],
      provider: 'local-brain',
    }
  }

  // ── 8. Location & Residence ────────────────────────────────────────────────
  if (
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
  ) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিব বর্তমানে **খুলনা, বাংলাদেশ**-এ অবস্থান করছেন (হোমটাউন: সাতক্ষীরা)।\n\nতিনি খুলনা/ঢাকায় অন-সাইট রোলের পাশাপাশি বিশ্বব্যাপী রিমোট প্রজেক্টে কাজ করতে প্রস্তুত।`,
        cards: [],
        suggestedQueries: ['যোগাযোগের মাধ্যম', 'সেরা প্রজেক্ট দেখাও', 'কেন তাঁকে হায়ার করবেন?'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Md. Nazmus Shakib is based in **Khulna, Bangladesh** (Hometown: Satkhira).\n\nHe is available for on-site roles in Khulna/Dhaka as well as remote engineering positions worldwide.`,
      cards: [],
      suggestedQueries: ['How to contact him?', 'Show his best projects', 'Why should I hire him?'],
      provider: 'local-brain',
    }
  }

  // ── 9. Academic Education & CGPA ───────────────────────────────────────────
  if (
    q.includes('education') ||
    q.includes('cgpa') ||
    q.includes('gpa') ||
    q.includes('university') ||
    q.includes('nubtk') ||
    q.includes('degree') ||
    q.includes('academic') ||
    q.includes('bsc') ||
    q.includes('cse') ||
    q.includes('coursework') ||
    q.includes('graduation') ||
    q.includes('study') ||
    q.includes('porashona') ||
    q.includes('varsity') ||
    q.includes('versity') ||
    q.includes('পড়াশোনা') ||
    q.includes('রেজাল্ট')
  ) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিব নর্দান ইউনিভার্সিটি অব বিজনেস অ্যান্ড টেকনোলজি খুলনা (NUBTK)-তে **কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (BSc in CSE)**-এর ফাইনাল সেমিস্টারে অধ্যয়নরত।\n\n- 🎓 **বর্তমান CGPA**: **৩.৬০ / ৪.০০**\n- 📅 **গ্র্যাজুয়েশন**: ২০২৬\n- 📚 **পূর্ববর্তী ফলাফল**: HSC (GPA ৫.০০) এবং SSC (GPA ৫.০০)`,
        cards: q.includes('card') || q.includes('দেখাও') ? [{ type: 'resume-card', data: resume }] : [],
        suggestedQueries: ['সার্টিফিকেশন কি কি আছে?', 'কাজের অভিজ্ঞতা কেমন?', 'রেজুমে ডাউনলোড'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Md. Nazmus Shakib is in his final semester of **BSc in Computer Science & Engineering** at Northern University of Business and Technology Khulna.\n\n- 🎓 **Current CGPA**: **3.60 / 4.00**\n- 📅 **Expected Graduation**: 2026\n- 📚 **Prior Academics**: HSC (GPA 5.00/5.00) & SSC (GPA 5.00/5.00)`,
      cards: q.includes('card') || q.includes('show') ? [{ type: 'resume-card', data: resume }] : [],
      suggestedQueries: ['What certifications does he hold?', 'Tell me about his experience', 'Download his resume'],
      provider: 'local-brain',
    }
  }

  // ── 10. Work Experience & Appstick Internship ──────────────────────────────
  if (
    q.includes('experience') ||
    q.includes('internship') ||
    q.includes('appstick') ||
    q.includes('work history') ||
    q.includes('job') ||
    q.includes('career') ||
    q.includes('chakri') ||
    q.includes('অভিজ্ঞতা') ||
    q.includes('ইন্টার্নশিপ') ||
    q.includes('চাকরি')
  ) {
    if (isDetailed) {
      if (isBangla) {
        return {
          reply: `### **অ্যাপস্টিক টেক ফার্মে ইন্টার্নশিপ অভিজ্ঞতা**\n\nমোঃ নাজমুল শাকিব **অ্যাপস্টিক টেক ফার্মে (Appstick Tech Firm)** ব্যাকএন্ড ডেভেলপার ইন্টার্ন হিসেবে কাজ করেছেন (সেপ্টেম্বর ২০২৫ – ডিসেম্বর ২০২৫, খুলনা)।\n\n**মূল দায়িত্বসমূহ:**\n- **লারাভেল ও পিএইচপি ব্যাকএন্ড**: লারাভেল এমভিসি স্ট্রাকচার ও রিইউজেবল বিজনেস লজিক বাস্তবায়ন।\n- **ডেটাবেস ইন্টিগ্রিটি**: মাইএসকিউএল রিলেশনাল স্কিমা তৈরি ও ৩এনএফ ডেটা ইন্টিগ্রিটি যাচাই।\n- **রেস্ট এপিআই ও সিকিউরিটি**: স্যাঙ্কটাম অথেন্টিকেশন ও সুরক্ষিত এপিআই এন্ডপয়েন্ট তৈরি।\n- **Logistica প্ল্যাটফর্ম**: সাপ্লাই চেইন ও শিপমেন্ট ট্র্যাকিং ফিচার বাস্তবায়নে অবদান।\n- **টিম কোলাবোরেশন**: এজাইল স্প্রিন্টে গিট ও গিটহাব ব্যবহার করে কোড রিভিউ সম্পন্ন।`,
          cards: [{ type: 'resume-card', data: resume }],
          suggestedQueries: ['Logistica প্রজেক্ট সম্পর্কে বলো', 'লারাভেল স্কিল কি কি?', 'রেজুমে ডাউনলোড'],
          provider: 'local-brain',
        }
      }
      return {
        reply: `### **Professional Experience at Appstick Tech Firm**\n\nMd. Nazmus Shakib served as a **Backend Developer Intern at Appstick Tech Firm** (September 2025 – December 2025, Khulna).\n\n**Key Responsibilities & Impact:**\n- **Laravel & PHP Backend**: Built clean MVC application logic and modular service layers.\n- **Database Architecture**: Designed normalized 3NF MySQL schemas and ensured relational data integrity.\n- **Secure APIs**: Created structured RESTful endpoints with Laravel Sanctum authentication.\n- **Logistica Project**: Developed backend consignment tracking and status workflow features.\n- **Agile Collaboration**: Worked in team sprints using Git, GitHub branching, and code reviews.`,
        cards: [{ type: 'resume-card', data: resume }],
        suggestedQueries: ['Tell me about Logistica', 'What backend skills does he have?', 'Download his resume'],
        provider: 'local-brain',
      }
    }

    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিব **অ্যাপস্টিক টেক ফার্মে (Appstick Tech Firm)** ব্যাকএন্ড ডেভেলপার ইন্টার্ন হিসেবে দায়িত্ব পালন করেছেন (সেপ্টেম্বর ২০২৫ – ডিসেম্বর ২০২৫)।\n\nসেখানে তিনি লারাভেল এমভিসি আর্কিটেকচার, সিকিউর রেস্ট এপিআই, ৩এনএফ মাইএসকিউএল ডেটাবেস এবং **Logistica** প্ল্যাটফর্মে টিম স্প্রিন্টে কাজ করেছেন।\n\nবিস্তারিত দায়িত্ব ও অর্জন জানতে চাইলে বলতে পারেন!`,
        cards: [],
        suggestedQueries: ['অ্যাপস্টিক ইন্টার্নশিপের বিস্তারিত বলো', 'Logistica প্রজেক্ট দেখাও', 'রেজুমে ডাউনলোড'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Md. Nazmus Shakib worked as a **Backend Developer Intern at Appstick Tech Firm** (September 2025 – December 2025, Khulna).\n\nHe engineered Laravel MVC backend systems, developed secure REST APIs with Sanctum, optimized normalized MySQL databases, and worked on the **Logistica** supply chain platform in an Agile team.\n\nAsk if you would like a detailed breakdown of his responsibilities!`,
      cards: [],
      suggestedQueries: ['Explain his internship in detail', 'Show Logistica project', 'Download his resume'],
      provider: 'local-brain',
    }
  }

  // ── 11. Specific Projects ──────────────────────────────────────────────────
  // 11a. CV Payment Reminder Automation (n8n, Google Sheets, Telegram)
  if (
    q.includes('n8n') ||
    q.includes('cv payment') ||
    q.includes('payment reminder') ||
    q.includes('telegram bot') ||
    q.includes('automation') ||
    q.includes('অটোমেশন')
  ) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('cv payment'))!
    if (isDetailed) {
      if (isBangla) {
        return {
          reply: `### **CV Payment Reminder Automation — n8n আর্কিটেকচার**\n\nএটি ডকারে চালিত একটি শিডিউলড অটোমেশন পাইপলাইন যা ক্লায়েন্ট বিলিং লাইফসাইকেল স্বয়ংক্রিয় করে:\n\n1. **শিডিউল ট্রিগার**: নিয়মিত নির্দিষ্ট সময়ে পেমেন্ট অডিট শুরু করে।\n2. **গুগল শিট নোড**: ক্লায়েন্টের বকেয়া পেমেন্ট রেকর্ড স্বয়ংক্রিয়ভাবে পড়ে।\n3. **কন্ডিশনাল IF লজিক**: পেমেন্ট স্ট্যাটাস এবং বকেয়া দিন যাচাই করে ফিল্টার করে।\n4. **টেলিগ্রাম বট এপিআই**: নির্ধারিত ক্লায়েন্টকে ফরম্যাটেড মেসেজ পাঠায়।\n5. **রো আপডেট**: ডুপ্লিকেট নোটিফিকেশন বন্ধে গুগল শিটে কনফার্মেশন টাইমস্ট্যাম্প সংরক্ষণ করে।`,
          cards: [{ type: 'project-detail', data: proj }],
          suggestedQueries: ['Securex সম্পর্কে বলো', 'অন্যান্য প্রজেক্ট দেখাও', 'হায়ার করতে চাই'],
          provider: 'local-brain',
        }
      }
      return {
        reply: `### **CV Payment Reminder Automation — n8n Architecture**\n\nA containerized Docker workflow automating client billing reminders:\n\n1. **Schedule Trigger**: Periodically triggers automated payment check cycles.\n2. **Google Sheets Node**: Securely queries pending invoice rows via Google Cloud API.\n3. **Conditional IF Logic**: Evaluates overdue and unnotified client criteria.\n4. **Telegram Bot API**: Formats and dispatches instant reminder messages.\n5. **Row Update**: Writes confirmation timestamps back to Google Sheets to ensure idempotency.`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['Tell me about Securex', 'Show all projects', 'How to hire him?'],
        provider: 'local-brain',
      }
    }

    if (isBangla) {
      return {
        reply: `**CV Payment Reminder Automation** হলো ডকারে চালিত একটি শিডিউলড n8n অটোমেশন ওয়ার্কফ্লো।\n\nএটি গুগল শিট থেকে ক্লায়েন্টের বকেয়া পেমেন্ট রেকর্ড পড়ে, শর্তানুযায়ী ফিল্টার করে টেলিগ্রাম বট এপিআই-এর মাধ্যমে নোটিফিকেশন পাঠায় এবং স্প্রেডশিটে কনফার্মেশন টাইমস্ট্যাম্প আপডেট করে।\n\n*ব্যবহৃত টেকনোলজি: n8n, Google Sheets, Telegram Bot API, Docker.*`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['CV Payment Reminder বিস্তারিত ব্যাখ্যা করো', 'Securex প্রজেক্ট দেখাও', 'অন্যান্য প্রজেক্ট'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `**CV Payment Reminder Automation** is a scheduled n8n automation pipeline running in Docker.\n\nIt queries client billing records from Google Sheets, evaluates payment conditions with IF logic, dispatches automated Telegram reminders via Bot API, and updates spreadsheet records with confirmation timestamps.\n\n*Tech Stack: n8n, Google Sheets, Telegram Bot API, Docker.*`,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Explain CV Payment Reminder in detail', 'Tell me about Securex', 'Show all projects'],
      provider: 'local-brain',
    }
  }

  // 11b. Securex
  if (q.includes('securex') || q.includes('cctv') || q.includes('security service')) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('securex'))!
    if (isDetailed) {
      if (isBangla) {
        return {
          reply: `### **Securex — সিসিটিভি ও সিকিউরিটি সার্ভিস প্ল্যাটফর্ম**\n\nলারাভেল এমভিসি এবং মাইএসকিউএল দিয়ে নির্মিত ফুল-স্ট্যাক প্ল্যাটফর্ম:\n- **অথেন্টিকেশন**: Google OAuth 2.0 ও ক্রেডেনশিয়াল লগইন (Sanctum)।\n- **স্মার্ট বুকিং লজিক**: টাইম-স্লট কনফ্লিক্ট ডিটেকশন ও বিকল্প স্লট সাজেশন।\n- **অটোমেশন**: বুকিং কনফার্মেশনের সাথে সাথে স্বয়ংক্রিয় এসএমটিপি ইমেইল পাঠানো।\n- **ইনভয়েস**: ডায়নামিক পিডিএফ ইনভয়েস জেনারেশন ও ডাউনলোড।\n- **ভূমিকা-ভিত্তিক নিয়ন্ত্রণ**: ক্লায়েন্ট ও অ্যাডমিন পৃথক পোর্টাল।`,
          cards: [{ type: 'project-detail', data: proj }],
          suggestedQueries: ['AI Smart Campus সম্পর্কে বলো', 'অন্যান্য প্রজেক্ট দেখাও', 'গিটহাব কোড দেখাও'],
          provider: 'local-brain',
        }
      }
      return {
        reply: `### **Securex — Security Service Management Platform**\n\nA full-stack Laravel MVC and MySQL application:\n- **Authentication**: Google OAuth 2.0 and credential authentication via Sanctum.\n- **Conflict-Aware Booking**: Smart algorithm that detects overlapping time-slots and suggests alternatives.\n- **Automated Workflow**: Dispatches transactional SMTP emails with dynamic PDF invoices.\n- **RBAC**: Multi-tenant admin review dashboard and client self-service portal.\n- **GitHub**: [github.com/nazmusshakib878/Securex](https://github.com/nazmusshakib878/Securex)`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['Tell me about AI Smart Campus', 'Show all projects', 'How to hire him?'],
        provider: 'local-brain',
      }
    }

    if (isBangla) {
      return {
        reply: `**Securex** হলো লারাভেল এমভিসি ও মাইএসকিউএল দিয়ে তৈরি একটি সিসিটিভি ও সিকিউরিটি সার্ভিস ম্যানেজমেন্ট সিস্টেম।\n\nএতে গুগল ওঅথ ২.০ (Google OAuth 2.0), কনফ্লিক্ট-অ্যাওয়ার বুকিং স্লট ম্যানেজমেন্ট, স্বয়ংক্রিয় এসএমটিপি ইমেইল এবং ডায়নামিক পিডিএফ ইনভয়েস তৈরির সুবিধা রয়েছে।\n\n*গিটহাব: [github.com/nazmusshakib878/Securex](https://github.com/nazmusshakib878/Securex)*`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['Securex বিস্তারিত ব্যাখ্যা করো', 'AI Smart Campus দেখাও', 'অন্যান্য প্রজেক্ট'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `**Securex** is a full-stack security service management platform built with Laravel MVC and MySQL.\n\nIt features Google OAuth 2.0 and Sanctum authentication, conflict-aware time-slot booking logic, automated SMTP transactional emails, and dynamic PDF invoice generation.\n\n*GitHub: [github.com/nazmusshakib878/Securex](https://github.com/nazmusshakib878/Securex)*`,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Explain Securex in detail', 'Tell me about AI Smart Campus System', 'Show all projects'],
      provider: 'local-brain',
    }
  }

  // 11c. AI Smart Campus System
  if (
    q.includes('smart campus') ||
    q.includes('campus system') ||
    (q.includes('campus') && !q.includes('education') && !q.includes('university')) ||
    q.includes('ai smart') ||
    q.includes('cse4204')
  ) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('smart campus'))!
    if (isBangla) {
      return {
        reply: `**AI Smart Campus System** হলো একটি আধুনিক ক্যাম্পাস ম্যানেজমেন্ট প্ল্যাটফর্ম যেখানে নাজমুল শাকিব **টিম লিডার ও ডেটাবেস লিড** ছিলেন।\n\nএতে রিঅ্যাক্ট/ভাইট ফ্রন্টএন্ডের সাথে লারাভেল ১২ রেস্ট এপিআই, স্যাঙ্কটাম অথেন্টিকেশন, ৩এনএফ মাইএসকিউএল ডেটাবেস এবং জেমিনাই/ওপেনএআই এপিআই সমন্বিত রয়েছে।\n\n*লাইভ ডেমো: [ai-smart-campus-system-ce9i.onrender.com](https://ai-smart-campus-system-ce9i.onrender.com/)*`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['Securex প্রজেক্ট দেখাও', 'CV Payment Reminder দেখাও', 'অন্যান্য প্রজেক্ট'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `**AI Smart Campus System** is an academic management platform where Shakib served as **Team Leader & Database Lead**.\n\nIt connects a React/Vite frontend with a secure Laravel 12 REST API, featuring Sanctum auth, normalized 3NF MySQL schema, and Google Gemini/OpenAI API integrations for student assistance.\n\n*Live Demo: [ai-smart-campus-system-ce9i.onrender.com](https://ai-smart-campus-system-ce9i.onrender.com/)*`,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Tell me about Securex', 'Tell me about CV Payment Reminder', 'Show all projects'],
      provider: 'local-brain',
    }
  }

  // 11d. Logistica
  if (q.includes('logistica')) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('logistica'))!
    if (isBangla) {
      return {
        reply: `**Logistica** হলো অ্যাপস্টিক টেক ফার্মে ইন্টার্নশিপের সময় লারাভেল এমভিসি ও মাইএসকিউএল দিয়ে তৈরি একটি সাপ্লাই চেইন ও লজিস্টিকস প্ল্যাটফর্ম।\n\nএটি পার্সেল ট্র্যাকিং, ইনভেন্টরি ম্যানেজমেন্ট এবং ডেলিভারি স্ট্যাটাস ওয়ার্কফ্লো পরিচালনা করে।`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['অ্যাপস্টিক ইন্টার্নশিপ সম্পর্কে বলো', 'অন্যান্য প্রজেক্ট দেখাও', 'যোগাযোগের তথ্য'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `**Logistica** is an enterprise supply chain and logistics management application built with Laravel MVC and MySQL during Shakib's internship at Appstick Tech Firm.\n\nIt handles consignment tracking, inventory management, status workflows, and relational data integrity.`,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Tell me about his internship', 'Show his best projects', 'Contact Shakib'],
      provider: 'local-brain',
    }
  }

  // 11e. Library Management
  if (q.includes('library') || q.includes('লাইব্রেরি')) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('library'))!
    if (isBangla) {
      return {
        reply: `**Library Management System** হলো পিএইচপি ও মাইএসকিউএল (3NF নরম্যালাইজড) দিয়ে তৈরি একটি লাইব্রেরি ম্যানেজমেন্ট সিস্টেম।\n\nএটি বই ধার দেওয়া, ক্যাটালগ সার্চ, জরিমানা হিসাব এবং স্টুডেন্ট রোল ম্যানেজমেন্ট পরিচালনা করে।`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['অন্যান্য প্রজেক্ট দেখাও', 'ব্যাকএন্ড স্কিল কি কি?', 'হায়ার করতে চাই'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `**Library Management System** is a database-driven application built with PHP, Laravel concepts, and MySQL strictly normalized to Third Normal Form (3NF).\n\nIt manages book checkouts, member catalogs, fines, and student account permissions with server-side data validation.`,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Show all projects', 'What backend skills does he have?', 'How to hire Shakib?'],
      provider: 'local-brain',
    }
  }

  // 11f. Nur Foodes POS
  if (q.includes('nur foodes') || q.includes('food software') || q.includes('pos') || q.includes('রেস্টুরেন্ট')) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('nur foodes'))!
    if (isBangla) {
      return {
        reply: `**Nur Foodes** হলো জাভাস্ক্রিপ্ট, এইচটিএমএল৫ ও সিএসএস৩ দিয়ে তৈরি একটি টাচ-অপ্টিমাইজড রেস্টুরেন্ট পিওএস ও ইআরপি সিস্টেম।\n\nএতে ক্যাশিয়ার অর্ডারিং, স্প্লিট পেমেন্ট, সৌদি ১৫% ভ্যাট ও ZATCA ফেজ-২ কিউআর ইনভয়েসিং এবং আরবি/ইংরেজি ইন্টারফেস রয়েছে।\n\n*লাইভ ডেমো: [food-software-sigma.vercel.app](https://food-software-sigma.vercel.app/)*`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['অন্যান্য প্রজেক্ট দেখাও', 'Securex প্রজেক্ট দেখাও', 'হায়ার করতে চাই'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `**Nur Foodes** is a touch-optimized restaurant POS and store ERP built with modular JavaScript, HTML5, CSS3, and Vite.\n\nIt features fast cashier order entry, split payments, Saudi 15% VAT calculation, ZATCA Phase-2 QR invoicing, and bilingual Arabic/English support.\n\n*Live Demo: [food-software-sigma.vercel.app](https://food-software-sigma.vercel.app/)*`,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Show all projects', 'Tell me about Securex', 'How to hire Shakib?'],
      provider: 'local-brain',
    }
  }

  // 11g. Resumate AI
  if (q.includes('resumate') || q.includes('resume builder') || q.includes('ai cv')) {
    const proj = projects.find((p) => p.title.toLowerCase().includes('resumate'))!
    if (isBangla) {
      return {
        reply: `**Resumate AI** হলো নেক্সট.জেএস ১৬, গুগল জেমিনাই এবং সুপাবেস দিয়ে তৈরি একটি এআই রেজুমে প্ল্যাটফর্ম।\n\nএটি বাংলা ও ইংরেজিতে কনভার্সেশনাল রেজুমে এডিটিং, সিভি ডকুমেন্ট পার্সিং, ৮টি আন্তর্জাতিক টেমপ্লেট এবং হাই-কোয়ালিটি পিডিএফ এক্সপোর্ট সাপোর্ট করে।\n\n*লাইভ ডেমো: [ai-cv-builder-sli4.onrender.com](https://ai-cv-builder-sli4.onrender.com)*`,
        cards: [{ type: 'project-detail', data: proj }],
        suggestedQueries: ['Securex প্রজেক্ট দেখাও', 'অন্যান্য প্রজেক্ট দেখাও', 'হায়ার করতে চাই'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `**Resumate AI** is an AI resume platform built with Next.js 16, Google Gemini AI, and Supabase PostgreSQL.\n\nIt supports trilingual conversational resume editing (English, Bengali, Banglish), multimodal document parsing, 8 regional templates, and headless Chromium PDF export.\n\n*Live Demo: [ai-cv-builder-sli4.onrender.com](https://ai-cv-builder-sli4.onrender.com)*`,
      cards: [{ type: 'project-detail', data: proj }],
      suggestedQueries: ['Tell me about Securex', 'Show all projects', 'How to contact him?'],
      provider: 'local-brain',
    }
  }

  // ── 12. Show All Projects / General Project Inquiry ─────────────────────────
  if (
    q.includes('project') ||
    q.includes('প্রজেক্ট') ||
    q.includes('portfolio') ||
    mode === 'projects'
  ) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিবের প্রধান প্রজেক্টগুলো হলো:\n1. **CV Payment Reminder Automation** — n8n, Google Sheets ও Telegram Bot অটোমেশন\n2. **Securex** — Laravel MVC, MySQL, OAuth 2.0 ও ইনভয়েস ডেলিভারি\n3. **AI Smart Campus System** — Laravel 12 REST API, React/Vite ও জেমিনাই এআই\n4. **Logistica** — সাপ্লাই চেইন প্ল্যাটফর্ম (অ্যাপস্টিক ইন্টার্নশিপ)\n\nযেকোনো প্রজেক্টের নাম লিখে বিস্তারিত জানতে চাইতে পারেন!`,
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
      reply: `Here are Md. Nazmus Shakib's primary engineering projects:\n1. **CV Payment Reminder Automation** — n8n, Google Sheets & Telegram Bot workflow\n2. **Securex** — Laravel MVC, MySQL, OAuth 2.0 & PDF invoice delivery\n3. **AI Smart Campus System** — Laravel 12 REST API, React/Vite, Gemini AI\n4. **Logistica** — Supply chain & operations platform (Appstick internship)\n\nAsk for any project by name to see its architectural details!`,
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

  // ── 13. Specific Technology Query (Direct Answer: no cards) ─────────────────
  if (q.includes('laravel') || q.includes('লারাবেল') || q.includes('লারাভেল')) {
    if (isBangla) {
      return {
        reply: `হ্যাঁ, **Laravel** হলো নাজমুল শাকিবের প্রধান ব্যাকএন্ড ফ্রেমওয়ার্ক।\n\nতিনি Laravel 12, Laravel MVC আর্কিটেকচার, Sanctum API অথেন্টিকেশন, Eloquent ORM এবং সুরক্ষিত RESTful API তৈরিতে অভিজ্ঞ। খুলনা বিশ্ববিদ্যালয় থেকে আইসিটি ডিভিশনের আওতায় ৮০ ঘণ্টার লারাভেল ট্রেনিংও সম্পন্ন করেছেন।`,
        cards: [],
        suggestedQueries: ['Securex প্রজেক্ট দেখাও', 'অন্যান্য টেকনোলজি স্ট্যাক', 'হায়ার করতে চাই'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Yes, **Laravel** is Md. Nazmus Shakib's primary backend framework.\n\nHe has extensive experience with Laravel 12, clean MVC architectures, Sanctum API authentication, Eloquent ORM relationships, and RESTful web services. He also holds an 80-hour formal certification in PHP & Laravel from Khulna University.`,
      cards: [],
      suggestedQueries: ['Show projects using Laravel', 'What other skills does he have?', 'How to hire him?'],
      provider: 'local-brain',
    }
  }

  if (q.includes('mysql') || q.includes('database') || q.includes('sql') || q.includes('3nf')) {
    if (isBangla) {
      return {
        reply: `নাজমুল শাকিব **MySQL রিলেশনাল ডেটাবেস** আর্কিটেকচারে পারদর্শী।\n\nতিনি রিলেশনাল স্কিমা ডিজাইন, থার্ড নরমাল ফর্ম (3NF) বাস্তবায়ন, ইনডেক্সিং এবং কুয়েরি ইন্টিগ্রিটি অপ্টিমাইজেশনে দক্ষ। AI Smart Campus System-এ তিনি ডেটাবেস লিড হিসেবে দায়িত্ব পালন করেছেন।`,
        cards: [],
        suggestedQueries: ['AI Smart Campus সিস্টেম দেখাও', 'লারাভেল স্কিল কি কি?', 'অন্যান্য প্রজেক্ট'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Md. Nazmus Shakib has deep expertise in **MySQL relational database engineering**.\n\nHe specializes in designing schemas normalized strictly to Third Normal Form (3NF), foreign key cascading, query indexing, and data integrity. He served as Database Lead for the AI Smart Campus System.`,
      cards: [],
      suggestedQueries: ['Tell me about AI Smart Campus System', 'What backend skills does he have?', 'How to hire him?'],
      provider: 'local-brain',
    }
  }

  if (q.includes('next') || q.includes('react') || q.includes('frontend') || q.includes('ফ্রন্টএন্ড')) {
    if (isBangla) {
      return {
        reply: `নাজমুল শাকিব ফ্রন্টএন্ডে **Next.js 16, React 19, TypeScript, এবং Tailwind CSS** ব্যবহার করেন।\n\nতিনি আধুনিক রেসপনসিভ UI, সার্ভার/ক্লায়েন্ট কম্পোনেন্ট এবং ইন্টারঅ্যাক্টিভ ওয়েব অ্যাপ্লিকেশন নির্মাণে পারদর্শী।`,
        cards: [],
        suggestedQueries: ['AI Smart Campus সিস্টেম দেখাও', 'রেজুমেট এআই দেখাও', 'ব্যাকএন্ড স্কিল কি কি?'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Md. Nazmus Shakib builds modern interfaces with **Next.js 16, React 19, TypeScript, and Tailwind CSS**.\n\nHe focuses on clean App Router structure, responsive layouts, client islands, and accessible component architectures.`,
      cards: [],
      suggestedQueries: ['Show projects using Next.js & React', 'What backend skills does he have?', 'Contact Shakib'],
      provider: 'local-brain',
    }
  }

  // ── 14. Full Tech Stack / Skills Overview ──────────────────────────────────
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
    const showCard = q.includes('list') || q.includes('card') || q.includes('matrix') || q.includes('লিস্ট') || q.includes('সব')
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

  // ── 15. Who is Shakib / Bio / Identity (Direct Answer: no cards) ───────────
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
        reply: `আমি **Shakib AI**, মোঃ নাজমুল শাকিবের ডিজিটাল পোর্টফোলিও অ্যাসিস্ট্যান্ট।\n\n**মোঃ নাজমুল শাকিব** একজন ফুল-স্ট্যাক ডেভেলপার (লারাভেল ও নেক্সট.জেএস বিশেষজ্ঞ), খুলনাতে অবস্থান করছেন। তিনি অ্যাপস্টিক টেক ফার্মে ইন্টার্ন হিসেবে কাজ করেছেন এবং নর্দান ইউনিভার্সিটিতে সিএসই ফাইনাল সেমিস্টারে অধ্যয়নরত (CGPA ৩.৬০/৪.০০)।`,
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

  // ── 16. Resume / CV ────────────────────────────────────────────────────────
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

  // ── 17. Certifications & Formal Training ───────────────────────────────────
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

  // ── 18. Publications & Research ───────────────────────────────────────────
  if (q.includes('publication') || q.includes('research') || q.includes('zenodo') || q.includes('doi') || q.includes('গবেষণা')) {
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

  // ── 19. Hire Me & Client Services ──────────────────────────────────────────
  if (
    q.includes('hire') ||
    q.includes('service') ||
    q.includes('pricing') ||
    q.includes('hiring') ||
    q.includes('কাজের অফার') ||
    q.includes('হায়ার') ||
    mode === 'hire'
  ) {
    if (isBangla) {
      return {
        reply: `মোঃ নাজমুল শাকিব ফুল-টাইম সফটওয়্যার ইঞ্জিনিয়ারিং রোল, রিমোট কনট্রাক্ট এবং প্রজেক্টের জন্য **${portfolioData.availability}**।\n\nতিনি লারাভেল ব্যাকএন্ড সিস্টেম, রেস্ট এপিআই, নেক্সট.জেএস ওয়েব অ্যাপ এবং n8n অটোমেশন সার্ভিস প্রদান করেন।\n\nপ্রজেক্টের তথ্য নিচে জমা দিতে পারেন বা সরাসরি যোগাযোগ করতে পারেন:`,
        cards: [
          { type: 'hire-inquiry' },
          { type: 'contact-direct', data: contact },
        ],
        suggestedQueries: ['রেজুমে ডাউনলোড', 'সেরা প্রজেক্ট দেখাও', 'ফোন ও হোয়াটসঅ্যাপ'],
        provider: 'local-brain',
      }
    }
    return {
      reply: `Md. Nazmus Shakib is **${portfolioData.availability}** for full-time engineering roles, contracts, and web applications.\n\nServices include Laravel backend systems, REST APIs, Next.js/React web apps, and n8n workflow automations.\n\nYou can specify your project scope below or contact him directly:`,
      cards: [
        { type: 'hire-inquiry' },
        { type: 'contact-direct', data: contact },
      ],
      suggestedQueries: ['What services does he offer?', 'Download his resume', 'Show his best projects'],
      provider: 'local-brain',
    }
  }

  // ── 20. Thank you & Courtesy ──────────────────────────────────────────────
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

  // ── 21. Default Fallback ───────────────────────────────────────────────────
  if (isBangla) {
    return {
      reply: `আমি **Shakib AI**, মোঃ নাজমুল শাকিবের পোর্টফোলিও অ্যাসিস্ট্যান্ট।\n\nশাকিবের **প্রজেক্ট**, **টেকনোলজি স্ট্যাক (লারাভেল, নেক্সট.জেএস, মাইএসকিউএল, n8n)**, **ইন্টার্নশিপ অভিজ্ঞতা**, বা **যোগাযোগের তথ্য** সম্পর্কে যেকোনো নির্দিষ্ট প্রশ্ন করতে পারেন।`,
      cards: [],
      suggestedQueries: [
        'তাঁর সেরা প্রজেক্টগুলো দেখাও',
        'ফেসবুক লিংকটা দাও',
        'টেকনোলজি স্ট্যাক কি?',
        'যোগাযোগের মাধ্যম',
      ],
      provider: 'local-brain',
    }
  }

  return {
    reply: `I am **Shakib AI**, the portfolio assistant for **Md. Nazmus Shakib**.\n\nYou can ask me specific questions about Shakib's **projects**, **technical stack (Laravel, Next.js, MySQL, n8n)**, **internship experience**, or **contact links**.`,
    cards: [],
    suggestedQueries: [
      'Show me his best projects',
      'Give me Facebook link',
      'What technologies does he use?',
      'How to contact him?',
    ],
    provider: 'local-brain',
  }
}
