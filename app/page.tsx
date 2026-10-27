import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Newspaper, BookOpen, CheckCircle2, Code2, LockKeyhole, Zap } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import ToolSearchHub from '@/components/ToolSearchHub';
import { tools, guides, siteConfig } from '@/lib/site';
import { blogPosts } from '@/lib/blog';
export const metadata = pageMetadata({ title: 'Free Online Developer Tools & Practical Tutorials', description: siteConfig.description, path: '/' });

export default function Home(){return <main><section className="relative overflow-hidden border-b border-[#eef0f7] bg-[radial-gradient(ellipse_at_50%_0%,#e6f7f3_0%,#fff_56%)]"><div className="container grid min-h-[530px] items-center gap-12 py-20 lg:grid-cols-[1.1fr_.9fr]"><div><div className="anim-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-[#bfe9e2] bg-white/80 px-3 py-1.5 text-xs font-bold text-[#0d9488]"><span className="h-2 w-2 rounded-full bg-emerald-500"/> Free tools. No account needed.</div><h1 className="anim-fade-up d1 max-w-2xl text-5xl font-black leading-[1.07] tracking-[-.06em] sm:text-6xl">Free developer tools.<br/><span className="gradient-text">Everyday problems, solved.</span></h1><p className="anim-fade-up d2 mt-6 max-w-xl text-lg leading-8 text-[#667085]">A practical toolbox for developers and problem-solvers. Format JSON, compare text, encode URLs, decode Base64, and test regex — right in your browser.</p><div className="anim-fade-up d3 mt-8 flex flex-wrap gap-3"><Link className="btn btn-primary !px-5 !py-3" href="#tools" prefetch={false}>Explore all tools <ArrowRight size={17}/></Link><Link className="btn btn-secondary !px-5 !py-3" href="#how-it-works" prefetch={false}>How it works</Link></div><div className="anim-fade-up d4 mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#667085]"><span className="inline-flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-600"/> Free to use</span><span className="inline-flex items-center gap-1.5"><LockKeyhole size={16} className="text-emerald-600"/> Browser-first</span><span className="inline-flex items-center gap-1.5"><Zap size={16} className="text-emerald-600"/> No setup</span></div></div><div className="anim-fade-up d2 relative mx-auto w-full max-w-md"><div className="anim-blob absolute -inset-5 rounded-[36px] bg-gradient-to-br from-[#a7f3ea] via-[#cffafe] to-[#d7f8e9] blur-2xl"/><div className="anim-float panel relative overflow-hidden !rounded-2xl border-white/80 shadow-soft"><div className="flex items-center gap-2 border-b border-[#eef0f6] px-5 py-4"><span className="h-2.5 w-2.5 rounded-full bg-[#ff7777]"/><span className="h-2.5 w-2.5 rounded-full bg-[#ffc75f]"/><span className="h-2.5 w-2.5 rounded-full bg-[#59d6a1]"/><span className="ml-2 text-xs font-semibold text-[#667085]">JSON Formatter</span><span className="ml-auto rounded-md bg-[#ecfdf3] px-2 py-1 text-[10px] font-bold text-[#067647]">VALID</span></div><div className="bg-[#fcfcff] p-5 font-mono text-xs leading-7 sm:text-sm"><div><span className="text-[#0d9488]">{`{`}</span></div><div className="pl-5"><span className="text-[#d45d89]">"name"</span><span className="text-[#667085]">: </span><span className="text-[#198568]">"DevX Tool"</span><span>,</span></div><div className="pl-5"><span className="text-[#d45d89]">"free"</span><span className="text-[#667085]">: </span><span className="text-[#3d65c5]">true</span><span>,</span></div><div className="pl-5"><span className="text-[#d45d89]">"tools"</span><span className="text-[#667085]">: [</span></div><div className="pl-10 text-[#198568]">"JSON",</div><div className="pl-10 text-[#198568]">"Text diff",</div><div className="pl-10 text-[#198568]">"URL encoder"</div><div className="pl-5 text-[#667085]">]</div><div className="text-[#0d9488]">{`}`}</div></div><div className="flex items-center justify-between border-t border-[#eef0f6] px-5 py-4"><span className="text-xs text-[#667085]">Formatted successfully</span><span className="flex items-center gap-1.5 text-xs font-bold text-[#0d9488]"><Code2 size={15}/> Copy output</span></div></div><div className="panel absolute -bottom-12 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-3 p-3 shadow-soft"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9fbf2] text-[#0c9b69]"><LockKeyhole size={20}/></span><div><div className="text-sm font-extrabold">Privacy-conscious</div><div className="mt-0.5 text-xs text-[#667085]">Local processing where possible</div></div></div></div></div></section>
<section id="tools" className="section"><div className="container"><div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">The toolbox</p><h2 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">The right tool for the task.</h2><p className="mt-3 max-w-xl leading-7 text-[#667085]">Focused utilities that do one job well, with clear controls and no account required.</p></div><div className="flex items-center gap-3"><Link href="/tools" prefetch={false} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0d9488] hover:underline">View full directory <ArrowUpRight size={16}/></Link><span className="tag">{tools.length} free tools available</span></div></div><ToolSearchHub initialTools={tools}/></div></section>
<section id="how-it-works" className="border-y border-[#eef0f7] bg-[#f8f9fc] py-16"><div className="container"><div className="mx-auto mb-10 max-w-2xl text-center"><p className="eyebrow">Simple by design</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em]">Useful tools, without the friction.</h2><p className="mt-3 leading-7 text-[#667085]">Open a tool, enter your data, and get a result. No account or setup required.</p></div><div className="grid gap-5 md:grid-cols-3"><div className="rounded-2xl border border-[#e8eaf2] bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f7f3] text-[#0d9488]"><Zap size={21}/></span><h3 className="mt-4 font-extrabold">Quick to use</h3><p className="mt-2 text-sm leading-6 text-[#667085]">Focused interfaces help you complete common tasks without navigating a complicated app.</p></div><div className="rounded-2xl border border-[#e8eaf2] bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eafbf2] text-[#13865b]"><LockKeyhole size={21}/></span><h3 className="mt-4 font-extrabold">Browser-first approach</h3><p className="mt-2 text-sm leading-6 text-[#667085]">The included tools process inputs locally where practical. Avoid entering secrets into any online tool.</p></div><div className="rounded-2xl border border-[#e8eaf2] bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff2e8] text-[#b65b19]"><Code2 size={21}/></span><h3 className="mt-4 font-extrabold">Made for real tasks</h3><p className="mt-2 text-sm leading-6 text-[#667085]">Helpful defaults, clear error messages, and straightforward output controls.</p></div></div></div></section>
<section id="guides" className="section"><div className="container"><div className="mb-8"><p className="eyebrow">Learn as you go</p><h2 className="mt-3 text-3xl font-black tracking-[-.045em]">Practical guides, not guesswork.</h2><p className="mt-3 text-[#667085]">Understand the concepts behind the tools and avoid common mistakes.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{guides.map((g,i)=><Link key={g.slug} href={`/guides/${g.slug}`} prefetch={false} className="group rounded-2xl border border-[#e6e8ef] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#8fd8cd] hover:shadow-soft"><span className="text-xs font-bold uppercase tracking-wider text-[#5f938a]">Guide 0{i+1}</span><h3 className="mt-3 text-lg font-extrabold leading-snug">{g.title}</h3><p className="mt-2 text-sm leading-6 text-[#667085]">{g.description}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#0d9488]">Read guide <ArrowUpRight size={15}/></span></Link>)}</div></div></section>
      {/* Featured Engineering Tech Blog Section */}
      <section id="blog" className="border-t border-[#eef0f7] bg-[#fbfcfe] py-20">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow inline-flex items-center gap-1.5">
                <Newspaper size={14} /> Practical tutorials
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">
                Developer tutorials &amp; troubleshooting
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[#667085]">
                Step-by-step help with JSON files, Base64 commands, URL encoding, timestamps, regular expressions, and file checksums on Windows, Mac, and Linux.
              </p>
            </div>
            <Link
              href="/blog"
              prefetch={false}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0d9488] hover:underline"
            >
              Explore all {blogPosts.length} articles <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 6).map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between rounded-2xl border border-[#e6e8ef] bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-[#8fd8cd] hover:shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-[#f0fdfa] px-2 py-0.5 text-[11px] font-bold text-[#0f766e]">
                      {post.category}
                    </span>
                    <span className="text-[11px] font-medium text-[#98a2b3]">
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-extrabold leading-snug tracking-tight text-[#101828]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#0d9488] transition"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#667085] line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#f2f4f7] pt-4 flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0d9488] hover:underline"
                  >
                    Read article <ArrowUpRight size={14} />
                  </Link>
                  <span className="text-[11px] font-medium text-[#98a2b3]">
                    {post.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

<section className="pb-20"><div className="container"><div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#0b2523] p-8 text-white sm:flex-row sm:items-center sm:p-10"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#99f6e4]">Ready when you are</p><h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Get back to the work that matters.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#bfe3dd]">Pick a tool and finish your task in a few steps.</p></div><Link className="btn !bg-white !text-[#134e4a]" href="#tools" prefetch={false}>Browse tools <ArrowRight size={16}/></Link></div></div></section></main>}
