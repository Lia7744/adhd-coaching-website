const fs = require('fs');
const file = 'src/app/tracker/actions.ts';
let code = fs.readFileSync(file, 'utf8');
code = code.replace(
  'return { success: false, error: "Client record not found. Please contact your coach." };',
  'return { success: false, error: "Client record not found: " + (clientErr ? clientErr.message : "No client returned") + " for email: " + cleanEmail };'
);
fs.writeFileSync(file, code);
