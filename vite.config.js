import { defineConfig } from "vite";

export default defineConfig({
  // Set base path for GitHub Pages deployment
  base: process.env.NODE_ENV === "production" ? "/Otee/" : "/",
  define: {
    // Define globals for Phaser CE
    global: "globalThis",
  },
  resolve: {
    alias: {
      // Alias for potential Phaser imports
    },
  },
  optimizeDeps: {
    // Exclude Phaser CE from pre-bundling to avoid module conflicts
    exclude: ["phaser-ce"],
  },
  server: {
    // Ensure proper MIME types for assets
    fs: {
      allow: [".."],
    },
  },
});
