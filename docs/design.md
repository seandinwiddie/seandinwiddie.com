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
| h1, the page's title | clamp(2.25rem, 3.5vw, 3rem) | the same | 700 | 1.25 (1.3 on a phone) |
| A hub's panel title (its h2) | 2.25rem, centered over its one-line lead | not used | 700 | 1.1 |
| h2, a section | 2.25rem (1.68em of the homepage body) | clamp(1.55rem, 2.5vw, 2rem) | 700 | 1.1 to 1.35 |
| h3, a part of a section | 1.6rem (1.2em) | clamp(1.25rem, 2vw, 1.55rem) | 700 | 1.3 |
| Body | 1.333rem | 1.125rem | 400 | 1.6 to 1.8 |
| Small: notes, attributions, captions, related links | 0.9em | 0.9em | 400 | 1.6 |

- **A heading is never set at its paragraph's size or lighter.** An h3 is at least 1.2 times its body and bold; an h2 at least 1.5 times. A subhead at body size turns a section into a wall of monospace text.
- **The title out-ranks every heading below it:** 48px over a 32 to 36px section on a desktop, 35px over 25 to 27px on a phone. Sean's pages keep the shared title (clamp(2rem, 3vw, 2.65rem) at 1.45) until he says otherwise.
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

A lesson's code and a set of cards (the community's lessons, the service areas) run wider on a wide screen, at 58.5rem centered under the text, and the code scrolls sideways. A phone sets 35 to 45 characters and needs no rule.

Centered text is for a title, a short lead or a call to action: the page title, a hub's panel title and its one-line lead, the closing call to action on the homepage and Klamath Falls. A section heading sits on the edge of the text it heads, and a paragraph past a few lines is set left.

## Rhythm

- A heading sits closer to what it introduces than to what came before it: at least twice the space above it as below.
- The homepage's sections sit about 4rem apart, from each heading to the text above. On the longer pages an h2 takes 2.8rem above and 1rem below, and an h3 about 2.2rem above and under 1rem below.
- Paragraphs sit 1.2 to 1.7rem apart. List items keep the paragraph's leading and part by 0.35rem, so a wrapped item stays one item. A hub's bullets and numbers hang from one indent (2.1875rem, 1.75rem on a phone), the bullet at the text's own size, and a service page's process steps hang from the same indent, the number in the text's own weight (design pass 4).
- A set-apart passage or group stands 2rem from the text around it: a lesson's depth passage, the community's lesson cards. A set of cards under its own heading stands 1.25rem under it and 2rem over the text after it: the service areas' cards. Code inside a depth passage keeps to its frame. Code blocks in a row (the code, the line that runs it, what it prints) sit 0.75rem apart, one example.
- **Code and what it prints.** Code a reader writes (a source file, a script that calls it) is the dark block. What a run shows, a program's printed output or a terminal session with the "$" line that runs it, is a printout: the lesson's own ink and paper inside a hairline (`pre.code-output`, design pass 4).
- The rule over the note to webmasters sits 2.5rem under the text above it and 1.5rem over the note, on every page that carries the note.
- Room is the luxury. When a section feels crowded, add space before adding a rule, a box or a color.

## How sections are set apart

In order of preference:

1. **Space and a heading.** Most sections need nothing more.
2. **A hairline rule** (1px) where the reader changes: the note to webmasters, the related links that close a service page. On the page's white it is `--line`; on the grey panels it is the muted grey at 30% (rgb(80 84 91 / 30%)), the hubs' tone (design pass 4's color step).
3. **A tinted panel** (#e9ecef on the page, white within the homepage's grey) for a page's body, or for promises read together. A panel under the title band continues it: no border or rounded corner where the two meet. Cards on one page share one padding (1.5rem, 1.25rem on a phone).
4. **A card** only for parallel choices that each lead somewhere (the services, the service areas), and **a rule down the left** only for a quotation. A lesson's depth passage is a notice, set apart by its frame, its room and its cursive label, with no rule down the left (design pass 4).

## Choices and buttons

A set of choices that each lead to a page, a hub's two services or the services page's six, is a row of flat pills in the plain blue (#0073e6, #0066cc on hover), 1.125rem and regular (1rem on a phone), with no shadow and no lift, on the column of the text around it. A hub's pair keeps its natural widths on the text's edge and stacks to the column's width on a phone; the services page's six take one width, three across, two on a phone. The shared call to action (`.hero__cta`, `.button`) keeps its gradient and glow until its step under Direction is approved.

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

- **The title's display step, in Dank Mono.** The page title takes a little more size and tighter leading, so it out-ranks everything below it. The loop's pages carry it (design pass 2); its shared style reaches Sean's pages with his OK.
- **Quieter color.** The link violet settles a few points deeper and less electric (its first step, #5c00ff to #5909e1, sits inside the loop's pages' main text since design pass 2), and the call-to-action button's gradient and glow settle into its plain blue: one approved step per pass, reaching Sean's pages only with his OK.
- **One rhythm for the service areas.** Klamath Falls and Redding are set alike. Klamath Falls' headings, lead and cards sit on the text's edge, as Redding's do (design pass 2), its cards share one padding and "Not sure what you need yet" takes the page's section step, as on contact (design pass 3); its four services are white cards on a hairline, as Redding's are (design pass 3's color step); its body sits on the page rather than a grey panel, its promises are sections of the page rather than cards, and its four services stand two by two, all as on Redding (design pass 4); and its green call-to-action card is a color decision, held for approval.
- **Rules that read on the grey panels.** The hairline over the note to webmasters and the related links on the service pages, and over the note on the homepage, is `--line` (#e0e3e7) on the panels' grey (#e9ecef, #e9edf1 on the homepage), 1.04:1, so it all but vanishes, where the hubs and the services page draw the same rule in the muted grey at 30%. On the page's white (Redding, /local/, Klamath Falls since design pass 4, the community) `--line` reads, at 1.3:1. Design pass 4's color step gives the panels' rules the hubs' tone (1.57:1), so every rule on a grey surface is drawn alike.

## Checking a page

`.claude/skills/design-review/scripts/shot.mjs` prints each element's size, weight and leading: read the ratios against the scale above, and count the measure as the column's width over 0.55 of the body size. The build checks the heading order, and the designer checks contrast at AA, tap targets and reflow at 320px.
