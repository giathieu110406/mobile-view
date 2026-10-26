const path = require('path');
const fs = require('fs');

let playwright;
try {
  playwright = require('playwright');
} catch (e) {
  const fallbackPaths = [
    'c:\\Users\\Giath\\OneDrive\\Tài liệu\\Thư mục mới\\Antigravity\\projects\\mobile-view\\node_modules\\playwright',
    'C:\\Users\\Giath\\.gemini\\antigravity\\scratch\\node_modules\\playwright'
  ];
  for (const fb of fallbackPaths) {
    if (fs.existsSync(fb)) {
      playwright = require(fb);
      break;
    }
  }
}

const { chromium } = playwright;
const EXT_PATH = 'C:\\Users\\Giath\\.gemini\\antigravity\\scratch\\mobile-view';
const USER_DATA_DIR = 'C:\\Users\\Giath\\.gemini\\antigravity\\scratch\\mobile-view-profile';

const CONTENT_FILES = [
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
];

async function runMobileView(options = {}) {
  const targetUrl = options.url || process.argv[2] || 'https://word2latex.io.vn';
  const screenshotPath = options.screenshot || process.argv[3] || 'C:\\Users\\Giath\\.gemini\\antigravity\\brain\\effc15ce-10aa-4495-b3f4-c64b2646bd63\\word2latex-mobile.png';
  const headless = options.headless !== undefined ? options.headless : false;
  const waitMs = options.waitMs || 8000;

  console.log('=====================================================');
  console.log('🚀 [Mobile View Skill] Khởi động trình duyệt...');
  console.log(`🌐 Mục tiêu: ${targetUrl}`);
  console.log('=====================================================');

  const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: headless,
    args: [
      `--disable-extensions-except=${EXT_PATH}`,
      `--load-extension=${EXT_PATH}`,
      '--start-maximized'
    ],
    viewport: null
  });

  let background = context.serviceWorkers()[0];
  if (!background) {
    background = await context.waitForEvent('serviceworker', { timeout: 15000 });
  }

  const extId = background.url().split('/')[2];
  console.log(`✅ Extension Service Worker đã kích hoạt (ID: ${extId})`);

  // Tạo tab mới chuyên biệt cho targetUrl
  const page = await context.newPage();
  console.log(`⏳ Đang điều hướng đến: ${targetUrl} ...`);
  try {
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
  } catch (err) {
    console.warn(`Lưu ý khi điều hướng: ${err.message}`);
  }
  await page.bringToFront();
  await page.waitForTimeout(2000);

  console.log('📱 Đang tìm chính xác target tab và inject Mobile View...');
  const injectResult = await background.evaluate(async ({ targetUrl, files }) => {
    const allTabs = await chrome.tabs.query({});
    const targetTab = allTabs.find(t => t.url && t.url.includes(targetUrl.replace(/^https?:\/\//, '')));
    if (!targetTab) {
      return { error: 'Target tab not found amongst: ' + allTabs.map(t => t.url).join(', ') };
    }

    try {
      await chrome.scripting.executeScript({
        target: { tabId: targetTab.id },
        files: files
      });
      return { success: true, tabId: targetTab.id, url: targetTab.url };
    } catch (e) {
      return { error: e.message };
    }
  }, { targetUrl, files: CONTENT_FILES });

  console.log('Kết quả Inject:', injectResult);

  if (injectResult.success) {
    console.log('🎉 Giao diện Mobile Simulator đã được gắn thành công vào target tab!');
  } else {
    console.warn('⚠️ Lỗi inject Mobile View:', injectResult.error);
  }

  // Chờ đợi giao diện Mobile View render và tải frame
  console.log(`⏳ Đang chờ giao diện Mobile Simulator render (${waitMs}ms)...`);
  await page.waitForTimeout(waitMs);

  // Chụp ảnh màn hình
  const resolvedPath = path.resolve(screenshotPath);
  const dir = path.dirname(resolvedPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await page.screenshot({ path: resolvedPath, fullPage: false });
  console.log(`📸 Đã chụp ảnh màn hình lưu tại: ${resolvedPath}`);

  if (options.keepOpen) {
    console.log('Trình duyệt đang mở. Nhấn Ctrl+C để đóng.');
  } else {
    await context.close();
    console.log('✅ Đã hoàn tất và đóng phiên kiểm thử.');
  }

  return { success: true, screenshotPath: resolvedPath };
}

if (require.main === module) {
  runMobileView({
    url: process.argv[2],
    screenshot: process.argv[3],
    keepOpen: process.argv.includes('--keep-open')
  }).catch(err => {
    console.error('❌ Lỗi:', err);
    process.exit(1);
  });
}

module.exports = { runMobileView };
