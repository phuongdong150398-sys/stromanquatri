import React from "react";
import {
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Award,
  Leaf,
} from "lucide-react";

export function TechnicalFeatures() {
  const features = [
    {
      icon: Cpu,
      title: "Công Nghệ Đùn Tự Động Từ Đức",
      desc: "Hệ thống máy móc tân tiến nhất thế giới của Krauss Maffei & Battenfeld-Cincinnati giúp kiểm soát độ dày và đồng nhất nhiệt độ chính xác tới từng micromet.",
    },
    {
      icon: Layers,
      title: "100% Hạt Nhựa Nguyên Sinh",
      desc: "Nguyên liệu nhập khẩu trực tiếp từ các tập đoàn hóa chất hàng đầu như Borealis, LyondellBasell, Sabic. Tuyệt đối không sử dụng nhựa tái chế hay chì độc hại.",
    },
    {
      icon: Sparkles,
      title: "Đột Phá Kháng Khuẩn Nano Bạc",
      desc: "Dòng ống PP-R kháng khuẩn 3 lớp độc quyền triệt tiêu 99.9% vi khuẩn, nấm mốc và rêu bám, cung cấp nguồn nước vô trùng an toàn uống trực tiếp.",
    },
    {
      icon: ShieldCheck,
      title: "Hệ Thống Đo Laser & Siêu Âm",
      desc: "100% thành phẩm được quét kiểm tra độ dày và khuyết tật bằng sóng siêu âm ngay trên dây chuyền, loại bỏ hoàn toàn sản phẩm lỗi trước khi xuất xưởng.",
    },
    {
      icon: Award,
      title: "Tiêu Chuẩn Quốc Tế Khắt Khe",
      desc: "Đạt chuẩn DIN 8077/8078 (Đức), ISO 1452, ISO 4427, TCVN 8491 cùng chứng nhận an toàn thực phẩm vệ sinh nguồn nước từ Viện Pasteur.",
    },
    {
      icon: Leaf,
      title: "Bền Vững & Thân Thiện Môi Trường",
      desc: "Tuổi thọ vượt 50 năm, hệ số ma sát thành ống siêu thấp giảm tiêu hao năng lượng máy bơm, tái chế 100% sau vòng đời sử dụng.",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Award className="w-4 h-4" />
            <span>Tiêu Chuẩn Kỹ Thuật Quốc Tế</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Vì Sao Nhà Thầu & Đại Lý Chọn Nhựa Stroman?
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Nhờ khoản đầu tư 70 triệu USD vào nhà máy hiện đại bậc nhất Đông Nam Á, Stroman thiết lập chuẩn mực mới về chất lượng ống dẫn nước tại Việt Nam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60 hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
