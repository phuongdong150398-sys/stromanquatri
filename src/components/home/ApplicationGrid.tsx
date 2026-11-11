import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FocusApplication {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  pipes: string[];
  href: string;
}

const focusApplications: FocusApplication[] = [
  {
    id: "nha-o-dan-dung",
    title: "Nhà ở dân dụng",
    subtitle: "Hệ thống cấp nước nóng lạnh & thoát nước sinh hoạt bền bỉ, cách âm êm ái cho nhà phố, biệt thự.",
    image: "/images/applications/dan-dung.png",
    pipes: ["PP-R Chịu Nhiệt", "PP-R Kháng Khuẩn", "uPVC"],
    href: "/ung-dung",
  },
  {
    id: "cong-trinh-cao-tang",
    title: "Công trình cao tầng",
    subtitle: "Cấp nước trục đứng áp lực cao tới PN25 và thoát nước đồng bộ cho chung cư, khách sạn, tòa nhà văn phòng.",
    image: "/images/applications/cap-thoat-nuoc.jpg",
    pipes: ["PP-R PN20/PN25", "uPVC Class 2/3"],
    href: "/ung-dung",
  },
  {
    id: "nha-may-khu-cong-nghiep",
    title: "Nhà máy và khu công nghiệp",
    subtitle: "Hệ thống cấp nước PCCC, dẫn hóa chất lỏng, khí nén và hạ tầng thoát thải khu công nghiệp.",
    image: "/images/applications/cong-nghiep-nhe.png",
    pipes: ["HDPE PE100", "uPVC nong gioăng"],
    href: "/ung-dung",
  },
  {
    id: "nong-nghiep-tuoi-tieu",
    title: "Nông nghiệp và tưới tiêu",
    subtitle: "Hệ thống dẫn thủy nông, tưới phun mưa, nhỏ giọt tự động kháng tia cực tím UV ngoài trời.",
    image: "/images/applications/thuy-loi-nong-nghiep.png",
    pipes: ["HDPE cuộn Ø20-Ø90", "uPVC"],
    href: "/ung-dung",
  },
];

export function ApplicationGrid() {
  return (
    <section className="py-10 sm:py-20 bg-[#F6F9FB] border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-4 mb-6 sm:mb-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-[3px] bg-[#007A4D] rounded-full shrink-0" />
              <span className="text-xs font-extrabold text-[#007A4D] uppercase tracking-widest">
                Giải pháp thực tiễn
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#102035] tracking-tight mt-2">
              Lĩnh vực ứng dụng tiêu biểu
            </h2>
          </div>

          <Link
            href="/ung-dung"
            className="inline-flex items-center gap-1.5 min-h-[40px] text-sm font-bold text-[#007A4D] hover:text-[#005f3b] transition-colors group shrink-0"
          >
            <span>Xem tất cả 6 lĩnh vực ứng dụng</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Image Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {focusApplications.map((app) => (
            <Link
              key={app.id}
              href={app.href}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-[#007A4D]/40 transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                {/* Crisp Image Box */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061B33]/85 via-[#061B33]/25 to-transparent" />
                  <h3 className="absolute bottom-3.5 left-4 right-4 text-white font-bold text-base tracking-tight">
                    {app.title}
                  </h3>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {app.subtitle}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {app.pipes.map((pipe) => (
                      <span
                        key={pipe}
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-[#007A4D] border border-[#007A4D]/15"
                      >
                        {pipe}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center justify-between text-xs font-bold text-[#007A4D]">
                <span>Khám phá giải pháp</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
