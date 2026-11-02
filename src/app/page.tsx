'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/ui/Header'
import ChapterNav from '@/components/ui/ChapterNav'
import ProjectDrawer from '@/components/ui/ProjectDrawer'
import FilmGrain from '@/components/ui/FilmGrain'
import CustomCursor from '@/components/ui/CustomCursor'
import ChapterShowcases from '@/components/ui/ChapterShowcases'
import SelectedWorks from '@/components/ui/SelectedWorks'
import QuickConnectDock from '@/components/ui/QuickConnectDock'

const LivingMeadowScene = dynamic(
  () => import('@/components/3d/LivingMeadowScene'),
  { ssr: false }
)

type ShowcaseType = 'mist' | 'store' | 'reach' | 'sky' | null

interface ChapterData {
  numeral: string
  title: string
  subtitle: string
  headline: string
  body: string
  trigger: string
  showcase: 'mist' | 'store' | 'reach' | 'sky'
  features: string[]
  liveCaseStudy: {
    name: string
    url: string
    desc: string
  }
}

const chapters: ChapterData[] = [
  {
    numeral: 'I',
    title: 'The Clearing',
    subtitle: 'Fast Launch Websites / Bespoke Architecture',
    headline: 'First impressions that feel effortless and bold.',
    body: 'We design and launch bespoke, fast-loading websites in 7 to 10 days for brands, clinics, and studios who refuse to look like everyone else.',
    trigger: 'Part the Mist (Craft vs AI)',
    showcase: 'mist',
    features: ['7–10 Day Delivery', 'Sub-600ms FCP', 'Living 3D WebGL Physics'],
    liveCaseStudy: {
      name: 'GrowMore Production',
      url: 'https://growmoreproduction.vercel.app/',
      desc: 'Cinematic video portfolio platform launched in 7 days.',
    },
  },
  {
    numeral: 'II',
    title: 'The Greenhouse',
    subtitle: 'Online Stores & D2C Commerce / Shopify',
    headline: 'Storefronts built to welcome, captivate and sell.',
    body: 'Complete online shops crafted for product brands—with instant UPI/card checkout, automated shipping, and WhatsApp cart recovery woven in from day one.',
    trigger: 'Explore Storefront Flow',
    showcase: 'store',
    features: ['Instant UPI Checkout', 'Zero Cart Dropoff', 'WhatsApp Lead Recovery'],
    liveCaseStudy: {
      name: 'ZE Jewelry & Furniture One',
      url: 'https://ze-jewelery.vercel.app/',
      desc: 'Fine jewelry & architectural furniture storefronts with instant mobile checkout.',
    },
  },
  {
    numeral: 'III',
    title: 'The Root System',
    subtitle: 'Search Visibility, Local Rank & Growth CMS',
    headline: 'Deep roots that bring paying clients to your door.',
    body: 'Structured, easy-to-edit websites and local Google search foundations that compound your visibility month after month without ad spend.',
    trigger: 'Trace Search Reach',
    showcase: 'reach',
    features: ['Local Google #1 Rank', 'Structured Schema', 'Zero Form Friction'],
    liveCaseStudy: {
      name: 'Peace Living Real Estate',
      url: 'https://peaceliving.in/',
      desc: 'Knowledge Graph SEO foundation capturing high-intent property leads.',
    },
  },
  {
    numeral: 'IV',
    title: 'The Open Sky',
    subtitle: 'Custom Web Apps, Portals & Quiet Cloud Care',
    headline: 'Custom tools and quiet, year-round founder care.',
    body: 'From custom booking systems and client portals to managed cloud edge hosting, the two of us handle every update, backup, and server detail personally.',
    trigger: 'Inspect Cloud Uptime',
    showcase: 'sky',
    features: ['99.99% Edge Uptime', 'Automated Daily Backups', 'Direct Founder SLA'],
    liveCaseStudy: {
      name: 'BNB Boutique Stays',
      url: 'https://bnb-6spd.vercel.app/',
      desc: 'Custom commission-free hospitality reservation engine & guest portal.',
    },
  },
]

