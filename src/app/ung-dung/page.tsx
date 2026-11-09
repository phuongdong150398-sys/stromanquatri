import React from "react";
import Link from "next/link";
import { applicationsData } from "@/data/applications";
import { ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Lĩnh Vực Ứng Dụng Ống Nhựa Stroman | Giải Pháp Kỹ Thuật Dự Án",
  description:
    "Khám phá các giải pháp ứng dụng chuyên sâu của ống nhựa Stroman trong Cấp thoát nước, Nông nghiệp, Khai khoáng, Dân dụng và Khu công nghiệp.",
};

export default function ApplicationsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-stroman-600 uppercase tracking-wider block mb-2">
            Giải Pháp Kỹ Thuật Toàn Diện
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Lĩnh Vực Ứng Dụng Ống Nhựa Stroman
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Được thiết kế theo tiêu chuẩn công nghệ Đức, các sản phẩm ống Stroman mang lại giải pháp dẫn nước, thoát thải và chịu áp lực tối ưu cho từng ngành nghề đặc thù.
          </p>
        </div>

        <div className="space-y-12">
          {applicationsData.map((app, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center"
              >
                {/* Image */}
                <div
                  className={`lg:col-span-5 h-72 lg:h-full relative overflow-hidden bg-slate-100 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-7 p-6 sm:p-10 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="text-xs font-bold text-stroman-600 uppercase tracking-wider mb-1">
                    {app.subtitle}
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-3">
                    {app.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {app.description}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-100">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Ưu điểm giải pháp:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {app.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Dòng ống khuyên dùng:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-800 font-semibold">
                        {app.recommendedPipes.map((p, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-stroman-600"></div>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href="/du-toan-bao-gia"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stroman-600 hover:bg-stroman-700 text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    <span>Lập dự toán cho công trình này</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
