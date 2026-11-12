// Slide-deck viewer (see src/components/DeckViewer.astro).
//
// The slides are a horizontal scroll-snap strip, one slide wide, so swiping
// works with CSS alone. This adds:
//   - previous/next buttons, the "5 / 14" counter and the progress bar
//   - ← / → arrow keys while the deck is on screen
//   - deep links: /writing/<slug>/#7 opens slide 7, and the hash follows
//     the current slide (replaceState, so Back isn't filled with entries)
//   - full screen, where the browser supports it
//   - loading the next slide's image early

export function initDeck(root) {
  const track = root.querySelector("[data-deck-track]");
  const slides = [...track.children];
  const total = slides.length;
  const controls = root.querySelector("[data-deck-controls]");
  const counter = root.querySelector("[data-deck-current]");
  const progress = root.querySelector("[data-deck-progress]");
  const prev = root.querySelector("[data-deck-prev]");
  const next = root.querySelector("[data-deck-next]");
  const fullscreen = root.querySelector("[data-deck-fullscreen]");
  if (!track || total === 0) return;

  controls.hidden = false;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let current = -1;

  // ---- moving between slides ----

  function goTo(index, { smooth = true } = {}) {
    const i = Math.max(0, Math.min(total - 1, index));
    track.scrollTo({
      left: i * track.clientWidth,
      behavior: smooth && !reduceMotion.matches ? "smooth" : "instant",
    });
  }

  function show(index) {
    if (index === current) return;
    current = index;

    counter.textContent = String(index + 1);
    progress.style.setProperty("--progress", String((index + 1) / total));
    prev.disabled = index === 0;
    next.disabled = index === total - 1;

    // Keep the URL in step without adding history entries
    const hash = index === 0 ? "" : `#${index + 1}`;
    if (location.hash !== hash) {
      history.replaceState(history.state, "", `${location.pathname}${location.search}${hash}`);
    }

    // Start loading the next slide before it's needed
    const nextImage = slides[index + 1]?.querySelector("img");
    if (nextImage) nextImage.loading = "eager";
  }

  let frame;
  track.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => show(Math.round(track.scrollLeft / track.clientWidth)));
    },
    { passive: true }
  );

  prev.addEventListener("click", () => goTo(current - 1));
  next.addEventListener("click", () => goTo(current + 1));

  // ---- keyboard: ← / → while the deck is on screen ----

  const isTyping = (el) =>
    el instanceof Element && el.closest("input, textarea, select, [contenteditable='true']");
  const isOnScreen = () => {
    const box = root.getBoundingClientRect();
    return box.bottom > 0 && box.top < innerHeight;
  };

  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    if (isTyping(event.target) || !isOnScreen()) return;
    if (event.key === "ArrowRight") goTo(current + 1);
    else if (event.key === "ArrowLeft") goTo(current - 1);
    else return;
    event.preventDefault();
  });

  // ---- deep links: #7 ----

  const slideFromHash = () => {
    const match = location.hash.match(/^#(\d+)$/);
    return match ? Number(match[1]) - 1 : 0;
  };
  window.addEventListener("hashchange", () => goTo(slideFromHash(), { smooth: false }));

  // ---- full screen ----

  if (fullscreen && root.requestFullscreen) {
    fullscreen.hidden = false;
    fullscreen.addEventListener("click", () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else root.requestFullscreen();
    });
    document.addEventListener("fullscreenchange", () => {
      const on = document.fullscreenElement === root;
      fullscreen.setAttribute("aria-label", on ? "Exit full screen" : "View full screen");
    });
  }

  // The strip changes width when entering/leaving full screen or resizing:
  // stay on the same slide.
  new ResizeObserver(() => goTo(current, { smooth: false })).observe(track);

  // ---- start ----

  const start = slideFromHash();
  show(Math.max(0, Math.min(total - 1, start)));
  goTo(start, { smooth: false });
}
