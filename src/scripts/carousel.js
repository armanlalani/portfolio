// Carousel: a horizontal list of cards. Swiping and sideways scrolling work
// with CSS alone (scroll-snap); this adds the previous/next buttons and
// disables them at either end. Reusable: any [data-carousel] list whose
// section has [data-carousel-prev] and [data-carousel-next] buttons.

export function initCarousel(track) {
  const section = track.closest("section");
  const prev = section?.querySelector("[data-carousel-prev]");
  const next = section?.querySelector("[data-carousel-next]");
  if (!prev || !next) return;

  prev.parentElement.hidden = false;

  const scrollByPage = (direction) =>
    track.scrollBy({ left: direction * track.clientWidth * 0.9 });

  let frame;
  const updateButtons = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const edge = 4; // px of slack for padding and sub-pixel rounding
      const maxScroll = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= edge;
      next.disabled = track.scrollLeft >= maxScroll - edge;
    });
  };

  prev.addEventListener("click", () => scrollByPage(-1));
  next.addEventListener("click", () => scrollByPage(1));
  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  updateButtons();
}
