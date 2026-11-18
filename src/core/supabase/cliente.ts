import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const clave =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !clave) {
  throw new Error(
    "Faltan las variables de Supabase. Revisa tu archivo .env y reinicia con: npx expo start -c",
  );
}

export const supabase = createClient(url, clave, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});
