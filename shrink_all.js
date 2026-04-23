const fs = require('fs');
let code = fs.readFileSync('src/app/workbook/page.tsx', 'utf8');

// The ultimate content compactor!

// 1. Reduce explicit pixel heights 
code = code.replace(/min-h-\[[0-9]+px\]/g, 'min-h-[800px]');
code = code.replace(/h-\[160px\]/g, 'h-[120px]');
code = code.replace(/h-\[280px\]/g, 'h-[220px]');

// 2. Reduce spacing classes by 1 or 2 steps
code = code.replace(/space-y-6/g, 'space-y-3');
code = code.replace(/space-y-5/g, 'space-y-2');
code = code.replace(/space-y-4/g, 'space-y-2');
code = code.replace(/space-y-3/g, 'space-y-1');

code = code.replace(/mb-6/g, 'mb-4');
code = code.replace(/mb-8/g, 'mb-5');
code = code.replace(/mb-10/g, 'mb-6');
code = code.replace(/mb-12/g, 'mb-8');

code = code.replace(/mt-6/g, 'mt-4');
code = code.replace(/mt-8/g, 'mt-5');
code = code.replace(/mt-10/g, 'mt-6');

// 3. Shave paddings
code = code.replace(/p-6/g, 'p-4');
code = code.replace(/py-8/g, 'py-4');
code = code.replace(/py-6/g, 'py-3');
code = code.replace(/px-16/g, 'px-12');
code = code.replace(/px-20/g, 'px-14');
code = code.replace(/pb-\[40px\]/g, 'pb-[20px]');
code = code.replace(/pb-6/g, 'pb-3');
code = code.replace(/pt-10/g, 'pt-5');
code = code.replace(/pt-12/g, 'pt-6');

// 4. Specifically target Table of Contents items
code = code.replace(/h-20/g, 'h-16');
code = code.replace(/w-20/g, 'w-16');

// 5. Shrink explicit text sizes mathematically
code = code.replace(/text-\[([0-9]+)px\]/g, (match, p1) => {
    let size = parseInt(p1);
    let newSize = Math.floor(size * 0.75); // Shrink fonts by 25%
    return `text-[${newSize}px]`;
});

// Write it back
fs.writeFileSync('src/app/workbook/page.tsx', code);
console.log('Successfully completed total geometry scaling!');
