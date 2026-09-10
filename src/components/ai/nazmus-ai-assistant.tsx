'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { NazmusAiTrigger } from './nazmus-ai-trigger'
import { NazmusAiPanel } from './nazmus-ai-panel'
import { generateLocalResponse } from '@/lib/ai/engine'
import type { ChatMessage, AiMode, ChatResponseBody } from '@/types/ai'

const INITIAL_GREETING_MESSAGE: ChatMessage = {
  id: 'greeting-0',
  role: 'assistant',
  content: `### **Welcome! I am Shakib AI.**\n\nI am the personal portfolio & engineering assistant for **Md. Nazmus Shakib**.\n\nI can help you explore his **Laravel & Next.js projects**, examine his **database architectures**, review his **experience at Appstick Tech Firm**, or help you **hire him for your next project**.\n\nHow can I help you today?`,
  suggestedQueries: [
    'Who is Shakib?',
    'Show me his best projects',
    'What technologies does he use?',
    'Why should I hire him?',
  ],
  timestamp: Date.now(),
}

export function NazmusAiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING_MESSAGE])
  const [currentMode, setCurrentMode] = useState<AiMode>('all')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeechSupported, setIsSpeechSupported] = useState(false)
  const [isTtsEnabled, setIsTtsEnabled] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)
  const modeRef = useRef<AiMode>(currentMode)
  const messagesRef = useRef<ChatMessage[]>(messages)
  const isLoadingRef = useRef<boolean>(isLoading)

  useEffect(() => {
    modeRef.current = currentMode
  }, [currentMode])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => {
    isLoadingRef.current = isLoading
  }, [isLoading])

  // Voice output (TTS) helper
  const speakText = useCallback(
    (text: string) => {
      if (!isTtsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return
      window.speechSynthesis.cancel()

      // Strip markdown symbols for clean pronunciation
      const clean = text
        .replace(/[*#`_>-]/g, ' ')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\s+/g, ' ')
        .trim()

      const utterance = new SpeechSynthesisUtterance(clean)
      utterance.rate = 1.05
      utterance.pitch = 1.0
      window.speechSynthesis.speak(utterance)
    },
    [isTtsEnabled]
  )

  const handleSendMessage = useCallback(
    async (text: string, mode: AiMode = modeRef.current) => {
      if (!text.trim() || isLoadingRef.current) return

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
        timestamp: Date.now(),
      }

      const updated = [...messagesRef.current, userMessage]
      setMessages(updated)
      setIsLoading(true)

      try {
        const res = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            history: updated.slice(-6).map((m) => ({ role: m.role, content: m.content })),
            mode,
          }),
        })

        if (!res.ok) {
          throw new Error('Failed to fetch AI response')
        }

        const data = (await res.json()) as ChatResponseBody

        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          cards: data.cards,
          suggestedQueries: data.suggestedQueries,
          timestamp: Date.now(),
        }

        setMessages((prev) => [...prev, assistantMessage])
        speakText(data.reply)
      } catch {
        const localData = generateLocalResponse(text, mode)
        const fallbackMessage: ChatMessage = {
          id: `assistant-local-${Date.now()}`,
          role: 'assistant',
          content: localData.reply,
          cards: localData.cards,
          suggestedQueries: localData.suggestedQueries,
          timestamp: Date.now(),
        }
        setMessages((prev) => [...prev, fallbackMessage])
        speakText(localData.reply)
      } finally {
        setIsLoading(false)
      }
    },
    [speakText]
  )

  const sendRef = useRef(handleSendMessage)
  useEffect(() => {
    sendRef.current = handleSendMessage
  }, [handleSendMessage])

  // Check Web Speech API support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSpeechSupported(true)
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = 'en-US'

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const transcript = event.results[0]?.[0]?.transcript
          if (transcript) {
            sendRef.current(transcript, modeRef.current)
          }
          setIsListening(false)
        }

        recognition.onerror = () => {
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition
      }
    }
  }, [])

  const handleToggleVoiceInput = () => {
    if (!recognitionRef.current) return
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch {
        setIsListening(false)
      }
    }
  }

  const handleClearHistory = () => {
    setMessages([INITIAL_GREETING_MESSAGE])
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }

  // Keyboard shortcut listener (Ctrl+J or Cmd+K) & Custom Event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+J or Cmd+J
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      // Esc to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCustomOpen = (e: any) => {
      setIsOpen(true)
      if (e.detail?.prompt) {
        setTimeout(() => {
          sendRef.current(e.detail.prompt, e.detail.mode || 'all')
        }, 200)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-nazmus-ai', handleCustomOpen)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-nazmus-ai', handleCustomOpen)
    }
  }, [isOpen])

  return (
    <>
      <NazmusAiTrigger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <NazmusAiPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        onClearHistory={handleClearHistory}
        isLoading={isLoading}
        currentMode={currentMode}
        onModeChange={(mode) => setCurrentMode(mode)}
        isListening={isListening}
        onToggleVoiceInput={handleToggleVoiceInput}
        isSpeechSupported={isSpeechSupported}
        isTtsEnabled={isTtsEnabled}
        onToggleTts={() => {
          setIsTtsEnabled(!isTtsEnabled)
          if (isTtsEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel()
          }
        }}
      />
    </>
  )
}
