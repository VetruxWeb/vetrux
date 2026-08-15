'use client'

import type { Locale } from '@/i18n/locales';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import Link from 'next/link';
import SectionLabel from '@/components/atoms/SectionLabel';
import type { Article } from '@/content/articles';
import { insightsContent } from '@/content/pages/insights.content';
import { useReveal } from '@/hooks/useReveal';

interface InsightsPageClientProps {
  articles: Article[];
  locale?: Locale;
}

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'read-time';

const ARTICLES_PER_PAGE = 12;

function getDateValue(date: string): number {
  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getReadTimeValue(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export default function InsightsPageClient({ articles, locale = 'en' }: InsightsPageClientProps) {
  const t = insightsContent[locale];
  const langPrefix = locale === 'en' ? '' : `/${locale}`;
  const pageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matches = normalizedQuery
      ? articles.filter((article) => {
          const searchable = [
            article.title,
            article.excerpt,
            article.category,
            article.date,
            article.readTime,
          ]
            .join(' ')
            .toLowerCase();

          return searchable.includes(normalizedQuery);
        })
      : [...articles];

    return matches.sort((a, b) => {
      if (sortBy === 'oldest') {
        return getDateValue(a.date) - getDateValue(b.date);
      }

      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === 'read-time') {
        return getReadTimeValue(b.readTime) - getReadTimeValue(a.readTime);
      }

      return getDateValue(b.date) - getDateValue(a.date);
    });
  }, [articles, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const resultStart = filteredArticles.length === 0 ? 0 : (activePage - 1) * ARTICLES_PER_PAGE + 1;
  const resultEnd = Math.min(activePage * ARTICLES_PER_PAGE, filteredArticles.length);
  const paginatedArticles = filteredArticles.slice(resultStart === 0 ? 0 : resultStart - 1, resultEnd);

  useEffect(() => {
    const syncPageFromUrl = () => {
      const value = Number(new URLSearchParams(window.location.search).get('page'));
      const requestedPage = Number.isInteger(value) && value > 0 ? value : 1;
      const nextPage = Math.min(requestedPage, totalPages);

      setCurrentPage(nextPage);

      if (requestedPage !== nextPage) {
        const url = new URL(window.location.href);
        if (nextPage === 1) {
          url.searchParams.delete('page');
        } else {
          url.searchParams.set('page', String(nextPage));
        }
        window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
      }
    };

    syncPageFromUrl();
    window.addEventListener('popstate', syncPageFromUrl);
    return () => window.removeEventListener('popstate', syncPageFromUrl);
  }, [totalPages]);

  useReveal(pageRef, { y: 32, stagger: 0.08, start: 'top 85%' });
  useReveal(gridRef, { y: 40, stagger: 0.1, start: 'top 80%' });

  const updatePage = (page: number, historyMode: 'push' | 'replace' = 'push', scroll = true) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);

    const url = new URL(window.location.href);
    if (nextPage === 1) {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', String(nextPage));
    }

    const method = historyMode === 'push' ? 'pushState' : 'replaceState';
    window.history[method](window.history.state, '', `${url.pathname}${url.search}${url.hash}`);

    if (scroll) {
      requestAnimationFrame(() => {
        gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    updatePage(1, 'replace', false);
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    updatePage(1, 'replace', false);
  };

  return (
    <div className="bg-surface">
      <section className="border-b border-outline-variant/70 bg-surface-container-low py-16 md:py-20">
        <div ref={pageRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card max-w-3xl">
            <SectionLabel>{t.heroEyebrow}</SectionLabel>
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-on-background leading-[1.0] mb-5">
              {t.heroTitle}
            </h1>
            <p className="text-[15px] md:text-base text-on-surface-variant leading-relaxed max-w-2xl">
              {t.heroBody}
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18 bg-surface">
        <div ref={gridRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card mb-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <SectionLabel className="mb-3">{t.allPostsLabel}</SectionLabel>
                <h2 className="text-3xl font-serif font-medium text-on-background leading-[1.05]">
                  {t.archiveTitle}
                </h2>
              </div>

              <p className="flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-widest text-on-surface-muted">
                <span>{t.showingText} {resultStart}-{resultEnd} {t.ofText} {filteredArticles.length} {t.articlesText}</span>
                <span aria-hidden="true" className="text-outline">·</span>
                <span>{ARTICLES_PER_PAGE} {t.perPage}</span>
              </p>
            </div>

            <div className="mt-8 grid gap-4 border-y border-outline-variant/70 py-5 lg:grid-cols-[minmax(0,1fr)_220px]">
              <label className="relative block">
                <span className="sr-only">{t.searchLabel}</span>
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => handleQueryChange(event.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="h-12 w-full border border-outline-variant bg-surface-high pl-11 pr-11 text-sm text-on-surface placeholder:text-on-surface-muted/70 transition-colors duration-200 focus:border-accent focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => handleQueryChange('')}
                    className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center text-on-surface-muted transition-colors duration-200 hover:text-accent"
                    aria-label={t.clearSearch}
                  >
                    <X size={16} />
                  </button>
                )}
              </label>

              <label className="relative block">
                <span className="sr-only">{t.sortLabel}</span>
                <SlidersHorizontal
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted"
                />
                <select
                  value={sortBy}
                  onChange={(event) => handleSortChange(event.target.value as SortOption)}
                  className="h-12 w-full appearance-none border border-outline-variant bg-surface-high pl-11 pr-8 text-xs font-semibold uppercase tracking-wider text-on-surface transition-colors duration-200 focus:border-accent focus:outline-none"
                >
                  <option value="newest">{t.sortNewest}</option>
                  <option value="oldest">{t.sortOldest}</option>
                  <option value="title-asc">{t.sortTitleAz}</option>
                  <option value="read-time">{t.sortLongest}</option>
                </select>
              </label>

            </div>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {paginatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`${langPrefix}/blog/${article.slug}`}
                  className="reveal-card group block border-b-2 border-transparent pb-5 transition-colors duration-200 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  <article className="flex h-full flex-col">
                    <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="bg-primary-fixed px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                        <Clock size={10} />
                        {article.readTime}
                      </span>
                      <span className="text-xs text-on-surface-variant">{article.date}</span>
                    </div>
                    <h3 className="mb-3 text-xl font-serif font-medium leading-snug text-on-background transition-colors duration-200 group-hover:text-accent">
                      {article.title}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-on-surface-variant">
                      {article.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent transition-transform duration-200 group-hover:translate-x-1">
                      {t.readArticle} <ArrowRight size={12} />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="reveal-card border border-outline-variant bg-surface-container-low px-6 py-12 text-center">
              <h3 className="mb-2 text-2xl font-serif font-medium text-on-background">
                {t.noArticlesTitle}
              </h3>
              <p className="mx-auto mb-6 max-w-lg text-sm leading-relaxed text-on-surface-variant">
                {t.noArticlesBody}
              </p>
              <button
                type="button"
                onClick={() => handleQueryChange('')}
                className="inline-flex items-center justify-center bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-primary-container"
              >
                {t.clearSearch}
              </button>
            </div>
          )}

          {filteredArticles.length > ARTICLES_PER_PAGE && (
            <nav
              className="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-outline-variant/70 pt-8"
              aria-label={t.pageLabel}
            >
              <button
                type="button"
                onClick={() => updatePage(activePage - 1)}
                disabled={activePage === 1}
                className="inline-flex h-11 items-center justify-center gap-2 border border-outline-variant bg-surface px-4 text-xs font-semibold uppercase tracking-wider text-on-surface transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-outline-variant disabled:hover:text-on-surface"
              >
                <ArrowLeft size={14} />
                {t.previousBtn}
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => updatePage(page)}
                  aria-current={page === activePage ? 'page' : undefined}
                  aria-label={`${t.pageLabel} ${page}`}
                  className={`inline-flex h-11 min-w-11 items-center justify-center border px-3 text-sm font-semibold transition-colors ${
                    page === activePage
                      ? 'border-primary bg-primary text-white'
                      : 'border-outline-variant bg-surface text-on-surface hover:border-accent hover:text-accent'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => updatePage(activePage + 1)}
                disabled={activePage === totalPages}
                className="inline-flex h-11 items-center justify-center gap-2 border border-outline-variant bg-surface px-4 text-xs font-semibold uppercase tracking-wider text-on-surface transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-outline-variant disabled:hover:text-on-surface"
              >
                {t.nextBtn}
                <ArrowRight size={14} />
              </button>
            </nav>
          )}

        </div>
      </section>
    </div>
  );
}
