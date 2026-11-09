"use client";

import React from "react";
import { Play, Pause, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { HeroScene, HERO_SCENES } from "@/data/heroScenes";

interface HeroProductControlsProps {
  scenes: HeroScene[];
  activeIndex: number;
  progress: number; // 0 to 100
  isPlaying: boolean;
  isPausedByUserOrHover: boolean;
  onSelectScene: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
}

export function HeroProductControls({
  scenes,
  activeIndex,
  progress,
  isPlaying,
  isPausedByUserOrHover,
  onSelectScene,
  onPrev,
  onNext,
  onTogglePlay,
}: HeroProductControlsProps) {
  const currentScene = scenes[activeIndex];

  return (
    <div className="w-full mt-6 space-y-4">
      {/* 1. TOP BAR: STATUS INDICATOR & QUICK PREV/NEXT CONTROLS */}
      <div className="flex items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onTogglePlay}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              isPlaying
                ? "bg-slate-800/80 text-emerald-400 border-emerald-500/30 hover:bg-slate-800"
                : "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
            }`}
            title={isPlaying ? "Tạm dừng tự động chuyển cảnh" : "Tiếp tục tự động chuyển cảnh"}
            aria-label={isPlaying ? "Tạm dừng trình diễn" : "Tiếp tục trình diễn"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Tự động phát (7s)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Đã tạm dừng</span>
              </>
            )}
          </button>

          {isPausedByUserOrHover && isPlaying && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>Đang dừng xem chi tiết</span>
            </span>
          )}
        </div>

        {/* Prev / Next Circular Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all shadow-md active:scale-95"
            aria-label="Cảnh sản phẩm trước"
            title="Sản phẩm trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono text-slate-400 px-1 font-semibold">
            {activeIndex + 1} / {scenes.length}
          </span>

          <button
            onClick={onNext}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all shadow-md active:scale-95"
            aria-label="Cảnh sản phẩm tiếp theo"
            title="Sản phẩm kế tiếp"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. 4-TAB PRODUCT SELECTION GRID (WITH 7S PROGRESS BARS) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {scenes.map((scene, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={scene.id}
              onClick={() => onSelectScene(idx)}
              className={`relative text-left p-3 rounded-2xl border transition-all duration-300 overflow-hidden group ${
                isActive
                  ? "bg-slate-800/95 border-emerald-500/50 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/20"
                  : "bg-slate-900/60 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700 text-slate-400"
              }`}
            >
              {/* Active Tab Background Subtle Glow */}
              {isActive && (
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${scene.accent.cyan} 0%, transparent 80%)`,
                  }}
                />
              )}

              {/* Tab Header & Label */}
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  className={`text-xs font-bold transition-colors ${
                    isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                  }`}
                >
                  {scene.tabLabel}
                </span>

                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                )}
              </div>

              {/* Subtitle / Short Feature */}
              <p
                className={`text-[11px] line-clamp-1 transition-colors ${
                  isActive ? "text-slate-300 font-medium" : "text-slate-500 group-hover:text-slate-400"
                }`}
              >
                {scene.tabCategory}
              </p>

              {/* 7-Second Progress Bar at bottom of active tab */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-800">
                {isActive && (
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-75 ease-linear"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
