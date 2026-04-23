const fs = require('fs');
let code = fs.readFileSync('src/app/workbook/page.tsx', 'utf8');

// Target the specific section sub-headers (THE BIT, THE MANIPULATION, THE REAL TALK)
// Standardize them all to text-[40px] (30% less than 56px)
code = code.replace(/text-\[([0-9]+)px\](.*>)THE BIT/g, 'text-[40px]$2THE BIT');
code = code.replace(/text-\[([0-9]+)px\](.*>)THE MANIPULATION/g, 'text-[40px]$2THE MANIPULATION');
code = code.replace(/text-\[([0-9]+)px\](.*>)THE REAL TALK/g, 'text-[40px]$2THE REAL TALK');

fs.writeFileSync('src/app/workbook/page.tsx', code);
console.log('Standardized section titles to 40px!');
