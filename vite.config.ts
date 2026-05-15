import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// base is set to /buildbuy-design/ so assets resolve correctly on GitHub Pages
// (https://pachito04.github.io/buildbuy-design/).
export default defineConfig({
  base: "/buildbuy-design/",
  plugins: [react()],
  server: { port: 5173 },
});
