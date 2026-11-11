"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  Download,
  Eye,
  Trash2,
  X,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SchemaSetupBanner } from "@/components/admin/SchemaSetupBanner";
import {
  QUOTE_STATUS_META,
  formatDateTimeVN,
  formatVnd,
  type QuoteStatus,
} from "@/lib/admin-format";

interface QuoteItemRow {
  id: string;
  product_id: string;
  product_name: string;
  specification_code: string;
  nominal_diameter: string;
  pressure_rating: string;
  wall_thickness: string;
  quantity: number;
  unit: string;
  unit_price_guide: number | null;
  note?: string | null;
}

interface QuoteRequestRow {
  id: string;
  quote_code: string;
  full_name: string;
  phone: string;
  email: string;
  province: string;
  company_or_project?: string | null;
  role: string;
  delivery_address?: string | null;
  notes?: string | null;
  status: QuoteStatus;
  discount_percent: number;
  admin_notes?: string | null;
  created_at: string;
  quote_items?: QuoteItemRow[];
}

const ROLE_LABELS: Record<string, string> = {
  contractor: "Nhà thầu thi công",
  dealer: "Đại lý / Nhà phân phối",
  consultant: "Tư vấn thiết kế / Chủ đầu tư",
  individual: "Khách hàng cá nhân / Dự án",
};

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [schemaMissing, setSchemaMissing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | QuoteStatus>("all");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequestRow | null>(null);
  const [editStatus, setEditStatus] = useState<QuoteStatus>("new");
  const [editDiscount, setEditDiscount] = useState<number>(0);
  const [editAdminNotes, setEditAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/quotes");
      const data = await res.json();
      setSchemaMissing(Boolean(data.schemaMissing));
      setQuotes(Array.isArray(data.quotes) ? data.quotes : []);
    } catch {
      setFeedback({ type: "error", text: "Không thể tải danh sách đơn dự toán." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  const filteredQuotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return quotes.filter((item) => {
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      if (!matchesStatus) return false;
      if (!q) return true;
      return (
        item.quote_code.toLowerCase().includes(q) ||
        item.full_name.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        (item.company_or_project || "").toLowerCase().includes(q) ||
        item.province.toLowerCase().includes(q)
      );
    });
  }, [quotes, search, statusFilter]);

  const openDetail = (quote: QuoteRequestRow) => {
    setSelectedQuote(quote);
    setEditStatus(quote.status);
    setEditDiscount(Number(quote.discount_percent || 0));
    setEditAdminNotes(quote.admin_notes || "");
    setFeedback(null);
  };

  const handleSaveQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuote) return;
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch(`/api/admin/quotes/${selectedQuote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          discount_percent: Number(editDiscount) || 0,
          admin_notes: editAdminNotes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({ type: "error", text: data.error || "Cập nhật thất bại." });
        return;
      }

      const updated: QuoteRequestRow = data.quote;
      setQuotes((prev) =>
        prev.map((row) => (row.id === updated.id ? updated : row))
      );
      setSelectedQuote(updated);
      setFeedback({
        type: "success",
        text: `Đã cập nhật đơn dự toán ${updated.quote_code}.`,
      });
    } catch {
      setFeedback({ type: "error", text: "Lỗi kết nối khi lưu đơn dự toán." });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteQuote = async (quote: QuoteRequestRow) => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa đơn dự toán ${quote.quote_code} của ${quote.full_name}?`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/quotes/${quote.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        setFeedback({ type: "error", text: data.error || "Xóa đơn thất bại." });
        return;
      }
      setQuotes((prev) => prev.filter((row) => row.id !== quote.id));
      if (selectedQuote?.id === quote.id) {
        setSelectedQuote(null);
      }
      setFeedback({ type: "success", text: `Đã xóa đơn ${quote.quote_code}.` });
    } catch {
      setFeedback({ type: "error", text: "Lỗi kết nối khi xóa đơn." });
    }
  };

  const handleExportCsv = () => {
    const headers = [
      "Ma don",
      "Ngay tao",
      "Khach hang",
      "So dien thoai",
      "Email",
      "Tinh/TP",
      "Cong ty/Du an",
      "Vai tro",
      "Trang thai",
      "Chiet khau (%)",
      "So hang muc",
      "Ghi chu noi bo",
    ];

    const escapeCsv = (val: unknown) => {
      const str = String(val ?? "").replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = filteredQuotes.map((q) => [
      q.quote_code,
      formatDateTimeVN(q.created_at),
      q.full_name,
      q.phone,
      q.email,
      q.province,
      q.company_or_project || "",
      ROLE_LABELS[q.role] || q.role,
      QUOTE_STATUS_META[q.status]?.label || q.status,
      q.discount_percent ?? 0,
      q.quote_items?.length || 0,
      q.admin_notes || "",
    ]);

    const csvContent =
      "\uFEFF" +
      [headers, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `stroman-bao-gia-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#061B33]">
            Quản lý Đơn Dự Toán Báo Giá
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tra cứu quy cách ống khách hàng yêu cầu, cập nhật chiết khấu &amp; xuất CSV.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={loadQuotes}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-sm font-medium text-[#102035] cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Tải lại
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            disabled={filteredQuotes.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#082B4A] hover:bg-[#061B33] disabled:opacity-50 text-white text-sm font-semibold cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Xuất CSV ({filteredQuotes.length})
          </button>
        </div>
      </div>

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

      {schemaMissing && <SchemaSetupBanner />}

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo mã đơn (ST...), tên khách, số điện thoại, công trình..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#007A4D]/25 focus:border-[#007A4D]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(["all", "new", "quoting", "sent", "won", "cancelled"] as const).map(
            (st) => {
              const active = statusFilter === st;
              const label =
                st === "all" ? `Tất cả (${quotes.length})` : QUOTE_STATUS_META[st].label;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? "bg-[#007A4D] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {label}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Đang tải danh sách đơn dự toán...
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            Không tìm thấy đơn dự toán phù hợp bộ lọc.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3.5 font-semibold">Mã đơn</th>
                  <th className="px-4 py-3.5 font-semibold">Khách hàng</th>
                  <th className="px-4 py-3.5 font-semibold">Khu vực / Dự án</th>
                  <th className="px-4 py-3.5 font-semibold">Hạng mục</th>
                  <th className="px-4 py-3.5 font-semibold">Chiết khấu</th>
                  <th className="px-4 py-3.5 font-semibold">Trạng thái</th>
                  <th className="px-4 py-3.5 font-semibold">Ngày gửi</th>
                  <th className="px-4 py-3.5 font-semibold text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQuotes.map((q) => {
                  const st = QUOTE_STATUS_META[q.status] || QUOTE_STATUS_META.new;
                  return (
                    <tr key={q.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#082B4A]">
                        {q.quote_code}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-[#102035]">
                          {q.full_name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {q.phone} &bull; {ROLE_LABELS[q.role] || q.role}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-slate-700">{q.province}</div>
                        <div className="text-xs text-slate-500 truncate max-w-[200px]">
                          {q.company_or_project || "Chưa nêu dự án"}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-700 font-medium">
                        {q.quote_items?.length || 0} mục
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-[#007A4D]">
                        {q.discount_percent ? `${q.discount_percent}%` : "0%"}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${st.badgeClass}`}
                        >
                          {st.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                        {formatDateTimeVN(q.created_at)}
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openDetail(q)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#007A4D] hover:text-white text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Chi tiết
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteQuote(q)}
                            aria-label="Xóa đơn dự toán"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 bg-[#061B33] text-white flex items-center justify-between shrink-0">
              <div>
                <div className="text-xs text-[#00C389] font-semibold uppercase tracking-wider">
                  Chi tiết Yêu cầu Dự toán
                </div>
                <h2 className="text-lg font-bold">
                  {selectedQuote.quote_code} &mdash; {selectedQuote.full_name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                aria-label="Đóng chi tiết"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Customer info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <div>
                  <span className="text-xs text-slate-500">Số điện thoại:</span>
                  <div className="font-semibold text-[#102035]">
                    {selectedQuote.phone}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Email:</span>
                  <div className="font-semibold text-[#102035]">
                    {selectedQuote.email}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">
                    Đơn vị / Công trình:
                  </span>
                  <div className="font-medium text-[#102035]">
                    {selectedQuote.company_or_project || "Không cung cấp"} (
                    {ROLE_LABELS[selectedQuote.role] || selectedQuote.role})
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">
                    Địa chỉ nhận hàng / Tỉnh thành:
                  </span>
                  <div className="font-medium text-[#102035]">
                    {selectedQuote.delivery_address
                      ? `${selectedQuote.delivery_address}, `
                      : ""}
                    {selectedQuote.province}
                  </div>
                </div>
                {selectedQuote.notes && (
                  <div className="md:col-span-2">
                    <span className="text-xs text-slate-500">
                      Ghi chú từ khách hàng:
                    </span>
                    <div className="mt-0.5 text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                      {selectedQuote.notes}
                    </div>
                  </div>
                )}
              </div>

              {/* Quote Items Table */}
              <div>
                <h3 className="text-sm font-bold text-[#061B33] mb-2.5">
                  Danh mục quy cách đặt báo giá (
                  {selectedQuote.quote_items?.length || 0} mục)
                </h3>
                <div className="border border-slate-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase border-b border-slate-200">
                      <tr>
                        <th className="px-3.5 py-2.5 font-semibold">Sản phẩm</th>
                        <th className="px-3.5 py-2.5 font-semibold">Mã QC</th>
                        <th className="px-3.5 py-2.5 font-semibold">Đường kính / PN</th>
                        <th className="px-3.5 py-2.5 font-semibold">Số lượng</th>
                        <th className="px-3.5 py-2.5 font-semibold">Đơn giá tham khảo</th>
                        <th className="px-3.5 py-2.5 font-semibold">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(selectedQuote.quote_items || []).map((item) => (
                        <tr key={item.id}>
                          <td className="px-3.5 py-2.5 font-medium text-[#102035]">
                            {item.product_name}
                          </td>
                          <td className="px-3.5 py-2.5 font-mono text-[#082B4A]">
                            {item.specification_code}
                          </td>
                          <td className="px-3.5 py-2.5 text-slate-600">
                            {item.nominal_diameter} &bull; {item.pressure_rating} (
                            {item.wall_thickness})
                          </td>
                          <td className="px-3.5 py-2.5 font-semibold text-[#102035]">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="px-3.5 py-2.5 text-slate-700">
                            {formatVnd(item.unit_price_guide)}
                          </td>
                          <td className="px-3.5 py-2.5 text-slate-500">
                            {item.note || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Admin Update Form */}
              <form
                onSubmit={handleSaveQuote}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#102035] mb-1">
                      Trạng thái xử lý
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) =>
                        setEditStatus(e.target.value as QuoteStatus)
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-[#007A4D]"
                    >
                      {Object.entries(QUOTE_STATUS_META).map(([key, meta]) => (
                        <option key={key} value={key}>
                          {meta.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#102035] mb-1">
                      Mức chiết khấu áp dụng (%)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={0.5}
                      value={editDiscount}
                      onChange={(e) => setEditDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-[#007A4D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102035] mb-1">
                    Ghi chú nội bộ / Phản hồi Sales
                  </label>
                  <textarea
                    rows={3}
                    value={editAdminNotes}
                    onChange={(e) => setEditAdminNotes(e.target.value)}
                    placeholder="Ghi chú tiến độ gọi khách, giá đã báo, lịch giao hàng dự kiến..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-[#007A4D]"
                  />
                </div>

                <div className="flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedQuote(null)}
                    className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-sm font-medium text-slate-700 cursor-pointer"
                  >
                    Đóng
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#007A4D] hover:bg-[#00633e] disabled:opacity-60 text-white text-sm font-semibold cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? "Đang lưu..." : "Lưu cập nhật"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
