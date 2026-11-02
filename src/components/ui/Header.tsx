'use client'

import { useState, useEffect } from 'react'
import { getAmbientSoundEngine } from '@/lib/audio'

interface HeaderProps {
  onSeasonChange: (season: 'Dawn' | 'Sun' | 'Night') => void
  onSoundToggle?: (isActive: boolean) => void
  onContactClick: () => void
  onProjectsClick?: () => void
}

const seasons: Array<'Dawn' | 'Sun' | 'Night'> = ['Dawn', 'Sun', 'Night']
const seasonLabels: Record<'Dawn' | 'Sun' | 'Night', string> = {
  Dawn: 'Dawn Light',
  Sun: 'Sunlit Clay',
  Night: 'Starlit Indigo',
}

export default function Header({
  onSeasonChange,
  onSoundToggle,
  onContactClick,
  onProjectsClick,
}: HeaderProps) {
  const [seasonIndex, setSeasonIndex] = useState(0)
  const [isAudioActive, setIsAudioActive] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCycleSeason = () => {
    const nextIdx = (seasonIndex + 1) % seasons.length
    setSeasonIndex(nextIdx)
    onSeasonChange(seasons[nextIdx])
  }

  const handleSelectSeason = (selected: 'Dawn' | 'Sun' | 'Night') => {
    const idx = seasons.indexOf(selected)
    setSeasonIndex(idx)
    onSeasonChange(selected)
  }

  const handleToggleSound = () => {
    try {
      const engine = getAmbientSoundEngine()
      if (engine) {
        const active = engine.toggle()
        setIsAudioActive(active)
        onSoundToggle?.(active)
      }
    } catch {
      // Audio context might be restricted before user interaction
    }
  }

  const currentSeason = seasons[seasonIndex]
  const dialRotation = seasonIndex * 120

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0E0B]/92 backdrop-blur-md border-b border-[rgba(242,239,233,0.12)] py-3 sm:py-3.5'
          : 'bg-transparent border-b border-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 flex items-center justify-between">
        {/* Studio Wordmark: vibesite */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="group flex items-baseline gap-2 text-[#F2EFE9] transition-opacity duration-300 hover:opacity-85"
          >
            <span
              className="text-[23px] sm:text-[27px] tracking-[-0.03em] font-semibold text-[#F2EFE9]"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              vibesite
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-sans text-[#C87D55] font-bold">
              studio
            </span>
          </a>
        </div>

        {/* Controls and CTA */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
          {/* Direct Projects Link */}
          {onProjectsClick && (
            <button
              type="button"
              onClick={onProjectsClick}
              className="hidden xl:inline-flex items-center gap-1.5 text-[12px] font-sans font-medium uppercase tracking-[0.14em] text-[#A3A89E] hover:text-[#F2EFE9] transition-colors focus:outline-none"
            >
              <span>Selected Works</span>
              <span className="text-[10px] text-[#C87D55] font-mono">(05)</span>
            </button>
          )}

          {/* Season / Atmosphere Selector (Interactive Pill Tabs) */}
          <div className="flex items-center gap-1 border border-[rgba(242,239,233,0.16)] p-0.5 bg-[#0B0E0B]/60">
            {/* Architectural dial SVG icon button */}
            <button
              type="button"
              onClick={handleCycleSeason}
              className="p-1 text-[#A3A89E] hover:text-[#C87D55] transition-colors focus:outline-none flex-shrink-0"
              title="Click to cycle light: Dawn / Sun / Night"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="transition-transform duration-500 ease-out"
              >
                <circle cx="12" cy="12" r="9" opacity="0.4" />
                <line x1="12" y1="3" x2="12" y2="5" />
                <line x1="19.79" y1="16.5" x2="18.06" y2="15.5" />
                <line x1="4.21" y1="16.5" x2="5.94" y2="15.5" />
                <g
                  style={{
                    transformOrigin: '12px 12px',
                    transform: `rotate(${dialRotation}deg)`,
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <line x1="12" y1="12" x2="12" y2="6" stroke="#C87D55" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="1.8" fill="#C87D55" />
                </g>
              </svg>
            </button>

            {/* Direct Season Selector Buttons */}
            {(['Dawn', 'Sun', 'Night'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSelectSeason(s)}
                className={`px-2 py-1 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.1em] font-medium transition-all ${
                  currentSeason === s
                    ? 'bg-[#C87D55] text-[#F2EFE9] font-bold shadow-sm'
                    : 'text-[#A3A89E] hover:text-[#F2EFE9]'
                }`}
                title={`Switch to ${seasonLabels[s]}`}
              >
                {s === 'Dawn' ? 'Dawn' : s === 'Sun' ? 'Sun' : 'Night'}
              </button>
            ))}
          </div>

          {/* Procedural Audio Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="group flex items-center gap-1.5 text-[11px] font-sans tracking-[0.08em] text-[#A3A89E] hover:text-[#F2EFE9] transition-colors focus:outline-none p-1"
            title={isAudioActive ? 'Mute ambient wind' : 'Listen to ambient wind'}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="text-[#A3A89E] group-hover:text-[#C87D55] transition-colors flex-shrink-0"
            >
              <line
                x1="4"
                y1={isAudioActive ? '5' : '9'}
                x2="4"
                y2={isAudioActive ? '15' : '11'}
                className="transition-all duration-300"
              />
              <line
                x1="10"
                y1={isAudioActive ? '2' : '8'}
                x2="10"
                y2={isAudioActive ? '18' : '12'}
                className="transition-all duration-300"
              />
              <line
                x1="16"
                y1={isAudioActive ? '6' : '9'}
                x2="16"
                y2={isAudioActive ? '14' : '11'}
                className="transition-all duration-300"
              />
            </svg>
            <span className="hidden lg:inline uppercase text-[10px] tracking-[0.12em] font-medium">
              {isAudioActive ? 'Sound On' : 'Sound'}
            </span>
          </button>

          {/* Direct Phone Call Button: 8077171541 */}
          <a
            href="tel:8077171541"
            className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 bg-[#F2EFE9] text-[#0B0E0B] hover:bg-[#C87D55] hover:text-[#F2EFE9] transition-all text-[12px] sm:text-[13px] font-sans font-bold shadow-sm"
            title="Call founder directly at 8077171541"
          >
            {/* Phone SVG */}
            <svg
              width="13"
              height="13"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="flex-shrink-0"
            >
              <path d="M2.5 3C2.5 2.44772 2.94772 2 3.5 2H5.67157C6.06939 2 6.42676 2.23594 6.57863 2.60041L7.52554 4.87299C7.68936 5.26615 7.56847 5.72365 7.22728 5.98188L5.94975 6.94862C6.91138 9.07005 8.62995 10.7886 10.7514 11.7503L11.7181 10.4727C11.9764 10.1315 12.4338 10.0106 12.827 10.1745L15.0996 11.1214C15.4641 11.2732 15.7 11.6306 15.7 12.0284V14.2C15.7 14.7523 15.2523 15.2 14.7 15.2C7.96223 15.2 2.5 9.73777 2.5 3Z" />
            </svg>
            <span className="hidden sm:inline">Call</span>
            <span>80771 71541</span>
          </a>

          {/* Underlined Editorial Link to Drawer */}
          <button
            type="button"
            onClick={onContactClick}
            className="hidden md:flex items-center gap-1.5 text-[#F2EFE9] hover:text-[#C87D55] transition-colors focus:outline-none"
          >
            <span
              className="text-[15px] sm:text-[16px] tracking-[-0.01em] font-medium border-b border-[rgba(242,239,233,0.35)] group-hover:border-[#C87D55] pb-0.5"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              Start Project
            </span>
            <span className="text-[#C87D55] text-[13px]">↗</span>
          </button>
        </div>
      </div>
    </header>
  )
}
