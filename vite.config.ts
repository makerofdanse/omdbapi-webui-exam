import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "./src/config";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: config.basePath,
});
