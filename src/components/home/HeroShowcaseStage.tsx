"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Shield, Layers, Flame, Award, ChevronRight } from "lucide-react";
import { HeroScene } from "@/data/heroScenes";

interface HeroShowcaseStageProps {
  scene: HeroScene;
  direction: "next" | "prev";
  isPaused: boolean;
}

export function HeroShowcaseStage({ scene, direction, isPaused }: HeroShowcaseStageProps) {
  const [isStageHovered, setIsStageHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle subtle 2.5D interactive tilt when mouse moves over the showcase
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16; // -8deg to +8deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16; // -8deg to +8deg
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsStageHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative w-full h-[440px] sm:h-[490px] lg:h-[530px] rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl backdrop-blur-xl bg-gradient-to-b from-slate-900/90 via-[#0a1128]/95 to-slate-950/95 perspective-1200 transition-all duration-500 group select-none"
      onMouseEnter={() => setIsStageHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`Trình diễn sản phẩm 2.5D: ${scene.fullName}`}
    >
      {/* 1. TECH BACKGROUND GRID & AMBIENT SPOTLIGHTS */}
      <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />
      
      {/* Dynamic Ambient Spotlight based on product scene color */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[360px] rounded-full blur-[100px] pointer-events-none transition-all duration-1000 animate-hero-pulse-glow"
        style={{ backgroundColor: scene.accent.glow }}
      />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none z-10" />

      {/* Industrial Tech Coordinate Markers */}
      <div className="absolute top-4 left-5 flex items-center gap-2 z-20 pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
          STRÖMAN LAB • SCENE [0{scene.id === "hdpe" ? 1 : scene.id === "upvc" ? 2 : scene.id === "ppr" ? 3 : 4}/04]
        </span>
      </div>

      <div className="absolute top-4 right-5 flex items-center gap-2 z-20">
        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/10 text-slate-300 border border-white/10 backdrop-blur-md">
          {scene.specs[0]?.value}
        </span>
      </div>

      {/* 2. HOLOGRAPHIC 3D PEDESTAL (SÀN TRƯNG BÀY CHIỀU SÂU) */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] lg:w-[480px] h-[130px] pointer-events-none"
        style={{
          transform: "translateX(-50%) rotateX(68deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Outer glowing ring */}
        <div
          className="absolute inset-0 rounded-full border border-dashed transition-colors duration-700"
          style={{ borderColor: scene.accent.cyan, opacity: 0.6 }}
        />
        {/* Inner solid ring */}
        <div
          className="absolute inset-4 rounded-full border transition-colors duration-700 shadow-inner"
          style={{
            borderColor: scene.accent.primary,
            boxShadow: `0 0 35px ${scene.accent.glow}`,
          }}
        />
        {/* Core laser circle */}
        <div
          className="absolute inset-10 rounded-full bg-gradient-to-b from-white/10 to-transparent blur-sm"
          style={{
            background: `radial-gradient(ellipse at center, ${scene.accent.glow} 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* 3. MAIN PRODUCT 2.5D ANIMATION STAGE */}
      <div
        key={scene.id}
        className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 transform-style-3d transition-transform duration-300 ease-out z-20"
        style={{
          transform: isStageHovered
            ? `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) translateZ(25px)`
            : "rotateY(0deg) rotateX(0deg) translateZ(0px)",
        }}
      >
        <Link
          href={scene.detailUrl}
          className="relative w-full h-full flex items-center justify-center cursor-pointer group/item"
          title={`Xem chi tiết ${scene.fullName}`}
        >
          {/* SCENE 1: HDPE STAGE SPECIFICS (Phối cảnh chiều sâu, ống đen sọc xanh nổi bật) */}
          {scene.id === "hdpe" && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Product realistic shadow on the 3D pedestal */}
              <div
                className="absolute bottom-16 w-3/4 h-10 rounded-full bg-black/70 blur-xl pointer-events-none transition-transform duration-500"
                style={{
                  transform: isStageHovered ? "scale(1.1) translateY(6px)" : "scale(1)",
                }}
              />
              
              {/* Floating product image with 2.5D perspective float */}
              <img
                src={scene.image}
                alt={scene.fullName}
                className="max-h-[260px] sm:max-h-[300px] lg:max-h-[330px] w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,108,65,0.45)] transition-all duration-700 ease-out animate-hero-float"
              />

              {/* Floating spec pill (Góc trái) */}
              <div className="absolute left-2 sm:left-6 bottom-20 z-30 bg-slate-900/90 border border-emerald-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-left transition-transform duration-500 hover:scale-105">
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>VẬT LIỆU PE100</span>
                </div>
                <div className="text-white text-xs font-semibold mt-0.5">Áp lực tới PN20</div>
                <div className="text-[10px] text-slate-400">Ø20mm – Ø1200mm</div>
              </div>

              {/* Floating feature badge (Góc phải) */}
              <div className="absolute right-2 sm:right-6 top-16 z-30 bg-slate-900/90 border border-cyan-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-right transition-transform duration-500 hover:scale-105">
                <div className="flex items-center justify-end gap-1.5 text-cyan-400 text-[11px] font-bold">
                  <span>HẠ TẦNG NGẦM</span>
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div className="text-white text-xs font-semibold mt-0.5">Độ bền 50+ năm</div>
                <div className="text-[10px] text-slate-400">Chống lún nứt & UV</div>
              </div>
            </div>
          )}

          {/* SCENE 2: uPVC STAGE SPECIFICS (Staggered motion, cấp & thoát nước) */}
          {scene.id === "upvc" && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Product shadow */}
              <div className="absolute bottom-16 w-3/4 h-10 rounded-full bg-black/70 blur-xl pointer-events-none" />

              {/* Staggered Secondary item behind */}
              {scene.secondaryImage && (
                <div className="absolute right-6 sm:right-12 top-10 sm:top-14 opacity-75 blur-[0.5px] transition-all duration-700 -translate-x-4 group-hover/item:translate-x-0">
                  <img
                    src={scene.secondaryImage}
                    alt="Ống uPVC quy cách phụ"
                    className="max-h-[160px] sm:max-h-[200px] w-auto object-contain filter drop-shadow-lg"
                  />
                </div>
              )}

              {/* Primary uPVC product in foreground */}
              <img
                src={scene.image}
                alt={scene.fullName}
                className="max-h-[260px] sm:max-h-[300px] lg:max-h-[330px] w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(2,132,199,0.45)] transition-all duration-700 ease-out animate-hero-float z-10"
              />

              {/* Floating spec pill (Cấp & thoát nước) */}
              <div className="absolute left-2 sm:left-6 bottom-20 z-30 bg-slate-900/90 border border-sky-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-left">
                <div className="flex items-center gap-1.5 text-sky-400 text-[11px] font-bold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>HỆ MÉT & HỆ INCH</span>
                </div>
                <div className="text-white text-xs font-semibold mt-0.5">Cấp & Thoát nước</div>
                <div className="text-[10px] text-slate-400">TCVN 8491 / ISO 1452</div>
              </div>

              {/* Floating feature badge (Góc phải) */}
              <div className="absolute right-2 sm:right-6 top-16 z-30 bg-slate-900/90 border border-teal-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-right">
                <div className="text-teal-400 text-[11px] font-bold">KHÔNG CHÌ AN TOÀN</div>
                <div className="text-white text-xs font-semibold mt-0.5">Lòng ống láng mịn</div>
                <div className="text-[10px] text-slate-400">Hazen-Williams C=150</div>
              </div>
            </div>
          )}

          {/* SCENE 3: PP-R STAGE SPECIFICS (Multi-depth layering, nhiệt 95°C & Nano Silver) */}
          {scene.id === "ppr" && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Product shadow */}
              <div className="absolute bottom-16 w-3/4 h-10 rounded-full bg-black/70 blur-xl pointer-events-none" />

              {/* Layer 2: PP-R Kháng Khuẩn Nano Bạc in background depth */}
              {scene.secondaryImage && (
                <div className="absolute left-8 sm:left-14 top-12 opacity-80 transition-all duration-700 -rotate-3 scale-90 group-hover/item:scale-95">
                  <img
                    src={scene.secondaryImage}
                    alt="Ống PP-R Kháng Khuẩn 3 Lớp"
                    className="max-h-[180px] sm:max-h-[220px] w-auto object-contain filter drop-shadow-md"
                  />
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    Nano Bạc 3 Lớp
                  </span>
                </div>
              )}

              {/* Layer 1: PP-R Standard in primary focus */}
              <img
                src={scene.image}
                alt={scene.fullName}
                className="max-h-[260px] sm:max-h-[300px] lg:max-h-[330px] w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(16,185,129,0.45)] transition-all duration-700 ease-out animate-hero-float z-10"
              />

              {/* Floating spec pill (Chịu nhiệt 95°C) */}
              <div className="absolute right-2 sm:right-6 bottom-20 z-30 bg-slate-900/90 border border-emerald-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-right">
                <div className="flex items-center justify-end gap-1.5 text-emerald-400 text-[11px] font-bold">
                  <span>CHỊU NHIỆT 95°C</span>
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <div className="text-white text-xs font-semibold mt-0.5">Đỉnh nhiệt 110°C</div>
                <div className="text-[10px] text-slate-400">DIN 8077/8078 Chuẩn Đức</div>
              </div>

              {/* Floating feature badge (Bảo hành 10 năm) */}
              <div className="absolute left-2 sm:left-6 top-16 z-30 bg-slate-900/90 border border-cyan-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-left">
                <div className="text-cyan-400 text-[11px] font-bold">HÀN NHIỆT ĐỒNG KHỐI</div>
                <div className="text-white text-xs font-semibold mt-0.5">Không bao giờ rò rỉ</div>
                <div className="text-[10px] text-emerald-400 font-semibold">Bảo hành 10 năm</div>
              </div>
            </div>
          )}

          {/* SCENE 4: ỐNG LUỒN ĐIỆN STAGE SPECIFICS (Chuyển động lướt ngang, chống cháy lan 750N) */}
          {scene.id === "electric" && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Product shadow */}
              <div className="absolute bottom-16 w-3/4 h-10 rounded-full bg-black/70 blur-xl pointer-events-none" />

              {/* Electrical Conduit Product Presentation */}
              <div className="relative z-10 transition-transform duration-700 ease-out group-hover/item:scale-105">
                <img
                  src={scene.image}
                  alt={scene.fullName}
                  className="max-h-[250px] sm:max-h-[290px] lg:max-h-[320px] w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(234,179,8,0.4)] animate-hero-float"
                />
              </div>

              {/* Floating spec pill (Chống cháy lan) */}
              <div className="absolute left-2 sm:left-6 bottom-20 z-30 bg-slate-900/90 border border-amber-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-left">
                <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-bold">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>CHỐNG CHÁY LAN</span>
                </div>
                <div className="text-white text-xs font-semibold mt-0.5">Tự dập tắt lửa</div>
                <div className="text-[10px] text-slate-400">BS EN 61386 / TCVN 7417</div>
              </div>

              {/* Floating feature badge (Chịu nén 750N) */}
              <div className="absolute right-2 sm:right-6 top-16 z-30 bg-slate-900/90 border border-amber-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-right">
                <div className="text-amber-400 text-[11px] font-bold">CHỊU NÉN 750N</div>
                <div className="text-white text-xs font-semibold mt-0.5">Đổ bê tông an toàn</div>
                <div className="text-[10px] text-slate-400">Uốn cong không gãy</div>
              </div>
            </div>
          )}

          {/* Hover Overlay CTA */}
          <div className="absolute bottom-4 right-5 z-30 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-xs font-bold text-white bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
            <span>Xem chi tiết thông số</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </Link>
      </div>

      {/* 4. BOTTOM QUICK SPECS STRIP */}
      <div className="absolute bottom-0 inset-x-0 z-30 px-4 sm:px-6 py-2.5 bg-slate-950/80 border-t border-slate-800/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-slate-400 text-[11px] font-mono shrink-0">QUY CÁCH:</span>
          {scene.specs.map((sp, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[11px] shrink-0 border border-slate-700/50"
            >
              <span className="text-slate-400">{sp.label}:</span>
              <strong className="text-white font-semibold">{sp.value}</strong>
            </span>
          ))}
        </div>

        <Link
          href={scene.detailUrl}
          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold text-[11px] shrink-0 transition-colors"
        >
          <span>Khám phá dòng sản phẩm</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
