export { isSupabaseConfigured, getSupabaseEnv } from "@/lib/supabase/config";
export { createClient as createBrowserSupabaseClient } from "@/lib/supabase/client";
export { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
export { updateSession } from "@/lib/supabase/middleware";
export { ARCHIVE_STORAGE_BUCKET, getStorage } from "@/lib/supabase/storage";
