// alug — catalog & content data v2
// Straps carry render params (tex/end) so every SKU draws differently.
// Watches carry render params + per-model curation (community-researched pairings).
// Curation notes reflect forum consensus (r/Watches, WatchUSeek, OmegaForums, Fratello
// coverage of Delugs/Artem) — re-verify specifics before publishing as buying guidance.

const STRAPS = [
  // ---------------- classic · leather ----------------
  { id: "colaba-chestnut", name: "Colaba Chestnut", family: "classic", material: "leather", tex: "leather", end: "straight",
    colorName: "Chestnut", hex: "#8B5A2B", stitch: "#EDE3D0", widths: [18,20,22], price: 4800, taper: "3mm taper", thickness: "3.2mm", tag: "staff pick",
    pairs: ["bb58","speedmaster","spirit"], blurb: "Full-grain Italian shoulder that deepens with every monsoon. Our reference strap." },
  { id: "ballard-black", name: "Ballard Pier Black", family: "classic", material: "leather", tex: "leather", end: "straight",
    colorName: "Black", hex: "#1D1D21", stitch: "#B9AF9C", widths: [18,20,22], price: 4600, taper: "2mm taper", thickness: "3.0mm",
    pairs: ["master","markxx","navitimer"], blurb: "Matte black calf, bone stitch. The bandhgala of straps." },
  { id: "fort-cognac", name: "Fort Cognac", family: "classic", material: "leather", tex: "leather", end: "straight",
    colorName: "Cognac", hex: "#A0622D", stitch: "#5B3A1A", widths: [18,19,20], price: 5200, taper: "3mm taper", thickness: "3.4mm",
    pairs: ["reverso","master","snowflake"], blurb: "Burnished cognac, hand-painted edges. Dress energy without the fragility." },
  { id: "marine-navy", name: "Marine Drive Navy", family: "classic", material: "leather", tex: "leather", end: "straight",
    colorName: "Navy", hex: "#1E2E4F", stitch: "#C9A96A", widths: [20,22], price: 4800, taper: "3mm taper", thickness: "3.2mm",
    pairs: ["aquaterra","snowflake","seamaster300"], blurb: "Deep navy calf with brass stitching — the Queen's Necklace at 2am." },
  { id: "jubilee-bordeaux", name: "Jubilee Bordeaux", family: "classic", material: "leather", tex: "leather", end: "straight",
    colorName: "Bordeaux", hex: "#5C2431", stitch: "#D9B8A8", widths: [18,20], price: 5000, taper: "3mm taper", thickness: "3.2mm",
    pairs: ["master","reverso","monaco"], blurb: "Oxblood for the collector who's done with brown." },
  { id: "lodhi-olive", name: "Lodhi Olive", family: "classic", material: "leather", tex: "leather", end: "straight",
    colorName: "Olive", hex: "#5A5B3A", stitch: "#D8D3B8", widths: [20,22], price: 4600, taper: "2mm taper", thickness: "3.0mm",
    pairs: ["markxx","bb58","captaincook"], blurb: "Military olive with a civilian finish." },
  { id: "alibaug-tan", name: "Alibaug Tan", family: "classic", material: "leather", tex: "leather", end: "straight",
    colorName: "Tan", hex: "#C08B4F", stitch: "#7A5A2E", widths: [18,20,22], price: 4400, taper: "3mm taper", thickness: "3.0mm",
    pairs: ["spirit","bb58","spb143"], blurb: "Sun-washed tan that earns its patina. Weekend-house energy." },
  // ---------------- classic · suede ----------------
  { id: "kala-tobacco", name: "Kala Ghoda Tobacco", family: "classic", material: "suede", tex: "suede", end: "straight",
    colorName: "Tobacco", hex: "#7A5230", stitch: "#D9C9A8", widths: [20,22], price: 4400, taper: "2mm taper", thickness: "2.8mm", tag: "staff pick",
    pairs: ["speedmaster","bb58","spirit"], blurb: "Rich tobacco suede — the Moonwatch's favourite outfit, ask any forum." },
  { id: "hauz-taupe", name: "Hauz Khas Taupe", family: "classic", material: "suede", tex: "suede", end: "straight",
    colorName: "Taupe", hex: "#9A8A78", stitch: "#EDE3D0", widths: [18,20], price: 4200, taper: "2mm taper", thickness: "2.8mm",
    pairs: ["snowflake","reverso","aquaterra"], blurb: "Grey-brown suede that makes every dial look more expensive." },
  { id: "kora-slate", name: "Koramangala Slate", family: "classic", material: "suede", tex: "suede", end: "straight",
    colorName: "Slate grey", hex: "#6B7280", stitch: "#C8CDD6", widths: [20,22], price: 4200, taper: "2mm taper", thickness: "2.8mm",
    pairs: ["carrera","speedmaster","snowflake"], blurb: "Neutral grey that goes with everything, including your Series B." },
  { id: "pondy-sand", name: "Pondy Sand", family: "classic", material: "suede", tex: "suede", end: "straight",
    colorName: "Sand", hex: "#C9B490", stitch: "#8A7250", widths: [18,20], price: 4200, taper: "2mm taper", thickness: "2.8mm",
    pairs: ["speedmaster","aquaterra","spb143"], blurb: "White Town beige with French-quarter softness." },
  // ---------------- classic · racing perforated ----------------
  { id: "buddh-racing", name: "Buddh Racing", family: "classic", material: "leather", tex: "perf", end: "straight",
    colorName: "Black / red", hex: "#232326", stitch: "#C43B2A", widths: [20,22], price: 5400, taper: "2mm taper", thickness: "3.4mm", tag: "staff pick",
    pairs: ["carrera","monaco","navitimer"], blurb: "Perforated racing calf, red stitch. Named for the circuit we still miss." },
  { id: "gp-blue", name: "Grand Prix Blue", family: "classic", material: "leather", tex: "perf", end: "straight",
    colorName: "Blue / orange", hex: "#25436E", stitch: "#D9622B", widths: [20,22], price: 5400, taper: "2mm taper", thickness: "3.4mm",
    pairs: ["monaco","carrera","superocean"], blurb: "Gulf-livery blue with orange stitch. The Monaco's natural habitat." },
  // ---------------- classic · croc-grain dress ----------------
  { id: "rajpath-croc", name: "Rajpath Croc", family: "classic", material: "leather", tex: "croc", end: "straight",
    colorName: "Black croc-grain", hex: "#1A1A1E", stitch: "#1A1A1E", widths: [18,19,20], price: 5600, taper: "4mm taper", thickness: "3.6mm",
    pairs: ["reverso","master","santos"], blurb: "Embossed croc-grain calf, tonal stitch, ceremony-ready." },
  { id: "falaknuma-croc", name: "Falaknuma Croc", family: "classic", material: "leather", tex: "croc", end: "straight",
    colorName: "Bordeaux croc-grain", hex: "#4A1E28", stitch: "#4A1E28", widths: [18,20], price: 5600, taper: "4mm taper", thickness: "3.6mm",
    pairs: ["reverso","master","navitimer"], blurb: "Palace-dinner bordeaux. The Reverso's evening wear." },
  // ---------------- classic · pilot riveted ----------------
  { id: "squadron-rivet", name: "Squadron", family: "classic", material: "leather", tex: "rivet", end: "straight",
    colorName: "Dark brown, riveted", hex: "#4A3220", stitch: "#C9A96A", widths: [20,22], price: 5200, taper: "straight", thickness: "4.0mm",
    pairs: ["markxx","spirit","navitimer"], blurb: "Riveted pilot strap the way 1940s regulations wrote it." },
  // ---------------- classic · tropic rubber ----------------
  { id: "tropic-monsoon", name: "Tropic Monsoon", family: "classic", material: "rubber", tex: "tropic", end: "straight",
    colorName: "Black tropic", hex: "#26262B", stitch: "#26262B", widths: [20,22], price: 4000, taper: "2mm taper", thickness: "2.8mm", tag: "new",
    pairs: ["spb143","captaincook","seamaster300"], blurb: "Basket-weave tropic, the 1960s skin-diver pattern the forums brought back." },
  { id: "tropic-goa", name: "Tropic Goa", family: "classic", material: "rubber", tex: "tropic", end: "straight",
    colorName: "Palm green tropic", hex: "#2E4A3A", stitch: "#2E4A3A", widths: [20,22], price: 4000, taper: "2mm taper", thickness: "2.8mm",
    pairs: ["captaincook","spb143","bb58"], blurb: "Tropic weave in shack-season green." },
  // ---------------- classic · FKM rubber ----------------
  { id: "monsoon-black", name: "Monsoon", family: "classic", material: "rubber", tex: "fkm", end: "straight",
    colorName: "Black", hex: "#26262B", stitch: "#26262B", widths: [20,22,24], price: 3800, taper: "straight", thickness: "2.6mm", tag: "staff pick",
    pairs: ["seamaster300","superocean","luminor"], blurb: "FKM fluoroelastomer — the watch's raincoat, July through September." },
  { id: "arabian-blue", name: "Arabian Sea", family: "classic", material: "rubber", tex: "fkm", end: "straight",
    colorName: "Deep blue", hex: "#1F3D66", stitch: "#1F3D66", widths: [20,22], price: 3800, taper: "straight", thickness: "2.6mm",
    pairs: ["seamaster300","superocean","aquaterra"], blurb: "The exact blue of deep water off the Konkan coast." },
  { id: "track-orange", name: "Grid Position", family: "classic", material: "rubber", tex: "fkm", end: "straight",
    colorName: "Signal orange", hex: "#D9622B", stitch: "#D9622B", widths: [20,22], price: 3800, taper: "straight", thickness: "2.6mm",
    pairs: ["carrera","superocean","monaco"], blurb: "Loud on purpose. Pit-lane orange FKM." },
  // ---------------- classic · sailcloth ----------------
  { id: "regatta-black", name: "Regatta Black", family: "classic", material: "sailcloth", tex: "sail", end: "straight",
    colorName: "Black / red", hex: "#232329", stitch: "#C43B2A", widths: [20,22], price: 4200, taper: "2mm taper", thickness: "3.0mm",
    pairs: ["speedmaster","seamaster300","navitimer"], blurb: "Structured sailcloth, red stitch — the modern-classic combo." },
  { id: "gateway-grey", name: "Gateway Grey", family: "classic", material: "sailcloth", tex: "sail", end: "straight",
    colorName: "Grey / blue", hex: "#5E6672", stitch: "#7E93B8", widths: [20,22], price: 4200, taper: "2mm taper", thickness: "3.0mm",
    pairs: ["aquaterra","snowflake","carrera"], blurb: "Basalt grey with steel-blue stitching." },
  // ---------------- classic · NATO / canvas ----------------
  { id: "bond-stripe", name: "The Bond", family: "classic", material: "nato", tex: "nato", end: "straight",
    colorName: "Navy / grey stripe", hex: "#33415C", stitch: "#8A929E", stripes: ["#33415C","#8A929E","#33415C","#8A929E","#33415C"], widths: [20,22], price: 2200, taper: "straight", thickness: "1.4mm", tag: "staff pick",
    pairs: ["seamaster300","spb143","bb58"], blurb: "The navy-and-grey stripe. Some claim Connery; we claim comfort." },
  { id: "cantonment-green", name: "Cantonment", family: "classic", material: "nato", tex: "nato", end: "straight",
    colorName: "Army green", hex: "#57604A", stitch: "#57604A", stripes: ["#57604A"], widths: [18,20,22], price: 2000, taper: "straight", thickness: "1.4mm",
    pairs: ["markxx","spb143","bb58"], blurb: "Single-pass olive nylon. Field-watch correct." },
  { id: "deccan-sand", name: "Deccan Sand", family: "classic", material: "nato", tex: "nato", end: "straight",
    colorName: "Faded sand", hex: "#C4B69A", stitch: "#C4B69A", stripes: ["#C4B69A"], widths: [20,22], price: 2000, taper: "straight", thickness: "1.4mm",
    pairs: ["spb143","speedmaster","captaincook"], blurb: "Pre-faded to look like a decade of service." },
  { id: "midnight-canvas", name: "Midnight Canvas", family: "classic", material: "nato", tex: "canvas", end: "straight",
    colorName: "Ink navy", hex: "#1A2438", stitch: "#B08D57", widths: [20,22], price: 2400, taper: "straight", thickness: "1.6mm", tag: "new",
    pairs: ["seamaster300","aquaterra","snowflake"], blurb: "Waxed canvas in alug midnight, single brass keeper stitch." },
  // ---------------- classic · Panerai slab ----------------
  { id: "pam-slab", name: "The Slab — 24", family: "classic", material: "leather", tex: "leather", end: "straight",
    colorName: "Dark brown", hex: "#4A3220", stitch: "#D9C9A8", widths: [24,26], price: 5600, taper: "straight", thickness: "4.2mm", tag: "odd lugs",
    pairs: ["luminor"], blurb: "4.2mm thick, cream box-stitch, built like the watch it carries." },
  // ---------------- classic · 21 Club ----------------
  { id: "hydro-21-navy", name: "The 21 Club — Navy", family: "classic", material: "leather", tex: "leather", end: "straight",
    colorName: "Navy", hex: "#22345A", stitch: "#C9A96A", widths: [21], price: 4900, taper: "3mm taper", thickness: "3.2mm", tag: "odd lugs",
    pairs: ["hydroconquest","submariner"], blurb: "True 21mm. No filed 22s, no floating 20s. You're welcome." },
  { id: "hydro-21-saddle", name: "The 21 Club — Saddle", family: "classic", material: "leather", tex: "leather", end: "straight",
    colorName: "Saddle brown", hex: "#8A5A30", stitch: "#EDE3D0", widths: [21], price: 4900, taper: "3mm taper", thickness: "3.2mm", tag: "odd lugs",
    pairs: ["hydroconquest","submariner"], blurb: "The 21mm gap in the market, filled with full-grain saddle." },
  // ---------------- curved-end line ----------------
  { id: "curve-moon-black", name: "Curve — Moonshot", family: "curved", material: "leather", tex: "leather", end: "curved",
    colorName: "Black, curved end", hex: "#1D1D21", stitch: "#B9AF9C", widths: [20], price: 6800, taper: "2mm taper", thickness: "3.4mm", tag: "curved end",
    fits: ["speedmaster"], pairs: ["speedmaster"], blurb: "Curved ends machined to hug the Speedmaster case — the end-to-end look, no gap, ever." },
  { id: "curve-sail-grey", name: "Curve — Snoopy Grey", family: "curved", material: "sailcloth", tex: "sail", end: "curved",
    colorName: "Grey sailcloth, curved end", hex: "#5E6672", stitch: "#C43B2A", widths: [20], price: 6500, taper: "2mm taper", thickness: "3.2mm", tag: "curved end",
    fits: ["speedmaster","aquaterra"], pairs: ["speedmaster","aquaterra"], blurb: "Sailcloth with fitted curved ends — the look the Artem faithful swear by, cut for Speedmaster and Aqua Terra." },
  { id: "curve-wave-blue", name: "Curve — Wavebreaker", family: "curved", material: "rubber", tex: "fkm", end: "curved",
    colorName: "Wave blue, curved end", hex: "#1F3D66", stitch: "#1F3D66", widths: [20], price: 6500, taper: "straight", thickness: "3.0mm", tag: "curved end",
    fits: ["seamaster300"], pairs: ["seamaster300"], blurb: "FKM with a case-hugging curve for the Diver 300M. Factory look, alug price." },
  { id: "curve-sub-black", name: "Curve — Crown Fit 21", family: "curved", material: "rubber", tex: "fkm", end: "curved",
    colorName: "Black, curved end, 21mm", hex: "#1A1A1E", stitch: "#1A1A1E", widths: [21], price: 6800, taper: "straight", thickness: "3.0mm", tag: "curved end",
    fits: ["submariner"], pairs: ["submariner"], blurb: "True 21mm curved ends for the Submariner. The strap Rolex doesn't want you to find." },
  // ---------------- PRX integrated line ----------------
  { id: "prx-rubber-black", name: "PRX Fit — Ink", family: "prx", material: "rubber", tex: "fkm", end: "integrated",
    colorName: "Black, integrated", hex: "#1D1D21", stitch: "#1D1D21", widths: [12], price: 4500, taper: "integrated", thickness: "3.0mm", tag: "prx fit",
    fits: ["prx"], pairs: ["prx"], blurb: "FKM shaped to the PRX's integrated case. Yes, the PRX takes straps now — we heard you." },
  { id: "prx-rubber-green", name: "PRX Fit — Palm", family: "prx", material: "rubber", tex: "fkm", end: "integrated",
    colorName: "Green, integrated", hex: "#2E4A3A", stitch: "#2E4A3A", widths: [12], price: 4500, taper: "integrated", thickness: "3.0mm", tag: "prx fit",
    fits: ["prx"], pairs: ["prx"], blurb: "Integrated-fit FKM in palm green for the waffle-dial crowd." },
  { id: "prx-leather-tan", name: "PRX Fit — Saddle", family: "prx", material: "leather", tex: "leather", end: "integrated",
    colorName: "Tan leather, integrated", hex: "#C08B4F", stitch: "#7A5A2E", widths: [12], price: 5200, taper: "integrated", thickness: "3.2mm", tag: "prx fit",
    fits: ["prx"], pairs: ["prx"], blurb: "The PRX in leather is a different watch entirely. Fitted ends, zero gap." }
];

