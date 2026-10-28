"""Check the static export that will actually be deployed, including RSS."""
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone


class Page(HTMLParser):
    def __init__(self, content):
        super().__init__()
        self.canonical = []
        self.meta = {}
        self.meta_counts = {}
        self.title_count = 0
        self.hrefs = []
        self.ids = set()
        self.tool_ids = []
        self.question_ids = []
        self.answer_ids = []
        self.source_ids = []
        self.source_urls = []
        self.times = []
        self.all_ids = []
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
            self.all_ids.append(attrs['id'])
        if 'data-tool-id' in attrs:
            self.tool_ids.append(attrs['data-tool-id'])
        if 'data-question-id' in attrs:
            self.question_ids.append(attrs['data-question-id'])
        if 'data-answer-id' in attrs:
            self.answer_ids.append(attrs['data-answer-id'])
        if 'data-source-id' in attrs:
            self.source_ids.append(attrs['data-source-id'])
        if tag == 'a' and 'data-research-source' in attrs:
            self.source_urls.append(attrs['href'])
        if tag == 'time' and 'datetime' in attrs:
            self.times.append(attrs['datetime'])
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
        if path.startswith('/ai-questions/'):
            assert len(page.all_ids) == len(page.ids), f'{path}: duplicate IDs break answer links'
            if path == '/ai-questions/':
                collection = next(schema for schema in page.schemas if schema.get('@type') == 'CollectionPage')
                entries = collection['mainEntity']['itemListElement']
                assert collection['mainEntity']['numberOfItems'] == len(page.question_ids) == len(entries), 'AI question collection count mismatch'
                assert [item['url'] for item in entries] == [f'{expected}{slug}/' for slug in page.question_ids], 'AI question collection differs from visible guides'
            else:
                articles = [schema for schema in page.schemas if schema.get('@type') == 'Article']
                assert len(articles) == 1, f'{path}: expected one research Article'
                article = articles[0]
                assert article['url'] == expected == article['mainEntityOfPage']['@id'], f'{path}: incorrect article URL'
                assert article['datePublished'] in page.times and article['dateModified'] in page.times, f'{path}: dates differ from visible dates'
                assert article['datePublished'] <= article['dateModified'], f'{path}: review date before publication'
                assert set(article['citation']) == set(page.source_urls), f'{path}: schema citations differ from visible citations'
                assert page.source_ids and len(page.source_ids) == len(set(page.source_ids)), f'{path}: missing or duplicated source entries'
                assert page.answer_ids and all(answer in page.ids for answer in page.answer_ids), f'{path}: missing answer anchors'
                assert all(url.startswith('https://') for url in page.source_urls), f'{path}: insecure source link'
                assert any(schema.get('@type') == 'BreadcrumbList' for schema in page.schemas), f'{path}: missing research breadcrumbs'
        if path.startswith('/ai-tools/'):
            collections = [schema for schema in page.schemas if schema.get('@type') == 'CollectionPage']
            assert len(collections) == 1, f'{path}: expected one AI collection'
            collection = collections[0]
            assert collection['url'] == expected, f'{path}: incorrect collection URL'
            items = collection['mainEntity']['itemListElement']
            assert collection['mainEntity']['numberOfItems'] == len(page.tool_ids) == len(items), f'{path}: collection count differs from visible tools'
            assert len(page.tool_ids) == len(set(page.tool_ids)), f'{path}: duplicate tool cards'
            assert [item['position'] for item in items] == list(range(1, len(items) + 1)), f'{path}: invalid list positions'
            assert [item['url'] for item in items] == [f'{expected}#{tool_id}' for tool_id in page.tool_ids], f'{path}: collection links differ from visible tools'
            assert all(tool_id in page.ids for tool_id in page.tool_ids), f'{path}: missing tool anchors'
        for href in page.hrefs:
            target = urlsplit(href)
            if target.scheme or target.netloc:
                continue
            if not target.path:
                assert not target.fragment or unquote(target.fragment) in page.ids, f'{path}: missing anchor {href}'
                continue
            route = target.path.rstrip('/') + '/'
            assert route in pages or (root / target.path.lstrip('/')).is_file(), f'{path}: broken link {href}'
            if route in pages and target.fragment:
                assert unquote(target.fragment) in pages[route].ids, f'{path}: broken cross-page anchor {href}'
    for url in locations:
        assert urlsplit(url).path in pages, f'Sitemap route not exported: {url}'
    feed = ET.parse(root / 'feed.xml')
    items = feed.findall('./channel/item')
    assert items, 'Empty RSS feed'
    assert len(items) == len({item.findtext('guid') for item in items}), 'Duplicate RSS items'
    for item in items:
        assert urlsplit(item.findtext('link')).path in pages, 'RSS link does not resolve'
        assert item.findtext('title') and item.findtext('pubDate'), 'Incomplete RSS item'
    news_pages = {path: page for path, page in pages.items() if path.startswith('/news/') and path != '/news/'}
    news = [page for page in news_pages.values() if any(schema.get('@type') == 'NewsArticle' for schema in page.schemas)]
    assert len(news) >= 3, 'News explainers missing'
    for path, page in news_pages.items():
        assert any(schema.get('@type') in ['NewsArticle', 'CollectionPage'] for schema in page.schemas), f'{path}: missing news or collection markup'
    news_ns = {**ns, 'n': 'http://www.google.com/schemas/sitemap-news/0.9'}
    recent = ET.parse(root / 'news-sitemap.xml').findall('s:url', news_ns)
    assert len(recent) <= 1000, 'Too many entries in news sitemap'
    now = datetime.now(timezone.utc)
    seen = set()
    for entry in recent:
        url = entry.findtext('s:loc', namespaces=news_ns)
        assert url not in seen, 'Duplicate news sitemap URL'
        seen.add(url)
        assert urlsplit(url).path in news_pages, 'News sitemap route missing'
        page = news_pages[urlsplit(url).path]
        article = next((schema for schema in page.schemas if schema.get('@type') == 'NewsArticle'), None)
        assert article, 'News sitemap contains a non-article'
        block = entry.find('n:news', news_ns)
        assert block is not None, 'News metadata missing'
        assert block.findtext('n:publication/n:language', namespaces=news_ns) == 'en'
        assert block.findtext('n:publication/n:name', namespaces=news_ns), 'Publication name missing'
        assert block.findtext('n:title', namespaces=news_ns) == article['headline'], 'News headline mismatch'
        date = block.findtext('n:publication_date', namespaces=news_ns)
        assert date == article['datePublished'], 'News publication date mismatch'
        published = datetime.fromisoformat(date.replace('Z', '+00:00'))
        if published.tzinfo is None:
            published = published.replace(tzinfo=timezone.utc)
        assert now - timedelta(hours=48) <= published <= now, 'News sitemap includes an old or future article'
    assert '/news-sitemap.xml' in (root / 'robots.txt').read_text(), 'News sitemap not advertised to crawlers'
    print(f'Export checks passed: {len(titles)} pages, {len(locations)} sitemap URLs, {len(items)} RSS items, and {len(news)} news explainers.')


if __name__ == '__main__':
    audit()
