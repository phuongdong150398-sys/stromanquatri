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
    const { data, error } = await supabase
      .from("quote_requests")
      .select("*, quote_items(*)")
      .order("created_at", { ascending: false });

    if (error) {
      if (isSchemaMissingError(error)) {
        return NextResponse.json({ quotes: [], schemaMissing: true });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ quotes: data || [], schemaMissing: false });
  } catch (err) {
    console.error("GET /api/admin/quotes error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ khi tải đơn dự toán." }, { status: 500 });
  }
}
