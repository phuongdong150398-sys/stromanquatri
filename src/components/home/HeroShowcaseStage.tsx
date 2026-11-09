"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Shield, Layers, Flame, Award, ChevronRight, Box } from "lucide-react";
import { HeroScene } from "@/data/heroScenes";
import { Stroman3DCanvas } from "@/components/3d/Stroman3DCanvas";

interface HeroShowcaseStageProps {
  scene: HeroScene;
  direction: "next" | "prev";
  isPaused: boolean;
}

export function HeroShowcaseStage({ scene, direction, isPaused }: HeroShowcaseStageProps) {
  return (
    <div
      className="relative w-full h-[450px] sm:h-[500px] lg:h-[540px] rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl backdrop-blur-xl bg-gradient-to-b from-slate-900/95 via-[#070d1e]/98 to-slate-950 select-none group"
      aria-label={`Trình diễn mô hình 3D thực thụ: ${scene.fullName}`}
    >
      {/* 1. TECH BACKGROUND GRID & SPOTLIGHT */}
      <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />

      {/* Dynamic Ambient Spotlight */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[520px] h-[360px] rounded-full blur-[110px] pointer-events-none transition-all duration-1000 animate-hero-pulse-glow"
        style={{ backgroundColor: scene.accent.glow }}
      />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none z-10" />

      {/* 2. INDUSTRIAL LAB MARKERS */}
      <div className="absolute top-4 left-5 flex items-center gap-2 z-30 pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase flex items-center gap-1.5 font-bold">
          <Box className="w-3.5 h-3.5 text-emerald-400" />
          <span>3D VIRTUAL LAB • {scene.tabLabel.toUpperCase()}</span>
        </span>
      </div>

      <div className="absolute top-4 right-20 sm:right-28 flex items-center gap-2 z-30 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
          Mô hình 3D thực thụ
        </span>
      </div>

      {/* 3. THREE.JS WEBGL 3D INTERACTIVE CANVAS */}
      <div className="absolute inset-0 z-20">
        <Stroman3DCanvas sceneId={scene.id} accentColor={scene.accent.primary} />
      </div>

      {/* 4. FLOATING TECHNICAL ANNOTATIONS (CHÚ THÍCH KỸ THUẬT NỔI) */}
      {scene.id === "hdpe" && (
        <>
          <div className="absolute left-4 sm:left-6 bottom-20 z-30 bg-slate-900/90 border border-emerald-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-left pointer-events-none">
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>NHỰA PE100 NGUYÊN SINH</span>
            </div>
            <div className="text-white text-xs font-semibold mt-0.5">Ống rỗng dày PN16/PN20</div>
            <div className="text-[10px] text-slate-400">4 Sọc xanh nhận diện ISO 4427</div>
          </div>

          <div className="absolute right-4 sm:right-6 top-16 z-30 bg-slate-900/90 border border-cyan-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-right pointer-events-none">
            <div className="flex items-center justify-end gap-1.5 text-cyan-400 text-[11px] font-bold">
              <span>HẠ TẦNG NGẦM</span>
              <Award className="w-3.5 h-3.5" />
            </div>
            <div className="text-white text-xs font-semibold mt-0.5">Ống cây & Dạng cuộn 100m</div>
            <div className="text-[10px] text-slate-400">Độ bền trên 50 năm</div>
          </div>
        </>
      )}

      {scene.id === "upvc" && (
        <>
          <div className="absolute left-4 sm:left-6 bottom-20 z-30 bg-slate-900/90 border border-sky-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-left pointer-events-none">
            <div className="flex items-center gap-1.5 text-sky-400 text-[11px] font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>ĐẦU NONG GIOĂNG CAO SU</span>
            </div>
            <div className="text-white text-xs font-semibold mt-0.5">Khớp nối khóa gioăng chống rò</div>
            <div className="text-[10px] text-slate-400">Tiêu chuẩn ISO 1452 / TCVN 8491</div>
          </div>

          <div className="absolute right-4 sm:right-6 top-16 z-30 bg-slate-900/90 border border-teal-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-right pointer-events-none">
            <div className="text-teal-400 text-[11px] font-bold">LÒNG ỐNG SIÊU NHẴN</div>
            <div className="text-white text-xs font-semibold mt-0.5">Hazen-Williams C = 150</div>
            <div className="text-[10px] text-slate-400">Không lắng cặn • Không chứa chì</div>
          </div>
        </>
      )}

      {scene.id === "ppr" && (
        <>
          <div className="absolute left-4 sm:left-6 bottom-20 z-30 bg-slate-900/90 border border-emerald-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-left pointer-events-none">
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>CẤU TRÚC 3 LỚP NANO BẠC</span>
            </div>
            <div className="text-white text-xs font-semibold mt-0.5">Lòng phủ Nano diệt khuẩn 99.9%</div>
            <div className="text-[10px] text-slate-400">Chịu nhiệt 95°C • Đỉnh 110°C</div>
          </div>

          <div className="absolute right-4 sm:right-6 top-16 z-30 bg-slate-900/90 border border-amber-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-right pointer-events-none">
            <div className="text-amber-400 text-[11px] font-bold">REN ĐỒNG THAU CNC</div>
            <div className="text-white text-xs font-semibold mt-0.5">Mạ Niken nguyên khối</div>
            <div className="text-[10px] text-emerald-400 font-semibold">Bảo hành 10 năm chính hãng</div>
          </div>
        </>
      )}

      {scene.id === "electric" && (
        <>
          <div className="absolute left-4 sm:left-6 bottom-20 z-30 bg-slate-900/90 border border-amber-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-left pointer-events-none">
            <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>CHỐNG CHÁY TỰ TẮT LỬA</span>
            </div>
            <div className="text-white text-xs font-semibold mt-0.5">Chịu lực nén 750N / 1250N</div>
            <div className="text-[10px] text-slate-400">BS EN 61386 / TCVN 7417</div>
          </div>

          <div className="absolute right-4 sm:right-6 top-16 z-30 bg-slate-900/90 border border-cyan-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-right pointer-events-none">
            <div className="text-cyan-400 text-[11px] font-bold">LÕI CÁP ĐIỆN AN TOÀN</div>
            <div className="text-white text-xs font-semibold mt-0.5">Uốn góc 90° không gãy nứt</div>
            <div className="text-[10px] text-slate-400">Cách điện tuyệt đối âm tường</div>
          </div>
        </>
      )}

      {/* 5. BOTTOM SPECS STRIP & QUICK NAVIGATION */}
      <div className="absolute bottom-0 inset-x-0 z-30 px-4 sm:px-6 py-2.5 bg-slate-950/85 border-t border-slate-800/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-slate-400 text-[11px] font-mono shrink-0">THÔNG SỐ 3D:</span>
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
          <span>Xem chi tiết danh mục</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
