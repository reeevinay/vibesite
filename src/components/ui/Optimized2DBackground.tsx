'use client'

interface Optimized2DBackgroundProps {
  season: 'Dawn' | 'Night'
}

export default function Optimized2DBackground({ season }: Optimized2DBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden transition-colors duration-700 ease-out"
      style={{
        backgroundColor: season === 'Night' ? '#040714' : '#0B0E0B',
      }}
    >
      {/* Night Mode: Celestial deep starlit indigo */}
      {season === 'Night' && (
        <>
          <div className="absolute top-[5%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(65,95,145,0.3)_0%,rgba(4,7,20,0)_70%)] blur-3xl" />
          <div className="absolute bottom-[15%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(40,60,90,0.35)_0%,rgba(4,7,20,0)_70%)] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#B8D5FF_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.25]" />

          {/* Subtle Celestial Companion Constellation (Polar Bear & Panda hint in the night sky) */}
          <div className="absolute top-[18%] right-[14%] opacity-[0.14] pointer-events-none hidden md:block">
            <svg width="90" height="60" viewBox="0 0 90 60" fill="none" stroke="#B8D5FF" strokeWidth="0.6">
              <circle cx="20" cy="30" r="1.2" fill="#B8D5FF" />
              <circle cx="32" cy="18" r="1.2" fill="#B8D5FF" />
              <circle cx="42" cy="24" r="1.2" fill="#B8D5FF" />
              <circle cx="48" cy="38" r="1.2" fill="#C87D55" />
              <circle cx="60" cy="22" r="1.2" fill="#B8D5FF" />
              <circle cx="72" cy="28" r="1.2" fill="#B8D5FF" />
              <circle cx="68" cy="42" r="1.2" fill="#B8D5FF" />
              {/* Connecting celestial lines */}
              <line x1="20" y1="30" x2="32" y2="18" strokeDasharray="2 3" />
              <line x1="32" y1="18" x2="42" y2="24" strokeDasharray="2 3" />
              <line x1="42" y1="24" x2="48" y2="38" strokeDasharray="2 3" />
              <line x1="48" y1="38" x2="60" y2="22" strokeDasharray="2 3" />
              <line x1="60" y1="22" x2="72" y2="28" strokeDasharray="2 3" />
              <line x1="72" y1="28" x2="68" y2="42" strokeDasharray="2 3" />
            </svg>
          </div>
        </>
      )}

      {/* Dawn Mode: Misty obsidian forest */}
      {season === 'Dawn' && (
        <>
          <div className="absolute top-[10%] right-[15%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(200,125,85,0.22)_0%,rgba(11,14,11,0)_70%)] blur-3xl" />
          <div className="absolute bottom-[10%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(94,113,97,0.25)_0%,rgba(11,14,11,0)_70%)] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#F2EFE9_0.75px,transparent_0.75px)] [background-size:36px_36px] opacity-[0.05]" />
        </>
      )}

      {/* Gentle performance mode indicator watermark in bottom left (hidden on mobile for spaciousness) */}
      <div className="absolute bottom-6 left-6 hidden lg:flex items-center gap-2 px-3 py-1.5 border border-[rgba(242,239,233,0.12)] bg-[#0B0E0B]/70 backdrop-blur-sm text-[10px] font-sans uppercase tracking-[0.16em] text-[#A3A89E]">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span className="font-semibold">2D Eco Mode (Fluid)</span>
      </div>
    </div>
  )
}
