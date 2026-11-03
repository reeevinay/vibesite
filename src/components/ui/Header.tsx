'use client'

import { useState, useEffect } from 'react'
import { getAmbientSoundEngine } from '@/lib/audio'

interface HeaderProps {
  season: 'Dawn' | 'Night'
  onSeasonChange: (season: 'Dawn' | 'Night') => void
  onSoundToggle?: (isActive: boolean) => void
  onContactClick: () => void
  is3DEnabled: boolean
  onToggle3D: () => void
}

const seasons: Array<'Dawn' | 'Night'> = ['Dawn', 'Night']

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleToggleSeason = () => {
    onSeasonChange(season === 'Dawn' ? 'Night' : 'Dawn')
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0E0B]/92 backdrop-blur-md border-b border-[rgba(242,239,233,0.12)] py-3 sm:py-3.5 shadow-lg'
          : 'bg-transparent border-b border-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 flex items-center justify-between">
        {/* Studio Wordmark: vibesite studio */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-baseline gap-1.5 sm:gap-2 transition-opacity duration-300 hover:opacity-85 focus:outline-none cursor-pointer text-left"
            aria-label="vibesite studio — Return to top"
          >
            <span
              className="text-[22px] sm:text-[27px] tracking-[-0.03em] font-semibold text-[#F2EFE9]"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              vibesite
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-sans text-[#C87D55] font-bold">
              studio
            </span>
          </button>
        </div>

        {/* Controls and CTA */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          {/* 3D Performance Toggle Switch */}
          <button
            type="button"
            onClick={onToggle3D}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-sans font-medium border transition-all ${
              is3DEnabled
                ? 'border-[#5E7161] bg-[#5E7161]/15 text-[#F2EFE9] hover:border-[#5E7161]/80'
                : 'border-[#C87D55] bg-[#C87D55]/15 text-[#F2EFE9]'
            }`}
            title={
              is3DEnabled
                ? '3D Graphics Active (WebGL 60 FPS). Click for lighter 2D Eco mode.'
                : '2D Eco Mode Active (Fluid, low GPU). Click to enable 3D.'
            }
          >
            <span
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                is3DEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="font-bold tracking-[0.06em]">
              {is3DEnabled ? '3D' : '2D Eco'}
            </span>
          </button>

          {/* Atmosphere Toggle (Dawn / Night) */}
          <button
            type="button"
            onClick={handleToggleSeason}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans border border-[rgba(242,239,233,0.16)] bg-[#0B0E0B]/60 text-[#A3A89E] hover:text-[#F2EFE9] transition-all"
            title={`Current: ${season === 'Night' ? 'Starlit Indigo' : 'Misty Dawn'}. Click to toggle.`}
          >
            {season === 'Night' ? (
              <>
                <span className="text-[11px] text-[#B8D5FF]">✦</span>
                <span className="font-medium text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-[#F2EFE9]">Night</span>
              </>
            ) : (
              <>
                <span className="text-[11px] text-[#C87D55]">☼</span>
                <span className="font-medium text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-[#F2EFE9]">Dawn</span>
              </>
            )}
          </button>

          {/* Procedural Audio Toggle (Desktop only for minimal mobile clutter) */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="group hidden md:flex items-center gap-1.5 text-[11px] font-sans tracking-[0.08em] text-[#A3A89E] hover:text-[#F2EFE9] transition-colors focus:outline-none p-1"
            title={isAudioActive ? 'Mute ambient wind' : 'Listen to ambient wind'}
          >
            <svg
              width="16"
              height="16"
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
            <span className="uppercase text-[10px] tracking-[0.12em] font-medium">
              {isAudioActive ? 'Sound On' : 'Sound'}
            </span>
          </button>

          {/* Direct Phone Call Button: 80771 71541 */}
          <a
            href="tel:8077171541"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C87D55] text-[#F2EFE9] hover:bg-[#b5653b] transition-all text-[11px] sm:text-[13px] font-sans font-bold shadow-sm whitespace-nowrap"
            title="Direct line: 80771 71541"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="flex-shrink-0"
            >
              <path d="M2.5 3C2.5 2.44772 2.94772 2 3.5 2H5.67157C6.06939 2 6.42676 2.23594 6.57863 2.60041L7.52554 4.87299C7.68936 5.26615 7.56847 5.72365 7.22728 5.98188L5.94975 6.94862C6.91138 9.07005 8.62995 10.7886 10.7514 11.7503L11.7181 10.4727C11.9764 10.1315 12.4338 10.0106 12.827 10.1745L15.0996 11.1214C15.4641 11.2732 15.7 11.6306 15.7 12.0284V14.2C15.7 14.7523 15.2523 15.2 14.7 15.2C7.96223 15.2 2.5 9.73777 2.5 3Z" />
            </svg>
            <span className="hidden xs:inline">80771 71541</span>
            <span className="xs:hidden">Call</span>
          </a>

          {/* Scope Drawer Trigger */}
          <button
            type="button"
            onClick={onContactClick}
            className="hidden sm:inline-block text-[12px] font-sans text-[#F2EFE9] hover:text-[#C87D55] transition-colors uppercase tracking-[0.12em] font-medium"
          >
            Scope ↗
          </button>
        </div>
      </div>
    </header>
  )
}
