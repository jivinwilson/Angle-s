import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { supabaseEnv } from "@/lib/content";
import { supabaseServer } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin/AdminNav";
import "../globals.css";

const jost = Jost({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jost" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500"], variable: "--font-cormorant" });

export const metadata: Metadata = { title: "Angel's Admin", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const configured = !!supabaseEnv();
  const signedIn = configured && !!(await (await supabaseServer()).auth.getClaims()).data?.claims;

  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable}`}>
      <body className="min-h-svh bg-ivory text-[0.95rem]">
        {!configured ? (
          <main className="mx-auto max-w-lg p-8">
            <h1 className="text-2xl font-medium">Admin isn&apos;t connected yet</h1>
            <p className="mt-3 text-stone">Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to the environment.</p>
          </main>
        ) : signedIn ? (
          <>
            <AdminNav />
            <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 md:px-8">{children}</main>
          </>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
