"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Newspaper,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SchemaSetupBanner } from "@/components/admin/SchemaSetupBanner";

type NewsCategory = "Dự Án" | "Kỹ Thuật" | "Sự Kiện" | "Chính Sách";
type DealerType = "headquarter" | "factory" | "warehouse" | "distributor";
type RegionType = "Bắc" | "Trung" | "Nam";

interface DbNewsRow {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: NewsCategory;
  published_date: string;
  image: string;
  content: string[];
  is_published: boolean;
}

interface DbDealerRow {
  id: string;
  name: string;
  type: DealerType;
  type_name: string;
  region: RegionType;
  province: string;
  address: string;
  phone: string;
  email?: string | null;
  is_featured: boolean;
  is_active: boolean;
}

interface NewsDraft {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: NewsCategory;
  date: string;
  image: string;
  contentText: string;
  isPublished: boolean;
}

interface DealerDraft {
  id: string;
  name: string;
  type: DealerType;
  typeName: string;
  region: RegionType;
  province: string;
  address: string;
  phone: string;
  email: string;
  isFeatured: boolean;
  isActive: boolean;
}

const DEALER_TYPE_LABELS: Record<DealerType, string> = {
  headquarter: "Tổng Kho / Văn phòng Chính",
  factory: "Nhà máy Sản xuất",
  warehouse: "Kho Trung chuyển Vùng",
  distributor: "Nhà Phân Phối / Đại lý Ủy quyền",
};

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<"news" | "dealer">("news");
  const [newsList, setNewsList] = useState<DbNewsRow[]>([]);
  const [dealersList, setDealersList] = useState<DbDealerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [schemaMissing, setSchemaMissing] = useState(false);
  const [newsDraft, setNewsDraft] = useState<NewsDraft | null>(null);
  const [dealerDraft, setDealerDraft] = useState<DealerDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      setSchemaMissing(Boolean(data.schemaMissing));
      setNewsList(Array.isArray(data.news) ? data.news : []);
      setDealersList(Array.isArray(data.dealers) ? data.dealers : []);
    } catch {
      setFeedback({ type: "error", text: "Không thể tải dữ liệu tin tức & kho hàng." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const openNewNews = () => {
    const id = `news-${Date.now()}`;
    setNewsDraft({
      id,
      slug: id,
      title: "",
      summary: "",
      category: "Dự Án",
      date: new Date().toISOString().slice(0, 10),
      image: "/images/hero-banner.png",
      contentText: "",
      isPublished: true,
    });
  };

  const openEditNews = (n: DbNewsRow) => {
    setNewsDraft({
      id: n.id,
      slug: n.slug,
      title: n.title,
      summary: n.summary,
      category: n.category,
      date: n.published_date,
      image: n.image,
      contentText: (n.content || []).join("\n\n"),
      isPublished: Boolean(n.is_published),
    });
  };

  const openNewDealer = () => {
    setDealerDraft({
      id: `dealer-${Date.now()}`,
      name: "",
      type: "distributor",
      typeName: DEALER_TYPE_LABELS.distributor,
      region: "Bắc",
      province: "",
      address: "",
      phone: "",
      email: "",
      isFeatured: false,
      isActive: true,
    });
  };

  const openEditDealer = (d: DbDealerRow) => {
    setDealerDraft({
      id: d.id,
      name: d.name,
      type: d.type,
      typeName: d.type_name,
      region: d.region,
      province: d.province,
      address: d.address,
      phone: d.phone,
      email: d.email || "",
      isFeatured: Boolean(d.is_featured),
      isActive: Boolean(d.is_active),
    });
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsDraft) return;
    setSaving(true);
    setFeedback(null);

    const paragraphs = newsDraft.contentText
      .split(/\r?\n\s*\r?\n|\r?\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity: "news",
          data: {
            id: newsDraft.id.trim(),
            slug: newsDraft.slug.trim(),
            title: newsDraft.title.trim(),
            summary: newsDraft.summary.trim(),
            category: newsDraft.category,
            date: newsDraft.date.trim(),
            image: newsDraft.image.trim(),
            content: paragraphs.length > 0 ? paragraphs : [newsDraft.summary.trim()],
            isPublished: newsDraft.isPublished,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({ type: "error", text: data.error || "Lưu bài viết thất bại." });
        return;
      }

      const saved: DbNewsRow = data.item;
      setNewsList((prev) => {
        const exists = prev.some((x) => x.id === saved.id);
        return exists
          ? prev.map((x) => (x.id === saved.id ? saved : x))
          : [saved, ...prev];
      });
      setNewsDraft(null);
      setFeedback({ type: "success", text: `Đã lưu bài viết "${saved.title}".` });
    } catch {
      setFeedback({ type: "error", text: "Lỗi kết nối khi lưu bài viết." });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDealer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealerDraft) return;
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity: "dealer",
          data: {
            id: dealerDraft.id.trim(),
            name: dealerDraft.name.trim(),
            type: dealerDraft.type,
            typeName: dealerDraft.typeName.trim(),
            region: dealerDraft.region,
            province: dealerDraft.province.trim(),
            address: dealerDraft.address.trim(),
            phone: dealerDraft.phone.trim(),
            email: dealerDraft.email.trim(),
            isFeatured: dealerDraft.isFeatured,
            isActive: dealerDraft.isActive,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({
          type: "error",
          text: data.error || "Lưu điểm phân phối thất bại.",
        });
        return;
      }

      const saved: DbDealerRow = data.item;
      setDealersList((prev) => {
        const exists = prev.some((x) => x.id === saved.id);
        return exists
          ? prev.map((x) => (x.id === saved.id ? saved : x))
          : [saved, ...prev];
      });
      setDealerDraft(null);
      setFeedback({
        type: "success",
        text: `Đã lưu điểm phân phối "${saved.name}".`,
      });
    } catch {
      setFeedback({ type: "error", text: "Lỗi kết nối khi lưu điểm phân phối." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (
    entity: "news" | "dealer",
    id: string,
    label: string
  ) => {
    if (!window.confirm(`Xác nhận xóa "${label}"?`)) return;
    try {
      const res = await fetch(
        `/api/admin/content?entity=${entity}&id=${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        setFeedback({ type: "error", text: "Xóa dữ liệu thất bại." });
        return;
      }
      if (entity === "news") {
        setNewsList((prev) => prev.filter((item) => item.id !== id));
      } else {
        setDealersList((prev) => prev.filter((item) => item.id !== id));
      }
      setFeedback({ type: "success", text: `Đã xóa "${label}".` });
    } catch {
      setFeedback({ type: "error", text: "Lỗi kết nối khi xóa." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#061B33]">
            Quản lý Tin tức &amp; Hệ thống Kho hàng
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Đăng bài viết dự án, hướng dẫn kỹ thuật và cập nhật mạng lưới kho/đại lý.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={loadContent}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-sm font-medium text-[#102035] cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Tải lại
          </button>

          <button
            type="button"
            onClick={activeTab === "news" ? openNewNews : openNewDealer}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#007A4D] hover:bg-[#00633e] text-white text-sm font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {activeTab === "news" ? "Viết bài mới" : "Thêm điểm kho / ĐL"}
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

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("news")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer ${
            activeTab === "news"
              ? "bg-[#061B33] text-white"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Newspaper className="w-4 h-4" />
          Tin tức Dự án ({newsList.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("dealer")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer ${
            activeTab === "dealer"
              ? "bg-[#061B33] text-white"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          <MapPin className="w-4 h-4" />
          Hệ thống Kho &amp; Đại lý ({dealersList.length})
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500">
          Đang tải nội dung...
        </div>
      ) : activeTab === "news" ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {newsList.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Chưa có bài viết nào trong Supabase.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Tiêu đề</th>
                    <th className="px-4 py-3 font-semibold">Chuyên mục</th>
                    <th className="px-4 py-3 font-semibold">Ngày đăng</th>
                    <th className="px-4 py-3 font-semibold">Trạng thái</th>
                    <th className="px-4 py-3 font-semibold text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {newsList.map((n) => (
                    <tr key={n.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-[#061B33]">{n.title}</div>
                        <div className="text-xs text-slate-500 truncate max-w-md">
                          {n.summary}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs font-medium text-slate-700">
                        {n.category}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500">
                        {n.published_date}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            n.is_published
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {n.is_published ? "Đã xuất bản" : "Bản nháp"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditNews(n)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#007A4D] hover:text-white text-slate-700 text-xs font-semibold cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Sửa
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete("news", n.id, n.title)}
                            aria-label="Xóa bài viết"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {dealersList.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Chưa có điểm phân phối / kho hàng nào trong Supabase.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Tên đơn vị / Kho</th>
                    <th className="px-4 py-3 font-semibold">Miền / Tỉnh</th>
                    <th className="px-4 py-3 font-semibold">Địa chỉ &amp; SĐT</th>
                    <th className="px-4 py-3 font-semibold">Trạng thái</th>
                    <th className="px-4 py-3 font-semibold text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dealersList.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-[#061B33]">{d.name}</div>
                        <div className="text-xs text-slate-500">{d.type_name}</div>
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        <div className="font-semibold text-[#102035]">
                          Miền {d.region}
                        </div>
                        <div className="text-slate-500">{d.province}</div>
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        <div className="text-slate-700">{d.address}</div>
                        <div className="text-[#007A4D] font-semibold mt-0.5">
                          {d.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            d.is_active
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {d.is_active ? "Đang hoạt động" : "Tạm ngưng"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditDealer(d)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#007A4D] hover:text-white text-slate-700 text-xs font-semibold cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Sửa
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete("dealer", d.id, d.name)}
                            aria-label="Xóa điểm phân phối"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* News Modal */}
      {newsDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <form
            onSubmit={handleSaveNews}
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="px-6 py-4 bg-[#061B33] text-white flex items-center justify-between">
              <h2 className="text-lg font-bold">Biên tập Bài viết Tin tức</h2>
              <button
                type="button"
                onClick={() => setNewsDraft(null)}
                className="p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1">Tiêu đề *</label>
                  <input
                    required
                    value={newsDraft.title}
                    onChange={(e) =>
                      setNewsDraft({ ...newsDraft, title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Slug URL *</label>
                  <input
                    required
                    value={newsDraft.slug}
                    onChange={(e) =>
                      setNewsDraft({ ...newsDraft, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Chuyên mục</label>
                  <select
                    value={newsDraft.category}
                    onChange={(e) =>
                      setNewsDraft({
                        ...newsDraft,
                        category: e.target.value as NewsCategory,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Dự Án">Dự Án</option>
                    <option value="Kỹ Thuật">Kỹ Thuật</option>
                    <option value="Sự Kiện">Sự Kiện</option>
                    <option value="Chính Sách">Chính Sách</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Ngày đăng *</label>
                  <input
                    required
                    value={newsDraft.date}
                    onChange={(e) =>
                      setNewsDraft({ ...newsDraft, date: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Ảnh đại diện *</label>
                  <input
                    required
                    value={newsDraft.image}
                    onChange={(e) =>
                      setNewsDraft({ ...newsDraft, image: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1">Tóm tắt ngắn *</label>
                  <textarea
                    required
                    rows={2}
                    value={newsDraft.summary}
                    onChange={(e) =>
                      setNewsDraft({ ...newsDraft, summary: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1">
                    Nội dung chi tiết (mỗi đoạn 1 dòng) *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={newsDraft.contentText}
                    onChange={(e) =>
                      setNewsDraft({ ...newsDraft, contentText: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsDraft.isPublished}
                    onChange={(e) =>
                      setNewsDraft({ ...newsDraft, isPublished: e.target.checked })
                    }
                    className="rounded border-slate-300 text-[#007A4D]"
                  />
                  Xuất bản công khai
                </label>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setNewsDraft(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-sm cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#007A4D] text-white text-sm font-semibold cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {saving ? "Đang lưu..." : "Lưu bài viết"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Dealer Modal */}
      {dealerDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <form
            onSubmit={handleSaveDealer}
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="px-6 py-4 bg-[#061B33] text-white flex items-center justify-between">
              <h2 className="text-lg font-bold">Thông tin Kho / Điểm Phân Phối</h2>
              <button
                type="button"
                onClick={() => setDealerDraft(null)}
                className="p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1">Tên đơn vị *</label>
                  <input
                    required
                    value={dealerDraft.name}
                    onChange={(e) =>
                      setDealerDraft({ ...dealerDraft, name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Loại hình</label>
                  <select
                    value={dealerDraft.type}
                    onChange={(e) => {
                      const t = e.target.value as DealerType;
                      setDealerDraft({
                        ...dealerDraft,
                        type: t,
                        typeName: DEALER_TYPE_LABELS[t],
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {Object.entries(DEALER_TYPE_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Khu vực</label>
                  <select
                    value={dealerDraft.region}
                    onChange={(e) =>
                      setDealerDraft({
                        ...dealerDraft,
                        region: e.target.value as RegionType,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Bắc">Miền Bắc</option>
                    <option value="Trung">Miền Trung</option>
                    <option value="Nam">Miền Nam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Tỉnh / Thành phố *</label>
                  <input
                    required
                    value={dealerDraft.province}
                    onChange={(e) =>
                      setDealerDraft({ ...dealerDraft, province: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Số điện thoại *</label>
                  <input
                    required
                    value={dealerDraft.phone}
                    onChange={(e) =>
                      setDealerDraft({ ...dealerDraft, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1">Địa chỉ đầy đủ *</label>
                  <input
                    required
                    value={dealerDraft.address}
                    onChange={(e) =>
                      setDealerDraft({ ...dealerDraft, address: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1">Email (nếu có)</label>
                  <input
                    value={dealerDraft.email}
                    onChange={(e) =>
                      setDealerDraft({ ...dealerDraft, email: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dealerDraft.isActive}
                    onChange={(e) =>
                      setDealerDraft({ ...dealerDraft, isActive: e.target.checked })
                    }
                    className="rounded border-slate-300 text-[#007A4D]"
                  />
                  Đang hoạt động
                </label>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDealerDraft(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-sm cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#007A4D] text-white text-sm font-semibold cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {saving ? "Đang lưu..." : "Lưu điểm kho"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
