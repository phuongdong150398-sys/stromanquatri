"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileSpreadsheet,
  Users,
  Package,
  Newspaper,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard, exact: true },
  { href: "/admin/quotes", label: "Đơn dự toán", icon: FileSpreadsheet },
  { href: "/admin/leads", label: "Đại lý & Liên hệ", icon: Users },
  { href: "/admin/products", label: "Sản phẩm & Giá", icon: Package },
  { href: "/admin/content", label: "Tin tức & Kho hàng", icon: Newspaper },
  { href: "/admin/settings", label: "Cấu hình Website", icon: Settings },
];

export function AdminSidebar({ adminEmail }: { adminEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      const supabase = createBrowserSupabaseClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    } finally {
      setSigningOut(false);
    }
  };

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Brand header */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link
          href="/admin"
          onClick={() => setMobileOpen(false)}
          className="inline-flex items-center justify-center bg-white rounded-xl px-3.5 py-2 shadow-sm"
        >
          <Image
            src="/images/logo-stroman.png"
            alt="STROMAN"
            width={132}
            height={36}
            className="h-7 w-auto object-contain"
          />
        </Link>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#00C389]">
          <ShieldCheck className="w-3.5 h-3.5" />
          Portal Quản Trị
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-[#007A4D] text-white shadow-sm"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom User + Actions */}
      <div className="p-4 border-t border-white/10 space-y-2.5 bg-[#041324]">
        <div className="px-2">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
            Quản trị viên
          </div>
          <div
            className="text-xs font-medium text-slate-100 truncate mt-0.5"
            title={adminEmail}
          >
            {adminEmail}
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 transition-colors"
        >
          <span>Xem Website Khách</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-200 hover:text-white bg-red-500/15 hover:bg-red-500/30 transition-colors cursor-pointer disabled:opacity-60"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{signingOut ? "Đang đăng xuất..." : "Đăng xuất"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:sticky lg:top-0 lg:h-screen bg-[#061B33] text-white shrink-0 border-r border-slate-800">
        {navContent}
      </aside>

      {/* Mobile Header Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#061B33] text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="bg-white rounded-lg px-2.5 py-1">
            <Image
              src="/images/logo-stroman.png"
              alt="STROMAN"
              width={108}
              height={28}
              className="h-6 w-auto object-contain"
            />
          </Link>
          <span className="text-xs font-semibold text-[#00C389] uppercase tracking-wider">
            Admin
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Mở menu quản trị"
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-[#061B33] text-white h-full z-10 shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Đóng menu"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
