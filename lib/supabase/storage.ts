import type { SupabaseClient } from "@supabase/supabase-js";

/** Storage bucket name — configure in Supabase when adding media assets */
export const ARCHIVE_STORAGE_BUCKET = "archive-media";

export function getStorage(client: SupabaseClient) {
  return client.storage.from(ARCHIVE_STORAGE_BUCKET);
}
