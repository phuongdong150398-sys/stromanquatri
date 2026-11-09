import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Award,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* CỘT 1: THƯƠNG HIỆU */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stroman-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white uppercase tracking-tight">
                  STROMAN
                </span>
                <span className="text-[11px] font-medium text-emerald-400 tracking-wider uppercase">
                  Tập Đoàn Tân Á Đại Thành
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Công ty Cổ phần Nhựa Stroman Việt Nam — Tự hào là nhà sản xuất ống nhựa hàng đầu đạt chuẩn công nghệ CHLB Đức với tổng mức đầu tư 70 triệu USD.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Tiêu chuẩn Đức: DIN 8077/8078, ISO 1452, ISO 4427</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Award className="w-4 h-4 shrink-0" />
                <span>Bảo hành chính hãng 10 năm công trình</span>
              </div>
            </div>
          </div>

          {/* CỘT 2: SẢN PHẨM CHỦ LỰC */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-2.5">
              Dòng Sản Phẩm
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/san-pham?category=upvc" className="hover:text-emerald-400 transition-colors">
                  • Ống nhựa uPVC Hệ Met (TCVN 8491)
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=upvc" className="hover:text-emerald-400 transition-colors">
                  • Ống nhựa uPVC Hệ Inch (BS 3505)
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=ppr" className="hover:text-emerald-400 transition-colors">
                  • Ống chịu nhiệt PP-R (DIN 8077/8078)
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=ppr-antibacterial" className="hover:text-emerald-400 transition-colors">
                  • Ống PP-R Kháng Khuẩn Nano Bạc 3 Lớp
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=hdpe" className="hover:text-emerald-400 transition-colors">
                  • Ống nhựa HDPE PE100 (ISO 4427)
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=fittings" className="hover:text-emerald-400 transition-colors">
                  • Phụ kiện uPVC / PP-R / HDPE đồng bộ
                </Link>
              </li>
            </ul>
          </div>

          {/* CỘT 3: HỖ TRỢ & BÁO GIÁ */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-2.5">
              Hỗ Trợ Đại Lý & Dự Án
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/du-toan-bao-gia" className="text-amber-400 font-semibold hover:underline flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Công cụ Tạo Dự Toán & Yêu Cầu Báo Giá
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-dai-ly" className="hover:text-emerald-400 transition-colors">
                  • Chính sách chiết khấu nhà phân phối 2026
                </Link>
              </li>
              <li>
                <Link href="/he-thong-phan-phoi" className="hover:text-emerald-400 transition-colors">
                  • Danh sách đại lý & điểm kho toàn quốc
                </Link>
              </li>
              <li>
                <Link href="/ung-dung" className="hover:text-emerald-400 transition-colors">
                  • Giải pháp kỹ thuật cho từng loại công trình
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="hover:text-emerald-400 transition-colors">
                  • Tin tức sự kiện & bàn giao dự án
                </Link>
              </li>
            </ul>
          </div>

          {/* CỘT 4: THÔNG TIN KHO VẬN & LIÊN HỆ */}
          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-2.5">
              Hệ Thống Nhà Máy & Tổng Kho
            </h4>
            <div className="space-y-2.5">
              <div>
                <strong className="text-slate-200 block">Miền Bắc (Nhà máy):</strong>
                <span>{siteConfig.addresses.northFactory}</span>
              </div>
              <div>
                <strong className="text-slate-200 block">Miền Nam (Nhà máy):</strong>
                <span>{siteConfig.addresses.southFactory}</span>
              </div>
              <div>
                <strong className="text-slate-200 block">Văn phòng đại diện:</strong>
                <span>{siteConfig.addresses.northHeadquarter}</span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200 font-bold text-sm">
                    Hotline: {siteConfig.hotline}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{siteConfig.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} {siteConfig.distributorName}. Bản quyền thuộc Công ty Cổ phần Nhựa Stroman Việt Nam.
          </p>
          <div className="flex gap-4">
            <Link href="/lien-he" className="hover:text-slate-300">
              Liên hệ
            </Link>
            <Link href="/chinh-sach-dai-ly" className="hover:text-slate-300">
              Chính sách hợp tác
            </Link>
            <Link href="/he-thong-phan-phoi" className="hover:text-slate-300">
              Hệ thống kho
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
