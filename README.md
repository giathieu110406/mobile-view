# Mobile View — Antigravity Native Skill & Chrome Extension

**Tác giả:** Lychee  
**Phiên bản:** 4.2.0 (Extension) / 1.0.0 (Native Skill)  
**Mục đích:** Giả lập, hiển thị và kiểm thử giao diện điện thoại/máy tính bảng responsive trên Chrome/Chromium, hỗ trợ mượt mà cả website công khai và các server dev cục bộ (`localhost`, `127.0.0.1`).

---

## 🌟 Điểm nổi bật

- **Tương thích toàn diện Localhost:** Tự động xử lý và bypass CSP (Content-Security-Policy), X-Frame-Options và cấp quyền truy cập máy chủ nội bộ không bị gián đoạn.
- **Mô phỏng đa thiết bị:** iPhone 12/13/14/15/Pro Max, Google Pixel, iPad, Samsung Galaxy với viền máy và cảm ứng chân thực.
- **Tích hợp Native Skill cho Antigravity:** Có thể gọi tự động qua script runner trong các luồng kiểm thử tự động của agentic AI.

---

## 🚀 Cài đặt & Sử dụng

### 1. Dùng như một Chrome Extension thông thường
1. Vào `chrome://extensions` trên trình duyệt Chrome/Edge.
2. Bật **Developer mode** (Chế độ nhà phát triển) ở góc trên bên phải.
3. Bấm **Load unpacked** (Tải tiện ích đã giải nén) và chọn thư mục này.

### 2. Dùng như Native Skill trong Antigravity
Skill được đặt tại `~/.gemini/config/skills/mobile-view/`. Để chạy kiểm thử hoặc chụp ảnh nhanh:

```bash
# Chạy và chụp ảnh màn hình giao diện di động:
node skill/scripts/runner.cjs "https://word2latex.io.vn" "screenshot.png"

# Chạy trên máy chủ dev localhost:
node skill/scripts/runner.cjs "http://localhost:3000" "output-local.png"

# Giữ trình duyệt mở để tương tác trực tiếp:
node skill/scripts/runner.cjs "http://localhost:5173" --keep-open
```

---

## 📁 Cấu trúc Thư mục

- `manifest.json`, `background.js`, `content.js`: Mã nguồn Chrome Extension Manifest V3.
- `skill/`: Đóng gói Antigravity Native Skill (`SKILL.md` và `scripts/runner.cjs`).
- `data/`, `content/`: Dữ liệu thiết bị mô phỏng, stylesheet và logic giao diện.

---
Licence: MIT / ISC  
Author: Lychee
