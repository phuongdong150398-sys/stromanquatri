import React from "react";
import type { Metadata } from "next";
import { getAuthenticatedAdminUser } from "@/lib/supabase/admin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Quản trị Ströman | Admin Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAuthenticatedAdminUser();

  if (!admin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F6F9FB] text-[#102035]">
      <AdminSidebar adminEmail={admin.email || "Quản trị viên"} />
      <div className="flex-1 min-w-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
