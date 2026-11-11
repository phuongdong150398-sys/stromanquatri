import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { createAdminSupabaseClient, isSchemaMissingError } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Thông tin liên hệ không hợp lệ",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const c = parsed.data;
    const supabase = createAdminSupabaseClient();

    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        full_name: c.fullName,
        phone: c.phone,
        email: c.email || "",
        subject: c.subject,
        message: c.message,
        status: "unread",
      })
      .select("id, created_at")
      .single();

    if (error) {
      if (isSchemaMissingError(error)) {
        return NextResponse.json(
          { error: "Bảng cơ sở dữ liệu chưa được khởi tạo trên Supabase." },
          { status: 503 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data.id, createdAt: data.created_at }, { status: 201 });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi gửi liên hệ." },
      { status: 500 }
    );
  }
}
