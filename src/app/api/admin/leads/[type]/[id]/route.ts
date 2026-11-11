import { NextResponse } from "next/server";
import {
  updateContactMessageSchema,
  updateDealerApplicationSchema,
} from "@/lib/admin-validations";
import {
  createAdminSupabaseClient,
  getAuthenticatedAdminUser,
} from "@/lib/supabase/admin";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ type: string; id: string }> }
) {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type, id } = await context.params;
    const body = await request.json();
    const supabase = createAdminSupabaseClient();

    if (type === "dealer") {
      const parsed = updateDealerApplicationSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
      }
      const { data, error } = await supabase
        .from("dealer_applications")
        .update(parsed.data)
        .eq("id", id)
        .select("*")
        .single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ item: data });
    }

    if (type === "contact") {
      const parsed = updateContactMessageSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
      }
      const { data, error } = await supabase
        .from("contact_messages")
        .update(parsed.data)
        .eq("id", id)
        .select("*")
        .single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ item: data });
    }

    return NextResponse.json({ error: "Loại lead không hợp lệ" }, { status: 400 });
  } catch (err) {
    console.error("PATCH /api/admin/leads/[type]/[id] error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ type: string; id: string }> }
) {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type, id } = await context.params;
    const supabase = createAdminSupabaseClient();
    const table =
      type === "dealer"
        ? "dealer_applications"
        : type === "contact"
        ? "contact_messages"
        : null;

    if (!table) {
      return NextResponse.json({ error: "Loại lead không hợp lệ" }, { status: 400 });
    }

    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/leads/[type]/[id] error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ." }, { status: 500 });
  }
}
