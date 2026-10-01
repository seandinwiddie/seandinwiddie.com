# Sean Dinwiddie's Webmastery: design

The site is set the way a careful print shop sets a book: one typeface, a clear ladder of sizes, a comfortable line and quiet room around everything. This is the house style for every page the copy loop owns: the homepage, the services page and the service pages, `/contact/`, the service areas and the community. The designer (`docs/copy-review.md`, reviewer 5) reviews against it, and every design change follows it.

Sean's pages (`/prices/`, `/tools/`, `/resources/`, Training, the cut-sheet, `/about/`, `/examples/`, the brand-identity article) and the shared header, footer, nav and top bar keep their present settings until he says otherwise.

## What holds still

- **Dank Mono only.** Every one of Sean's personal brand sites is set in Dank Mono and nothing else: the `--font` stack in `assets/site.css`, with its faces in `assets/dank-mono.css`. No second typeface, ever. Its faces are regular and italic. Headings and run-in lead-ins take the bold the browser draws from the regular, as they already do across the site; it holds clean at heading sizes, with open counters. So there are two weights, 400 and 700, and hierarchy comes from size, weight, case, spacing, the cursive italic and position.
- **The colors.** The tokens in `:root` and the panel greys move only by the minute, approved steps `AGENTS.md` sets out, one at a time, and every pair of text and background stays at WCAG 2.1 AA.
- **Sean's pages** and the shared components above.

## The type scale

Two kinds of page share one scale at two body sizes. The panels (the homepage, the hubs and the service pages) make the owner's case at a larger body; the reading pages (contact, the service areas and the community) carry longer reading at a smaller one. Each heading stands a fixed step above its own body.

| Role | Panels, desktop | Reading pages, desktop | Weight | Leading |
|---|---|---|---|---|
| h1, the page's title | clamp(2rem, 3vw, 2.65rem) | the same | 700 | 1.45 |
| A hub's panel title (its h2) | 2.8125rem | not used | 700 | 1.1 |
| h2, a section | 2.25rem (1.68em of the homepage body) | clamp(1.55rem, 2.5vw, 2rem) | 700 | 1.1 to 1.35 |
| h3, a part of a section | 1.6rem (1.2em) | clamp(1.25rem, 2vw, 1.55rem) | 700 | 1.3 |
| Body | 1.333rem | 1.125rem | 400 | 1.6 to 1.8 |
| Small: notes, attributions, captions, related links | 0.9em | 0.9em | 400 | 1.6 |

- **A heading is never set at its paragraph's size or lighter.** An h3 is at least 1.2 times its body and bold; an h2 at least 1.5 times. A subhead at body size turns a section into a wall of monospace text.
- **On a phone** the homepage and the reading pages set the body at 1rem and the hubs and service pages keep their 1.333rem, and every step keeps its rank: an h2 at least 1.5 times the body, an h3 at least 1.2 times.
- **Run-in lead-ins,** a bold phrase that opens a paragraph, stay inline at body size. A phrase on a line of its own is a heading and takes its step.
- **Case.** Sentence case for every heading. No all-caps labels; the menu's capitals belong to the shared header.

## The cursive italic and the ligatures

Dank Mono's italic is a true cursive, a handwritten, script-like hand, and its ligatures draw `=>`, `!==`, `->` and `<=` as single glyphs. Both are part of its character, and both are used on purpose.

- **The cursive italic** sets apart a few things that should feel personal: the line over the hero photograph, a client's words quoted on the homepage, a depth passage's label (*Where it bends.*, *The rule behind the examples.*), a signature line. Never running paragraphs, and never a heading's only signal.
- **The ligatures stay on** wherever code or an arrow appears. Code blocks and inline code carry `font-variant-ligatures: common-ligatures contextual`, and nothing sets letter-spacing on code, which would break them apart.

## Measure

Body text runs at about 66 characters a line or fewer. Dank Mono gives every character the same width, about 0.55 of its size, so the column follows from the body size:

- the panels: 48rem at 1.333rem, about 65 characters;
- the reading pages: 41rem at 1.125rem, about 66;
- a note at 0.9em shares its page's column and runs a little over 70, which a short note carries.

A lesson's code and a set of cards (the community's lessons, the service areas) run wider on a wide screen, at 58.5rem centered under the text, and the code scrolls sideways. A phone sets 35 to 45 characters and needs no rule.

Centered text is for a title, a short lead or a call to action. A paragraph past a few lines is set left.

## Rhythm

- A heading sits closer to what it introduces than to what came before it: at least twice the space above it as below.
- The homepage's sections sit about 4rem apart, from each heading to the text above. On the longer pages an h2 takes 2.8rem above and 1rem below, and an h3 about 2.2rem above and under 1rem below.
- Paragraphs sit 1.2 to 1.7rem apart, and list items keep the paragraph's leading.
- Room is the luxury. When a section feels crowded, add space before adding a rule, a box or a color.

## How sections are set apart

In order of preference:

1. **Space and a heading.** Most sections need nothing more.
2. **A hairline rule** (1px, `--line`) where the reader changes: the note to webmasters, the related links that close a service page.
3. **A tinted panel** (#e9ecef on the page, white within the homepage's grey) for a page's body, or for promises read together.
4. **A card** only for parallel choices that each lead somewhere (the services, the service areas), and **a rule down the left** only for a quotation.

Structure carries information: numbers only where the order matters (process steps are an ordered list), a rule only where the reader changes, a card only for a choice.

## One memorable element

Each page has one thing the eye goes to first: the photograph and the title at the top. Everything after it stays quiet. A second hero, a deep shadow that floats a button, a lift on hover or a band of color behind a paragraph each compete with it, and each has to earn its place.

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

- **The title's display step, in Dank Mono.** The page title takes a little more size and tighter leading, so it out-ranks everything below it. Its shared style sits on Sean's pages too, so it moves with his OK.
- **Quieter color.** The link violet settles a few points deeper and less electric, and the call-to-action button's gradient and glow settle into its plain blue: one approved step per pass, reaching Sean's pages only with his OK.
- **One rhythm for the service areas.** Klamath Falls and Redding are set alike.

## Checking a page

`.claude/skills/design-review/scripts/shot.mjs` prints each element's size, weight and leading: read the ratios against the scale above, and count the measure as the column's width over 0.55 of the body size. The build checks the heading order, and the designer checks contrast at AA, tap targets and reflow at 320px.
