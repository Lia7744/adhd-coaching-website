const fs = require('fs');
let code = fs.readFileSync('src/app/workbook/page.tsx', 'utf8');

// 1. Shrink the massive Chapter Title Fonts
code = code.replace(/text-\[149px\]/g, 'text-[110px]');
code = code.replace(/text-\[93px\]/g, 'text-[72px]');

// 2. Add an explicit class to Chapter Title sections to allow them to vertically center again
code = code.replace(/<section className="print:break-after-page min-h-\[970px\] relative p-20 flex flex-col   items-center  p-20 text-center"/g, 
                    '<section className="print:break-after-page min-h-[970px] relative p-20 flex flex-col justify-center items-center text-center chapter-cover"');

// 3. Inject the CSS rule for chapter-cover into the print style block
code = code.replace(/justify-content: flex-start !important;/g, 'justify-content: flex-start !important; }\n          section.chapter-cover {\n            justify-content: center !important;\n          }')

fs.writeFileSync('src/app/workbook/page.tsx', code);
console.log('Fixed chapter headings!');
