"""Check the static export that will actually be deployed, including RSS."""
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self, content):
        super().__init__()
        self.canonical = []
        self.meta = {}
        self.meta_counts = {}
        self.title_count = 0
        self.hrefs = []
        self.ids = set()
        self.h1 = 0
        self.title = ''
        self.in_title = False
        self.in_json = False
        self.json_text = ''
        self.schemas = []
        self.feed(content)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'a' and 'href' in attrs:
            self.hrefs.append(attrs['href'])
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical.append(attrs.get('href'))
        if tag == 'meta':
            key = attrs.get('name', attrs.get('property', ''))
            self.meta[key] = attrs.get('content', '')
            self.meta_counts[key] = self.meta_counts.get(key, 0) + 1
        if tag == 'h1':
            self.h1 += 1
        if tag == 'title':
            self.title_count += 1
            self.in_title = True
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.in_json = True
            self.json_text = ''

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_json:
            self.json_text += data

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'script' and self.in_json:
            parsed = json.loads(self.json_text)
            self.schemas.extend(parsed if isinstance(parsed, list) else [parsed])
            self.in_json = False


def audit():
    root = Path(__file__).resolve().parents[1] / 'out'
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    locations = [entry.text for entry in ET.parse(root / 'sitemap.xml').findall('s:url/s:loc', ns)]
    assert locations and len(locations) == len(set(locations)), 'Missing or duplicate sitemap URLs'
    origin = '{0.scheme}://{0.netloc}'.format(urlsplit(locations[0]))
    pages = {}
    for file in root.rglob('index.html'):
        path = '/' + str(file.parent.relative_to(root)).strip('.') + '/'
        pages[path.replace('//', '/')] = Page(file.read_text())
    titles = set()
    descriptions = set()
    for path, page in pages.items():
        if path == '/404/':
            continue
        expected = origin + path
        assert page.canonical == [expected], f'{path}: incorrect canonical'
        assert page.meta.get('og:url') == expected, f'{path}: incorrect social URL'
        description = page.meta.get('description')
        assert description, f'{path}: missing description'
        assert description not in descriptions, f'{path}: duplicate description'
        descriptions.add(description)
        assert page.title_count == 1, f'{path}: expected one title tag'
        for key in ['description', 'og:title', 'og:description', 'og:url', 'twitter:title', 'twitter:description']:
            assert page.meta_counts.get(key) == 1, f'{path}: missing or duplicated {key}'
        assert page.meta.get('og:description') == description, f'{path}: inconsistent Open Graph description'
        assert page.meta.get('twitter:description') == description, f'{path}: inconsistent Twitter description'
        assert 'noindex' not in page.meta.get('robots', ''), f'{path}: unexpected noindex'
        assert page.h1 == 1, f'{path}: expected one H1'
        assert page.title and page.title not in titles, f'{path}: missing or duplicate title'
        titles.add(page.title)
        assert expected in locations, f'{path}: absent from sitemap'
        for href in page.hrefs:
            target = urlsplit(href)
            if target.scheme or target.netloc:
                continue
            if not target.path:
                assert not target.fragment or unquote(target.fragment) in page.ids, f'{path}: missing anchor {href}'
                continue
            route = target.path.rstrip('/') + '/'
            assert route in pages or (root / target.path.lstrip('/')).is_file(), f'{path}: broken link {href}'
    for url in locations:
        assert urlsplit(url).path in pages, f'Sitemap route not exported: {url}'
    feed = ET.parse(root / 'feed.xml')
    items = feed.findall('./channel/item')
    assert items, 'Empty RSS feed'
    assert len(items) == len({item.findtext('guid') for item in items}), 'Duplicate RSS items'
    for item in items:
        assert urlsplit(item.findtext('link')).path in pages, 'RSS link does not resolve'
        assert item.findtext('title') and item.findtext('pubDate'), 'Incomplete RSS item'
    news = [page for path, page in pages.items() if path.startswith('/news/') and path != '/news/']
    assert len(news) >= 3, 'News explainers missing'
    for page in news:
        assert any(schema.get('@type') == 'NewsArticle' for schema in page.schemas), 'NewsArticle markup missing'
    print(f'Export checks passed: {len(titles)} pages, {len(locations)} sitemap URLs, {len(items)} RSS items, and {len(news)} news explainers.')


if __name__ == '__main__':
    audit()
