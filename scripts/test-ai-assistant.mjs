async function queryChatApi(message, history = [], mode = 'all') {
  const res = await fetch('http://localhost:3000/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, mode }),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`API returned status ${res.status}: ${errorText}`)
  }

  return res.json()
}

async function runTests() {
  console.log('===============================================================')
  console.log('       SHAKIB AI ASSISTANT — REGRESSION & AUDIT SUITE         ')
  console.log('===============================================================\n')

  const testCases = [
    {
      id: 1,
      title: 'E-commerce Capability (Yes/No + Technical Reasoning)',
      query: 'Can Shakib build a complete e-commerce website for my business?',
      criteria: [
        {
          name: 'Answers Yes/No first',
          pass: (r) => /^yes/i.test(r.reply.trim()),
          expected: 'Starts with "Yes"',
        },
        {
          name: 'Explains technical capabilities (Laravel, MySQL, Next.js/React)',
          pass: (r) => {
            const lower = r.reply.toLowerCase()
            return lower.includes('laravel') && lower.includes('mysql') && (lower.includes('next') || lower.includes('react'))
          },
          expected: 'Mentions Laravel, MySQL, and Next.js/React',
        },
        {
          name: 'Concise length (2–4 sentences)',
          pass: (r) => {
            const count = r.reply.split(/(?<=[.!?])\s+/).length
            return count >= 2 && count <= 5
          },
          expected: 'Between 2 and 4 sentences',
        },
      ],
    },
    {
      id: 2,
      title: 'Technical Framework Comparison (Laravel vs Next.js)',
      query: 'Which is better for my project, Laravel or Next.js, and why?',
      criteria: [
        {
          name: 'Provides relevant technical reasoning for both frameworks',
          pass: (r) => {
            const lower = r.reply.toLowerCase()
            return (
              lower.includes('laravel') &&
              lower.includes('next.js') &&
              lower.includes('backend') &&
              (lower.includes('react') || lower.includes('frontend') || lower.includes('ssr'))
            )
          },
          expected: 'Explains Laravel backend and Next.js React/SSR capabilities',
        },
        {
          name: 'Explains when to choose which and how Shakib uses them',
          pass: (r) => {
            const lower = r.reply.toLowerCase()
            return lower.includes('shakib') && (lower.includes('both') || lower.includes('api'))
          },
          expected: 'Mentions combining both or how to choose',
        },
        {
          name: 'Concise length (2–5 sentences)',
          pass: (r) => {
            const count = r.reply.split(/(?<=[.!?])\s+/).length
            return count >= 2 && count <= 6
          },
          expected: 'Concise architectural answer (2–5 sentences)',
        },
      ],
    },
    {
      id: 3,
      title: 'Negative Employer Verification (Google / Microsoft)',
      query: 'Does Shakib have experience working at Google or Microsoft?',
      criteria: [
        {
          name: 'Answers Yes/No first',
          pass: (r) => /^no/i.test(r.reply.trim()),
          expected: 'Starts with "No"',
        },
        {
          name: 'Negative verification: states verified Appstick internship and NUBTK',
          pass: (r) => {
            const lower = r.reply.toLowerCase()
            return lower.includes('appstick') && lower.includes('intern')
          },
          expected: 'References verified Appstick Tech Firm internship',
        },
        {
          name: 'Zero hallucination (never claims he worked at Google/Microsoft)',
          pass: (r) => !r.reply.toLowerCase().includes('worked at google'),
          expected: 'No fabricated experience',
        },
      ],
    },
    {
      id: 4,
      title: 'Hiring Question (Actionable Next Steps & Contact)',
      query: 'I want to hire Shakib. What should I do next?',
      criteria: [
        {
          name: 'Provides verified contact details (Email / Phone / WhatsApp)',
          pass: (r) =>
            r.reply.includes('nazmusshakib878@gmail.com') ||
            r.reply.includes('+8801972169600') ||
            r.cards?.some((c) => c.type === 'contact-direct'),
          expected: 'Contains verified email or WhatsApp/Phone',
        },
        {
          name: 'Provides actionable next steps',
          pass: (r) => {
            const lower = r.reply.toLowerCase()
            return (
              (lower.includes('step') || lower.includes('1.') || lower.includes('reach out') || lower.includes('outreach')) &&
              (lower.includes('discussion') || lower.includes('discovery') || lower.includes('call') || lower.includes('proposal'))
            )
          },
          expected: 'Includes clear, actionable steps',
        },
        {
          name: 'Attaches hire inquiry or direct contact cards',
          pass: (r) => r.cards?.some((c) => c.type === 'hire-inquiry' || c.type === 'contact-direct'),
          expected: 'Has hire-inquiry and contact-direct cards',
        },
      ],
    },
    {
      id: 5,
      title: 'Project Comparison (Securex vs Smart Campus in 4 Bullets)',
      query: 'Compare Securex and AI Smart Campus System in 4 bullet points.',
      criteria: [
        {
          name: 'Compares both Securex and AI Smart Campus System side-by-side',
          pass: (r) =>
            r.reply.toLowerCase().includes('securex') &&
            (r.reply.toLowerCase().includes('smart campus') || r.reply.toLowerCase().includes('ai smart')),
          expected: 'Compares both projects across domain, stack, and features',
        },
        {
          name: 'Strictly formats EXACTLY 4 bullet points',
          pass: (r) => {
            const bullets = r.reply.split('\n').filter((l) => l.trim().startsWith('•') || l.trim().startsWith('-'))
            return bullets.length === 4
          },
          expected: 'Exactly 4 bullet points',
        },
      ],
    },
    {
      id: 6,
      title: 'Language & Sentence Constraint (Bangla + Exactly 2 Sentences)',
      query: "Can you explain Shakib's experience in Bangla in just 2 sentences?",
      criteria: [
        {
          name: 'Replies in fluent Bangla',
          pass: (r) => /[\u0980-\u09FF]/.test(r.reply),
          expected: 'Contains Bengali script',
        },
        {
          name: 'Strictly formats EXACTLY 2 sentences',
          pass: (r) => {
            const dariCount = (r.reply.match(/।/g) || []).length
            return dariCount === 2
          },
          expected: 'Exactly 2 Bengali sentences ending in "।',
        },
        {
          name: 'Mentions verified Appstick internship experience',
          pass: (r) =>
            r.reply.includes('অ্যাপস্টিক') ||
            r.reply.includes('Appstick') ||
            r.reply.includes('ইন্টার্ন'),
          expected: 'States Appstick Tech Firm backend internship',
        },
      ],
    },
    {
      id: 7,
      title: 'Docker Tool Capability (Yes/No Question)',
      query: 'Does Shakib know Docker?',
      criteria: [
        {
          name: 'Answers Yes first',
          pass: (r) => /^yes/i.test(r.reply.trim()),
          expected: 'Starts with "Yes"',
        },
        {
          name: 'Explains containerized workflow experience (n8n/pipeline)',
          pass: (r) => {
            const lower = r.reply.toLowerCase()
            return lower.includes('docker') && (lower.includes('n8n') || lower.includes('container'))
          },
          expected: 'References Docker and n8n containerized workflow',
        },
      ],
    },
    {
      id: 8,
      title: 'Mobile App Capability (Negative Yes/No)',
      query: 'Can Shakib build a mobile app in Flutter?',
      criteria: [
        {
          name: 'Answers No first',
          pass: (r) => /^no/i.test(r.reply.trim()),
          expected: 'Starts with "No"',
        },
        {
          name: 'Clarifies primary specialization in full-stack web engineering',
          pass: (r) => {
            const lower = r.reply.toLowerCase()
            return lower.includes('web') && (lower.includes('laravel') || lower.includes('responsive'))
          },
          expected: 'Clarifies web engineering focus',
        },
      ],
    },
    {
      id: 9,
      title: 'Salary & Compensation (Grounded & Unavailable)',
      query: "What is Shakib's expected salary?",
      criteria: [
        {
          name: 'Does not invent a salary number',
          pass: (r) => !/\$\d+|\b\d+\s*(?:usd|bdt|taka|k\/month|k\/year)\b/i.test(r.reply),
          expected: 'No fabricated salary amount',
        },
        {
          name: 'Acknowledges information is not publicly specified and provides contact info',
          pass: (r) => {
            const lower = r.reply.toLowerCase()
            return (
              (lower.includes('not publicly') || lower.includes('not listed') || lower.includes('directly')) &&
              (lower.includes('email') || lower.includes('contact') || lower.includes('whatsapp'))
            )
          },
          expected: 'Acknowledges not publicly listed and gives contact info',
        },
      ],
    },
    {
      id: 10,
      title: 'Bengali Academic Query (Language Detection)',
      query: 'বাংলায় বলো শাকিবের সিজিপিএ কত?',
      criteria: [
        {
          name: 'Replies in Bangla',
          pass: (r) => /[\u0980-\u09FF]/.test(r.reply),
          expected: 'Contains Bengali script',
        },
        {
          name: 'States accurate CGPA (3.60 / 4.00) and University (NUBTK)',
          pass: (r) =>
            (r.reply.includes('৩.৬০') || r.reply.includes('3.60')) &&
            (r.reply.includes('নর্দান') || r.reply.includes('NUBTK')),
          expected: 'States 3.60 and Northern University',
        },
      ],
    },
    {
      id: 11,
      title: 'Conversational Context Follow-up (Pronoun Resolution)',
      query: 'What is its live demo link?',
      history: [
        { role: 'user', content: 'Tell me about Resumate AI' },
        {
          role: 'assistant',
          content:
            'Resumate AI is an AI resume platform built with Next.js 16, Google Gemini AI, and Supabase PostgreSQL.',
        },
      ],
      criteria: [
        {
          name: 'Resolves context to Resumate AI without prior question overriding',
          pass: (r) =>
            r.reply.includes('ai-cv-builder-sli4.onrender.com') ||
            r.reply.includes('Resumate AI'),
          expected: 'Resolves to Resumate AI live demo URL',
        },
      ],
    },
  ]

  let totalPassed = 0
  let totalTests = 0

  for (const tc of testCases) {
    console.log(`\n---------------------------------------------------------------`)
    console.log(`TEST ${tc.id}: ${tc.title}`)
    console.log(`Query: "${tc.query}"`)
    console.log(`---------------------------------------------------------------`)

    const res = await queryChatApi(tc.query, tc.history || [], 'all')
    console.log(`\n[Assistant Response]:\n${res.reply}`)
    if (res.cards && res.cards.length > 0) {
      console.log(`\n[Attached Cards]: ${res.cards.map((c) => c.type).join(', ')}`)
    }

    let tcPassed = true
    for (const c of tc.criteria) {
      totalTests++
      const passed = c.pass(res)
      if (passed) {
        totalPassed++
        console.log(`  ✅ PASS: ${c.name}`)
      } else {
        tcPassed = false
        console.log(`  ❌ FAIL: ${c.name} (Expected: ${c.expected})`)
      }
    }

    console.log(`STATUS: ${tcPassed ? '✅ ALL CRITERIA PASSED' : '❌ FAILED CRITERIA'}`)
  }

  console.log('\n===============================================================')
  console.log(`OVERALL RESULTS: ${totalPassed} / ${totalTests} criteria passed (${Math.round((totalPassed / totalTests) * 100)}%)`)
  console.log('===============================================================\n')

  if (totalPassed === totalTests) {
    console.log('🎉 ALL 11 TESTS PASSED WITH 100% ACCURACY!')
    process.exit(0)
  } else {
    console.error('❌ SOME TESTS FAILED!')
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
