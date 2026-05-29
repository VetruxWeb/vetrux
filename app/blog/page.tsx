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

  // Try database first, fall back to static files
  let articles: Article[] = await getAllArticlesFromDb('en').catch(() => []);
  if (articles.length === 0) {
    try {
      const { articles: staticArticles } = await import('@/content/articles');
      articles = staticArticles;
    } catch {
      articles = [];
    }
  }

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
