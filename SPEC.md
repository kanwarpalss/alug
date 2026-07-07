# SPEC — alug

> The brain of the alug project. Update §5–§9 proactively; §6/§7/§9 as the LAST action of a session.

---

## §1 What this is

**alug** — a watch strap and watch-culture accessories brand for India's booming mechanical watch market. Hindi *alag* (different) + the watch *lug*. Target customer: owners of ₹70,000+ ($800+) mechanical watches. Strap price point ₹2,000–5,600 ($25–70).

This repo holds:
1. The **website prototype** (static HTML/CSS/JS, fully working filters + cart).
2. The **investor brief** (`INVESTOR-BRIEF.md`).
3. This spec.

KP is a watch connoisseur and designer, non-engineer, solo, with a **$150K (~₹1.25 Cr) hard budget** for the venture experiment. No manufacturing ambitions — curation, design and brand are the moat.

## §2 Brand identity (LOCKED v3 "the dial" — KP, 2026-07-04, "dead final")

Wordmark reads **a1u9**: the l is a true numeral 1, the g a true 9 — dial digits inside the word. Reference implementation: `.logo` component in `css/alug.css` (all em-based, scales at any size).

| Element | Value |
|---|---|
| "a" | weight 300, skewX(-10deg), orange `#C4562A`, pulled 0.02em INTO the word (margin-right -0.02em) |
| "1" (the l) | weight 600, tip trimmed via `clip-path: inset(... left 0.07em)` so the flag stays clear of the a |
| "u" | weight 600, cream on dark / ink on light |
| "9" (the g) | weight 600, font-size 0.82em, vertical-align -0.08em (sits like a descender) |
| Spring bar | position 68% of word, width 33%, weight 2.5px, 2px below (em: h 0.054em, bottom -0.045em), colour `#BA5227`, round tips |
| Digit/word colour | ink `#101B2E`-family on light bg; **cream `#F2EEE6` on dark bg** (locked rule) |
| Typeface | Inter Tight (editorial serif accent: Fraunces) |
| Palette "atelier" (web) | paper `#F3EDE1` · paper-deep `#EAE2CF` · card `#FBF7EE` · ink `#2A241B` (warm espresso) · sub `#6C6252` · lines `#DDD4C0`/`#C8BCA2` · green `#24423A` / deep `#1B342E` · green-cream `#EFE7D4` · orange `#C4562A` / deep `#BA5227` |
| Short form | "a." roundel (dark circle `#191715`, cream "a", orange dot) — avatar/favicon/emboss; works on light or dark |
| Casing | **always lowercase "alug"**, even at sentence start |
| Tagline | "different straps for different wrists" |
| Voice | modern collector culture; mechanical watches only; "NO APPLE WATCHES HERE" |
| Web aesthetic | **"Vintage atelier"** — warm gallery-paper surfaces (never white, never black, never golden), espresso ink, Fraunces serif h1/h2, heritage-green bands (marquee, manifesto, footer) + green CTAs, orange as brand spark, illustrated hero watch (hands at 10:09, a1u9 dial, chestnut strap), decorative dial-ring motifs, framed vintage-ad art prints. Rejected in sequence: midnight light (v1), warm dark charcoal, Apple white ("BLAND AF") |
| Handle (placeholder) | @alug.straps — availability NOT yet checked |

KP's locked recipe string (source of truth, rev 2026-07-04b): `bar: pos 68% · width 33% · weight 2.5px · gap 2px | a: slant -10° · gap 0% minus a hair (-0.02em) · #C4562A | dial: l=true 1 (tip trim 7), g=true 9, 9 size 82% drop 8, digit wt 600 | bar #BA5227 · digits #101B2E | heat · Inter Tight`. Cache-bust currently `?v=5`.

Superseded v1 recipe (variant F "alug" with brass/steel on midnight) is preserved in git-less history via §5; screenshot of v1 settings: `/Users/kanwar/Desktop/alug.png`.

## §3 Site architecture

Static site, no build step, no dependencies. Serve any way; preview uses `python3 -m http.server 4173` (`.claude/launch.json`, name `alug-site`).

| File | Purpose |
|---|---|
| `index.html` | home: hero, ticker, lug tiles, featured, teasers |
| `straps.html` | catalog + filters (fit family, lug width, material, price, watch, sort) |
| `watches.html` | 21-watch shop-by-watch guide |
| `watch.html?id=` | **per-model curation page**: composite hero (that watch on its top strap), variants by year, 3 community-vetted pairings each rendered as that-watch-on-that-strap |
| `product.html?id=` | strap detail, width picker, fit notes for curved/PRX, cart add, related |
| `art.html` | prints in two series (archive homages + originals) + notebooks |
| `artwork.html?id=` | **art product page**: large render, story, print/frame/edition specs, homage disclaimer, related |
| `journal.html` / `article.html?id=` | 5 written articles |
| `about.html` | manifesto |
| `css/alug.css` | full design system (tokens at top) |
| `js/data.js` | STRAPS(37, 3 families) WATCHES(21, render+variants+curation) ART(9, 2 series) NOTEBOOKS(3) ARTICLES(5) |
| `js/app.js` | chrome, cart, per-texture strap renderer, watch+strap composite renderer, ad-print renderer, page routers |

