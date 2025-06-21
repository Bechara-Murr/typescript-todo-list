import { aboutTemplate } from "../templates/aboutTemplate";

export function renderAbout() {
  const app = document.getElementById("app");
  if (app) app.innerHTML = aboutTemplate;
}
