# Angel's — Creative, Architecture & Technical Plan (Phases 3–5)

Status: **For approval (Phase 6)** · Date: 13 Nov 2026 · Requirements: [01-requirements.md](01-requirements.md) (approved with defaults)

---

# PHASE 3 — CREATIVE CONCEPT

## Concept: "Silk & Light"

The site feels like the opening of a silk saree. Burgundy darkness parts to reveal ivory light and gold zari, and the drape moves the way pleats fall. The whole experience is quiet, slow and confident. Two references guide the tone:

- Couture house campaign sites: big imagery, little text.
- Indian heritage textile books: macro zari detail, warm daylight.

## Moodboard direction

| Theme | What it looks like |
|---|---|
| Light | Warm window light, late-afternoon gold, soft shadows. No studio flash. |
| Texture | Macro kasavu borders, Kanjeevaram motifs, pleat edges, jasmine, zari threads catching light |
| Setting | Ivory plaster walls, teak wood, Kerala tharavadu doorway, church window light, plain burgundy backdrop |
| People | Kerala brides with natural skin tones, calm and confident expressions. Many shots are cropped to hands, shoulder and pallu, so the fabric is the hero. |
| Grade | Warm, slightly desaturated, lifted blacks, film-like grain. Everything looks like one shoot. |
| Avoid | Glitter, heavy gold frames, mandala clip-art, oversaturated reds, cluttered sets |

## Colour system

| Token | Hex | Use |
|---|---|---|
| `ivory` | #F8F3EA | Main background |
| `beige` | #E9DFD0 | Alternate sections, image mats |
| `burgundy` | #541B2B | Hero, dark sections, primary buttons |
| `gold` | #C6A66B | Hairlines, small accents, text on burgundy only |
| `gold-muted` | #A88B58 | Hover/active states, icons on ivory (large sizes only) |
| `charcoal` | #292421 | Body text on ivory (contrast ≈ 14:1) |

Rules:
- About 70% ivory/beige, 20% burgundy, 10% gold.
- Gold never appears as small text on ivory.
- WhatsApp buttons use burgundy rather than WhatsApp green, plus the official WhatsApp glyph, so they stay on-brand.

## Typography

| Role | Latin | Malayalam |
|---|---|---|
| Display / headings | **Cormorant Garamond** (300/500, italic for emphasis) | **Noto Serif Malayalam** (400/600) |
| Body / UI | **Jost** (300/400/500), with generous tracking on caps labels | **Manjari** (400/700) |

Scale:
- Hero headline: clamp(3rem, 9vw, 8.5rem).
- Section titles: clamp(2.25rem, 5vw, 4.5rem).
- Body: 17–18px with 1.7 line-height.
- Eyebrow labels: 12px, uppercase, 0.28em tracking.

## Wordmark

**ANGEL'S** is set in a custom-spaced, high-contrast serif (Cormorant Garamond base, redrawn as SVG):
- A fine gold hairline flows from the apostrophe like a pallu edge.
- Monogram: an "A" with a single draped stroke, used for the favicon, app icon and the loading state.
- Lockup: `ANGEL'S` above `BRIDAL · DRAPING · BEAUTY`.
- Variants: burgundy on ivory, ivory on burgundy, and gold on burgundy.
- I'll deliver it as an SVG in the first dev milestone for your sign-off.

## Hero concept

1. **0–0.6s:** Burgundy screen. The monogram draws itself as a gold stroke.
2. **0.6–1.8s:** The bride image is revealed through a soft, diagonal clip that sweeps in like a pallu being thrown over the shoulder. The image scales from 1.08 to 1.
3. **Silk layer:** A WebGL silk surface (burgundy with gold sheen) ripples slowly behind and around the image. It responds subtly to the pointer on desktop and to gyroscope tilt or a gentle loop on mobile.
4. **Text:**
   - "ANGEL'S" letters rise in.
   - Then "Every Drape Tells a Story." appears line by line.
   - Then the supporting line and two CTAs: **Explore Our Services** and **Enquire on WhatsApp**.
5. **Scroll:** The silk drifts upward and fades, and the image parallaxes slower than the text, giving a hand-off to the brand introduction.

The hero image and text are server-rendered, so LCP is the image, not the 3D. The silk loads after first paint.

## Animation concept

