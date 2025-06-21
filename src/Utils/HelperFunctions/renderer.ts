const logicModulesMap: Record<string, () => Promise<any>> = {
  login: () => import("../../Logic/login"),
  tasks: () => import("../../Logic/tasks"),
};

export async function renderPage(template: string, pageName: string) {
  const app = document.getElementById("app");
  if (!app) return;

  //  Load page template
  app.innerHTML = template;

  //   Load page logic handler
  const loader = logicModulesMap[pageName];
  if (!loader) {
    console.warn(`No logic module found for page: ${pageName}`);
    return;
  }

  const logicModule = await loader();

  if (logicModule.init) {
    logicModule.init();
  }
}
