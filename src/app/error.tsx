'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log exception without crashing client session
    console.error('Unhandled runtime error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0B0E0B] text-[#F2EFE9] flex items-center justify-center p-6 selection:bg-[#C87D55]/30">
      <div className="max-w-[480px] w-full p-8 sm:p-10 border border-[rgba(242,239,233,0.14)] bg-[#111712] text-center space-y-6 shadow-2xl">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C87D55] animate-pulse" />
          <span className="font-sans text-[11px] uppercase tracking-[0.22em] font-bold text-[#C87D55]">
            vibesite studio — session recovery
          </span>
        </div>

        <h1
          className="text-[32px] sm:text-[36px] font-normal leading-tight text-[#F2EFE9]"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        >
          Something drifted off course.
        </h1>

        <p className="text-[14px] font-sans text-[#A3A89E] leading-relaxed">
          The ambient graphics engine encountered an unexpected interruption. We have protected your session and state.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="py-3 px-6 bg-[#C87D55] text-[#F2EFE9] hover:bg-[#b5653b] font-sans font-bold text-[13px] transition-colors shadow-md"
          >
            Reload Living Scene ↻
          </button>
          <a
            href="/"
            className="py-3 px-6 border border-[rgba(242,239,233,0.18)] text-[#F2EFE9] hover:bg-white/5 font-sans font-medium text-[13px] transition-colors"
          >
            Return to Studio
          </a>
        </div>
      </div>
    </div>
  )
}
