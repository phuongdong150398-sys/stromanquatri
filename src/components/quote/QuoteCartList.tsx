"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, FileSpreadsheet, PackageOpen } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

export function QuoteCartList() {
  const { items, updateQuantity, removeFromQuote, clearQuote, totalCount } = useQuote();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          Chưa có sản phẩm nào trong bảng dự toán
        </h3>
        <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
          Hãy vào danh mục sản phẩm hoặc xem bảng tra kỹ thuật của từng loại ống để thêm quy cách mong muốn vào bảng dự toán báo giá.
        </p>
        <Link
          href="/san-pham"
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-stroman-600 text-white rounded-xl text-xs font-bold hover:bg-stroman-700 transition-colors shadow-sm"
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
      <div className="p-4 sm:p-5 bg-slate-900 text-white flex justify-between items-center">
        <div>
          <h3 className="text-base font-bold">Danh Mục Vật Tư Dự Toán</h3>
          <p className="text-xs text-slate-400">
            Tổng cộng: <strong className="text-emerald-400">{items.length}</strong> quy cách |{" "}
            <strong className="text-emerald-400">{totalCount}</strong> đơn vị khối lượng
          </p>
        </div>

        <button
          type="button"
          onClick={clearQuote}
          className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
        >
          Xóa toàn bộ
        </button>
      </div>

      {/* Table list */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Tên Sản Phẩm & Quy Cách</th>
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
                  <span className="text-[11px] font-mono text-slate-400">
                    Mã: {item.specificationCode}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-emerald-800 text-sm">
                  {item.nominalDiameter}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
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
                      className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
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
                      className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
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

      <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
        <Link
          href="/san-pham"
          className="text-stroman-600 font-bold hover:underline"
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
