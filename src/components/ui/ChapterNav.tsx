'use client'

interface ChapterNavProps {
  currentChapter: number
  onChapterChange: (chapterIndex: number) => void
  season?: 'Dawn' | 'Sun' | 'Night'
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
  season = 'Dawn',
}: ChapterNavProps) {
  const isSunMode = season === 'Sun'

  return (
    <nav
      aria-label="Editorial chapter navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none pointer-events-auto"
    >
      <div
        className={`flex items-center gap-1 sm:gap-2 backdrop-blur-md px-3 sm:px-4 py-2 border shadow-2xl transition-colors duration-300 ${
          isSunMode
            ? 'bg-[#FAF7F2]/95 border-[#0B0E0B]/18 text-[#0B0E0B]'
            : 'bg-[#0B0E0B]/90 border-[rgba(242,239,233,0.16)] text-[#F2EFE9]'
        }`}
      >
        <span
          className={`hidden md:inline-block text-[10px] font-sans uppercase tracking-[0.2em] font-bold mr-2 border-r pr-3 ${
            isSunMode
              ? 'text-[#5E7161] border-[#0B0E0B]/15'
              : 'text-[#5E7161] border-[rgba(242,239,233,0.14)]'
          }`}
        >
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
                  : isSunMode
                  ? 'text-[#0B0E0B]/70 hover:text-[#0B0E0B] hover:bg-black/5'
                  : 'text-[#A3A89E] hover:text-[#F2EFE9] hover:bg-white/5'
              }`}
              title={`${ch.numeral}. ${ch.title} — ${ch.label}`}
            >
              <span className="font-mono text-[11px] font-bold">{ch.numeral}</span>
              <span
                className="hidden sm:inline text-[12px]"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                {ch.title.replace('The ', '')}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
