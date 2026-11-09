import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, FileSpreadsheet } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Product Image Box */}
      <div className="relative h-56 bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6 border-b border-slate-100 overflow-hidden">
        {product.bannerBadge && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[11px] font-bold text-white bg-stroman-600 rounded-full shadow-sm">
            {product.bannerBadge}
          </span>
        )}
        <span className="absolute top-3 right-3 z-10 px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-white/90 backdrop-blur-sm rounded-md shadow-xs border border-slate-200/60">
          {product.categoryName}
        </span>

        {/* Fallback & Product Image */}
        <div className="relative w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-44 w-auto object-contain drop-shadow-md"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{product.standards[0] || "Tiêu chuẩn Đức"}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-stroman-600 transition-colors line-clamp-2">
            <Link href={`/san-pham/${product.slug}`}>{product.name}</Link>
          </h3>

          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Specs quick view & CTA buttons */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span>Số quy cách:</span>
            <span className="font-semibold text-slate-800">
              {product.specifications.length} mã đường kính
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/san-pham/${product.slug}`}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
            >
              <span>Xem bảng tra</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href={`/san-pham/${product.slug}#spec-table`}
              className="w-full inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg bg-stroman-50 hover:bg-stroman-100 text-stroman-700 text-xs font-bold transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Lập dự toán</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
