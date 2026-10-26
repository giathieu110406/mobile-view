---
name: mobile-view
description: Use when user wants to simulate, inspect, preview, or test web pages (including localhost and external domains) in mobile and tablet viewports with device frames, responsive resolutions, and mobile user-agent spoofing.
author: Lychee
version: 1.0.0
---

# Mobile View Skill for Antigravity

**Tác giả:** Lychee  
**Phiên bản:** 1.0.0  

Kỹ năng native cho phép Antigravity giả lập, hiển thị và kiểm thử giao diện điện thoại/máy tính bảng (iPhone, iPad, Google Pixel, Galaxy, tùy biến kích thước) trực tiếp trên trình duyệt Chrome/Chromium.

Hỗ trợ kiểm thử cả các trang web trực tuyến và **máy chủ cục bộ (`localhost`, `127.0.0.1`, các cổng dev server `3000`, `5173`, `8080`, v.v.)** mà không bị chặn quyền truy cập hay xung đột CORS/CSP frame.

---

## 1. Tính năng cốt lõi

- **Mô phỏng đa thiết bị:** Hỗ trợ iPhone 12/13/14/15/Pro Max, Google Pixel, iPad, Samsung Galaxy cùng khung máy (device bezel) chân thực.
- **Tương thích toàn diện Localhost:** Tự động bypass các rào cản X-Frame-Options, Content-Security-Policy (CSP) và cấp quyền truy cập trực tiếp cho máy chủ nội bộ.
- **Chụp ảnh mô phỏng tự động:** Hỗ trợ chụp ảnh màn hình chính xác giao diện di động trong quá trình chạy tự động (automated workflows / CI / agent testing).
- **Hỗ trợ tương tác trực tiếp:** Tùy chọn giữ trình duyệt mở (`--keep-open`) để người dùng tương tác trực tiếp với giao diện cảm ứng mô phỏng.

---

## 2. Cách chạy nhanh qua Script Runner

Để kiểm tra hoặc chụp ảnh bất kỳ trang web nào ở chế độ Mobile View:

```bash
# Cú pháp tổng quát:
node C:\Users\Giath\.gemini\config\skills\mobile-view\scripts\runner.cjs "<URL>" "<Đường_dẫn_ảnh_kết_quả.png>"

# Ví dụ kiểm tra một trang web công khai:
node C:\Users\Giath\.gemini\config\skills\mobile-view\scripts\runner.cjs "https://word2latex.io.vn" "C:\Users\Giath\.gemini\antigravity\brain\mobile-view-result.png"

# Ví dụ kiểm tra dự án dev localhost:
node C:\Users\Giath\.gemini\config\skills\mobile-view\scripts\runner.cjs "http://localhost:3000" "output-localhost.png"

# Giữ trình duyệt mở để tương tác thủ công:
node C:\Users\Giath\.gemini\config\skills\mobile-view\scripts\runner.cjs "http://localhost:5173" --keep-open
```

---

## 3. Cấu trúc Skill

- `SKILL.md`: Tài liệu hướng dẫn định tuyến và sử dụng cho AI Agent.
- `scripts/runner.cjs`: Script điều khiển Playwright tự động nạp extension Mobile View, điều hướng trang web, inject giả lập di động và chụp ảnh kết quả.
- Thư mục nguồn Extension gốc: `C:\Users\Giath\OneDrive\Tài liệu\Thư mục mới\Antigravity\projects\mobile-view` (liên kết qua junction `C:\Users\Giath\.gemini\antigravity\scratch\mobile-view`).
