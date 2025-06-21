import { handleRoute, navigateTo } from "./Utils/HelperFunctions/router";

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.matches("[data-link]")) {
      e.preventDefault();
      const href = (target as HTMLAnchorElement).getAttribute("href")!;
      navigateTo(href);
    }
  });

  handleRoute();
});

window.addEventListener("popstate", handleRoute);
