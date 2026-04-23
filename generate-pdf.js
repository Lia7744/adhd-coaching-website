const puppeteer = require('puppeteer');

(async () => {
  console.log("Starting perfectly synced PDF export...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set perfectly scaled digital viewport 
  await page.setViewport({
    width: 800,
    height: 1250,
    deviceScaleFactor: 2, // High DPI for crisp text
  });

  // Navigate to your local server
  console.log("Loading page data...");
  await page.goto('http://localhost:3000/workbook', {
    waitUntil: 'networkidle0', // Wait until all images and fonts are 100% loaded
    timeout: 30000,
  });

  // Give images explicit time to buffer into memory
  await new Promise(r => setTimeout(r, 2000)); // 2 second blanket wait 
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('img'));
    await Promise.all(images.map(img => {
      if (img.complete) return;
      return new Promise((resolve) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve); // resolve on error to prevent total freeze
      });
    }));
  });

  // Generate PDF utilizing scale 0.65 to squish Web-DOM elements safely onto PDF pages, yielding ~56 pages max.
  await page.pdf({
    path: 'ADHD_Workbook_Final.pdf',
    format: 'Letter',
    scale: 0.65, 
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="width: 100%; text-align: right; font-size: 24px; font-family: sans-serif; font-weight: 900; opacity: 0.30; padding-right: 0.75in; letter-spacing: 2px;"><span class="pageNumber"></span></div>',
    margin: {
      top: '0.75in',
      bottom: '0.75in', // Consistent bottom margin
      left: '0.75in',
      right: '0.75in'
    }
  });

  await browser.close();
  console.log("✅ DONE! The flawless 'ADHD_Workbook_Final.pdf' has been saved to your main folder!");
})();
