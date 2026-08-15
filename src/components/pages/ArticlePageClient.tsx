'use client'

import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { ArrowLeft, Clock, Printer } from 'lucide-react';
import type { Article } from '@/content/articles';
import { parseArticle, slugifyArticleHeading } from '@/lib/articleParser';
import TableOfContents from '@/components/molecules/TableOfContents';
import FaqAccordion from '@/components/molecules/FaqAccordion';
import FlowDiagram from '@/components/molecules/FlowDiagram';
import ExpertAuthor from '@/components/molecules/ExpertAuthor';
import type { Locale } from '@/i18n/locales';

const articleUi: Record<Locale, { back: string; print: string; allPosts: string; contents: string; toc: string; faq: string }> = {
  en: { back: 'Back to Blog', print: 'Print / Save PDF', allPosts: 'All Posts', contents: 'Contents', toc: 'Table of Contents', faq: 'Frequently Asked Questions' },
  de: { back: 'Zurück zum Blog', print: 'Drucken / Als PDF speichern', allPosts: 'Alle Beiträge', contents: 'Inhalt', toc: 'Inhaltsverzeichnis', faq: 'Häufig gestellte Fragen' },
  fr: { back: 'Retour au blog', print: 'Imprimer / Enregistrer en PDF', allPosts: 'Tous les articles', contents: 'Sommaire', toc: 'Table des matières', faq: 'Questions fréquentes' },
  es: { back: 'Volver al blog', print: 'Imprimir / Guardar como PDF', allPosts: 'Todos los artículos', contents: 'Contenido', toc: 'Índice', faq: 'Preguntas frecuentes' },
  it: { back: 'Torna al blog', print: 'Stampa / Salva come PDF', allPosts: 'Tutti gli articoli', contents: 'Contenuti', toc: 'Indice', faq: 'Domande frequenti' },
  pt: { back: 'Voltar ao blog', print: 'Imprimir / Guardar como PDF', allPosts: 'Todos os artigos', contents: 'Conteúdo', toc: 'Índice', faq: 'Perguntas frequentes' },
  ja: { back: 'ブログに戻る', print: '印刷 / PDFで保存', allPosts: 'すべての記事', contents: '目次', toc: '目次', faq: 'よくある質問' },
  fi: { back: 'Takaisin blogiin', print: 'Tulosta / Tallenna PDF', allPosts: 'Kaikki artikkelit', contents: 'Sisältö', toc: 'Sisällysluettelo', faq: 'Usein kysytyt kysymykset' },
};

function getMdComponents(): Components {
  return {
    h1: ({ children }) => {
      const text = String(children)
      const id = slugifyArticleHeading(text)
      return (
        <h2 id={id} className="text-4xl md:text-5xl font-serif font-medium text-on-background tracking-tight leading-[1.05] mt-0 mb-6 scroll-mt-24">{children}</h2>
      )
    },
    h2: ({ children }) => {
      const text = String(children)
      const id = slugifyArticleHeading(text)
      return (
        <h2 id={id} className="text-2xl font-serif font-medium text-on-background tracking-tight leading-snug mt-14 mb-4 border-b border-on-background/10 pb-3 scroll-mt-24">{children}</h2>
      )
    },
    h3: ({ children }) => {
      const text = String(children)
      const id = slugifyArticleHeading(text)
      return (
        <h3 id={id} className="text-lg font-serif font-medium text-on-background tracking-tight mt-10 mb-3 scroll-mt-24">{children}</h3>
      )
    },
    p: ({ children, node }) => {
      const text = String(children)
      if (text.includes('<!-- flow-placeholder-') || text.includes('<!-- faq-placeholder -->')) {
        return null
      }
      const hasBlockElement = node?.children?.some(
        (child) => child.type === 'element' && child.tagName === 'img'
      )
      if (hasBlockElement) {
        return (
          <div className="text-[15px] text-on-surface-variant leading-relaxed mb-5">{children}</div>
        )
      }
      return (
        <p className="text-[15px] text-on-surface-variant leading-relaxed mb-5">{children}</p>
      )
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-on-background">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-on-surface-variant">{children}</em>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside ml-5 mb-5 space-y-2 text-[15px] text-on-surface-variant">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside ml-5 mb-5 space-y-2 text-[15px] text-on-surface-variant">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-5 my-6 text-[15px] text-on-surface-variant italic">{children}</blockquote>
    ),
    hr: () => (
      <hr className="my-10 border-on-background/10" />
    ),
    code: ({ children, className }) => {
      const isBlock = className?.startsWith('language-');
      if (isBlock) {
        return (
          <code className="block bg-surface-container-low text-on-background text-xs font-mono p-4 rounded overflow-x-auto leading-relaxed my-4">{children}</code>
        );
      }
      return (
        <code className="bg-primary-fixed text-primary text-xs font-mono px-1.5 py-0.5 rounded">{children}</code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-surface-container-low rounded overflow-x-auto my-5">{children}</pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-lg border border-gray-200">
        <table className="w-full text-xs border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-primary-fixed text-primary font-semibold tracking-wider uppercase">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-on-background/10">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-surface-container-low transition-colors">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2.5 text-left">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-on-surface-variant leading-relaxed">{children}</td>
    ),
    img: ({ src, alt }) => (
      <figure className="my-8">
        <Image
          src={typeof src === 'string' ? src : ''}
          alt={alt ?? ''}
          width={1200}
          height={800}
          className="w-full h-auto object-cover rounded-sm max-h-96"
        />
        {alt && (
          <figcaption className="mt-2 text-center text-xs text-on-surface-muted italic">{alt}</figcaption>
        )}
      </figure>
    ),
    a: ({ href, children }) => {
      const isExternal = href && (href.startsWith('http') || href.startsWith('//'))
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors duration-200"
          >
            {children}
          </a>
        )
      }
      return (
        <Link href={href || '#'} className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors duration-200">
          {children}
        </Link>
      )
    },
  }
}

