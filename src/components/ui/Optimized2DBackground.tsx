'use client'

interface Optimized2DBackgroundProps {
  season: 'Dawn' | 'Sun' | 'Night'
}

export default function Optimized2DBackground({ season }: Optimized2DBackgroundProps) {
  // Season-dependent 2D visual atmospheres (zero WebGL, 100% smooth GPU-free CSS)
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden transition-colors duration-700 ease-out"
      style={{
        backgroundColor:
          season === 'Sun'
            ? '#FBF9F1'
            : season === 'Night'
            ? '#040714'
            : '#0B0E0B',
      }}
    >
      {/* Sun Mode: Natural warm sunlight aesthetic with soft cream base & subtle golden highlights */}
      {season === 'Sun' && (
        <>
          <div className="absolute top-[-8%] right-[8%] w-[65vw] h-[65vw] rounded-full bg-[radial-gradient(circle,rgba(240,195,110,0.22)_0%,rgba(251,249,241,0)_70%)] blur-3xl" />
          <div className="absolute bottom-[8%] left-[-4%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(200,125,85,0.12)_0%,rgba(251,249,241,0)_70%)] blur-3xl" />
          {/* Subtle golden sunlight geometric micro-grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#D49A3D_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-[0.09]" />
        </>
      )}

      {/* Night Mode: Celestial deep starlit indigo */}
      {season === 'Night' && (
        <>
          <div className="absolute top-[5%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(65,95,145,0.3)_0%,rgba(4,7,20,0)_70%)] blur-3xl" />
          <div className="absolute bottom-[15%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(40,60,90,0.35)_0%,rgba(4,7,20,0)_70%)] blur-3xl" />
          {/* Subtle celestial stars via CSS dots */}
          <div className="absolute inset-0 bg-[radial-gradient(#B8D5FF_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.25]" />
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

      {/* Gentle performance mode indicator watermark in bottom left */}
      <div
        className={`absolute bottom-6 left-6 hidden lg:flex items-center gap-2 px-3 py-1.5 border text-[10px] font-sans uppercase tracking-[0.16em] backdrop-blur-sm transition-colors ${
          season === 'Sun'
            ? 'bg-[#FDFBF7]/90 border-[rgba(26,26,26,0.12)] text-[#1A1A1A] shadow-[0_4px_16px_rgba(26,26,26,0.06)]'
            : 'bg-[#0B0E0B]/70 border-[rgba(242,239,233,0.12)] text-[#A3A89E]'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span className="font-semibold">2D Eco Mode (Low GPU / Fluid)</span>
      </div>
    </div>
  )
}
