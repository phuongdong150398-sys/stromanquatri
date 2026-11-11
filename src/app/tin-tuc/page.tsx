import React from "react";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { newsData } from "@/data/news";

export const metadata = {
  title: "Tin Tức & Dự Án Ống Nhựa Stroman | Bản Tin Ngành Nước",
  description:
    "Cập nhật các dự án cấp thoát nước tiêu biểu, tài liệu so sánh kỹ thuật ống uPVC, PP-R, HDPE và chính sách giá mới nhất của Stroman.",
};

export default function NewsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-stroman-600 uppercase tracking-wider block mb-2">
            Bản Tin & Dự Án
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tin Tức, Kỹ Thuật & Dự Án Tiêu Biểu
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Khám phá các bài viết chuyên sâu về kỹ thuật ngành ống nhựa, công nghệ CHLB Đức và những dự án trọng điểm Stroman đồng hành.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className={`relative h-52 overflow-hidden ${item.image.endsWith(".png") ? "bg-white p-4 border-b border-slate-100" : "bg-slate-100"}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${item.image.endsWith(".png") ? "object-contain" : "object-cover"}`}
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-slate-950/80 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 group-hover:text-stroman-600 transition-colors leading-snug mb-3">
                    {item.title}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-stroman-600">
                <span>Xem chi tiết bài viết</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
