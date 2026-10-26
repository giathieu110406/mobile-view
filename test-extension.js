const { chromium } = require('playwright');
const path = require('path');
const readline = require('readline');

async function testMobileView() {
  // Sử dụng đường dẫn junction tương thích 100% với Chromium flag
  const extPath = 'C:\\Users\\Giath\\.gemini\\antigravity\\scratch\\mobile-view';
  const userDataDir = 'C:\\Users\\Giath\\.gemini\\antigravity\\scratch\\test-profile';

  console.log('=====================================================');
  console.log('🚀 Khởi động Playwright Chromium với Extension Mobile View...');
  console.log(`📂 Extension directory: ${extPath}`);
  console.log('=====================================================');

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      `--disable-extensions-except=${extPath}`,
      `--load-extension=${extPath}`,
      '--start-maximized'
    ],
    viewport: null
  });

  console.log('⏳ Đang đợi Extension Service Worker kích hoạt...');
  let background = context.serviceWorkers()[0];
  if (!background) {
    background = await context.waitForEvent('serviceworker', { timeout: 10000 });
  }

  const extId = background.url().split('/')[2];
  console.log(`✅ Extension đã kích hoạt thành công (ID: ${extId})`);

  const page = await context.newPage();
  console.log('🌐 Đang mở trang thử nghiệm: https://example.com ...');
  await page.goto('https://example.com', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  console.log('📱 Đang kích hoạt giao diện mô phỏng Mobile View...');
  const injectResult = await background.evaluate(async () => {
    const allTabs = await chrome.tabs.query({});
    const targetTab = allTabs.find(t => t.url && t.url.startsWith('https://example.com'));
    if (!targetTab) return { error: 'Target tab not found' };

    try {
      await chrome.scripting.executeScript({
        target: { tabId: targetTab.id },
        files: [
          "data/i18n.js",
          "data/robot-i18n.js",
          "data/devices.js",
          "data/workspace-devices.js",
          "data/css.js",
          "data/workspace-css.js",
          "content/constants.js",
          "content/template.js",
          "content/workspace-template.js",
          "content/util.js",
          "content/scroll.js",
          "content/flags.js",
          "content/settings.js",
          "content/shot-preview.js",
          "content/robot.js",
          "content/classic.js",
          "content/workspace-device.js",
          "content/workspace.js",
          "content.js"
        ]
      });
      return { success: true };
    } catch (e) {
      return { error: e.message };
    }
  });

  if (injectResult.success) {
    console.log('🎉 Giao diện Mobile Simulator đã hiển thị thành công!');
  } else {
    console.warn('⚠️ Lỗi kích hoạt:', injectResult.error);
  }

  console.log('\n-----------------------------------------------------');
  console.log('👉 Trình duyệt đang mở để bạn tương tác trực tiếp với Mobile View.');
  console.log('👉 Nhấn [ENTER] trong terminal này hoặc đóng trình duyệt để dừng.');
  console.log('-----------------------------------------------------\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const waitForEnter = new Promise((resolve) => {
    rl.question('Nhấn [ENTER] để kết thúc: ', () => {
      rl.close();
      resolve();
    });
  });

  const waitForClose = new Promise((resolve) => {
    context.on('close', () => {
      resolve();
    });
  });

  await Promise.race([waitForEnter, waitForClose]);

  try {
    await context.close();
  } catch (e) {}

  console.log('Phiên làm việc đã kết thúc.');
  process.exit(0);
}

testMobileView().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
