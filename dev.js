const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe')
];

function findChrome() {
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const chromePath = findChrome();
if (!chromePath) {
  console.error('❌ Không tìm thấy Google Chrome trên máy tính!');
  process.exit(1);
}

const EXT_DIR = __dirname;
const DEV_PROFILE_DIR = path.join(EXT_DIR, '.dev-profile');

if (!fs.existsSync(DEV_PROFILE_DIR)) {
  fs.mkdirSync(DEV_PROFILE_DIR, { recursive: true });
}

console.log('=====================================================');
console.log('🚀 Đang khởi động Google Chrome ở chế độ Extension Dev...');
console.log(`📂 Extension directory: ${EXT_DIR}`);
console.log(`👤 Dev Profile: ${DEV_PROFILE_DIR}`);
console.log('=====================================================');
console.log('💡 HƯỚNG DẪN DEV:');
console.log('1. Chrome sẽ tự động nạp extension Mobile View.');
console.log('2. Bấm vào icon mảnh ghép Extensions trên Chrome để ghim Mobile View.');
console.log('3. Mở bất kỳ trang web nào (ví dụ vnexpress.net, google.com) và bật Mobile View.');
console.log('4. Khi bạn sửa code trong thư mục này, chỉ cần vào chrome://extensions và bấm nút Reload 🔄 để cập nhật.');
console.log('=====================================================\n');

const chromeArgs = [
  `--load-extension=${EXT_DIR}`,
  `--disable-extensions-except=${EXT_DIR}`,
  `--user-data-dir=${DEV_PROFILE_DIR}`,
  '--no-first-run',
  '--no-default-browser-check',
  'https://news.ycombinator.com/'
];

const chromeProcess = spawn(chromePath, chromeArgs, {
  detached: false,
  stdio: 'inherit'
});

chromeProcess.on('close', (code) => {
  console.log(`\n🛑 Trình duyệt Dev đã đóng (code: ${code}). Kết thúc phiên dev.`);
  process.exit(0);
});
