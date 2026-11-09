import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Factory,
  ArrowRight,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-stroman-950 text-white overflow-hidden py-16 lg:py-24">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stroman-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: TEXT HERO */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              <span>CÔNG NGHỆ CHLB ĐỨC • VỐN ĐẦU TƯ 70 TRIỆU USD</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Đẳng Cấp Đức. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                Sức Sống Mới.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Hệ thống phân phối ống nhựa Stroman trực tiếp từ nhà máy thuộc{" "}
              <strong className="text-white font-semibold">Tập đoàn Tân Á Đại Thành</strong> tại{" "}
              <strong className="text-emerald-400 font-semibold">{siteConfig.distributorName}</strong>. Cung cấp giải pháp trọn gói các dòng ống uPVC, PP-R Chịu Nhiệt, PP-R Kháng Khuẩn và HDPE PE100 cho mọi dự án trọng điểm quốc gia.
            </p>

            {/* TRUST HIGHLIGHTS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Nhựa Nguyên Sinh</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bảo Hành 10 Năm</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Giao Nhanh Tận Chân Dự Án</span>
              </div>
            </div>

            {/* CTA BUTTONS & HOTLINE */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/du-toan-bao-gia"
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2 group"
              >
                <FileSpreadsheet className="w-4 h-4 text-slate-950" />
                <span>Tạo Dự Toán & Nhận Báo Giá</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/san-pham"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 backdrop-blur-sm transition-all"
              >
                Xem Danh Mục Kỹ Thuật
              </Link>

              <a
                href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Hotline: {siteConfig.hotline}</span>
              </a>
            </div>
          </div>

          {/* RIGHT: HERO IMAGE SHOWCASE */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex justify-between items-center mb-6 border-b border-slate-700/60 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Sản Phẩm Đột Phá
                  </span>
                  <h3 className="text-lg font-bold text-white">Ống Nhựa Stroman 2026</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Chuẩn Đức
                </div>
              </div>

              {/* Product banner image */}
              <div className="relative h-60 w-full flex items-center justify-center p-4">
                <img
                  src="https://stroman.vn/Upload/products/Ong-nhua-uPVC134248424738456593.png"
                  alt="Ống nhựa Stroman"
                  className="max-h-56 w-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Stat numbers */}
              <div className="grid grid-cols-3 gap-2 pt-6 mt-4 border-t border-slate-700/60 text-center">
                <div>
                  <span className="text-xl font-black text-emerald-400">70M$</span>
                  <span className="block text-[10px] text-slate-400 uppercase font-medium">
                    Vốn đầu tư
                  </span>
                </div>
                <div>
                  <span className="text-xl font-black text-emerald-400">50+ Năm</span>
                  <span className="block text-[10px] text-slate-400 uppercase font-medium">
                    Độ bền thiết kế
                  </span>
                </div>
                <div>
                  <span className="text-xl font-black text-emerald-400">100%</span>
                  <span className="block text-[10px] text-slate-400 uppercase font-medium">
                    Tự động hóa Đức
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
