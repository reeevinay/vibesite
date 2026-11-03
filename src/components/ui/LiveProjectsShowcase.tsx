'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ProjectItem {
  id: string
  title: string
  category: string
  badgeColor: string
  url: string
  domain: string
  subhead: string
  imageSrc: string
}

const LIVE_PROJECTS: ProjectItem[] = [
  {
    id: 'ze-jewelry',
    title: 'ZE Jewelry',
    category: 'Fine Jewelry',
    badgeColor: 'bg-[#FF2E7E] text-white',
    url: 'https://ze-jewelery.vercel.app/',
    domain: 'ze-jewelery.vercel.app',
    subhead: 'Luxury D2C diamond & gold jewelry store with instant UPI checkout.',
    imageSrc: '/projects/ze.png',
  },
  {
    id: 'blush-and-bangs',
    title: 'Blush and Bangs',
    category: 'Hairdressing',
    badgeColor: 'bg-[#6C38FF] text-white',
    url: 'https://bnb-6spd.vercel.app/',
    domain: 'bnb-6spd.vercel.app',
    subhead: 'Luxury bridal studio, hair styling showcase & appointment platform.',
    imageSrc: '/projects/bnb.png',
  },
  {
    id: 'furniture-one',
    title: 'Furniture One',
    category: 'Modern Living',
    badgeColor: 'bg-[#00B894] text-black',
    url: 'https://furniture-one-virid.vercel.app/',
    domain: 'furniture-one-virid.vercel.app',
    subhead: 'Minimalist Scandinavian furniture craftsmanship & spatial commerce.',
    imageSrc: '/projects/furniture.png',
  },
  {
    id: 'growmore-production',
    title: 'GrowMore Production',
    category: 'Film & Media',
    badgeColor: 'bg-[#00D2D3] text-black',
    url: 'https://growmoreproduction.vercel.app/',
    domain: 'growmoreproduction.vercel.app',
    subhead: 'Cinematic commercial film reels, brand campaigns & media distribution.',
    imageSrc: '/projects/growmore.png',
  },
  {
    id: 'peace-living',
    title: 'Peace Living',
    category: 'Real Estate',
    badgeColor: 'bg-[#FFA502] text-black',
    url: 'https://peaceliving.in/',
    domain: 'peaceliving.in',
    subhead: 'Google Knowledge Graph foundation & luxury architectural sanctuary villas.',
    imageSrc: '/projects/peaceliving.png',
  },
]

interface LiveProjectsShowcaseProps {
  onOpenDrawer: () => void
}

