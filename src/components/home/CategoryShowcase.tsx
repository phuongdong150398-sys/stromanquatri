import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { categoriesMeta } from "@/data/products";

export function CategoryShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-stroman-600 font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Dây Chuyền Đồng Bộ CHLB Đức</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              4 Dòng Sản Phẩm Ống Nhựa Chủ Lực
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Đáp ứng trọn vẹn mọi yêu cầu thiết kế khắt khe nhất của các dự án cấp thoát nước, hạ tầng đô thị và công trình dân dụng cao cấp.
            </p>
          </div>

          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 text-sm font-bold text-stroman-600 hover:text-stroman-700 transition-colors group"
          >
            <span>Xem toàn bộ danh mục sản phẩm</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesMeta.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              className="group bg-slate-50 hover:bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 overflow-hidden"
            >
              <div>
                {/* Category Image Box */}
                <div className="relative h-44 bg-white rounded-2xl flex items-center justify-center p-4 mb-5 border border-slate-100 group-hover:border-stroman-200 transition-colors">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                  />
                </div>

                <div className="text-[11px] font-bold text-stroman-600 uppercase tracking-wider mb-1">
                  {cat.tagline}
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-stroman-600 transition-colors">
                  <Link href={`/san-pham?category=${cat.id}`}>{cat.name}</Link>
                </h3>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-stroman-600">
                <span>Tra cứu quy cách</span>
                <div className="w-7 h-7 rounded-full bg-slate-200 group-hover:bg-stroman-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
