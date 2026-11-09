"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Printer, Phone, ArrowRight, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { QuoteRequestFormValues } from "@/types/quote";
import { useQuote } from "@/context/QuoteContext";

interface QuoteSuccessModalProps {
  quoteCode: string;
  customerData: QuoteRequestFormValues;
  onClose: () => void;
}

export function QuoteSuccessModal({
  quoteCode,
  customerData,
  onClose,
}: QuoteSuccessModalProps) {
  const { items, clearQuote } = useQuote();

  const handlePrint = () => {
    window.print();
  };

  const handleFinish = () => {
    clearQuote();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={handleFinish}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PRINT AREA */}
        <div className="print-area">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 no-print">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="hidden print:block text-left border-b border-slate-300 pb-4 mb-4">
              <h2 className="text-xl font-bold uppercase">{siteConfig.brandName}</h2>
              <p className="text-xs text-slate-600">{siteConfig.distributorName}</p>
              <p className="text-xs text-slate-600">Hotline: {siteConfig.hotline} | Website: {siteConfig.url}</p>
            </div>

            <h2 className="text-2xl font-black text-slate-900">
              Yêu Cầu Báo Giá Đã Được Tiếp Nhận!
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Mã hồ sơ dự toán:{" "}
              <strong className="text-emerald-700 font-mono text-sm bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {quoteCode}
              </strong>
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-xs text-slate-700 space-y-3 mb-6">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200">
              <div>
                <span className="text-slate-500 block">Khách hàng:</span>
                <strong className="text-slate-900">{customerData.fullName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Số điện thoại:</span>
                <strong className="text-slate-900">{customerData.phone}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200">
              <div>
                <span className="text-slate-500 block">Khu vực / Tỉnh:</span>
                <span className="font-semibold">{customerData.province}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Công trình / Công ty:</span>
                <span className="font-semibold">{customerData.companyOrProject || "Khách hàng dự án"}</span>
              </div>
            </div>

            {/* List of items summary */}
            <div>
              <span className="text-slate-500 block mb-1.5 font-bold">
                Danh sách vật tư yêu cầu ({items.length} hạng mục):
              </span>
              <ul className="space-y-1 max-h-40 overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="truncate max-w-[280px]">
                      {item.productName} ({item.nominalDiameter} - {item.pressureRating})
                    </span>
                    <strong className="font-mono text-emerald-800 shrink-0">
                      {item.quantity} {item.unit}
                    </strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* MODAL ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-100 no-print">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>In Bản Dự Toán Này</span>
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="flex-1 py-3 px-4 rounded-xl bg-stroman-600 hover:bg-stroman-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <span>Hoàn tất & Tiếp tục xem sản phẩm</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 pt-4 text-center text-xs text-slate-500 border-t border-slate-100 no-print">
          <span>Cần gấp trong ngày? Gọi trực tiếp Hotline: </span>
          <a
            href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
            className="text-stroman-600 font-bold hover:underline"
          >
            {siteConfig.hotline}
          </a>
        </div>
      </div>
    </div>
  );
}
