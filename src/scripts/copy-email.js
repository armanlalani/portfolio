// Contact: "Copy" button for the email address.
// The button stays hidden unless the browser can copy (needs HTTPS or localhost).

export function initCopyEmail() {
  const copyButton = document.querySelector(".contact__copy");
  const copyStatus = copyButton?.parentElement.querySelector("[aria-live]");
  if (!copyButton || !navigator.clipboard) return;

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
