const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function run() {
  const { data: clients } = await supabase.from('clients').select('id').limit(1);
  const client_id = clients[0].id;
  const { data, error } = await supabase.from('sessions').insert({
    client_id,
    date: null,
    title: 'test',
    takeaways: 'test',
    next_steps: 'test',
    sort_order: 0
  });
  console.log('Result:', JSON.stringify(data), JSON.stringify(error));
}
run();
