import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ljenmhtlabxktxpirjqt.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_oDgsVGPTjt0OXgvDSYggkQ_lZfrDItW";

export const supabase = createClient(supabaseUrl, supabaseKey);
