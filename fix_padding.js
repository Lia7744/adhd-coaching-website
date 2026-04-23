const fs = require('fs');
const file = 'src/app/workbook/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// The user wants to avoid overlap between content and page numbers.
// We'll increase the bottom padding on all sections to make sure there's room.
// We'll replace p-20 with px-20 pt-20 pb-32, p-16 with px-16 pt-16 pb-32, etc.
// And remove any existing pb-* classes.

code = code.replace(/<section className="([\w\s:\[\]-]+)"/g, (match, classes) => {
    if (!classes.includes('print:break-after-page')) return match;
    
    // Remove existing pb-*
    let temp = classes.replace(/pb-\[?[0-9a-zA-Z]+\]?/g, '');
    
    // Expand p-20 and p-16
    temp = temp.replace(/\bp-20\b/g, 'px-20 pt-20');
    temp = temp.replace(/\bp-16\b/g, 'px-16 pt-16');
    
    // Clean up double spaces
    temp = temp.replace(/\s+/g, ' ').trim();
    
    // Add pb-32 (128px) to safely clear the bottom-10 (40px) page numbers
    temp = temp + ' pb-32';
    
    return `<section className="${temp}"`;
});

fs.writeFileSync(file, code);
console.log('Padding adjusted successfully.');
