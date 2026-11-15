import { useState, useEffect, useCallback } from 'react';
import { MAIN_SERVICE_CATEGORIES } from '../data/categoriesData';

const VALID_SLUGS = new Set(MAIN_SERVICE_CATEGORIES.map((c) => c.slug));

export function useSpaRouter() {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);

  // Helper to resolve base URL
  const getBaseUrl = useCallback(() => {
    // import.meta.env.BASE_URL is e.g. '/sabon-spa/'
    const base = import.meta.env.BASE_URL || '/';
    return base.endsWith('/') ? base : `${base}/`;
  }, []);

  // Parse category slug from location (pathname, search or hash)
  const parseCurrentCategory = useCallback((): string | null => {
    const pathname = window.location.pathname;
    const search = window.location.search;
    const hash = window.location.hash;

    // 1. Check pathname: e.g. /sabon-spa/services/massage or /services/massage
    const pathMatch = pathname.match(/\/services\/([a-z0-9-]+)/i);
    if (pathMatch && VALID_SLUGS.has(pathMatch[1])) {
      return pathMatch[1];
    }

    // 2. Check query params: e.g. ?category=massage or ?p=/services/massage (from 404.html redirect)
    const urlParams = new URLSearchParams(search);
    const catQuery = urlParams.get('category');
    if (catQuery && VALID_SLUGS.has(catQuery)) {
      return catQuery;
    }
    const pQuery = urlParams.get('p');
    if (pQuery) {
      const pMatch = pQuery.match(/\/services\/([a-z0-9-]+)/i);
      if (pMatch && VALID_SLUGS.has(pMatch[1])) {
        return pMatch[1];
      }
    }

    // 3. Check hash: e.g. #/services/massage or #services/massage
    const hashMatch = hash.match(/#\/?services\/([a-z0-9-]+)/i);
    if (hashMatch && VALID_SLUGS.has(hashMatch[1])) {
      return hashMatch[1];
    }

    return null;
  }, []);

  // Initialize on mount and handle initial redirect decoding
  useEffect(() => {
    // Handle GitHub Pages SPA redirect parameter (?p=...)
    const search = window.location.search;
    if (search.includes('?p=/')) {
      const pQuery = new URLSearchParams(search).get('p');
      if (pQuery) {
        const cleanPath = getBaseUrl() + pQuery.replace(/^\/+/, '');
        window.history.replaceState(null, '', cleanPath);
      }
    }

    const initialSlug = parseCurrentCategory();
    setActiveCategorySlug(initialSlug);

    // Listen for browser Back/Forward navigation
    const handlePopState = () => {
      const slug = parseCurrentCategory();
      setActiveCategorySlug(slug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseCurrentCategory, getBaseUrl]);

  // Navigate to dedicated category detail page
  const navigateToCategory = useCallback(
    (slug: string) => {
      if (!VALID_SLUGS.has(slug)) return;

      setActiveCategorySlug(slug);
      const targetUrl = `${getBaseUrl()}services/${slug}`;

      // Update URL with clean path
      window.history.pushState({ category: slug }, '', targetUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [getBaseUrl]
  );

  // Navigate back to homepage (optionally scrolling to a section like #soins)
  const navigateToHome = useCallback(
    (sectionId?: string) => {
      setActiveCategorySlug(null);
      const targetUrl = sectionId ? `${getBaseUrl()}#${sectionId}` : getBaseUrl();
      window.history.pushState({}, '', targetUrl);

      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [getBaseUrl]
  );

  return {
    activeCategorySlug,
    navigateToCategory,
    navigateToHome,
  };
}
