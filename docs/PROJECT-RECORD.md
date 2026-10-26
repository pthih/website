# Personal Website — project context and decision record

Baseline reconstructed 2026-10-24 (America/Chicago). Maintained under Phyo Thiha’s decision-rich documentation standard from that date forward.

## Entry point and authority

This document preserves consequential context and reasoning. [GitHub issue #4](https://github.com/pthih/website/issues/4) remains the public work list; merged PRs and deployment records remain implementation/release evidence. This record does not authorize implementation of future ideas, publishing, merging, or external messages. This record is maintained at `docs/PROJECT-RECORD.md`; changes enter a review branch before merge. The repository copy is the authoritative project record; earlier project-file exports are historical snapshots.

Project: Phyo Thiha’s personal website at https://phyothiha.com/; repository https://github.com/pthih/website. Use Personal GitHub account **pthih only**, never the separate Poolsure connection. The older pthih/pthih.github.io repository was retained as a backup; do not treat it as the active source.

Evidence basis: the conversation available in this thread; fresh repository tree, issue #4, and PR #24–26 metadata/descriptions retrieved for this reconstruction. No claim of access to complete earlier chats, missing attachments, Illustrator internals, or private Search Console reports. PR descriptions are historical reports of validation, not fresh reruns. Earlier creative rationale is reconstructed only where the conversation supports it.

## Purpose, scope, and working rules

The site presents Phyo’s identity, background, design work, and personal character through responsive typography, project artwork, and a playful footer illustration. Search visibility goals are the name “Phyo Thiha” and name-plus-Houston/Conroe searches. These goals do not establish a commercial service area or justify invented biography.

Phyo supplies source artwork, personal context, preferences, and approvals; the assistant implements changes, proposes alternatives, investigates defects, and documents evidence. Attribute individual decisions below instead of inferring authorship from commits made through Phyo’s GitHub account.

Preserve:
- Existing mobile navigation, back-to-top, custom animations, approved driving curve and parking position, wheel rotation/suspension and wheel-well masking.
- Wotfard Regular throughout, including headings/buttons, without synthetic bold.
- Theme-aware project artwork and responsive frames.
- Both other-site landing pages and their assets; the archived running article and dependencies.
- Preview-first review for design experiments. Approved changes may enter a PR; merge only on explicit instruction.
- Factual biography and public information only. Do not publish private employer information.
- Honest validation limits. A failed browser session is not a test pass.

A large visual revamp is deferred. The smaller refinements selected by Phyo are the current scope.

## Current implemented and released state

Fresh repository tree resolves to merge commit **15ac79376f67fd22fe99a9ee778fa1749b1cafff**. PRs #24, #25, and #26 are merged. Descriptions saying they are open are historical and superseded.

| Milestone | Evidence and scope |
|---|---|
| [PR #24](https://github.com/pthih/website/pull/24) | Merged 2026-10-21T06:33:05Z, ac623a96aa74257db023fff2564f589f24bfb4d9. Refined artwork, Wotfard, header changes, initial unused-code cleanup, logos, car behavior, man/husky, and responsive footer spacing. |
| [PR #25](https://github.com/pthih/website/pull/25) | Merged 2026-10-22T05:32:09Z, b6fb6447c18cc0bc1421d1a4c237d3e2cbd4652b. Illustrator-refined Burma artwork, selective fades, image/SVG optimization, gallery/resource removal, credits, warm ivory, compact theme toggle and mobile credit clearance. Deployment success and live CSS/footer verification were recorded in this conversation. |
| [PR #26](https://github.com/pthih/website/pull/26) | Merged 2026-10-24T02:45:30Z (October 23 locally), 15ac79376f67fd22fe99a9ee778fa1749b1cafff. Car click outline, approved moon glow, SEO metadata/H1/sitemap/canonical, desktop social centering. [Pages run](https://github.com/pthih/website/actions/runs/40055503547) completed successfully. Live title, one H1, canonical, and sitemap were verified afterward. |

Deployment confirms publication of those files; it does not prove every visual detail or browser interaction works. The final header/H1 visual comparison across desktop/mobile remains a gap.

## Consequential decisions and corrections

### Hosting, domain, and search discovery

Phyo considered GoDaddy hosting because forwarding the domain left a github.io address in the address bar. The assistant explained that custom-domain DNS can retain the purchased domain while keeping GitHub Pages hosting. Phyo retained GitHub Pages rather than purchasing hosting for this purpose.

Recorded setup: forwarding removed; GitHub ownership TXT challenge verified; apex A records and www CNAME configured; GitHub DNS check succeeded; certificate eventually became available and Phyo enabled Enforce HTTPS. Certificate provisioning was allowed time rather than immediately restarted. Do not retain the challenge value as project documentation.

Browser observations before PR #26: HTTP apex, HTTPS www, and https://pthih.github.io/website/ resolved to https://phyothiha.com/. These were observed navigation destinations, not a complete HTTP status-chain or DNS audit. PR #26 then declared that URL as the homepage canonical.

Search Console evidence is **Phyo-reported**, not an assistant account inspection:
1. Ownership verified.
2. Stored inspection initially said “URL is not on Google” / “URL is unknown to Google.”
3. Live test said “URL is available to Google”; Phyo requested indexing.
4. Later stored inspection said “URL is on Google.”
5. After PR #26 deployment, Phyo submitted https://phyothiha.com/sitemap.xml and reported “Success.”

The initial stored/live results were consistent: an indexability test is not proof of prior indexing. Homepage indexing and sitemap processing are now reported complete; rankings, impressions, clicks, and preferred-query visibility have not been measured.

Selected SEO changes:
- Title: “Phyo Thiha | Conroe & Greater Houston”; existing location-aware description retained.
- Intro H3 changed to H1; existing CSS selectors extended with :is(h1, h3), preserving specificity and declarations. Intro-fitting JavaScript selects the class.
- ProfilePage/Person JSON-LD uses existing name, portrait, homepage, and public GitHub/LinkedIn/Reddit/Trailblazer links. No employer, new biographical facts, or private data added.
- Sitemap contains only the personal homepage; it excludes unrelated landing pages/archived material and invents no last-modified date.
- Self-referencing canonical matches sitemap and profile URLs.

Assistant submitted the proposed JSON-LD to [Google’s Rich Results Test](https://search.google.com/test/rich-results/result?id=KKq99IXeo3LPJcVnwYlKTg); result: **one valid Profile page item**. This was a code test, not Google crawling the unmerged page and not proof that a rich result will appear. Test links may expire. JSON parsing, one-H1, canonical/sitemap agreement, selector-only changes, and branch readbacks were checked. No ranking guarantee was made.

### Theme selection and light palette

Dark was initially the assistant’s implementation default, not an originally recorded user requirement. When Phyo asked why, the assistant acknowledged this distinction. Phyo then explicitly preferred dark for first visits to avoid exposing nighttime visitors to a bright page. The site remembers a later light/dark selection in that browser; it does not currently choose the initial theme from the device setting.

Phyo selected **Warm Ivory #F3EADB** from a full-site palette preview. PR #25 changed the light surfaces, car-body surface and moon-mask fill together; Deep Teal #173c40 linework and dark values were retained. Other preview candidates were seafoam, Blue Mist, and Pale Clay. The recorded selection is a visual preference; no color-accessibility audit was established by that choice.

At 320×700, Phyo reported the fixed theme button obscured credits. Assistant added 76px bottom footer padding plus safe-area allowance below 768px, and matched desktop to the mobile 44px circular icon-only toggle. Browser measurement at maximum scroll put credit bottom at 624px and button top at 644px (20px clearance). Accessible button names remain despite hidden visual labels.

### Portfolio reconstruction and original character

The business-logo sources had opaque white backgrounds; some .svg files actually embedded PNGs. Phyo and the assistant iterated in previews, keeping experiments separate until approval.

- Bonsai: an initial jagged trace was rejected. Assistant’s smoothed three-path vector was approved, preserving 441×390 bounds. Initial green #004119 was superseded by theme colors matching the other logos.
- Shotwell: the early experimental trace was rejected and initially deferred for Illustrator. Later assistant refinements were approved: crisp inner camera ring, shutter, and negative-space central hexagon. Final displayed width matches My999App. Do not confuse the approved reconstruction with the rejected first trace.
- My999App: Phyo requested a recreation using lines; original colors need not remain. Approved geometric vector uses transparent interiors and theme colors.
- Theme alternatives included preview-only dark-panel image filtering and V1/V2 backgrounds. Phyo selected V1 and asked to remove the version controls and restore the light/dark button. These experiments were not independent authorizations for production changes.
- Revised A Taste of Burma: Phyo found the Illustrator file; recovered country/vector artwork superseded attempts to recreate its lettering. Keep this distinct from the original-logo recreation.
- Original A Taste of Burma: Phyo supplied original reference, the Mistral resource, and later Illustrator-refined artwork. Required text: “A Taste of Burma” and “Food from the Golden Country.” The assistant recreated/assembled the outline and lettering, iterated placement and clearance, and reconstructed rice; Phyo adjusted the artwork in Illustrator and approved the resulting appearance. Later Phyo asked to restore the original raster illustration. Exact source-to-final rice lineage should be checked against retained files if editing again, rather than inferred from the word “recreation.”

Phyo chose the original logo’s vector-plus-colored-raster-rice version over the fully vector fine-line alternative because it preserved the original feel and made the contrast with the revised logo meaningful. He asked to retain the orange tagline. This is the **original** logo; do not swap its hybrid/raster description onto the fully vector revised logo.

Text/country/rice overlap experiments included solid masks versus local transparency. Phyo preferred masks after comparison. Keep lettering above rice, rice above country, with approved text/border/stalk clearances. The original is centered by the orange tagline’s horizontal bounds and fitted vertically to include the rice. Earlier instructions to align both country shapes were superseded when Phyo approved independent revised-logo placement.

Phyo wanted shorter visible southern tails without an awkward hard cut. Assistant proposed fade previews; Phyo selected a higher fade applied only to the long southern tip, leaving the short peninsula opaque. Preserve this distinction.

PR #25 subsequently embedded high-quality WebP rice in the site version. This supersedes references to PNG **for the live original logo**, while Illustrator-compatible personal downloads retain embedded PNG. The revised logo remains fully vector. Phyo approved the high-quality comparison; reported checks preserved rice alpha exactly. Personal exports without the southern fade and a full fine-line alternative were supplied separately; they are not the production choice.

### Car animation, Chromium box, and moon glow

Phyo requested later braking so the final nose dip felt meaningful rather than occurring after an already slow approach. After further preview tuning, he approved the speed. Assistant implemented the curve; preserve departure behavior, parked position and total loop timing.

Assistant implemented a moving body silhouette mask so wheels tuck behind the body. Early variants made wheels disappear entirely; another put the effect on the wrong axle. Phyo identified these failures. Approved behavior: rear wheels tuck during acceleration; front wheels during braking; matching semicircular wheel-well outlines remain. This history prevents treating those failed variants as acceptable baselines.

Phyo reported a rectangular box around the moving car in Chromium that vanished at loop completion. Assistant initially hypothesized a focus outline; wheel-mask compositing remained an alternative until testing. Native Edge automation repeatedly reported a stopped session; those attempts established no reproduction.

Assistant added #car-travel:focus { outline: none; } in a separate preview, retaining the existing :focus-visible drop-shadow. **Phyo manually tested in Edge and said it worked.** This supports the click-focus-outline diagnosis; it is not a full Chromium regression matrix. PR #26 shipped the fix without changing driving JavaScript.

Phyo liked the keyboard-focus glow but requested a steady nighttime moon halo rather than an interaction effect. Assistant first applied a CSS drop-shadow inside the transformed moon group; Phyo reported no visible glow in the standalone car preview. Assistant moved to an explicit outer-group SVG filter. The transformed-group explanation was a proposed diagnosis, not verified browser-engine evidence.

Final approved halo: Sea Glass #9dd7c8, feDropShadow stdDeviation 4 / opacity 1 followed by stdDeviation 1.5 / opacity .4, zero offset; generous filter bounds. Phyo approved the slightly stronger version. It applies in dark mode and is independent of hover/click.

### Header and attribution

Phyo requested removing the top “Let’s Talk” button, retaining the About email contact. The header SVG is unlinked and framed with the approved rounded outline. Typography uses the supplied Wotfard WOFF2 through CSS, not desktop installation. The supplied license was recorded as permitting one website with unlimited pageviews/no renewal; retain the license rather than infer rights beyond that use.

Phyo requested the footer wording: “Based on a Colorlib template, extensively customized by Phyo Thiha | Hosted on Github,” preserving Colorlib’s link and linking Github to github.com. This acknowledges the template origin and extensive customization; no numerical percentage of authorship is established.

After removing the contact button, Phyo noticed desktop socials off-center on the live page. Assistant measured a 1100px viewport: icon-group center approximately 498.94px, header-row center 542.5px. The old col-lg-2/col-lg-7 arrangement explains the roughly 44px left offset. PR #26 added scoped header classes and a desktop-only grid with equal flexible side tracks around the intrinsic-width social group. Mobile below 992px retains the old flow. New layout was source/readback checked; revised visual centering was not subsequently measured in-browser.

### Resource reduction: scope and measurement limits

Phyo approved cleanup after preview review. Initial PR #24 cleanup retained hidden gallery content, jQuery/SlickNav, back-to-top, and custom animation dependencies. Later Phyo explicitly changed scope: remove gallery and all its related resources, but preserve both other-site landing pages; the untouched old repository was his backup.

Historical reported measurements:
- Referenced local CSS/JS: 47 files / 1,041,055 bytes → 19 files / 543,845 bytes; excludes images/fonts/remote requests. Source bytes, **not measured loading times**.
- PR #25: 40 unused candidates removed (5,652,543 bytes), plus 79 gallery images (25,058,381 bytes). Surviving source dependencies were audited before deletion.
- Portrait: 1126×1200 WebP, 155,736 bytes versus 336,178-byte JPEG. Phyo found comparison visually indistinguishable.
- Nationals: Phyo approved the middle crop/quality choice; final WSH/cherry-blossom thumbnail uses 946×2048 WebP, 516,902 bytes, with CSS framing. This later explicit request superseded the early “leave Nationals unchanged” constraint.
- Revised Burma SVG: 190,575 → 61,817 source bytes (68% smaller); gzip estimates 73,522 → 26,683.
- Original Burma SVG/hybrid: 1,623,868 → 634,163 source bytes (61% smaller); embedded rice 1113×1414 with exact alpha preserved; estimated gzip about 1,045.5KB → 397KB.

These are historical artifact measurements, not a current whole-repository size, worst-case visitor transfer total, or field performance benchmark. Phyo approved high-quality WebP despite lossy RGB changes; do not describe it as mathematically lossless.

## Validation and remaining evidence gaps

- PR #25 records desktop 1280×720, phone 390×844, tablet 820×1180 smoke checks of loading, navigation, themes, logo switching, menu, back-to-top, car transforms, turbines, credits, and landing pages. It also records a stale image selector in the Burma toggle, fixed to target inline SVG. These are prior-session observations, not repeated in this reconstruction.
- Some earlier descriptions identify the connected browser as Chromium; the available thread does not establish an independently verified browser/version matrix. Preserve the recorded scope and do not generalize to Safari/Firefox/Edge.
- PR #26 deployment succeeded and live metadata/sitemap were checked. Full desktop/mobile visual equivalence of H1 and revised header alignment remains unverified.
- Car-box resolution and moon appearance have Phyo’s manual approval; automated Edge verification failed.
- Search Console indexing and sitemap Success are Phyo’s reports. Search performance and actual rich-result display remain unverified.
- Original logo asset provenance has the ambiguity noted above; inspect source files before further Illustrator work.
- Earlier PR dates and descriptions can disagree with present tense in handoffs. Fresh merged metadata supersedes old “open PR #24/#25/#26” claims.

## Unresolved work and reconciliation

Issue #4 is authoritative for tasks, but its last retrieved version is stale. It still describes completed SEO setup and the resolved Chromium box as pending. Do not infer those features are unimplemented. No public issue was edited solely to publish this documentation baseline.

Current work still includes reduced-motion behavior review; remaining project spacing/caption/link/layout refinement; optional Burma story on hold; man/husky greetings and keyboard-accessible interaction; My Journey design; disposable shopping-list database learning; and login-protected notes only after authorization/access testing. Character artwork itself is released; interaction is not.

My Journey decisions supported by conversation:
- Hidden footer feature invoked through the illustrated man; slide-up panel, title “My Journey,” circular X close control, map/globe, then three navigation dots.
- Default Yangon (birthplace; moved to US very young, did not grow up there), Washington DC (grew up), Houston (current regional location). Do not convert these into more specific life dates or a Houston-city residency claim.
- Simple line-drawn countries; 3D-looking globe favored, final globe/map choice unresolved. Not draggable; dot-controlled movement.
- Forward A→B and B→C draw only the current curved above-surface flight-path segment, no plane icon. Backward C→B/B→A/C→A shows no path.
- A later correction selected **slow** backward movement, superseding earlier quick-spin wording.
- A→C skipping, timing/easing, panel dimensions, and coordination with man greeting remain unresolved. Do not invent behavior. No implementation/publication authorization follows from this design record.

## Maintenance rule

Update this same record at consequential decisions, corrections, approvals and releases. Preserve who supplied evidence versus who proposed, implemented, or approved. Keep historical uncertainty when later corrected. Link implementation/deployment evidence; label local checks, user reports, and direct observations separately. Reconcile issue #4 before major handoffs. Use dated additions or mark superseded guidance without turning this into a transcript or creating a file for each small discussion.


## 2026-10-24 — repository documentation location

Phyo asked that this decision record enter the next PR, then explicitly requested a PR now to remain open until future website changes can accompany it. Added this record at `docs/PROJECT-RECORD.md` on a documentation branch based on released main. This authorizes publishing the documentation in a PR, not merging or deploying it. Keep this record current on the same branch as subsequent work, and avoid maintaining competing editable copies.

## 2026-10-25 — theme-specific Nationals thumbnail preview

Phyo chose to retain the approved dark-mode City Connect thumbnail and supplied `nats_alt_1_light-tone-v1(1).png` for light mode. The received file is 948×2048 pixels and 3,326,843 bytes. He requested preview approval before WebP preparation and site integration. Assistant prepared a self-contained comparison of the proposed W/Capitol crop and the unchanged dark thumbnail, with matching 441×390 frame ratios and preview-only vertical/zoom controls. Initial light crop is width 110%, left -5%, top -73%; dark retains width 100%, left 0, top -53.85%. These are proposals, not approved production values. No light WebP, site switch logic, or runtime change has been added. Await Phyo’s crop feedback; preserve the uploaded original and the existing dark asset. Saved comparison: `nationals-theme-comparison.html` (Library identity `libfile_99ca773cc1888191903c1f49cc57d8a7`).
