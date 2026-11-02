'use client'

import { useState } from 'react'

export interface ProjectItem {
  id: string
  number: string
  title: string
  category: string
  url: string
  domain: string
  tagline: string
  description: string
  deliverables: string[]
  metrics: string
  previewAccent: string
}

export const portfolioProjects: ProjectItem[] = [
  {
    id: 'ze-jewelry',
    number: '01',
    title: 'ZE Jewelry',
    category: 'Fine Jewelry & Luxury D2C Commerce',
    url: 'https://ze-jewelery.vercel.app/',
    domain: 'ze-jewelery.vercel.app',
    tagline: 'Haute horlogerie & solitaire collections crafted for luxury product enthusiasts.',
    description:
      'Engineered an editorial luxury storefront featuring instant UPI and card checkout, high-resolution diamond zoom, automated WhatsApp order confirmations, and zero cart dropoff.',
    deliverables: ['Custom Storefront', 'Instant UPI / Card Checkout', 'WhatsApp Cart Sync', 'PWA Performance'],
    metrics: '< 550ms Load Time / 4.6x Mobile Conversion',
    previewAccent: '#C87D55',
  },
  {
    id: 'furniture-one',
    number: '02',
    title: 'Furniture One',
    category: 'Architectural Furniture & Spatial Living',
    url: 'https://furniture-one-virid.vercel.app/',
    domain: 'furniture-one-virid.vercel.app',
    tagline: 'Tactile timber, handcrafted teak, and modern architectural living spaces.',
    description:
      'Created an unboxed Swiss catalog that elevates teak seating, spatial lounges, and dining suites. Built with automated dimensional freight calculations and direct designer inquiries.',
    deliverables: ['Spatial Catalog Design', 'Dimensional Shipping Engine', 'Editorial Lookbook', 'Shopify & Headless'],
    metrics: '99/100 Lighthouse / Instant Freight Quotes',
    previewAccent: '#5E7161',
  },
  {
    id: 'bnb-stays',
    number: '03',
    title: 'BNB Boutique Stays',
    category: 'Boutique Hospitality & Villa Booking Portal',
    url: 'https://bnb-6spd.vercel.app/',
    domain: 'bnb-6spd.vercel.app',
    tagline: 'Curated architectural holiday villas and commission-free host reservations.',
    description:
      'Designed a direct-to-host booking engine with dynamic seasonal pricing, calendar date range selection, immersive villa galleries, and instant WhatsApp inquiry routing.',
    deliverables: ['Custom Booking Portal', 'Zero-Commission Engine', 'Dynamic Calendar Engine', 'High-Res Media CDN'],
    metrics: 'Zero Booking Middleman Fees / 100% Direct Bookings',
    previewAccent: '#C87D55',
  },
  {
    id: 'growmore-production',
    number: '04',
    title: 'GrowMore Production',
    category: 'Cinematic Media, Film & Visual Storytelling Studio',
    url: 'https://growmoreproduction.vercel.app/',
    domain: 'growmoreproduction.vercel.app',
    tagline: 'Fast-loading digital home for film directors, commercial media, and visual craft.',
    description:
      'Crafted a high-bitrate video portfolio platform delivered in under 8 days. Optimized for sub-600ms First Contentful Paint while streaming commercial video reels seamlessly on mobile.',
    deliverables: ['Fast Launch (7-10 Days)', 'High-Bitrate Showreel Streaming', 'Editorial Layout', 'SEO Infrastructure'],
    metrics: 'Launched in 7 Days / 580ms Global FCP',
    previewAccent: '#5E7161',
  },
  {
    id: 'peace-living',
    number: '05',
    title: 'Peace Living',
    category: 'Luxury Real Estate & Residential Sanctuaries',
    url: 'https://peaceliving.in/',
    domain: 'peaceliving.in',
    tagline: 'Sanctuary residences, wellness living, and architectural spatial properties.',
    description:
      'Structured semantic Google Knowledge Graph foundation and local search optimization that compounds high-intent residential inquiries directly into WhatsApp and private site visits.',
    deliverables: ['Google Search Rank Engine', 'Instant WhatsApp Brochure Capture', 'Architectural Showcase', 'Cloud Edge Hosting'],
    metrics: '#1 Local Map Rank / 4.2x Lead Velocity',
    previewAccent: '#C87D55',
  },
]

