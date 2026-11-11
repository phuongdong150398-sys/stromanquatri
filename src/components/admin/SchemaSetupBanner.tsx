"use client";

import React from "react";
import { AlertTriangle, Database } from "lucide-react";

interface SchemaSetupBannerProps {
  onSeed?: () => void;
  seeding?: boolean;
}

export function SchemaSetupBanner({ onSeed, seeding }: SchemaSetupBannerProps) {
  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950 shadow-sm">
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-amber-950">
            Cơ sở dữ liệu Supabase chưa khởi tạo bảng (Migration Pending)
          </h2>
          <p className="text-sm text-amber-900 mt-1 leading-relaxed">
            Hệ thống đã kết nối tới Supabase nhưng chưa tìm thấy các bảng dữ liệu{" "}
            <code className="px-1.5 py-0.5 rounded bg-amber-100 font-mono text-xs">
              quote_requests, products, news_articles, dealers, site_settings
            </code>
            . Vui lòng thực hiện 2 bước sau để kích hoạt toàn bộ dữ liệu:
          </p>
          <ol className="mt-3 space-y-1.5 text-sm text-amber-900 list-decimal list-inside">
            <li>
              Mở <strong>Supabase Dashboard &rarr; SQL Editor</strong>, dán toàn bộ nội
              dung file{" "}
              <code className="px-1.5 py-0.5 rounded bg-amber-100 font-mono text-xs">
                supabase/migrations/001_init_schema.sql
              </code>{" "}
              và nhấn <strong>Run</strong>.
            </li>
            <li>
              Sau khi chạy SQL thành công, nhấn nút{" "}
              <strong>Đồng bộ dữ liệu mẫu (Seed Data)</strong> bên dưới để nạp toàn bộ
              sản phẩm, quy cách, tin tức và điểm phân phối ban đầu.
            </li>
          </ol>

          {onSeed && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onSeed}
                disabled={seeding}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#007A4D] hover:bg-[#00633e] disabled:opacity-60 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <Database className="w-4 h-4" />
                {seeding ? "Đang đồng bộ dữ liệu..." : "Đồng bộ dữ liệu mẫu (Seed Data)"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
