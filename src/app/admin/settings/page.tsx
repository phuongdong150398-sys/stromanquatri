"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Settings,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SchemaSetupBanner } from "@/components/admin/SchemaSetupBanner";

interface SiteSettingsForm {
  brandName: string;
  distributorName: string;
  tagline: string;
  slogan: string;
  description: string;
  hotline: string;
  zalo: string;
  email: string;
  mainWarehouse: string;
  northFactory: string;
  southFactory: string;
  zaloUrl: string;
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettingsForm>({
    brandName: "",
    distributorName: "",
    tagline: "",
    slogan: "",
    description: "",
    hotline: "",
    zalo: "",
    email: "",
    mainWarehouse: "",
    northFactory: "",
    southFactory: "",
    zaloUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [schemaMissing, setSchemaMissing] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSchemaMissing(Boolean(data.schemaMissing));
      if (data.settings) {
        setForm(data.settings);
      }
    } catch {
      setFeedback({ type: "error", text: "Không thể tải cấu hình website." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({
          type: "error",
          text: data.error || "Lưu cấu hình thất bại. Vui lòng kiểm tra lại định dạng Email và Zalo URL.",
        });
        return;
      }
      setFeedback({
        type: "success",
        text: "Đã lưu cấu hình website thành công lên Supabase.",
      });
    } catch {
      setFeedback({ type: "error", text: "Lỗi kết nối khi lưu cấu hình." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#061B33]">
            Cấu hình Thông tin Website
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý Hotline, Zalo, Email tiếp nhận đơn và địa chỉ Tổng kho / Nhà máy.
          </p>
        </div>

        <button
          type="button"
          onClick={loadSettings}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-sm font-medium text-[#102035] cursor-pointer self-start"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Tải lại
        </button>
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

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6"
      >
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
          <Settings className="w-4 h-4 text-[#007A4D]" />
          <h2 className="text-base font-bold text-[#061B33]">
            Nhận diện thương hiệu &amp; Liên hệ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-xs font-semibold mb-1">
              Tên thương hiệu *
            </label>
            <input
              required
              value={form.brandName}
              onChange={(e) => setForm({ ...form, brandName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Tên Nhà phân phối chính thức *
            </label>
            <input
              required
              value={form.distributorName}
              onChange={(e) =>
                setForm({ ...form, distributorName: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Tagline *</label>
            <input
              required
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Slogan *</label>
            <input
              required
              value={form.slogan}
              onChange={(e) => setForm({ ...form, slogan: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold mb-1">
              Mô tả SEO Website *
            </label>
            <textarea
              required
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Hotline *</label>
            <input
              required
              value={form.hotline}
              onChange={(e) => setForm({ ...form, hotline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Số Zalo *</label>
            <input
              required
              value={form.zalo}
              onChange={(e) => setForm({ ...form, zalo: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Email nhận thông báo *
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Đường dẫn Zalo OA / Chat URL *
            </label>
            <input
              required
              type="url"
              value={form.zaloUrl}
              onChange={(e) => setForm({ ...form, zaloUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold mb-1">
              Địa chỉ Tổng Kho Chính *
            </label>
            <input
              required
              value={form.mainWarehouse}
              onChange={(e) =>
                setForm({ ...form, mainWarehouse: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold mb-1">
              Nhà máy Miền Bắc *
            </label>
            <input
              required
              value={form.northFactory}
              onChange={(e) =>
                setForm({ ...form, northFactory: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold mb-1">
              Nhà máy Miền Nam *
            </label>
            <input
              required
              value={form.southFactory}
              onChange={(e) =>
                setForm({ ...form, southFactory: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-200">
          <button
            type="submit"
            disabled={saving || loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#007A4D] hover:bg-[#00633e] disabled:opacity-60 text-white text-sm font-semibold cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {saving ? "Đang lưu cấu hình..." : "Lưu cấu hình"}
          </button>
        </div>
      </form>
    </div>
  );
}
