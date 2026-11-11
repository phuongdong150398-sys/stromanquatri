import { NextResponse } from "next/server";
import { updateQuoteAdminSchema } from "@/lib/admin-validations";
import {
  createAdminSupabaseClient,
  getAuthenticatedAdminUser,
} from "@/lib/supabase/admin";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateQuoteAdminSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dữ liệu cập nhật không hợp lệ" },
        { status: 400 }
      );
    }

    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("quote_requests")
      .update(parsed.data)
      .eq("id", id)
      .select("*, quote_items(*)")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ quote: data });
  } catch (err) {
    console.error("PATCH /api/admin/quotes/[id] error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ khi cập nhật đơn." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const supabase = createAdminSupabaseClient();
    const { error } = await supabase.from("quote_requests").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/quotes/[id] error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ khi xóa đơn." }, { status: 500 });
  }
}
