import React from "react";
import Link from "next/link";
import { Phone, FileSpreadsheet, ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

export function BottomCtaSection() {
  return (
    <section className="py-14 sm:py-18 bg-gradient-to-r from-[#061B33] via-[#082B4A] to-[#061B33] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00C389]">
              <ShieldCheck className="w-4 h-4" />
              <span>Hỗ trợ kỹ thuật &amp; báo giá dự án</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Nhận tư vấn &amp; báo giá nhanh
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Đội ngũ kỹ sư và chuyên viên kinh doanh tại{" "}
              <strong className="text-white">{siteConfig.distributorName}</strong> sẵn sàng hỗ trợ bóc tách khối lượng từ bản vẽ CAD, tư vấn lựa chọn quy cách áp suất (PN) phù hợp và cung cấp bảng báo giá chiết khấu trực tiếp từ nhà máy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
            <a
              href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white hover:bg-slate-100 text-[#061B33] font-bold text-sm shadow-lg transition-all"
            >
              <Phone className="w-4 h-4 text-[#007A4D]" />
              <div className="text-left leading-tight">
                <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Hotline 24/7
                </span>
                <strong className="text-base font-black text-[#061B33]">
                  {siteConfig.hotline}
                </strong>
              </div>
            </a>

            <Link
              href="/du-toan-bao-gia"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#007A4D] hover:bg-[#00613d] text-white font-bold text-sm shadow-lg transition-all group"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-100 shrink-0" />
              <span>Tạo dự toán báo giá</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <a
              href={siteConfig.socials.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#00C389]" />
              <span>Zalo Báo Giá</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
