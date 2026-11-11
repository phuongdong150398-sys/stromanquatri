"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { productsData, categoriesMeta } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilter } from "@/components/products/ProductFilter";
import { ShieldCheck, Sparkles } from "lucide-react";

function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPressure, setSelectedPressure] = useState("");

  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      // 1. Category filter
      if (selectedCategory && p.category !== selectedCategory) {
        return false;
      }

      // 2. Search query filter (checks name, shortDesc, or any specification size)
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.shortDesc.toLowerCase().includes(q);
        const matchSpecs = p.specifications.some(
          (s) =>
            s.nominalDiameter.toLowerCase().includes(q) ||
            s.code.toLowerCase().includes(q)
        );
        if (!matchName && !matchDesc && !matchSpecs) {
          return false;
        }
      }

      // 3. Pressure filter
      if (selectedPressure) {
        const matchPressure = p.specifications.some((s) =>
          s.pressureRating.toLowerCase().includes(selectedPressure.toLowerCase())
        );
        if (!matchPressure) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery, selectedPressure]);

  const handleReset = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setSelectedPressure("");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BREADCRUMB & HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-stroman-600 font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Tiêu Chuẩn Công Nghệ CHLB Đức</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Danh Mục Ống Nhựa & Phụ Kiện Stroman
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
            Hệ thống phân phối đầy đủ các dòng ống cấp thoát nước uPVC, ống chịu nhiệt PP-R, ống PP-R Kháng Khuẩn và ống HDPE PE100 phục vụ dân dụng và công trình hạ tầng.
          </p>
        </div>

        {/* QUICK CATEGORY CHIPS */}
        <div className="relative mb-6 sm:mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pr-8 no-scrollbar snap-x">
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap snap-start transition-all ${
                selectedCategory === ""
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Tất Cả ({productsData.length})
            </button>
            {categoriesMeta.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap snap-start transition-all ${
                  selectedCategory === cat.id
                    ? "bg-stroman-600 text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-slate-50 to-transparent lg:hidden"
          />
        </div>

        {/* GRID LAYOUT: FILTER SIDEBAR + PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* SIDEBAR FILTER */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProductFilter
                categories={categoriesMeta}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedPressure={selectedPressure}
                onSelectPressure={setSelectedPressure}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* MAIN PRODUCT LIST */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4 text-xs text-slate-500 font-medium">
              <span>
                Tìm thấy{" "}
                <strong className="text-slate-900 font-bold">
                  {filteredProducts.length}
                </strong>{" "}
                dòng sản phẩm phù hợp
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  Không tìm thấy sản phẩm phù hợp
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Vui lòng thử điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-stroman-600 text-white text-xs font-bold rounded-lg hover:bg-stroman-700 transition-colors"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductCatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Đang tải danh mục...</div>}>
      <ProductCatalogContent />
    </Suspense>
  );
}
