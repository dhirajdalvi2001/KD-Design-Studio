import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    target: "esnext", // Ensure compatibility
    assetsInlineLimit: 0, // Vite uses preloading which sometimes fails on Safari. Try disabling it:
  },
});