const WATCHES = [
  { id: "seamaster300", brand: "Omega", model: "Seamaster Diver 300M", size: "42mm", lug: 20, band: "₹4.2–4.9L", movement: "Co-Axial Master Chronometer", badge: "The Bond",
    render: { shape: "diver", dial: "#1F3D66", bezel: "#16294A", case: "#A9A296" },
    variants: [
      { ref: "2531.80 'Bond' (1993–2006)", note: "skeleton hands, 20mm" },
      { ref: "8800 wave dial (2018– )", note: "ceramic bezel, 20mm" }
    ],
    curation: [
      { strap: "curve-wave-blue", why: "The curved-end FKM keeps the factory silhouette — forum consensus pick for summer." },
      { strap: "bond-stripe", why: "The navy-grey stripe this watch made famous. Non-negotiable heritage." },
      { strap: "midnight-canvas", why: "Waxed canvas calms the wave dial down for the boardroom." }
    ],
    why: "The default first serious watch in India right now." },
  { id: "speedmaster", brand: "Omega", model: "Speedmaster Moonwatch", size: "42mm", lug: 20, band: "₹5.2–7.0L", movement: "Hand-wound cal. 3861", badge: "Went to the Moon",
    render: { shape: "chrono", dial: "#17181C", bezel: "#0E0F12", case: "#A9A296" },
    variants: [
      { ref: "145.022 (1968–81)", note: "cal. 861, the moon-era reference" },
      { ref: "3570.50 (1996–2014)", note: "hesalite, tritium-to-lume transition" },
      { ref: "310.30 (2021– )", note: "Master Chronometer cal. 3861" }
    ],
    curation: [
      { strap: "kala-tobacco", why: "Tobacco suede on a Speedy is the single most repeated pairing on r/Watches. There's a reason." },
      { strap: "curve-sail-grey", why: "Curved-end sailcloth — the Snoopy look the OmegaForums crowd chases." },
      { strap: "deccan-sand", why: "Faded NATO reads 1968 test-pilot. Hesalite owners especially." }
    ],
    why: "The only watch NASA trusts." },
  { id: "aquaterra", brand: "Omega", model: "Aqua Terra 150M", size: "41mm", lug: 20, band: "₹4.5–5.2L", movement: "Co-Axial Master Chronometer", badge: "The One-Watch Watch",
    render: { shape: "dress", dial: "#23364F", bezel: "#A9A296", case: "#A9A296" },
    variants: [
      { ref: "'Skyfall' 8500 (2012–17)", note: "vertical teak dial" },
      { ref: "41mm 8900 (2017– )", note: "horizontal teak, 20mm" }
    ],
    curation: [
      { strap: "hauz-taupe", why: "Taupe suede softens the teak dial — the quiet-luxury pairing." },
      { strap: "gateway-grey", why: "Grey sailcloth with blue stitch mirrors the dial's own palette." },
      { strap: "marine-navy", why: "Navy-on-navy with brass stitch for full owner-of-the-room effect." }
    ],
    why: "Boardroom to beach." },
  { id: "bb58", brand: "Tudor", model: "Black Bay 58", size: "39mm", lug: 20, band: "₹3.1–3.6L", movement: "MT5402, 70h reserve", badge: "The Enthusiast's Pick",
    render: { shape: "diver", dial: "#17181C", bezel: "#17181C", case: "#A9A296", accent: "#C9A96A" },
    variants: [
      { ref: "79030N black/gilt (2018– )", note: "the one that started it" },
      { ref: "79030B navy (2020– )", note: "silver accents, cooler straps" }
    ],
    curation: [
      { strap: "colaba-chestnut", why: "Warm chestnut against gilt accents — the pairing WatchUSeek calls 'the cheat code'." },
      { strap: "tropic-goa", why: "Tropic rubber keeps the vintage skin-diver story going." },
      { strap: "cantonment-green", why: "Olive single-pass for field days." }
    ],
    why: "The watch that made 39mm cool again." },
  { id: "bb41", brand: "Tudor", model: "Black Bay 41", size: "41mm", lug: 22, band: "₹3.3–3.9L", movement: "Manufacture MT56", badge: "Big Crown Energy",
    render: { shape: "diver", dial: "#17181C", bezel: "#2A0F12", case: "#A9A296" },
    variants: [ { ref: "M7941A (2023– )", note: "22mm, METAS certified" } ],
    curation: [
      { strap: "buddh-racing", why: "22mm perforated racing calf gives the big case a job." },
      { strap: "monsoon-black", why: "Straight-cut FKM suits the tool-watch mass." },
      { strap: "alibaug-tan", why: "Tan leather to warm up the burgundy bezel." }
    ],
    why: "The 22mm lug is a gift — the widest wardrobe starts here." },
  { id: "hydroconquest", brand: "Longines", model: "HydroConquest GMT", size: "41mm", lug: 21, band: "₹1.3–1.7L", movement: "L844 anti-magnetic", badge: "The Gateway",
    render: { shape: "diver", dial: "#14452F", bezel: "#0E301F", case: "#A9A296" },
    variants: [
      { ref: "41mm ceramic (2018– )", note: "21mm lug, the famous problem" },
      { ref: "GMT (2022– )", note: "green or black, still 21mm" }
    ],
    curation: [
      { strap: "hydro-21-navy", why: "True 21mm — this line exists because of your watch." },
      { strap: "hydro-21-saddle", why: "Saddle leather turns the tool diver into a weekender." },
      { strap: "tropic-monsoon", why: "Tropic pattern for pool days — we cut it in true 21 on request." }
    ],
    why: "India's favourite first Swiss diver — cursed with 21mm lugs." },
  { id: "spirit", brand: "Longines", model: "Spirit", size: "40mm", lug: 20, band: "₹1.9–2.4L", movement: "L888.4 chronometer", badge: "Aviator Blood",
    render: { shape: "pilot", dial: "#17181C", bezel: "#A9A296", case: "#A9A296" },
    variants: [
      { ref: "40mm (2020– )", note: "five-star dial, 20mm" },
      { ref: "Zulu Time GMT (2022– )", note: "22mm — measure first" }
    ],
    curation: [
      { strap: "squadron-rivet", why: "Riveted pilot leather — regulation 1940s." },
      { strap: "alibaug-tan", why: "Distressed tan for the barnstormer look." },
      { strap: "cantonment-green", why: "Olive NATO, flight-jacket adjacent." }
    ],
    why: "Chronometer spec, pilot heritage." },
  { id: "master", brand: "Longines", model: "Master Collection", size: "40mm", lug: 20, band: "₹1.7–2.2L", movement: "L888 automatic", badge: "The Wedding Watch",
    render: { shape: "dress", dial: "#EDE8DC", bezel: "#A9A296", case: "#A9A296", accent: "#2E4368" },
    variants: [ { ref: "L2.793 (2012– )", note: "barleycorn dial, blued hands" } ],
    curation: [
      { strap: "jubilee-bordeaux", why: "Bordeaux instead of the default black croc every wedding sees." },
      { strap: "rajpath-croc", why: "If it must be black croc, make it deep-embossed and 4mm tapered." },
      { strap: "fort-cognac", why: "Cognac warms the barleycorn silver beautifully." }
    ],
    why: "The barleycorn dial at every good Indian wedding." },
  { id: "carrera", brand: "TAG Heuer", model: "Carrera 'Glassbox'", size: "39mm", lug: 20, band: "₹2.9–3.6L", movement: "TH20-00 automatic", badge: "Motorsport Royalty",
    render: { shape: "chrono", dial: "#F0EDE6", bezel: "#A9A296", case: "#A9A296", accent: "#17181C" },
    variants: [ { ref: "CBS2216 panda (2023– )", note: "glassbox crystal, 20mm" } ],
    curation: [
      { strap: "buddh-racing", why: "Perforated black calf with red stitch — panda dials demand it." },
      { strap: "kora-slate", why: "Slate suede for the days you're not pretending to race." },
      { strap: "track-orange", why: "Orange FKM, full pit-lane commitment." }
    ],
    why: "The 2023 glassbox brought the panda dial back." },
  { id: "monaco", brand: "TAG Heuer", model: "Monaco", size: "39mm", lug: 22, band: "₹4.0–4.8L", movement: "Heuer 02 automatic", badge: "The Square",
    render: { shape: "square", dial: "#1E3A6E", bezel: "#A9A296", case: "#A9A296", accent: "#C43B2A" },
    variants: [ { ref: "CBL2111 (2019– )", note: "Calibre Heuer 02, 22mm" } ],
    curation: [
      { strap: "gp-blue", why: "Gulf-blue perforated with orange stitch — the McQueen homage done right." },
      { strap: "buddh-racing", why: "Black racing calf lets the blue dial shout alone." },
      { strap: "rajpath-croc", why: "Black croc-grain turns the racer into a dinner jacket." }
    ],
    why: "McQueen's square icon." },
  { id: "captaincook", brand: "Rado", model: "Captain Cook Automatic", size: "42mm", lug: 20, band: "₹1.6–2.2L", movement: "R763 80h reserve", badge: "The Sleeper",
    render: { shape: "diver", dial: "#2E4A3A", bezel: "#1E332A", case: "#A9A296" },
    variants: [
      { ref: "42mm (2019– )", note: "rotating anchor, 20mm" },
      { ref: "37mm heritage", note: "19mm — measure first" }
    ],
    curation: [
      { strap: "tropic-goa", why: "Green tropic on the green Cook — skin-diver time machine." },
      { strap: "lodhi-olive", why: "Olive leather rider for dry land." },
      { strap: "deccan-sand", why: "Faded sand NATO against the deep green dial." }
    ],
    why: "Criminally good value in India." },
  { id: "navitimer", brand: "Breitling", model: "Navitimer B01", size: "43mm", lug: 22, band: "₹6.5–8.0L", movement: "Manufacture B01", badge: "The Slide Rule",
    render: { shape: "chrono", dial: "#17181C", bezel: "#2B2C31", case: "#A9A296", accent: "#EDE8DC" },
    variants: [ { ref: "B01 43 (2022– )", note: "flattened bezel, 22mm" } ],
    curation: [
      { strap: "ballard-black", why: "Black calf, bone stitch — lets the busiest dial in horology breathe." },
      { strap: "squadron-rivet", why: "Riveted brown for full flight-deck romance." },
      { strap: "falaknuma-croc", why: "Bordeaux croc-grain for the captain's dinner." }
    ],
    why: "A cockpit on the wrist." },
  { id: "superocean", brand: "Breitling", model: "Superocean Automatic", size: "42mm", lug: 20, band: "₹3.8–4.5L", movement: "Breitling 17", badge: "The Wave",
    render: { shape: "diver", dial: "#F0EDE6", bezel: "#17181C", case: "#A9A296" },
    variants: [ { ref: "A17375 (2022– )", note: "retro Slow Motion look" } ],
    curation: [
      { strap: "track-orange", why: "Orange FKM on the white dial — the designers were begging for it." },
      { strap: "arabian-blue", why: "Deep blue rubber for quieter beach days." },
      { strap: "gp-blue", why: "Perforated blue leather makes it a surprise dress-diver." }
    ],
    why: "The swim-proof modernist." },
  { id: "reverso", brand: "Jaeger-LeCoultre", model: "Reverso Classic Large", size: "45.6×27.4mm", lug: 20, band: "₹8.0–10L", movement: "Hand-wound cal. 822", badge: "The Flip",
    render: { shape: "rect", dial: "#EDE8DC", bezel: "#A9A296", case: "#A9A296", accent: "#2E4368" },
    variants: [ { ref: "Classic Large (2016– )", note: "straps size by case generation — measure or ask us" } ],
    curation: [
      { strap: "rajpath-croc", why: "Deep black croc-grain — the Reverso's birth language." },
      { strap: "falaknuma-croc", why: "Bordeaux for the second, braver side of the flip." },
      { strap: "hauz-taupe", why: "Taupe suede is the modern collector's Reverso move." }
    ],
    why: "The polo watch that became art deco royalty." },
  { id: "santos", brand: "Cartier", model: "Santos de Cartier Medium", size: "35.1mm", lug: 0, band: "₹6.0–7.5L", movement: "1847 MC automatic", badge: "QuickSwitch Only",
    render: { shape: "square", dial: "#F3EFE4", bezel: "#A9A296", case: "#A9A296", accent: "#2E4368" },
    variants: [ { ref: "WSSA0029 (2018– )", note: "proprietary QuickSwitch system" } ],
    curation: [
      { strap: "rajpath-croc", why: "We cut fitted QuickSwitch-compatible ends on request — write to us before ordering." }
    ],
    why: "First pilot's watch ever made. Proprietary system — we flag it honestly." },
  { id: "markxx", brand: "IWC", model: "Pilot's Watch Mark XX", size: "40mm", lug: 20, band: "₹5.0–5.8L", movement: "IWC 32111, 120h", badge: "The Cockpit Classic",
    render: { shape: "pilot", dial: "#17181C", bezel: "#A9A296", case: "#A9A296" },
    variants: [ { ref: "IW328201 (2022– )", note: "20mm — check older Marks before ordering" } ],
    curation: [
      { strap: "squadron-rivet", why: "Riveted dark brown — the only historically literate answer." },
      { strap: "cantonment-green", why: "Olive nylon for field days." },
      { strap: "lodhi-olive", why: "Olive leather splits the difference." }
    ],
    why: "The purest tool watch still in production." },
  { id: "luminor", brand: "Panerai", model: "Luminor Marina", size: "44mm", lug: 24, band: "₹6.5–8.0L", movement: "P.9010 automatic", badge: "The Slab",
    render: { shape: "cushion", dial: "#17181C", bezel: "#A9A296", case: "#A9A296" },
    variants: [ { ref: "PAM01312 (2020– )", note: "24mm, crown guard" } ],
    curation: [
      { strap: "pam-slab", why: "4.2mm thick with cream box-stitch — the house style, sized for the slab." },
      { strap: "monsoon-black", why: "24mm FKM for monsoon wrists." },
      { strap: "kala-tobacco", why: "Tobacco suede softens the brute (24mm on request)." }
    ],
    why: "The 24mm lug is a lifestyle." },
  { id: "snowflake", brand: "Grand Seiko", model: "SBGA211 'Snowflake'", size: "41mm", lug: 20, band: "₹5.2–6.0L", movement: "Spring Drive 9R65", badge: "The Perfect Sweep",
    render: { shape: "dress", dial: "#EEF0F2", bezel: "#A9A296", case: "#A9A296", accent: "#2E4368" },
    variants: [ { ref: "SBGA211 (2010– )", note: "titanium, 20mm" } ],
    curation: [
      { strap: "hauz-taupe", why: "Pale suede under the snow dial — the pairing GS forums photograph most." },
      { strap: "marine-navy", why: "Navy with brass stitch echoes the blued seconds hand." },
      { strap: "gateway-grey", why: "Grey sailcloth for texture-on-texture restraint." }
    ],
    why: "A dial like fresh snow over Mount Iwate." },
  { id: "submariner", brand: "Rolex", model: "Submariner Date", size: "41mm", lug: 21, band: "₹9.0–12L*", movement: "Cal. 3235", badge: "The Waitlist",
    render: { shape: "diver", dial: "#17181C", bezel: "#17181C", case: "#A9A296" },
    variants: [
      { ref: "116610 (2010–20)", note: "20mm — the last of them" },
      { ref: "126610 (2020– )", note: "41mm, 21mm lug — the new problem" }
    ],
    curation: [
      { strap: "curve-sub-black", why: "True 21mm curved-end rubber. The strap Rolex doesn't want you to find." },
      { strap: "hydro-21-navy", why: "21 Club navy leather for dinner. Yes, a Sub on leather. Live a little." },
      { strap: "bond-stripe", why: "The stripe pre-dates the movie deals. 20mm floats a hair on the 126610 — we say so honestly." }
    ],
    why: "*Grey market reality included." },
  { id: "spb143", brand: "Seiko", model: "Prospex SPB143 '62MAS'", size: "40.5mm", lug: 20, band: "₹0.9–1.1L", movement: "6R35 automatic", badge: "The Enthusiast's Secret",
    render: { shape: "diver", dial: "#3A3F44", bezel: "#2B2E33", case: "#A9A296" },
    variants: [ { ref: "SPB143 (2020– )", note: "grey sunburst, 20mm" } ],
    curation: [
      { strap: "tropic-monsoon", why: "Tropic rubber — the 62MAS wore exactly this in 1965." },
      { strap: "deccan-sand", why: "Faded sand NATO. Trust us, and trust the entire internet." },
      { strap: "alibaug-tan", why: "Tan leather for the brass-age patina project." }
    ],
    why: "Proof that taste and lakhs are different currencies." },
  { id: "prx", brand: "Tissot", model: "PRX Powermatic 80", size: "40mm", lug: 0, band: "₹0.6–0.8L", movement: "Powermatic 80", badge: "The Integrated Darling",
    render: { shape: "integrated", dial: "#6E9CC4", bezel: "#A9A296", case: "#A9A296" },
    variants: [
      { ref: "T137.407 40mm (2021– )", note: "waffle dial, integrated case" },
      { ref: "35mm (2022– )", note: "needs 35mm-specific fitted straps" }
    ],
    curation: [
      { strap: "prx-rubber-black", why: "Integrated-fit FKM — the swap the PRX community begged for until Delugs proved it possible." },
      { strap: "prx-leather-tan", why: "Tan leather turns the sports icon into a '70s lounge act." },
      { strap: "prx-rubber-green", why: "Palm green against the ice-blue waffle. Loud, correct." }
    ],
    why: "We owe the PRX an apology — it takes straps now, and we made them." }
];

