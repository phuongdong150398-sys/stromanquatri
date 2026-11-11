import React from "react";
import {
  Cpu,
  Award,
  Layers,
  Leaf,
  ShieldCheck,
} from "lucide-react";

const advantages = [
  {
    icon: Cpu,
    title: "Công nghệ Đức",
    desc: "Dây chuyền đùn tự động Krauss Maffei & Battenfeld-Cincinnati nhập khẩu từ CHLB Đức.",
  },
  {
    icon: Award,
    title: "Chất lượng cao",
    desc: "100% hạt nhựa nguyên sinh từ Borealis, LyondellBasell; kiểm định độ dày bằng siêu âm.",
  },
  {
    icon: Layers,
    title: "Giải pháp đa dạng",
    desc: "Đáp ứng đồng bộ từ hệ uPVC, PP-R chịu nhiệt, PP-R kháng khuẩn đến HDPE PE100 cỡ lớn.",
  },
  {
    icon: Leaf,
    title: "An toàn và thân thiện",
    desc: "Không chứa chì và kim loại nặng, an toàn cho nguồn nước uống, tái chế 100%.",
  },
  {
    icon: ShieldCheck,
    title: "Bảo hành lâu dài",
    desc: "Bảo hành chính hãng tới 10 năm từ Tập đoàn Tân Á Đại Thành, tuổi thọ thiết kế vượt 50 năm.",
  },
];

export function TechnicalFeatures() {
  return (
    <section className="py-10 sm:py-20 bg-[#F6F9FB] border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-7 h-[3px] bg-[#007A4D] rounded-full shrink-0" />
              <span className="text-xs font-extrabold text-[#007A4D] uppercase tracking-widest">
                Giá trị cốt lõi
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#102035] tracking-tight mt-2">
              Vì sao chọn STROMAN?
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
            Đầu tư bài bản 70 triệu USD vào hệ thống nhà máy tự động hóa hàng đầu, thiết lập chuẩn mực bền vững cho mọi hạ tầng cấp thoát nước.
          </p>
        </div>

        {/* Clean Unified Horizontal Container (Compact horizontal items on mobile, 5 columns on desktop) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {advantages.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-6 hover:bg-[#F6F9FB]/70 transition-colors duration-200 group flex flex-row sm:flex-col items-start gap-3.5 sm:gap-0"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 border border-[#007A4D]/15 text-[#007A4D] flex items-center justify-center shrink-0 sm:mb-4 group-hover:bg-[#007A4D] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#102035] mb-1 sm:mb-2 group-hover:text-[#007A4D] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
