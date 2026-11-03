'use client'

import { useState } from 'react'

interface ShowcaseModalProps {
  type: 'mist' | 'store' | 'reach' | 'sky' | null
  onClose: () => void
  onOpenDrawer: () => void
}

export default function ChapterShowcases({
  type,
  onClose,
  onOpenDrawer,
}: ShowcaseModalProps) {
  // State for Chapter I
  const [mistMode, setMistMode] = useState<'craft' | 'ai'>('craft')

  // State for Chapter II
  const [activeBrand, setActiveBrand] = useState<'ze' | 'furniture'>('ze')
  const [cartState, setCartState] = useState<'idle' | 'added'>('idle')

  // State for Chapter III
  const [activeStep, setActiveStep] = useState<number>(0)

  // State for Chapter IV
  const [nodes, setNodes] = useState<Array<{ id: number; x: number; y: number }>>([
    { id: 1, x: 22, y: 35 },
    { id: 2, x: 48, y: 24 },
    { id: 3, x: 78, y: 38 },
    { id: 4, x: 60, y: 72 },
    { id: 5, x: 30, y: 68 },
  ])

  if (!type) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0B0E0B]/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[860px] max-h-[90vh] overflow-y-auto border border-[rgba(242,239,233,0.18)] bg-[#0B0E0B] text-[#F2EFE9] shadow-2xl p-5 sm:p-8 md:p-12 z-10 transition-colors">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 sm:pb-6 mb-6 border-b border-[rgba(242,239,233,0.14)]">
          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            <span className="font-sans text-[11px] sm:text-[12px] uppercase tracking-[0.18em] font-bold text-[#C87D55]">
              vibesite Interactive Studio
            </span>
            <span className="text-[13px] font-sans text-[#A3A89E]">/</span>
            <span
              className="text-[17px] sm:text-[21px] font-medium text-[#F2EFE9]"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              {type === 'mist' && 'Chapter I — Part the Mist: Human Craft vs AI Cliché'}
              {type === 'store' && 'Chapter II — The Greenhouse: Live Commerce Flow'}
              {type === 'reach' && 'Chapter III — The Root System: Local Discovery Pipeline'}
              {type === 'sky' && 'Chapter IV — The Open Sky: Edge Uptime & Cloud Systems'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#A3A89E] hover:text-[#F2EFE9] transition-colors focus:outline-none"
            title="Close showcase"
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
              <line x1="3" y1="3" x2="15" y2="15" />
              <line x1="15" y1="3" x2="3" y2="15" />
            </svg>
          </button>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* CHAPTER I SHOWCASE: CRAFT VS AI CLICHÉ */}
        {/* ------------------------------------------------------------------ */}
        {type === 'mist' && (
          <div className="space-y-6">
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#A3A89E] font-sans">
              The modern web is inundated with cookie-cutter AI templates: glowing purple cards, generic corporate stock icons, and unreadable copy. Compare our human architectural craft (as applied to <strong className="text-[#F2EFE9]">GrowMore Production</strong> and <strong className="text-[#F2EFE9]">Peace Living</strong>) against generic AI generators:
            </p>

            {/* Toggle */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[rgba(242,239,233,0.14)] pb-4">
              <button
                type="button"
                onClick={() => setMistMode('craft')}
                className={`text-[13px] sm:text-[14px] font-sans font-semibold tracking-[0.06em] px-4 py-2 border transition-all ${
                  mistMode === 'craft'
                    ? 'border-[#C87D55] text-[#F2EFE9] bg-[#C87D55]/15 shadow-sm'
                    : 'border-transparent text-[#A3A89E] hover:text-[#F2EFE9]'
                }`}
              >
                ✓ vibesite Craft (Our Standard)
              </button>
              <button
                type="button"
                onClick={() => setMistMode('ai')}
                className={`text-[13px] sm:text-[14px] font-sans font-semibold tracking-[0.06em] px-4 py-2 border transition-all ${
                  mistMode === 'ai'
                    ? 'border-red-400 text-red-300 bg-red-950/30'
                    : 'border-transparent text-[#A3A89E] hover:text-[#F2EFE9]'
                }`}
              >
                ✕ The AI-Generated Cliché (Banned)
              </button>
            </div>

            {/* Demonstration Canvas */}
            {mistMode === 'craft' ? (
              <div className="border border-[rgba(242,239,233,0.18)] p-6 sm:p-9 bg-[#0E120F]">
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(242,239,233,0.1)] mb-6 text-[12px] tracking-[0.16em] text-[#5E7161] font-sans uppercase font-bold">
                  <span>01 / Editorial Architecture</span>
                  <span>7–10 Day Delivery</span>
                </div>
                <h3
                  className="text-[32px] sm:text-[40px] leading-[1.08] mb-4 text-[#F2EFE9] font-medium"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Built with <em className="text-[#C87D55] font-semibold">tactile intention</em> and quiet authority.
                </h3>
                <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[#A3A89E] font-sans max-w-[560px] mb-6">
                  Zero generic frameworks. Cormorant Garamond typography paired with Plus Jakarta Sans body, exposed 1px hairlines, and living GLSL nature physics.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-[13px] font-sans text-[#F2EFE9]">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#C87D55]" />
                    Sub-600ms First Contentful Paint
                  </span>
                  <span className="flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#5E7161]" />
                    Real Case Study: GrowMore Production &amp; Peace Living
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl p-6 sm:p-8 bg-slate-900 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-[11px] mb-4 font-mono font-bold">
                  ✨ AI-POWERED HYPER-AUTOMATION
                </div>
                <h3 className="text-[26px] sm:text-[32px] font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3 font-sans">
                  Revolutionize Your Workflow with Next-Gen AI Synergy
                </h3>
                <p className="text-[14px] text-slate-400 font-sans mb-4">
                  Leverage machine learning paradigms to dynamically streamline stakeholder deliverables across all touchpoints with effortless low-code modules.
                </p>
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-[13px] shadow-lg shadow-cyan-500/30">
                  Get Started Free →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CHAPTER II SHOWCASE: STOREFRONT FLOW */}
        {/* ------------------------------------------------------------------ */}
        {type === 'store' && (
          <div className="space-y-6">
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#A3A89E] font-sans">
              Experience the live commerce architecture we built for client brands like <strong className="text-[#F2EFE9]">ZE Jewelry</strong> and <strong className="text-[#F2EFE9]">Furniture One</strong>. Designed for instant UPI/card checkout, tactile product discovery, and automated WhatsApp cart recovery:
            </p>

            {/* Brand switcher */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setActiveBrand('ze'); setCartState('idle'); }}
                className={`px-4 py-2 text-[13px] font-sans font-semibold border transition-all ${
                  activeBrand === 'ze'
                    ? 'border-[#C87D55] text-[#F2EFE9] bg-[#C87D55]/15'
                    : 'border-[rgba(242,239,233,0.15)] text-[#A3A89E]'
                }`}
              >
                01. ZE Jewelry (Luxury Fine Jewelry)
              </button>
              <button
                type="button"
                onClick={() => { setActiveBrand('furniture'); setCartState('idle'); }}
                className={`px-4 py-2 text-[13px] font-sans font-semibold border transition-all ${
                  activeBrand === 'furniture'
                    ? 'border-[#C87D55] text-[#F2EFE9] bg-[#C87D55]/15'
                    : 'border-[rgba(242,239,233,0.15)] text-[#A3A89E]'
                }`}
              >
                02. Furniture One (Architectural Furniture)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start border border-[rgba(242,239,233,0.16)] p-5 sm:p-7 bg-[#0E120F]">
              {/* Product Visual */}
              <div className="relative aspect-[4/3] md:aspect-[4/5] bg-[#141A15] border border-[rgba(242,239,233,0.1)] p-6 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between text-[11px] tracking-[0.16em] text-[#5E7161] uppercase font-sans font-bold">
                  <span>{activeBrand === 'ze' ? 'Haute Horlogerie' : 'Spatial Design'}</span>
                  <span>Direct D2C</span>
                </div>

                <div className="text-center my-auto py-4">
                  <div className="w-20 h-20 mx-auto rounded-full border border-[#C87D55]/50 flex items-center justify-center relative bg-[rgba(200,125,85,0.08)]">
                    <span
                      className="text-[13px] text-[#F2EFE9] tracking-wider uppercase font-medium"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {activeBrand === 'ze' ? 'Gold & Diamond' : 'Solid Teak'}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <span
                    className="text-[19px] sm:text-[21px] text-[#F2EFE9] block font-medium"
                    style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                  >
                    {activeBrand === 'ze' ? 'Solitaire Pavé Ring' : 'Komorebi Lounge Chair'}
                  </span>
                  <span className="text-[12px] text-[#A3A89E] font-sans">
                    {activeBrand === 'ze' ? 'Handcrafted in 18K Yellow Gold' : 'Natural oiled timber & linen'}
                  </span>
                </div>
              </div>

              {/* Product Controls & Checkout Simulation */}
              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h4
                      className="text-[24px] sm:text-[27px] text-[#F2EFE9] font-medium"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {activeBrand === 'ze' ? 'ZE Fine Solitaire' : 'Komorebi Teak Chair'}
                    </h4>
                    <span className="text-[20px] text-[#C87D55] font-sans font-bold">
                      {activeBrand === 'ze' ? '₹48,500' : '₹32,000'}
                    </span>
                  </div>
                  <p className="text-[13px] sm:text-[14px] text-[#A3A89E] font-sans mb-4 leading-relaxed">
                    {activeBrand === 'ze'
                      ? 'Instant mobile checkout built with Razorpay / UPI intent, automated WhatsApp status updates, and zero cart dropoff.'
                      : 'High-res 3D spatial view, automated dimensional freight shipping, and direct designer inquiry.'}
                  </p>

                  <div className="p-3 bg-[#131914] border border-[rgba(242,239,233,0.12)] space-y-1 mb-4 text-[12px] font-sans">
                    <div className="flex justify-between text-[#F2EFE9]">
                      <span>Live Client Website:</span>
                      <a
                        href={activeBrand === 'ze' ? 'https://ze-jewelery.vercel.app/' : 'https://furniture-one-virid.vercel.app/'}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#C87D55] underline hover:text-[#F2EFE9]"
                      >
                        {activeBrand === 'ze' ? 'ze-jewelery.vercel.app ↗' : 'furniture-one-virid.vercel.app ↗'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2 border-t border-[rgba(242,239,233,0.1)]">
                  {cartState === 'idle' ? (
                    <button
                      type="button"
                      onClick={() => setCartState('added')}
                      className="w-full py-3.5 bg-[#F2EFE9] text-[#0B0E0B] text-[13px] sm:text-[14px] font-sans font-bold uppercase tracking-[0.12em] hover:bg-[#C87D55] hover:text-[#F2EFE9] transition-colors"
                    >
                      Test Instant UPI / Card Checkout ↗
                    </button>
                  ) : (
                    <div className="p-4 border border-[#5E7161] bg-[#5E7161]/15 text-center space-y-2">
                      <p className="text-[13px] sm:text-[14px] text-[#F2EFE9] font-sans font-semibold">
                        ✓ Checkout Complete — Automated WhatsApp Confirmation Dispatched
                      </p>
                      <button
                        type="button"
                        onClick={() => setCartState('idle')}
                        className="text-[12px] text-[#A3A89E] underline hover:text-[#F2EFE9]"
                      >
                        Reset Demonstration
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CHAPTER III SHOWCASE: TRACE REACH PIPELINE */}
        {/* ------------------------------------------------------------------ */}
        {type === 'reach' && (
          <div className="space-y-6">
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#A3A89E] font-sans">
              How our structured semantic markup, Google Knowledge Graph foundations, and sub-second load times convert real estate buyers for clients like <strong className="text-[#F2EFE9]">Peace Living</strong> (<a href="https://peaceliving.in/" target="_blank" rel="noreferrer" className="text-[#C87D55] underline">peaceliving.in ↗</a>):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  step: '01',
                  name: 'Intent Discovery',
                  desc: 'High-intent search: "luxury wellness residences near me"',
                },
                {
                  step: '02',
                  name: 'Root Grounding',
                  desc: 'Structured schema and Google Business verification place site in top map pack.',
                },
                {
                  step: '03',
                  name: 'Instant Landing',
                  desc: 'Page renders in <500ms with zero layout shift on 4G phones.',
                },
                {
                  step: '04',
                  name: 'Direct Inquiry',
                  desc: 'Instant WhatsApp brochure request captures lead with zero form dropoff.',
                },
              ].map((item, idx) => (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer p-4 border transition-all ${
                    activeStep === idx
                      ? 'border-[#C87D55] bg-[#C87D55]/15'
                      : 'border-[rgba(242,239,233,0.12)] hover:border-[rgba(242,239,233,0.3)]'
                  }`}
                >
                  <span className="text-[11px] font-sans uppercase tracking-[0.16em] text-[#C87D55] font-bold block mb-1">
                    Phase {item.step}
                  </span>
                  <h5
                    className="text-[17px] text-[#F2EFE9] font-medium mb-1.5"
                    style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                  >
                    {item.name}
                  </h5>
                  <p className="text-[12px] leading-[1.55] text-[#A3A89E] font-sans">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 border border-[rgba(242,239,233,0.16)] bg-[#111612] flex flex-col sm:flex-row sm:items-center justify-between text-[13px] font-sans gap-2">
              <span className="text-[#A3A89E] font-medium">Active Stage Impact:</span>
              <span className="text-[#C87D55] font-semibold">
                {activeStep === 0 && 'Targeting 3,200+ monthly high-net-worth property inquiries'}
                {activeStep === 1 && 'Top-tier Knowledge Graph entity rank secured'}
                {activeStep === 2 && 'Sub-600ms First Contentful Paint — 99/100 Lighthouse score'}
                {activeStep === 3 && '4.5x higher direct inquiry rate via instant WhatsApp sync'}
              </span>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CHAPTER IV SHOWCASE: EDGE UPTIME & CONSTELLATION */}
        {/* ------------------------------------------------------------------ */}
        {type === 'sky' && (
          <div className="space-y-6">
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#A3A89E] font-sans">
              From bespoke studio platforms like <strong className="text-[#F2EFE9]">Blush and Bangs Makeup &amp; Hairstyle Studio</strong> (<a href="https://bnb-6spd.vercel.app/" target="_blank" rel="noreferrer" className="text-[#C87D55] underline">bnb-6spd.vercel.app ↗</a>) to production media hubs like <strong className="text-[#F2EFE9]">GrowMore Production</strong> (<a href="https://growmoreproduction.vercel.app/" target="_blank" rel="noreferrer" className="text-[#C87D55] underline">growmoreproduction.vercel.app ↗</a>), we run high-availability systems with personal founder stewardship:
            </p>

            {/* Live Uptime & Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Global Latency', val: '18ms', detail: 'Edge Network' },
                { label: 'Uptime SLA', val: '99.99%', detail: 'Zero Unplanned Downtime' },
                { label: 'Daily Backups', val: 'Automated', detail: 'Encrypted Snapshots' },
                { label: 'Founder Support', val: '< 15 min', detail: 'Direct Phone / WhatsApp' },
              ].map((m) => (
                <div key={m.label} className="p-4 border border-[rgba(242,239,233,0.14)] bg-[#0E120F]">
                  <span className="text-[11px] font-sans uppercase tracking-[0.16em] text-[#5E7161] font-bold block mb-1">
                    {m.label}
                  </span>
                  <span
                    className="text-[28px] sm:text-[32px] text-[#F2EFE9] font-semibold block leading-none mb-1"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {m.val}
                  </span>
                  <span className="text-[11px] text-[#A3A89E] font-sans">
                    {m.detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive Constellation Sky Simulator */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width) * 100
                const y = ((e.clientY - rect.top) / rect.height) * 100
                setNodes((prev) => [...prev.slice(-8), { id: Date.now(), x, y }])
              }}
              className="relative h-44 sm:h-52 border border-[rgba(242,239,233,0.18)] bg-[#07090C] overflow-hidden cursor-crosshair flex items-center justify-center select-none"
            >
              {/* Constellation lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {nodes.map((n, i) => {
                  const next = nodes[(i + 1) % nodes.length]
                  return (
                    <line
                      key={`${n.id}-${next.id}`}
                      x1={`${n.x}%`}
                      y1={`${n.y}%`}
                      x2={`${next.x}%`}
                      y2={`${next.y}%`}
                      stroke="rgba(200,125,85,0.45)"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                  )
                })}
              </svg>

              {/* Star Nodes */}
              {nodes.map((n) => (
                <div
                  key={n.id}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  className="absolute w-2.5 h-2.5 -ml-1.5 -mt-1.5 rounded-full bg-[#C87D55] shadow-[0_0_10px_#C87D55] animate-pulse"
                />
              ))}

              <span className="text-[12px] font-sans uppercase tracking-[0.18em] text-[#A3A89E]/70 pointer-events-none px-4 text-center font-medium">
                Tap anywhere to deploy edge nodes in real time
              </span>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-8 pt-6 border-t border-[rgba(242,239,233,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-[14px] font-sans font-medium text-[#A3A89E] hover:text-[#F2EFE9] transition-colors order-2 sm:order-1"
          >
            ← Close Showcase
          </button>

          <button
            type="button"
            onClick={() => {
              onClose()
              onOpenDrawer()
            }}
            className="group flex items-center gap-2 text-[#C87D55] hover:text-[#F2EFE9] transition-colors order-1 sm:order-2"
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          >
            <span className="text-[17px] sm:text-[18px] font-semibold border-b border-current pb-0.5">
              Build This with vibesite ↗
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
