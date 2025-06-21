import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // Fallback to index.html for all routes
    fs: { strict: false },
    middlewareMode: false, // allow default HTML fallback
  },
});

// import { defineConfig } from "vite";

// export default defineConfig({
//   root: "src",
//   build: {
//     outDir: "../dist", // Relative to root (go up to project root)
//     emptyOutDir: true,
//     rollupOptions: {
//       input: {
//         login: "src/Presentation/index.html",
//         tasks: "src/Presentation/tasks.html",
//       },
//     },
//   },
// });
