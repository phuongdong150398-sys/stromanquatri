"use client";

import React, { useState, useEffect } from "react";

export function ClientGate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        suppressHydrationWarning
        className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white select-none"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30" />
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="text-center">
            <span className="text-sm font-bold tracking-wider text-white block">
              TỔNG KHO ỐNG NHỰA STRÖMAN QUẢNG TRỊ
            </span>
            <span className="text-[11px] text-slate-400 font-mono mt-1 block">
              Đang tải hệ thống WebGL 3D...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
