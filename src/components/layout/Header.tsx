"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* 1. TOP BAR */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              {siteConfig.tagline}
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">
              Công nghệ CHLB Đức - Vốn đầu tư 70 Triệu USD
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hotline 24/7:</span>
              <strong className="text-white font-semibold">{siteConfig.hotline}</strong>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        {/* LOGO & BRAND */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-stroman-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:bg-stroman-700 transition-colors">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-stroman-600 transition-colors uppercase">
              STROMAN
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
              Hệ Thống Phân Phối Chính Hãng
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {siteConfig.navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            if (item.children) {
              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setIsProductDropdownOpen(true)}
                  onMouseLeave={() => setIsProductDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-stroman-600 bg-stroman-50"
                        : "text-slate-700 hover:text-stroman-600 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-slate-400" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="text-[11px] font-bold text-slate-400 uppercase px-3 py-1.5 tracking-wider">
                      Các dòng sản phẩm Stroman
                    </div>
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-stroman-50 hover:text-stroman-700 font-medium transition-colors"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            if (item.isHighlight) {
              return null; // Rendered as special button below
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-stroman-600 bg-stroman-50"
                    : "text-slate-700 hover:text-stroman-600 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ACTIONS: QUOTE BUTTON & MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-3">
          {/* Smart Quote Button */}
          <Link
            href="/du-toan-bao-gia"
            className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stroman-600 hover:bg-stroman-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all group"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Dự Toán Báo Giá</span>
            <span className="sm:hidden">Dự Toán</span>
            {mounted && totalCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-stroman-700 bg-amber-400 rounded-full animate-pulse shadow-sm">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl space-y-2">
          {siteConfig.navItems.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="border-b border-slate-50 pb-2">
                  <div className="font-bold text-slate-800 text-sm px-3 py-2 flex items-center justify-between">
                    <span>{item.label}</span>
                    <span className="text-xs text-stroman-600 font-normal">
                      <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                        Xem tất cả
                      </Link>
                    </span>
                  </div>
                  <div className="pl-4 space-y-1">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-1.5 text-sm text-slate-600 hover:text-stroman-600 font-medium"
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
                className="block px-3 py-2 rounded-md text-sm font-semibold text-slate-800 hover:bg-stroman-50 hover:text-stroman-600 transition-colors"
              >
                {item.label}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-50 text-stroman-700 font-bold text-sm"
            >
              <Phone className="w-4 h-4" />
              Gọi Hotline: {siteConfig.hotline}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
