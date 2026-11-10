"use client";

import React, { useState } from "react";
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
  Layers,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";

interface ShowcaseProduct {
  id: string;
  tabLabel: string;
  name: string;
  badge: string;
  subtitle: string;
  standard: string;
  image: string;
  statValue: string;
  statLabel: string;
}

const showcaseProducts: ShowcaseProduct[] = [
  {
    id: "all",
    tabLabel: "Trọn Bộ Hệ Thống",
    name: "Hệ Sinh Thái Đồng Bộ Ströman 2026",
    badge: "Chuẩn CHLB Đức",
    subtitle: "Trọn bộ ống uPVC, PP-R Chịu Nhiệt, HDPE PE100 & Phụ kiện đúc ép đồng bộ",
    standard: "ISO 1452 • DIN 8077/8078 • ISO 4427",
    image: "/images/products/06_BO_SAN_PHAM_PNG_KHONG_CHU.png",
    statValue: "70M$",
    statLabel: "Vốn đầu tư",
  },
  {
    id: "hdpe",
    tabLabel: "Ống HDPE",
    name: "Ống Nhựa HDPE PE100 Siêu Bền",
    badge: "Bền bỉ 50 năm",
    subtitle: "Hợp chất PE100 nguyên sinh, uốn dẻo vượt địa hình, áp suất PN6 - PN20",
    standard: "ISO 4427:2007 • TCVN 7305",
    image: "/images/products/01_HDPE_PNG_KHONG_CHU.png",
    statValue: "Ø20 - 1200",
    statLabel: "Đường kính (mm)",
  },
  {
    id: "upvc",
    tabLabel: "Ống uPVC",
    name: "Ống Nhựa uPVC Tiêu Chuẩn Châu Âu",
    badge: "Bán chạy nhất",
    subtitle: "Đầy đủ hệ mét và hệ inch, không chì, lòng ống siêu nhẵn thoát nước êm",
    standard: "TCVN 8491:2011 • ISO 1452",
    image: "/images/products/02_uPVC_PNG_KHONG_CHU.png",
    statValue: "PN6 - PN25",
    statLabel: "Cấp áp suất",
  },
  {
    id: "ppr",
    tabLabel: "PP-R Nước Nóng",
    name: "Ống Chịu Nhiệt PP-R Cao Cấp",
    badge: "Chịu nhiệt 95°C",
    subtitle: "Hạt nhựa Borealis/Basell Đức, liên kết phân tử hàn nhiệt đồng nhất",
    standard: "DIN 8077/8078 • ISO 15874",
    image: "/images/products/03_PPR_XANH_PNG_KHONG_CHU.png",
    statValue: "95°C",
    statLabel: "Nhiệt làm việc",
  },
  {
    id: "ppr-ab",
    tabLabel: "PP-R Kháng Khuẩn",
    name: "Ống PP-R Kháng Khuẩn Nano Bạc",
    badge: "Đẳng cấp Y tế",
    subtitle: "Cấu trúc 3 lớp tích hợp Nano Bạc diệt khuẩn 99.9%, chuẩn nước uống trực tiếp",
    standard: "QCVN 12-1:2011/BYT • FDA",
    image: "/images/products/04_PPR_TRANG_PNG_KHONG_CHU.png",
    statValue: "99.9%",
    statLabel: "Diệt khuẩn",
  },
  {
    id: "fittings",
    tabLabel: "Phụ Kiện",
    name: "Hệ Phụ Kiện Đúc Đồng Bộ",
    badge: "Khuôn ép Châu Âu",
    subtitle: "Cút, Tê, Van, Măng Sông, Ren đồng thau nguyên khối CNC chịu tải trọng lớn",
    standard: "TCVN 8491 • DIN 8077",
    image: "/images/products/Stroman_Phu_kien_uPVC.png",
    statValue: "100%",
    statLabel: "Khớp nối chuẩn",
  },
];

