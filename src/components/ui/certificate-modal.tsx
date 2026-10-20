'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X, ExternalLink, Download, ShieldCheck, Award } from 'lucide-react'

export interface CertificateModalData {
  title: string
  provider: string
  program?: string
  issued?: string
  certificateId?: string
  imageUrl: string
  verifyUrl?: string
  downloadName?: string
}

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  certificate: CertificateModalData | null
}

export function CertificateModal({ isOpen, onClose, certificate }: CertificateModalProps) {
  const reduceMotion = useReducedMotion()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!certificate) return null

  const downloadFilename =
    certificate.downloadName ||
    `${certificate.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-certificate.png`

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-8"
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0a0d14]/95 shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl border border-[rgba(251,191,36,0.3)] bg-[rgba(251,191,36,0.1)] text-[#fbbf24]">
                  <Award size={18} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#fbbf24]">
                      {certificate.provider}
                    </span>
                    {certificate.issued && (
                      <span className="text-[10px] text-[#747b8b]">&bull; {certificate.issued}</span>
                    )}
                  </div>
                  <h3 id="cert-modal-title" className="text-sm sm:text-base font-semibold text-[#f2f3f7]">
                    {certificate.title}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close certificate modal"
                className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#9aa6b7] transition hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
              >
                <X size={18} />
              </button>
            </div>

            {/* Certificate Image Canvas */}
            <div className="relative flex min-h-[240px] max-h-[calc(92vh-150px)] items-center justify-center overflow-auto bg-[#05070a] p-3 sm:p-6">
              <div className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                <Image
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  width={1400}
                  height={990}
                  priority
                  unoptimized
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-white/10 bg-[#080b11] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-2 text-xs text-[#2bd9b5]">
                <ShieldCheck size={16} />
                <span>Verified Official Credential</span>
                {certificate.certificateId && (
                  <span className="font-mono text-[11px] text-[#747b8b]">
                    ({certificate.certificateId})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={certificate.verifyUrl || certificate.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs font-semibold text-[#f2f3f7] transition hover:border-white/30 hover:bg-white/10"
                >
                  <ExternalLink size={13} />
                  <span>{certificate.verifyUrl ? 'Verify Credential' : 'Open Full View'}</span>
                </a>

                <a
                  href={certificate.imageUrl}
                  download={downloadFilename}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.12)] px-3.5 text-xs font-semibold text-[#fde68a] transition hover:border-[rgba(251,191,36,0.55)] hover:bg-[rgba(251,191,36,0.22)] hover:text-white"
                >
                  <Download size={13} />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