| Pattern | Where | Detail |
|---|---|---|
| Masked image reveal | Feature images | clip-path inset 100%→0, 1.1s, ease `power3.out` |
| Line-by-line text | Headings | Lines rise 100%→0 with 0.08s stagger. Text stays readable if JS fails. |
| Layered parallax | 3–4 key sections only | Max 8–12% offset. Disabled on reduced motion. |
| Pinned story | "Our Artistry" | 3 steps (Consult → Drape → Reveal). Image crossfades while text scrolls. |
| Horizontal service rail | Home services | Scroll-driven horizontal track on desktop, native swipe on mobile |
| Thread line | Section dividers | A gold hairline draws across as the section enters |
| Lightbox | Gallery | Shared-element zoom (View Transitions API, with fade fallback) |
| Micro | Buttons/links | Underline draw and 150ms colour ease. No bounce. |

Reduced motion:
- Every effect above becomes a simple fade or is removed.
- The silk becomes a still poster image.

## Photography direction

- AI-generated, photorealistic, one consistent "shoot". The full prompt set is in [03-image-prompts.md](03-image-prompts.md).
- Shot types:
  - About 40% detail macros (pleats, pallu, zari, hands, jasmine).
  - About 40% editorial bride portraits with calm, natural poses.
  - About 20% environment shots (doorway, window light, church).
- Ratios:
  - Hero: 3:2 desktop and 4:5 mobile (separate crops).
  - Features: 4:5.
  - Details: 1:1.
  - OG: 1.91:1.
- The images are used as campaign and Lookbook imagery, never as client work (see requirements section 12).

---

# PHASE 4 — WEBSITE ARCHITECTURE

## Sitemap

```
/                         Home
/about                    About Angel's
/services                 Services index
/services/[slug]          15 service pages (bridal-saree-draping, kanjeevaram-bridal-draping, …)
/lookbook                 Gallery (renamed from "Gallery" while imagery is illustrative)
/contact                  Contact & enquiry
/ml/...                   Malayalam mirror of every page
/sitemap.xml  /robots.txt  /opengraph-image
```

## Navigation

- **Desktop:** Wordmark | Services ▾ | Lookbook | About | Contact | EN/മല | Instagram icon | [Enquire] button.
- **Mobile:** Wordmark + menu. The full-screen menu has large serif links, plus WhatsApp and Call at the bottom.
- **Persistent mobile bar** (appears after the hero): [WhatsApp] [Call].
- **Desktop:** a floating WhatsApp button at the bottom right.

## Page structure (wireframes)

### Home

```
┌─────────────────────────────────────────┐
│ HERO  full-bleed bride + silk           │
│ ANGEL'S / Every Drape Tells a Story.    │
│ [Explore Services] [Enquire on WhatsApp]│
├─────────────────────────────────────────┤
│ INTRO  big serif statement · 25 years   │  pleat macro (right, parallax)
├─────────────────────────────────────────┤
│ ARTISTRY  pinned: Consult→Drape→Reveal  │
├─────────────────────────────────────────┤
│ BRIDAL  editorial split: image 60% /    │
│ text 40% · Christian · Hindu · Muslim · │
│ Kanjeevaram links                       │
├─────────────────────────────────────────┤
│ DRAPING  horizontal rail of services    │
├─────────────────────────────────────────┤
│ OCCASIONS  burgundy section · reception │
│ church functions · guests · groups      │
├─────────────────────────────────────────┤
│ LOOKBOOK preview  asymmetric 5-image    │
├─────────────────────────────────────────┤
│ WHY ANGEL'S  4 numbered statements      │
├─────────────────────────────────────────┤
│ TESTIMONIALS (hidden until real)        │
├─────────────────────────────────────────┤
│ INSTAGRAM  6-tile grid + Follow         │
├─────────────────────────────────────────┤
│ ENQUIRY  builder form → WhatsApp / Call │
├─────────────────────────────────────────┤
│ FOOTER  wordmark · hours · links · lang │
└─────────────────────────────────────────┘
```

### Service detail

```
Breadcrumb
Hero image (4:5 left) | H1, intro, [Enquire about <service>] [Call]
What's included · Where (parlour / at home) · Good to know
Detail image strip (2–3)
Related services (3)
Enquiry builder (service pre-selected)
```

### Other pages

- **Lookbook:**
  - Filter chips (Bridal / Kerala / Kanjeevaram / Occasion / Details).
  - Masonry grid.
  - Lightbox with "Enquire about this look".
- **About:**
  - Story timeline: Angel's Beauty Parlour, Manimooly → 25 years → Angel's online.
  - Merlin and Vijisha (text only).
  - Values.
  - CTA.
- **Contact:**
  - WhatsApp and Call cards with live hours state.
  - Enquiry builder.
  - Location (Manimooly, Nilambur, Malappuram) and serving area (all of Kerala).
  - Instagram.

## User journey

