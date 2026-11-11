import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ShowcaseCategory {
  id: string;
  name: string;
  image: string;
  href: string;
}

const showcaseCategories: ShowcaseCategory[] = [
  {
    id: "ppr",
    name: "Ống nhựa PP-R",
    image: "/images/products/Stroman_Ong_nhua_PP-R.png",
    href: "/san-pham?category=ppr",
  },
  {
    id: "hdpe",
    name: "Ống nhựa HDPE",
    image: "/images/products/Stroman_Ong_nhua_HDPE.png",
    href: "/san-pham?category=hdpe",
  },
  {
    id: "upvc",
    name: "Ống nhựa uPVC",
    image: "/images/products/02_uPVC_PNG_KHONG_CHU.png",
    href: "/san-pham?category=upvc",
  },
  {
    id: "fittings-ppr",
    name: "Phụ kiện PP-R",
    image: "/images/products/Stroman_Phu_kien_PP-R.png",
    href: "/san-pham?category=fittings",
  },
  {
    id: "fittings-hdpe",
    name: "Phụ kiện HDPE",
    image: "/images/products/Stroman_Phu_kien_HDPE.png",
    href: "/san-pham?category=hdpe",
  },
  {
    id: "fittings-upvc",
    name: "Phụ kiện uPVC",
    image: "/images/products/Stroman_Phu_kien_uPVC.png",
    href: "/san-pham?category=fittings",
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching mockup */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-[3px] bg-[#007A4D] rounded-full shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-black text-[#102035] tracking-tight">
                Danh mục sản phẩm
              </h2>
            </div>
            <p className="mt-1.5 text-sm text-slate-600 pl-10">
              Hệ sinh thái sản phẩm ống nhựa và phụ kiện đồng bộ Stroman
            </p>
          </div>

          <Link
            href="/san-pham"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#007A4D] hover:text-[#005f3b] transition-colors group shrink-0"
          >
            <span>Xem tất cả sản phẩm</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Categories Grid: Desktop 6/row, Tablet 3/row, Mobile 2/row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {showcaseCategories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group h-full bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-[#007A4D]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Clean Image Stage */}
              <div className="h-36 sm:h-40 bg-[#F6F9FB] p-3 flex items-center justify-center overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Card Title + Detail Arrow Button */}
              <div className="p-3.5 sm:p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
                <h3 className="text-xs sm:text-[13px] font-bold text-[#102035] group-hover:text-[#007A4D] transition-colors leading-snug">
                  {cat.name}
                </h3>
                <span
                  aria-hidden="true"
                  className="w-7 h-7 rounded-full bg-emerald-50 text-[#007A4D] group-hover:bg-[#007A4D] group-hover:text-white flex items-center justify-center shrink-0 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
