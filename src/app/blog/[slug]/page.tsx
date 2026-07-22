import { BLOG_POSTS } from "@/lib/blog-posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Calendar, Clock, BookOpen, ArrowRight, Award } from "lucide-react";

// For static site generation
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

// SEO Metadata
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = 'then' in params ? await params : params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
  if (!post) return {};
  
  return {
    title: `${post.title} | Liana Groombridge`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Liana Groombridge"],
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = 'then' in params ? await params : params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream overflow-x-hidden">
      <main className="flex-grow pt-24 pb-20">
        <article className="max-w-4xl mx-auto px-6 lg:px-8 pt-12">
          
          {/* ── BACK BUTTON ── */}
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-brand-sage font-bold hover:text-brand-sage-hover transition-colors mb-10 text-sm tracking-wide"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to all posts
          </Link>

          {/* ── ARTICLE HEADER ── */}
          <header className="space-y-6 mb-12">
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-brand-sage/10 text-brand-sage border border-brand-sage/20">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-xs font-bold text-brand-warm-gray/60 uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-sage" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-sage" />
                  {post.readTime}
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-brand-charcoal leading-tight">
              {post.title}
            </h1>

            {/* Author info */}
            <div className="flex items-center gap-4 pt-4 border-t border-brand-border/40">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-sage/20 bg-brand-cream relative shrink-0">
                <Image
                  src="/headshot-v2.jpg"
                  alt="Liana Groombridge"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-brand-charcoal">Liana Groombridge</span>
                  <span title="Certified Coach">
                    <Award className="w-4 h-4 text-brand-sage" />
                  </span>
                </div>
                <p className="text-xs text-brand-warm-gray/60">
                  ICF-Certified ADHD Coach (ACC, CACP) & Fellow ADHDer
                </p>
              </div>
            </div>
          </header>

          {/* ── COVER IMAGE / DESIGN BANNER ── */}
          <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden shadow-xl border border-brand-border/30 mb-12 bg-brand-dark">
            {/* Background design elements shown only when there is no cover image */}
            {!post.coverImage && (
              <>
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-sage/30 to-brand-dark opacity-90 z-10 pointer-events-none" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              </>
            )}
            
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover z-0"
                priority
                unoptimized
              />
            ) : null}
            
            {/* Design accents overlay */}
            <div className="absolute bottom-6 left-6 z-20 hidden sm:block bg-brand-dark/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-lg">
              <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-0.5">lianagroombridge.com</p>
              <p className="text-white/60 text-[10px] font-medium">Curiosity Over Judgment</p>
            </div>
          </div>

          {/* ── ARTICLE BODY ── */}
          <section className="max-w-3xl mx-auto">
            <div 
              className="blog-content" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {/* ── REFERENCES ── */}
            {post.references && post.references.length > 0 && (
              <footer className="mt-16 pt-8 border-t border-brand-border/40">
                <h4 className="text-lg font-serif font-bold text-brand-charcoal mb-4 uppercase tracking-wider text-xs">
                  References & Research:
                </h4>
                <ul className="space-y-3 text-sm text-brand-warm-gray/80 list-none pl-0">
                  {post.references.map((reference, index) => (
                    <li key={index} className="relative pl-6 leading-relaxed before:content-['•'] before:absolute before:left-1 before:text-brand-sage">
                      {reference}
                    </li>
                  ))}
                </ul>
              </footer>
            )}
          </section>

          {/* ── FOOTER CTA ── */}
          <div className="max-w-3xl mx-auto mt-20 p-8 sm:p-12 rounded-3xl bg-[#483428] text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-sage/20 via-transparent to-brand-gold/10 opacity-50" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-brand-sage/20 text-brand-sage-light text-xs font-bold uppercase tracking-widest mb-6">
                  Workbook
                </div>
                <h3 className="text-3xl font-serif font-bold leading-tight">
                  Struggling to make yourself start?
                </h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  Willpower is a scam for an ADHD brain. Check out my workbook, <strong className="text-brand-gold font-bold">Manipulating Myself to Do Stuff</strong>, loaded with 9 chapters of ADHD-proof strategies.
                </p>
              </div>
              
              <Link 
                href="/shop"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-brand-sage text-white font-bold text-base shadow-md hover:bg-brand-sage-hover hover:scale-105 active:scale-95 transition-all shrink-0 w-full sm:w-auto"
              >
                <BookOpen className="w-5 h-5" />
                View Workbook
              </Link>
            </div>
          </div>

        </article>
      </main>

      {/* ── FOOTER ── */}
      <footer className="py-8 text-center text-sm text-brand-warm-gray/60 border-t border-brand-border bg-brand-white">
        © 2026 Liana Groombridge Coaching. All rights reserved.
      </footer>
    </div>
  );
}
