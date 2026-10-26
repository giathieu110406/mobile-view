const { chromium } = require('playwright');
const path = require('path');
const readline = require('readline');

(async () => {
  const extPath = 'C:\\Users\\Giath\\.gemini\\antigravity\\scratch\\mobile-view';
  const userDataDir = 'C:\\Users\\Giath\\.gemini\\antigravity\\scratch\\mobile-view-profile';

  console.log('Đang khởi chạy trình duyệt nạp Extension Mobile View...');

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      `--disable-extensions-except=${extPath}`,
      `--load-extension=${extPath}`,
      '--start-maximized'
    ],
    viewport: null
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  await page.goto('https://example.com');

  console.log('\n======================================================');
  console.log('✅ TRÌNH DUYỆT ĐÃ NẠP EXTENSION THÀNH CÔNG!');
  console.log('👉 Hãy nhìn góc trên bên phải trình duyệt, bấm biểu tượng mảnh ghép 🧩 để thấy Mobile View.');
  console.log('👉 Nhấn ENTER tại terminal này khi bạn muốn đóng trình duyệt.');
  console.log('======================================================\n');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('', async () => {
    rl.close();
    await context.close();
    process.exit(0);
  });
})();
