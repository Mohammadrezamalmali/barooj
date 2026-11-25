# آشکده باروج

صفحهٔ معرفی آشکده باروج با تم مشکی و طلایی، چیدمان فارسی و راست‌به‌چپ و طراحی مناسب موبایل.

## اجرا در ویندوز

پس از نصب Python، مخزن را دانلود یا clone کنید و در پوشهٔ آن اجرا کنید:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py runserver
```

سپس http://127.0.0.1:8000 را در مرورگر باز کنید.

## اجرا در لینوکس و macOS

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python manage.py migrate
.venv/bin/python manage.py runserver
```

## فایل‌های صفحه

- HTML: `sites/barooj/dist/index.html`
- CSS: `sites/barooj/dist/static/barooj/style.css`
- JavaScript: `sites/barooj/dist/static/barooj/app.js`
- عکس و فونت: `sites/barooj/dist/static/barooj/`
- توضیحات تصویر ساخته‌شده و منابع: `sites/barooj/ASSETS.txt`
- مجوز فونت وزیرمتن: `sites/barooj/OFL.txt`

منوی موبایل، فیلتر دسته‌بندی غذاها و پنجرهٔ جزئیات غذا فعال‌اند. منو نمونه است و ثبت سفارش و پرداخت پیاده‌سازی نشده‌اند.

## بررسی پروژه

```powershell
.\.venv\Scripts\python.exe manage.py check
.\.venv\Scripts\python.exe verify_site.py
```

تنظیمات فعلی برای توسعهٔ محلی‌اند. برای استقرار سرور Django، متغیر محیطی `DJANGO_SECRET_KEY` را با مقدار ثابت و خصوصی تنظیم کنید و تنظیمات `DEBUG` و `ALLOWED_HOSTS` را متناسب با میزبان تغییر دهید. در اجرای محلی، کلید موقت خودکار ساخته می‌شود. دیتابیس و محیط مجازی داخل Git قرار نمی‌گیرند.
