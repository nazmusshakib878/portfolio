import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { processAiMessage } from '@/lib/ai/engine'
import type { AiMode } from '@/types/ai'

const chatRequestSchema = z.object({
  message: z.string().min(1).max(1000),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(2000),
      })
    )
    .optional()
    .default([]),
  mode: z.enum(['all', 'projects', 'resume', 'hire']).optional().default('all'),
})

// Simple in-memory rate limiter
const ipRequests = new Map<string, { count: number; timestamp: number }>()

function isRateLimited(ip: string, limit = 30, windowMs = 60_000): boolean {
  const now = Date.now()
  const current = ipRequests.get(ip)

  if (!current || now - current.timestamp > windowMs) {
    ipRequests.set(ip, { count: 1, timestamp: now })
    return false
  }

  if (current.count >= limit) {
    return true
  }

  current.count += 1
  return false
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: 'Too many requests. Please wait a moment before sending another query.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid request JSON payload.' }, { status: 400 })
  }

  const parsed = chatRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Invalid message structure.', errors: parsed.error.issues },
      { status: 400 }
    )
  }

  try {
    const { message, history, mode } = parsed.data
    const result = await processAiMessage(message, history, mode as AiMode)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json(
      { message: 'An internal error occurred while processing your query.' },
      { status: 500 }
    )
  }
}
