import React from "react";
import Link from "next/link";
import { Award, CheckCircle2, ArrowUpRight } from "lucide-react";

interface StandardItem {
  code: string;
  productLine: string;
  title: string;
  scope: string;
  href: string;
}

const verifiedStandards: StandardItem[] = [
  {
    code: "ISO 4427:2007",
    productLine: "Ống nhựa HDPE PE100",
    title: "Tiêu chuẩn Quốc tế hệ thống ống Polyetylen",
    scope: "Áp dụng cho đường ống dẫn nước sạch, hạ tầng ngầm chịu áp PN6 – PN20 (Đường kính Ø20 – Ø1200mm).",
    href: "/san-pham/ong-nhua-hdpe-stroman-pe100",
  },
  {
    code: "TCVN 7305:2008",
    productLine: "Ống nhựa HDPE PE100",
    title: "Tiêu chuẩn Quốc gia Việt Nam ống PE",
    scope: "Kiểm định độ bền kéo đứt, khả năng chống nứt gãy lan truyền nhanh (RCP) và hàm lượng carbon black kháng UV.",
    href: "/san-pham/ong-nhua-hdpe-stroman-pe100",
  },
  {
    code: "ISO 1452:2009",
    productLine: "Ống & Phụ kiện uPVC",
    title: "Tiêu chuẩn Quốc tế ống PVC không hóa dẻo",
    scope: "Quy định khắt khe về cơ tính, độ đồng đều thành ống và an toàn không chứa chì cho dẫn nước cấp.",
    href: "/san-pham/ong-nhua-upvc-he-met",
  },
  {
    code: "TCVN 8491:2011",
    productLine: "Ống & Phụ kiện uPVC",
    title: "Tiêu chuẩn Quốc gia Việt Nam hệ mét",
    scope: "Đánh giá khả năng chịu áp lực từ Class 0 đến Class 3 (PN6 – PN25) và phụ kiện đúc đồng bộ.",
    href: "/san-pham/ong-nhua-upvc-he-met",
  },
  {
    code: "DIN 8077 / 8078",
    productLine: "Ống PP-R Chịu Nhiệt",
    title: "Tiêu chuẩn Công nghiệp CHLB Đức",
    scope: "Kiểm soát độ bền nhiệt liên tục tới 95°C, áp suất tới PN25 và tính đồng nhất phân tử khi hàn nhiệt.",
    href: "/san-pham/ong-nhua-ppr-stroman",
  },
  {
    code: "QCVN 12-1:2011/BYT",
    productLine: "PP-R Kháng Khuẩn Nano",
    title: "Quy chuẩn An toàn Vệ sinh Bộ Y Tế",
    scope: "Chứng nhận an toàn sinh học tiếp xúc trực tiếp với nguồn nước uống sạch từ Viện Pasteur & Tổng cục ĐLCL.",
    href: "/san-pham/ong-nhua-ppr-khang-khuan-stroman",
  },
];

export function StandardsSection() {
  return (
    <section className="py-10 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-[3px] bg-[#007A4D] rounded-full shrink-0" />
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#007A4D] uppercase tracking-widest">
                <Award className="w-3.5 h-3.5" />
                <span>Kiểm định kỹ thuật</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#102035] tracking-tight mt-2 uppercase">
              CHẤT LƯỢNG &amp; TIÊU CHUẨN
            </h2>
          </div>

          <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
            100% sản phẩm ống nhựa và phụ kiện Stroman đáp ứng đầy đủ các tiêu chuẩn Quốc tế (ISO, DIN) và Tiêu chuẩn Quốc gia Việt Nam (TCVN, QCVN).
          </p>
        </div>

        {/* Clean Verified Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {verifiedStandards.map((std) => (
            <Link
              key={std.code}
              href={std.href}
              className="group bg-[#F6F9FB] hover:bg-white rounded-2xl border border-slate-200/80 hover:border-[#007A4D]/40 p-4 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#061B33] text-white text-xs font-extrabold tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00C389]" />
                    {std.code}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#007A4D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <div className="text-xs font-bold text-[#007A4D] uppercase tracking-wider mb-1">
                  {std.productLine}
                </div>
                <h3 className="text-base font-bold text-[#102035] group-hover:text-[#007A4D] transition-colors">
                  {std.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs text-slate-600 leading-relaxed">
                  {std.scope}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
