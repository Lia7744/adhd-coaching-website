const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ljenmhtlabxktxpirjqt.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_oDgsVGPTjt0OXgvDSYggkQ_lZfrDItW";

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from("goals").select("*");
  if (error) console.error("Error goals:", error);
  console.log("Goals:", JSON.stringify(data, null, 2));

  const { data: actions, error: err2 } = await supabase.from("actions").select("*");
  console.log("Actions:", JSON.stringify(actions, null, 2));
}

check();
