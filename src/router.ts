import type { Page } from "./data";

// Vite's `base` puede ser un subdirectorio (FIGMA_PUBLIC_URL), sin barra final.
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

const slugs: Record<Page, string> = {
  home: "",
  gallery: "gallery",
  archive: "archive",
  news: "news",
  shop: "shop",
  about: "about",
  contact: "contact",
  studio: "studio",
  book: "book",
};

const pages = Object.fromEntries(
  Object.entries(slugs).map(([page, slug]) => [slug, page as Page]),
) as Record<string, Page>;

export function pageToPath(page: Page): string {
  return `${BASE}/${slugs[page]}`;
}

export function pathToPage(pathname: string): Page {
  const rest = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return pages[rest.replace(/^\/+|\/+$/g, "")] ?? "home";
}
