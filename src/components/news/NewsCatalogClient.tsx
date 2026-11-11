"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Search } from "lucide-react";
import type { NewsArticle } from "@/data/news";
import { isNewsContainImage } from "@/lib/news-repository";

const CATEGORIES: Array<"Tất cả" | NewsArticle["category"]> = [
  "Tất cả",
  "Kỹ Thuật",
  "Dự Án",
  "Chính Sách",
  "Sự Kiện",
];

export function NewsCatalogClient({ articles }: { articles: NewsArticle[] }) {
  const [selectedCategory, setSelectedCategory] = useState<
    "Tất cả" | NewsArticle["category"]
  >("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return articles.filter((item) => {
      if (selectedCategory !== "Tất cả" && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Category Filter + Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "Tất cả"
                ? articles.length
                : articles.filter((a) => a.category === cat).length;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? "bg-[#007A4D] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm bài viết, tiêu chuẩn, dự án..."
            className="w-full min-h-[44px] pl-9 pr-3 py-2 text-base sm:text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#007A4D]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 sm:top-3" />
        </div>
      </div>

      {/* Article Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
          Không tìm thấy bài viết phù hợp từ khóa &ldquo;{searchQuery}&rdquo;.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredArticles.map((item, idx) => {
            const isContain = isNewsContainImage(item.image);
            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <Link
                    href={`/tin-tuc/${item.slug}`}
                    className={`block relative aspect-[16/9] overflow-hidden ${
                      isContain
                        ? "bg-white p-4 border-b border-slate-100"
                        : "bg-slate-100"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
                        isContain ? "object-contain" : "object-cover"
                      }`}
                      loading={idx < 3 ? "eager" : "lazy"}
                    />
                  </Link>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-[#007A4D] border border-[#007A4D]/20">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-[#007A4D]" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 group-hover:text-[#007A4D] transition-colors leading-snug mb-2.5 line-clamp-2">
                      <Link href={`/tin-tuc/${item.slug}`}>{item.title}</Link>
                    </h2>

                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100">
                  <Link
                    href={`/tin-tuc/${item.slug}`}
                    className="inline-flex items-center justify-between w-full min-h-[40px] text-xs font-bold text-[#007A4D] hover:text-[#005f3b] transition-colors"
                  >
                    <span>Xem chi tiết bài viết</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
