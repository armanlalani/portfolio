// Mobile menu: the button toggles the extended header; tapping a link closes it.

export function initMenu() {
  const menuButton = document.querySelector(".menu-button");
  const extendedHeader = document.querySelector(".extended-header");
  if (!menuButton || !extendedHeader) return;

  const openIcon = menuButton.querySelector(".open-icon");
  const closeIcon = menuButton.querySelector(".close-icon");
  let menuOpen = false;

  function setMenuOpen(open) {
    menuOpen = open;
    openIcon.style.display = open ? "none" : "block";
    closeIcon.style.display = open ? "block" : "none";
    extendedHeader.classList.toggle("hidden-flex", !open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  setMenuOpen(false);

  menuButton.addEventListener("click", () => setMenuOpen(!menuOpen));

  extendedHeader.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });
}
