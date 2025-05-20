import { createClient } from "@supabase/supabase-js";


const URL = import.meta.env.VITE_URL
const ANON_PUBLIC_KEY = import.meta.env.VITE_ANON_PUBLIC_KEY

export const supabase = createClient(URL, ANON_PUBLIC_KEY)