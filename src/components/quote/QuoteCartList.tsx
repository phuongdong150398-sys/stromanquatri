"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, FileSpreadsheet, PackageOpen } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

export function QuoteCartList() {
  const { items, updateQuantity, removeFromQuote, clearQuote, totalCount } = useQuote();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          Chưa có sản phẩm nào trong bảng dự toán
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Hãy vào danh mục sản phẩm hoặc xem bảng tra kỹ thuật của từng loại ống để thêm quy cách mong muốn vào bảng dự toán báo giá.
        </p>
        <Link
          href="/san-pham"
          className="mt-5 inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-stroman-600 text-white rounded-xl text-xs font-bold hover:bg-stroman-700 transition-colors shadow-sm"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Khám phá sản phẩm ngay</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Title bar */}
      <div className="p-4 sm:p-5 bg-slate-900 text-white flex justify-between items-center gap-3">
        <div>
          <h3 className="text-base font-bold">Danh Mục Vật Tư Dự Toán</h3>
          <p className="text-xs text-slate-300">
            Tổng cộng: <strong className="text-emerald-400">{items.length}</strong> quy cách |{" "}
            <strong className="text-emerald-400">{totalCount}</strong> đơn vị khối lượng
          </p>
        </div>

        <button
          type="button"
          onClick={clearQuote}
          className="min-h-[40px] px-3 text-xs text-rose-300 hover:text-rose-200 font-semibold transition-colors rounded-lg hover:bg-white/10"
        >
          Xóa toàn bộ
        </button>
      </div>

      {/* MOBILE CARD LIST (< md) */}
      <div className="md:hidden divide-y divide-slate-200">
        {items.map((item) => (
          <div key={item.id} className="p-4 space-y-3 bg-white">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  href={`/san-pham/${item.productSlug}`}
                  className="font-bold text-sm text-slate-900 hover:text-stroman-600 block leading-snug"
                >
                  {item.productName}
                </Link>
                <span className="text-xs font-mono text-slate-500">
                  Mã: {item.specificationCode}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFromQuote(item.id)}
                className="min-w-[40px] min-h-[40px] rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center shrink-0 transition-colors"
                aria-label="Xóa khỏi dự toán"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                {item.nominalDiameter}
              </span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-2.5 py-1 rounded-md">
                {item.pressureRating}
              </span>
              <span className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                Thành: {item.wallThickness}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-slate-600">
                Số lượng ({item.unit}):
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Giảm số lượng"
                  className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 h-10 text-center font-bold border border-slate-300 rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Tăng số lượng"
                  className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE (md+) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Tên Sản Phẩm &amp; Quy Cách</th>
              <th className="py-3 px-4">Đường Kính</th>
              <th className="py-3 px-4">Áp Lực</th>
              <th className="py-3 px-4">Độ Dày</th>
              <th className="py-3 px-4 text-center">Số Lượng</th>
              <th className="py-3 px-4">Đơn Vị</th>
              <th className="py-3 px-4 text-center">Xóa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4">
                  <Link
                    href={`/san-pham/${item.productSlug}`}
                    className="font-bold text-slate-900 hover:text-stroman-600 block text-xs"
                  >
                    {item.productName}
                  </Link>
                  <span className="text-xs font-mono text-slate-400">
                    Mã: {item.specificationCode}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-emerald-800 text-sm">
                  {item.nominalDiameter}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                    {item.pressureRating}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-700">
                  {item.wallThickness}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-14 py-1 text-center font-bold border border-slate-300 rounded text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">
                  {item.unit}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => removeFromQuote(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Xóa khỏi dự toán"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
        <Link
          href="/san-pham"
          className="inline-flex items-center min-h-[40px] text-stroman-600 font-bold hover:underline"
        >
          + Thêm quy cách ống khác
        </Link>
        <span className="text-slate-500">
          Danh mục đã sẵn sàng để xuất file hoặc gửi báo giá.
        </span>
      </div>
    </div>
  );
}
