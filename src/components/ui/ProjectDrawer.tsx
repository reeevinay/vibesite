'use client'

import { useState, useId } from 'react'

interface ProjectDrawerProps {
  isOpen: boolean
  onClose: () => void
}

type ProjectTypeKey = 'launch' | 'store' | 'content' | 'app'

interface ProjectOption {
  key: ProjectTypeKey
  numeral: string
  title: string
  timeline: string
  desc: string
  inr: number
  usd: number
  example: string
}

const projectOptions: ProjectOption[] = [
  {
    key: 'launch',
    numeral: 'I.',
    title: 'Fast Launch Website',
    timeline: '7–10 days',
    desc: 'Bespoke, high-performance website crafted for founders, clinics, studios, and niche brands.',
    example: 'E.g. GrowMore Production, Peace Living',
    inr: 35000,
    usd: 420,
  },
  {
    key: 'store',
    numeral: 'II.',
    title: 'D2C Online Store & Commerce',
    timeline: '2–3 weeks',
    desc: 'Custom storefront with instant UPI/card checkout, inventory automation, and WhatsApp recovery.',
    example: 'E.g. ZE Jewelry, Furniture One',
    inr: 55000,
    usd: 660,
  },
  {
    key: 'content',
    numeral: 'III.',
    title: 'Search Visibility & Growth CMS',
    timeline: '10–14 days',
    desc: 'Structured CMS site optimized for Google local rank, fast publishing, and compounding search traffic.',
    example: 'E.g. Peace Living Real Estate',
    inr: 30000,
    usd: 360,
  },
  {
    key: 'app',
    numeral: 'IV.',
    title: 'Custom Web Application & Portals',
    timeline: '3–5 weeks',
    desc: 'Tailored client portals, interactive booking engines, dashboards, and automated workflows.',
    example: 'E.g. BNB Boutique Booking System',
    inr: 80000,
    usd: 960,
  },
]

