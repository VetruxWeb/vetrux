import type { Metadata } from 'next';
import { buildMetadata, getSeoMetadata } from '@/lib/seo';
import { getAllArticlesFromDb } from '@/lib/articlesDb';
import type { Article } from '@/content/articles';
import InsightsPageClient from '@/components/pages/InsightsPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/blog');
}

export default async function BlogPage() {
  const seo = getSeoMetadata('/blog');
  const jsonLd = seo.jsonLd;

  // Union DB-backed articles with static articles not already present in the DB.
  const dbArticles: Article[] = await getAllArticlesFromDb('en').catch(() => []);
  let staticArticles: Article[] = [];
  try {
    ({ articles: staticArticles } = await import('@/content/articles'));
  } catch {
    staticArticles = [];
  }
  const dbSlugs = new Set(dbArticles.map((a) => a.slug));
  const articles: Article[] = [
    ...dbArticles,
    ...staticArticles.filter((a) => !dbSlugs.has(a.slug)),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
      <InsightsPageClient articles={articles} />
    </>
  );
}
