"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  ShieldCheck,
  Award,
  Truck,
  Percent,
  ChevronRight,
} from "lucide-react";
import { QuoteCartList } from "@/components/quote/QuoteCartList";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { QuoteSuccessModal } from "@/components/quote/QuoteSuccessModal";
import { QuoteRequestFormValues } from "@/types/quote";

export default function SmartQuotePage() {
  const [successData, setSuccessData] = useState<{
    code: string;
    customer: QuoteRequestFormValues;
  } | null>(null);

  const handleSuccess = (code: string, customer: QuoteRequestFormValues) => {
    setSuccessData({ code, customer });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-stroman-600">
            Trang Chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-bold">Lập Dự Toán & Báo Giá Nhanh</span>
        </nav>

        {/* HERO TITLE */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-stroman-600 font-bold uppercase tracking-wider mb-2">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Công Cụ Smart Quote 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Lập Dự Toán Vật Tư & Nhận Báo Giá Xuất Xưởng
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
            Chọn danh mục quy cách ống nhựa Stroman (uPVC, PP-R, HDPE) và gửi yêu cầu để nhận chính sách chiết khấu trực tiếp từ nhà máy sản xuất.
          </p>
        </div>

        {/* BENEFIT HIGHLIGHTS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-xs font-bold text-slate-900 block">
                Chiết Khấu Cạnh Tranh Nhất
              </strong>
              <span className="text-[11px] text-slate-500">
                Chính sách giá trực tiếp cho đại lý & nhà thầu
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-xs font-bold text-slate-900 block">
                Giao Hàng Tận Chân Công Trình
              </strong>
              <span className="text-[11px] text-slate-500">
                Đội xe chuyên dụng giao nhanh trong 24h
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-xs font-bold text-slate-900 block">
                Đầy Đủ CO, CQ & Hóa Đơn VAT
              </strong>
              <span className="text-[11px] text-slate-500">
                Chứng chỉ kiểm định của Bộ Xây Dựng
              </span>
            </div>
          </div>
        </div>

        {/* MAIN INTERFACE: CART LIST (LEFT) + FORM (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <QuoteCartList />
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <QuoteForm onSuccess={handleSuccess} />
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {successData && (
        <QuoteSuccessModal
          quoteCode={successData.code}
          customerData={successData.customer}
          onClose={() => setSuccessData(null)}
        />
      )}
    </div>
  );
}