All product imagery is **generated SVG** — replaced by photography at launch. Key renderers in app.js: `strapSVG` (10 distinct textures via `texDetail`: leather/suede/croc/perf/rivet/tropic/fkm/sail/nato/canvas + 3 end types: straight/curved/integrated), `watchSVG(watch, strap)` (composite of any model on any strap, 8 case shapes), `artSVG` (archive series: halftone/spotlight/caricature templates with gradients; originals: vintage-paper template), `heroWatchSVG` (home hero). Pages route via `<body data-page>`.

**Cache-busting convention:** asset links carry `?v=N` (currently `?v=7`). Bump N on every css/js change, in all 10 HTML files, or browsers will serve the stale design.

## §4 Catalog conventions

- Strap ids kebab-case; names = Indian place + material colour ("Colaba Chestnut").
- Three fit families: `classic` (standard spring bars), `curved` (fitted curved ends, `fits:[watchIds]`, Delugs/Artem-style), `prx` (integrated fit for Tissot PRX).
- Signature lines: **The 21 Club** (true 21mm), **Curve** (curved-end), **PRX Fit** (integrated) — all key differentiators, keep.
- All straps quick-release, 316L hardware, price includes spare spring bars.
- WATCHES entries carry `render` (shape/dial/bezel/case for the composite renderer), `variants` (refs by year), `curation` (3 community-researched pairings with why-lines). `lug: 0` = proprietary/integrated (Santos QuickSwitch, PRX).
- Curation notes cite community consensus (r/Watches, WatchUSeek, OmegaForums) — **re-verify before publishing as buying guidance.**

## §5 Decisions log

