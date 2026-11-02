'use client'

interface ChapterNavProps {
  currentChapter: number
  onChapterChange: (chapterIndex: number) => void
  onWorksClick?: () => void
}

const chapters = [
  { numeral: 'I', title: 'The Clearing', label: 'Fast Launch' },
  { numeral: 'II', title: 'The Greenhouse', label: 'Commerce' },
  { numeral: 'III', title: 'The Root System', label: 'SEO & Reach' },
  { numeral: 'IV', title: 'The Open Sky', label: 'Cloud Care' },
]

export default function ChapterNav({
  currentChapter,
  onChapterChange,
  onWorksClick,
}: ChapterNavProps) {
  return (
    <nav
      aria-label="Editorial chapter navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none pointer-events-auto"
    >
      <div className="flex items-center gap-1 sm:gap-2 bg-[#0B0E0B]/90 backdrop-blur-md px-3 sm:px-4 py-2 border border-[rgba(242,239,233,0.16)] shadow-2xl">
        <span className="hidden md:inline-block text-[10px] font-sans uppercase tracking-[0.2em] text-[#5E7161] font-bold mr-2 border-r border-[rgba(242,239,233,0.14)] pr-3">
          Chapters
        </span>

        {chapters.map((ch, idx) => {
          const isActive = currentChapter === idx

          return (
            <button
              key={ch.numeral}
              type="button"
              onClick={() => onChapterChange(idx)}
              className={`group flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-[12px] font-sans transition-all focus:outline-none ${
                isActive
                  ? 'bg-[#C87D55] text-[#F2EFE9] font-bold shadow-sm'
                  : 'text-[#A3A89E] hover:text-[#F2EFE9] hover:bg-white/5'
              }`}
              title={`${ch.numeral}. ${ch.title} — ${ch.label}`}
            >
              <span className="font-mono text-[11px]">{ch.numeral}</span>
              <span
                className="hidden sm:inline text-[12px]"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                {ch.title.replace('The ', '')}
              </span>
            </button>
          )
        })}

        {onWorksClick && (
          <>
            <div className="w-px h-4 bg-[rgba(242,239,233,0.15)] mx-1" />
            <button
              type="button"
              onClick={onWorksClick}
              className="px-2.5 py-1 text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.1em] text-[#A3A89E] hover:text-[#C87D55] font-semibold transition-colors focus:outline-none flex items-center gap-1"
            >
              <span>Works</span>
              <span className="text-[10px] font-mono">(05)</span>
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
