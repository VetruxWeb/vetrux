// src/pages/InsightsPage.tsx
// Page 5: Industry Insights / Blog
// Sections: Featured Insight Hero, Article Grid, Newsletter CTA, Stats Strip

import { useRef } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Badge from '../components/atoms/Badge';
import SectionLabel from '../components/atoms/SectionLabel';
import { articles } from '../content/articles/index';

gsap.registerPlugin(ScrollTrigger);

// Featured article is always the first in the list
const featured = articles[0];
// Grid articles are the rest
const gridArticles = articles.slice(1);

export default function InsightsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    const items = heroRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: heroRef.current, start: 'top 80%' },
    });
  }, { scope: heroRef });

  useGSAP(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
    });
  }, { scope: gridRef });

  return (
    <div className="bg-surface">

      {/* ── FEATURED INSIGHT HERO ──────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={heroRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div className="reveal-card">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="default">{featured.category}</Badge>
                <span className="text-xs text-on-surface-variant tracking-wider">{featured.date}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter leading-tight mb-6">
                Innovation in Botanical
                <br />
                <span className="text-primary">Biotechnology</span>
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8 max-w-md">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  to={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300"
                >
                  Read Whitepaper
                  <ArrowRight size={14} />
                </Link>
                <span className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <Clock size={12} />
                  {featured.readTime}
                </span>
              </div>
            </div>

            {/* Right: image */}
            <Link to={`/blog/${featured.slug}`} className="reveal-card relative overflow-hidden block group">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-72 object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-on-background/60 to-transparent">
                <span className="text-xs text-white/60 tracking-wider uppercase">
                  Yunnan Vetrux Research Division
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ARTICLES GRID ──────────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={gridRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card">
            <SectionLabel>Latest Posts</SectionLabel>
            <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-12">
              Industry Analysis & Research
            </h2>
          </div>

          {/* Bento grid: first card large (2/3), rest normal (1/3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gridArticles.map((article, i) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className={`reveal-card group cursor-pointer ${i === 0 ? 'md:col-span-2' : 'md:col-span-1'}`}
              >
                <article>
                  <div className="overflow-hidden mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 md:h-56 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 bg-primary-fixed text-primary text-xs font-semibold tracking-wider uppercase rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <Clock size={10} />
                      {article.readTime}
                    </span>
                    <span className="text-xs text-on-surface-variant">{article.date}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-on-background tracking-tighter leading-snug mb-2 group-hover:text-primary transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-primary group-hover:translate-x-1 transition-transform duration-200">
                    Read Article <ArrowRight size={12} />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
