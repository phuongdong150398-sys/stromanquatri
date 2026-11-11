"use client";

import React, { useState } from "react";
import { Plus, Check, FileSpreadsheet } from "lucide-react";
import { Product, ProductSpecification } from "@/types/product";
import { useQuote } from "@/context/QuoteContext";

interface AddToQuoteButtonProps {
  product: Product;
  specification: ProductSpecification;
  compact?: boolean;
}

export function AddToQuoteButton({
  product,
  specification,
  compact = false,
}: AddToQuoteButtonProps) {
  const { addToQuote } = useQuote();
  const [quantity, setQuantity] = useState(10);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToQuote({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      category: product.categoryName,
      specificationCode: specification.code,
      nominalDiameter: specification.nominalDiameter,
      pressureRating: specification.pressureRating,
      wallThickness: specification.wallThickness,
      quantity: quantity,
      unit: specification.standardLength.includes("Cuộn")
        ? "Cuộn"
        : specification.standardLength.includes("Cái")
        ? "Cái"
        : "Cây",
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-14 px-1.5 py-1 text-xs text-center border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-stroman-600 font-semibold"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={isAdded}
          className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 transition-all ${
            isAdded
              ? "bg-emerald-600 text-white"
              : "bg-stroman-600 hover:bg-stroman-700 text-white shadow-xs"
          }`}
          title="Thêm quy cách này vào dự toán báo giá"
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Đã thêm</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Dự toán</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 w-full">
      <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
        <button
          type="button"
          onClick={() => setQuantity(Math.max(1, quantity - 5))}
          aria-label="Giảm số lượng"
          className="min-w-[40px] min-h-[42px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-base font-bold flex items-center justify-center"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-14 min-h-[42px] text-center text-sm font-bold text-slate-800 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setQuantity(quantity + 5)}
          aria-label="Tăng số lượng"
          className="min-w-[40px] min-h-[42px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-base font-bold flex items-center justify-center"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={isAdded}
        className={`flex-1 min-h-[42px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
          isAdded
            ? "bg-emerald-600 text-white shadow"
            : "bg-stroman-600 hover:bg-stroman-700 text-white shadow hover:shadow-md"
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4 shrink-0" />
            <span>Đã thêm!</span>
          </>
        ) : (
          <>
            <FileSpreadsheet className="w-4 h-4 text-emerald-200 shrink-0" />
            <span>Thêm vào dự toán</span>
          </>
        )}
      </button>
    </div>
  );
}