1. A visitor arrives from Instagram, Google or a WhatsApp share, usually on mobile and often on a service page.
2. The hero and sticky bar put WhatsApp within one tap at all times.
3. They explore a service, then press "Enquire about Kanjeevaram Bridal Draping".
4. The enquiry builder opens with the service pre-filled. They add the date, place and number of people.
5. WhatsApp opens with a polite, structured message in the visitor's language.
6. If they'd rather talk, they press **Call** (shown 10am–8pm). Outside those hours, "WhatsApp us anytime" is shown instead.

## WhatsApp conversion strategy

- **One helper** (`buildWhatsAppUrl(service?, details?, locale)`) is used everywhere, so wording and encoding are consistent.
- **Two levels of CTA:**
  - Quick: one tap opens a pre-filled message for that service.
  - Detailed: the builder adds date, place, people and parlour/home.
- **Trust details near CTAs:**
  - "25 years · Angel's Beauty Parlour, Nilambur"
  - "Replies on WhatsApp"
  - "Serving all of Kerala"
- **Tracking:** click events per CTA location and service, once analytics is on (Vercel Analytics by default).

---

# PHASE 5 — TECHNICAL PLAN

## Stack (latest stable, checked 13 Nov 2026)

| Package | Version | Why |
|---|---|---|
| next | 16.4 | App Router, static generation, `next/image`, `next/font`, metadata API, sitemap/robots |
| react | 19.3 | — |
| typescript | strict | — |
| tailwindcss | 4.3 | Design tokens via `@theme` |
| next-intl | 4.15 | EN/ML routing, hreflang, localized metadata |
| gsap + @gsap/react | 3.15 / 2.1 | ScrollTrigger, SplitText, timelines. One animation engine for everything. |
| three | 0.187 | Hero silk shader only, dynamically imported |

Deliberately left out, to keep the bundle small:
- **Framer Motion:** GSAP covers it; two engines would double the motion code.
- **React Three Fiber:** one shader plane doesn't need a React renderer. Plain three in one component is about 60% smaller.
- **Lenis smooth-scroll:** native scroll is better for accessibility and mobile.
- Environment: Node 24.16 and npm 11.13 are installed. The package manager is npm.

## Folder structure

```
drape/
├─ docs/                         requirements, plan, prompts, asset inventory
├─ content/
│  ├─ site.ts                    brand, phone, WhatsApp, Instagram, hours, location
│  ├─ services.ts                15 services (EN/ML, slug, image ids, visible flag)
│  ├─ lookbook.ts                gallery items + categories
│  ├─ instagram.ts               curated tiles
│  ├─ testimonials.ts            empty → section auto-hidden
│  └─ assets.ts                  image manifest (file, alt EN/ML, type, source, licence, replace-with)
├─ messages/en.json, ml.json     UI strings
├─ public/images/…               generated AVIF/WebP originals by section
├─ scripts/
│  ├─ generate-images.mjs        runs prompts → public/images (needs your image-API key, see below)
│  └─ asset-inventory.mjs        manifest → docs/asset-inventory.md
├─ src/
│  ├─ app/[locale]/              layout, page, about, services/[slug], lookbook, contact
│  ├─ app/sitemap.ts, robots.ts, opengraph-image.tsx
│  ├─ components/
│  │  ├─ layout/                 Header, MobileMenu, Footer, LangSwitch, ContactBar
│  │  ├─ hero/                   Hero, SilkCanvas (three, client, lazy), SilkPoster
│  │  ├─ sections/               Intro, Artistry, Bridal, ServiceRail, Occasions, Why, Instagram, Enquiry
│  │  ├─ gallery/                Masonry, Lightbox, FilterChips
│  │  ├─ motion/                 Reveal, SplitLines, Parallax, ThreadLine (GSAP wrappers)
│  │  └─ ui/                     Button, WhatsAppButton, CallButton, Wordmark, Breadcrumbs
│  ├─ lib/                       whatsapp.ts, hours.ts (IST), seo.ts (metadata + JSON-LD), motion.ts
│  └─ i18n/                      routing, request config
└─ next.config.ts                AVIF/WebP, security headers
```

## Component architecture

- **Server components by default.** All copy, images and JSON-LD are rendered on the server, so they're crawlable and fast.
- **Client islands only where needed:**
  - SilkCanvas
  - motion wrappers
  - Lightbox
  - EnquiryBuilder
  - CallButton (live hours)
  - MobileMenu
- **Content-driven:** pages map over `content/*.ts`. Adding or hiding a service means editing one file. Swapping a photo means editing one manifest entry.

## Animation implementation

