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
| 2026-07-11 | **Watch Finder v3 planned (§11)**: shop-by-watch rebuilt as brand→model finder + "fitting room" with live strap try-on on hero-scale imagery. Imagery = **renderer v2 illustrated hero renders**, NOT photos — subject to KP gate at Phase 1 | real photography rejected for now: copyright exposure on a commercial site, no live strap compositing possible on static photos, inconsistent art direction. Plan-only session; execution pending |

## §6 Current state (2026-07-05, catalog v2)

- ✅ Logo locked v3 "the dial" (recipe string in §2), implemented as the `.logo` CSS component across header, footer, hero and favicon.
- ✅ Site on the **"vintage atelier" design system**; KP approved direction ("this is great" era pending, but no revert requested).
- ✅ **Catalog v2 shipped and verified**: 37 straps (10 textures, 3 fit families incl. Curve and PRX Fit lines), 21 watch curation pages (`watch.html?id=`) with variants-by-year and watch-on-strap composite imagery, 9 art prints in 2 series each with its own product page (`artwork.html?id=`), family filter on straps. Verified live: all routes render, filters return correct counts (curved→4, PRX→3, all→37), zero console errors, cache-busted `?v=7`.
- ✅ Market research done (sources in INVESTOR-BRIEF.md): India = fastest-growing Swiss watch market (+35.2% vs 2023), EFTA duties 22%→0 by 2031, competitor map complete.
- ✅ INVESTOR-BRIEF.md written.
- ⏳ Not started: real product sourcing, photography, checkout (Razorpay), Instagram handle check.
- ⏳ Design system awaiting KP's final "lock" after he reviews the restyled site.
- ⏳ **Watch Finder v3 planned, not built** — full build plan in §11 (2026-07-11). Next session executes Phase 1 and stops at the KP render gate.

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
1b. **Watch Finder v3 (§11)** — approved direction, next build priority.
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
- Session 3 (2026-07-11): plan-only — Watch Finder v3 designed and specced in full (§11). No site code touched; `?v=7` unchanged.
- **Priority for next session:** (1) execute §11 Phase 1 (renderer v2) **on a branch — pushes to `main` auto-deploy to alug.co.in**, stop at the KP render gate; (2) then Phases 2–4 per §11; (3) lug width manufacturer verification before any public launch.
- Asset cache version is `?v=7` — bump in all 10 HTML files whenever CSS/JS changes.

## §10 Deployment

- **Live at:** https://alug.co.in (and http://alug.co.in, www.alug.co.in)
- **Host:** GitHub Pages (free), repo: github.com/kanwarpalss/alug (public)
- **Auto-deploy:** every push to `main` branch goes live within ~1-2 minutes
- **Domain:** alug.co.in on GoDaddy, DNS A records → GitHub Pages IPs, CNAME `www` → kanwarpalss.github.io
- **SSL:** GitHub-provisioned, HTTPS enforced
- **Local preview:** `python3 -m http.server 4173` in repo root → http://localhost:4173
- **No build step.** GitHub serves the repo files directly.

## §11 Watch Finder v3 — build plan (specced 2026-07-11, execution pending)

> [!NOTE]
> Written by the planning session for a **future build agent**. Self-contained: read this section plus §2 (brand rules), §3 (architecture), §4 (catalog conventions) and you can build without re-deriving anything. KP has approved the *direction*; the **imagery gate in Phase 1 is the one open ratification point**. Model routing (CLAUDE §13): Sonnet 5 executes this spec; escalate to Opus 4.8 only if renderer aesthetics stall.

### 11.1 The brief (KP, 2026-07-11)

The shop-by-watch section is "thousands of boxes… very bland, very dated." Rebuild it as a specialised, beautiful, interactive experience: choose **brand → exact model** up front, then see **big hero-scale imagery** of that watch, snippets about it, and — the centerpiece — **swap straps on the watch in real time**. "Someone is able to just look for their own watch, and in real time see how the straps will look."

### 11.2 What exists today and why it fails the brief

