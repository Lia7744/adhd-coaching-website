const fs = require('fs');
let code = fs.readFileSync('src/app/workbook/page.tsx', 'utf8');

// Undo structural height hacks
code = code.replace(/min-h-\[[0-9]+px\]/g, ' '); 
code = code.replace(/justify-center/g, ' '); // Get rid of vertical centering causing weird top margins!

// Revert font shrinking
// text-[60px] to text-[80px]
code = code.replace(/text-\[30px\]/g, 'text-[40px]');
code = code.replace(/text-\[33px\]/g, 'text-[44px]');
code = code.replace(/text-\[42px\]/g, 'text-[56px]');
code = code.replace(/text-\[45px\]/g, 'text-[60px]');
code = code.replace(/text-\[52px\]/g, 'text-[70px]');
code = code.replace(/text-\[60px\]/g, 'text-[80px]');
code = code.replace(/text-\[67px\]/g, 'text-[90px]');
code = code.replace(/text-\[105px\]/g, 'text-[140px]');
code = code.replace(/text-\[120px\]/g, 'text-[160px]');
// I previously manually replaced text-[110px], text-[64px], text-[56px] in shrink2
code = code.replace(/text-\[110px\]/g, 'text-[160px]');
code = code.replace(/text-\[64px\]/g, 'text-[80px]');
code = code.replace(/text-\[56px\]/g, 'text-[70px]');

// Base items shrinking
code = code.replace(/h-\[120px\]/g, 'h-[200px]');
code = code.replace(/h-\[220px\]/g, 'h-[320px]');
code = code.replace(/h-\[160px\]/g, 'h-[200px]');
code = code.replace(/h-\[280px\]/g, 'h-[320px]');

// Spacing
code = code.replace(/space-y-1/g, 'space-y-3');
code = code.replace(/space-y-2/g, 'space-y-4');
code = code.replace(/space-y-3/g, 'space-y-6');

code = code.replace(/mb-4/g, 'mb-6');
code = code.replace(/mb-5/g, 'mb-8');
code = code.replace(/mb-6/g, 'mb-10');
code = code.replace(/mb-8/g, 'mb-12');

code = code.replace(/mt-4/g, 'mt-6');
code = code.replace(/mt-5/g, 'mt-8');
code = code.replace(/mt-6/g, 'mt-10');

// Padding
code = code.replace(/p-4/g, 'p-6');
code = code.replace(/py-4/g, 'py-8');
code = code.replace(/py-3/g, 'py-6');
code = code.replace(/px-12/g, 'px-16');
code = code.replace(/px-14/g, 'px-20');
code = code.replace(/pb-\[20px\]/g, 'pb-[40px]');
code = code.replace(/pb-3/g, 'pb-6');
code = code.replace(/pt-5/g, 'pt-10');
code = code.replace(/pt-6/g, 'pt-12');

fs.writeFileSync('src/app/workbook/page.tsx', code);
console.log('Restored bold sizing and stripped bad height controls!');
