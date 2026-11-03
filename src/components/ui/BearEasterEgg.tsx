'use client'

import { useState, useEffect, useCallback } from 'react'

export default function BearEasterEgg() {
  const [isOpen, setIsOpen] = useState(false)
  const [starlightCount, setStarlightCount] = useState(0)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Soft celestial chime sound effect on interaction (Web Audio API)
  const playChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      // Pentatonic celestial frequencies
      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51]
      const f = freqs[Math.floor(Math.random() * freqs.length)]
      osc.frequency.setValueAtTime(f, ctx.currentTime)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 1.2)
    } catch {
      // Audio context policy or unsupported
    }
  }, [])

  const handleSparkle = () => {
    setStarlightCount((prev) => prev + 1)
    playChime()
  }

  return (
    <div className="relative inline-flex items-center">
      {/* Discreet Architectural Trigger: 1px Hairline Dual Bear Silhouette */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev)
          playChime()
        }}
        className="group relative inline-flex items-center justify-center p-1.5 rounded-full border border-[rgba(242,239,233,0.14)] bg-[#111712]/80 hover:border-[#C87D55]/60 hover:bg-[#161F17] transition-all duration-300 text-[#F2EFE9] focus:outline-none shadow-sm cursor-pointer"
        title="Quiet Meadow Companions"
        aria-label="Meadow Companions"
      >
        {/* Custom 1px Hairline Polar Bear & Panda Silhouette Icon */}
        <svg
          width="24"
          height="14"
          viewBox="0 0 32 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#C87D55] transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
        >
          {/* Polar Bear (Left): Sleek white silhouette */}
          <path
            d="M 12 18 C 12 13, 10 9.5, 8 8.5 C 7.5 7, 6 6, 4.5 6.5 C 3.5 7, 3.5 8.5, 3.5 9.5 C 2 10.5, 2 12.5, 2.5 14.5 C 3 16.5, 4 18, 5.5 19 L 13 19"
            stroke="currentColor"
            fill="none"
          />
          <circle cx="5" cy="6" r="1.1" stroke="currentColor" fill="currentColor" fillOpacity="0.3" />

          {/* Panda Bear (Right): Round companion with dark ears & eye patch */}
          <path
            d="M 13 19 L 26.5 19 C 28 18, 29 16, 28.5 14 C 28 12, 27 10.5, 25.5 9 C 25.5 8, 25.5 6.5, 24.5 6 C 23 5.5, 21.5 6.5, 21 8 C 19 9, 17 13, 17 18"
            stroke="currentColor"
            fill="none"
          />
          <circle cx="24" cy="5.8" r="1.3" fill="currentColor" stroke="currentColor" />
          <ellipse cx="25" cy="10.8" rx="1.1" ry="1.5" fill="currentColor" transform="rotate(-15 25 10.8)" />

          {/* Shared glowing heart / starlight spark */}
          <circle cx="14.5" cy="6" r="1" fill="#C87D55" stroke="none" className="animate-pulse" />
        </svg>
      </button>

      {/* Floating Gentle Easter Egg Modal Card */}
      {isOpen && (
        <>
          {/* Backdrop Dismiss */}
          <div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-[90] w-[92vw] max-w-[380px] p-6 border border-[rgba(242,239,233,0.18)] bg-[#0B0E0B]/95 text-[#F2EFE9] shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[rgba(242,239,233,0.1)] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C87D55] animate-pulse" />
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] font-bold text-[#C87D55]">
                  Quiet Meadow Secret
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[#A3A89E] hover:text-[#F2EFE9] text-[13px] px-2 py-0.5 rounded font-mono hover:bg-[rgba(242,239,233,0.08)] transition-colors"
                aria-label="Close"
              >
                ✕ Esc
              </button>
            </div>

            {/* Architectural Illustration of Polar Bear & Panda Together */}
            <div
              onClick={handleSparkle}
              className="relative cursor-pointer group flex justify-center py-4 mb-3 border border-[rgba(242,239,233,0.08)] bg-[#111712]/60 hover:bg-[#161F17] transition-all rounded-sm"
              title="Click to spark starlight"
            >
              <svg
                width="180"
                height="100"
                viewBox="0 0 140 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#F2EFE9] transition-transform duration-300 group-hover:scale-105"
              >
                {/* Night Horizon Hill */}
                <path
                  d="M 10 74 Q 70 66, 130 74"
                  stroke="rgba(242,239,233,0.25)"
                  strokeWidth="1"
                />

                {/* Stars & Constellation in the Sky */}
                <circle cx="28" cy="22" r="0.9" fill="#B8D5FF" className="animate-pulse" />
                <circle cx="112" cy="18" r="0.9" fill="#B8D5FF" className="animate-pulse" />
                <circle cx="70" cy="12" r="1.4" fill="#C87D55" />
                <path d="M 70 7 L 70 17 M 65 12 L 75 12" stroke="#C87D55" strokeWidth="0.7" opacity="0.8" />

                {/* Celestial Guide Line */}
                <line x1="28" y1="22" x2="70" y2="12" stroke="#B8D5FF" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.4" />
                <line x1="70" y1="12" x2="112" y2="18" stroke="#B8D5FF" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.4" />

                {/* POLAR BEAR (Left) — Clean Ivory Silhouette */}
                <g id="polar-bear">
                  {/* Ear */}
                  <path
                    d="M 44 32 C 43 28, 48 27, 49 31 Z"
                    fill="#F2EFE9"
                    stroke="#F2EFE9"
                    strokeWidth="1.2"
                  />
                  {/* Head & Snout gazing at the night sky */}
                  <path
                    d="M 46 33 Q 50 30, 56 34 Q 59 36, 61 39 Q 58 43, 53 43 L 50 48"
                    stroke="#F2EFE9"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Tiny Polar Eye & Nose */}
                  <circle cx="55" cy="35" r="0.9" fill="#0B0E0B" />
                  <circle cx="60.5" cy="38" r="0.8" fill="#C87D55" />

                  {/* Body resting comfortably */}
                  <path
                    d="M 46 33 C 38 37, 34 46, 35 58 C 35 66, 38 71, 48 72 L 64 72"
                    stroke="#F2EFE9"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  {/* Arm resting toward center */}
                  <path
                    d="M 50 48 C 53 54, 57 60, 63 64"
                    stroke="#F2EFE9"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </g>

                {/* PANDA (Right) — Companion Silhouette with Distinctive Markings */}
                <g id="panda">
                  {/* Panda Black Ear */}
                  <circle cx="95" cy="30" r="3.2" fill="#0B0E0B" stroke="#F2EFE9" strokeWidth="1" />

                  {/* Panda Head */}
                  <path
                    d="M 92 33 Q 86 31, 80 35 Q 76 37, 75 40 Q 78 44, 84 44 L 88 48"
                    stroke="#F2EFE9"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Panda Dark Eye Patch */}
                  <ellipse cx="81.5" cy="37" rx="2.2" ry="1.6" fill="#0B0E0B" transform="rotate(-15 81.5 37)" />
                  <circle cx="81.5" cy="36.8" r="0.6" fill="#F2EFE9" />
                  {/* Nose */}
                  <circle cx="75.5" cy="39" r="0.8" fill="#0B0E0B" />

                  {/* Body & Dark Shoulder Band */}
                  <path
                    d="M 92 33 C 100 37, 104 46, 103 58 C 103 66, 100 71, 90 72 L 74 72"
                    stroke="#F2EFE9"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  {/* Dark Arm resting against Polar Bear */}
                  <path
                    d="M 88 48 C 84 54, 80 60, 73 64"
                    stroke="#0B0E0B"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 88 48 C 84 54, 80 60, 73 64"
                    stroke="#F2EFE9"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </g>

                {/* Paw Touch / Companion Bond */}
                <path
                  d="M 62 64 Q 68 63, 74 64"
                  stroke="#C87D55"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* Subtle blades of grass at their feet */}
                <path d="M 68 72 Q 67 67, 69 65" stroke="#5E7161" strokeWidth="1" />
                <path d="M 70 72 Q 72 68, 71 66" stroke="#5E7161" strokeWidth="1" />
                <path d="M 65 73 Q 64 69, 66 67" stroke="#5E7161" strokeWidth="0.8" />
              </svg>

              {/* Sparkle Count Watermark */}
              {starlightCount > 0 && (
                <span className="absolute bottom-1 right-2 text-[10px] font-mono text-[#C87D55] animate-bounce">
                  +{starlightCount} ✦
                </span>
              )}
            </div>

            {/* Poetic Narrative */}
            <div className="text-center space-y-2">
              <h3
                className="text-[20px] sm:text-[22px] font-normal tracking-tight text-[#F2EFE9]"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                Two Companions
              </h3>

              <p className="text-[12px] sm:text-[13px] font-sans text-[#A3A89E] leading-relaxed">
                Sitting peacefully by the quiet water, watching the meadow sway through every dusk and dawn. Side by side, always.
              </p>

              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#5E7161]">
                <span>✦ dawn &amp; night ✦</span>
                <span>•</span>
                <span>infinite bond</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
