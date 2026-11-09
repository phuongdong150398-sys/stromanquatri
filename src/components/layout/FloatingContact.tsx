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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 floating-actions">
      {/* 1. SMART QUOTE FLOATING BADGE */}
      <Link
        href="/du-toan-bao-gia"
        className="group flex items-center gap-2 bg-slate-900 text-white pl-4 pr-3 py-2.5 rounded-full shadow-xl hover:bg-slate-800 transition-all border border-slate-700"
      >
        <FileSpreadsheet className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-bold">Dự toán vật tư</span>
        {mounted && totalCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black flex items-center justify-center animate-bounce">
            {totalCount}
          </span>
        )}
      </Link>

      {/* 2. ZALO CHAT BUTTON */}
      <a
        href={siteConfig.socials.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat qua Zalo"
        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* 3. PHONE PULSE BUTTON */}
      <a
        href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
        aria-label="Gọi hotline tư vấn"
        className="relative w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping"></span>
        <Phone className="w-6 h-6 relative z-10" />
      </a>

      {/* 4. SCROLL TO TOP */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          className="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center shadow transition-all hover:scale-105"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
