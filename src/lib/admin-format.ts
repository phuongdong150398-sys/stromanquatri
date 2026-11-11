export type QuoteStatus = "new" | "quoting" | "sent" | "won" | "cancelled";
export type DealerAppStatus = "new" | "reviewing" | "approved" | "rejected";
export type ContactStatus = "unread" | "replied" | "archived";

export const QUOTE_STATUS_META: Record<
  QuoteStatus,
  { label: string; badgeClass: string }
> = {
  new: {
    label: "Mới tiếp nhận",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
  },
  quoting: {
    label: "Đang báo giá",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  sent: {
    label: "Đã gửi báo giá",
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  won: {
    label: "Đã chốt đơn",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  cancelled: {
    label: "Đã hủy",
    badgeClass: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

export const DEALER_STATUS_META: Record<
  DealerAppStatus,
  { label: string; badgeClass: string }
> = {
  new: {
    label: "Hồ sơ mới",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
  },
  reviewing: {
    label: "Đang thẩm định",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  approved: {
    label: "Đã duyệt đại lý",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  rejected: {
    label: "Từ chối",
    badgeClass: "bg-red-50 text-red-700 border-red-200",
  },
};

export const CONTACT_STATUS_META: Record<
  ContactStatus,
  { label: string; badgeClass: string }
> = {
  unread: {
    label: "Chưa đọc",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  replied: {
    label: "Đã phản hồi",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  archived: {
    label: "Lưu trữ",
    badgeClass: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

export function formatDateTimeVN(iso?: string | null): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function formatVnd(amount?: number | null): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return "Liên hệ";
  }
  return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
}
