import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, getSeoMetadata } from '@/lib/seo';
import { articles, getArticleBySlug } from '@/content/articles';
import { getArticleBySlugFromDb, getAllArticleSlugs } from '@/lib/articlesDb';
import ArticlePageClient from '@/components/pages/ArticlePageClient';

export async function generateStaticParams() {
  // Combine static and DB slugs
  const dbSlugs = await getAllArticleSlugs().catch(() => []);
  const staticSlugs = articles.map((a) => ({ slug: a.slug }));
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
  return buildMetadata(`/blog/${slug}`);
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

    const seo = getSeoMetadata(`/blog/${slug}`);
    const jsonLd = seo.jsonLd;

    return (
      <>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]),
            }}
          />
        )}
        <ArticlePageClient meta={meta} content={dbArticle.translation.content} />
      </>
    );
  }

  // Fall back to static files
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const seo = getSeoMetadata(`/blog/${slug}`);
  const jsonLd = seo.jsonLd;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]),
          }}
        />
      )}
      <ArticlePageClient meta={article.meta} content={article.content} />
    </>
  );
}
