import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",       // simpler cross-platform than "::"
    port: 5173,              // avoid clash with Spring Boot (8080)
    strictPort: true,        // fail fast if 5173 is taken
    open: true,              // auto-open browser on start
    proxy: {
      // Forward all /api/* calls to Spring backend
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true,            // proxy websockets if needed later
        // timeout: 60_000,  // uncomment to tweak dev timeout
        // rewrite: (path) => path, // keep /api prefix (recommended)
      },
    },
  },

  // Preview server for 'vite preview' (useful after build)
  preview: {
    host: "localhost",
    port: 4173,
    strictPort: true,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Reasonable defaults; customize if you deploy under a subpath
  base: "/",            // change to '/app/' if serving under a subpath
  build: {
    sourcemap: true,    // handy in dev/staging builds
    outDir: "dist",
    chunkSizeWarningLimit: 1000,
  },

  // Faster cold-starts; add libs you import a lot
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
    ],
  },
}));
