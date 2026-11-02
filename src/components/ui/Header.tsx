'use client'

import { useState, useEffect } from 'react'
import { getAmbientSoundEngine } from '@/lib/audio'

interface HeaderProps {
  season: 'Dawn' | 'Sun' | 'Night'
  onSeasonChange: (season: 'Dawn' | 'Sun' | 'Night') => void
  onSoundToggle?: (isActive: boolean) => void
  onContactClick: () => void
  is3DEnabled: boolean
  onToggle3D: () => void
}

const seasons: Array<'Dawn' | 'Sun' | 'Night'> = ['Dawn', 'Sun', 'Night']
const seasonLabels: Record<'Dawn' | 'Sun' | 'Night', string> = {
  Dawn: 'Misty Dawn',
  Sun: 'Sunlit Light',
  Night: 'Starlit Indigo',
}

export default function Header({
  season,
  onSeasonChange,
  onSoundToggle,
  onContactClick,
  is3DEnabled,
  onToggle3D,
}: HeaderProps) {
  const [isAudioActive, setIsAudioActive] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isSunMode = season === 'Sun'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCycleSeason = () => {
    const currentIdx = seasons.indexOf(season)
    const nextIdx = (currentIdx + 1) % seasons.length
    onSeasonChange(seasons[nextIdx])
  }

  const handleSelectSeason = (selected: 'Dawn' | 'Sun' | 'Night') => {
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

  const dialRotation = seasons.indexOf(season) * 120

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isSunMode
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[rgba(11,14,11,0.12)] shadow-sm py-3'
            : 'bg-[#0B0E0B]/92 backdrop-blur-md border-b border-[rgba(242,239,233,0.12)] py-3'
          : 'bg-transparent border-b border-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 flex items-center justify-between">
        {/* Studio Wordmark: vibesite */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="group flex items-baseline gap-2 transition-opacity duration-300 hover:opacity-85"
          >
            <span
              className={`text-[23px] sm:text-[27px] tracking-[-0.03em] font-semibold transition-colors duration-300 ${
                isSunMode ? 'text-[#0B0E0B]' : 'text-[#F2EFE9]'
              }`}
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
        <div className="flex items-center gap-2.5 sm:gap-4 md:gap-6">
          {/* 3D Performance Toggle Switch */}
          <button
            type="button"
            onClick={onToggle3D}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans font-medium border transition-all ${
              isSunMode
                ? is3DEnabled
                  ? 'border-[#0B0E0B]/25 bg-white/70 text-[#0B0E0B] hover:border-[#0B0E0B]/50'
                  : 'border-[#C85D25] bg-[#C85D25]/10 text-[#C85D25]'
                : is3DEnabled
                ? 'border-[#5E7161] bg-[#5E7161]/15 text-[#F2EFE9] hover:border-[#5E7161]/80'
                : 'border-[#C87D55] bg-[#C87D55]/15 text-[#F2EFE9]'
            }`}
            title={
              is3DEnabled
                ? '3D Graphics Active (WebGL 60 FPS). Click for lighter 2D Eco mode.'
                : '2D Eco Mode Active (Zero GPU, lightweight). Click to enable 3D.'
            }
          >
            <span
              className={`w-2 h-2 rounded-full ${
                is3DEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="font-bold tracking-[0.06em]">
              {is3DEnabled ? '3D' : '2D Eco'}
            </span>
          </button>

          {/* Season / Atmosphere Selector (Interactive Pill Tabs) */}
          <div
            className={`flex items-center gap-1 border p-0.5 transition-colors duration-300 ${
              isSunMode
                ? 'border-[rgba(11,14,11,0.18)] bg-white/60'
                : 'border-[rgba(242,239,233,0.16)] bg-[#0B0E0B]/60'
            }`}
          >
            {/* Architectural dial SVG icon button */}
            <button
              type="button"
              onClick={handleCycleSeason}
              className={`p-1 transition-colors focus:outline-none flex-shrink-0 ${
                isSunMode
                  ? 'text-[#0B0E0B]/70 hover:text-[#C87D55]'
                  : 'text-[#A3A89E] hover:text-[#C87D55]'
              }`}
              title="Click to cycle light: Dawn / Sun (Light Mode) / Night"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
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
                  <line x1="12" y1="12" x2="12" y2="6" stroke="#C87D55" strokeWidth="1.8" />
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
                className={`px-2 py-1 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.08em] font-medium transition-all ${
                  season === s
                    ? 'bg-[#C87D55] text-[#F2EFE9] font-bold shadow-sm'
                    : isSunMode
                    ? 'text-[#0B0E0B]/70 hover:text-[#0B0E0B]'
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
            className={`group hidden sm:flex items-center gap-1.5 text-[11px] font-sans tracking-[0.08em] transition-colors focus:outline-none p-1 ${
              isSunMode
                ? 'text-[#0B0E0B]/70 hover:text-[#0B0E0B]'
                : 'text-[#A3A89E] hover:text-[#F2EFE9]'
            }`}
            title={isAudioActive ? 'Mute ambient wind' : 'Listen to ambient wind'}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              className="text-[#C87D55] flex-shrink-0"
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

          {/* Direct Phone Call Button: 80771 71541 */}
          <a
            href="tel:8077171541"
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-[#C87D55] text-[#F2EFE9] hover:bg-[#b5653b] transition-all text-[12px] sm:text-[13px] font-sans font-bold shadow-sm"
            title="Call founder directly at 80771 71541"
          >
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
            <span>80771 71541</span>
          </a>

          {/* Underlined Editorial Link to Drawer */}
          <button
            type="button"
            onClick={onContactClick}
            className={`hidden md:flex items-center gap-1 text-[15px] sm:text-[16px] tracking-[-0.01em] font-medium border-b pb-0.5 transition-colors focus:outline-none ${
              isSunMode
                ? 'text-[#0B0E0B] border-[#0B0E0B]/30 hover:border-[#C87D55] hover:text-[#C87D55]'
                : 'text-[#F2EFE9] border-[rgba(242,239,233,0.35)] hover:border-[#C87D55] hover:text-[#C87D55]'
            }`}
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          >
            <span>Start Project</span>
            <span className="text-[#C87D55] text-[13px]">↗</span>
          </button>
        </div>
      </div>
    </header>
  )
}
