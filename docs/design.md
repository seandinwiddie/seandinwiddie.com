# Sean Dinwiddie's Webmastery: design

The site is set the way a careful print shop sets a book: one typeface, a clear ladder of sizes, a comfortable line and quiet room around everything. This is the house style for every page the copy loop owns: the homepage, the services page and the service pages, `/contact/`, the service areas and the community. The designer (`docs/copy-review.md`, reviewer 5) reviews against it, and every design change follows it.

Sean's pages (`/prices/`, `/tools/`, `/resources/`, Training, the cut-sheet, `/about/`, `/examples/`, the brand-identity article) and the shared header, footer, nav and top bar keep their present settings until he says otherwise. Since design pass 5 Sean lets the designer restyle four shared pieces site-wide, his pages included, by subtle tweaks one step at a time, each approved by the coordinator with a design review between: the call-to-action button (`.hero__cta`, `.button`), the white band between the menu and the page's photograph, the featured service cards at the foot of each page, and the "Privacy choices" button. The loop's pages also take hero photographs from images already in the repo, so one stock photo stops heading most of them. The homepage's hero stays as it is, and `/contact/`'s waits for Sean's word (after design pass 7). His pages' content, measure and titles, and the shared header, nav, top bar and footer, stay as they are.

## What holds still

- **Dank Mono only.** Every one of Sean's personal brand sites is set in Dank Mono and nothing else: the `--font` stack in `assets/site.css`, with its faces in `assets/dank-mono.css`. No second typeface, ever. Its faces are regular and italic. Headings and run-in lead-ins take the bold the browser draws from the regular, as they already do across the site; it holds clean at heading sizes, with open counters. So there are two weights, 400 and 700, and hierarchy comes from size, weight, case, spacing, the cursive italic and position.
- **The colors.** The tokens in `:root` and the panel greys move only by the minute, approved steps `AGENTS.md` sets out, one at a time, and every pair of text and background stays at WCAG 2.1 AA.
- **Sean's pages** and the shared components above.

## The type scale

Two kinds of page share one scale at two body sizes. The panels (the homepage, the hubs and the service pages) make the owner's case at a larger body; the reading pages (contact, the service areas and the community) carry longer reading at a smaller one. Each heading stands a fixed step above its own body.

| Role | Panels, desktop | Reading pages, desktop | Weight | Leading |
|---|---|---|---|---|
| h1, the page's title | clamp(2.25rem, 3.5vw, 3rem) | the same | 700 | 1.25 (1.3 on a phone) |
| A hub's panel title (its h2) | 2.25rem, centered over its one-line lead | not used | 700 | 1.1 |
| h2, a section | 2.25rem (1.68em of the homepage body) | clamp(1.55rem, 2.5vw, 2rem) | 700 | 1.1 to 1.35 |
| h3, a part of a section | 1.6rem (1.2em) | clamp(1.25rem, 2vw, 1.55rem) | 700 | 1.3 |
| Body | 1.333rem | 1.125rem | 400 | 1.6 to 1.8 |
| Small: notes, attributions, captions, related links | 0.9em | 0.9em | 400 | 1.6 |

- **A heading is never set at its paragraph's size or lighter.** An h3 is at least 1.2 times its body and bold; an h2 at least 1.5 times. A subhead at body size turns a section into a wall of monospace text.
- **The title out-ranks every heading below it:** 48px over a 32 to 36px section on a desktop, 35px over 25 to 27px on a phone. The services page sets its title on its photograph at the same size (design pass 5), its leading opened to 1.4 (1.45 on a phone) so its white highlight bars part as the cursive line's do, with "Choose a service" at a hub's panel-title step. Sean's pages keep the shared title (clamp(2rem, 3vw, 2.65rem) at 1.45) until he says otherwise.
- **On a phone** (30rem and below) every page sets its body at 1rem, about 41 characters a line, and every step keeps its rank: an h2 at 1.68 times the body, an h3 at 1.2 times. The panels keep their 1.333rem down to 30rem, so a tablet reads about 66 characters in their 48rem column.
- **Run-in lead-ins,** a bold phrase that opens a paragraph, stay inline at body size. A phrase on a line of its own is a heading and takes its step.
- **Case.** Sentence case for every heading. No all-caps labels; the menu's capitals belong to the shared header.

