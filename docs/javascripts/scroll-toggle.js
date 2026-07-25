document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");

  button.className = "scroll-toggle";
  button.type = "button";
  button.setAttribute("aria-label", "Перейти в конец страницы");

  const iconDown = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 16.5 5.5 10l1.4-1.4 5.1 5.1 5.1-5.1 1.4 1.4L12 16.5Z"></path>
    </svg>
  `;

  const iconUp = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 7.5 6.5 6.5-1.4 1.4-5.1-5.1-5.1 5.1L5.5 14 12 7.5Z"></path>
    </svg>
  `;

  document.body.appendChild(button);

  function getScrollProgress() {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const maximumScroll = documentHeight - viewportHeight;

    if (maximumScroll <= 0) {
      return 0;
    }

    return window.scrollY / maximumScroll;
  }

  function updateButton() {
    const pageIsScrollable =
      document.documentElement.scrollHeight > window.innerHeight + 100;

    button.hidden = !pageIsScrollable;

    if (!pageIsScrollable) {
      return;
    }

    if (getScrollProgress() < 0.45) {
      button.innerHTML = iconDown;
      button.dataset.mode = "down";
      button.title = "Перейти в конец страницы";
      button.setAttribute("aria-label", "Перейти в конец страницы");
    } else {
      button.innerHTML = iconUp;
      button.dataset.mode = "up";
      button.title = "Вернуться в начало страницы";
      button.setAttribute("aria-label", "Вернуться в начало страницы");
    }
  }

  button.addEventListener("click", () => {
    const target =
      button.dataset.mode === "down"
        ? document.documentElement.scrollHeight
        : 0;

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", updateButton, { passive: true });
  window.addEventListener("resize", updateButton);

  updateButton();
});
