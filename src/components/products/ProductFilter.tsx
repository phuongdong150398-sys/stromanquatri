"use client";

import React from "react";
import { Search, RotateCcw, Filter } from "lucide-react";
import { ProductCategory } from "@/types/product";

interface ProductFilterProps {
  categories: { id: string; name: string }[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedPressure: string;
  onSelectPressure: (p: string) => void;
  onReset: () => void;
}

export function ProductFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedPressure,
  onSelectPressure,
  onReset,
}: ProductFilterProps) {
  const pressureOptions = [
    { label: "Tất cả áp suất", value: "" },
    { label: "PN6 (Thoát nước / Áp thấp)", value: "PN6" },
    { label: "PN8 / PN8.5 (Tiêu chuẩn)", value: "PN8" },
    { label: "PN9 / PN10 (Áp lực trung bình)", value: "PN10" },
    { label: "PN12.5 / PN16 (Áp lực cao)", value: "PN16" },
    { label: "PN20 / PN25 (Nước nóng / Siêu áp)", value: "PN20" },
  ];

  const hasActiveFilter = selectedCategory || searchQuery || selectedPressure;

  const [isMobileExpanded, setIsMobileExpanded] = React.useState(false);
  const activeCount = [selectedCategory, searchQuery, selectedPressure].filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2 pb-0 lg:pb-3 lg:border-b border-slate-100">
        <button
          type="button"
          onClick={() => setIsMobileExpanded((prev) => !prev)}
          className="lg:pointer-events-none flex-1 flex items-center justify-between lg:justify-start gap-2 min-h-[42px] lg:min-h-0 text-slate-900 font-bold text-sm text-left"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-stroman-600 shrink-0" />
            <span>Bộ Lọc Kỹ Thuật Sản Phẩm</span>
            {activeCount > 0 && (
              <span className="lg:hidden inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-stroman-600 text-white text-xs font-bold">
                {activeCount}
              </span>
            )}
          </span>
          <span className="lg:hidden text-xs font-semibold text-stroman-600">
            {isMobileExpanded ? "Thu gọn" : "Mở bộ lọc"}
          </span>
        </button>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 min-h-[40px] px-2 text-xs text-rose-600 hover:text-rose-700 font-medium transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xóa lọc</span>
          </button>
        )}
      </div>

      <div className={`${isMobileExpanded ? "block mt-4 pt-4 border-t border-slate-100" : "hidden"} lg:block lg:mt-5 space-y-5`}>
        {/* 1. TÌM KIẾM THEO TÊN / QUY CÁCH */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Từ khóa hoặc Đường kính (Ø)
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Ví dụ: Ø110, HDPE, Kháng khuẩn, Cút..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full min-h-[44px] pl-9 pr-3 py-2 text-base sm:text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-stroman-600 focus:border-transparent"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 sm:top-3" />
          </div>
        </div>

        {/* 2. CHỌN CHỦNG LOẠI VẬT LIỆU */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Chủng Loại Vật Liệu
          </label>
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => onSelectCategory("")}
              className={`text-left min-h-[42px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === ""
                  ? "bg-stroman-600 text-white font-bold shadow-xs"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Tất cả các dòng ống
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`text-left min-h-[42px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-stroman-600 text-white font-bold shadow-xs"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3. LỌC THEO CẤP ÁP LỰC PN */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Cấp Áp Suất Làm Việc (PN)
          </label>
          <select
            value={selectedPressure}
            onChange={(e) => onSelectPressure(e.target.value)}
            className="w-full min-h-[44px] px-3 py-2 text-base sm:text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-stroman-600 focus:border-transparent bg-white text-slate-800"
          >
            {pressureOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