## The cursive italic and the ligatures

Dank Mono's italic is a true cursive, a handwritten, script-like hand, and its ligatures draw `=>`, `!==`, `->` and `<=` as single glyphs. Both are part of its character, and both are used on purpose.

- **The cursive italic** sets apart a few things that should feel personal: the line over the hero photograph, a client's words quoted on the homepage, a depth passage's label (*Where it bends.*, *The rule behind the examples.*), a signature line. Never running paragraphs, and never a heading's only signal.
- **The ligatures stay on** wherever code or an arrow appears. Code blocks and inline code carry `font-variant-ligatures: common-ligatures contextual`, and nothing sets letter-spacing on code, which would break them apart.

## Measure

Body text runs at about 66 characters a line or fewer. Dank Mono gives every character the same width, about 0.55 of its size, so the column follows from the body size:

- the panels: 48rem at 1.333rem, about 65 characters;
- the reading pages: 41rem at 1.125rem, about 66, and the services page's prices and inquiry text, on the same column as its six choices;
- a note at 0.9em shares its page's column and runs a little over 70, which a short note carries.

A lesson's code and a set of cards (the community's lessons, /local/'s service areas) run wider on a wide screen, at 58.5rem centered under the text, and the code scrolls sideways; on a phone a lesson's code runs to the screen's edges, about 46 characters a line. A phone sets 35 to 45 characters of text and needs no rule.

Centered text is for a title, a short lead or a call to action: the page title, a hub's panel title and its one-line lead, the closing call to action on the homepage and Klamath Falls. A hub's lead that wraps balances its lines, so no word stands alone under the title (design pass 9). A section heading sits on the edge of the text it heads, and a paragraph past a few lines is set left.

## Rhythm

- A heading sits closer to what it introduces than to what came before it: at least twice the space above it as below.
- The homepage's sections sit about 4rem apart, from each heading to the text above. On the longer pages an h2 takes 2.8rem above and 1rem below, and an h3 about 2.2rem above and under 1rem below.
- Paragraphs sit 1.2 to 1.7rem apart. List items keep the paragraph's leading and part by 0.35rem, so a wrapped item stays one item. A hub's bullets and numbers hang from one indent (2.1875rem, 1.75rem on a phone), the bullet at the text's own size, and a service page's process steps hang from the same indent, the number in the text's own weight (design pass 4).
- A set-apart passage or group stands 2rem from the text around it: a lesson's depth passage, the community's lesson cards. A set of cards under its own heading stands 1.25rem under it and 2rem over the text after it: /local/'s service-area cards, on their hairline with no shadow, as the community's cards are (design pass 9). Klamath Falls' and Redding's four services, parts of the page under their h3s, start the same 1.25rem under their heading (design pass 5). Code inside a depth passage keeps to its frame. Code blocks in a row (the code, the line that runs it, what it prints) sit 0.75rem apart, one example.
- **Code and what it prints.** Code a reader writes (a source file, a script that calls it) is the dark block. What a run shows, a program's printed output or a terminal session with the "$" line that runs it, is a printout: the lesson's own ink and paper inside a hairline (`pre.code-output`, design pass 4).
- The rule over the note to webmasters sits 2.5rem under the text above it and 1.5rem over the note, on every page that carries the note.
- Room is the luxury. When a section feels crowded, add space before adding a rule, a box or a color.
- The page's photograph stands 4rem under the menu on a desktop, the homepage's section rhythm, and 2rem on a phone; between the two the white band scales with the screen (7.7vw), where it jumped from 2rem to 4rem at 52rem (design pass 8). It was 6.25rem until design pass 6 and 5rem until design pass 7, and it holds at 4rem.

## How sections are set apart

In order of preference:

