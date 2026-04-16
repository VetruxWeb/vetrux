import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getBaseUrl, getSeoMetadata } from '../../lib/seo';

function upsertMetaByName(name: string, content: string) {
  let element = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  let element = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export default function RouteSeo() {
  const location = useLocation();

  useEffect(() => {
    const metadata = getSeoMetadata(location.pathname);
    const baseUrl = getBaseUrl();
    const canonicalUrl = `${baseUrl}${metadata.canonicalPath}`;
    const imageUrl = metadata.image?.startsWith('http')
      ? metadata.image
      : `${baseUrl}${metadata.image ?? '/images/hero/facility-hero.webp'}`;

    document.title = metadata.title;

    upsertMetaByName('description', metadata.description);
    upsertMetaByName('robots', 'index,follow');
    upsertMetaByProperty('og:title', metadata.title);
    upsertMetaByProperty('og:description', metadata.description);
    upsertMetaByProperty('og:type', metadata.type ?? 'website');
    upsertMetaByProperty('og:url', canonicalUrl);
    upsertMetaByProperty('og:image', imageUrl);
    upsertMetaByName('twitter:card', 'summary_large_image');
    upsertMetaByName('twitter:title', metadata.title);
    upsertMetaByName('twitter:description', metadata.description);
    upsertMetaByName('twitter:image', imageUrl);
    upsertCanonical(canonicalUrl);
  }, [location.pathname]);

  return null;
}