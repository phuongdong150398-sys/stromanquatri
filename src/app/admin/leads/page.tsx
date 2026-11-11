"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Users,
  MessageSquare,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Save,
} from "lucide-react";
import { SchemaSetupBanner } from "@/components/admin/SchemaSetupBanner";
import {
  CONTACT_STATUS_META,
  DEALER_STATUS_META,
  formatDateTimeVN,
  type ContactStatus,
  type DealerAppStatus,
} from "@/lib/admin-format";

interface DealerApplicationRow {
  id: string;
  business_name: string;
  contact_person: string;
  phone: string;
  email: string;
  province: string;
  district?: string | null;
  current_business: string;
  estimated_monthly_volume: string;
  notes?: string | null;
  status: DealerAppStatus;
  admin_notes?: string | null;
  created_at: string;
}

interface ContactMessageRow {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  admin_notes?: string | null;
  created_at: string;
}

export default function AdminLeadsPage() {
  const [activeTab, setActiveTab] = useState<"dealer" | "contact">("dealer");
  const [dealerApps, setDealerApps] = useState<DealerApplicationRow[]>([]);
  const [contacts, setContacts] = useState<ContactMessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [schemaMissing, setSchemaMissing] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      setSchemaMissing(Boolean(data.schemaMissing));
      setDealerApps(
        Array.isArray(data.dealerApplications) ? data.dealerApplications : []
      );
      setContacts(
        Array.isArray(data.contactMessages) ? data.contactMessages : []
      );
    } catch {
      setFeedback({ type: "error", text: "Không thể tải danh sách hồ sơ & liên hệ." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("tab") === "contact") {
      setActiveTab("contact");
    }
    loadLeads();
  }, [loadLeads]);

  const handleUpdateDealer = async (
    row: DealerApplicationRow,
    patch: { status?: DealerAppStatus; admin_notes?: string }
  ) => {
    setSavingId(row.id);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/leads/dealer/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({ type: "error", text: data.error || "Cập nhật thất bại." });
        return;
      }
      setDealerApps((prev) =>
        prev.map((item) => (item.id === row.id ? data.item : item))
      );
      setFeedback({
        type: "success",
        text: `Đã cập nhật hồ sơ đại lý "${row.business_name}".`,
      });
    } catch {
      setFeedback({ type: "error", text: "Lỗi kết nối khi cập nhật hồ sơ." });
    } finally {
      setSavingId(null);
    }
  };

  const handleUpdateContact = async (
    row: ContactMessageRow,
    patch: { status?: ContactStatus; admin_notes?: string }
  ) => {
    setSavingId(row.id);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/leads/contact/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({ type: "error", text: data.error || "Cập nhật thất bại." });
        return;
      }
      setContacts((prev) =>
        prev.map((item) => (item.id === row.id ? data.item : item))
      );
      setFeedback({
        type: "success",
        text: `Đã cập nhật liên hệ từ "${row.full_name}".`,
      });
    } catch {
      setFeedback({ type: "error", text: "Lỗi kết nối khi cập nhật liên hệ." });
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteLead = async (type: "dealer" | "contact", id: string, label: string) => {
    if (!window.confirm(`Xác nhận xóa "${label}"?`)) return;
    try {
      const res = await fetch(`/api/admin/leads/${type}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setFeedback({ type: "error", text: "Xóa bản ghi thất bại." });
        return;
      }
      if (type === "dealer") {
        setDealerApps((prev) => prev.filter((item) => item.id !== id));
      } else {
        setContacts((prev) => prev.filter((item) => item.id !== id));
      }
      setFeedback({ type: "success", text: `Đã xóa "${label}".` });
    } catch {
      setFeedback({ type: "error", text: "Lỗi kết nối khi xóa bản ghi." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#061B33]">
            Hồ sơ Đại lý &amp; Tin nhắn Liên hệ
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Thẩm định đối tác đăng ký đại lý và phản hồi yêu cầu liên hệ từ khách hàng.
          </p>
        </div>

        <button
          type="button"
          onClick={loadLeads}
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

      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("dealer")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "dealer"
              ? "bg-[#061B33] text-white"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Users className="w-4 h-4" />
          Hồ sơ Đại lý ({dealerApps.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contact")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "contact"
              ? "bg-[#061B33] text-white"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Tin nhắn Liên hệ ({contacts.length})
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500">
          Đang tải dữ liệu...
        </div>
      ) : activeTab === "dealer" ? (
        dealerApps.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
            Chưa có hồ sơ đăng ký làm đại lý nào.
          </div>
        ) : (
          <div className="space-y-4">
            {dealerApps.map((app) => (
              <DealerLeadCard
                key={app.id}
                row={app}
                saving={savingId === app.id}
                onSave={(patch) => handleUpdateDealer(app, patch)}
                onDelete={() =>
                  handleDeleteLead("dealer", app.id, app.business_name)
                }
              />
            ))}
          </div>
        )
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
          Chưa có tin nhắn liên hệ nào.
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((msg) => (
            <ContactLeadCard
              key={msg.id}
              row={msg}
              saving={savingId === msg.id}
              onSave={(patch) => handleUpdateContact(msg, patch)}
              onDelete={() => handleDeleteLead("contact", msg.id, msg.full_name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DealerLeadCard({
  row,
  saving,
  onSave,
  onDelete,
}: {
  row: DealerApplicationRow;
  saving: boolean;
  onSave: (patch: { status?: DealerAppStatus; admin_notes?: string }) => void;
  onDelete: () => void;
}) {
  const [status, setStatus] = useState<DealerAppStatus>(row.status);
  const [notes, setNotes] = useState(row.admin_notes || "");
  const meta = DEALER_STATUS_META[row.status] || DEALER_STATUS_META.new;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-[#061B33]">
              {row.business_name}
            </h3>
            <span
              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${meta.badgeClass}`}
            >
              {meta.label}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Người đại diện: <strong>{row.contact_person}</strong> &bull;{" "}
            {row.phone} &bull; {row.email} &bull;{" "}
            {formatDateTimeVN(row.created_at)}
          </p>
        </div>

        <button
          type="button"
          onClick={onDelete}
          aria-label="Xóa hồ sơ đại lý"
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 self-start cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
        <div>
          <span className="text-slate-500">Khu vực đề xuất:</span>
          <div className="font-semibold text-[#102035] mt-0.5">
            {row.district ? `${row.district}, ` : ""}
            {row.province}
          </div>
        </div>
        <div>
          <span className="text-slate-500">Ngành hàng hiện tại:</span>
          <div className="font-semibold text-[#102035] mt-0.5">
            {row.current_business}
          </div>
        </div>
        <div>
          <span className="text-slate-500">Sản lượng cam kết / tháng:</span>
          <div className="font-semibold text-[#007A4D] mt-0.5">
            {row.estimated_monthly_volume}
          </div>
        </div>
        {row.notes && (
          <div className="md:col-span-3 pt-1 border-t border-slate-200">
            <span className="text-slate-500">Ghi chú từ đối tác: </span>
            <span className="text-slate-700">{row.notes}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as DealerAppStatus)}
          className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm md:w-48 focus:outline-none focus:border-[#007A4D]"
        >
          {Object.entries(DEALER_STATUS_META).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ghi chú thẩm định nội bộ..."
          className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#007A4D]"
        />

        <button
          type="button"
          onClick={() => onSave({ status, admin_notes: notes })}
          disabled={saving}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#007A4D] hover:bg-[#00633e] disabled:opacity-60 text-white text-sm font-semibold cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {saving ? "Đang lưu..." : "Lưu"}
        </button>
      </div>
    </div>
  );
}

function ContactLeadCard({
  row,
  saving,
  onSave,
  onDelete,
}: {
  row: ContactMessageRow;
  saving: boolean;
  onSave: (patch: { status?: ContactStatus; admin_notes?: string }) => void;
  onDelete: () => void;
}) {
  const [status, setStatus] = useState<ContactStatus>(row.status);
  const [notes, setNotes] = useState(row.admin_notes || "");
  const meta = CONTACT_STATUS_META[row.status] || CONTACT_STATUS_META.unread;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-[#061B33]">
              {row.subject}
            </h3>
            <span
              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${meta.badgeClass}`}
            >
              {meta.label}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Người gửi: <strong>{row.full_name}</strong> &bull; {row.phone} &bull;{" "}
            {row.email} &bull; {formatDateTimeVN(row.created_at)}
          </p>
        </div>

        <button
          type="button"
          onClick={onDelete}
          aria-label="Xóa tin nhắn liên hệ"
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 self-start cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-sm text-slate-700 whitespace-pre-line">
        {row.message}
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ContactStatus)}
          className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm md:w-44 focus:outline-none focus:border-[#007A4D]"
        >
          {Object.entries(CONTACT_STATUS_META).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ghi chú nội dung đã phản hồi khách..."
          className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#007A4D]"
        />

        <button
          type="button"
          onClick={() => onSave({ status, admin_notes: notes })}
          disabled={saving}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#007A4D] hover:bg-[#00633e] disabled:opacity-60 text-white text-sm font-semibold cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {saving ? "Đang lưu..." : "Lưu"}
        </button>
      </div>
    </div>
  );
}
