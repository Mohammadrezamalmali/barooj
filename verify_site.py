"""Smoke-check the landing page and its local assets without a database."""
import os
import re
from html.parser import HTMLParser
from pathlib import Path

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "barooj.settings")

import django

django.setup()

from django.contrib.staticfiles import finders
from django.test import Client, override_settings

root = Path(__file__).parent / "sites" / "barooj" / "dist"
html = (root / "index.html").read_text(encoding="utf-8")
HTMLParser().feed(html)
assets = re.findall(r'(?:src|href)="(/static/[^"]+)"', html)
for asset in assets:
    assert finders.find(asset.removeprefix("/static/")), f"Missing asset: {asset}"
ids = set(re.findall(r'\bid="([^"]+)"', html))
for target in re.findall(r'href="#([^"]+)"', html):
    assert target in ids, f"Missing anchor: {target}"
with override_settings(ALLOWED_HOSTS=["testserver"]):
    response = Client().get("/")
assert response.status_code == 200
assert "آشکده باروج" in response.content.decode()
print(f"PASS: homepage HTTP 200, {len(assets)} local asset references, all internal anchors.")
