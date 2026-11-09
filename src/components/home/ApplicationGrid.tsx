import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { applicationsData } from "@/data/applications";

export function ApplicationGrid() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-stroman-600 uppercase tracking-wider block mb-2">
            Giải Pháp Đa Ngành
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ứng Dụng Trong Mọi Lĩnh Vực Công Trình
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Sản phẩm ống Stroman hiện diện tại hàng nghìn dự án trọng điểm trên toàn quốc từ hạ tầng ngầm hóa, nhà máy công nghiệp đến tưới tiêu nông nghiệp hiện đại.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applicationsData.map((app) => (
            <div
              key={app.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                  <h3 className="absolute bottom-3 left-4 right-4 text-white font-bold text-base">
                    {app.title}
                  </h3>
                </div>

                <div className="p-5">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {app.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Dòng ống khuyến nghị:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {app.recommendedPipes.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href="/ung-dung"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-stroman-600 hover:text-stroman-700 transition-colors"
                >
                  <span>Xem chi tiết giải pháp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
