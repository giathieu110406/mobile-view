@echo off
chcp 65001 >nul
echo Đang mở Chrome cùng Extension Mobile View qua Playwright CLI...
cd /d "C:\Users\Giath\OneDrive\Tài liệu\Thư mục mới\Antigravity\projects\mobile-view"
playwright-cli open --headed --config=".playwright\cli.config.json" https://example.com
echo.
echo Cửa sổ đã được mở! Bạn có thể gõ các lệnh playwright-cli tiếp theo tại đây.
cmd /k
