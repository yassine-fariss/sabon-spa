# Sabon Spa — Design & Build Direction

Decisions confirmed: **Ocean / midnight** visual direction · **French + English**

---

## 1. Concept

**"Sous la surface."** / **"Beneath the surface."**

The site behaves like the hammam: you descend from the bright Tangier street into a dark, cool, glowing space. Dark base, pearl type, rose and brass highlights, light that feels like it's coming through water.

Not a spa template. A place you can feel before you book.

## 2. Design tokens

### Colour — OFFICIAL brand palette (provided by client)
| Token | Hex | Role in the site |
|---|---|---|
| `brand` | `#1672B1` | Primary buttons, links, active states, highlights |
| `navy` | `#082B49` | Hero, nav, dark sections, footer, primary text on light |
| `aqua` | `#63B9D1` | Light effects, glow, interactive details, gradients, eyebrows on navy |
| `mist` | `#EAF3F6` | Light backgrounds, cards, content sections |
| `ivory` | `#F3EEE5` | Editorial bands, warm neutral contrast |
| `white` | `#FFFFFF` | Text on dark, clean surfaces |

Derived (for depth, not new brand colours):
| Token | Hex | Use |
|---|---|---|
| `navy-800` | `#0A3357` | Card base over navy |
| `navy-700` | `#0E3D66` | Hover, raised surfaces |
| `brand-600` | `#125E92` | Button hover/pressed |
| `brand-100` | `#D6E8F3` | Tinted chips, hover fills on light |
| `line-dark` | `rgba(99,185,209,0.22)` | Glass borders on navy |
| `line-light` | `rgba(8,43,73,0.10)` | Borders on mist/ivory |
| `text-muted-dark` | `rgba(234,243,246,0.68)` | Secondary text on navy |
| `text-muted-light` | `rgba(8,43,73,0.64)` | Secondary text on mist |

### Contrast checks (WCAG)
- `#EAF3F6` on `#082B49` — **12.9:1** ✅ headings and body on dark
- `#082B49` on `#EAF3F6` — **12.9:1** ✅ body on light
- `#FFFFFF` on `#1672B1` — **5.15:1** ✅ button labels, normal text
- `#63B9D1` on `#082B49` — **6.49:1** ✅ accent text/icons on navy
- `#63B9D1` on `#EAF3F6` — **2.23:1** ❌ never use for text; effects/graphics only
- `#1672B1` on `#082B49` — **2.81:1** ❌ never use for text on navy

### Glass recipe
- Dark glass: `background: rgba(234,243,246,0.06)` · `backdrop-filter: blur(18px) saturate(140%)` · `border: 1px solid rgba(99,185,209,0.22)` · inner top highlight `inset 0 1px 0 rgba(255,255,255,0.12)`
- Light glass (over mist/ivory): `background: rgba(255,255,255,0.55)` · `border: 1px solid rgba(8,43,73,0.10)` · shadow `0 12px 40px rgba(8,43,73,0.08)`
- Sheen: 120° gradient `rgba(99,185,209,0.18) → transparent 45%`, animated on hover/scroll
- Focus ring: `0 0 0 2px #63B9D1` at 2px offset
- Max 3 blurred layers per viewport; solid `rgba(10,51,87,0.92)` fallback on low-end mobile

### Section colour rhythm
1. Hero / nav / footer — `navy`
2. Proof strip — `navy-800` glass over navy
3. Treatments — `mist` (light, readable prices)
4. Immersive break — `navy` + caustics
5. Packs — `ivory` editorial band
6. Gallery — `navy` full-bleed
7. Team / reviews — `mist`
8. Practical + booking — `white`
9. FAQ — `mist`
10. Footer — `navy`

Light sections use `navy` text with `brand` links, so long content stays readable and printable.

### Type
- Display: **Cormorant Garamond** or **Playfair Display** — 300/400 weight, large sizes, tight tracking (-0.02em), occasional italic for emphasis.
- UI/body: **Geist** or **Inter** — 400/500, 16–18px body, 1.65 line-height.
- Eyebrows: 12px, uppercase, `0.18em` tracking, brass.
- Never set long paragraphs in the serif.

### Texture & motifs
- Moorish **arch** masks on key images.
- **Salt-brick** subtle noise texture (SVG/CSS) on section edges.
- **Zellige** 8-point star line pattern at 4–6% opacity.
- **Caustic light** gradient sweeping slowly across the hero.
- Rounded corners: 2px on cards (keep it architectural, not bubbly).

