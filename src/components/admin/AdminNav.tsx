"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/edit/services", label: "Services & prices" },
  { href: "/admin/media", label: "Photos" },
  { href: "/admin/edit/copy", label: "Page text" },
  { href: "/admin/edit/banner", label: "Banner" },
  { href: "/admin/edit/lookbook", label: "Lookbook" },
  { href: "/admin/edit/seo", label: "SEO" },
  { href: "/admin/edit/site", label: "Business details" },
];

export function AdminNav() {
  const path = usePathname();
  const active = (href: string) => (href === "/admin" ? path === href : path.startsWith(href));
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/admin" className="font-display text-2xl text-burgundy">
          Angel&apos;s <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone">Admin</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <a href="/" target="_blank" rel="noopener" className="text-stone hover:text-burgundy">View site ↗</a>
          <form action={signOut}>
            <button className="text-stone hover:text-burgundy">Sign out</button>
          </form>
        </div>
      </div>
      <nav aria-label="Admin" className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 md:px-6">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active(l.href) ? "page" : undefined}
            className="shrink-0 border-b-2 border-transparent px-3 py-2.5 text-sm text-stone hover:text-burgundy aria-[current=page]:border-burgundy aria-[current=page]:text-burgundy"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
