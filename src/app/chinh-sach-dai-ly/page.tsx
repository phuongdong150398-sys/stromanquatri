"use client";

import React, { useState } from "react";
import {
  Percent,
  Truck,
  Award,
  CheckCircle2,
  FileCheck,
  Send,
  ShieldCheck,
  Store,
} from "lucide-react";
import { dealerRegisterSchema } from "@/lib/validations";
import { siteConfig } from "@/config/site";

export default function DealerPolicyPage() {
  const [form, setForm] = useState({
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    province: "Hà Nội",
    district: "",
    currentBusiness: "Cửa hàng điện nước / VLXD",
    estimatedMonthlyVolume: "100 - 300 triệu / tháng",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = dealerRegisterSchema.safeParse(form);
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
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-stroman-600 uppercase tracking-wider block mb-2">
            Hợp Tác Kinh Doanh 2026
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Chính Sách Hợp Tác Phân Phối Ống Nhựa Stroman
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Trở thành đối tác chiến lược của Tập đoàn Tân Á Đại Thành — Nhận gói hỗ trợ toàn diện từ mức chiết khấu trực tiếp, hỗ trợ biển hiệu showroom đến đào tạo bán hàng.
          </p>
        </div>

        {/* 4 CORE BENEFITS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Percent className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Chiết Khấu Cao Nhất Ngành
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chính sách chiết khấu lũy tiến trực tiếp từ nhà máy. Thưởng thêm doanh số theo quý và năm lên đến 5-8%.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Tài Trợ Biển Hiệu Showroom
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tài trợ 100% kinh phí làm biển quảng cáo chuẩn nhận diện Stroman Đức, kệ trưng bày mẫu ống và catalogue bán hàng.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Hỗ Trợ Vận Chuyển 24h
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Đội xe chuyên dụng giao hàng tận kho đại lý hoặc chân công trình khách hàng mà không tính thêm cước phí.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Bảo Vệ Thị Trường Độc Quyền
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quy hoạch vùng bán hàng minh bạch, bảo vệ đại lý cấp 1 trong khu vực chỉ định, tránh tình trạng phá giá.
            </p>
          </div>
        </div>

        {/* REGISTRATION FORM SECTION */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Hồ Sơ Đăng Ký Đã Được Tiếp Nhận!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
                Chuyên viên phát triển thị trường khu vực của Stroman sẽ liên hệ lại với Quý đối tác qua số điện thoại{" "}
                <strong className="text-slate-900">{form.phone}</strong> trong vòng 24 giờ làm việc để tư vấn mức chiết khấu và hợp đồng nguyên tắc.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-stroman-600 text-white font-bold text-xs hover:bg-stroman-700 transition-colors"
              >
                Gửi lại thông tin khác
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-slate-900">
                  Đăng Ký Nhận Bảng Báo Giá Chiết Khấu Đại Lý
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Điền thông tin doanh nghiệp / cửa hàng để nhận chính sách hỗ trợ chi tiết nhất.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Tên Doanh Nghiệp / Cửa Hàng <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Cửa hàng VLXD Tuấn Phát"
                      value={form.businessName}
                      onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600"
                    />
                    {errors.businessName && (
                      <p className="text-rose-500 text-[11px] mt-1">{errors.businessName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Người Đại Diện Liên Hệ <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={form.contactPerson}
                      onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600"
                    />
                    {errors.contactPerson && (
                      <p className="text-rose-500 text-[11px] mt-1">{errors.contactPerson}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Số Điện Thoại / Zalo <span className="text-rose-500">*</span>
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

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Email Nhận Chính Sách <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="daily@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600"
                    />
                    {errors.email && (
                      <p className="text-rose-500 text-[11px] mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tỉnh / Thành Phố</label>
                    <input
                      type="text"
                      placeholder="VD: Hà Nội, Hải Phòng, Bắc Ninh..."
                      value={form.province}
                      onChange={(e) => setForm({ ...form, province: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Quận / Huyện <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Quận Cầu Giấy"
                      value={form.district}
                      onChange={(e) => setForm({ ...form, district: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600"
                    />
                    {errors.district && (
                      <p className="text-rose-500 text-[11px] mt-1">{errors.district}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Ghi Chú Hoặc Mong Muốn Hợp Tác
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ví dụ: Đang phân phối thiết bị vệ sinh, muốn nhập thêm ống PPR & HDPE..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-stroman-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-stroman-600 hover:bg-stroman-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Đang gửi hồ sơ...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Gửi Hồ Sơ Đăng Ký Hợp Tác Đại Lý</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
