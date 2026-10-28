import importlib.util
import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch
from datetime import datetime, timezone

spec = importlib.util.spec_from_file_location('news', Path(__file__).with_name('update-tech-news.py'))
news = importlib.util.module_from_spec(spec)
spec.loader.exec_module(news)
NOW = datetime(2026, 10, 27, 12, tzinfo=timezone.utc)
SOURCE = {'name': 'Example', 'hosts': ['example.com'], 'url': 'https://example.com/rss'}


def rss(items):
    return ('<rss><channel>' + ''.join('<item><title>' + title + '</title><link>' + link + '</link><pubDate>' + date + '</pubDate></item>' for title, link, date in items) + '</channel></rss>').encode()


class FeedTests(unittest.TestCase):
    def test_deduplicates_and_filters_unknown_hosts_and_dates(self):
        data = rss([
            ('Recent', 'https://example.com/recent', 'Mon, 26 Oct 2026 10:00:00 GMT'),
            ('Duplicate', 'https://example.com/recent', 'Mon, 26 Oct 2026 10:00:00 GMT'),
            ('Old', 'https://example.com/old', 'Thu, 01 Jan 2026 10:00:00 GMT'),
            ('Future', 'https://example.com/future', 'Mon, 26 Oct 2027 10:00:00 GMT'),
            ('Unknown host', 'https://example.com.attacker.test/x', 'Mon, 26 Oct 2026 10:00:00 GMT'),
            ('Unsafe scheme', 'javascript:alert(1)', 'Mon, 26 Oct 2026 10:00:00 GMT'),
            ('Credentials', 'https://name:secret@example.com/x', 'Mon, 26 Oct 2026 10:00:00 GMT'),
            ('Missing date', 'https://example.com/missing', ''),
        ])
        self.assertEqual([item['title'] for item in news.parse_feed(data, SOURCE, NOW)], ['Recent'])

    def test_atom_and_html_title(self):
        data = b'''<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>&lt;b&gt;Tools&lt;/b&gt; &amp; updates</title><link rel="self" href="https://example.com/api"/><link rel="alternate" href="https://example.com/story"/><published>2026-10-26T10:00:00Z</published></entry></feed>'''
        result = news.parse_feed(data, SOURCE, NOW)
        self.assertEqual(result[0]['title'], 'Tools & updates')
        self.assertEqual(result[0]['url'], 'https://example.com/story')

    def test_rejects_entities_oversized_and_invalid_xml(self):
        for payload in [b'<!DOCTYPE rss [<!ENTITY x "bad">]><rss/>', b'x' * (news.MAX_BYTES + 1), b'<rss><broken>']:
            with self.assertRaises(Exception):
                news.parse_feed(payload, SOURCE, NOW)

    def test_preserves_recent_snapshot_when_all_sources_fail(self):
        with TemporaryDirectory() as folder:
            path = Path(folder) / 'headlines.json'
            now = datetime.now(timezone.utc).isoformat()
            data = {'updatedAt': now, 'sources': [{'name': 'Example', 'checkedAt': now}], 'items': [{'title': 'Existing', 'url': 'https://example.com/existing', 'source': 'Example', 'publishedAt': now}]}
            path.write_text(json.dumps(data))
            with patch.object(news, 'OUTPUT', path), patch.object(news, 'SOURCES', [SOURCE]), patch.object(news, 'fetch_source', side_effect=OSError('offline')):
                news.refresh()
            result = json.loads(path.read_text())
            self.assertEqual(result['updatedAt'], now)
            self.assertEqual(result['items'], data['items'])
            self.assertEqual(result['sources'][0]['checkedAt'], now)

    def test_partial_failure_keeps_other_publishers(self):
        with TemporaryDirectory() as folder:
            path = Path(folder) / 'headlines.json'
            now = datetime.now(timezone.utc).isoformat()
            path.write_text(json.dumps({'updatedAt': None, 'sources': [], 'items': []}))
            other = {**SOURCE, 'name': 'Other'}
            def fetch(source, _now):
                if source['name'] == 'Other':
                    raise OSError('unavailable')
                return [{'title': 'New', 'url': 'https://example.com/new', 'source': 'Example', 'publishedAt': now}]
            with patch.object(news, 'OUTPUT', path), patch.object(news, 'SOURCES', [SOURCE, other]), patch.object(news, 'fetch_source', side_effect=fetch):
                news.refresh()
            result = json.loads(path.read_text())
            self.assertEqual(len(result['items']), 1)
            self.assertIsNotNone(result['sources'][0]['checkedAt'])
            self.assertIsNone(result['sources'][1]['checkedAt'])


if __name__ == '__main__':
    unittest.main()
