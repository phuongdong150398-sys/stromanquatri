"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, Building2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { contactFormSchema } from "@/lib/validations";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "Tư vấn báo giá dự án",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactFormSchema.safeParse(form);
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

    setIsSent(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-stroman-600 uppercase tracking-wider block mb-2">
            Hỗ Trợ 24/7
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Liên Hệ Với Hệ Thống Phân Phối Stroman
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Chúng tôi luôn sẵn sàng hỗ trợ bóc tách bản vẽ kỹ thuật, gửi mẫu vật tư thực tế và tư vấn giải pháp đường ống tối ưu cho công trình của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: CONTACT INFO */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 text-xs text-slate-600">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-stroman-600" />
                <span>Trụ Sở & Hệ Thống Nhà Máy</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-xs">Văn phòng điều hành:</strong>
                    <span>{siteConfig.addresses.northHeadquarter}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-xs">Nhà máy Miền Bắc:</strong>
                    <span>{siteConfig.addresses.northFactory}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-xs">Nhà máy Miền Nam:</strong>
                    <span>{siteConfig.addresses.southFactory}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Tổng đài tư vấn miễn phí:</span>
                    <a
                      href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
                      className="font-bold text-slate-900 text-sm hover:text-stroman-600"
                    >
                      {siteConfig.hotline}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Email phòng dự án:</span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-semibold text-slate-800 hover:text-stroman-600"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: INQUIRY FORM */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            {isSent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Cảm Ơn Bạn Đã Liên Hệ!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
                  Thông điệp của bạn đã được chuyển đến bộ phận phụ trách kỹ thuật & bán hàng. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2.5 rounded-xl bg-stroman-600 text-white font-bold text-xs hover:bg-stroman-700 transition-colors"
                >
                  Gửi tin nhắn khác
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Gửi Yêu Cầu Tư Vấn & Báo Giá Trực Tiếp
                </h2>
                <p className="text-xs text-slate-500 mb-6">
                  Điền vào biểu mẫu dưới đây, chuyên viên tư vấn sẽ liên hệ lại với bạn.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Họ và tên <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600"
                      />
                      {errors.fullName && (
                        <p className="text-rose-500 text-[11px] mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Số điện thoại <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="0912 345 678"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600"
                      />
                      {errors.phone && (
                        <p className="text-rose-500 text-[11px] mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Địa chỉ Email</label>
                      <input
                        type="email"
                        placeholder="email@congty.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tiêu đề yêu cầu</label>
                      <input
                        type="text"
                        placeholder="Tư vấn báo giá dự án / Catalog..."
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Nội dung tin nhắn <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Chi tiết câu hỏi hoặc danh sách quy cách bạn cần tư vấn..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600"
                    ></textarea>
                    {errors.message && (
                      <p className="text-rose-500 text-[11px] mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-stroman-600 hover:bg-stroman-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi Tin Nhắn Cho Phòng Dự Án</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
