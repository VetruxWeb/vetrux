import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  buildMetadata,
  buildDynamicMetadata,
  buildArticleJsonLd,
  getSeoMetadata,
  buildFaqJsonLd,
} from '@/lib/seo';
import { getArticleBySlugFromDb, getAllArticleSlugs } from '@/lib/articlesDb';
import { parseArticle } from '@/lib/articleParser';
import ArticlePageClient from '@/components/pages/ArticlePageClient';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const dbSlugs = await getAllArticleSlugs().catch(() => []);
  let staticSlugs: { slug: string }[] = [];
  try {
    const { articles } = await import('@/content/articles');
    staticSlugs = articles.map((a) => ({ slug: a.slug }));
  } catch { /* ignore */ }
  const dbSlugSet = new Set(dbSlugs.map((s) => s.slug));
  const combined = [...dbSlugs.map((s) => ({ slug: s.slug }))];
  for (const s of staticSlugs) {
    if (!dbSlugSet.has(s.slug)) combined.push(s);
  }
  return combined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // DB-backed articles aren't in the static SEO table — build metadata from DB.
  const dbArticle = await getArticleBySlugFromDb(slug, 'en').catch(() => null);
  if (dbArticle) {
    return buildDynamicMetadata({
      title: dbArticle.translation.title,
      description: dbArticle.translation.excerpt || '',
      canonicalPath: `/blog/${slug}`,
      image: dbArticle.meta.image || undefined,
      type: 'article',
    });
  }

  return buildMetadata(`/blog/${slug}`);
}

function withFaq(baseJsonLd: Record<string, unknown>[], articleContent: string) {
  const { faqItems } = parseArticle(articleContent);
  const schemas = [...baseJsonLd];
  if (faqItems.length > 0) schemas.push(buildFaqJsonLd(faqItems));
  return schemas;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try database first
  const dbArticle = await getArticleBySlugFromDb(slug, 'en').catch(() => null);

  if (dbArticle) {
    const meta = {
      slug: dbArticle.meta.slug,
      title: dbArticle.translation.title,
      excerpt: dbArticle.translation.excerpt || '',
      category: dbArticle.meta.category || '',
      date: dbArticle.meta.publishedAt ? String(dbArticle.meta.publishedAt).split('T')[0] : '',
      readTime: dbArticle.translation.readTime || '',
      image: dbArticle.meta.image || '',
      size: (dbArticle.meta.size || 'normal') as 'normal' | 'large',
    };

    const articleJsonLd = buildArticleJsonLd({
      slug: meta.slug,
      title: meta.title,
      excerpt: meta.excerpt,
      image: meta.image || undefined,
      datePublished: meta.date,
      dateModified: dbArticle.meta.updatedAt
        ? String(dbArticle.meta.updatedAt).split('T')[0]
        : meta.date,
    });
    const schemas = withFaq(articleJsonLd, dbArticle.translation.content);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
        <ArticlePageClient meta={meta} content={dbArticle.translation.content} locale="en" />
      </>
    );
  }

  // Fall back to static files
  let article = null;
  try {
    const { getArticleBySlug } = await import('@/content/articles');
    article = getArticleBySlug(slug);
  } catch { /* ignore */ }
  if (!article) notFound();

  const seo = getSeoMetadata(`/blog/${slug}`);
  const baseJsonLd = Array.isArray(seo.jsonLd)
    ? (seo.jsonLd as Record<string, unknown>[])
    : seo.jsonLd
      ? [seo.jsonLd as Record<string, unknown>]
      : [];
  const schemas = withFaq(baseJsonLd, article.content);

  return (
    <>
      {schemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
      )}
      <ArticlePageClient meta={article.meta} content={article.content} locale="en" />
    </>
  );
}
