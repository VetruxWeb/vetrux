// src/i18n/locales.ts
// Single source of truth for all locale configuration.

export const locales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'ja', 'fi'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export interface LocaleMeta {
  prefix: string;
  hreflang: string;
  ogLocale: string;
  languageName: string;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { prefix: '',    hreflang: 'en',    ogLocale: 'en_US', languageName: 'English' },
  de: { prefix: '/de', hreflang: 'de',    ogLocale: 'de_DE', languageName: 'Deutsch' },
  fr: { prefix: '/fr', hreflang: 'fr',    ogLocale: 'fr_FR', languageName: 'Français' },
  es: { prefix: '/es', hreflang: 'es',    ogLocale: 'es_ES', languageName: 'Español' },
  it: { prefix: '/it', hreflang: 'it',    ogLocale: 'it_IT', languageName: 'Italiano' },
  pt: { prefix: '/pt', hreflang: 'pt',    ogLocale: 'pt_PT', languageName: 'Português' },
  ja: { prefix: '/ja', hreflang: 'ja',    ogLocale: 'ja_JP', languageName: '日本語' },
  fi: { prefix: '/fi', hreflang: 'fi',    ogLocale: 'fi_FI', languageName: 'Suomi' },
};

/** Core pages that exist in all TARGET_LOCALES. */
export const localizedRoutes = [
  '/',
  '/inquiry',
  '/equipment',
  '/planting',
  '/process',
  '/gallery',
  '/about',
  '/blog',
  '/quality-assurance',
  '/wholesale-cbd-isolate',
  '/cbd-isolate-manufacturer',
  '/privacy-policy',
  '/terms-of-service',
] as const;

export type LocalizedRoute = (typeof localizedRoutes)[number];

/** Gallery sector sub-pages — also localized. */
export const localizedGallerySectors = [
  '/gallery/campus',
  '/gallery/cultivation',
  '/gallery/extraction',
  '/gallery/products',
] as const;

/** English-only pages — no localized variants. */
export const englishOnlyRoutes = [] as const;

export function getLocalePrefix(locale: Locale): string {
  return localeMeta[locale].prefix;
}

export function localizePath(path: string, locale: Locale): string {
  const prefix = getLocalePrefix(locale);
  if (!prefix) return path;
  return path === '/' ? prefix : `${prefix}${path}`;
}

export function getLocalizedAlternates(
  path: string,
  baseUrl: string,
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const loc of locales) {
    alternates[localeMeta[loc].hreflang] = `${baseUrl}${localizePath(path, loc)}`;
  }
  alternates['x-default'] = `${baseUrl}${path}`;
  return alternates;
}

export function isSupportedLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isLocalizedRoute(path: string): boolean {
  return (localizedRoutes as readonly string[]).includes(path)
    || (localizedGallerySectors as readonly string[]).includes(path);
}
