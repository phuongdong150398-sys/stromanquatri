"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Building2, Search, Filter } from "lucide-react";
import { dealersData } from "@/data/dealers";
import { siteConfig } from "@/config/site";

export default function DistributionNetworkPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredDealers = useMemo(() => {
    return dealersData.filter((dealer) => {
      if (selectedRegion !== "Tất cả" && dealer.region !== selectedRegion) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = dealer.name.toLowerCase().includes(q);
        const matchProv = dealer.province.toLowerCase().includes(q);
        const matchAddr = dealer.address.toLowerCase().includes(q);
        if (!matchName && !matchProv && !matchAddr) {
          return false;
        }
      }
      return true;
    });
  }, [selectedRegion, searchQuery]);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-stroman-600 uppercase tracking-wider block mb-2">
            Mạng Lưới Kho Bãi & Đại Lý
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Hệ Thống Phân Phối Ống Nhựa Stroman Toàn Quốc
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Tra cứu nhanh nhà máy, tổng kho và các điểm bán hàng chính hãng Stroman gần nhất để đảm bảo tiến độ cấp hàng cho công trình của bạn.
          </p>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Region Tabs */}
          <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full md:w-auto">
            {["Tất cả", "Bắc", "Trung", "Nam"].map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setSelectedRegion(reg)}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedRegion === reg
                    ? "bg-stroman-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {reg === "Tất cả" ? "Tất cả khu vực" : `Miền ${reg}`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Tìm theo Tỉnh/TP, Tên đại lý..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[44px] pl-9 pr-3 py-2 text-base sm:text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-stroman-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 sm:top-3" />
          </div>
        </div>

        {/* DEALER LIST CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/50">
                    {dealer.typeName}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 shrink-0">
                    Khu vực: {dealer.region}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">
                  {dealer.name}
                </h3>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{dealer.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <a
                      href={`tel:${dealer.phone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center min-h-[36px] font-bold text-slate-800 hover:text-stroman-600"
                    >
                      {dealer.phone}
                    </a>
                  </div>

                  {dealer.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{dealer.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={`tel:${dealer.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-stroman-700 font-bold text-xs transition-colors"
                >
                  Gọi Trực Tiếp
                </a>

                {dealer.googleMapUrl && (
                  <a
                    href={dealer.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[40px] px-2 text-xs text-slate-600 hover:text-slate-900 font-medium underline"
                  >
                    Xem bản đồ
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA: BECOME A DEALER */}
        <div className="mt-16 bg-gradient-to-r from-stroman-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            Bạn Muốn Trở Thành Đại Lý Phân Phối Của Stroman?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            Nhận chính sách chiết khấu trực tiếp từ nhà máy, hỗ trợ bảng biển showroom, đào tạo kỹ thuật và bảo lãnh công nợ linh hoạt cho mùa xây dựng 2026.
          </p>
          <Link
            href="/chinh-sach-dai-ly"
            className="inline-block px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-lg transition-colors"
          >
            Đăng Ký Hợp Tác Phân Phối Ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
