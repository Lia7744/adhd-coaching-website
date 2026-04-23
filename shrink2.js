const fs = require('fs');
let code = fs.readFileSync('src/app/workbook/page.tsx', 'utf8');

// 1. Convert min-h to even smaller bound (just as a container minimum)
code = code.replace(/min-h-\[980px\]/g, 'min-h-[850px]');

// 2. Shrink explicitly tall blocks
code = code.replace(/h-\[200px\]/g, 'h-[160px]');
code = code.replace(/h-\[320px\]/g, 'h-[280px]');

// 3. Downsize massive typography that forces new lines
code = code.replace(/text-\[140px\]/g, 'text-[110px]');
code = code.replace(/text-\[80px\]/g, 'text-[64px]');
code = code.replace(/text-\[70px\]/g, 'text-[56px]');

// 4. Tighten universal padding
code = code.replace(/py-12/g, 'py-8');
code = code.replace(/py-10 px-16/g, 'py-6 px-16');
code = code.replace(/pb-\[70px\]/g, 'pb-[40px]');
code = code.replace(/p-8/g, 'p-6');
code = code.replace(/mb-8/g, 'mb-6');
code = code.replace(/mt-8/g, 'mt-6');

fs.writeFileSync('src/app/workbook/page.tsx', code);
console.log('Successfully applied second round of aggressive shrinking!');
