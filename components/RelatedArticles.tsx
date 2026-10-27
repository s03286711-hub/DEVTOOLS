import Link from 'next/link';
import { blogPosts } from '@/lib/blog';

export default function RelatedArticles({ toolSlug }: { toolSlug: string }) {
  const posts = blogPosts.filter((post) => post.relatedTool === toolSlug).slice(0, 3);
  if (!posts.length) return null;
  return (
    <section className="mt-10" aria-label="Related tutorials">
      <h2 className="text-xl font-extrabold">Tutorials for this tool</h2>
      <div className="mt-4 grid gap-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}/`} className="block rounded-xl border border-[#e6e8ef] bg-white p-5 hover:border-[#8fd8cd]">
            <span className="font-bold text-[#0f766e]">{post.title}</span>
            <span className="mt-2 block text-sm leading-6 text-[#667085]">{post.excerpt}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
