"use client";

import React, { useState } from "react";
import { Search, ShieldCheck, Download, FileSpreadsheet } from "lucide-react";
import { Product, ProductSpecification } from "@/types/product";
import { AddToQuoteButton } from "./AddToQuoteButton";

interface SpecTableProps {
  product: Product;
}

export function SpecTable({ product }: SpecTableProps) {
  const [filterQuery, setFilterQuery] = useState("");

  const filteredSpecs = product.specifications.filter((spec) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      spec.nominalDiameter.toLowerCase().includes(q) ||
      spec.pressureRating.toLowerCase().includes(q) ||
      spec.code.toLowerCase().includes(q)
    );
  });

  return (
    <div id="spec-table" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="p-4 sm:p-6 bg-slate-900 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Thông Số Kỹ Thuật Tiêu Chuẩn Đức</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Bảng Tra Quy Cách Kích Thước & Áp Suất Làm Việc
          </h3>
        </div>

        <div className="w-full md:w-auto flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Tra nhanh Ø hoặc PN..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/80 text-slate-700 uppercase font-bold border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Mã Quy Cách</th>
              <th className="py-3.5 px-4 font-black text-slate-900">Đường Kính (Ø)</th>
              <th className="py-3.5 px-4">Áp Lực Làm Việc</th>
              <th className="py-3.5 px-4">Độ Dày Thành</th>
              <th className="py-3.5 px-4">Chiều Dài</th>
              <th className="py-3.5 px-4">Tiêu Chuẩn</th>
              <th className="py-3.5 px-4 text-center">Tạo Dự Toán Nhanh</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSpecs.length > 0 ? (
              filteredSpecs.map((spec, idx) => (
                <tr
                  key={spec.code}
                  className={`hover:bg-stroman-50/60 transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-medium text-slate-500">
                    {spec.code}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 text-sm text-emerald-800">
                    {spec.nominalDiameter}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      {spec.pressureRating}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    {spec.wallThickness}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {spec.standardLength}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {spec.standard}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <AddToQuoteButton
                        product={product}
                        specification={spec}
                        compact={true}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  Không tìm thấy quy cách phù hợp với từ khóa &quot;{filterQuery}&quot;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer hint */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
        <span>
          * Lưu ý: Các quy cách đặc biệt không có trong bảng vui lòng liên hệ hotline{" "}
          <strong className="text-slate-800">1900 6086</strong> để đặt hàng gia công theo yêu cầu.
        </span>
        <span className="font-semibold text-emerald-700">
          Hiển thị {filteredSpecs.length} / {product.specifications.length} quy cách
        </span>
      </div>
    </div>
  );
}
