"use client";

import React, { useState } from "react";
import { Send, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { quoteRequestSchema } from "@/lib/validations";
import { QuoteRequestFormValues } from "@/types/quote";
import { useQuote } from "@/context/QuoteContext";

interface QuoteFormProps {
  onSuccess: (quoteCode: string, customerData: QuoteRequestFormValues) => void;
}

export function QuoteForm({ onSuccess }: QuoteFormProps) {
  const { items, totalCount } = useQuote();

  const [form, setForm] = useState<QuoteRequestFormValues>({
    fullName: "",
    phone: "",
    email: "",
    province: "Hà Nội",
    companyOrProject: "",
    role: "contractor",
    deliveryAddress: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const provinces = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Hưng Yên",
    "Long An",
    "Bắc Ninh",
    "Bình Dương",
    "Đồng Nai",
    "Quảng Ninh",
    "Thanh Hóa",
    "Nghệ An",
    "Quảng Trị",
    "Quảng Bình",
    "Khác",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    if (items.length === 0) {
      setSubmitError("Vui lòng thêm ít nhất một sản phẩm vào bảng dự toán trước khi gửi yêu cầu.");
      return;
    }

    // Validate using Zod schema
    const result = quoteRequestSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: result.data, items }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setSubmitError(
          payload?.error || "Không thể gửi yêu cầu lúc này. Vui lòng gọi Hotline 0915 333 808."
        );
        return;
      }

      onSuccess(payload.quoteCode, result.data);
    } catch {
      setSubmitError("Lỗi kết nối máy chủ. Vui lòng thử lại hoặc liên hệ Hotline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm">
      <div className="pb-4 mb-5 sm:mb-6 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-stroman-600" />
          <span>Thông Tin Tiếp Nhận Báo Giá Chiết Khấu</span>
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Phòng dự án Stroman cam kết phản hồi báo giá kèm mức chiết khấu tốt nhất trong vòng 15-30 phút.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Tên & Số điện thoại */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Họ và tên người nhận báo giá <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border ${
                errors.fullName ? "border-rose-400 bg-rose-50/50" : "border-slate-300"
              } focus:outline-none focus:ring-2 focus:ring-stroman-600 text-base sm:text-xs`}
            />
            {errors.fullName && (
              <p className="mt-1 text-rose-500 flex items-center gap-1 text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Số điện thoại / Zalo <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="0912 345 678"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border ${
                errors.phone ? "border-rose-400 bg-rose-50/50" : "border-slate-300"
              } focus:outline-none focus:ring-2 focus:ring-stroman-600 text-base sm:text-xs`}
            />
            {errors.phone && (
              <p className="mt-1 text-rose-500 flex items-center gap-1 text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Email & Tỉnh Thành */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Email nhận file PDF</label>
            <input
              type="email"
              placeholder="duan@congty.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600 text-base sm:text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Địa bàn công trình / Khu vực <span className="text-rose-500">*</span>
            </label>
            <select
              value={form.province}
              onChange={(e) => setForm({ ...form, province: e.target.value })}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600 text-base sm:text-xs bg-white text-slate-800"
            >
              {provinces.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Công ty / Dự án & Đối tượng */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Tên Công Ty / Dự Án</label>
            <input
              type="text"
              placeholder="VD: Nhà thầu Delta / Dự án KĐT Vinhomes..."
              value={form.companyOrProject}
              onChange={(e) => setForm({ ...form, companyOrProject: e.target.value })}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600 text-base sm:text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Loại hình đối tác</label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as QuoteRequestFormValues["role"] })
              }
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600 text-base sm:text-xs bg-white text-slate-800"
            >
              <option value="contractor">Nhà thầu thi công xây dựng</option>
              <option value="dealer">Cửa hàng / Đại lý phân phối</option>
              <option value="consultant">Đơn vị tư vấn thiết kế / Giám sát</option>
              <option value="individual">Chủ đầu tư / Hộ gia đình</option>
            </select>
          </div>
        </div>

        {/* Ghi chú */}
        <div>
          <label className="block font-bold text-slate-700 mb-1.5">
            Ghi chú thêm về yêu cầu vận chuyển, thời gian giao hàng
          </label>
          <textarea
            rows={3}
            placeholder="Ví dụ: Giao hàng tại công trình Quận 9, cần CO/CQ và hóa đơn VAT..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600 text-base sm:text-xs"
          ></textarea>
        </div>

        {submitError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className={`w-full min-h-[48px] py-3.5 px-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all ${
            items.length === 0
              ? "bg-slate-300 cursor-not-allowed"
              : isSubmitting
              ? "bg-stroman-700 cursor-wait"
              : "bg-stroman-600 hover:bg-stroman-700 hover:shadow-lg"
          }`}
        >
          {isSubmitting ? (
            <span>Đang gửi thông tin...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Gửi Yêu Cầu Báo Giá ({totalCount} Khối Lượng Vật Tư)</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-slate-400">
          Thông tin của quý khách được bảo mật tuyệt đối theo chính sách bảo mật của Stroman Việt Nam.
        </p>
      </form>
    </div>
  );
}
