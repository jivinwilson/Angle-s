# Angel's — Requirements Document (Phase 2)

Status: **Draft for approval** · Date: 13 Nov 2026
Legend: ✅ confirmed by client · ⚠️ assumed, needs confirmation · ⏳ deferred

---

## 1. Project summary

Angel's is a bridal styling, saree draping and beauty brand from Nilambur, Malappuram, Kerala. It is built on the 25 years Merlin Sanoj has run her beauty parlour at Manimooly. The website takes the business online. It should present Angel's as a premium bridal styling brand and turn visitors into WhatsApp enquiries and phone calls.

The site is **not** e-commerce: no payments, cart, checkout or customer accounts.

## 2. Confirmed business facts

| Item | Value | Status |
|---|---|---|
| Brand name | Angel's | ✅ |
| Wordmark | Typographic wordmark, to be designed | ✅ |
| Tagline | Where Every Drape Becomes Elegance | ✅ |
| Founder | Merlin Sanoj — founded Angel's Beauty Parlour | ✅ |
| Draping stylist | Vijisha (Wilson ⚠️ surname) — saree draping, assists Merlin | ✅ / ⚠️ |
| Heritage | Angel's Beauty Parlour, run by Merlin Sanoj for 25 years | ✅ |
| Brand relationship | "Angel's" is the online brand of Angel's Beauty Parlour | ✅ |
| Existing expertise | Makeup for church functions and weddings | ✅ |
| Parlour location | Manimooly, Nilambur, Malappuram district, Kerala | ✅ |
| Service area | Nilambur / Malappuram, plus anywhere in Kerala for genuine, verified enquiries | ✅ |
| Service mode | At the parlour or at the client's home/venue, decided after enquiry | ✅ |
| WhatsApp | +91 94461 29996 · https://wa.me/919446129996 | ✅ |
| Phone calls | Same number as WhatsApp, calls 10 am – 8 pm, WhatsApp messages only after 8 pm | ✅ |
| Parlour hours | 10 am – 5 pm, every day | ✅ |
| Instagram | @vijishawilson76 is a **temporary** account; the link must be swappable in one place | ✅ |
| Google Business Profile | None yet | ✅ |
| Languages | English + Malayalam | ✅ |
| Pricing | Hidden. No prices anywhere on the site | ✅ |
| Portrait photos | Not now | ✅ |
| Hosting | Vercel for now, may move later | ✅ |

## 3. Goals and success measures

1. **Primary:** qualified enquiries via WhatsApp (pre-filled) and phone calls.
2. **Secondary:** brand trust. A premium first impression that conveys the 25-year heritage.
3. **Discovery:** rank for bridal draping and bridal makeup searches in Nilambur, Malappuram and Kerala, in English and Malayalam. No ranking guarantees.

Measured by (once analytics is confirmed):

- WhatsApp click events per service
- Call click events
- Enquiry-builder completion rate
- Organic search impressions and clicks (Search Console)

## 4. Audience

- Brides and their families, across Christian, Hindu and Muslim weddings in Kerala.
- Wedding guests and family members who need group draping.
- Women dressing for church functions, receptions, festivals and other special occasions.
- Mostly mobile visitors arriving from Instagram, WhatsApp shares and Google. Many browse in Malayalam.

## 5. Scope

### In scope (v1)
- Bilingual (EN/ML) marketing website: Home, About, Services (index and detail pages), Gallery, Contact.
- Enquiry builder that composes a pre-filled WhatsApp message.
- Call button that is aware of call hours.
- Floating WhatsApp button.
- Curated, manually managed Instagram-style gallery.
- Cinematic motion and a hero silk effect, with fallbacks.
- Full technical SEO, structured data, sitemap and robots.txt.
- Centralised content and asset configuration, with an asset inventory.

### Out of scope
- Payments, cart, checkout, accounts, online booking calendar.
- Public pricing.

### Deferred ⏳
- Saree rental and saree sales.
- Founder portraits.
- Real testimonials (the section is built but hidden until real ones are supplied).
- Instagram API feed (until there is a permanent Business account).
- Local landing pages beyond Nilambur/Malappuram (only once there is genuine content for them).
- Google Business Profile, which is strongly recommended. See section 14.

## 6. Service catalogue (configurable)

All services live in one config file. Each has EN/ML name and description, image, enquiry message and a visibility flag.

