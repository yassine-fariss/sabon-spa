import { getAssetUrl } from '../utils/assets';

export interface LocalizedString {
  en: string;
  fr: string;
}

export interface Subcategory {
  id: string;
  order: number;
  name: LocalizedString;
}

export interface Category {
  id: string;
  order: number;
  icon: string;
  name: LocalizedString;
  tagline: LocalizedString;
  subcategories: Subcategory[];
  count: number;
}

export interface ServiceVariant {
  label: string;
  price: number;
  duration?: number;
}

export interface Service {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  duration?: number;
  price?: number;
  priceFrom?: boolean;
  variants?: ServiceVariant[];
  audience?: ('women' | 'men' | 'kids' | 'pregnancy')[];
  featured?: boolean;
  type?: string;
  description?: string;
  includes?: string[];
}

export interface SearchEntry {
  id: string;
  n: string; // name
  c: string; // category
  s: string; // subcategory
  p?: number; // price
}

export interface IndexData {
  meta: {
    business: string;
    currency: string;
    version: string;
  };
  categories: Category[];
}

export interface CategoryData {
  category: Category;
  services: Service[];
}

const memoryCache = new Map<string, unknown>();

async function fetchJson<T>(path: string): Promise<T> {
  if (memoryCache.has(path)) {
    return memoryCache.get(path) as T;
  }
  const url = getAssetUrl(`data/${path}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load ${path} (status ${res.status})`);
  }
  const data = (await res.json()) as T;
  memoryCache.set(path, data);
  return data;
}

export const fetchIndex = () => fetchJson<IndexData>('index.json');
export const fetchCategory = (categoryId: string) => fetchJson<CategoryData>(`${categoryId}.json`);
export const fetchSearchIndex = () => fetchJson<SearchEntry[]>('search-index.json');