## 3. Page architecture (homepage)

1. **Hero** — full-viewport hammam vault or muted Reel loop. Eyebrow "Tanger · Malabata". H1 "Sous la surface, le calme." Subline FR + language switcher. Two CTAs: *Réserver* / *Découvrir les soins*. Scroll cue.
2. **Proof strip** — 5.0 Google · 5.0 Fresha · 5.0 Tripadvisor · 100% espaces séparés · Depuis 2024.
3. **Signature rituals** — 4 large cards: Hammam Royal, Massage Merzouga, Rituel Kobido, Jacuzzi & Piscine. Arch-topped images, 1-line description, duration, "à partir de".
4. **Immersive break** — the 3D/caustic moment. One sentence, full-bleed. Not interactive clutter.
5. **Packs** — Bronze / Silver / Gold, horizontal comparison, what's included, duration, price.
6. **Gallery** — masonry of real interiors, lightbox, keyboard accessible.
7. **The team** — 3–4 therapists, portrait, specialty, years. Real names only.
8. **Reviews** — 3–6 real quotes with source and date. No invented names.
9. **Practical** — address, hours, parking, map, phone/WhatsApp, "espaces séparés" explained.
10. **Booking CTA** — WhatsApp + phone + form. One primary action.
11. **FAQ** — 6 questions, accordion, schema.org FAQPage.
12. **Footer** — logo, nav, socials, legal, hreflang.

Secondary pages (phase 2): `/soins`, `/tarifs`, `/equipe`, `/contact`, `/galerie`, legal pages.

## 4. Bilingual plan

- Default **FR**, toggle to **EN**. Routes: `/` (FR) and `/en` (EN), with `hreflang` + `x-default`.
- All copy in `content/fr/*.json` and `content/en/*.json` — no strings hardcoded in components.
- Language switcher remembers choice; prices stay in MAD with "MAD / DH".
- SEO: translated titles, descriptions, OG images per locale.

## 5. 3D / motion budget

- One WebGL layer max: **caustic light** (shader plane) or **starfield particles** echoing the ceiling.
- React Three Fiber + drei, `next/dynamic` + `ssr:false`, lazy-mounted after first paint.
- Fallback: static poster image; disabled under `prefers-reduced-motion` and on low-end mobile (`navigator.hardwareConcurrency <= 4`).
- Budget: ≤ 150 KB gzipped JS for the scene, ≤ 2 MB total first load, LCP < 2.5s on 4G.
- Scroll reveals via CSS/IntersectionObserver. No scroll-jacking, no cursor followers.
- If the client supplies a Reel, a **muted looping video** will outperform 3D and is preferred for the hero. 3D becomes the accent section.

## 6. Technical stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- `next-intl` for FR/EN
- `next/image` with AVIF/WebP, blur placeholders
- Content as JSON/MDX (no CMS initially; add Sanity later if they want self-editing)
- Booking: WhatsApp deep link + `tel:` + optional form (Resend) — Fresha online booking currently disabled, confirm before integrating
- Forms: honeypot + rate limit, no CAPTCHA unless spam appears
- Accessibility: WCAG AA, visible focus rings, reduced motion, alt text in both languages
- Analytics: Plausible or GA4 (ask preference), cookie-free if possible
- Hosting: Vercel, domain TBD

## 7. Photo shot list for the owner

Priority order:
1. Hammam vault with star ceiling — landscape + vertical (hero)
2. Pool / jacuzzi with blue light
3. Reception with pink sofa + blossom tree
4. Sauna, warm light
5. One massage in progress (hands, oil, candle) — no identifiable faces without consent
6. Treatment room detail, towels, products
7. 3–4 therapist portraits, consistent background and light
8. Logo SVG and favicon
9. 20–40s vertical Reel for the hero loop (muted, no text overlays)
10. Optional: 360° or short orbit of the hammam for the 3D section

Delivery: Google Drive / WeTransfer, originals, no Instagram re-compression. Include a signed photo consent for any staff or guest visible.

## 8. Open questions

- Exact phone/WhatsApp to display? (three numbers currently in circulation)
- Closing time: 21:00 or 23:00?
- Are Bronze/Silver/Gold the real package names and contents?
- Is Fresha booking coming back online, or should the site own booking?
- Does the owner want a blog/journal for SEO?
- Any price sensitivity — show prices publicly or "sur demande"?
