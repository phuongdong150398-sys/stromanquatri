"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  FileSpreadsheet,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Search,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useQuote } from "@/context/QuoteContext";

export function Header() {
  const pathname = usePathname();
  const { totalCount } = useQuote();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-md border-b border-slate-200/70" : "border-b border-slate-100"
      }`}
    >
      {/* 1. TOP BAR — Deep Brand Green (#00683C) */}
      <div className="bg-[#00683C] text-white text-xs py-2 border-b border-[#005732]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-50">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00C389] shrink-0" />
              <span>Ống nhựa cao cấp Stroman</span>
            </span>
            <span className="hidden md:inline text-emerald-300/50">|</span>
            <span className="hidden md:inline text-emerald-50/90">Công nghệ CHLB Đức</span>
            <span className="hidden xl:inline text-emerald-300/50">|</span>
            <span className="hidden xl:inline text-emerald-50/90">
              {siteConfig.tagline} — Bền vững cho mọi công trình
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 text-emerald-50 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#00C389] shrink-0" />
              <span>Hotline:</span>
              <strong className="font-bold text-white tracking-wide">{siteConfig.hotline}</strong>
            </a>
            <span className="hidden md:inline text-emerald-300/40">|</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hidden md:inline-flex items-center gap-1.5 text-emerald-50 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#00C389] shrink-0" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex justify-between items-center gap-3">
        {/* BRAND LOGO */}
        <Link href="/" className="flex flex-col items-start group shrink-0">
          <img
            src={siteConfig.logo}
            alt={siteConfig.brandName}
            className="h-6 sm:h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
          <span className="text-[8px] sm:text-[9.5px] font-bold text-[#00683C] tracking-wide sm:tracking-wider uppercase mt-1 leading-none">
            HỆ THỐNG PHÂN PHỐI CHÍNH HÃNG
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {siteConfig.navItems.map((item) => {
            if (item.isHighlight) {
              return null; // Rendered as CTA button on right
            }

            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            if (item.children) {
              return (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? "text-[#007A4D] bg-emerald-50/90"
                        : "text-[#102035] hover:text-[#007A4D] hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-slate-400" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 pt-2 w-64 opacity-0 translate-y-1.5 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200/80 p-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1.5 tracking-wider border-b border-slate-100 mb-1">
                        Các dòng sản phẩm Stroman
                      </div>
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-3 py-2 rounded-lg text-sm text-[#102035] hover:bg-emerald-50 hover:text-[#007A4D] font-medium transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-[#007A4D] bg-emerald-50/90"
                    : "text-[#102035] hover:text-[#007A4D] hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ACTIONS: SEARCH ICON, QUOTE CTA, MOBILE HAMBURGER */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <Link
            href="/san-pham"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:text-[#007A4D] hover:border-[#007A4D]/40 hover:bg-emerald-50/60 transition-colors"
            aria-label="Tìm kiếm và tra cứu sản phẩm"
            title="Tra cứu nhanh danh mục sản phẩm"
          >
            <Search className="w-4 h-4" />
          </Link>

          <Link
            href="/du-toan-bao-gia"
            className="relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-lg bg-[#007A4D] hover:bg-[#00613d] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all whitespace-nowrap group"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-100 shrink-0" />
            <span className="hidden sm:inline">Dự toán &amp; Báo giá</span>
            <span className="sm:hidden">Báo giá</span>
            {mounted && totalCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-[#061B33] bg-amber-400 rounded-full shadow-xs">
                {totalCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#102035] hover:bg-slate-100 transition-colors border border-slate-200/80"
            aria-label="Mở menu điều hướng"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl space-y-1.5 max-h-[80vh] overflow-y-auto">
          {siteConfig.navItems.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="border-b border-slate-100 pb-2 mb-1">
                  <div className="font-bold text-[#102035] text-sm px-3 py-2 flex items-center justify-between">
                    <span>{item.label}</span>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs text-[#007A4D] font-semibold"
                    >
                      Xem tất cả
                    </Link>
                  </div>
                  <div className="pl-3 space-y-1">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-1.5 text-sm text-slate-600 hover:text-[#007A4D] font-medium rounded-md hover:bg-emerald-50/50"
                      >
                        • {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-[#102035] hover:bg-emerald-50 hover:text-[#007A4D] transition-colors"
              >
                {item.label}
              </Link>
            );
          })}

          <div className="pt-3 mt-2 border-t border-slate-100">
            <a
              href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 text-[#007A4D] font-bold text-sm border border-[#007A4D]/20"
            >
              <Phone className="w-4 h-4" />
              <span>Gọi Hotline: {siteConfig.hotline}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
