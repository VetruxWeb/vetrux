import type { Metadata } from 'next';
import { buildMetadata, getSeoMetadata } from '@/lib/seo';
import { articles as staticArticles } from '@/content/articles';
import { getAllArticlesFromDb } from '@/lib/articlesDb';
import InsightsPageClient from '@/components/pages/InsightsPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/blog');
}

export default async function BlogPage() {
  const seo = getSeoMetadata('/blog');
  const jsonLd = seo.jsonLd;

  // Try database first, fall back to static files
  const dbArticles = await getAllArticlesFromDb('en').catch(() => []);
  const articles = dbArticles.length > 0 ? dbArticles : staticArticles;

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