| Service | Group | Status |
|---|---|---|
| Bridal Saree Draping | Bridal | ✅ |
| Kanjeevaram Bridal Draping | Bridal | ✅ |
| Kerala Style / Kasavu Draping | Traditional | ✅ |
| Christian Bridal Saree Draping | Bridal | ✅ |
| Hindu Bridal Draping | Bridal | ✅ |
| Muslim Bridal Draping & Dupatta Setting | Bridal | ✅ |
| Reception Saree Styling | Occasion | ✅ |
| Wedding Guest Saree Styling | Occasion | ✅ |
| Special Occasion & Church Function Styling | Occasion | ✅ |
| Group / Family Draping (bridesmaids, family) | Occasion | ✅ |
| Lehenga & Dupatta Setting | Occasion | ✅ |
| Saree Pre-pleating & Box Folding | Preparation | ✅ |
| Bridal Makeup | Beauty | ✅ |
| Hair Styling | Beauty | ✅ |
| Custom Styling | Bespoke | ✅ |
| Saree Rental / Sales | — | ⏳ hidden |

Each service page includes:
- Large visual and an editorial description.
- What's included, written as a placeholder until the client confirms details.
- Where it's offered (parlour or on-location).
- Advance-booking note ⚠️.
- A WhatsApp CTA that names the service, and a call CTA.

## 7. Page requirements

### Home
1. Cinematic hero:
   - "Every Drape Tells a Story."
   - Animated wordmark and silk visual.
   - CTAs: Explore Services and Enquire on WhatsApp.
2. Brand introduction, built on the 25-year heritage.
3. Artistry / philosophy.
4. Bridal styling: the editorial feature section.
5. Draping services, covering Kerala and Kanjeevaram.
6. Special occasions and church functions.
7. Featured gallery.
8. Why Angel's. These points use real facts only: 25 years, makeup and draping under one roof, home or parlour service, available across Kerala.
9. Testimonials (hidden until real ones exist).
10. Instagram gallery.
11. Enquiry section with the enquiry builder and call button.
12. Footer: hours, location (locality only), WhatsApp, call, Instagram and language switch.

### About
- Story of Angel's Beauty Parlour, founded by Merlin Sanoj 25 years ago, and how Angel's went online.
- Styling philosophy, values and the bridal approach.
- Vijisha as the draping stylist working alongside Merlin.
- No invented credentials.

### Services
- Index page grouped by Bridal, Traditional, Occasion, Beauty and Preparation.
- One detail page per service, at a descriptive URL such as `/services/kanjeevaram-bridal-draping`.

