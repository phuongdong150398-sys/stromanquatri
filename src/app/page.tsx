import React from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, Calendar } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { TechnicalFeatures } from "@/components/home/TechnicalFeatures";
import { ApplicationGrid } from "@/components/home/ApplicationGrid";
import { DistributionPreview } from "@/components/home/DistributionPreview";
import { newsData } from "@/data/news";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. 4 CORE PRODUCT CATEGORIES */}
      <CategoryShowcase />

      {/* 3. GERMAN TECH ADVANTAGES */}
      <TechnicalFeatures />

      {/* 4. APPLICATION AREAS */}
      <ApplicationGrid />

      {/* 5. NATIONWIDE DISTRIBUTION NETWORK */}
      <DistributionPreview />

      {/* 6. NEWS & CASE STUDIES TEASER */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-stroman-600 font-bold uppercase tracking-wider mb-2">
                <Newspaper className="w-4 h-4" />
                <span>Bản Tin Dự Án & Kỹ Thuật</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Tin Tức & Dự Án Tiêu Biểu
              </h2>
            </div>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-sm font-bold text-stroman-600 hover:text-stroman-700 transition-colors group"
            >
              <span>Xem tất cả bài viết</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-stroman-600 transition-colors line-clamp-2 leading-snug">
                      <Link href="/tin-tuc">{item.title}</Link>
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href="/tin-tuc"
                    className="inline-flex items-center gap-1 text-xs font-bold text-stroman-600 group-hover:text-stroman-700"
                  >
                    <span>Đọc tiếp</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
