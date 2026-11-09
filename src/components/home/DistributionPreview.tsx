import React from "react";
import Link from "next/link";
import { MapPin, Phone, ArrowRight, Building2, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { dealersData } from "@/data/dealers";

export function DistributionPreview() {
  const featuredHubs = dealersData.filter((d) => d.isFeatured).slice(0, 4);

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: TEXT & HUBS */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs text-stroman-600 font-bold uppercase tracking-wider">
              <Truck className="w-4 h-4" />
              <span>Hệ Thống Phân Phối Toàn Quốc</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Mạng Lưới Nhà Máy & Tổng Kho Trải Dài 3 Miền
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Với 2 cụm nhà máy quy mô lớn tại Hưng Yên và Long An cùng hàng trăm đại lý cấp 1 tại các tỉnh thành, Stroman đảm bảo cung ứng vật tư nhanh chóng, giao hàng tận chân công trình trong 24h.
            </p>

            <div className="space-y-3 pt-2">
              {featuredHubs.map((hub) => (
                <div
                  key={hub.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:border-stroman-400 bg-slate-50/60 hover:bg-white transition-all flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-stroman-100 text-stroman-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 text-sm font-bold">
                        {hub.name}
                      </strong>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        {hub.typeName}
                      </span>
                    </div>
                    <p className="text-slate-500 mt-0.5">{hub.address}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/he-thong-phan-phoi"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-stroman-600 hover:bg-stroman-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>Tra cứu đại lý gần nhất theo tỉnh thành</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT: MAP / FACTORY GRAPHIC */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
              <div className="mb-6">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Trung Tâm Logistics
                </span>
                <h3 className="text-2xl font-black mt-1">2 Đại Nhà Máy Hiện Đại</h3>
              </div>

              <div className="space-y-6 text-xs text-slate-300">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <strong className="text-white text-sm block mb-1">
                    1. Nhà máy Stroman Hưng Yên (Miền Bắc)
                  </strong>
                  <p className="text-slate-400">
                    KCN Như Quỳnh, Văn Lâm, Hưng Yên — Công suất thiết kế 40.000 tấn/năm, cung ứng toàn bộ khu vực phía Bắc và Bắc Trung Bộ.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <strong className="text-white text-sm block mb-1">
                    2. Nhà máy Stroman Long An (Miền Nam)
                  </strong>
                  <p className="text-slate-400">
                    KCN Đức Hòa III, Long An — Công suất 30.000 tấn/năm, phủ sóng vùng kinh tế trọng điểm phía Nam và Tây Nam Bộ.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Hỗ trợ kỹ thuật & vận chuyển:</span>
                  <strong className="text-emerald-400 font-bold text-sm">
                    Hotline: {siteConfig.hotline}
                  </strong>
                </div>
                <Link
                  href="/chinh-sach-dai-ly"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-colors"
                >
                  Đăng Ký Làm Đại Lý
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
