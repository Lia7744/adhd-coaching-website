const fs = require('fs');
let code = fs.readFileSync('src/app/workbook/page.tsx', 'utf8');

// 1. Re-center elements in circles (Table of Contents numbers & INCUP letters)
code = code.replace(/items-center   flex-shrink-0/g, 'items-center justify-center flex-shrink-0');
code = code.replace(/items-center   w-10/g, 'items-center justify-center w-10');

// 2. Revert massive text sizes specifically targeted by user
// "How to Use This Workbook"
code = code.replace(/text-\[107px\]/g, 'text-[60px]');

// "Why manipulating?"
code = code.replace(/text-\[72px\]/g, 'text-[56px]');

// Table of Contents numbers
code = code.replace(/text-\[53px\]/g, 'text-[40px]');

// INCUP huge text
code = code.replace(/text-\[32px\] font-bold mb-10 tracking-widest border-b-2/g, 'text-[24px] font-bold mb-10 tracking-widest border-b-2');

// 3. Fix the top margin starting too high? We already put justify-content: flex-start in print styles!
// but let's double check if there are other text-[53px] elements. The quote "I don't clean because..." was text-[53px]. The original was text-[40px].
// Since we globally replace text-[53px] with text-[40px], it fixes BOTH the TOC numbers and the quote card! (Because both were 40px originally)
// Let's verify Table of Contents chapter titles: original was 30px.
// Because it was originally 30px, `shrink_all.js` made it 22px. `fix.js` made it 30px again! It is currently text-[30px]. Perfect!

fs.writeFileSync('src/app/workbook/page.tsx', code);
console.log('Restored sizes to perfection and fixed circle logic!');
