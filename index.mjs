// Mobile menu: the button toggles the extended header; tapping a link closes it.

const menuButton = document.querySelector(".menu-button");
const openIcon = menuButton.querySelector(".open-icon");
const closeIcon = menuButton.querySelector(".close-icon");
const extendedHeader = document.querySelector(".extended-header");

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

// Footer: keep the copyright year current. The year written in the HTML is
// only a fallback for when JavaScript doesn't run.

const footerYear = document.querySelector(".footer__year");
if (footerYear) footerYear.textContent = new Date().getFullYear();

// Contact: "Copy" button for the email address.
// The button stays hidden unless the browser can copy (needs HTTPS or localhost).

const copyButton = document.querySelector(".contact__copy");
const copyStatus = copyButton?.parentElement.querySelector("[aria-live]");

if (copyButton && navigator.clipboard) {
  copyButton.hidden = false;
  let resetTimer;

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copy);
      copyButton.textContent = "Copied ✓";
      copyStatus.textContent = "Email address copied";
    } catch {
      copyButton.textContent = "Couldn't copy";
      copyStatus.textContent = "";
    }
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      copyButton.textContent = "Copy";
      copyStatus.textContent = "";
    }, 2000);
  });
}
