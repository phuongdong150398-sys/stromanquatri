import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Phone,
  FileSpreadsheet,
  Award,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { productsData } from "@/data/products";
import { siteConfig } from "@/config/site";
import { SpecTable } from "@/components/products/SpecTable";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return productsData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} | Báo Giá & Thông Số Kỹ Thuật`,
    description: product.shortDesc,
    openGraph: {
      title: product.name,
      description: product.shortDesc,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = productsData
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-stroman-600">
            Trang Chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/san-pham" className="hover:text-stroman-600">
            Sản Phẩm
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-bold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* HERO SECTION OF PRODUCT DETAIL */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Product Image */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl p-8 flex items-center justify-center border border-slate-100 relative">
              {product.bannerBadge && (
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold text-white bg-stroman-600 rounded-full shadow-sm">
                  {product.bannerBadge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="max-h-80 w-auto object-contain drop-shadow-lg"
              />
            </div>

            {/* Right: Technical Highlights */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 text-xs font-bold text-stroman-700 bg-stroman-50 rounded-md border border-stroman-200/50">
                    {product.categoryName}
                  </span>
                  {product.standards.map((std) => (
                    <span
                      key={std}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 rounded-md"
                    >
                      {std}
                    </span>
                  ))}
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  {product.name}
                </h1>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {product.shortDesc}
                </p>

                {/* ADVANTAGES LIST */}
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Đặc Tính Nổi Bật:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
                <a
                  href="#spec-table"
                  className="px-6 py-3 rounded-xl bg-stroman-600 hover:bg-stroman-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Tra Cứu Bảng Quy Cách & Dự Toán</span>
                </a>

                <a
                  href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Hotline Dự Án: {siteConfig.hotline}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILED SPECIFICATION TABLE */}
        <div className="mb-12">
          <SpecTable product={product} />
        </div>

        {/* IN-DEPTH DESCRIPTION & APPLICATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-stroman-600" />
              <span>Mô Tả Chi Tiết & Tiêu Chuẩn Sản Xuất</span>
            </h3>
            <div className="prose prose-sm text-slate-600 space-y-4 leading-relaxed">
              <p>{product.description}</p>
              <h4 className="font-bold text-slate-800 text-sm">Ưu điểm cơ lý hóa vượt trội:</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                {product.advantages.map((adv, idx) => (
                  <li key={idx}>{adv}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Lĩnh Vực Ứng Dụng
            </h3>
            <ul className="space-y-3 text-xs text-slate-700">
              {product.applications.map((app, idx) => (
                <li key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 font-medium">
                  <div className="w-2 h-2 rounded-full bg-stroman-600"></div>
                  <span>{app}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-xs font-bold text-emerald-800 block mb-1">
                  Cần tư vấn thiết kế kỹ thuật?
                </span>
                <p className="text-xs text-emerald-700 mb-3">
                  Đội ngũ kỹ sư Stroman hỗ trợ bóc tách bản vẽ và đề xuất quy cách tối ưu cho công trình của bạn.
                </p>
                <Link
                  href="/du-toan-bao-gia"
                  className="inline-block w-full text-center py-2 px-3 bg-stroman-600 text-white rounded-lg text-xs font-bold hover:bg-stroman-700 transition-colors"
                >
                  Gửi Yêu Cầu Bóc Tách Dự Toán
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Sản Phẩm Cùng Dòng Bạn Có Thể Quan Tâm
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