export default function SelectedWorks() {
  const [activeProject, setActiveProject] = useState<string>(portfolioProjects[0].id)

  return (
    <section
      id="selected-works"
      className="relative z-20 py-24 sm:py-32 border-t border-[rgba(242,239,233,0.12)] bg-[#0B0E0B]/85 backdrop-blur-md pointer-events-auto"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 sm:pb-14 border-b border-[rgba(242,239,233,0.14)] gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C87D55] animate-pulse" />
              <span className="font-sans text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-[#C87D55] font-bold">
                Proven Client Work — Built by vibesite
              </span>
            </div>
            <h2
              className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-semibold leading-[1.04] text-[#F2EFE9] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Selected Works &amp; <em className="text-[#C87D55] font-semibold">Live Systems</em>
            </h2>
          </div>

          <p className="text-[15px] sm:text-[16px] text-[#A3A89E] font-sans max-w-[420px] leading-relaxed">
            Real websites engineered for brands that refuse to blend into template clichés. Tap any live link to inspect the live production deployment.
          </p>
        </div>

        {/* Project Showcase List */}
        <div className="divide-y divide-[rgba(242,239,233,0.1)]">
          {portfolioProjects.map((project) => {
            const isExpanded = activeProject === project.id

            return (
              <div
                key={project.id}
                className="py-8 sm:py-12 transition-all duration-300"
              >
                <div
                  onClick={() => setActiveProject(isExpanded ? '' : project.id)}
                  className="cursor-pointer group flex flex-col lg:flex-row lg:items-center justify-between gap-4 select-none"
                >
                  {/* Left: Number & Title */}
                  <div className="flex items-baseline gap-4 sm:gap-7">
                    <span className="font-sans text-[13px] sm:text-[14px] text-[#A3A89E]/60 font-mono tracking-wider font-bold">
                      {project.number}
                    </span>
                    <div>
                      <h3
                        className="text-[28px] sm:text-[38px] md:text-[46px] leading-[1.08] text-[#F2EFE9] group-hover:text-[#C87D55] transition-colors font-medium"
                        style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                      >
                        {project.title}
                      </h3>
                      <span className="block text-[12px] sm:text-[13px] font-sans uppercase tracking-[0.14em] text-[#5E7161] font-semibold mt-1">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Right: Metrics & Live Visit Action */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2 lg:mt-0">
                    <span className="hidden sm:inline-block font-sans text-[12px] text-[#A3A89E] border border-[rgba(242,239,233,0.12)] px-3 py-1">
                      {project.metrics}
                    </span>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#F2EFE9] text-[#0B0E0B] text-[12px] sm:text-[13px] font-sans font-bold uppercase tracking-[0.12em] hover:bg-[#C87D55] hover:text-[#F2EFE9] transition-all shadow-sm"
                    >
                      <span>Visit Live Site</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M2 12L12 2M12 2H5M12 2V9" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isExpanded ? 'max-h-[500px] opacity-100 mt-6 sm:mt-8 pt-6 border-t border-[rgba(242,239,233,0.08)]' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
                    {/* Description */}
                    <div className="lg:col-span-7 space-y-4">
                      <p className="text-[17px] sm:text-[19px] text-[#F2EFE9] leading-snug font-medium" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
                        &ldquo;{project.tagline}&rdquo;
                      </p>
                      <p className="text-[14px] sm:text-[15px] text-[#A3A89E] font-sans leading-[1.75]">
                        {project.description}
                      </p>
                      <div className="pt-2">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#C87D55] hover:text-[#F2EFE9] text-[13px] sm:text-[14px] font-sans font-semibold underline underline-offset-4"
                        >
                          <span>Open {project.domain} in new tab</span>
                          <span>↗</span>
                        </a>
                      </div>
                    </div>

                    {/* Scope Deliverables */}
                    <div className="lg:col-span-5 bg-[#0E120F] border border-[rgba(242,239,233,0.12)] p-5 sm:p-6 space-y-3">
                      <span className="text-[11px] font-sans uppercase tracking-[0.16em] text-[#5E7161] font-bold block">
                        Engineered Capabilities
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.deliverables.map((item) => (
                          <span
                            key={item}
                            className="text-[12px] font-sans text-[#F2EFE9] bg-[rgba(242,239,233,0.06)] border border-[rgba(242,239,233,0.12)] px-2.5 py-1 font-medium"
                          >
                            + {item}
                          </span>
                        ))}
                      </div>
                      <div className="pt-2 text-[12px] font-sans text-[#A3A89E] flex items-center justify-between border-t border-[rgba(242,239,233,0.08)] mt-3">
                        <span>Production Status:</span>
                        <span className="text-[#5E7161] font-bold">100% Live &amp; Operational</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