const ART = [
  // ---- The archive, reimagined (unlicensed homages — real names per KP's decision; legal review pending) ----
  { id: "art-reckon", series: "archive", title: "For Men Who Reckon Time In Seconds — The Omega Speedmaster", short: "Reckon Time In Seconds", styleTag: "B&W halftone",
    palette: ["#141414","#EDE6D2","#8A8A8E"], size: "A2 · framed", price: 5400,
    story: "Our monochrome redraw of the most quoted chronograph headline of the 1960s. Halftone-printed the way the magazines did it, hand-set condensed type, and a Speedmaster rendered from the moon-era reference." },
  { id: "art-moonlanding", series: "archive", title: "The Moon Above, The Moonwatch Below — 1969", short: "The Moon Above", styleTag: "B&W spotlight",
    palette: ["#0E0E10","#D8D5CE","#8A8A8E"], size: "A2 · framed", price: 5400,
    story: "July 1969, rendered as a single beam of light across a lunar field, with the only watch that made the trip. Greyscale giclée on cotton rag." },
  { id: "art-crack", series: "archive", title: "It Never Cracked — TAG Heuer Monaco, 1971", short: "It Never Cracked", styleTag: "Caricature line art",
    palette: ["#F0E7D2","#17181C","#C43B2A"], size: "A3 · framed", price: 4600,
    story: "The square that raced Le Mans, drawn as a single-line caricature with a racing stripe. A wink at the most famous pressure-proof swagger in motorsport watches." },
  { id: "art-polo", series: "archive", title: "The Flip Side — Jaeger-LeCoultre Reverso, 1931", short: "The Flip Side", styleTag: "Sepia caricature",
    palette: ["#EFE4CC","#4A3220","#A8441F"], size: "A3 · framed", price: 4600,
    story: "A polo pony inspects the case-back it made necessary. Sepia caricature honouring the watch built to survive the chukka." },
  { id: "art-crown", series: "archive", title: "Everyone Waits. Time Doesn't. — Rolex Submariner", short: "Everyone Waits", styleTag: "B&W depth",
    palette: ["#101114","#D8D5CE","#5E6672"], size: "A2 · framed", price: 5400,
    story: "A comment on the waitlist, set 300 metres down. Monochrome depth print for everyone whose authorised dealer 'will call when something comes in'." },
  // ---- alug originals ----
  { id: "art-rail", series: "original", title: "The Overnight Train — 1955", short: "The Overnight Train", styleTag: "India series",
    palette: ["#57604A","#EDE3D0","#8F6E3E"], size: "A3 · framed", price: 4600,
    story: "A railway pocket watch, a first-class cabin, and the Deccan rolling past. Original alug artwork from the India series." },
  { id: "art-bombay", series: "original", title: "19 Jewels — Bombay 1962", short: "19 Jewels", styleTag: "India series",
    palette: ["#5C2431","#EDE3D0","#B08D57"], size: "A3 · framed", price: 4600,
    story: "What an Indian watch advert from 1962 should have looked like. We fixed history. Art-deco borders and all." },
  { id: "art-springbar", series: "original", title: "The ₹80 Hero — a1u9 Spring Bar Study", short: "The ₹80 Hero", styleTag: "alug manifesto",
    palette: ["#F3EDE1","#2A241B","#C4562A"], size: "A3 · framed", price: 4200,
    story: "An exploded technical drawing of the humble spring bar, crowned with the alug wordmark. The part that holds everything, finally given a portrait." },
  { id: "art-lume", series: "original", title: "Lume Study No. 3", short: "Lume Study", styleTag: "Movement studies",
    palette: ["#0E1420","#B8D8B0","#EDEFF3"], size: "A3 · framed", price: 4200,
    story: "Printed with phosphorescent ink. Charge it under your desk lamp, thank us at midnight." }
];

