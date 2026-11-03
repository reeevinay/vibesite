'use client'

import { useState, useEffect } from 'react'

interface QuickConnectDockProps {
  onOpenDrawer: () => void
}

export default function QuickConnectDock({ onOpenDrawer }: QuickConnectDockProps) {
  // Start minimized on mobile devices to preserve clean, spacious screen real estate
  const [minimized, setMinimized] = useState(true)

  useEffect(() => {
    // On desktop (>1024px), expand by default; on mobile, stay minimized to avoid covering content
    if (window.innerWidth >= 1024) {
      setMinimized(false)
    }
  }, [])

  const phoneNumber = '8077171541'
  const formattedPhone = '+91 80771 71541'
  const whatsappUrl = `https://wa.me/918077171541?text=${encodeURIComponent(
    "Hi vibesite, I'd like to discuss a website project. Let's connect!"
  )}`

  return (
    <aside
      aria-label="Direct studio contact and onboarding"
      className="fixed bottom-3 sm:bottom-6 right-3 sm:right-6 z-50 pointer-events-auto select-none"
    >
      {minimized ? (
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-[#C87D55]/60 bg-[#0B0E0B]/95 text-[#F2EFE9] shadow-2xl backdrop-blur-md transition-all group hover:border-[#C87D55]"
          title="Open direct contact"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] sm:text-[12px] font-sans font-bold tracking-[0.12em] uppercase">
            Quick Connect
          </span>
          <span className="text-[#C87D55] text-[12px] font-mono group-hover:translate-x-0.5 transition-transform">
            ↗
          </span>
        </button>
      ) : (
        <div className="backdrop-blur-md border border-[rgba(242,239,233,0.18)] bg-[#0B0E0B]/95 text-[#F2EFE9] shadow-2xl p-4 sm:p-5 max-w-[320px] sm:max-w-[340px] transition-all duration-300">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[rgba(242,239,233,0.12)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase font-sans tracking-[0.18em] text-[#C87D55] font-bold">
                Direct Studio Connect
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMinimized(true)}
              className="text-[11px] p-1 text-[#A3A89E] hover:text-[#F2EFE9] transition-colors"
              title="Minimize dock"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="2" y1="6" x2="10" y2="6" />
              </svg>
            </button>
          </div>

          {/* Quick Explanation */}
          <p className="text-[12px] font-sans text-[#A3A89E] mb-3 leading-relaxed">
            Zero bureaucracy. Talk directly with our studio founders:
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            {/* Direct WhatsApp Chat Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between px-3.5 py-2.5 bg-[#C87D55] text-[#F2EFE9] hover:bg-[#b5653b] transition-all duration-200 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span className="font-sans font-bold text-[13px]">
                  WhatsApp Direct Chat
                </span>
              </div>
              <span className="text-[11px] font-mono opacity-90 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
                1-tap ↗
              </span>
            </a>
          </div>

          {/* Quick Scope Drawer Link */}
          <div className="mt-3 pt-2.5 border-t border-[rgba(242,239,233,0.1)] text-center">
            <button
              type="button"
              onClick={onOpenDrawer}
              className="text-[11px] font-sans uppercase tracking-[0.14em] text-[#A3A89E] hover:text-[#C87D55] transition-colors"
            >
              Or calculate scope &amp; pricing in drawer →
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}