- A single `gsap.matchMedia()` setup branches on `prefers-reduced-motion`, viewport width and pointer type.
- `useGSAP` handles scoped cleanup. Only transform, opacity and clip-path are animated, so there's no layout shift.
- **SilkCanvas:**
  - Fragment-shader cloth (layered noise + fake anisotropic sheen) on one plane.
  - DPR capped at 1.5, pauses when off-screen or the tab is hidden, about 30fps on mobile.
  - Loaded through `next/dynamic` after `requestIdleCallback`.
  - Falls back to SilkPoster (a still AVIF) when WebGL is missing, `saveData` is on, low `deviceMemory`, or reduced motion is set.
- Text reveals are progressive enhancement. Content is visible in HTML, and JS adds the animation.

## SEO implementation

- `generateMetadata` per page and locale: title, description, canonical, `alternates.languages` (hreflang en-IN / ml-IN / x-default), and Open Graph/Twitter cards.
- JSON-LD from `lib/seo.ts`:
  - `BeautySalon`: name, telephone, address limited to locality/region/country, `areaServed` Kerala, `openingHoursSpecification` 10:00–17:00 daily, `sameAs` Instagram.
  - `Service` per service page.
  - `BreadcrumbList`.
  - `WebSite`.
- `sitemap.ts` covers all pages × locales with alternates. `robots.ts` allows all and points to the sitemap.
- An H1 per page, semantic landmarks, descriptive slugs and internal links (related services, footer, breadcrumbs).
- Search Console and Bing verification via environment-variable meta tags, so no code changes are needed.

## Asset management

- `content/assets.ts` is the single source of truth. Each image has:
  - id
  - path
  - width/height
  - alt (EN/ML)
  - type (`illustrative` | `portfolio`)
  - source
  - licence
  - prompt id
  - recommended real replacement
- `scripts/asset-inventory.mjs` generates `docs/asset-inventory.md` from the manifest.
- Blur placeholders are generated at build time, and `next/image` serves AVIF/WebP with responsive `sizes`.

## How the images get created

I don't have an image-generation tool in this session, and this laptop's GPU (RTX 3050, 4 GB) is too small to run a good photoreal model locally. So:

1. **During development** every image slot shows a tasteful burgundy/ivory placeholder with the right ratio, so the layout and motion can be built and reviewed.
2. **To generate the real images**, choose one:
   - **A. (Recommended) Google AI Studio API key** (Imagen / Gemini image). Strong photorealism for Indian bridal looks, and commercial use is allowed. You set `GOOGLE_API_KEY` in a local `.env.local` yourself, and I run `scripts/generate-images.mjs`. It renders every prompt, converts to AVIF/WebP, and writes the files into `public/images` and the manifest.
   - **B. OpenAI API key** (`OPENAI_API_KEY`), using the same script with a different provider.
   - **C. You generate them** in Midjourney, Firefly or Gemini using [03-image-prompts.md](03-image-prompts.md), drop the files into `public/images/incoming/` named by prompt id, and I wire them in.

   For A or B, typical cost for about 30 images with a few retries is a few US dollars.
3. **I review every image before it goes live.** Images with distorted hands, wrong saree draping, garbled zari or any watermark are rejected and regenerated.

## Deployment plan

1. Create a Git repository and push it to GitHub (your account).
2. Import the project into Vercel. Framework is auto-detected, with Node 24.
3. Set environment variables:
   - `NEXT_PUBLIC_SITE_URL`
   - verification tokens
   - analytics toggle
4. Preview deployments per branch. Production on `main`.
5. Domain: use the Vercel subdomain until you buy one, then add DNS (A / CNAME). SSL is automatic.
6. Post-launch:
   - Submit the sitemap in Search Console and Bing (Bing can import from GSC).
   - Create the Google Business Profile.
   - Run Lighthouse and the Rich Results test.
7. Portability: no Vercel-only APIs, so the project can move to Netlify, Cloudflare or a VPS later.

## Development milestones (after approval)

| # | Milestone | You review |
|---|---|---|
| M1 | Project setup, tokens, fonts, wordmark SVG, layout shell, i18n | Wordmark + typography |
| M2 | Home page with motion + silk hero (placeholder images) | Look & feel |
| M3 | Services, About, Lookbook, Contact, enquiry builder, WhatsApp/Call | Flows on your phone |
| M4 | Image generation + integration, asset inventory | Every image |
| M5 | SEO, structured data, sitemap, Malayalam copy | Malayalam proofread |
| M6 | QA (devices, a11y, Lighthouse), Vercel deploy, launch checklist | Go-live |
