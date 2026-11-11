"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle, FileSpreadsheet, ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useQuote } from "@/context/QuoteContext";

export function FloatingContact() {
  const { totalCount } = useQuote();
  const [mounted, setMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const telHref = `tel:${siteConfig.hotline.replace(/\s+/g, "")}`;

  return (
    <>
      {/* DESKTOP / LARGE TABLET FLOATING STACK (lg+) */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 floating-actions">
        <Link
          href="/du-toan-bao-gia"
          className="group flex items-center gap-2 bg-[#061B33] text-white pl-3.5 pr-3 py-2.5 rounded-full shadow-xl hover:bg-[#082B4A] transition-all border border-white/15"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#00C389] group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold">Dự toán vật tư</span>
          {mounted && totalCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-400 text-[#061B33] text-[11px] font-black flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </Link>

        <a
          href={siteConfig.socials.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat qua Zalo"
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        <a
          href={telHref}
          aria-label="Gọi hotline tư vấn"
          className="relative w-12 h-12 rounded-full bg-[#007A4D] hover:bg-[#00613d] text-white flex items-center justify-center shadow-lg hover:shadow-xl ring-4 ring-emerald-500/20 transition-all hover:scale-105"
        >
          <Phone className="w-6 h-6 relative z-10" />
        </a>

        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Cuộn lên đầu trang"
            className="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center shadow transition-all hover:scale-105"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* MOBILE / TABLET STICKY BOTTOM ACTION BAR (< lg) */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(6,27,51,0.08)] px-3 py-2"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
          <a
            href={telHref}
            className="min-h-[44px] rounded-xl bg-[#007A4D] active:bg-[#00613d] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>Gọi Hotline</span>
          </a>

          <a
            href={siteConfig.socials.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] rounded-xl bg-blue-600 active:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Chat Zalo</span>
          </a>

          <Link
            href="/du-toan-bao-gia"
            className="min-h-[44px] rounded-xl bg-[#061B33] active:bg-[#082B4A] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#00C389] shrink-0" />
            <span>Dự toán</span>
            {mounted && totalCount > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-amber-400 text-[#061B33] text-[11px] font-black flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