1. **Space and a heading.** Most sections need nothing more.
2. **A hairline rule** (1px) where the reader changes: the note to webmasters, the related links that close a service page. On the page's white it is `--line`; on the grey panels it is the muted grey at 30% (rgb(80 84 91 / 30%)), the hubs' tone (design pass 4's color step).
3. **A tinted panel** (on the page the title band's own grey, #e9edf1, since design pass 9's color step, where the loop's #e9ecef met the band in a faint seam; white within the homepage's grey) for a page's body, or for promises read together. The panels carry the homepage's, the hubs' and the service pages' bodies; the reading pages (contact since design pass 5, the service areas, the community) sit on the page's white. A panel under the title band continues it: no border or rounded corner where the two meet. Cards on one page share one padding (1.5rem, 1.25rem on a phone).
4. **A card** only for parallel choices that each lead somewhere (the services, the service areas), and **a rule down the left** only for a quotation. The five featured services at each page's foot stand three over two on a desktop, the two centered under the three, their titles in the house weight at one size, 2rem, on every page (design pass 6). On a tablet (30 to 52rem) they stand two by two, the fifth centered under the four, their titles scaling down to 1.5rem in the narrowest cards (design pass 7); on a phone they stack. Since design pass 8 they rest on a shadow half as deep, with no lift, and since design pass 9 hover darkens their hairline to the muted grey, as the community's cards do, where it deepened the shadow. Keyboard focus rings the whole card, as the community's cards do, where the card's edge cut the link's ring down to a strip along its foot (design pass 9). They change by approved steps. A service area's own services lead nowhere, so they are parts of the page, each under its h3, as the homepage's "What we do" is (design pass 5). A lesson's depth passage is a notice, set apart by its frame, its room and its cursive label, with no rule down the left (design pass 4).

## Choices and buttons

A set of choices that each lead to a page, a hub's two services or the services page's six, is a row of flat pills in the plain blue (#0073e6, #0066cc on hover), 1.125rem and regular (1rem on a phone), with no shadow and no lift, on the column of the text around it. Klamath Falls' closing call to action carries the same pill, on the panel's grey (design pass 5's color step). A hub's pair keeps its natural widths on the text's edge and stacks to the column's width on a phone; the services page's six take one width, three across, two on a phone. The shared call to action (`.hero__cta`, `.button`) settles into the plain blue by approved steps (Direction): design pass 6 moved its gradient's ends halfway to #0073e6, design pass 7 took away its glow and its lift, and since design pass 8 it is the pills' flat #0073e6 (white 4.57:1), turning their #0066cc on hover (white 5.57:1): every blue button on the site is one blue at rest and one on hover.

The call to action's label is 1rem and bold (0.83rem until design pass 8, 0.9rem until design pass 9): the body's own size on a phone, where it read a size under the text and the pills around it, and a step toward the pills' 1.125rem on a desktop; its white holds AA at that size (4.57:1).

The "Privacy choices" button sits in the viewport's bottom-right corner, a small tab with its rounded corner on the inside, on a screen 85rem wide or wider, where it clears the 71.25rem column (design pass 6); narrower, it closes the page after the footer, a full-width bar as on a phone (design pass 7). Keyboard focus rings it inside its own edges, so the ring is whole at the viewport's edge and the page's end, and on hover its label underlines (design pass 8). It moves further off the content by approved steps.

Structure carries information: numbers only where the order matters (process steps are an ordered list), a rule only where the reader changes, a card only for a choice.

## One memorable element

Each page has one thing the eye goes to first: the photograph and the title at the top. Everything after it stays quiet. The loop's pages take their photographs from images already in the repo, chosen for what each page says, one page group a pass, so one stock photograph stops heading most of them: the service areas show a page layout drawn to scale (/local/), people meeting around a café table (Klamath Falls) and someone typing at a laptop by a window (Redding) (design pass 6); the service pages the stock photograph still headed show a wall of notes mapping the work at night (Automation), hands browsing a site on a tablet (Website development), reading glasses before a screen of code (On-site SEO) and five hands on one table (Off-site SEO and ads) (design pass 7). Sean's pages keep theirs. A second hero, a deep shadow that floats a button, a lift on hover or a band of color behind a paragraph each compete with it, and each has to earn its place.

## Lesson posts

The community's lesson pages are held to an AAA standard: polish of the kind a premium studio ships, and contrast at WCAG 2.1 AAA for body text (7:1) wherever the palette allows (Sean, after design pass 5). The post template (title band, lesson banner, prose column, code and output blocks, figures, depth passages, the lesson's place and its previous and next links, the cards) is designed as one reading experience and refined over several rounds, each a copy round and a design round with a review between.

The template as post design rounds 1 to 3 set it, every rule on the reading pages' community hook in `assets/site.css`, so Sean's cut-sheet keeps its own settings:

- **The banner** leads with the lesson's place, "Lesson 2 of 4 in Module 5", in the page's ink, with one tick for each lesson in the module: the lessons so far in ink, the rest in the panels' rule tone. The ticks repeat the words for the eye and say nothing of their own. The course's preface follows at 0.875em in the muted grey, and a hairline closes the banner; the lesson starts under it. The sync renders the banner, the ticks from the lesson's number and the module's count.
- **The byline** is one line under the banner: the avatar and the author, then the date and the category, in the muted grey, underlined on hover.
- **The lede.** A lesson's first paragraph steps up to 1.2em (1.125em on a phone) at 1.65 leading. With the banner's ticks, it is the lesson's one memorable element.
- **Prose** reads at 1.75 leading, paragraphs 1.4rem apart, a lesson's sections (its h2s) 3.25rem apart (2.75rem on a phone, in proportion to its smaller text). List markers take the muted grey. Inline code is a chip at 0.9em that keeps its padding where it breaks across a line.
- **Section links.** Each h2 in a lesson links to itself, so a long lesson can be linked to by section; the sync gives it an id from its words. The heading keeps its ink and its look; a "#" in the muted grey hangs in the left margin on hover, on keyboard focus and when the section is the page's target, and a section a link lands on clears the sticky menu (post design round 2).
- **On this page.** A lesson of four sections or more lists them after its opening, just before its first section: "On this page" in the page's ink over the sections' titles in the muted grey at 0.875em (7.6:1), each a link to its section, underlined on hover, a wrapped title hanging under its first line, in two columns on a desktop when there are eight or more. It is a `<nav aria-label="On this page">` with no heading of its own, so the outline holds, and the sync renders it from the section links. A module's opener has none: its list of lessons follows its lede (post design round 3).
- **Code** takes its own size, 0.875em at 1.6 leading, in Dank Mono with its ligatures on. It runs 58.5rem wide on a desktop and to the screen's edges on a phone. A soft shadow at an edge says more code runs past it. Each code block, never a printout, carries a Copy button in a band across its top (`assets/site.js`); the band is set before the script runs, so nothing moves. A file's name is the code's first line, a comment (`// features/checkout/checkoutSelectors.ts`), as the TypeScript lessons write it; the template adds no label of its own.
- **The depth passage** keeps its frame and its room. On a screen 75rem wide or wider its cursive label hangs in the left margin beside its first line, in the muted grey, like a master's note in the margin; narrower, the label stays a run-in. Its paper is a few points warmer than a notice's, #f7f6f2 where a notice is #f5f7f9 (post design round 1's color step). It reads best in short paragraphs.
- **Moving on.** The previous and next lessons are a pair of framed links, each its label ("Previous lesson:") in the muted grey over its title in bold violet, the next on the right, one column on a phone. The lesson closes on a quiet line under a hairline, in the muted grey at 0.9em, set as the note to webmasters is: how to have work built this way (the team's terms and the offer close on their questions line the same way; post design round 2). A module's lesson list is its table of contents: it follows the opener's lede, a section's room above it (since post design round 2; it sat between the byline and the lede), the numbers hang in the margin, each title on its own hairline.
- **The front door.** The hub's first page (and the author and category archives', which repeat it) maps the course after its opening, set as a module's lesson list: the six parts in order, each on its hairline, its place and count in the muted grey ("Start here · 6 lessons", "Module 2 · 11 lessons") beside its name in bold violet on a desktop and over it narrower, linked to its first lesson. The sync renders it from the course's parts (post design round 3).
- **The hub's cards** read as a curriculum: on each archive page every part of the course takes its name as an h2 over its cards (the off-path pages follow under "Also in the community"), the cards' titles are h3s, and each card names its place over its title in the muted grey at 0.875rem (7.6:1), "Start here" on the Introduction and "Lesson 3" on the rest (post design round 3). They stand on a hairline with no shadow; on hover the hairline darkens to the muted grey, with no lift, and keyboard focus rings the whole card (post design round 2).
- **The hub's pages** each start where a part of the course starts, never mid-module: the overview with Module 1, then Module 2, Modules 3 and 4, and Module 5 with the pages off the path, still four pages. The earlier pages' links sit on the left and the later pages' on the right (post design round 3). The previous and next links name the part their page opens with ("Next page: Module 2"), and a first or last page link that repeats one of them is left out (copy round 4). A lesson of a dozen steps groups them under a few stages, each step an h3 that keeps its id and clears the sticky menu when a link lands on it (copy round 4).
- **Contrast.** Body text #171717 on white is 17.9:1, the muted grey 7.6:1 on white, 7.1:1 on a notice's #f5f7f9 and 7.0:1 on a diagram's plate, the link violet 8.2:1, code #f7f7f7 on #202631 14.2:1: every text in a lesson meets AAA. Code in a diagram's caption takes the page's ink, 15.8:1 on its chip, where the caption's grey read 6.7:1 (post design round 2).

## Diagrams

Lessons carry diagrams wherever a picture shows the mechanism faster than prose: a data flow, a cube of traits, a request's path from view to API, a test's place in the chain (Sean, after design pass 5). Each is an inline SVG in a `<figure>` with a `<figcaption>`, drawn in the page's own ink, muted grey and link violet, its labels in Dank Mono, scaled to the column (`width: 100%; height: auto`) and legible at 390 px. The figure stands on a plate of the depth passage's note paper, #f7f6f2, its boxes on the page's white, so a diagram reads as a figure beside the white printouts it often follows (post design round 2's color step). Its caption sits under the frame at the house measure, 66 characters, from the frame's left edge, where it ran the frame's width at about 76; on a phone, where the frame runs to the screen's edges, the caption keeps the text's edge (post design round 3). The rule grey frames the figure; a line that carries meaning takes the muted grey, since a graphic needs 3:1 (WCAG 1.4.11). Lines keep their weight in pixels at every width, whatever the drawing's scale: a hairline for an edge and a box, 3px for the path, 2.5px for a box on it, so the violet reads by weight on a 320px phone and a desktop's lines stay crisp; edges take round caps, so an arrowhead's two strokes meet in a clean point (post design round 2). The SVG carries `role="img"` and an `aria-labelledby` pointing at its `<title>` and `<desc>`, so a screen reader hears what it shows; nothing in it is only color. One idea per diagram, no decoration, and the prose around it still says what it shows.

### Writing a diagram

- **The grid.** Draw on a `viewBox` 360 units wide, any height. The page frames the figure across the column in the printouts' hairline and draws it no wider than 30rem, so a 14-unit label reads near the body's size on a desktop; on a phone the frame runs to the screen's edges, as code does, and the label reads at about 14px. Nothing is smaller than 13 units.
- **The parts are classes**, and the page gives them their colors: `text` is a label in ink, centered on its point; `.note` is a quieter label in the muted grey; `.edge` is a line in the muted grey; `.path` is the line the diagram is about, in violet and 3px thick; `.node` is a box on the page's paper with a hairline muted outline, and `.node on` outlines it in violet at 2.5px. An arrowhead is two strokes 6 units long at 30 degrees to its line, in the line's own group, meeting at the tip. Write no colors, fonts, `style` attributes or `<style>` blocks in the SVG.
- **Nothing only in color.** What the violet marks is also thicker, and the caption names it.
- **Even margins.** Keep 8 to 16 units between the drawing and the viewBox's edges, the same above as below and left as right, so every figure's frame reads even; trim the viewBox rather than leave a band of empty paper.
- **Ids** are unique on the page: prefix them with the diagram's name (`cube-title`, `cube-desc`). The build checks that every inline SVG has `role="img"` and an `aria-labelledby` pointing at its own `<title>`, and the page-title check counts only the page's own `<title>`, outside any SVG.
- **Its place.** The figure follows the paragraph that introduces it, and its caption says in a sentence or two what to see. The `<desc>` says what the diagram shows for a reader who can't see it.

```html
<figure class="diagram">
<svg role="img" aria-labelledby="cube-title cube-desc" viewBox="0 0 360 352">
<title id="cube-title">The four-trait cube</title>
<desc id="cube-desc">Sixteen corners in rows of 1, 4, 6, 4 and 1, from 0000 to 1111; lines join corners one trait apart, and a highlighted path runs from 0000 to 1111 in four steps.</desc>
<text class="note" x="180" y="18">plain · brief · warm · cautious</text>
<g class="edge"><line x1="180" y1="63" x2="144" y2="105"/><!-- … --></g>
<g class="path"><line x1="180" y1="63" x2="72" y2="105"/><!-- … --></g>
<rect class="node on" x="157" y="41" width="46" height="22" rx="4"/>
<rect class="node" x="121" y="105" width="46" height="22" rx="4"/>
<g><text x="180" y="52">0000</text><text x="144" y="116">0010</text><!-- … --></g>
</svg>
<figcaption>The cube, drawn by how many traits sit at their second pole. A line joins two corners one trait apart, and the violet path walks from 0000 to its opposite, 1111, one trait at a time.</figcaption>
</figure>
```

Lines and boxes come before the labels, so a label sits on top. A line stops at the edge of the boxes it joins.

## Tells to avoid

- a subhead at body size or lighter;
- all-caps or tracked-out labels over headings, or a label over every heading;
- "→" on links and buttons;
- gradients and glows as decoration;
- numbered markers (01, 02, 03) on content that isn't a sequence;
- one word of a headline set apart in color, italic or weight;
- identical rounded cards for content that isn't a set of choices;
- centered paragraphs past a few lines;
- deep drop shadows under buttons and cards.

## Direction

Each design pass takes at most one small step, and the steps lead here:

- **The title's display step, in Dank Mono.** The page title takes a little more size and tighter leading, so it out-ranks everything below it. The loop's pages carry it (design pass 2); its shared style reaches Sean's pages with his OK.
- **Quieter color.** The link violet settles a few points deeper and less electric (its first step, #5c00ff to #5909e1, sits inside the loop's pages' main text since design pass 2), and the call-to-action button's gradient and glow settled into its plain blue by one approved step a pass, with Sean's OK for his pages (design passes 6 to 8).
- **One rhythm for the service areas.** Klamath Falls and Redding are set alike. Klamath Falls' headings, lead and cards sit on the text's edge, as Redding's do (design pass 2), its cards share one padding and "Not sure what you need yet" takes the page's section step, as on contact (design pass 3); its four services are white cards on a hairline, as Redding's are (design pass 3's color step); its body sits on the page rather than a grey panel, its promises are sections of the page rather than cards, and its four services stand two by two, all as on Redding (design pass 4); both towns' four services are parts of the page rather than cards, since they lead nowhere (design pass 5); and its call-to-action card is the site's own tinted panel (#e9ecef) in the page's ink, with the plain blue pill, where it was a saturated green card (design pass 5's color step).
- **Rules that read on the grey panels.** The hairline over the note to webmasters and the related links on the service pages, and over the note on the homepage, is `--line` (#e0e3e7) on the panels' grey (#e9ecef, #e9edf1 on the homepage), 1.04:1, so it all but vanishes, where the hubs and the services page draw the same rule in the muted grey at 30%. On the page's white (Redding, /local/, Klamath Falls since design pass 4, contact since design pass 5, the community) `--line` reads, at 1.3:1. Design pass 4's color step gives the panels' rules the hubs' tone (1.57:1), so every rule on a grey surface is drawn alike.

## Checking a page

`.claude/skills/design-review/scripts/shot.mjs` prints each element's size, weight and leading: read the ratios against the scale above, and count the measure as the column's width over 0.55 of the body size. The build checks the heading order, and the designer checks contrast at AA, tap targets and reflow at 320px.
