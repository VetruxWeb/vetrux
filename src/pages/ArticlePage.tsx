// src/pages/ArticlePage.tsx
// Article detail page – renders a markdown file with styled prose

import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { ArrowLeft, Clock } from 'lucide-react';
import { articles, articleContent } from '../content/articles/index';

// Tailwind-based prose component overrides for ReactMarkdown
const mdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter leading-tight mt-0 mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-extrabold text-on-background tracking-tighter leading-snug mt-14 mb-4 border-b border-on-background/10 pb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-bold text-on-background tracking-tight mt-10 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-on-background">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-on-surface-variant">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-5 mb-5 space-y-2 text-sm text-on-surface-variant">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-5 mb-5 space-y-2 text-sm text-on-surface-variant">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-5 my-6 text-sm text-on-surface-variant italic">
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-10 border-on-background/10" />
  ),
  code: ({ children, className }) => {
    const isBlock = className?.startsWith('language-');
    if (isBlock) {
      return (
        <code className="block bg-surface-container-low text-on-background text-xs font-mono p-4 rounded overflow-x-auto leading-relaxed my-4">
          {children}
        </code>
      );
    }
    return (
      <code className="bg-primary-fixed text-primary text-xs font-mono px-1.5 py-0.5 rounded">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-surface-container-low rounded overflow-x-auto my-5">{children}</pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-xs border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-primary-fixed text-primary font-semibold tracking-wider uppercase">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-on-background/10">
      {children}
    </tbody>
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
    <img
      src={src}
      alt={alt}
      className="w-full object-cover my-6 rounded-sm max-h-96"
    />
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-2 hover:text-primary-container transition-colors duration-200"
    >
      {children}
    </a>
  ),
};

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();

  const meta = articles.find((a) => a.slug === slug);
  const content = slug ? articleContent[slug] : undefined;

  if (!meta || !content) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero banner */}
      <div className="relative h-64 md:h-96 overflow-hidden bg-on-background">
        <img
          src={meta.image}
          alt={meta.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-4xl mx-auto left-0 right-0">
          <span className="px-2 py-0.5 bg-primary-fixed text-primary text-xs font-semibold tracking-wider uppercase rounded-full w-fit mb-4">
            {meta.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tighter leading-tight mb-3">
            {meta.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span>{meta.date}</span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {meta.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-6 lg:px-0 py-16">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-on-surface-variant hover:text-primary transition-colors duration-200 mb-12"
        >
          <ArrowLeft size={12} />
          Back to Blog
        </Link>

        {/* Markdown content */}
        <article>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {content}
          </ReactMarkdown>
        </article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-on-background/10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-primary hover:translate-x-[-2px] transition-transform duration-200"
          >
            <ArrowLeft size={12} />
            All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
