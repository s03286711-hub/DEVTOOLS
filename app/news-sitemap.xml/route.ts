import { newsStories } from '@/lib/news';
import { createNewsSitemap } from '@/lib/news-discovery';

export const dynamic = 'force-static';
export function GET() {
  return new Response(createNewsSitemap(newsStories), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