| Date | Decision | Rejected alternatives / why |
|---|---|---|
| 2026-07-03 | Brand name **alug**, all lowercase | — (KP's own) |
| 2026-07-03 | Logo = variant F recipe (§2), midnight palette | 6 other variants + 6 palettes explored in interactive playground; gallery palette was runner-up |
| 2026-07-03 | Static prototype before Shopify | Shopify from day one (theme constraints fight the brand); mockups only (can't feel the filter UX) |
| 2026-07-03 | INR-only pricing | USD / dual-currency — dilutes India-first story |
| 2026-07-03 | Invented placeholder catalog, KP curates real one later | waiting for real products would stall UX validation |
| 2026-07-03 | 5 real journal articles at launch | headlines-only (journal feels dead at demo) |
| 2026-07-03 | Positioning: mechanical-only, lug-width-first, honest-fit | generic "premium straps" positioning — crowded, soulless |
| 2026-07-03 | Retro art prints are **original reimaginings, no brand logos/trademarks** | reproducing real vintage ads — legal risk |
| 2026-07-04 | **Logo relocked: v3 "the dial" (a1u9)** — l as numeral 1 (tip trimmed), g as numeral 9, heat palette, bar at 66%/37%/3px. KP: "dead final" | v1 variant F (brass/steel on midnight) superseded after KP explored a second playground round; bar-under-a option explored and rejected |
| 2026-07-04 | Site restyled: warm dark charcoal design system ("Apple finesse, not pitch dark") + cream manifesto band | keeping light midnight theme — KP wanted darker, more modern; pure black — "night/pitch dark scary" |
| 2026-07-04 | Rule: wordmark digits/letters go **cream on dark, ink on light**; the a stays orange on both | single fixed digit colour — dies on one of the two backgrounds |
| 2026-07-04 | **Dark theme rejected, Apple-light adopted** — KP saw the dark build and killed it ("way way too dark, exactly what I wanted to avoid"). White/#F5F5F7 surfaces, ink text, compact hero, orange as sole accent | warm dark charcoal (built and reverted same day); the "Baltic/Altic Dev" reference is void — Apple.com is the aesthetic north star |
| 2026-07-05 | **Apple-light rejected too ("BLAND AF") → "vintage atelier" adopted**: warm gallery paper + heritage green + espresso ink + Fraunces serif headlines + illustrated hero watch + vintage-ad art prints (Ad Patina spirit, trademark-free). Design brief now stable: "not white, not black, not golden — FINE and LUXURY for a watch connoisseur and art collector" | pure-white Apple aesthetic (too sterile for an art-adjacent brand); golden hues (explicitly banned); any dark theme (banned twice) |
| 2026-07-05 | **Archive art series uses REAL brand/model names** ("The Omega Speedmaster" etc.) — KP's explicit call, overriding Claude's recommendation of name-free homages. Product pages carry an "unlicensed homage, not affiliated" disclaimer | name-free homages (Claude's recommendation — zero legal exposure); mixing tracks. Trademark decision of 2026-07-03 is SUPERSEDED for the archive series only; originals stay trademark-free |
| 2026-07-05 | **Catalog v2**: 37 straps in 3 fit families (classic/curved-end/PRX integrated), per-texture product renders, per-model curation pages with watch-on-strap composites. PRX added as 21st watch (the "accepts no strap" joke publicly corrected) | keeping 30 generic-looking SKUs; single strap family (missed curved-end and integrated demand proven by Delugs/Artem) |

## §6 Current state (2026-07-05, catalog v2)

- ✅ Logo locked v3 "the dial" (recipe string in §2), implemented as the `.logo` CSS component across header, footer, hero and favicon.
- ✅ Site on the **"vintage atelier" design system**; KP approved direction ("this is great" era pending, but no revert requested).
- ✅ **Catalog v2 shipped and verified**: 37 straps (10 textures, 3 fit families incl. Curve and PRX Fit lines), 21 watch curation pages (`watch.html?id=`) with variants-by-year and watch-on-strap composite imagery, 9 art prints in 2 series each with its own product page (`artwork.html?id=`), family filter on straps. Verified live: all routes render, filters return correct counts (curved→4, PRX→3, all→37), zero console errors, cache-busted `?v=7`.
- ✅ Market research done (sources in INVESTOR-BRIEF.md): India = fastest-growing Swiss watch market (+35.2% vs 2023), EFTA duties 22%→0 by 2031, competitor map complete.
- ✅ INVESTOR-BRIEF.md written.
- ⏳ Not started: real product sourcing, photography, checkout (Razorpay), deployment, Instagram handle check, domain check.
- ⏳ Design system awaiting KP's final "lock" after he reviews the restyled site.

## §7 Known issues

| # | Issue | Severity |
|---|---|---|
| 1 | **Lug widths need re-verification** before publishing buying guidance (esp. Carrera Glassbox, Superocean 42, Reverso, Captain Cook, Datejust-adjacent). Site carries a caveat line. | High (accuracy = brand trust) |
| 2 | No mobile hamburger menu — below 900px the nav hides entirely (`.mobile-nav-btn` styled but never rendered) | Medium |
| 3 | Checkout + newsletter are stubs (toast messages) | By design, prototype |
| 4 | Generated SVG art is placeholder for photography | By design |
| 5 | Journal article "starter-shelf" references strap id `alibaug-tan` in a pairs list inside data (harmless, display-only) | Low |
| 6 | @alug.straps handle + alug domain availability unchecked | Medium before any public use |
| 7 | **Archive art series carries real brand trademarks (Omega, Rolex, TAG Heuer, JLC) on NEW artwork** — KP's decision, disclaimer added, but this is genuine legal exposure. Get a trademark lawyer's opinion BEFORE these SKUs go on sale. | **High** |
| 8 | Curation pairing claims attribute community consensus (r/Watches etc.) from general knowledge + limited spot-checks — verify each claim before public launch | Medium |

## §8 Roadmap (proposed, not committed)

1. KP review of prototype → design iterations.
2. Verify all 20 lug widths against manufacturer specs.
3. Sourcing: sample orders — China (Canton/Alibaba verified makers) vs VBL Innovations Bengaluru (domestic, 4M/yr capacity) for white-label.
4. Photography + real catalog swap-in.
5. Razorpay + deploy (Vercel/Netlify static, or Shopify migration decision point).
6. Instagram content engine + 3-city watch-meetup presence (Bombay/Bangalore/Delhi).

## §9 Handoff notes

- Session 1 (2026-07-03): brand naming, logo exploration (3 widget rounds → v3 recipe locked), full site build, market + competitor research, SPEC + investor brief.
- Session 2 (2026-07-05..06): vintage atelier design (4th iteration, stable), catalog v2 (37 straps / 21 watches / 9 art prints), per-model curation pages (`watch.html?id=`), per-art product pages (`artwork.html?id=`), composite watch+strap SVG renderer, family filter on straps, PRX added + public apology, archive art series with real trademarks (KP's decision, HIGH legal flag in §7 #7).
- The interactive logo playground lives in the claude.ai conversation (visualize widgets) — the recipe in §2 is the durable record; screenshot on KP's Desktop.
- Cart persists in localStorage under `alug-cart` — clear it when demoing.
- To demo: `python3 -m http.server 4173` in repo root → http://localhost:4173.
- Project CLAUDE.md now exists at `.claude/CLAUDE.md` — enforces brand/catalog/legal rules for future sessions.
- **Priority for next session:** (1) `git init` the repo — it's unversioned and valuable, (2) KP reviews the full vintage atelier prototype and gives design lock, (3) lug width manufacturer verification before any public launch.
- Asset cache version is `?v=7` — bump in all 10 HTML files whenever CSS/JS changes.

## §10 Deployment

Not deployed. No pm2/Tailscale (this is a public-web project, not a home-server plugin). Deployment target TBD: static host (Vercel/Netlify/Cloudflare Pages) is the natural fit for the prototype; revisit when checkout is real.
