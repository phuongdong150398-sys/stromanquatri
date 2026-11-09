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
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setQuantity(Math.max(1, quantity - 5))}
          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-16 py-1.5 text-center text-sm font-bold text-slate-800 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setQuantity(quantity + 5)}
          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={isAdded}
        className={`px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
          isAdded
            ? "bg-emerald-600 text-white shadow"
            : "bg-stroman-600 hover:bg-stroman-700 text-white shadow hover:shadow-md"
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4" />
            <span>Đã thêm vào dự toán!</span>
          </>
        ) : (
          <>
            <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
            <span>Thêm vào Bảng dự toán</span>
          </>
        )}
      </button>
    </div>
  );
}
