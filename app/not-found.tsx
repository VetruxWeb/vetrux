import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import NotFoundTitleSync from '@/components/molecules/NotFoundTitleSync';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The requested Vetrux page could not be found.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <NotFoundTitleSync />
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs font-semibold tracking-[0.35em] uppercase text-accent mb-4">404</p>
        <h1 className="font-serif text-5xl font-medium text-on-background tracking-tight mb-4">
          Page Not Found
        </h1>
        <p className="text-[15px] text-on-surface-variant mb-8 max-w-prose">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-xs font-semibold tracking-widest uppercase rounded-md hover:bg-accent-hover transition-all duration-200 ease-industrial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Return Home
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
