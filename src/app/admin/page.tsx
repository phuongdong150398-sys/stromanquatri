"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Users,
  Package,
  MessageSquare,
  Database,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { SchemaSetupBanner } from "@/components/admin/SchemaSetupBanner";
import {
  QUOTE_STATUS_META,
  formatDateTimeVN,
  type QuoteStatus,
} from "@/lib/admin-format";

interface DashboardQuote {
  id: string;
  quote_code: string;
  full_name: string;
  phone: string;
  province: string;
  company_or_project?: string;
  status: QuoteStatus;
  created_at: string;
  quote_items?: Array<{ id: string }>;
}

interface DashboardDealerApp {
  id: string;
  status: string;
}

interface DashboardContact {
  id: string;
  status: string;
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [schemaMissing, setSchemaMissing] = useState(false);
  const [quotes, setQuotes] = useState<DashboardQuote[]>([]);
  const [dealerApps, setDealerApps] = useState<DashboardDealerApp[]>([]);
  const [contacts, setContacts] = useState<DashboardContact[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const [quotesRes, leadsRes, productsRes] = await Promise.all([
        fetch("/api/admin/quotes"),
        fetch("/api/admin/leads"),
        fetch("/api/admin/products"),
      ]);

      const [quotesData, leadsData, productsData] = await Promise.all([
        quotesRes.json(),
        leadsRes.json(),
        productsRes.json(),
      ]);

      const isMissing = Boolean(
        quotesData.schemaMissing ||
          leadsData.schemaMissing ||
          productsData.schemaMissing
      );
      setSchemaMissing(isMissing);

      setQuotes(Array.isArray(quotesData.quotes) ? quotesData.quotes : []);
      setDealerApps(
        Array.isArray(leadsData.dealerApplications)
          ? leadsData.dealerApplications
          : []
      );
      setContacts(
        Array.isArray(leadsData.contactMessages) ? leadsData.contactMessages : []
      );
      setProductCount(
        Array.isArray(productsData.products) ? productsData.products.length : 0
      );
    } catch {
      setFeedback({
        type: "error",
        text: "Không thể tải dữ liệu tổng quan từ máy chủ.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleSeedData = async () => {
    setSeeding(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({
          type: "error",
          text: data.error || "Đồng bộ dữ liệu mẫu thất bại.",
        });
        return;
      }
      setFeedback({
        type: "success",
        text: `Đã đồng bộ thành công: ${data.seeded?.products || 0} sản phẩm, ${
          data.seeded?.specifications || 0
        } quy cách, ${data.seeded?.news || 0} tin tức và ${
          data.seeded?.dealers || 0
        } điểm phân phối.`,
      });
      await loadDashboard();
    } catch {
      setFeedback({
        type: "error",
        text: "Lỗi kết nối khi chạy Seed Data.",
      });
    } finally {
      setSeeding(false);
    }
  };

  const newQuotesCount = quotes.filter((q) => q.status === "new").length;
  const quotingCount = quotes.filter((q) => q.status === "quoting").length;
  const pendingDealersCount = dealerApps.filter((d) => d.status === "new").length;
  const unreadContactsCount = contacts.filter((c) => c.status === "unread").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#061B33]">
            Tổng quan Hệ thống Quản trị
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi yêu cầu báo giá, hồ sơ đại lý và dữ liệu danh mục sản phẩm Ströman.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={loadDashboard}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-sm font-medium text-[#102035] transition-colors cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Làm mới
          </button>

          <button
            type="button"
            onClick={handleSeedData}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#007A4D] hover:bg-[#00633e] disabled:opacity-60 text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Database className="w-4 h-4" />
            {seeding ? "Đang đồng bộ..." : "Đồng bộ dữ liệu mẫu (Seed)"}
          </button>
        </div>
      </div>

      {/* Feedback alert */}
      {feedback && (
        <div
          className={`flex items-start gap-2.5 p-4 rounded-xl border text-sm ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Migration warning if tables not yet created */}
      {schemaMissing && (
        <SchemaSetupBanner onSeed={handleSeedData} seeding={seeding} />
      )}

      {/* Prompt to seed if schema exists but 0 products in DB */}
      {!loading && !schemaMissing && productCount === 0 && (
        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-bold text-sky-950">
                Bảng dữ liệu Supabase đã sẵn sàng nhưng chưa có sản phẩm nào
              </h2>
              <p className="text-xs text-sky-800 mt-0.5">
                Nhấn &ldquo;Đồng bộ dữ liệu mẫu (Seed)&rdquo; để nạp toàn bộ sản phẩm ống
                uPVC, PP-R, HDPE, tin tức và điểm kho vào cơ sở dữ liệu chỉ với 1 click.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSeedData}
            disabled={seeding}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#082B4A] hover:bg-[#061B33] text-white text-xs font-semibold cursor-pointer"
          >
            <Database className="w-4 h-4" />
            {seeding ? "Đang nạp..." : "Nạp dữ liệu ngay"}
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link
          href="/admin/quotes"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-[#007A4D]/40 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Đơn dự toán báo giá
            </span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-bold text-[#061B33]">
              {quotes.length}
            </span>
            <span className="text-xs font-medium text-sky-700">
              {newQuotesCount} mới · {quotingCount} đang xử lý
            </span>
          </div>
        </Link>

        <Link
          href="/admin/leads"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-[#007A4D]/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Hồ sơ đăng ký Đại lý
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-[#007A4D]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-bold text-[#061B33]">
              {dealerApps.length}
            </span>
            <span className="text-xs font-medium text-emerald-700">
              {pendingDealersCount} hồ sơ chờ duyệt
            </span>
          </div>
        </Link>

        <Link
          href="/admin/leads?tab=contact"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-[#007A4D]/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tin nhắn Liên hệ
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-bold text-[#061B33]">
              {contacts.length}
            </span>
            <span className="text-xs font-medium text-amber-700">
              {unreadContactsCount} chưa phản hồi
            </span>
          </div>
        </Link>

        <Link
          href="/admin/products"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-[#007A4D]/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Sản phẩm trên Database
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-bold text-[#061B33]">
              {productCount}
            </span>
            <span className="text-xs font-medium text-slate-500">
              Quản lý giá &amp; quy cách
            </span>
          </div>
        </Link>
      </div>

      {/* Recent Quote Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#061B33]">
              Yêu cầu dự toán mới nhất
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              5 yêu cầu báo giá gần đây được gửi từ website khách hàng.
            </p>
          </div>
          <Link
            href="/admin/quotes"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#007A4D] hover:text-[#00633e]"
          >
            Xem tất cả
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Đang tải dữ liệu...
          </div>
        ) : quotes.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Chưa có yêu cầu dự toán nào trong hệ thống. Khi khách hàng gửi form tại trang{" "}
            <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">
              /du-toan-bao-gia
            </code>
            , dữ liệu sẽ hiển thị tại đây.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 font-semibold">Mã đơn</th>
                  <th className="px-5 py-3 font-semibold">Khách hàng</th>
                  <th className="px-5 py-3 font-semibold">Tỉnh / Công trình</th>
                  <th className="px-5 py-3 font-semibold">Số hạng mục</th>
                  <th className="px-5 py-3 font-semibold">Trạng thái</th>
                  <th className="px-5 py-3 font-semibold">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotes.slice(0, 5).map((q) => {
                  const statusMeta =
                    QUOTE_STATUS_META[q.status] || QUOTE_STATUS_META.new;
                  return (
                    <tr key={q.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-3.5 font-mono text-xs font-semibold text-[#082B4A]">
                        {q.quote_code}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-[#102035]">
                          {q.full_name}
                        </div>
                        <div className="text-xs text-slate-500">{q.phone}</div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">
                        <div>{q.province}</div>
                        {q.company_or_project && (
                          <div className="text-xs text-slate-400 truncate max-w-[220px]">
                            {q.company_or_project}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-slate-700">
                        {q.quote_items?.length || 0} quy cách
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusMeta.badgeClass}`}
                        >
                          {statusMeta.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                        {formatDateTimeVN(q.created_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