interface ArticlePageClientProps {
  meta: Article;
  content: string;
  locale?: Locale;
}

export default function ArticlePageClient({ meta, content, locale = 'en' }: ArticlePageClientProps) {
  const parsed = parseArticle(content)
  const ui = articleUi[locale]
  const blogPath = locale === 'en' ? '/blog' : `/${locale}/blog`
  const mdComponents = getMdComponents()
  const contentSegments = parsed.content.split(/<!-- flow-placeholder-(\d+) -->/)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="bg-surface min-h-screen print:bg-white">
      {/* Hero banner */}
      <div className="relative h-64 md:h-96 overflow-hidden bg-surface-ink print:hidden">
        {meta.image && (
          <Image src={meta.image} alt={meta.imageAlt || meta.title} fill sizes="100vw" className="object-cover opacity-40" priority />
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-5xl mx-auto left-0 right-0">
          <span className="px-2 py-0.5 bg-primary-fixed text-primary text-xs font-semibold tracking-wider uppercase rounded-full w-fit mb-4">
            {meta.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-medium text-white tracking-tight leading-[1.05] mb-3">
            {meta.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span>{meta.date}</span>
            {meta.readTime && (
              <span className="flex items-center gap-1">
                <Clock size={10} />
                {meta.readTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Print-only header */}
      <div className="hidden print:block px-8 py-6 border-b">
        <p className="text-2xl font-serif font-bold">{meta.title}</p>
        <p className="text-sm text-gray-500 mt-1">{meta.date} · {meta.readTime}</p>
      </div>

      {/* Article layout */}
      <div className="max-w-6xl mx-auto px-6 py-16 print:py-8 print:px-8">
        <Link
          href={blogPath}
          className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-on-surface-variant hover:text-accent transition-colors duration-200 mb-12 print:hidden"
        >
          <ArrowLeft size={12} />
          {ui.back}
        </Link>

        {/* Mobile TOC */}
        <div className="lg:hidden print:hidden">
          <TableOfContents headings={parsed.headings} title={ui.contents} mobileTitle={ui.toc} />
        </div>

        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 print:hidden">
            <div className="sticky top-24">
              <TableOfContents headings={parsed.headings} title={ui.contents} mobileTitle={ui.toc} />
              <button
                onClick={handlePrint}
                className="mt-6 flex items-center gap-2 text-xs font-medium text-on-surface-muted hover:text-accent transition-colors w-full px-3 py-2 rounded border border-gray-200 hover:border-accent"
              >
                <Printer className="h-3.5 w-3.5" />
                {ui.print}
              </button>
            </div>
          </aside>

          {/* Main content */}
          <article className="flex-1 min-w-0">
            <div className="max-w-prose">
              {contentSegments.map((segment, index) => {
                if (index % 2 === 1) {
                  const diagram = parsed.flowDiagrams[Number(segment)]
                  return diagram ? <FlowDiagram key={`flow-${segment}`} diagram={diagram} /> : null
                }
                return (
                  <ReactMarkdown key={`content-${index}`} remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {segment}
                  </ReactMarkdown>
                )
              })}

              {/* Expert author */}
              <ExpertAuthor locale={locale} />

              {/* FAQ accordion */}
              <FaqAccordion items={parsed.faqItems} title={ui.faq} />
            </div>

            <div className="mt-16 pt-8 border-t border-on-background/10 print:hidden">
              <Link
                href={blogPath}
                className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-accent hover:translate-x-[-2px] transition-transform duration-200"
              >
                <ArrowLeft size={12} />
                {ui.allPosts}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
