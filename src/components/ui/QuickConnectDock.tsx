'use client'

import { useState } from 'react'

interface QuickConnectDockProps {
  onOpenDrawer: () => void
  season?: 'Dawn' | 'Sun' | 'Night'
}

export default function QuickConnectDock({ onOpenDrawer, season = 'Dawn' }: QuickConnectDockProps) {
  const [minimized, setMinimized] = useState(false)
  const isSunMode = season === 'Sun'

  const phoneNumber = '8077171541'
  const formattedPhone = '+91 80771 71541'
  const whatsappUrl = `https://wa.me/918077171541?text=${encodeURIComponent(
    "Hi vibesite, I'd like to discuss a website project. Let's connect!"
  )}`

  return (
    <aside
      aria-label="Direct studio contact and onboarding"
      className="fixed bottom-5 right-4 sm:right-8 z-50 pointer-events-auto select-none"
    >
      {minimized ? (
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className={`flex items-center gap-2.5 px-4 py-3 border shadow-2xl backdrop-blur-md transition-all group ${
            isSunMode
              ? 'bg-[#FDFBF7]/95 text-[#1A1A1A] border-[#C87D55] hover:border-[#b5653b] shadow-[0_8px_30px_rgba(26,26,26,0.08)]'
              : 'bg-[#0B0E0B]/95 text-[#F2EFE9] border-[#C87D55]/60 hover:border-[#C87D55]'
          }`}
          title="Open quick contact dock"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[12px] font-sans font-bold tracking-[0.14em] uppercase">
            Call Founder (80771 71541)
          </span>
          <span className="text-[#C87D55] text-[13px] font-mono group-hover:translate-x-0.5 transition-transform">
            ↗
          </span>
        </button>
      ) : (
        <div
          className={`backdrop-blur-md border shadow-2xl p-3.5 sm:p-4 max-w-[340px] transition-all duration-300 ${
            isSunMode
              ? 'bg-[#FDFBF7]/95 border-[rgba(26,26,26,0.12)] text-[#1A1A1A] shadow-[0_12px_36px_rgba(26,26,26,0.1)]'
              : 'bg-[#0B0E0B]/95 border-[rgba(242,239,233,0.18)] text-[#F2EFE9]'
          }`}
        >
          {/* Header Bar */}
          <div
            className={`flex items-center justify-between pb-2.5 mb-2.5 border-b ${
              isSunMode ? 'border-[rgba(26,26,26,0.09)]' : 'border-[rgba(242,239,233,0.12)]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase font-sans tracking-[0.18em] text-[#C87D55] font-bold">
                Direct Founder Line
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMinimized(true)}
              className={`text-[11px] p-1 transition-colors ${
                isSunMode ? 'text-[#4A4D4A] hover:text-[#1A1A1A]' : 'text-[#A3A89E] hover:text-[#F2EFE9]'
              }`}
              title="Minimize dock"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="2" y1="6" x2="10" y2="6" />
              </svg>
            </button>
          </div>

          {/* Quick Explanation */}
          <p
            className={`text-[12px] font-sans mb-3 leading-snug ${
              isSunMode ? 'text-[#4A4D4A] font-medium' : 'text-[#A3A89E]'
            }`}
          >
            Zero bureaucracy. Talk directly with the studio founders:
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            {/* Direct Phone Call Button */}
            <a
              href={`tel:${phoneNumber}`}
              className="group flex items-center justify-between px-3.5 py-2.5 bg-[#C87D55] text-[#F2EFE9] hover:bg-[#b5653b] transition-all duration-200 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="flex-shrink-0"
                >
                  <path d="M2.5 3C2.5 2.44772 2.94772 2 3.5 2H5.67157C6.06939 2 6.42676 2.23594 6.57863 2.60041L7.52554 4.87299C7.68936 5.26615 7.56847 5.72365 7.22728 5.98188L5.94975 6.94862C6.91138 9.07005 8.62995 10.7886 10.7514 11.7503L11.7181 10.4727C11.9764 10.1315 12.4338 10.0106 12.827 10.1745L15.0996 11.1214C15.4641 11.2732 15.7 11.6306 15.7 12.0284V14.2C15.7 14.7523 15.2523 15.2 14.7 15.2C7.96223 15.2 2.5 9.73777 2.5 3Z" />
                </svg>
                <span className="text-[13px] font-sans font-bold tracking-[0.04em]">
                  Call {formattedPhone}
                </span>
              </div>
              <span className="text-[11px] font-mono tracking-wider opacity-90 group-hover:translate-x-0.5 transition-transform">
                CALL ↗
              </span>
            </a>

            {/* WhatsApp Direct Chat */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between px-3.5 py-2.5 border transition-colors ${
                isSunMode
                  ? 'bg-white border-[#5E7161]/60 text-[#0B0E0B] hover:border-[#5E7161] hover:bg-[#F2EFE9]'
                  : 'bg-[#121813] text-[#F2EFE9] border-[#5E7161]/50 hover:border-[#5E7161] hover:bg-[#162118]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#5E7161"
                  strokeWidth="1.8"
                  className="flex-shrink-0"
                >
                  <path d="M2.5 8C2.5 4.96243 4.96243 2.5 8 2.5C11.0376 2.5 13.5 4.96243 13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C6.91595 13.5 5.90382 13.1857 5.05058 12.6453L2.5 13.5L3.35472 10.9494C2.81433 10.0962 2.5 9.08405 2.5 8Z" />
                </svg>
                <span className="text-[12px] font-sans font-bold">
                  WhatsApp Direct Chat
                </span>
              </div>
              <span className="text-[10px] uppercase font-sans text-[#5E7161] font-bold">
                1-TAP ↗
              </span>
            </a>

            {/* Scope Specification Drawer Trigger */}
            <button
              type="button"
              onClick={onOpenDrawer}
              className={`w-full text-center py-2 text-[11px] font-sans uppercase tracking-[0.12em] transition-colors border-t mt-1 pt-2 font-medium ${
                isSunMode
                  ? 'border-[#0B0E0B]/10 text-[#0B0E0B]/70 hover:text-[#C87D55]'
                  : 'border-[rgba(242,239,233,0.08)] text-[#A3A89E] hover:text-[#C87D55]'
              }`}
            >
              Or calculate scope &amp; pricing in drawer →
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}
