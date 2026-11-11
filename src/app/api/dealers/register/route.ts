import { NextResponse } from "next/server";
import { dealerRegisterSchema } from "@/lib/validations";
import { createAdminSupabaseClient, isSchemaMissingError } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = dealerRegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Dữ liệu đăng ký đại lý không hợp lệ",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const d = parsed.data;
    const supabase = createAdminSupabaseClient();

    const { data, error } = await supabase
      .from("dealer_applications")
      .insert({
        business_name: d.businessName,
        contact_person: d.contactPerson,
        phone: d.phone,
        email: d.email,
        province: d.province,
        district: d.district,
        current_business: d.currentBusiness,
        estimated_monthly_volume: d.estimatedMonthlyVolume || "",
        notes: d.notes || "",
        status: "new",
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
    console.error("POST /api/dealers/register error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi gửi đăng ký đại lý." },
      { status: 500 }
    );
  }
}
