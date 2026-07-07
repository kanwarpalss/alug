# CLAUDE.md — alug project rules

## Identity rules (LOCKED — never change without KP explicit go)
- Brand name is always **alug**, all lowercase, even at sentence start.
- Wordmark recipe is LOCKED v3 "the dial" — see SPEC.md §2. Never modify `.logo` CSS without reading the recipe string first.
- Tagline: "different straps for different wrists."
- Positioning: mechanical watches only. No smartwatches. No generic "premium straps" copy.

## Design system rules
- Palette is "vintage atelier" — paper `#F3EDE1`, green `#24423A`, orange `#C4562A`, espresso ink `#2A241B`. No pure white, no pure black, no golden hues — banned by KP three times.
- Serif headlines: Fraunces. Body: Inter Tight. No other typefaces.
- Cache-busting: bump `?v=N` in ALL 10 HTML files whenever css/alug.css or js/*.js change. Currently at `?v=7`.

## Catalog rules
- 3 fit families: `classic`, `curved`, `prx`. Signature lines: The 21 Club (21mm), Curve (curved-end), PRX Fit.
- Strap ids: kebab-case, Indian place name + material + colour.
- Every watch entry needs `render`, `variants`, `curation`. Every curation pairing must resolve to a real strap id.
- Lug widths are UNVERIFIED — carry the caveat line; do not remove it before manufacturer verification is done.

## Legal / accuracy gates
- Archive art series (art-reckon, art-moon, art-gravity, art-reverso-nuit, art-monaco-gulf) carries real brand trademarks — KP's decision. Every archive artwork page MUST carry the homage disclaimer. Do NOT add new archive pieces with real trademarks without flagging to KP.
- Community pairing copy cites r/Watches, WatchUSeek, OmegaForums — mark as "community consensus" and flag for pre-launch thread verification. Never state as fact.

## Dev workflow
- Serve: `python3 -m http.server 4173` (or use `.claude/launch.json` name `alug-site`).
- No build step, no dependencies. All rendering is runtime JS + SVG.
- SPEC.md is the project brain. Read §2 before touching brand; §5 before any major decision; §7 before publishing.
- Git not yet initialised — run `git init && git add -A && git commit -m "init: alug prototype"` before any destructive change.
