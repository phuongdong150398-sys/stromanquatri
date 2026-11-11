import { NextResponse } from "next/server";
import {
  createAdminSupabaseClient,
  getAuthenticatedAdminUser,
  isSchemaMissingError,
} from "@/lib/supabase/admin";

export async function GET() {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminSupabaseClient();
    const [dealersRes, contactsRes] = await Promise.all([
      supabase
        .from("dealer_applications")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (isSchemaMissingError(dealersRes.error) || isSchemaMissingError(contactsRes.error)) {
      return NextResponse.json({
        dealerApplications: [],
        contactMessages: [],
        schemaMissing: true,
      });
    }

    if (dealersRes.error || contactsRes.error) {
      return NextResponse.json(
        { error: dealersRes.error?.message || contactsRes.error?.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      dealerApplications: dealersRes.data || [],
      contactMessages: contactsRes.data || [],
      schemaMissing: false,
    });
  } catch (err) {
    console.error("GET /api/admin/leads error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ khi tải hồ sơ khách hàng." }, { status: 500 });
  }
}