export default function LiveProjectsShowcase({ onOpenDrawer }: LiveProjectsShowcaseProps) {
  const [activeTab, setActiveTab] = useState<number>(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScrollTo = (index: number) => {
    setActiveTab(index)
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 360
      scrollContainerRef.current.scrollTo({
        left: index * (cardWidth + 24),
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="relative z-20 py-20 sm:py-28 bg-[#F6F3EB] text-[#1A1A1A] border-t-2 border-b-2 border-[#1A1A1A] overflow-hidden">
      {/* Background Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 relative">
        {/* Header Label & Headline */}
        <div className="text-center max-w-[760px] mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#1A1A1A] bg-white text-[11px] font-sans font-bold tracking-[0.18em] uppercase shadow-[3px_3px_0px_#1A1A1A]">
            <span className="w-2 h-2 rounded-full bg-[#FF2E7E] animate-pulse" />
            <span>Actual Live Production Platforms</span>
          </div>

          <h2
            className="text-[36px] sm:text-[48px] md:text-[54px] font-semibold leading-[1.06] tracking-[-0.03em] text-[#1A1A1A]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Live client systems that{' '}
            <span className="italic font-normal text-[#C87D55] underline decoration-2 decoration-[#1A1A1A] underline-offset-6">
              convert
            </span>
            .
          </h2>

          <p className="text-[15px] sm:text-[16px] font-sans text-[#555] max-w-[560px] mx-auto leading-relaxed">
            Real landing page screenshots from websites launched by vibesite studio. Tap any window to visit the live system.
          </p>

          {/* Quick Filter / Project Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {LIVE_PROJECTS.map((project, idx) => (
              <button
                key={project.id}
                type="button"
                onClick={() => handleScrollTo(idx)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-sans font-bold border-2 transition-all cursor-pointer ${
                  activeTab === idx
                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-[2px_2px_0px_#C87D55]'
                    : 'border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-gray-100'
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Browser Cards Showcase Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {LIVE_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[310px] sm:w-[370px] md:w-[410px] snap-center group"
            >
              {/* Outer Browser Window Mockup Frame */}
              <div className="relative rounded-2xl border-2 sm:border-[2.5px] border-[#1A1A1A] bg-white overflow-hidden shadow-[6px_6px_0px_#1A1A1A] sm:shadow-[8px_8px_0px_#1A1A1A] transition-transform duration-300 group-hover:-translate-y-1.5 flex flex-col h-[480px] sm:h-[510px]">
                
                {/* 1. Browser Window Top Chrome Bar */}
                <div className="bg-[#EFECE4] border-b-2 border-[#1A1A1A] px-3.5 py-2.5 flex items-center justify-between relative z-20">
                  {/* macOS Traffic Light Window Buttons */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                  </div>

                  {/* Centered Domain URL Pill */}
                  <div className="px-3 py-0.5 rounded-full bg-white border border-[#1A1A1A]/40 text-[11px] font-mono font-medium text-[#444] shadow-inner truncate max-w-[170px] sm:max-w-[210px]">
                    {project.domain}
                  </div>

                  {/* Dummy bookmark dot */}
                  <span className="w-2.5 h-2.5 rounded-full border border-black/30" />
                </div>

                {/* 2. Floating Category Tag Badge (Top-Right Pop style from screenshot) */}
                <div className="absolute top-12 right-3.5 z-20 pointer-events-none">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-sans font-extrabold uppercase tracking-wider border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] ${project.badgeColor}`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* 3. Actual Landing Page Screenshot Viewport */}
                <div className="relative flex-1 bg-[#111] overflow-hidden">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full h-full relative"
                    title={`Open live site: ${project.title}`}
                  >
                    <Image
                      src={project.imageSrc}
                      alt={`${project.title} — Actual Live Landing Page Screenshot`}
                      fill
                      sizes="(max-width: 640px) 310px, (max-width: 1024px) 370px, 410px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={idx < 2}
                    />

                    {/* Bottom Vignette Gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                    {/* 4. Floating Action Pill (from reference screenshot: "Take it over — rolls all the way") */}
                    <div className="absolute bottom-3.5 inset-x-3.5 flex justify-center z-10">
                      <div className="w-full py-2.5 px-4 rounded-full border-2 border-white/90 bg-[#1A1A1A]/95 group-hover:bg-[#C87D55] backdrop-blur-md text-white transition-all duration-200 flex items-center justify-between shadow-[3px_3px_0px_#000]">
                        <span className="text-[12px] font-sans font-bold flex items-center gap-1.5">
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 13L13 3M13 3H6M13 3V10" />
                          </svg>
                          <span>Take it over</span>
                        </span>
                        <span className="text-[10px] font-mono tracking-wider opacity-90 group-hover:translate-x-1 transition-transform">
                          rolls all the way ↗
                        </span>
                      </div>
                    </div>
                  </a>
                </div>

                {/* 5. Bottom Card Meta Bar */}
                <div className="p-3.5 bg-white border-t-2 border-[#1A1A1A] flex items-center justify-between">
                  <div className="truncate pr-2">
                    <h4 className="text-[14px] font-sans font-bold text-[#1A1A1A] truncate">
                      {project.title}
                    </h4>
                    <p className="text-[11px] font-sans text-[#666] truncate">
                      {project.subhead}
                    </p>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white transition-colors flex-shrink-0"
                    title={`Open ${project.title}`}
                  >
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 12L12 2M12 2H5M12 2V9" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 6. Centered Bottom Action Pill (Exact Match to "👁 I'll try it for free →" from screenshot) */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            type="button"
            onClick={onOpenDrawer}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 font-sans font-bold text-[14px] sm:text-[15px] shadow-[5px_5px_0px_#1A1A1A] hover:shadow-[2px_2px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
          >
            {/* Eye Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:scale-110 transition-transform text-[#C87D55]"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>I&apos;ll try it for free →</span>
          </button>
          <p className="mt-3 text-[12px] font-sans text-[#777]">
            Direct founder consultation • Instant project scope calculator • Zero obligation
          </p>
        </div>
      </div>
    </section>
  )
}
