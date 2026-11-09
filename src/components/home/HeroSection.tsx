"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  FileSpreadsheet,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Layers,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { HERO_SCENES, HeroScene } from "@/data/heroScenes";
import { HeroShowcaseStage } from "./HeroShowcaseStage";
import { HeroProductControls } from "./HeroProductControls";

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100

  const activeScene = HERO_SCENES[activeIndex];
  const SCENE_DURATION_MS = 7000;
  const TICK_INTERVAL_MS = 50;

  // Next Slide Handler
  const handleNext = useCallback(() => {
    setDirection("next");
    setProgress(0);
    setActiveIndex((prev) => (prev + 1) % HERO_SCENES.length);
  }, []);

  // Previous Slide Handler
  const handlePrev = useCallback(() => {
    setDirection("prev");
    setProgress(0);
    setActiveIndex((prev) => (prev - 1 + HERO_SCENES.length) % HERO_SCENES.length);
  }, []);

  // Jump to specific scene
  const handleSelectScene = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setDirection(index > activeIndex ? "next" : "prev");
      setProgress(0);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  // Toggle Play / Pause
  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // 7-Second Autoplay Timer with Hover Pause
  useEffect(() => {
    if (!isPlaying || isHovered) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const step = (TICK_INTERVAL_MS / SCENE_DURATION_MS) * 100;
        if (oldProgress + step >= 100) {
          handleNext();
          return 0;
        }
        return oldProgress + step;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, handleNext]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section
      className="relative bg-gradient-to-b from-slate-950 via-[#0B132B] to-slate-950 text-white overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-slate-800/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Khu vực trình diễn sản phẩm chính"
    >
      {/* BACKGROUND INDUSTRIAL TECHNOLOGY ACCENTS */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TWO-COLUMN DESKTOP HERO LAYOUT: LEFT (40%) & RIGHT (60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ==================== LEFT COLUMN: CONTENT & CTA (40-42%) ==================== */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Top Quality Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CÔNG NGHỆ CHLB ĐỨC • VỐN ĐẦU TƯ 70 TRIỆU USD</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
                TỔNG KHO ỐNG NHỰA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  STRÖMAN – QUẢNG TRỊ
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-bold text-slate-200">
                Sản phẩm cao cấp của Tân Á Đại Thành
              </p>
            </div>

            {/* Core Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Cung cấp các dòng ống nhựa và phụ kiện chất lượng cho công trình dân dụng và hệ thống cấp thoát nước.
            </p>

            {/* Dynamic Active Scene Feature Spotlight */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-lg transition-all duration-500">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${activeScene.accent.textClass}`}>
                  Đang trình diễn: {activeScene.tabLabel}
                </span>
                <span className="text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded bg-slate-800">
                  {activeScene.specs[1]?.label}: {activeScene.specs[1]?.value}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                {activeScene.shortDesc}
              </p>
              
              {/* Application Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {activeScene.applicationTags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800/80 text-[11px] text-slate-300 border border-slate-700/60"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* CTA BUTTONS & HOTLINE HIGHLIGHT */}
            <div className="pt-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/san-pham"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2 group"
                >
                  <span>Xem sản phẩm</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/du-toan-bao-gia"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Yêu cầu báo giá</span>
                </Link>
              </div>

              {/* Direct Hotline Contact Box */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="tel:0915333808"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 hover:text-white hover:border-emerald-400 transition-all text-sm font-bold group shadow-sm"
                  title="Gọi trực tiếp Hotline Tổng Kho"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400 font-normal uppercase tracking-wider">
                      Hotline tư vấn kỹ thuật
                    </span>
                    <span className="text-sm font-extrabold text-white">0915 333 808</span>
                  </div>
                </a>

                <a
                  href="https://zalo.me/0915333808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 hover:bg-blue-500/25 text-xs font-bold transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span>Chat Zalo Báo Giá</span>
                </a>
              </div>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center text-xs text-slate-300">
              <div className="p-2 rounded-lg bg-slate-900/40">
                <strong className="block text-white font-bold">100%</strong>
                <span className="text-[11px] text-slate-400">Nhựa nguyên sinh</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/40">
                <strong className="block text-emerald-400 font-bold">10 Năm</strong>
                <span className="text-[11px] text-slate-400">Bảo hành chính hãng</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/40">
                <strong className="block text-white font-bold">Quảng Trị</strong>
                <span className="text-[11px] text-slate-400">Giao nhanh tận nơi</span>
              </div>
            </div>
          </div>

          {/* ==================== RIGHT COLUMN: 2.5D ANIMATED SHOWCASE (58-60%) ==================== */}
          <div className="lg:col-span-7 relative">
            <HeroShowcaseStage
              scene={activeScene}
              direction={direction}
              isPaused={!isPlaying || isHovered}
            />
          </div>
        </div>

        {/* ==================== BOTTOM CONTROLS & PRODUCT TABS ==================== */}
        <HeroProductControls
          scenes={HERO_SCENES}
          activeIndex={activeIndex}
          progress={progress}
          isPlaying={isPlaying}
          isPausedByUserOrHover={!isPlaying || isHovered}
          onSelectScene={handleSelectScene}
          onPrev={handlePrev}
          onNext={handleNext}
          onTogglePlay={handleTogglePlay}
        />
      </div>
    </section>
  );
}
