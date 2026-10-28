"""Refresh attributed headline links; never copy article bodies or invent news."""
import concurrent.futures
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
import html
import json
from pathlib import Path
import re
import urllib.request
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'data/tech-headlines.json'
SOURCES = [
    {'name': 'Google Blog', 'url': 'https://blog.google/rss/', 'hosts': ['blog.google']},
    {'name': 'Microsoft Blog', 'url': 'https://blogs.microsoft.com/feed/', 'hosts': ['blogs.microsoft.com']},
    {'name': 'Apple Developer', 'url': 'https://developer.apple.com/news/rss/news.rss', 'hosts': ['developer.apple.com']},
]
MAX_BYTES = 2_000_000


def parse_date(value):
    try:
        result = parsedate_to_datetime(value)
    except (ValueError, TypeError):
        result = datetime.fromisoformat(value.replace('Z', '+00:00'))
    if result.tzinfo is None:
        raise ValueError('Publication date has no timezone')
    return result.astimezone(timezone.utc)


def parse_feed(payload, source, now):
    if len(payload) > MAX_BYTES or b'<!ENTITY' in payload.upper() or b'<!DOCTYPE' in payload.upper():
        raise ValueError('Unsupported or oversized XML')
    root = ET.fromstring(payload)
    atom = '{http://www.w3.org/2005/Atom}'
    entries = root.findall('./channel/item') + root.findall(f'{atom}entry')
    items = []
    seen = set()
    for entry in entries:
        title = entry.findtext('title') or entry.findtext(f'{atom}title') or ''
        title = re.sub(r'\s+', ' ', re.sub(r'<[^>]*>', '', html.unescape(title))).strip()
        link = entry.findtext('link') or ''
        if not link:
            link = next((e.get('href', '') for e in entry.findall(f'{atom}link') if e.get('rel', 'alternate') == 'alternate'), '')
        link = link.strip()
        parts = urlsplit(link)
        if parts.scheme != 'https' or parts.hostname not in source['hosts'] or parts.username or parts.password:
            continue
        date = entry.findtext('pubDate') or entry.findtext(f'{atom}published') or entry.findtext(f'{atom}updated')
        try:
            published = parse_date(date or '')
        except (TypeError, ValueError, OverflowError):
            continue
        if not title or len(title) > 240 or link in seen or not now - timedelta(days=45) <= published <= now:
            continue
        seen.add(link)
        items.append({'title': title, 'url': link, 'source': source['name'], 'publishedAt': published.isoformat().replace('+00:00', 'Z')})
    return sorted(items, key=lambda item: item['publishedAt'], reverse=True)[:3]


def fetch_source(source, now):
    request = urllib.request.Request(source['url'], headers={'User-Agent': 'DevXTool-NewsLinks/1.0 (+https://devxtool.me/news/)', 'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml'})
    with urllib.request.urlopen(request, timeout=20) as response:
        payload = response.read(MAX_BYTES + 1)
    items = parse_feed(payload, source, now)
    if not items:
        raise ValueError('No recent dated headlines; retaining previous snapshot')
    return items


def refresh():
    now = datetime.now(timezone.utc)
    previous = json.loads(OUTPUT.read_text()) if OUTPUT.exists() else {'items': [], 'sources': [], 'updatedAt': None}
    items = []
    statuses = []
    successful = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        futures = {source['name']: pool.submit(fetch_source, source, now) for source in SOURCES}
        for source in SOURCES:
            checked = next((item.get('checkedAt') for item in previous['sources'] if item['name'] == source['name']), None)
            try:
                batch = futures[source['name']].result()
                checked = now.isoformat().replace('+00:00', 'Z')
                successful += 1
                print(f"Updated {source['name']}: {len(batch)} links")
            except Exception as error:
                print(f"Warning: {source['name']}: {error}")
                batch = []
                for item in previous['items']:
                    if item.get('source') == source['name']:
                        try:
                            if now - timedelta(days=45) <= parse_date(item['publishedAt']) <= now:
                                batch.append(item)
                        except (ValueError, KeyError, TypeError):
                            pass
            items.extend(batch)
            statuses.append({'name': source['name'], 'feedUrl': source['url'], 'checkedAt': checked})
    # Preserve the last successful date when all publishers are unavailable.
    data = {'updatedAt': now.isoformat().replace('+00:00', 'Z') if successful else previous['updatedAt'], 'sources': statuses, 'items': sorted({item['url']: item for item in items}.values(), key=lambda item: item['publishedAt'], reverse=True)}
    OUTPUT.parent.mkdir(exist_ok=True)
    temp = OUTPUT.with_suffix('.tmp')
    temp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    temp.replace(OUTPUT)
    print(f"Saved {len(data['items'])} headline links; {successful}/{len(SOURCES)} sources refreshed")


if __name__ == '__main__':
    refresh()
