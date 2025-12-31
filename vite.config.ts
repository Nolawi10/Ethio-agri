import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Set base path for production builds (empty for root, or '/subfolder/' if needed)
  base: '/',
  build: {
    // Ensure proper build output
    outDir: 'dist',
    assetsDir: 'assets',
    // Source maps disabled in production for security and performance
    sourcemap: false,
  },
});
