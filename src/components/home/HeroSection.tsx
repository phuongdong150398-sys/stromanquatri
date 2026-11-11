import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileSpreadsheet,
  ShieldCheck,
  Droplets,
  CheckCircle2,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#EDF4F8] via-[#F6F9FB] to-[#EEF4F7] overflow-hidden border-b border-slate-200/80">
      {/* ==================== DESKTOP FULL-BLEED RIGHT VISUAL BACKDROP (lg+) ==================== */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="relative w-full h-full max-w-[1920px] mx-auto">
          {/* Soft sky background continuity on far left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFF5F9] via-[#F4F8FA] to-[#E6EFF4]" />

          {/* Right-anchored pristine studio artwork (never cropped vertically) */}
          <div
            className="absolute inset-y-0 right-0 flex items-center justify-end w-[72%] xl:w-[68%]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.65) 16%, black 34%, black 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.65) 16%, black 34%, black 100%)",
            }}
          >
            <img
              src="/images/hero-banner.png"
              alt="Hệ thống ống nhựa HDPE, PP-R, uPVC Stroman"
              className="h-full w-full object-cover object-right-bottom"
            />
          </div>

          {/* Extra left readability veil so text stays razor sharp at all widths */}
          <div className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-[#F6F9FB] via-[#F6F9FB]/85 to-transparent" />
        </div>
      </div>

      {/* ==================== HERO FOREGROUND CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center lg:min-h-[500px] xl:min-h-[540px] py-6 sm:py-12 lg:py-14 gap-5 sm:gap-8">
          {/* LEFT COLUMN: BRAND MESSAGE & CTAs */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 animate-fade-in-up">
            {/* German Technology Label */}
            <div className="inline-flex items-center gap-2">
              {/* Crisp SVG German Flag */}
              <svg
                className="w-6 h-4 rounded-[3px] shadow-xs shrink-0"
                viewBox="0 0 3 2"
                aria-hidden="true"
              >
                <rect width="3" height="2" fill="#000000" />
                <rect width="3" height="1.333" y="0.667" fill="#DD0000" />
                <rect width="3" height="0.667" y="1.333" fill="#FFCE00" />
              </svg>
              <span className="text-xs sm:text-[13px] font-extrabold tracking-widest uppercase text-[#102035]">
                CÔNG NGHỆ CHLB ĐỨC
              </span>
            </div>

            {/* Headline & Subheadline */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="text-[28px] sm:text-5xl xl:text-[54px] font-black tracking-tight leading-[1.1] text-[#102035]">
                ỐNG NHỰA STROMAN
              </h1>
              <p className="text-lg sm:text-2xl lg:text-[26px] xl:text-[30px] font-bold text-[#007A4D] leading-snug max-w-xl">
                Giải pháp dẫn nước bền vững cho mọi công trình
              </p>
            </div>

            {/* 3 Core Advantages (3 compact cards on mobile, divided horizontal row on desktop) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-0 pt-1 sm:pt-2 sm:divide-x divide-slate-300/80 max-w-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2.5 sm:pr-4 bg-white/80 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border border-slate-200/70 sm:border-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#007A4D] shadow-xs shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs leading-tight">
                  <strong className="block font-bold text-[#102035]">Độ bền cao</strong>
                  <span className="text-slate-600 text-xs">Trên 50 năm</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2.5 sm:px-4 bg-white/80 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border border-slate-200/70 sm:border-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#007A4D] shadow-xs shrink-0">
                  <Droplets className="w-4 h-4" />
                </div>
                <div className="text-xs leading-tight">
                  <strong className="block font-bold text-[#102035]">An toàn</strong>
                  <span className="text-slate-600 text-xs">Nguồn nước</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2.5 sm:pl-4 bg-white/80 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border border-slate-200/70 sm:border-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#007A4D] shadow-xs shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs leading-tight">
                  <strong className="block font-bold text-[#102035]">Đạt chuẩn</strong>
                  <span className="text-slate-600 text-xs">Quốc tế Đức</span>
                </div>
              </div>
            </div>

            {/* Primary & Secondary CTA Buttons */}
            <div className="pt-1 sm:pt-2 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3.5">
              <Link
                href="/san-pham"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#007A4D] hover:bg-[#00613d] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all group whitespace-nowrap"
              >
                <span className="sm:hidden">Khám phá SP</span>
                <span className="hidden sm:inline">Khám phá sản phẩm</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>

              <Link
                href="/du-toan-bao-gia"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] px-3 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/95 hover:bg-white text-[#102035] border border-slate-300 hover:border-[#007A4D] font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all whitespace-nowrap"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#007A4D] shrink-0" />
                <span className="sm:hidden">Nhận báo giá</span>
                <span className="hidden sm:inline">Dự toán &amp; nhận báo giá</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN MOBILE / TABLET PRESENTATION (< lg) */}
          <div className="lg:col-span-6 lg:hidden">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#EAF3F8] to-[#DCEAF2] border border-slate-200/80 shadow-sm">
              <img
                src="/images/hero-banner.png"
                alt="Hệ thống ống nhựa HDPE, PP-R, uPVC Stroman"
                className="w-full h-auto max-h-56 sm:max-h-80 mx-auto object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