| Piece | Today | Gap |
|---|---|---|
| `watches.html` | 21 **text-only** cards (brand, model, pills, one line). Zero imagery. | The "bland boxes" problem, literally |
| `watch.html?id=` | One static composite hero (`watchSVG(w, s, true)`, 480×540) + 3 static curation cards | No interaction. No strap swapping. Render is charming but generic — flat dial, no bezel text, no per-model hand shapes |
| Renderer | `watchSVG(watch, strap)` composites any model on any strap, 8 case shapes, data-driven via `render:{shape,dial,bezel,case,accent}` | The architecture is exactly right; the **fidelity** is one generation short of hero-worthy |
| Fit logic | `strapFitsWatch(s, w)` — fits list / lug width / pairs | Correct and reusable as-is. The single fit authority — do not fork it |

### 11.3 Imagery decision — the load-bearing call

KP asked for "real images." The honest translation for this site, this budget, this legal posture:

- **Chosen: renderer v2 — hero-grade illustrated renders.** Magazine-quality SVG per model, in the vintage-atelier art direction the brand already owns (the hero watch, the art prints — illustration IS the house style). Only illustration allows the core feature: any of 21 watches × any fitting strap, composited live, instantly. Zero copyright exposure.
- **Rejected: real photography.** Scraped/press brand photos on a commercial site = copyright infringement (on top of the §7 #7 trademark exposure we already carry — do not double it). Licensed/own photography can't strap-swap (static), covers only watches KP can access, and shatters art-direction consistency. Photography remains the plan **for alug's own straps** at launch (§8), not for other brands' watches.

> [!WARNING] KP GATE — Phase 1 ends with a checkpoint
> Build 3 hero renders first (speedmaster, submariner, prx), show KP screenshots, get explicit approval **before any page work**. If the gate fails, fallback: keep v1 renders, invest the session in layout/typography/interaction only, and revisit a photography budget with KP.

**Legal guardrails (LOCKED):** (1) **Never draw a brand's logo/wordmark/crest on any dial or anywhere** — dials stay logo-free (current renderer already complies). Brand/model names appear as HTML text only (nominative use, as Delugs/Everest/Barton do). (2) Brand "plaques" in the finder are **Fraunces text only** — no brand logos ever. (3) The lug-width caveat line (§7 #1) stays on the finder page verbatim.

### 11.4 North-star references (patterns, not clones)

| Site | Pattern to take |
|---|---|
| Omega strap changer | One big watch render + strap rail; click = instant swap. The gold-standard interaction |
| Rolex configurator | Full-bleed model hero, model-first navigation, unhurried spacing |
| Delugs "Shop by Watch" | Brand → model drill-down with watch-head thumbnails |
| Everest Bands | "Find your watch model" selector front and center |
| Bulang & Sons | Warm editorial art direction — closest in spirit to vintage atelier |
| Hodinkee Shop | Museum-plaque spec storytelling around a product |

### 11.5 Experience spec

**A. The Finder — `watches.html` rebuilt** (route/filename unchanged; all existing links keep working)

1. **Intro band** (heritage green, cream Fraunces serif — house marquee style): headline + sub. Copy options for KP (builder picks one, flags for review): "Find your watch. Dress it here." / "Your watch already owns the straps. Come see them." / "Twenty-one watches. Thirty-seven straps. One of each is yours."
2. **Search, front and center**: type-ahead over `brand + model + variants[].ref` (client-side, ~150 strings). Results dropdown grouped by brand; Enter/click → fitting room. Placeholder: "Search your watch — brand, model, or reference…"
3. **Brand rail**: horizontal row of brand plaques — Fraunces brand name + origin line + model count (e.g. "Omega · Bienne, est. 1848 · 3 models"). Click filters the gallery below (toggle off = all). Deep-linkable: `watches.html#brand=omega`. On scroll, rail condenses and sticks under the header.
4. **Model gallery**: default view = all 21 grouped by brand with serif section headers. Cards are **image-first and big** — 2-up on desktop (≥1100px), each card ≥480px wide: hero render of the watch on its top curated strap filling the card top, then brand kicker, model name in Fraunces, three spec pills (size / lug / badge), the `why` line, price band. Whole card links to the fitting room. Hover: gentle lift + the render cycles through the 3 curated straps (Phase 4 delight; static until then).
5. **Keep**: PRX apology notice, lug-caveat line. **Kill**: nothing else on the page survives — the text-card grid is fully replaced.

**B. The Fitting Room — `watch.html?id=` rebuilt** (route unchanged; backward compatible)

1. **Layout**: two-column split. **Left ~55%: the stage** — sticky (desktop) hero render of the watch on the currently selected strap, ~620px wide, on `--paper-deep` card with the dial-ring motif. 160ms crossfade between two stacked SVG layers on swap. **Right: the dossier** — brand kicker, model in Fraunces (large), badge pill, `why` line, new 2–3 sentence `story`, museum-plaque spec table (size / lug / movement / price band), "Know your reference" variants table (kept).
2. **The strap rail** (below/beside dossier): section "The alug prescription" — 3 curated straps as rich chips (colour swatch, name, price, why-line). Then "Everything that fits" — all other straps passing `strapFitsWatch`, grouped by material, as compact chips. **Click any chip → hero re-renders instantly**; selected chip gets the green ring.
3. **Current-pairing panel** (under the hero): strap name, price, material · taper · thickness, then **[Add to cart]** — width auto-matched to the watch's lug when available in `s.widths` (else fitted/first) — and **[Strap details]** → `product.html?id=`. Plus "Copy link to this pairing" (clipboard → toast).
4. **URL contract**: selection updates `?id=<watch>&strap=<strap>` via `history.replaceState` — shareable deep links. On load: `strap` param honoured **only if it fits**, else `curation[0]`. Unknown watch `id` → notice + link to the finder (no more silent fallback to WATCHES[0] — silent wrong data is worse than a visible miss).
5. Santos (proprietary, `lug: 0`): rail shows only its curation with the write-to-us framing — no "everything that fits" section.

**C. Mobile (≤900px)**: finder = search + h-scroll brand chips + 1-up full-width cards. Fitting room = hero on top (~55vh, not sticky), dossier below, strap rail as horizontal swipe strip, **sticky bottom bar**: "On: Kala Ghoda Tobacco · ₹4,400 [Add]". No horizontal page scroll at 375px. (The missing site-wide hamburger, §7 #2, stays a separate issue — do not absorb it silently; fix it in Phase 4 only if time allows and flag it in the commit.)

### 11.6 Renderer v2 spec

One source of truth: **extend `watchSVG(w, s, size)`** with a `"hero"` size mode (viewBox ≈ 640×800) — card and hero fidelity both derive from the same extended `render` params. No parallel hero function.

New optional `render` params (all with safe defaults so a missing param degrades to v1 look, never crashes):

```
dialTex:  waves|teak|barleycorn|guilloche|snow|sunburst|panda|waffle|sandwich|step|matte
hands:    sword|baton|mercedes|snowflake|dauphine|leaf|arrow|syringe
indices:  painted|applied|arabic|roman|mixed
bezelKind: dive|tachy|sliderule|smooth|fixed|fluted|square
dateAt:   3|6|0        subdials: "tricompax"|"bicompax"|"smallsec6"|"smallsec9"|null
extras:   ["cyclops","heValve","crownGuard","powerReserve","gmt"]
```

Hero-mode lighting/depth (house style, subtle): case brushing via linear gradient, dial radial gradient, inner bezel shadow ring, lume dots on dive indices, low-opacity crystal glare arc (top-left), soft drop-shadow ellipse. Strap drawn full lug-to-lug with taper, keeper, holes, buckle at frame bottom, texture via existing `texDetail` scaled up.

Per-model character table (stylised — capture the character, **not** a replica; dials stay logo-free):

| id | dialTex | hands | indices | bezelKind | dateAt | subdials/extras |
|---|---|---|---|---|---|---|
| seamaster300 | waves | sword | applied | dive | 6 | heValve |
| speedmaster | step (matte) | baton | painted | tachy | 0 | tricompax |
| aquaterra | teak | arrow | applied | smooth | 6 | — |
| bb58 | matte (gilt accent) | snowflake | painted | dive | 0 | — |
| bb41 | matte (burgundy bezel) | snowflake | painted | dive | 0 | — |
| hydroconquest | sunburst | sword | applied | dive | 3 | gmt |
| spirit | matte | leaf | arabic | smooth | 3 | — |
| master | barleycorn | leaf (blued) | arabic | smooth | 3 | — |
| carrera | panda | dauphine | applied | fixed (inner tachy flange) | 0 | tricompax |
| monaco | sunburst (square) | baton | applied | square | 0 | bicompax |
| captaincook | sunburst | arrow | applied | dive (concave) | 3 | — |
| navitimer | matte | baton | applied | sliderule | 0 | tricompax |
| superocean | matte (bold blocks) | baton (square-tip) | painted | dive | 0 | — |
| reverso | guilloche (two-tone) | dauphine (blued) | applied bâton | smooth (rect) | 0 | smallsec6 |
| santos | matte (opaline) | sword (blued) | roman | fixed (screws) | 6 | — |
| markxx | matte | sword | arabic | smooth | 3 | — |
| luminor | sandwich | leaf | arabic+dots | smooth | 0 | smallsec9, crownGuard |
| snowflake | snow | dauphine (sharp) | applied | smooth | 3 | powerReserve |
| submariner | matte (maxi) | mercedes | painted (round/rect/tri) | dive | 3 | cyclops |
| spb143 | sunburst (grey) | baton (square-tip) | applied | dive | 3 | — |
| prx | waffle | baton | applied | fixed (integrated) | 3 | — |

### 11.7 Data changes (`js/data.js`)

1. Each WATCHES entry gains `story` (2–3 sentences, collector voice — builder drafts, **flag all 21 for KP review**, same accuracy bar as curation copy) and the extended `render` params above.
2. New `BRANDS` map for plaques (factual origin lines only): Omega "Bienne, est. 1848" · Tudor "Geneva, est. 1926" · Longines "Saint-Imier, est. 1832" · TAG Heuer "La Chaux-de-Fonds, est. 1860" · Rado "Lengnau, est. 1917" · Breitling "Grenchen, est. 1884" · Jaeger-LeCoultre "Le Sentier, est. 1833" · Cartier "Paris, est. 1847" · IWC "Schaffhausen, est. 1868" · Panerai "Florence, est. 1860" · Grand Seiko "Shiojiri, est. 1960" · Rolex "Geneva, est. 1905" · Seiko "Tokyo, est. 1881" · Tissot "Le Locle, est. 1853".
3. Document the render-param vocabulary in the data.js header comment.

### 11.8 File-by-file change map

| File | Change |
|---|---|
| `js/app.js` | `watchSVG` hero mode + fidelity params; rewrite `initWatches` (search, brand rail, gallery) + `initWatch` (fitting room, swap, URL contract); keep `strapFitsWatch` untouched |
| `js/data.js` | §11.7 additions |
| `css/alug.css` | New components on existing tokens: `.finder-hero .finder-search .brand-rail .brand-plaque .model-gallery .model-card .fitting .fit-hero .strap-rail .strap-chip .pairing-panel` (~+300 lines) |
| `watches.html` / `watch.html` | New scaffolding markup; titles/meta updated |
| `render-lab.html` | **NEW, dev-only QA harness** (not in nav, `noindex`): all 21 watches × 4 representative straps (leather/nato/fkm/curved-or-fitted) in hero mode, for eyeball QA. Carries the same `?v=` links |
| All 11 HTML files | Cache bump `?v=7` → `?v=8` (10 existing + render-lab; update the "10 files" count in `.claude/CLAUDE.md` and §3/§9 when shipping) |

### 11.9 Build phases — each ends verified, committed, on a branch

> [!WARNING]
> Pushes to `main` auto-deploy to **alug.co.in** (§10). Build on branch `finder-v3`; merge only on KP's word.

- **Phase 1 — Renderer v2** (the heavy lift, ~half the work). Extend params + hero mode + render-lab.html. Verify: all 21 render in lab, zero console errors, no `NaN` in any SVG attribute (script-check the generated strings), spot-check 6 watches × 4 straps visually. **Ends at the KP gate (§11.3) — screenshots of speedmaster/submariner/prx. STOP for approval.**
- **Phase 2 — The Finder.** watches.html per §11.5A. Verify: search finds every model by brand, model fragment, and ref; `#brand=` deep links work; 375px clean; console clean.
- **Phase 3 — The Fitting Room.** watch.html per §11.5B. Verify: swap works on all 21 pages (scripted pass: every watch × every fitting strap renders); URL contract honoured incl. junk `id`/`strap`; cart gets correct width; Santos special case; 375px + sticky bar.
- **Phase 4 — Polish + regression.** Crossfade, hover-cycle, copy-link; mobile pass; cache bump everywhere; **full-suite regression**: all routes render, straps.html filter counts unchanged (curved→4, prx→3, all→37), cart add/remove/persist, art/journal untouched, zero console errors site-wide. 5+ files touched → trigger `/lead-review` before merge (CLAUDE §15). Screenshot set to KP.

### 11.10 Acceptance criteria — "done" is observable (CRIT-04)

1. `watches.html`: zero text-only cards; every model shows a hero render; brand rail + search up front.
2. Typing "speed" → Speedmaster surfaces; Enter lands on its fitting room.
3. On `watch.html?id=submariner`, clicking any rail strap swaps the hero with no reload, perceived <100ms, URL updates to `&strap=`.
4. Fit honesty holds: the 21mm Sub is never offered a 20mm-only strap; PRX shows only `prx` family; curved straps appear only on their `fits` watches.
5. Add-to-cart from the fitting room carries the lug-matched width.
6. All 21 fitting rooms + finder usable at 375px, no horizontal scroll.
7. `?v=8` in all 11 HTML files; zero console errors on every route.
8. Regression list in Phase 4 passes untouched.

### 11.11 Devil's-advocate findings (CRIT-01..08 pass)

- **Not solving (CRIT-01):** photography, checkout, lug-width verification (§7 #1 stays open), site-wide hamburger (§7 #2 stays open), new SKUs/watches, art/journal pages, SEO/analytics.
- **Heaviest assumption (CRIT-02):** renderer v2 output will satisfy KP's "real images" ask. Mitigated by the Phase-1 gate — cheapest possible failure point, before any page work.
- **Rejected alternative's failure mode (CRIT-03):** real photos → copyright infringement + static (no live swap, which is the entire brief) + broken grid consistency.
- **Silent invariants (CRIT-05):** every `curation.strap` resolves; `strapFitsWatch` is the single fit authority; brand grouping trusts exact `brand` strings — add a dev-mode `console.assert` (14 brands / 21 models); missing render params degrade to v1, never throw.
- **Worst inputs (CRIT-06):** junk `?id=` → visible notice + finder link (replaces today's silent WATCHES[0] fallback); non-fitting `?strap=` → ignored; empty search → full gallery; corrupt cart JSON already guarded.
- **Drift check (CRIT-07):** the ask is finder + fitting room. Any new commerce/data feature beyond §11.7 is drift — stop and ask.
- **Future-me (CRIT-08):** render-param vocabulary documented in data.js header; render-lab.html opens with a "dev-only QA harness" comment.

### 11.12 Open items for KP (non-blocking, collect during build)

1. Finder headline — pick from §11.5A options or write one.
2. The 21 `story` snippets — review pass before merge.
3. Hover strap-cycling on finder cards — delight or distraction? (Builder ships it behind one CSS class; trivial to remove.)
