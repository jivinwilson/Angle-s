export const locales = ["en", "ml"] as const;
export type Locale = (typeof locales)[number];
export type L<T = string> = Record<Locale, T>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function href(locale: Locale, path = "/") {
  if (locale === "en") return path;
  return path === "/" ? "/ml" : `/ml${path}`;
}

export function swapLocale(pathname: string, to: Locale) {
  const base = pathname === "/ml" ? "/" : pathname.replace(/^\/ml(?=\/)/, "");
  return href(to, base);
}

export const localeParams = () => locales.map((locale) => ({ locale }));
