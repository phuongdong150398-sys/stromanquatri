import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig, isAllowedAdminEmail } from "./config";
import { createServerSupabaseClient } from "./server";

export function createAdminSupabaseClient() {
  const { url } = getSupabasePublicConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Thiếu cấu hình SUPABASE_SERVICE_ROLE_KEY hoặc NEXT_PUBLIC_SUPABASE_URL trên server."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function getAuthenticatedAdminUser() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !isAllowedAdminEmail(user.email)) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export function isSchemaMissingError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    (error.message?.includes("Could not find the table") ?? false) ||
    (error.message?.includes("does not exist") ?? false)
  );
}