const NOTEBOOKS = [
  { id: "nb-caliber", title: "The Calibre Sketchbook", detail: "A5 · dot grid · 192 pages", palette: ["#101B2E","#B08D57"], price: 1200,
    blurb: "Dot-grid pages with a movement schematic on every chapter divider." },
  { id: "nb-lume", title: "Lume Notes", detail: "A6 · ruled · 144 pages", palette: ["#0E1420","#B8D8B0"], price: 900,
    blurb: "Pocket notebook with glow-in-the-dark cover print." },
  { id: "nb-waitlist", title: "The Waitlist", detail: "A5 · planner · 12 months", palette: ["#EDE3D0","#8F6E3E"], price: 1400,
    blurb: "One page per month for watches you promised not to buy." }
];

const ARTICLES = [
  { id: "spring-bar", title: "The ₹80 part holding your ₹8 lakh watch", minutes: 4, date: "July 2026",
    desc: "Spring bars are the most important component nobody thinks about. A short appreciation, and a warning.",
    body: `
<p>Somewhere between your watch and your wrist sit two pieces of steel, each thinner than a toothpick, each costing less than a plate of vada pav. They are the only thing preventing your Seamaster from performing an unscheduled dive onto airport marble.</p>
<p>The spring bar is a spring-loaded telescoping pin, invented so straps could be changed without tools and lost so watches could be sold with bracelets. Every strap we sell hangs on two of them. Respect is due.</p>
<h3>What good ones look like</h3>
<p>Fat, double-shouldered, 316L stainless, with tips that seat fully into the lug holes. Cheap straps ship with thin single-shoulder bars that flex under load — the number one cause of the sickening sound of a watch hitting the floor.</p>
<blockquote>Every alug strap ships with two fitted double-shouldered bars, plus a spare pair. Because the failure mode of a ₹80 part should never involve your crystal.</blockquote>
<h3>The quick-release revolution</h3>
<p>Modern quick-release bars put a tiny lever on the underside of the strap, so a swap takes eight seconds and zero tools. All alug leather, suede, sailcloth and rubber comes quick-release as standard. Your Sunday strap and your Monday strap can finally live in rotation.</p>
<p>One rule: never reuse tired bars from an old strap. They're consumables, like tyres. When the spring stops snapping back with conviction, retire them with honour.</p>` },
  { id: "lug-width", title: "Lug width is destiny", minutes: 5, date: "July 2026",
    desc: "How to measure it, why 21mm exists to torment you, and what your lug width says about your watch.",
    body: `
<p>Before a strap can be beautiful it must be correct, and correct starts with one number: the distance between your lugs, in millimetres, measured straight across the inside faces where the spring bar sits.</p>
<h3>Measuring without tears</h3>
<p>Use vernier calipers if you own them, a steel ruler if you don't. Measure the gap, not the strap — old straps shrink and stretch. If you get 19.8mm, your watch is a 20. If you genuinely get 21, congratulations, you own a Longines HydroConquest or a Rolex Submariner, and the industry has been quietly ignoring you for years.</p>
<blockquote>Even numbers are a kindness. Odd numbers are a personality test.</blockquote>
<h3>The odd-lug conspiracy</h3>
<p>Rolex ships 21mm on the Submariner 41 partly because a perfect aftermarket fit is harder — they'd rather you stayed on bracelet. Longines inherited 21mm across half the HydroConquest range. IWC has flirted with 19. The result: millions of watches whose owners squeeze in 22s or let 20s float, both of which are visible from across the room to anyone who cares. We built The 21 Club line because we care.</p>
<h3>Know your number</h3>
<p>The big ones in India right now: 20mm rules (Seamaster, Speedmaster, Black Bay 58, Spirit, Mark XX, Captain Cook, SPB143). 22mm carries the big cases (Black Bay 41, Navitimer, Monaco). 21mm is the tax on good taste. 24mm is Panerai and Panerai is 24mm. And integrated cases — PRX, Santos — need fitted ends, which we now make.</p>
<p>Every strap on this site is filterable by lug width, and every watch in our Shop by Watch guide carries its number. Measure once, filter forever.</p>` },
  { id: "taper", title: "A field guide to strap taper", minutes: 4, date: "July 2026",
    desc: "The 2mm decision that changes how a watch wears more than anything else you can do to it.",
    body: `
<p>Taper is the difference between a strap's width at the lugs and at the buckle. A 20/16 strap starts at 20mm and slims to 16. A 20/20 doesn't slim at all. This tiny geometry decision changes the entire character of a watch on the wrist.</p>
<h3>Strong taper (3–4mm)</h3>
<p>Elegant, vintage, dressy. The watch head looks larger and the wrist looks finer. A Reverso or a Master Collection on a strong taper is correct in the way a well-fitted sherwani is correct. Our dress leathers run 3–4mm tapers for exactly this reason.</p>
<h3>Gentle taper (2mm)</h3>
<p>The modern default. Balanced on divers and chronographs, sporty without being chunky. If you're unsure, buy this — it's the middle of the bell curve for a reason.</p>
<h3>No taper (straight)</h3>
<p>Tool-watch attitude. A straight 22 on a Black Bay 41 or a straight 24 on a Luminor says the watch is equipment, not jewellery. All our FKM rubber and NATO runs straight, because instruments don't slim down for anyone.</p>
<blockquote>A strong taper whispers. A straight cut states. Both are honest — pick the sentence you want your wrist to say.</blockquote>` },
  { id: "quick-release", title: "Quick release changed everything", minutes: 3, date: "July 2026",
    desc: "The tiny lever that turned strap-changing from a Sunday project into a daily decision.",
    body: `
<p>For most of horological history, changing a strap required a spring bar tool, decent light, a steady hand, and acceptance that you might scratch your lugs. So nobody changed straps. You bought a watch, it lived on one strap for a decade, and the strap industry stayed small.</p>
<p>Then someone put a lever on the spring bar.</p>
<h3>Eight seconds, zero tools</h3>
<p>Quick-release bars have a small tab on the underside. Pull the tab, the bar retracts, the strap comes free. Fitting is the reverse. The first time takes a minute; by the third time it's eight seconds a side.</p>
<blockquote>One watch with four straps is four watches. That arithmetic is the entire reason this shop exists.</blockquote>
<h3>What it means for a collection</h3>
<p>The maths of Indian watch buying just changed — duties are falling, boutiques are opening, and the ₹3–8 lakh watch is now a mainstream aspiration. But a second watch at that level is a serious cheque. A fourth strap is dinner for two. Quick release is what makes the strap wardrobe a rational, joyful alternative to the second watch — at least until you buy the second watch anyway. We'll have straps for that one too.</p>` },
  { id: "starter-shelf", title: "The Indian collector's starter shelf", minutes: 6, date: "July 2026",
    desc: "Five watches we keep seeing on serious wrists from Bandra to Indiranagar, and what we'd strap them to.",
    body: `
<p>Spend enough evenings at watch meetups in Bombay, Bangalore and Delhi and the same five references keep surfacing. This is not a best-of list — it's field reporting.</p>
<h3>1. Omega Seamaster Diver 300M</h3>
<p>The default first serious watch of the EFTA era. Usually on its bracelet, which is a shame — the wave dial over Arabian Sea FKM rubber is the summer answer, and Midnight Canvas is the year-round one.</p>
<h3>2. Tudor Black Bay 58</h3>
<p>The enthusiast's handshake. Gilt accents mean warm straps win: Colaba Chestnut or Kala Ghoda Tobacco. The 20mm lug means it also wins the strap-wardrobe game on pure economics.</p>
<h3>3. Longines HydroConquest</h3>
<p>The gateway drug, and the 21mm problem in its purest form. The 21 Club exists because HydroConquest owners deserve straps that actually fit.</p>
<h3>4. TAG Heuer Carrera Glassbox</h3>
<p>The panda-dial renaissance on Indian wrists. Buddh Racing — perforated black calf, red stitch — is the only strap we'll discuss for it.</p>
<h3>5. Seiko Prospex SPB143</h3>
<p>Proof that taste and lakhs are different currencies. On Deccan Sand it looks like it was issued to someone interesting in 1968.</p>
<blockquote>The shelf isn't about price. It's about references that survive their honeymoon. All five of these do.</blockquote>` }
];
