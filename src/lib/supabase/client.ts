import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url.includes("placeholder")) {
    return null;
  }

  try {
    return createBrowserClient(url, anonKey);
  } catch (error) {
    console.warn("Supabase browser client init warning:", error);
    return null;
  }
}
