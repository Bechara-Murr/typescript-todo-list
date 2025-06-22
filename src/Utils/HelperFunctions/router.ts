import { renderPage } from "./renderer";
import { loginTemplate } from "../../Presentation/Templates/loginTemplate";
import { tasksTemplate } from "../../Presentation/Templates/tasksTemplate";
import { notFoundTemplate } from "../../Presentation/Templates/notFoundTemplate";
import { checkUserAuthentication } from "../../Utils/HelperFunctions/AuthenticationManager";

export function navigationGuard(): void {
  let path = window.location.pathname;
  const userAuthenticated = checkUserAuthentication();
  const targetPath = userAuthenticated ? "/tasks.html" : "/";

  switch (path) {
    case "/":
    case "/tasks.html":
      navigateTo(targetPath);
      break;
    default:
      navigateTo("/notfound.html");
      break;
  }
}

export function navigateTo(url: string): void {
  history.pushState(null, "", url);
  handleRoute(url);
}

function handleRoute(url: string): void {
  switch (url) {
    case "/":
      renderPage(loginTemplate, "login");
      break;
    case "/tasks.html":
      renderPage(tasksTemplate, "tasks");
      break;
    default:
      renderPage(notFoundTemplate, "Not found");
      break;
  }
}
