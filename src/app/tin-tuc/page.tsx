import React from "react";
import { getPublishedNewsArticles } from "@/lib/news-repository";
import { NewsCatalogClient } from "@/components/news/NewsCatalogClient";

export const revalidate = 60;

export const metadata = {
  title: "Tin Tức & Dự Án Ống Nhựa Stroman | Bản Tin Kỹ Thuật Ngành Nước",
  description:
    "Tổng hợp kiến thức kỹ thuật chọn ống uPVC, PP-R, HDPE PE100, hướng dẫn hàn ống tiêu chuẩn CHLB Đức, dự án tiêu biểu và chính sách báo giá xuất kho Stroman.",
};

export default async function NewsPage() {
  const articles = await getPublishedNewsArticles();

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold text-[#007A4D] uppercase tracking-widest block mb-2">
            Bản Tin Chuyên Ngành &amp; Dự Án
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#061B33] tracking-tight">
            Tin Tức, Kỹ Thuật &amp; Dự Án Tiêu Biểu
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Cẩm nang lựa chọn quy cách ống nhựa, quy trình thi công chuẩn CHLB Đức, tiêu chuẩn nghiệm thu ISO/TCVN và chính sách hỗ trợ dự án từ Tổng Kho Stroman Quảng Trị.
          </p>
        </div>

        <NewsCatalogClient articles={articles} />
      </div>
    </div>
  );
}
