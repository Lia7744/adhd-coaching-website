const fs = require('fs');
let code = fs.readFileSync('src/app/workbook/page.tsx', 'utf8');

// Global structural shrinks
code = code.replace(/min-h-\[1100px\]/g, 'min-h-[980px]');
code = code.replace(/min-h-\[1123px\]/g, 'min-h-[980px]');

// Vertical padding reduction
code = code.replace(/p-20/g, 'py-12 px-20');
code = code.replace(/pt-20/g, 'pt-12');
code = code.replace(/pb-\[120px\]/g, 'pb-[70px]');
code = code.replace(/p-16/g, 'py-10 px-16');
code = code.replace(/pt-16/g, 'pt-10');

// Vertical margin reduction
code = code.replace(/mb-16/g, 'mb-12');
code = code.replace(/mb-12/g, 'mb-8');
code = code.replace(/mt-16/g, 'mt-10');
code = code.replace(/my-12/g, 'my-8');

// Space between elements reduction
code = code.replace(/space-y-6/g, 'space-y-4');
code = code.replace(/space-y-\[32px\]/g, 'space-y-6');

// Shrink massive fonts slightly
code = code.replace(/text-\[160px\]/g, 'text-[140px]');
code = code.replace(/text-\[90px\]/g, 'text-[70px]');

fs.writeFileSync('src/app/workbook/page.tsx', code);
console.log('Successfully shrunk structural classes!');
