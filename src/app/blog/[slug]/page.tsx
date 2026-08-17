import { BLOG_POSTS } from "@/lib/blog-posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Calendar, Clock, BookOpen, ArrowRight, Award } from "lucide-react";
import EmailCaptureForm from "@/components/EmailCaptureForm";

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
            

          </div>

          {/* ── ARTICLE BODY ── */}
          <section className="max-w-3xl mx-auto">
            <div 
              className="blog-content" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {post.emailCapture && (
              <EmailCaptureForm 
                source={post.emailCapture.source}
                fileDownloadUrl={post.emailCapture.fileDownloadUrl}
                ctaText={post.emailCapture.ctaText}
              />
            )}

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
          <div className="max-w-3xl mx-auto mt-16 p-6 sm:p-8 rounded-3xl bg-[#483428] text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-sage/20 via-transparent to-brand-gold/10 opacity-50" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8">
              <div className="max-w-xl text-center md:text-left space-y-4 flex flex-col justify-center items-center md:items-start">
                <div className="inline-block px-3 py-1 rounded-full bg-brand-sage/20 text-brand-sage-light text-xs font-bold uppercase tracking-widest mb-1">
                  Workbook
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
                  Struggling to make yourself start?
                </h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-2">
                  Stop relying on willpower to get you unstuck. Check out my workbook, <strong className="text-brand-gold font-bold">Manipulating Myself to Do Stuff</strong>, loaded with 9 chapters of ADHD-proof strategies.
                </p>
                <Link 
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-brand-sage text-white font-bold text-sm shadow-md hover:bg-brand-sage-hover hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
                >
                  <BookOpen className="w-4 h-4" />
                  View Workbook
                </Link>
              </div>
              
              <div className="flex items-center justify-center shrink-0">
                <div className="relative w-32 h-40 sm:w-40 sm:h-52 md:w-44 md:h-56 shadow-2xl rounded-md overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300 border border-white/20">
                  <Image
                    src="/workbook_cover_final.png"
                    alt="Manipulating Myself to Do Stuff Workbook"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
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