export default function HomePage() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [season, setSeason] = useState<'Dawn' | 'Sun' | 'Night'>('Dawn')
  const [activeShowcase, setActiveShowcase] = useState<ShowcaseType>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Track scroll to update chapter
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollY / docHeight : 0

      // Map scroll progress to chapter index (0 to 3)
      const chapterIndex = Math.min(3, Math.floor(progress * 4.2))
      setCurrentChapter(chapterIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSeasonChange = useCallback((s: 'Dawn' | 'Sun' | 'Night') => {
    setSeason(s)
  }, [])

  const handleContactClick = useCallback(() => {
    setDrawerOpen(true)
  }, [])

  const handleProjectsClick = useCallback(() => {
    const el = document.getElementById('selected-works')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const handleChapterChange = useCallback((index: number) => {
    setCurrentChapter(index)
    const sections = document.querySelectorAll('[data-chapter]')
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      {/* 3D Canvas - Continuous Living Natural Landscape with Atmosphere Engine */}
      <LivingMeadowScene
        currentChapter={currentChapter}
        season={season}
      />

      {/* Film Grain Texture Overlay */}
      <FilmGrain />

      {/* Custom Magnetic Ring Cursor (fine pointers / desktop only) */}
      <CustomCursor />

      {/* Architectural Header with Season Switcher & Call 8077171541 Button */}
      <Header
        onSeasonChange={handleSeasonChange}
        onContactClick={handleContactClick}
        onProjectsClick={handleProjectsClick}
      />

      {/* Refined Chapter Navigation Dock (Docked at Bottom Center - Zero Hero Collision) */}
      <ChapterNav
        currentChapter={currentChapter}
        onChapterChange={handleChapterChange}
        onWorksClick={handleProjectsClick}
      />

      {/* Persistent Quick Connect Dock on Bottom Right (Direct Call & WhatsApp to 8077171541) */}
      <QuickConnectDock onOpenDrawer={() => setDrawerOpen(true)} />

      {/* Editorial Content Overlay */}
      <main
        ref={contentRef}
        className="relative z-10 pointer-events-none"
      >
        {/* Intro Billboard on Chapter I */}
        <div className="min-h-[55vh] sm:min-h-[60vh] pt-32 sm:pt-40 px-4 sm:px-8 md:px-16 max-w-[1400px] mx-auto pointer-events-auto">
          <div className="max-w-[780px] space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5E7161] animate-pulse" />
              <span className="font-sans text-[11px] sm:text-[12px] uppercase tracking-[0.24em] text-[#C87D55] font-bold">
                vibesite — Bespoke Web Studio
              </span>
              <span className="text-[12px] text-[#A3A89E]/40 hidden sm:inline">•</span>
              <span className="font-sans text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-[#A3A89E] font-medium hidden sm:inline">
                Zero AI Clichés / Pure Craft
              </span>
            </div>

            <h1
              className="text-[clamp(2.8rem,7vw,5.4rem)] leading-[0.98] tracking-[-0.035em] text-[#F2EFE9] font-medium"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              We cultivate websites that feel <em className="text-[#C87D55] font-semibold">alive</em>.
            </h1>

            <p className="text-[16px] sm:text-[19px] text-[#A3A89E] font-sans leading-[1.7] max-w-[620px] font-normal">
              No generic templates. No bloated SaaS cards. Just high-craft editorial design, living 3D GLSL physics, and obsessive human attention to every conversion touchpoint.
            </p>

            {/* Instant Onboarding Fast-Track (Easiest Way to Start) */}
            <div className="p-4 sm:p-5 bg-[#0B0E0B]/85 border border-[#C87D55]/50 shadow-2xl backdrop-blur-md max-w-[640px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#C87D55] font-bold">
                  Easiest Onboarding — Direct Line: 80771 71541
                </span>
              </div>
              <p className="text-[13px] sm:text-[14px] text-[#F2EFE9] font-sans mb-3 leading-snug">
                Want to discuss your project immediately? Call founder directly or tap to chat on WhatsApp:
              </p>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href="tel:8077171541"
                  className="px-4 py-2.5 bg-[#F2EFE9] text-[#0B0E0B] hover:bg-[#C87D55] hover:text-[#F2EFE9] transition-all text-[13px] font-sans font-bold flex items-center gap-2 shadow-sm"
                >
                  <span>📞 Call 80771 71541</span>
                </a>
                <a
                  href="https://wa.me/918077171541?text=Hi%20vibesite%2C%20I%20would%20like%20to%20discuss%20a%20website%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-[#141E15] text-[#F2EFE9] border border-[#5E7161] hover:bg-[#1B2B1D] transition-all text-[13px] font-sans font-semibold flex items-center gap-2"
                >
                  <span>💬 WhatsApp 80771 71541</span>
                </a>
                <button
                  type="button"
                  onClick={handleProjectsClick}
                  className="px-4 py-2.5 text-[12px] font-sans uppercase tracking-[0.12em] text-[#A3A89E] hover:text-[#F2EFE9] border border-[rgba(242,239,233,0.14)] hover:border-[rgba(242,239,233,0.3)] transition-all flex items-center gap-1.5 ml-auto sm:ml-0"
                >
                  <span>Client Works (05)</span>
                  <span>↓</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Four Business Chapter Clearings */}
        {chapters.map((chapter, index) => (
          <section
            key={chapter.numeral}
            data-chapter={index}
            className="min-h-screen flex items-center py-20 sm:py-28"
          >
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
              <div className="ml-auto max-w-[650px] lg:max-w-[580px] pointer-events-auto bg-[#0B0E0B]/80 backdrop-blur-md p-6 sm:p-10 md:p-12 border border-[rgba(242,239,233,0.12)] shadow-2xl">
                {/* Chapter Meta */}
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[rgba(242,239,233,0.14)]">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-[#C87D55] font-bold">
                      Chapter {chapter.numeral}
                    </span>
                    <span className="text-[13px] text-[#A3A89E]/40 font-sans">/</span>
                    <span className="font-sans text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-[#A3A89E] font-medium">
                      {chapter.title}
                    </span>
                  </div>

                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#5E7161] font-sans font-bold hidden sm:inline">
                    vibesite studio
                  </span>
                </div>

                {/* Subtitle */}
                <p className="font-sans text-[13px] sm:text-[14px] tracking-[0.12em] uppercase text-[#5E7161] font-semibold mb-3">
                  {chapter.subtitle}
                </p>

                {/* Headline with Italic Accents */}
                <h2
                  className="text-[clamp(2.3rem,4.8vw,3.4rem)] leading-[1.05] tracking-[-0.025em] mb-6 text-[#F2EFE9] font-medium"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {chapter.headline.split(' ').map((word, i) => {
                    const clean = word.replace(/[.,!]/g, '')
                    const isEmphasized = ['effortless', 'bold', 'welcome', 'captivate', 'Deep', 'quiet'].includes(clean)
                    if (isEmphasized) {
                      return (
                        <em key={i} className="text-[#C87D55] font-semibold">
                          {word}{' '}
                        </em>
                      )
                    }
                    return word + ' '
                  })}
                </h2>

                {/* Body Paragraph */}
                <p className="text-[16px] sm:text-[17px] leading-[1.8] text-[#A3A89E] font-sans mb-7 font-normal">
                  {chapter.body}
                </p>

                {/* Live Client Case Study Callout */}
                <div className="mb-7 p-4 bg-[#111712] border border-[rgba(242,239,233,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#5E7161] font-sans font-bold block">
                      Live Case Study Reference
                    </span>
                    <span className="text-[14px] font-sans text-[#F2EFE9] font-semibold">
                      {chapter.liveCaseStudy.name}
                    </span>
                    <p className="text-[12px] text-[#A3A89E] font-sans">
                      {chapter.liveCaseStudy.desc}
                    </p>
                  </div>

                  <a
                    href={chapter.liveCaseStudy.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] font-sans text-[#C87D55] hover:text-[#F2EFE9] font-bold uppercase tracking-[0.1em] border-b border-[#C87D55] pb-0.5 flex-shrink-0"
                  >
                    <span>View Site</span>
                    <span>↗</span>
                  </a>
                </div>

                {/* Architectural Features Tagline */}
                <div className="flex flex-wrap items-center gap-2.5 mb-8 pt-4 border-t border-[rgba(242,239,233,0.1)]">
                  {chapter.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-[12px] font-sans tracking-[0.08em] text-[#F2EFE9] py-1.5 px-3 border border-[rgba(242,239,233,0.14)] font-medium bg-[rgba(242,239,233,0.03)]"
                    >
                      + {feat}
                    </span>
                  ))}
                </div>

                {/* Interactive Trigger Button & Call / Pricing Action */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveShowcase(chapter.showcase)}
                    className="group flex items-center gap-2.5 text-[#F2EFE9] hover:text-[#C87D55] transition-colors focus:outline-none"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    <span className="text-[18px] sm:text-[19px] italic border-b border-current pb-0.5 font-medium">
                      {chapter.trigger}
                    </span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#C87D55]"
                    >
                      <path d="M2 12L12 2M12 2H5M12 2V9" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href="tel:8077171541"
                      className="text-[12px] font-sans text-[#C87D55] hover:underline font-bold"
                    >
                      📞 80771 71541
                    </a>
                    <button
                      type="button"
                      onClick={() => setDrawerOpen(true)}
                      className="text-[12px] sm:text-[13px] font-sans uppercase tracking-[0.14em] text-[#A3A89E] hover:text-[#F2EFE9] font-semibold transition-colors"
                    >
                      Scope &amp; Pricing ↗
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Selected Client Works Section */}
        <SelectedWorks />

        {/* Studio Colophon & Footer */}
        <footer className="relative z-20 py-20 border-t border-[rgba(242,239,233,0.14)] bg-[#0B0E0B] pointer-events-auto">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 mb-16">
              {/* Left */}
              <div className="space-y-4">
                <span className="text-[11px] tracking-[0.22em] uppercase font-sans text-[#5E7161] font-bold">
                  About vibesite
                </span>
                <h3
                  className="text-[36px] sm:text-[40px] text-[#F2EFE9] font-medium leading-tight"
                  style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                >
                  vibesite studio
                </h3>
                <p className="text-[15px] text-[#A3A89E] leading-[1.75] max-w-[340px] font-sans">
                  We craft bespoke digital storefronts, fast launch websites, and web applications for founders whose work speaks with quiet authority.
                </p>
                <div className="pt-2">
                  <a
                    href="tel:8077171541"
                    className="inline-flex items-center gap-2 text-[#F2EFE9] hover:text-[#C87D55] font-sans font-bold text-[14px]"
                  >
                    <span>Direct Call: +91 80771 71541</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              {/* Center: Live Projects Directory */}
              <div className="space-y-3 text-[14px] font-sans text-[#A3A89E]">
                <span className="text-[11px] tracking-[0.22em] uppercase text-[#5E7161] font-bold block mb-3">
                  Live Client Portfolio
                </span>
                <p>
                  <a href="https://ze-jewelery.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-[#F2EFE9] transition-colors underline">
                    ZE Jewelry (Luxury D2C Commerce) ↗
                  </a>
                </p>
                <p>
                  <a href="https://furniture-one-virid.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-[#F2EFE9] transition-colors underline">
                    Furniture One (Spatial Furniture) ↗
                  </a>
                </p>
                <p>
                  <a href="https://bnb-6spd.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-[#F2EFE9] transition-colors underline">
                    BNB Boutique Stays (Hospitality Portal) ↗
                  </a>
                </p>
                <p>
                  <a href="https://growmoreproduction.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-[#F2EFE9] transition-colors underline">
                    GrowMore Production (Film &amp; Media Studio) ↗
                  </a>
                </p>
                <p>
                  <a href="https://peaceliving.in/" target="_blank" rel="noreferrer" className="hover:text-[#F2EFE9] transition-colors underline">
                    Peace Living (Luxury Real Estate) ↗
                  </a>
                </p>
              </div>

              {/* Right: Direct Inquiries */}
              <div className="flex flex-col md:items-end justify-between space-y-5">
                <span className="text-[11px] tracking-[0.22em] uppercase font-sans text-[#5E7161] font-bold">
                  Start a Conversation
                </span>
                <div className="flex flex-col md:items-end gap-1">
                  <a
                    href="tel:8077171541"
                    className="text-[24px] sm:text-[28px] text-[#F2EFE9] hover:text-[#C87D55] transition-colors font-medium"
                    style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                  >
                    +91 80771 71541
                  </a>
                  <a
                    href="mailto:hello@vibesite.in"
                    className="text-[14px] text-[#A3A89E] hover:text-[#C87D55] transition-colors border-b border-[rgba(242,239,233,0.2)] pb-0.5"
                  >
                    hello@vibesite.in
                  </a>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="tel:8077171541"
                    className="px-5 py-3 bg-[#F2EFE9] text-[#0B0E0B] hover:bg-[#C87D55] hover:text-[#F2EFE9] transition-colors text-[13px] font-sans font-bold shadow-md"
                  >
                    Call 80771 71541 ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(true)}
                    className="px-5 py-3 bg-[#C87D55] text-[#F2EFE9] hover:bg-[#b06a44] transition-colors text-[13px] font-sans font-bold uppercase tracking-[0.1em] shadow-md"
                  >
                    Scope Drawer ↗
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Copyright */}
            <div className="pt-8 border-t border-[rgba(242,239,233,0.08)] flex flex-col sm:flex-row items-center justify-between text-[12px] font-sans text-[#A3A89E]/70 gap-4">
              <span>© 2026 vibesite studio. All rights reserved.</span>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <span>Direct Founder Line: +91 80771 71541</span>
                <span>GLSL Instanced Meadow</span>
                <span>Web Audio Ambient Engine</span>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Interactive Chapter Showcase Modals */}
      <ChapterShowcases
        type={activeShowcase}
        onClose={() => setActiveShowcase(null)}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      {/* Slide-Over Project Scope & Estimate Drawer */}
      <ProjectDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}
