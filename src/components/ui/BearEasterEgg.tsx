'use client'

import { useState } from 'react'

export default function BearEasterEgg() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-flex items-center">
      {/* Discreet Trigger: 1px Hairline Companion Bears Glyph */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center gap-1.5 p-1 rounded-sm text-[#A3A89E]/45 hover:text-[#C87D55] transition-all duration-300 focus:outline-none"
        title="A quiet secret in the meadow..."
        aria-label="Secret Meadow Companions"
      >
        <svg
          width="20"
          height="14"
          viewBox="0 0 32 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          {/* Polar Bear (Left): Sleek white/parchment silhouette sitting calmly */}
          <path
            d="M 12 19 C 12 14, 10 10, 8 9 C 7.5 7.5, 6 6.5, 4.5 7 C 3.5 7.5, 3.5 9, 3.5 10 C 2 11, 2 13, 2.5 15 C 3 17, 4 19, 5.5 20 L 13 20"
            stroke="currentColor"
            fill="none"
          />
          {/* Polar Bear Ear */}
          <circle cx="5" cy="6.5" r="1.2" stroke="currentColor" fill="currentColor" fillOpacity="0.2" />

          {/* Panda Bear (Right): Round companion with subtle dark patches */}
          <path
            d="M 13 20 L 26.5 20 C 28 19, 29 17, 28.5 15 C 28 13, 27 11.5, 25.5 10 C 25.5 9, 25.5 7.5, 24.5 7 C 23 6.5, 21.5 7.5, 21 9 C 19 10, 17 14, 17 19"
            stroke="currentColor"
            fill="none"
          />
          {/* Panda Ear (Darkened) */}
          <circle cx="24" cy="6.5" r="1.4" fill="currentColor" stroke="currentColor" />
          {/* Panda Eye Patch */}
          <ellipse cx="25" cy="11.5" rx="1.2" ry="1.6" fill="currentColor" transform="rotate(-15 25 11.5)" />

          {/* Tiny shared starlight between them */}
          <circle cx="14.5" cy="6" r="0.8" fill="#C87D55" stroke="none" className="animate-pulse" />
        </svg>

        <span className="text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-75 transition-opacity duration-300 hidden sm:inline">
          secret
        </span>
      </button>

      {/* Floating Gentle Easter Egg Card */}
      {isOpen && (
        <>
          {/* Invisible backdrop dismiss */}
          <div
            className="fixed inset-0 z-[60]"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="absolute bottom-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mb-3 z-[70] w-[290px] sm:w-[320px] p-5 border border-[rgba(242,239,233,0.16)] bg-[#0B0E0B]/95 text-[#F2EFE9] shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-[#A3A89E] hover:text-[#F2EFE9] text-[13px] p-1 font-mono transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Architectural Illustration of Polar Bear & Panda Together */}
            <div className="flex justify-center py-2 mb-3">
              <svg
                width="140"
                height="80"
                viewBox="0 0 140 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#F2EFE9]"
              >
                {/* Night Horizon Hill */}
                <path
                  d="M 10 74 Q 70 66, 130 74"
                  stroke="rgba(242,239,233,0.2)"
                  strokeWidth="1"
                />

                {/* Stars in the Sky */}
                <circle cx="28" cy="22" r="0.75" fill="#B8D5FF" />
                <circle cx="112" cy="18" r="0.75" fill="#B8D5FF" />
                <circle cx="70" cy="14" r="1.2" fill="#C87D55" />
                <path d="M 70 10 L 70 18 M 66 14 L 74 14" stroke="#C87D55" strokeWidth="0.6" opacity="0.6" />

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

                  {/* Body & Back resting comfortably */}
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
                    strokeWidth="1.2"
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
                    stroke="#F2EFE9"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 88 48 C 84 54, 80 60, 73 64"
                    stroke="#0B0E0B"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </g>

                {/* Paw Touch / Companion Bond */}
                <path
                  d="M 62 64 Q 68 63, 74 64"
                  stroke="#C87D55"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />

                {/* Subtle blade of grass at their feet */}
                <path d="M 68 72 Q 67 67, 69 65" stroke="#5E7161" strokeWidth="0.8" />
                <path d="M 70 72 Q 72 68, 71 66" stroke="#5E7161" strokeWidth="0.8" />
              </svg>
            </div>

            {/* Editorial Caption */}
            <div className="text-center space-y-1.5">
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C87D55] animate-pulse" />
                <span className="font-sans text-[10px] uppercase tracking-[0.24em] font-bold text-[#C87D55]">
                  Quiet Meadow Secret
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C87D55] animate-pulse" />
              </div>

              <h4
                className="text-[17px] font-medium tracking-tight text-[#F2EFE9]"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                Polar &amp; Panda
              </h4>

              <p className="text-[12px] font-sans text-[#A3A89E] leading-relaxed">
                Different worlds, one quiet home under the stars. Sitting side by side in the living meadow.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
