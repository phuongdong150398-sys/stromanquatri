import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  ArrowRight,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  MessageCircle,
  Factory,
  Layers,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-[#080E1E] to-slate-950 text-white overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800/80">
      {/* 1. DECORATIVE AMBIENT SPOTLIGHTS & TECH GRID */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 tech-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ==================== LEFT COLUMN: CONTENT & CTA (7/12) ==================== */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Technology Capsule Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide shadow-sm backdrop-blur-md">
              <span className="text-sm">🇩🇪</span>
              <span className="uppercase">CÔNG NGHỆ CHLB ĐỨC • VỐN ĐẦU TƯ 70 TRIỆU USD</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
                Đẳng Cấp Đức. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Sức Sống Mới Cho Mọi Công Trình.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl pt-1">
                Hệ thống phân phối ống nhựa Ströman trực tiếp từ nhà máy thuộc{" "}
                <strong className="text-white font-semibold">Tập đoàn Tân Á Đại Thành</strong> tại{" "}
                <strong className="text-emerald-400 font-semibold">{siteConfig.distributorName}</strong>. 
                Cung cấp giải pháp trọn gói các dòng ống uPVC, PP-R Chịu Nhiệt, PP-R Kháng Khuẩn và HDPE PE100 cho mọi dự án dân dụng & hạ tầng trọng điểm.
              </p>
            </div>

            {/* 3 GLASSMORPHISM TRUST PILL CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md hover:bg-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <strong className="text-xs font-bold text-white">100% Nguyên Sinh</strong>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Hạt nhựa nhập khẩu Borealis & Basell Đức
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md hover:bg-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <strong className="text-xs font-bold text-white">Bảo Hành 10 Năm</strong>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Cam kết chất lượng từ Tân Á Đại Thành
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md hover:bg-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <strong className="text-xs font-bold text-white">Giao Tận Chân Dự Án</strong>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Chiết khấu cao nhất cho nhà thầu Quảng Trị
                </p>
              </div>
            </div>

            {/* CTA BUTTONS & HOTLINE ROW */}
            <div className="pt-3 space-y-4">
              <div className="flex flex-wrap items-center gap-3.5">
                {/* Primary CTA with Shimmer Effect */}
                <Link
                  href="/du-toan-bao-gia"
                  className="relative px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2.5 overflow-hidden group"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 animate-shimmer pointer-events-none" />
                  <FileSpreadsheet className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Tạo Dự Toán & Nhận Báo Giá</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/san-pham"
                  className="px-5 py-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-sm border border-white/15 backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-slate-300" />
                  <span>Xem Danh Mục Kỹ Thuật</span>
                </Link>
              </div>

              {/* Direct Hotline & Zalo Contact Capsules */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-800/90 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-white transition-all shadow-md group"
                  title="Gọi trực tiếp Hotline Tổng Kho"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <PhoneCall className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">
                      Hotline Kỹ Thuật 24/7
                    </span>
                    <strong className="text-sm font-extrabold text-white block">
                      {siteConfig.hotline}
                    </strong>
                  </div>
                </a>

                <a
                  href={siteConfig.socials.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-blue-600/15 border border-blue-500/30 hover:bg-blue-600/25 text-blue-300 font-bold text-xs transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span>Chat Zalo Báo Giá File Excel</span>
                </a>
              </div>
            </div>
          </div>

          {/* ==================== RIGHT COLUMN: MULTI-LAYER PRODUCT SHOWCASE (5/12) ==================== */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-[#070D1E]/95 p-6 sm:p-8 backdrop-blur-xl group hover:border-emerald-500/40 transition-all duration-500">
              
              {/* Radial Ambient Spotlight */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Showcase Header */}
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4 relative z-10">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    HỆ SINH THÁI ĐỒNG BỘ
                  </span>
                  <h3 className="text-lg font-black text-white">Ống Nhựa Ströman 2026</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30 shadow-inner">
                  CHLB ĐỨC
                </div>
              </div>

              {/* Floating Top Annotation Pill */}
              <div className="absolute top-20 right-6 z-20 hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 backdrop-blur-md shadow-lg pointer-events-none">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>ISO 1452 • DIN 8077/8078</span>
              </div>

              {/* Multi-Product Composite Image Presentation */}
              <div className="relative h-64 sm:h-72 w-full flex items-center justify-center p-2 relative z-10">
                {/* Background Shadow Pedestal */}
                <div className="absolute bottom-4 w-4/5 h-8 bg-black/60 blur-xl rounded-full pointer-events-none" />

                {/* Layer 1: HDPE Background Pipe (Chiều sâu bên phải) */}
                <div className="absolute right-0 top-6 w-3/5 opacity-60 group-hover:opacity-85 group-hover:translate-x-2 transition-all duration-500 pointer-events-none">
                  <img
                    src="https://stroman.vn/Upload/products/Ong-nhua-HDPE134248429157536896.png"
                    alt="Ống HDPE Stroman PE100"
                    className="max-h-44 w-auto object-contain filter drop-shadow-xl"
                  />
                  <span className="block text-[10px] font-mono text-cyan-400 text-right mt-1">HDPE PE100</span>
                </div>

                {/* Layer 2: Main Foreground uPVC / PP-R System */}
                <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
                  <img
                    src="https://stroman.vn/Upload/products/He-Met134248426535377688.png"
                    alt="Ống nhựa Stroman hệ mét uPVC"
                    className="max-h-56 sm:max-h-60 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,108,65,0.4)]"
                  />
                </div>

                {/* Layer 3: Fittings Foreground Accent (Góc trái) */}
                <div className="absolute left-0 bottom-2 w-28 opacity-80 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-500 pointer-events-none">
                  <img
                    src="https://stroman.vn/Upload/products/Phu-kien-uPVC134248427637228230.png"
                    alt="Phụ kiện uPVC đồng bộ"
                    className="max-h-24 w-auto object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>

              {/* Floating Bottom Quality Pill */}
              <div className="flex items-center justify-between text-xs text-slate-300 mt-2 px-1">
                <span className="inline-flex items-center gap-1 text-[11px] text-cyan-300 font-mono">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Độ bền thiết kế: Trên 50 năm
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Áp suất: Tới PN25
                </span>
              </div>

              {/* 3 Industrial Credibility Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-5 mt-4 border-t border-white/10 text-center relative z-10">
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 block tracking-tight">
                    70M$
                  </span>
                  <span className="block text-[10px] text-slate-400 uppercase font-medium mt-0.5">
                    Vốn đầu tư
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-xl sm:text-2xl font-black text-cyan-400 block tracking-tight">
                    50+ Năm
                  </span>
                  <span className="block text-[10px] text-slate-400 uppercase font-medium mt-0.5">
                    Độ bền thiết kế
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 block tracking-tight">
                    100%
                  </span>
                  <span className="block text-[10px] text-slate-400 uppercase font-medium mt-0.5">
                    Tự động hóa Đức
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== BOTTOM TECHNICAL TRUST BAR ==================== */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
              <span className="text-lg">🇩🇪</span>
              <span className="text-xs font-semibold">Công nghệ CHLB Đức (Krauss Maffei)</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold">Chuẩn Quốc Tế ISO 1452 & ISO 4427</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold">Tiêu Chuẩn TCVN 8491 & TCVN 7305</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold">Thương Hiệu Quốc Gia Tân Á Đại Thành</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