export function HeroSection() {
  const [activeProduct, setActiveProduct] = useState<ShowcaseProduct>(showcaseProducts[0]);

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/70 to-slate-100/80 text-slate-900 overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-18 border-b border-slate-200/80">
      {/* 1. SUBTLE AMBIENT INDUSTRIAL GLOWS & TECH GRID */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 tech-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ==================== LEFT COLUMN: CONTENT & CTA (7/12) ==================== */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Technology Capsule Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-bold tracking-wide shadow-xs">
              <span className="text-sm">🇩🇪</span>
              <span className="uppercase font-extrabold text-[11px] sm:text-xs">
                CÔNG NGHỆ CHLB ĐỨC • VỐN ĐẦU TƯ 70 TRIỆU USD
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-slate-950">
                Đẳng Cấp Đức. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-stroman-600">
                  Bền Bỉ Vượt 50 Năm.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Hệ thống phân phối ống nhựa Ströman trực tiếp từ nhà máy thuộc{" "}
                <strong className="text-slate-900 font-semibold">Tập đoàn Tân Á Đại Thành</strong> tại{" "}
                <strong className="text-emerald-700 font-bold">{siteConfig.distributorName}</strong>. 
                Cung cấp giải pháp trọn gói các dòng ống uPVC, PP-R Chịu Nhiệt, PP-R Kháng Khuẩn và HDPE PE100 cho mọi dự án trọng điểm.
              </p>
            </div>

            {/* 3 CLEAN WHITE TRUST CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <strong className="text-xs font-bold text-slate-900">100% Nguyên Sinh</strong>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Hạt nhựa nhập khẩu Borealis & Basell Đức
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  <strong className="text-xs font-bold text-slate-900">Bảo Hành 10 Năm</strong>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Cam kết chất lượng từ Tân Á Đại Thành
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-cyan-600 group-hover:scale-110 transition-transform" />
                  <strong className="text-xs font-bold text-slate-900">Giao Tận Chân Dự Án</strong>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Chiết khấu cao nhất cho nhà thầu Quảng Trị
                </p>
              </div>
            </div>

            {/* CTA BUTTONS & HOTLINE ROW */}
            <div className="pt-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Primary CTA Button */}
                <Link
                  href="/du-toan-bao-gia"
                  className="relative px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 group overflow-hidden"
                >
                  <FileSpreadsheet className="w-4 h-4 text-white shrink-0" />
                  <span>Tạo Dự Toán & Nhận Báo Giá</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/san-pham"
                  className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-200/90 shadow-xs transition-all flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-slate-600" />
                  <span>Xem Danh Mục Kỹ Thuật</span>
                </Link>
              </div>

              {/* Direct Hotline & Zalo Contact Capsules */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-emerald-300/80 hover:border-emerald-500 text-slate-800 hover:text-emerald-700 transition-all shadow-xs group"
                  title="Gọi trực tiếp Hotline Tổng Kho"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <PhoneCall className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Hotline Kỹ Thuật 24/7
                    </span>
                    <strong className="text-sm font-extrabold text-slate-900 block">
                      {siteConfig.hotline}
                    </strong>
                  </div>
                </a>

                <a
                  href={siteConfig.socials.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-50 border border-blue-200/80 hover:bg-blue-100/70 text-blue-800 font-bold text-xs transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span>Chat Zalo Báo Giá File Excel</span>
                </a>
              </div>
            </div>
          </div>

          {/* ==================== RIGHT COLUMN: HERO PRODUCT SHOWCASE (5/12) ==================== */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Elegant Horizontal Category Selector Pills */}
            <div className="w-full flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar">
              {showcaseProducts.map((p) => {
                const isActive = p.id === activeProduct.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveProduct(p)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-slate-950 text-white shadow-md scale-105"
                        : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 shadow-xs"
                    }`}
                  >
                    {p.tabLabel}
                  </button>
                );
              })}
            </div>

            {/* Frameless Hero Product Stage with Ambient Floor Pedestal */}
            <div className="relative w-full h-72 sm:h-84 md:h-92 flex items-center justify-center p-2">
              
              {/* Floor Pedestal Shadow (Soft elliptical reflection) */}
              <div className="absolute bottom-2 w-4/5 h-8 bg-slate-950/10 blur-xl rounded-full pointer-events-none" />

              {/* Product Image Stage */}
              <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500">
                <img
                  key={activeProduct.image}
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="max-h-68 sm:max-h-80 md:max-h-84 w-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Floating Quality Badge (Top Right) */}
              <div className="absolute top-2 right-2 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-slate-200/80 text-[11px] font-bold text-slate-800 shadow-md backdrop-blur-sm pointer-events-none">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{activeProduct.badge}</span>
              </div>
            </div>

            {/* Active Product Details Capsule */}
            <div className="w-full mt-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-black text-slate-900 leading-snug">
                  {activeProduct.name}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {activeProduct.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 text-right shrink-0">
                <div className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-mono font-semibold">
                  {activeProduct.standard.split("•")[0]}
                </div>
                <div className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/60">
                  {activeProduct.statValue}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== BOTTOM TECHNICAL TRUST BAR ==================== */}
        <div className="mt-12 pt-7 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <span className="text-lg">🇩🇪</span>
              <span className="text-xs font-bold">Công nghệ CHLB Đức (Krauss Maffei)</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold">Chuẩn Quốc Tế ISO 1452 & ISO 4427</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold">Tiêu Chuẩn TCVN 8491 & TCVN 7305</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span className="text-xs font-bold">Thương Hiệu Quốc Gia Tân Á Đại Thành</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
