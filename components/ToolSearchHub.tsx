'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Sparkles, X, ArrowUpRight, Filter } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import type { Tool } from '@/lib/site';

interface ToolSearchHubProps {
  initialTools: Tool[];
  showCategories?: boolean;
  placeholder?: string;
  className?: string;
}

export default function ToolSearchHub({
  initialTools,
  showCategories = true,
  placeholder = 'Search tools by name, topic, or keyword (e.g. json, regex, sha256, base64)...',
  className = '',
}: ToolSearchHubProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(initialTools.map((t) => t.category)));
    return ['All', ...unique];
  }, [initialTools]);

  const filteredTools = useMemo(() => {
    const q = query.toLowerCase().trim();
    return initialTools.filter((t) => {
      const matchesCategory =
        selectedCategory === 'All' || t.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!q) return true;

      const titleMatch = t.title.toLowerCase().includes(q);
      const shortMatch = t.short.toLowerCase().includes(q);
      const categoryMatch = t.category.toLowerCase().includes(q);
      const keywordsMatch = t.keywords?.toLowerCase().includes(q);

      return titleMatch || shortMatch || categoryMatch || keywordsMatch;
    });
  }, [initialTools, query, selectedCategory]);

  return (
    <div className={`w-full ${className}`}>
      {/* Search Input Box */}
      <div className="relative mx-auto max-w-2xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#98a2b3]">
          <Search size={20} />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search developer tools"
          className="w-full rounded-2xl border-2 border-[#e6e8ef] bg-white py-3.5 pl-12 pr-12 text-base font-medium text-[#101828] placeholder-[#98a2b3] shadow-sm transition duration-200 focus:border-[#0d9488] focus:outline-none focus:ring-4 focus:ring-[#0d9488]/10"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#98a2b3] hover:text-[#475467]"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Category Pills & Quick Filters */}
      {showCategories && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#667085]">
            <Filter size={13} /> Filter:
          </span>
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition duration-200 ${
                  active
                    ? 'bg-[#0d9488] text-white shadow-sm'
                    : 'border border-[#e6e8ef] bg-white text-[#475467] hover:border-[#8fd8cd] hover:text-[#0d9488]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Results Header */}
      <div className="mt-8 flex items-center justify-between border-b border-[#edf0f5] pb-3 text-sm text-[#667085]">
        <span>
          Showing <strong className="text-[#101828]">{filteredTools.length}</strong> of{' '}
          {initialTools.length} tools
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          {query ? ` for "${query}"` : ''}
        </span>
        {(query || selectedCategory !== 'All') && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCategory('All');
            }}
            className="font-semibold text-[#0d9488] hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Grid of Tools */}
      {filteredTools.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-[#d0d5dd] bg-white p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f2f4f7] text-[#667085]">
            <Sparkles size={22} />
          </div>
          <h3 className="mt-4 text-base font-bold text-[#101828]">No tools found</h3>
          <p className="mt-1 text-sm text-[#667085]">
            No utilities matched &ldquo;{query}&rdquo;. Try another term like &ldquo;JSON&rdquo;, &ldquo;Regex&rdquo;, or &ldquo;Hash&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCategory('All');
            }}
            className="btn btn-secondary mt-5"
          >
            Clear search filters
          </button>
        </div>
      )}
    </div>
  );
}
