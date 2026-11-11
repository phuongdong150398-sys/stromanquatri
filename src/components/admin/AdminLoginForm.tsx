"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

interface AdminLoginFormProps {
  initialError?: string;
}

function getErrorMessageFromCode(code?: string): string {
  if (code === "forbidden") {
    return "Tài khoản của bạn chưa nằm trong danh sách quản trị viên (ADMIN_ALLOWED_EMAILS).";
  }
  if (code === "config_missing") {
    return "Hệ thống chưa cấu hình đủ biến môi trường Supabase trên server.";
  }
  return "";
}

export function AdminLoginForm({ initialError }: AdminLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>(() =>
    getErrorMessageFromCode(initialError)
  );

  useEffect(() => {
    const msg = getErrorMessageFromCode(initialError);
    if (msg) {
      setErrorMessage(msg);
    }
  }, [initialError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ Email và Mật khẩu quản trị.");
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          setErrorMessage("Email hoặc mật khẩu quản trị không chính xác.");
        } else {
          setErrorMessage(error.message);
        }
        return;
      }

      if (data.user) {
        window.location.assign("/admin");
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Không thể kết nối máy chủ xác thực."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#061B33] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle architectural grid accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.28) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Brand Header */}
          <div className="bg-[#F6F9FB] px-8 py-6 border-b border-slate-200 flex flex-col items-center text-center">
            <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm mb-4">
              <Image
                src="/images/logo-stroman.png"
                alt="STROMAN Logo"
                width={150}
                height={42}
                className="h-9 w-auto object-contain"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#007A4D]/10 text-[#007A4D] text-xs font-semibold tracking-wide uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </div>
            <h1 className="text-xl font-bold text-[#102035]">
              Đăng nhập Hệ thống Quản trị
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Quản lý dự toán báo giá, đại lý, bảng giá sản phẩm &amp; nội dung
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
            {errorMessage && (
              <div
                role="alert"
                className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm font-semibold text-[#102035] mb-1.5"
              >
                Email quản trị
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#102035] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007A4D]/25 focus:border-[#007A4D] transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-semibold text-[#102035] mb-1.5"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-300 text-sm text-[#102035] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007A4D]/25 focus:border-[#007A4D] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#007A4D] hover:bg-[#00633e] disabled:opacity-60 text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang xác thực...
                </>
              ) : (
                "Đăng nhập Quản trị"
              )}
            </button>
          </form>

          {/* Footer link */}
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-medium text-[#082B4A] hover:text-[#007A4D] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Quay lại Website khách hàng
            </Link>
            <span>Supabase Auth</span>
          </div>
        </div>
      </div>
    </div>
  );
}
