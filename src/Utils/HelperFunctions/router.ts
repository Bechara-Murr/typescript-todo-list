import { renderPage } from "./renderer";
import { loginTemplate } from "../../Presentation/Templates/loginTemplate";
import { tasksTemplate } from "../../Presentation/Templates/tasksTemplate";

export function navigateTo(url: string) {
  history.pushState(null, "", url);
  handleRoute();
}

export function handleRoute() {
  const path = window.location.pathname;
  switch (path) {
    case "/tasks":
      renderPage(tasksTemplate, "tasks");
      break;
    case "/":
    default:
      renderPage(loginTemplate, "login");
      break;
  }
}
