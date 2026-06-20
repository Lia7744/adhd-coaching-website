const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function run() {
  const { data: client } = await supabase.from('clients').select('*').eq('slug', 'nick-j-7393').single();
  const { data, error } = await supabase.from('sessions').insert({
    client_id: client.id,
    date: null,
    title: 'test',
    takeaways: 'test',
    next_steps: 'test',
    sort_order: 0
  });
  console.log('Result:', JSON.stringify(data), JSON.stringify(error));
}
run();
