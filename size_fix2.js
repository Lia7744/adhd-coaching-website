const fs = require('fs');
let code = fs.readFileSync('src/app/workbook/page.tsx', 'utf8');

// Target the specific section sub-headers (THE BIT, THE MANIPULATION, THE REAL TALK)
// Standardize them all down further to exactly text-[35px]
code = code.replace(/text-\[([0-9]+)px\](.*>)THE BIT/g, 'text-[35px]$2THE BIT');
code = code.replace(/text-\[([0-9]+)px\](.*>)THE MANIPULATION/g, 'text-[35px]$2THE MANIPULATION');
code = code.replace(/text-\[([0-9]+)px\](.*>)THE REAL TALK/g, 'text-[35px]$2THE REAL TALK');
code = code.replace(/text-\[([0-9]+)px\](.*>)THE RESEARCH/g, 'text-[35px]$2THE RESEARCH');

fs.writeFileSync('src/app/workbook/page.tsx', code);
console.log('Updated section titles to exactly 35px!');