export default function ProjectDrawer({ isOpen, onClose }: ProjectDrawerProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectTypeKey>('launch')
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')
  const [addWhatsapp, setAddWhatsapp] = useState(false)
  const [addHosting, setAddHosting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [projectNote, setProjectNote] = useState('')
  const formId = useId()

  const currentOption = projectOptions.find((p) => p.key === selectedProject)!

  // Calculations
  const basePrice = currency === 'INR' ? currentOption.inr : currentOption.usd
  const whatsappPrice = currency === 'INR' ? 8000 : 95
  const hostingPrice = currency === 'INR' ? 4000 : 49

  const oneTimeTotal = basePrice + (addWhatsapp ? whatsappPrice : 0)
  const monthlyTotal = addHosting ? hostingPrice : 0

  const currencySymbol = currency === 'INR' ? '₹' : '$'

  const handleCopyBrief = () => {
    const brief = [
      '========================================',
      'VIBESITE DIGITAL STUDIO — PROJECT BRIEF',
      '========================================',
      `Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`,
      `Client: ${clientName || 'Not specified'}`,
      `Email: ${clientEmail || 'Not specified'}`,
      '',
      `Project Category: [${currentOption.numeral}] ${currentOption.title}`,
      `Reference Scope: ${currentOption.example}`,
      `Estimated Timeline: ${currentOption.timeline}`,
      `Base Investment: ${currencySymbol}${basePrice.toLocaleString()}`,
      '',
      'Selected Add-ons:',
      `- WhatsApp Lead Automation: ${addWhatsapp ? `Yes (+${currencySymbol}${whatsappPrice})` : 'None'}`,
      `- Year-Round Managed Cloud & Care: ${addHosting ? `Yes (+${currencySymbol}${hostingPrice}/mo)` : 'None'}`,
      '',
      `Total Upfront Investment: ${currencySymbol}${oneTimeTotal.toLocaleString()}`,
      addHosting ? `Recurring Care: ${currencySymbol}${monthlyTotal.toLocaleString()} / month` : '',
      '',
      'Notes & Requirements:',
      projectNote ? `"${projectNote}"` : '(No special notes)',
      '========================================',
      'Founder Contact: +91 80771 71541 | hello@vibesite.in',
    ]
      .filter(Boolean)
      .join('\n')

    navigator.clipboard.writeText(brief)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const handleWhatsAppBrief = () => {
    const brief = `Hi vibesite! I'd like to get started with a website project:

*Category:* [${currentOption.numeral}] ${currentOption.title}
*Example Scope:* ${currentOption.example}
*Timeline:* ${currentOption.timeline}
*Estimated Investment:* ${currencySymbol}${oneTimeTotal.toLocaleString()}
*Add-ons:* ${addWhatsapp ? 'WhatsApp Automation, ' : ''}${addHosting ? 'Year-Round Care' : 'None'}
*Client/Brand:* ${clientName || 'Not specified'}
*Phone/Email:* ${clientEmail || 'Not specified'}
*Notes:* ${projectNote || 'None'}

Can we connect for a quick 5-minute call?`

    window.open(`https://wa.me/918077171541?text=${encodeURIComponent(brief)}`, '_blank')
  }

  return (
    <>
      {/* Background backdrop blur */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-[#0B0E0B]/75 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-Over Sheet: Warm Parchment Architectural Spec */}
      <aside
        aria-label="Project Scope Specification"
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[580px] bg-[#F2EFE9] text-[#0B0E0B] shadow-2xl overflow-y-auto transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 sm:p-8 md:p-12 flex flex-col min-h-full">
          {/* Top Bar: Title & 1px Close Button */}
          <div className="flex items-start justify-between pb-5 border-b border-[rgba(11,14,11,0.18)]">
            <div>
              <span className="text-[11px] tracking-[0.22em] uppercase font-sans text-[#5E7161] font-bold block mb-1">
                vibesite studio — Specification Sheet
              </span>
              <h2
                className="text-[32px] sm:text-[38px] tracking-[-0.03em] leading-none text-[#0B0E0B] font-semibold"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                Project Scope &amp; Estimate
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 text-[#0B0E0B] hover:text-[#C87D55] transition-colors focus:outline-none"
              title="Close drawer"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="transition-transform duration-300 hover:rotate-90"
              >
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>
          </div>

          {/* Instant Founder Direct Call / WhatsApp Priority Banner */}
          <div className="my-5 p-4 bg-[#0B0E0B] text-[#F2EFE9] border border-[#C87D55]/60 shadow-md">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] uppercase font-sans tracking-[0.16em] text-[#C87D55] font-bold">
                Easiest Onboarding: Direct to Founder
              </span>
            </div>
            <p className="text-[12px] sm:text-[13px] text-[#A3A89E] font-sans mb-3 leading-snug">
              Skip typing lengthy briefs. Call directly or start a WhatsApp chat to discuss in 5 minutes:
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:8077171541"
                className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#F2EFE9] text-[#0B0E0B] text-[12px] sm:text-[13px] font-sans font-bold hover:bg-[#C87D55] hover:text-[#F2EFE9] transition-colors shadow-sm"
              >
                <span>📞 Call 80771 71541</span>
              </a>
              <button
                type="button"
                onClick={handleWhatsAppBrief}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#172218] text-[#F2EFE9] border border-[#5E7161] text-[12px] sm:text-[13px] font-sans font-semibold hover:bg-[#1E2F20] transition-colors"
              >
                <span>💬 WhatsApp Now</span>
              </button>
            </div>
          </div>

          {/* Section 1: Project Type Selection */}
          <div className="py-6 border-b border-[rgba(11,14,11,0.16)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] font-sans uppercase tracking-[0.16em] text-[#3A473C] font-bold">
                I. Select Project Architecture
              </span>
              {/* Currency Toggle */}
              <div className="flex items-center text-[12px] font-sans tracking-[0.08em] gap-1.5 border border-[rgba(11,14,11,0.22)] p-0.5 rounded-sm">
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  className={`px-2.5 py-1 transition-colors font-medium ${
                    currency === 'INR'
                      ? 'bg-[#0B0E0B] text-[#F2EFE9]'
                      : 'text-[#0B0E0B]/70 hover:text-[#0B0E0B]'
                  }`}
                >
                  ₹ INR
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 transition-colors font-medium ${
                    currency === 'USD'
                      ? 'bg-[#0B0E0B] text-[#F2EFE9]'
                      : 'text-[#0B0E0B]/70 hover:text-[#0B0E0B]'
                  }`}
                >
                  $ USD
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {projectOptions.map((opt) => {
                const isSelected = selectedProject === opt.key
                const price = currency === 'INR' ? opt.inr : opt.usd

                return (
                  <div
                    key={opt.key}
                    onClick={() => setSelectedProject(opt.key)}
                    className={`cursor-pointer transition-all duration-200 p-4 border text-left ${
                      isSelected
                        ? 'border-l-4 border-l-[#C87D55] border-t-[rgba(11,14,11,0.25)] border-r-[rgba(11,14,11,0.25)] border-b-[rgba(11,14,11,0.25)] bg-[rgba(200,125,85,0.08)]'
                        : 'border-[rgba(11,14,11,0.15)] hover:border-[rgba(11,14,11,0.3)] bg-white/50'
                    }`}
                  >
                    <div className="flex items-baseline justify-between mb-1.5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-sans text-[12px] tracking-wider text-[#A3A89E] font-bold">
                          {opt.numeral}
                        </span>
                        <h4
                          className="text-[19px] tracking-[-0.01em] text-[#0B0E0B] font-medium"
                          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                        >
                          {opt.title}
                        </h4>
                      </div>
                      <span className="font-sans text-[15px] font-bold text-[#0B0E0B]">
                        {currencySymbol}{price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-[13px] leading-[1.55] text-[#3A473C] font-sans mb-2">
                      {opt.desc}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans pt-1 border-t border-[rgba(11,14,11,0.08)]">
                      <span className="text-[#C87D55] font-semibold">{opt.example}</span>
                      <span className="text-[#A3A89E] uppercase tracking-[0.1em]">Turnaround: {opt.timeline}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Section 2: Optional Add-Ons */}
          <div className="py-6 border-b border-[rgba(11,14,11,0.16)]">
            <span className="text-[12px] font-sans uppercase tracking-[0.16em] text-[#3A473C] font-bold block mb-3.5">
              II. Ecosystem Add-Ons
            </span>

            <div className="flex flex-col gap-3">
              {/* WhatsApp Automation */}
              <label
                className={`flex items-start gap-3.5 p-4 border cursor-pointer transition-colors ${
                  addWhatsapp
                    ? 'border-[#C87D55] bg-[rgba(200,125,85,0.07)]'
                    : 'border-[rgba(11,14,11,0.14)] hover:border-[rgba(11,14,11,0.25)]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={addWhatsapp}
                  onChange={(e) => setAddWhatsapp(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 mt-0.5 border flex items-center justify-center transition-colors flex-shrink-0 ${
                    addWhatsapp
                      ? 'border-[#C87D55] bg-[#C87D55] text-[#F2EFE9]'
                      : 'border-[rgba(11,14,11,0.35)] bg-transparent'
                  }`}
                >
                  {addWhatsapp && (
                    <svg width="12" height="10" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 4L3.5 6.5L9 1" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[14px] font-sans font-semibold text-[#0B0E0B]">
                      WhatsApp Direct Lead &amp; Cart Recovery
                    </span>
                    <span className="text-[13px] font-sans font-bold text-[#C87D55]">
                      +{currencySymbol}{whatsappPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#3A473C] mt-1 leading-normal">
                    One-tap customer inquiries, instant abandoned cart reminders, and live phone/chat sync.
                  </p>
                </div>
              </label>

              {/* Hosting & Care */}
              <label
                className={`flex items-start gap-3.5 p-4 border cursor-pointer transition-colors ${
                  addHosting
                    ? 'border-[#C87D55] bg-[rgba(200,125,85,0.07)]'
                    : 'border-[rgba(11,14,11,0.14)] hover:border-[rgba(11,14,11,0.25)]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={addHosting}
                  onChange={(e) => setAddHosting(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 mt-0.5 border flex items-center justify-center transition-colors flex-shrink-0 ${
                    addHosting
                      ? 'border-[#C87D55] bg-[#C87D55] text-[#F2EFE9]'
                      : 'border-[rgba(11,14,11,0.35)] bg-transparent'
                  }`}
                >
                  {addHosting && (
                    <svg width="12" height="10" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 4L3.5 6.5L9 1" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[14px] font-sans font-semibold text-[#0B0E0B]">
                      Year-Round Managed Edge Cloud &amp; Founder Care
                    </span>
                    <span className="text-[13px] font-sans font-bold text-[#C87D55]">
                      +{currencySymbol}{hostingPrice.toLocaleString()}/mo
                    </span>
                  </div>
                  <p className="text-[12px] text-[#3A473C] mt-1 leading-normal">
                    Global edge CDN hosting, automated encrypted backups, domain SSL, and rapid founder updates.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Section 3: Client Details */}
          <div className="py-6 border-b border-[rgba(11,14,11,0.16)] flex flex-col gap-3">
            <span className="text-[12px] font-sans uppercase tracking-[0.16em] text-[#3A473C] font-bold">
              III. Your Details (Optional)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                id={`${formId}-name`}
                type="text"
                placeholder="Your Name or Brand"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="p-3.5 text-[14px] font-sans bg-white/70 border border-[rgba(11,14,11,0.2)] text-[#0B0E0B] placeholder:text-[#A3A89E] focus:outline-none focus:border-[#C87D55]"
              />
              <input
                id={`${formId}-email`}
                type="text"
                placeholder="Direct Phone or Email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="p-3.5 text-[14px] font-sans bg-white/70 border border-[rgba(11,14,11,0.2)] text-[#0B0E0B] placeholder:text-[#A3A89E] focus:outline-none focus:border-[#C87D55]"
              />
            </div>
            <textarea
              id={`${formId}-notes`}
              rows={2}
              placeholder="Tell us about your brand, goals, or reference links..."
              value={projectNote}
              onChange={(e) => setProjectNote(e.target.value)}
              className="p-3.5 text-[14px] font-sans bg-white/70 border border-[rgba(11,14,11,0.2)] text-[#0B0E0B] placeholder:text-[#A3A89E] focus:outline-none focus:border-[#C87D55] resize-none"
            />
          </div>

          {/* Section 4: Live Estimate & Action */}
          <div className="pt-6 mt-auto">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-5 gap-2">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-[0.16em] text-[#A3A89E] font-bold block">
                  Estimated Studio Investment
                </span>
                <div className="flex items-baseline gap-2.5">
                  <span
                    className="text-[38px] sm:text-[44px] font-semibold leading-none text-[#0B0E0B]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {currencySymbol}{oneTimeTotal.toLocaleString()}
                  </span>
                  <span className="text-[13px] font-sans font-medium text-[#3A473C]">one-time</span>
                </div>
              </div>

              {addHosting && (
                <div className="text-left sm:text-right">
                  <span className="text-[13px] font-sans font-semibold text-[#C87D55]">
                    + {currencySymbol}{monthlyTotal.toLocaleString()}/mo ongoing care
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5">
              {/* WhatsApp Instant Dispatch */}
              <button
                type="button"
                onClick={handleWhatsAppBrief}
                className="w-full py-4 px-6 bg-[#0B0E0B] text-[#F2EFE9] hover:bg-[#1E2820] transition-colors duration-200 flex items-center justify-center gap-2.5 focus:outline-none shadow-md"
              >
                <span
                  className="text-[17px] font-medium tracking-[-0.01em]"
                  style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                >
                  Send Brief to WhatsApp Directly (80771 71541) ↗
                </span>
              </button>

              {/* Direct Phone Call Button */}
              <a
                href="tel:8077171541"
                className="w-full py-3.5 px-6 border border-[#C87D55] text-[#0B0E0B] bg-[rgba(200,125,85,0.08)] hover:bg-[#C87D55] hover:text-[#F2EFE9] transition-colors duration-200 flex items-center justify-center gap-2 text-[14px] font-sans font-bold"
              >
                <span>📞 Call 80771 71541 Directly Now</span>
              </a>

              {/* Copy Brief Text */}
              <button
                type="button"
                onClick={handleCopyBrief}
                className="w-full py-2.5 text-[12px] font-sans text-[#3A473C] hover:text-[#0B0E0B] underline transition-colors"
              >
                {copied ? '✓ Brief Text Copied to Clipboard' : 'Or copy text summary to clipboard'}
              </button>

              <div className="flex items-center justify-between text-[12px] font-sans text-[#3A473C] pt-2 border-t border-[rgba(11,14,11,0.08)]">
                <span>Studio Direct Line:</span>
                <a
                  href="tel:8077171541"
                  className="text-[#0B0E0B] font-bold hover:text-[#C87D55] underline transition-colors"
                >
                  +91 80771 71541
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
