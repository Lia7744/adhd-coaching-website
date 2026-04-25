const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ljenmhtlabxktxpirjqt.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_oDgsVGPTjt0OXgvDSYggkQ_lZfrDItW";

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from("clients").select("id, client_name, slug");
  if (error) console.error(error);
  console.log(data);
}

check();