### Gallery
- Responsive masonry grid.
- Full-screen lightbox with swipe and keyboard support.
- Category filters (shown only when a category has at least 4 images).
- "Enquire about this look" button that builds a WhatsApp message.
- Each image is tagged internally as **portfolio** (real Angel's work) or **illustrative** (AI). In v1 the whole page is the "Lookbook" with a single discreet line ("Styling inspiration") rather than per-image captions; illustrative images are never presented as client work.

### Contact
- WhatsApp and call buttons with hours shown.
- Enquiry builder.
- Instagram link.
- Location: "Manimooly, Nilambur, Malappuram". No street address until confirmed.
- Embedded map only if the client approves (Q6).

## 8. Conversion requirements

- **Floating WhatsApp button** on all pages. On mobile it becomes a sticky bottom bar with WhatsApp and Call.
- **Enquiry builder** (no backend), with these fields:
  - Name
  - Service
  - Event type
  - Event date
  - Place (town/district)
  - Number of people
  - Parlour or at home/venue
  - Optional note

  It produces a URL-encoded `https://wa.me/919446129996?text=…` link, in the language the visitor is browsing in.
- **Service-specific messages.** Example (EN):
  > Hello Angel's! I visited your website and would like to enquire about Kanjeevaram Bridal Draping. Could you please share the details and availability?

  A Malayalam equivalent will be drafted and needs native review.
- **Call button**: `tel:+919446129996`.
  - Between 10 am and 8 pm IST it shows "Call us".
  - Outside those hours it changes to "Calls 10 am – 8 pm · WhatsApp us anytime" and moves WhatsApp to the front.
- No login or registration anywhere.

## 9. Bilingual requirements

- Routes: `/` (English) and `/ml/...` (Malayalam), with a visible language switch on every page.
- `hreflang` tags (en-IN, ml-IN, x-default) and a separate title and meta description per language.
- Malayalam typography uses a dedicated Malayalam font (e.g. Noto Serif Malayalam / Manjari ⚠️) that is tuned to sit alongside the Latin fonts.
- I will draft the Malayalam copy, and **a native speaker must proofread it before launch**.

## 10. Brand and visual requirements

- Palette:
  - Warm Ivory `#F8F3EA`
  - Champagne Gold `#C6A66B`
  - Deep Burgundy `#541B2B`
  - Soft Beige `#E9DFD0`
  - Charcoal `#292421`
  - Muted Gold `#A88B58`
- Gold is used as an accent only. It never carries body text on ivory, because it fails contrast.
- Serif display face for headings (Cormorant Garamond candidate) and a refined sans for body text. Final choice comes in Phase 3.
- "Angel's" typographic wordmark, delivered as SVG in light and dark variants with a favicon/monogram. The client approves it before development.
- Editorial layouts: no generic card grids, no glitter, no excessive ornament.

## 11. Motion and 3D requirements

- Hero: a WebGL silk-fabric surface (React Three Fiber shader plane) in burgundy and gold, with cinematic image reveal and wordmark animation.
- Scroll storytelling (GSAP ScrollTrigger):
  - Masked image reveals.
  - Split-line text reveals.
  - Selective parallax.
  - Depth transitions between sections.
- Gallery: shared-element transitions into the lightbox.
- **Fallbacks:**
  - `prefers-reduced-motion` gets static imagery with simple fades.
  - Low-end devices or missing WebGL get a still or video poster of the silk instead.
  - 3D is lazy-loaded after first paint and never blocks LCP.
- Motion must never delay reaching a CTA, and must never hide text from crawlers.

## 12. Photography and asset requirements

- No real photography exists yet. v1 uses **photorealistic AI-generated imagery** that looks like a real campaign shoot: Kerala kasavu, Kanjeevaram, Christian white-and-gold bridal sarees, pleat and pallu close-ups, makeup details.
- Phase 3 delivers a consistent prompt set (same lighting, skin tones, colour grade and styling) so the images read as one shoot. Images are generated with a tool whose licence allows commercial use (e.g. Midjourney paid plan, Adobe Firefly, Google Imagen) — I cannot generate images inside this session, so the client or developer runs the prompts.
- Honesty rule: AI images are used as brand/campaign imagery and "Lookbook / Inspiration" only. Nothing calls them "our brides" or "our work", and testimonials never sit beside them. The gallery is titled "Lookbook" until real work exists, then a "Our Brides" portfolio section is added.
- Faces: generic, non-identifiable models only; no likeness of real people.
- Every image is registered in one manifest (`content/assets`) with:
  - id
  - file
  - alt text (EN/ML)
  - purpose
  - type (portfolio/illustrative)
  - source and licence
  - recommended replacement shot
- Asset inventory document generated from that manifest.
- Shot list for a future Angel's photoshoot, mapped to every image slot.
- Images: AVIF/WebP via Next Image, responsive sizes, blur placeholders, and lazy loading below the fold.
- Never used: watermarked images, Pinterest or competitor images, or stock presented as client work.

## 13. Instagram requirements

- The account is temporary, so the handle and URL live in a single config value.
- Manually curated gallery (6–9 images) in the config/asset folder, styled as an Instagram grid, with a "Follow Angel's" CTA.
- Instagram icon in the navigation and footer.
- No scraping, third-party widgets or follower counts.
- An API feed will be considered once there is a permanent Business/Creator account linked to a Facebook Page.

## 14. SEO requirements

Technical:
- Unique title, description and canonical URL per page and language.
- Semantic HTML with one H1 per page.
- Open Graph and Twitter cards.
- `sitemap.xml` (with hreflang) and `robots.txt`.
- Breadcrumbs on service pages.
- Descriptive alt text.
- Core Web Vitals targets: LCP < 2.5 s, CLS < 0.1, INP < 200 ms on mid-range mobile.
- Ready for verification in Search Console and Bing Webmaster Tools.

Structured data:
- `BeautySalon` (LocalBusiness subtype) with name, telephone and `address` limited to locality/district/region (no street).
- `areaServed`: Kerala.
- `openingHours`.
- `sameAs` pointing to Instagram.
- `Service` entries per service, `BreadcrumbList`, and `WebSite`.
- No ratings or review schema until there are real reviews.

**Strongly recommended:** create a Google Business Profile for the Manimooly parlour. For "near me" and Nilambur searches it matters more than anything on the website.

Preliminary keyword groups (hypotheses only). These will be validated with keyword tools in Phase 4, and no search volumes are claimed:

| Intent cluster | Example terms | Target page |
|---|---|---|
| Bridal draping, Kerala | bridal saree draping Kerala, wedding saree draping | Bridal Saree Draping |
| Kanjeevaram | Kanjeevaram saree draping, silk saree bridal draping | Kanjeevaram service |
| Christian bridal | Christian bridal saree draping Kerala, church wedding saree styling | Christian Bridal service |
| Local brand | beauty parlour Nilambur, bridal makeup Nilambur, Manimooly beauty parlour | Home / Contact |
| District | bridal makeup Malappuram, saree draping Malappuram | Home / service pages |
| Preparation | saree pre-pleating Kerala, saree box folding | Pre-pleating service |
| Malayalam | സാരി ഡ്രേപ്പിംഗ്, ബ്രൈഡൽ മേക്കപ്പ് നിലമ്പൂർ | /ml equivalents |

## 15. Performance and accessibility

- Lighthouse score of 90+ on mobile for Performance, Accessibility, Best Practices and SEO (target, not guarantee).
- WCAG 2.2 AA:
  - Contrast.
  - Keyboard navigation, including the lightbox and language switch.
  - Visible focus.
  - Labelled form fields.
  - Reduced motion.
- Fonts self-hosted via `next/font` and subset.
- Code splitting, with heavy 3D/GSAP loaded only where used.
- Minimal dependencies.

## 16. Technical constraints

- Next.js (latest stable, App Router), TypeScript strict, Tailwind CSS.
- Motion: GSAP + ScrollTrigger and Framer Motion. Three.js / React Three Fiber in the hero only.
- Statically generated where possible, with no backend or database.
- All business data, services, copy (EN/ML), hours and links in typed content files.
- Deploy on Vercel and stay portable to other hosts. No Vercel-only APIs.

## 17. Content integrity rules

- Use only facts the client confirmed (25 years, founders, location, hours, services).
- No invented awards, certifications, client counts, testimonials, ratings or follower counts.
- Placeholders are clearly marked in the content config and listed in a launch checklist.

## 18. Open questions (defaults apply if unanswered)

| # | Question | Default if no answer |
|---|---|---|
| Q1 | ✅ Answered: Merlin Sanoj founded Angel's Beauty Parlour; Angel's is its online brand | — |
| Q2 | Vijisha's surname for display ("Vijisha Wilson"?) | "Merlin Sanoj — Founder" · "Vijisha — Draping Stylist" |
| Q3 | ✅ Answered: parlour 10 am – 5 pm daily, calls 10 am – 8 pm | — |
| Q4 | ✅ Answered: same number for calls and WhatsApp | — |
| Q5 | Should makeup be its own featured service line ("Bridal Makeup & Draping"), or stay secondary to draping? | Featured alongside draping |
| Q6 | Show a map pin for the Manimooly parlour? | Locality text only, no map |
| Q7 | Typical advance-booking time to mention? | "Enquire early for wedding dates" (no number) |
| Q8 | ✅ Answered: photorealistic AI-generated imagery for v1 | — |
| Q9 | ✅ Answered: no real photos yet | — |
| Q10 | Any real client feedback (with permission) for testimonials? | Section hidden |
| Q11 | Domain name? | Vercel subdomain until purchased |
| Q12 | Analytics: GA4, Plausible/Umami, or none? | Vercel Web Analytics + WhatsApp/call click events |
| Q13 | Who updates content later: edit config files, or need a simple CMS? | Config files in repo |
| Q14 | Target launch date? | None fixed |
| Q15 | Who will proofread the Malayalam copy? | Client nominates someone |

## 19. Acceptance criteria (v1)

- All pages are live in EN and ML.
- Every WhatsApp entry point opens the correct, encoded, service-specific message on mobile and desktop.
- The call button behaves correctly inside and outside 10 am – 8 pm IST.
- Mobile Lighthouse scores meet the targets on Home, Service and Gallery pages.
- Reduced-motion and no-WebGL fallbacks have been checked.
- Structured data validates in Google's Rich Results Test, with no errors.
- Sitemap and robots.txt are served, and hreflang tags are valid.
- The asset inventory covers 100% of images, and every illustrative image is labelled.
- No fabricated business information remains, and all placeholders are resolved or hidden.
