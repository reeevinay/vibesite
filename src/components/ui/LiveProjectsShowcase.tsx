'use client'

import { useState, useRef } from 'react'

interface ProjectItem {
  id: string
  title: string
  category: string
  badgeColor: string
  url: string
  domain: string
  headline: string
  subhead: string
  accentWord: string
  theme: 'dark' | 'light' | 'warm'
  tags: string[]
}

const LIVE_PROJECTS: ProjectItem[] = [
  {
    id: 'ze-jewelry',
    title: 'ZE Jewelry',
    category: 'Fine Jewelry',
    badgeColor: 'bg-[#FF2E7E] text-white border-black',
    url: 'https://ze-jewelery.vercel.app/',
    domain: 'ze-jewelery.vercel.app',
    headline: 'Elegance Crafted For Every',
    accentWord: 'Moment',
    subhead: 'Bespoke diamond rings, fine gold jewelry, and instant mobile UPI checkout.',
    theme: 'dark',
    tags: ['Luxury D2C', 'Instant Checkout', 'Sub-500ms'],
  },
  {
    id: 'blush-and-bangs',
    title: 'Blush and Bangs',
    category: 'Hair & Makeup',
    badgeColor: 'bg-[#6C38FF] text-white border-black',
    url: 'https://bnb-6spd.vercel.app/',
    domain: 'bnb-6spd.vercel.app',
    headline: 'Trend-setting Artistry That Defines',
    accentWord: 'You',
    subhead: 'Bespoke bridal portfolios, luxury makeup artistry & salon appointment scheduler.',
    theme: 'light',
    tags: ['Bridal Studio', 'Appointment Flow', 'Fast Mobile'],
  },
  {
    id: 'furniture-one',
    title: 'Furniture One',
    category: 'Modern Living',
    badgeColor: 'bg-[#00B894] text-black border-black',
    url: 'https://furniture-one-virid.vercel.app/',
    domain: 'furniture-one-virid.vercel.app',
    headline: 'Architectural Furniture Designed For',
    accentWord: 'Peace',
    subhead: 'Minimalist Scandinavian craftsmanship, spatial ergonomics & modular living rooms.',
    theme: 'warm',
    tags: ['Spatial Commerce', 'Zero Clutter', '3D Layout'],
  },
  {
    id: 'growmore-production',
    title: 'GrowMore Production',
    category: 'Film & Media',
    badgeColor: 'bg-[#00D2D3] text-black border-black',
    url: 'https://growmoreproduction.vercel.app/',
    domain: 'growmoreproduction.vercel.app',
    headline: 'Cinematic Stories Told With Bold',
    accentWord: 'Clarity',
    subhead: 'High-production commercial film reels, brand campaigns & media distribution.',
    theme: 'dark',
    tags: ['Video Streaming', 'Showreel Hub', '7-Day Delivery'],
  },
  {
    id: 'peace-living',
    title: 'Peace Living',
    category: 'Real Estate',
    badgeColor: 'bg-[#FFA502] text-black border-black',
    url: 'https://peaceliving.in/',
    domain: 'peaceliving.in',
    headline: 'Sanctuary Villas Engineered For Quiet',
    accentWord: 'Authority',
    subhead: 'Google Knowledge Graph foundation, high-intent lead capture & architectural floor plans.',
    theme: 'light',
    tags: ['Schema SEO #1', 'Knowledge Graph', 'Zero Lead Loss'],
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
    <section className="relative z-20 py-24 sm:py-32 bg-[#F6F3EB] text-[#1A1A1A] border-t-2 border-b-2 border-[#1A1A1A] overflow-hidden">
      {/* Background Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 relative">
        {/* Header Label & Headline */}
        <div className="text-center max-w-[760px] mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#1A1A1A] bg-white text-[11px] font-sans font-bold tracking-[0.18em] uppercase shadow-[3px_3px_0px_#1A1A1A]">
            <span className="w-2 h-2 rounded-full bg-[#FF2E7E] animate-pulse" />
            <span>Proven Craft in Production</span>
          </div>

          <h2
            className="text-[38px] sm:text-[50px] md:text-[58px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1A1A1A]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Live client systems that{' '}
            <span className="italic font-normal text-[#C87D55] underline decoration-2 decoration-[#1A1A1A] underline-offset-6">
              convert
            </span>
            .
          </h2>

          <p className="text-[15px] sm:text-[17px] font-sans text-[#555] max-w-[580px] mx-auto leading-relaxed">
            Real websites launched by vibesite studio for ambitious founders. No templates, no bloatware—tap any card to visit the live platform.
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
          {LIVE_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[310px] sm:w-[380px] md:w-[420px] snap-center"
            >
              {/* Outer Browser Window Mockup Frame */}
              <div className="relative rounded-2xl border-2 sm:border-[2.5px] border-[#1A1A1A] bg-white overflow-hidden shadow-[6px_6px_0px_#1A1A1A] sm:shadow-[8px_8px_0px_#1A1A1A] transition-transform duration-300 hover:-translate-y-1.5 flex flex-col h-[460px] sm:h-[490px]">
                
                {/* 1. Browser Window Top Chrome Bar */}
                <div className="bg-[#EFECE4] border-b-2 border-[#1A1A1A] px-3.5 py-2.5 flex items-center justify-between">
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

                  {/* Dummy bookmark icon */}
                  <span className="w-3 h-3 rounded-full border border-black/30" />
                </div>

                {/* 2. Floating Category Tag Badge (Top-Right Pop style from screenshot) */}
                <div className="absolute top-12 right-4 z-10">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-sans font-extrabold uppercase tracking-wider border-2 shadow-[2px_2px_0px_#1A1A1A] ${project.badgeColor}`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* 3. Website Viewport Simulation */}
                <div
                  className={`flex-1 p-5 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden ${
                    project.theme === 'dark'
                      ? 'bg-[#0F1410] text-[#F2EFE9]'
                      : project.theme === 'warm'
                      ? 'bg-[#FAF8F5] text-[#1A1A1A]'
                      : 'bg-white text-[#1A1A1A]'
                  }`}
                >
                  {/* Subtle Background Artistry */}
                  <div className="space-y-4 mt-8 sm:mt-10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C87D55]" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold opacity-70">
                        {project.title} — Official Site
                      </span>
                    </div>

                    {/* Headline */}
                    <h3
                      className="text-[24px] sm:text-[27px] font-semibold leading-[1.18] tracking-tight"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {project.headline}{' '}
                      <span
                        className="italic font-normal underline decoration-1 underline-offset-4"
                        style={{ color: '#C87D55' }}
                      >
                        {project.accentWord}
                      </span>
                      .
                    </h3>

                    {/* Subheading */}
                    <p className="text-[12px] sm:text-[13px] font-sans leading-relaxed opacity-80">
                      {project.subhead}
                    </p>
                  </div>

                  {/* Visual Layout Mockup Snippet */}
                  <div className="my-3 p-3 rounded-lg border border-current/15 bg-black/5 dark:bg-white/5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono opacity-85">
                      <span className="font-bold">⚡ Live Vercel Production</span>
                      <span className="text-emerald-500 font-bold">● 100% Edge</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-sans font-semibold border border-current/20 bg-current/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 4. Bottom Floating Action Pill (from reference screenshot) */}
                  <div className="pt-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn w-full py-2.5 px-4 rounded-full border-2 border-[#1A1A1A] bg-[#1A1A1A] text-white hover:bg-[#C87D55] hover:text-white transition-all duration-200 flex items-center justify-between shadow-[2px_2px_0px_#000] active:translate-y-0.5"
                    >
                      <span className="text-[12px] font-sans font-bold flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 13L13 3M13 3H6M13 3V10" />
                        </svg>
                        <span>Visit Live Site</span>
                      </span>
                      <span className="text-[10px] font-mono tracking-wider opacity-80 group-hover/btn:translate-x-1 transition-transform">
                        rolls all the way ↗
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5. Centered Bottom Action Pill (Exact match to "👁 I'll try it for free →" in screenshot) */}
        <div className="mt-12 text-center">
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
            <span>Start Your Project in 7 Days</span>
            <span className="font-mono text-[16px] group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
          <p className="mt-3 text-[12px] font-sans text-[#777]">
            Direct founder collaboration • Fixed transparent pricing • Delivered in 7–10 days
          </p>
        </div>
      </div>
    </section>
  )
}
