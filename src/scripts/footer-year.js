// Footer: keep the copyright year current. The year in the HTML is set when
// the site is built, and is the fallback when JavaScript doesn't run.

export function updateFooterYear() {
  const footerYear = document.querySelector(".footer__year");
  if (footerYear) footerYear.textContent = new Date().getFullYear();
}
