// Talk decks (docs/design.md, Talk decks). The page reads as a scrolling page by
// default. Present shows one slide per screen, full screen where the browser allows:
// the arrow keys, Page Up and Page Down, space and Shift+space move, Home and End go
// to the ends, N shows the speaker notes and Escape leaves. Loaded only on a deck.
(() => {
  "use strict";

  const deck = document.querySelector(".deck");
  if (!deck) return;
  const root = document.documentElement;
  const slides = [...deck.querySelectorAll(".slide")];
  const bar = deck.querySelector(".deck__bar");
  const presentButton = deck.querySelector('[data-deck="present"]');
  const notesButtons = [deck.querySelector('[data-deck="notes"]')];
  let current = 0;
  let presenting = false;
  let pointerTimer = 0;

  slides.forEach((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
    slide.tabIndex = -1;
  });

  // The controls on screen while presenting: they fade when the pointer rests, the
  // counter stays.
  const controls = document.createElement("div");
  controls.className = "deck__controls";
  controls.innerHTML =
    '<button type="button" data-go="-1">Previous</button>' +
    '<button type="button" data-go="1">Next</button>' +
    '<button type="button" data-deck="notes" aria-pressed="false">Notes</button>' +
    '<button type="button" data-deck="exit">Exit</button>' +
    '<p class="deck__count"></p>';
  deck.append(controls);
  notesButtons.push(controls.querySelector('[data-deck="notes"]'));
  const [previousButton, nextButton] = controls.querySelectorAll("[data-go]");
  const count = controls.querySelector(".deck__count");

  const anchorOf = (slide) => slide.querySelector("h2[id]") || slide;

  const show = (index) => {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, at) => slide.classList.toggle("is-current", at === current));
    count.textContent = `${current + 1} / ${slides.length}`;
    previousButton.disabled = current === 0;
    nextButton.disabled = current === slides.length - 1;
    const anchor = anchorOf(slides[current]);
    if (anchor.id) history.replaceState(null, "", `#${anchor.id}`);
    slides[current].focus({ preventScroll: true });
  };

  const fromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id && document.getElementById(id);
    const index = target ? slides.findIndex((slide) => slide.contains(target)) : -1;
    return index === -1 ? 0 : index;
  };

  const setNotes = (on) => {
    root.classList.toggle("deck-notes", on);
    for (const button of notesButtons) button?.setAttribute("aria-pressed", String(on));
  };

  const enter = () => {
    presenting = true;
    root.classList.add("deck-presenting");
    show(fromHash());
    root.requestFullscreen?.().catch(() => {});
  };

  const exit = () => {
    if (!presenting) return;
    presenting = false;
    root.classList.remove("deck-presenting", "deck-pointer");
    slides.forEach((slide) => slide.classList.remove("is-current"));
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    const slide = slides[current];
    slide.scrollIntoView({ block: "start", behavior: "instant" });
    slide.focus({ preventScroll: true });
  };

  deck.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("button") : null;
    if (!button) return;
    if (button.dataset.go) show(current + Number(button.dataset.go));
    else if (button.dataset.deck === "present") enter();
    else if (button.dataset.deck === "notes") setNotes(!root.classList.contains("deck-notes"));
    else if (button.dataset.deck === "exit") exit();
  });

  // The browser takes the first Escape to leave full screen; leaving it leaves the deck.
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) exit();
  });

  document.addEventListener("keydown", (event) => {
    if (!presenting || event.altKey || event.ctrlKey || event.metaKey) return;
    const onControl = event.target instanceof Element && event.target.closest("button, input, select, textarea");
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
        show(current + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        show(current - 1);
        break;
      case " ":
        if (onControl) return;
        show(current + (event.shiftKey ? -1 : 1));
        break;
      case "Home":
        show(0);
        break;
      case "End":
        show(slides.length - 1);
        break;
      case "Escape":
        exit();
        break;
      case "n":
      case "N":
        setNotes(!root.classList.contains("deck-notes"));
        break;
      default:
        return;
    }
    event.preventDefault();
  });

  document.addEventListener("pointermove", () => {
    if (!presenting) return;
    root.classList.add("deck-pointer");
    clearTimeout(pointerTimer);
    pointerTimer = setTimeout(() => root.classList.remove("deck-pointer"), 2500);
  });

  if (presentButton && bar) bar.hidden = false;
})();
