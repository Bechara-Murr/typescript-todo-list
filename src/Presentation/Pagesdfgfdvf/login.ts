import { loginTemplate } from "../Templates/loginTemplate";

export async function rendeLogin() {
  const app = document.getElementById("app");
  if (app) app.innerHTML = loginTemplate;

  const logicModule = await import("../../Logic/login");
  if (logicModule.init) {
    logicModule.init();
  }
}
