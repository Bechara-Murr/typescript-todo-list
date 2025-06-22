import { navigationGuard } from "./Utils/HelperFunctions/router";

document.addEventListener("DOMContentLoaded", () => {
  navigationGuard();
});

window.addEventListener("popstate", navigationGuard);
