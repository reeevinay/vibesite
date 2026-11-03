import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0E0B] text-[#F2EFE9] flex items-center justify-center p-6 selection:bg-[#C87D55]/30">
      <div className="max-w-[460px] w-full p-8 sm:p-10 border border-[rgba(242,239,233,0.14)] bg-[#111712] text-center space-y-6 shadow-2xl">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5E7161] animate-pulse" />
          <span className="font-sans text-[11px] uppercase tracking-[0.22em] font-bold text-[#8FA392]">
            404 — Path Not Found
          </span>
        </div>

        <h1
          className="text-[36px] sm:text-[42px] font-normal leading-tight text-[#F2EFE9]"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        >
          Beyond the clearing.
        </h1>

        <p className="text-[14px] font-sans text-[#A3A89E] leading-relaxed">
          The requested coordinate does not exist in our web architecture or has moved to another chapter.
        </p>

        <div className="pt-2 flex justify-center">
          <Link
            href="/"
            className="py-3 px-6 bg-[#C87D55] text-[#F2EFE9] hover:bg-[#b5653b] font-sans font-bold text-[13px] transition-colors shadow-md"
          >
            ← Return to vibesite Meadow
          </Link>
        </div>
      </div>
    </div>
  )
}
