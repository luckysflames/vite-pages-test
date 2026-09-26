import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    base: "/",
    plugins: [injectHTML()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                project: resolve(__dirname, "project.html"),
            },
        },
    },
});
