'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Mic,
  MicOff,
  RotateCcw,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  User,
  Briefcase,
  FileText,
  Rocket,
} from 'lucide-react'
import { ShakibOrbLogo } from './nazmus-ai-trigger'
import { RenderAiCard } from './nazmus-ai-cards'
import type { ChatMessage, AiMode } from '@/types/ai'

interface PanelProps {
  isOpen: boolean
  onClose: () => void
  messages: ChatMessage[]
  onSendMessage: (text: string, mode?: AiMode) => void
  onClearHistory: () => void
  isLoading: boolean
  currentMode: AiMode
  onModeChange: (mode: AiMode) => void
  isListening: boolean
  onToggleVoiceInput: () => void
  isSpeechSupported: boolean
  isTtsEnabled: boolean
  onToggleTts: () => void
}

export function NazmusAiPanel({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  onClearHistory,
  isLoading,
  currentMode,
  onModeChange,
  isListening,
  onToggleVoiceInput,
  isSpeechSupported,
  isTtsEnabled,
  onToggleTts,
}: PanelProps) {
  const [input, setInput] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Auto-scroll when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading, isOpen])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    onSendMessage(input.trim(), currentMode)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const modePrompts: Record<AiMode, string[]> = {
    all: [
      'Who is Shakib?',
      'Show me his best projects',
      'What technologies does he use?',
      'Why should I hire him?',
      'Tell me about his experience',
    ],
    projects: [
      'Tell me about Securex',
      'Explain AI Smart Campus System',
      'Show Library Management Project',
      'Tell me about Logistica',
    ],
    resume: [
      'What is his education & CGPA?',
      'Tell me about his internship',
      'Explain his certifications',
      'Download his resume',
    ],
    hire: [
      'What services does he offer?',
      'How do we start a project?',
      'How to contact Shakib?',
      'What is his availability?',
    ],
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {/* Mobile Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm sm:hidden"
        aria-hidden="true"
      />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 18 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed z-50 flex flex-col overflow-hidden border border-[rgba(139,114,255,0.3)] bg-[#070912]/98 text-white shadow-[0_24px_80px_rgba(0,0,0,0.92)] backdrop-blur-2xl transition-all duration-300 ${
          isExpanded
            ? 'inset-2 sm:inset-6 md:inset-10 rounded-2xl sm:rounded-3xl'
            : 'inset-x-2 bottom-2 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[460px] md:w-[490px] h-[calc(100dvh-1rem)] sm:h-[640px] max-h-[calc(100dvh-1rem)] sm:max-h-[720px] rounded-2xl sm:rounded-3xl'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shakib AI Portfolio Assistant"
      >
        {/* Glow Top Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#2bd9b5] via-[#8b72ff] to-[#aa96ff]" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 sm:px-5 bg-white/[0.015]">
          <div className="flex items-center gap-3">
            <div className="relative flex size-10 items-center justify-center rounded-full border border-[rgba(80,180,255,0.5)] bg-[rgba(10,15,30,0.85)] shadow-[0_0_15px_rgba(0,234,255,0.35)]">
              <ShakibOrbLogo className="size-8" />
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-[#070912] bg-[#00ff9d] shadow-[0_0_6px_#00ff9d]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-wide text-white">Shakib AI</h3>
                <span className="rounded-full border border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.08)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#69e6cd]">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-[#8e95a5]">Your Digital Portfolio Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* TTS narration toggle */}
            <button
              type="button"
              onClick={onToggleTts}
              title={isTtsEnabled ? 'Disable Voice Narration' : 'Enable Voice Narration'}
              aria-label={isTtsEnabled ? 'Mute AI Voice' : 'Unmute AI Voice'}
              className={`rounded-lg p-2 transition ${
                isTtsEnabled
                  ? 'bg-[rgba(43,217,181,0.15)] text-[#2bd9b5]'
                  : 'text-[#747b8b] hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              {isTtsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Clear conversation */}
            <button
              type="button"
              onClick={onClearHistory}
              title="Reset conversation"
              aria-label="Clear chat history"
              className="rounded-lg p-2 text-[#747b8b] transition hover:bg-white/[0.06] hover:text-white"
            >
              <RotateCcw size={16} />
            </button>

            {/* Expand / Collapse (desktop) */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Restore size' : 'Maximize panel'}
              aria-label={isExpanded ? 'Restore window size' : 'Maximize chat panel'}
              className="hidden sm:inline-flex rounded-lg p-2 text-[#747b8b] transition hover:bg-white/[0.06] hover:text-white"
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              title="Close panel"
              aria-label="Close Shakib AI Assistant"
              className="rounded-lg p-2 text-[#747b8b] transition hover:bg-white/[0.06] hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-white/[0.06] bg-white/[0.015] px-3 py-2 text-xs no-scrollbar">
          {[
            { id: 'all' as AiMode, label: 'All', icon: Sparkles },
            { id: 'projects' as AiMode, label: 'Projects', icon: Briefcase },
            { id: 'resume' as AiMode, label: 'Resume', icon: FileText },
            { id: 'hire' as AiMode, label: 'Hire Me', icon: Rocket },
          ].map((tab) => {
            const Icon = tab.icon
            const active = currentMode === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onModeChange(tab.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition whitespace-nowrap ${
                  active
                    ? 'border border-[rgba(139,114,255,0.4)] bg-[rgba(139,114,255,0.15)] text-[#d4caff] shadow-sm'
                    : 'border border-transparent text-[#747b8b] hover:bg-white/[0.04] hover:text-[#c4cad4]'
                }`}
              >
                <Icon size={12} className={active ? 'text-[#2bd9b5]' : 'text-[#747b8b]'} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Messages Stream */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4"
          aria-live="polite"
        >
          {messages.map((msg) => {
            const isUser = msg.role === 'user'
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[rgba(80,180,255,0.45)] bg-[rgba(10,15,30,0.85)] shadow-sm mt-0.5">
                    <ShakibOrbLogo className="size-5" />
                  </div>
                )}

                <div
                  className={`group relative max-w-[86%] sm:max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed ${
                    isUser
                      ? 'border border-[rgba(43,217,181,0.3)] bg-gradient-to-tr from-[rgba(43,217,181,0.12)] to-[rgba(43,217,181,0.04)] text-[#e6fff9]'
                      : 'border border-white/10 bg-[#0e1220]/90 text-[#e2e6ed] shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  {/* Message Content with simple markdown rendering */}
                  <div className="space-y-2 whitespace-pre-wrap">
                    {formatMarkdownContent(msg.content)}
                  </div>

                  {/* Embedded Rich Cards */}
                  {msg.cards && msg.cards.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.cards.map((card, idx) => (
                        <RenderAiCard
                          key={idx}
                          card={card}
                          onSelectPrompt={(prompt) => onSendMessage(prompt, currentMode)}
                        />
                      ))}
                    </div>
                  )}

                  {/* Copy Button & Actions on Assistant Messages */}
                  {!isUser && (
                    <div className="mt-2.5 flex items-center justify-end gap-1.5 pt-1 text-[10px] text-[#747b8b] border-t border-white/5 opacity-80 group-hover:opacity-100 transition">
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.id, msg.content)}
                        className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-white/10 hover:text-white"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check size={11} className="text-[#2bd9b5]" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={11} /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/80 mt-0.5">
                    <User size={14} />
                  </div>
                )}
              </div>
            )
          })}

          {/* AI Thinking Animation */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[rgba(80,180,255,0.45)] bg-[rgba(10,15,30,0.85)] shadow-sm">
                <ShakibOrbLogo className="size-5" />
              </div>
              <div className="rounded-2xl border border-[rgba(139,114,255,0.3)] bg-[#0e1220]/90 px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#2bd9b5] animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-2 rounded-full bg-[#8b72ff] animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-2 rounded-full bg-[#aa96ff] animate-bounce" />
                  </div>
                  <span className="text-[11px] font-medium text-[#aa96ff]">
                    Shakib AI is formulating response...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Action Chips */}
        <div className="border-t border-white/[0.06] bg-[#090c17]/80 px-3 py-2">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#747b8b]">
            Suggested queries
          </p>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {modePrompts[currentMode].map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onSendMessage(prompt, currentMode)}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-[#c4cad4] transition hover:border-[#2bd9b5]/40 hover:bg-[rgba(43,217,181,0.08)] hover:text-white active:scale-95"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Live Voice Audio Waveform (when microphone is listening) */}
        {isListening && (
          <div className="flex items-center justify-between border-t border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.08)] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
              </span>
              <span className="text-xs font-semibold text-[#69e6cd]">Listening... Speak now</span>
            </div>
            <div className="flex items-center gap-1">
              {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.7].map((height, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-[#2bd9b5] animate-pulse"
                  style={{
                    height: `${height * 18}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={onToggleVoiceInput}
              className="text-xs font-bold text-red-400 hover:underline"
            >
              Stop
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="border-t border-white/10 bg-[#070912] p-3 sm:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="relative flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2 focus-within:border-[rgba(43,217,181,0.5)] focus-within:shadow-[0_0_20px_rgba(43,217,181,0.15)] transition"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Shakib... (Enter to send)"
              className="flex-1 resize-none bg-transparent px-2 py-1 text-xs sm:text-sm text-white placeholder:text-[#5d6575] focus:outline-none max-h-24"
            />

            {/* Voice Input Button */}
            {isSpeechSupported && (
              <button
                type="button"
                onClick={onToggleVoiceInput}
                title={isListening ? 'Stop Listening' : 'Voice Input (Speech-to-Text)'}
                aria-label={isListening ? 'Stop microphone' : 'Start voice input'}
                className={`rounded-xl p-2 transition ${
                  isListening
                    ? 'bg-red-500/20 text-red-400 animate-pulse'
                    : 'text-[#747b8b] hover:bg-white/10 hover:text-white'
                }`}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            )}

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className={`flex size-8 items-center justify-center rounded-xl transition ${
                input.trim() && !isLoading
                  ? 'bg-gradient-to-r from-[#2bd9b5] to-[#8b72ff] text-[#06070b] shadow-md hover:brightness-110 active:scale-95'
                  : 'bg-white/5 text-[#5d6575] cursor-not-allowed'
              }`}
            >
              <Send size={14} />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[10px] text-[#5d6575]">
            <span>Powered by Shakib AI • Your Digital Portfolio Assistant</span>
            <span>Esc to close</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Lightweight helper to format simple markdown elements (headers, bold, code, lists)
 */
function formatMarkdownContent(content: string) {
  const lines = content.split('\n')
  return lines.map((line, i) => {
    // Heading 3
    if (line.startsWith('### ')) {
      return (
        <h4 key={i} className="text-sm font-bold text-white mt-2 mb-1">
          {renderInlineFormatting(line.replace('### ', ''))}
        </h4>
      )
    }
    // Heading 2
    if (line.startsWith('## ')) {
      return (
        <h3 key={i} className="text-sm font-extrabold text-[#c4b8ff] mt-2 mb-1">
          {renderInlineFormatting(line.replace('## ', ''))}
        </h3>
      )
    }
    // Bullet point
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const clean = line.trim().replace(/^[-*]\s+/, '')
      return (
        <div key={i} className="flex items-start gap-1.5 pl-1.5">
          <span className="text-[#2bd9b5] font-bold mt-0.5">•</span>
          <span className="flex-1">{renderInlineFormatting(clean)}</span>
        </div>
      )
    }
    // Numbered list
    if (/^\d+\.\s/.test(line.trim())) {
      const match = line.trim().match(/^(\d+)\.\s+(.*)/)
      if (match) {
        return (
          <div key={i} className="flex items-start gap-1.5 pl-1.5">
            <span className="text-[#aa96ff] font-bold text-[11px]">{match[1]}.</span>
            <span className="flex-1">{renderInlineFormatting(match[2])}</span>
          </div>
        )
      }
    }
    if (!line.trim()) {
      return <div key={i} className="h-1.5" />
    }
    return <p key={i}>{renderInlineFormatting(line)}</p>
  })
}

function renderInlineFormatting(text: string) {
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/)
    const codeMatch = remaining.match(/`([^`]+)`/)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/)

    const matches = [
      boldMatch ? { type: 'bold', index: boldMatch.index!, length: boldMatch[0].length, data: boldMatch[1] } : null,
      codeMatch ? { type: 'code', index: codeMatch.index!, length: codeMatch[0].length, data: codeMatch[1] } : null,
      linkMatch ? { type: 'link', index: linkMatch.index!, length: linkMatch[0].length, text: linkMatch[1], href: linkMatch[2] } : null,
    ].filter(Boolean) as Array<{ type: string; index: number; length: number; data?: string; text?: string; href?: string }>

    if (matches.length === 0) {
      parts.push(remaining)
      break
    }

    matches.sort((a, b) => a.index - b.index)
    const first = matches[0]

    if (first.index > 0) {
      parts.push(remaining.substring(0, first.index))
    }

    if (first.type === 'bold') {
      parts.push(<strong key={key++} className="font-bold text-white">{first.data}</strong>)
    } else if (first.type === 'code') {
      parts.push(
        <code key={key++} className="rounded bg-white/10 px-1 py-0.5 text-[11px] font-mono text-[#2bd9b5]">
          {first.data}
        </code>
      )
    } else if (first.type === 'link') {
      parts.push(
        <a
          key={key++}
          href={first.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2bd9b5] underline hover:text-white"
        >
          {first.text}
        </a>
      )
    }

    remaining = remaining.substring(first.index + first.length)
  }

  return parts
}
