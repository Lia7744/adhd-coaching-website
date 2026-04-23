const fs = require('fs');
let code = fs.readFileSync('src/app/workbook/page.tsx', 'utf8');

// The absolute physical safety bound for a US layout page with minimal print margins is ~950px to 980px!
code = code.replace(/min-h-\[1100px\]/g, 'min-h-[970px]');
code = code.replace(/min-h-\[1000px\]/g, 'min-h-[970px]');

fs.writeFileSync('src/app/workbook/page.tsx', code);
console.log('Fixed minimum page boundaries for absolute anchoring!');
