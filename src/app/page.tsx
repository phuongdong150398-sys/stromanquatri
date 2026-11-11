import React from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, Calendar } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { TechnicalFeatures } from "@/components/home/TechnicalFeatures";
import { StandardsSection } from "@/components/home/StandardsSection";
import { ApplicationGrid } from "@/components/home/ApplicationGrid";
import { DistributionPreview } from "@/components/home/DistributionPreview";
import { BottomCtaSection } from "@/components/home/BottomCtaSection";
import { newsData } from "@/data/news";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. 6 PRODUCT CATEGORIES SHOWCASE */}
      <CategoryShowcase />

      {/* 3. WHY STROMAN (5 CLEAN ADVANTAGES) */}
      <TechnicalFeatures />

      {/* 4. VERIFIED QUALITY & STANDARDS */}
      <StandardsSection />

      {/* 5. APPLICATION SECTORS */}
      <ApplicationGrid />

      {/* 6. NATIONWIDE DISTRIBUTION NETWORK */}
      <DistributionPreview />

      {/* 7. NEWS & CASE STUDIES TEASER */}
      <section className="py-16 sm:py-20 bg-[#F6F9FB] border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-7 h-[3px] bg-[#007A4D] rounded-full shrink-0" />
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#007A4D] uppercase tracking-widest">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>Bản Tin Dự Án &amp; Kỹ Thuật</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102035] tracking-tight mt-2">
                Tin Tức &amp; Dự Án Tiêu Biểu
              </h2>
            </div>

            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#007A4D] hover:text-[#005f3b] transition-colors group shrink-0"
            >
              <span>Xem tất cả bài viết</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsData.map((item) => {
              const isGraphic = item.image.endsWith(".png");
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div
                      className={`relative h-48 overflow-hidden ${
                        isGraphic ? "bg-white p-4 border-b border-slate-100" : "bg-slate-100"
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                          isGraphic ? "object-contain" : "object-cover"
                        }`}
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-[#061B33]/85 backdrop-blur-xs">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-[#007A4D]" />
                        <span>{item.date}</span>
                      </div>

                      <h3 className="text-sm font-bold text-[#102035] group-hover:text-[#007A4D] transition-colors line-clamp-2 leading-snug">
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
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#007A4D] group-hover:text-[#005f3b]"
                    >
                      <span>Đọc tiếp</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. BOTTOM PROMINENT CTA SECTION */}
      <BottomCtaSection />
    </div>
  );
}
