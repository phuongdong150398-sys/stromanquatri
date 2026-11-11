import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { dealersData } from "@/data/dealers";

export function DistributionPreview() {
  const featuredHubs = dealersData.filter((d) => d.isFeatured).slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT: TEXT & FEATURED WAREHOUSE HUBS */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-7 h-[3px] bg-[#007A4D] rounded-full shrink-0" />
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#007A4D] uppercase tracking-widest">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Hệ Thống Phân Phối Toàn Quốc</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102035] tracking-tight mt-2">
                Mạng Lưới Nhà Máy &amp; Tổng Kho 3 Miền
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Với 2 cụm nhà máy quy mô lớn tại Hưng Yên và Long An cùng{" "}
              <strong className="text-[#102035]">{siteConfig.distributorName}</strong>, Stroman đảm bảo cung ứng vật tư đồng bộ, giao hàng tận chân công trình nhanh chóng và đúng tiến độ.
            </p>

            <div className="space-y-2.5 pt-1">
              {featuredHubs.map((hub) => (
                <div
                  key={hub.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:border-[#007A4D]/40 bg-[#F6F9FB] hover:bg-white transition-all flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-[#007A4D]/20 text-[#007A4D] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <strong className="text-[#102035] text-sm font-bold">
                        {hub.name}
                      </strong>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                        {hub.typeName}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-0.5">{hub.address}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/he-thong-phan-phoi"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#007A4D] hover:bg-[#00613d] text-white font-bold text-xs shadow-sm transition-colors"
              >
                <span>Tra cứu đại lý theo tỉnh thành</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/chinh-sach-dai-ly"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#F6F9FB] text-[#102035] border border-slate-300 hover:border-[#007A4D] font-bold text-xs transition-colors"
              >
                <span>Đăng Ký Làm Đại Lý</span>
              </Link>
            </div>
          </div>

          {/* RIGHT: OFFICIAL STROMAN DISTRIBUTION MAP & FACTORY CARD */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200/80 bg-[#F6F9FB] p-5 sm:p-8 shadow-xs">
              <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center justify-center mb-5">
                <img
                  src="/images/news/he-thong-phan-phoi.png"
                  alt="Mạng lưới nhà máy và tổng kho Stroman toàn quốc"
                  className="max-h-72 w-auto object-contain"
                  loading="lazy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/70">
                  <strong className="text-[#102035] font-bold block mb-1">
                    Nhà máy Stroman Hưng Yên
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    KCN Như Quỳnh, Văn Lâm, Hưng Yên — Phục vụ miền Bắc &amp; Bắc Trung Bộ.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/70">
                  <strong className="text-[#102035] font-bold block mb-1">
                    Nhà máy Stroman Long An
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    KCN Đức Hòa III, Long An — Phủ sóng thị trường miền Nam &amp; Tây Nam Bộ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
