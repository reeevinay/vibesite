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

          {/* Visible Celestial Companion Constellation (Polar Bear & Panda in the night sky) */}
          <div className="absolute top-[14%] right-[8%] sm:right-[12%] opacity-75 pointer-events-none">
            <svg width="120" height="75" viewBox="0 0 120 75" fill="none" stroke="#B8D5FF">
              {/* Polar Bear constellation stars */}
              <circle cx="24" cy="38" r="1.5" fill="#E6F0FF" />
              <circle cx="36" cy="22" r="1.5" fill="#E6F0FF" />
              <circle cx="48" cy="28" r="1.5" fill="#E6F0FF" />
              <circle cx="56" cy="44" r="1.5" fill="#E6F0FF" />

              {/* Central bond star */}
              <circle cx="64" cy="42" r="2.0" fill="#C87D55" />
              <circle cx="64" cy="42" r="4.0" stroke="#C87D55" strokeWidth="0.5" opacity="0.4" />

              {/* Panda constellation stars */}
              <circle cx="72" cy="44" r="1.5" fill="#E6F0FF" />
              <circle cx="82" cy="26" r="1.5" fill="#E6F0FF" />
              <circle cx="94" cy="32" r="1.5" fill="#E6F0FF" />
              <circle cx="88" cy="48" r="1.5" fill="#E6F0FF" />

              {/* Connecting celestial lines */}
              <line x1="24" y1="38" x2="36" y2="22" stroke="#B8D5FF" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              <line x1="36" y1="22" x2="48" y2="28" stroke="#B8D5FF" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              <line x1="48" y1="28" x2="56" y2="44" stroke="#B8D5FF" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              <line x1="56" y1="44" x2="64" y2="42" stroke="#C87D55" strokeWidth="1" opacity="0.8" />

              <line x1="64" y1="42" x2="72" y2="44" stroke="#C87D55" strokeWidth="1" opacity="0.8" />
              <line x1="72" y1="44" x2="82" y2="26" stroke="#B8D5FF" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              <line x1="82" y1="26" x2="94" y2="32" stroke="#B8D5FF" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              <line x1="94" y1="32" x2="88" y2="48" stroke="#B8D5FF" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
            </svg>
            <span className="text-[9px] font-sans tracking-[0.18em] uppercase text-[#B8D5FF]/70 block mt-1 text-right">
              panda &amp; polar bear forever ✦
            </span>
          </div>
        </>
      )}

      {/* Dawn Mode: Misty obsidian forest with gentle companion starlight */}
      {season === 'Dawn' && (
        <>
          <div className="absolute top-[10%] right-[15%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(200,125,85,0.22)_0%,rgba(11,14,11,0)_70%)] blur-3xl" />
          <div className="absolute bottom-[10%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(94,113,97,0.25)_0%,rgba(11,14,11,0)_70%)] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#F2EFE9_0.75px,transparent_0.75px)] [background-size:36px_36px] opacity-[0.05]" />

          {/* Gentle companion constellation in misty dawn sky */}
          <div className="absolute top-[14%] right-[8%] sm:right-[12%] opacity-40 pointer-events-none">
            <svg width="120" height="75" viewBox="0 0 120 75" fill="none" stroke="#C87D55">
              <circle cx="24" cy="38" r="1.3" fill="#F2EFE9" />
              <circle cx="36" cy="22" r="1.3" fill="#F2EFE9" />
              <circle cx="48" cy="28" r="1.3" fill="#F2EFE9" />
              <circle cx="56" cy="44" r="1.3" fill="#F2EFE9" />
              <circle cx="64" cy="42" r="1.8" fill="#C87D55" />
              <circle cx="72" cy="44" r="1.3" fill="#F2EFE9" />
              <circle cx="82" cy="26" r="1.3" fill="#F2EFE9" />
              <circle cx="94" cy="32" r="1.3" fill="#F2EFE9" />
              <circle cx="88" cy="48" r="1.3" fill="#F2EFE9" />

              <line x1="24" y1="38" x2="36" y2="22" stroke="#F2EFE9" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4" />
              <line x1="36" y1="22" x2="48" y2="28" stroke="#F2EFE9" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4" />
              <line x1="48" y1="28" x2="56" y2="44" stroke="#F2EFE9" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4" />
              <line x1="56" y1="44" x2="64" y2="42" stroke="#C87D55" strokeWidth="0.8" opacity="0.6" />
              <line x1="64" y1="42" x2="72" y2="44" stroke="#C87D55" strokeWidth="0.8" opacity="0.6" />
              <line x1="72" y1="44" x2="82" y2="26" stroke="#F2EFE9" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4" />
              <line x1="82" y1="26" x2="94" y2="32" stroke="#F2EFE9" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4" />
              <line x1="94" y1="32" x2="88" y2="48" stroke="#F2EFE9" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4" />
            </svg>
            <span className="text-[9px] font-sans tracking-[0.18em] uppercase text-[#F2EFE9]/40 block mt-1 text-right">
              panda &amp; polar bear forever ✦
            </span>
          </div>
        </>
      )}

      {/* Gentle performance mode indicator watermark in bottom left */}
      <div className="absolute bottom-6 left-6 hidden lg:flex items-center gap-2 px-3 py-1.5 border border-[rgba(242,239,233,0.12)] bg-[#0B0E0B]/70 backdrop-blur-sm text-[10px] font-sans uppercase tracking-[0.16em] text-[#A3A89E]">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span className="font-semibold">2D Eco Mode (Fluid)</span>
      </div>
    </div>
  )
}
