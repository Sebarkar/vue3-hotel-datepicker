import vue from "@vitejs/plugin-vue";
import * as path from "node:path";
import {defineConfig} from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [vue(), dts()],
    build: {
        lib: {
            entry: path.resolve(import.meta.dirname, "src/index.ts"),
            name: "Vue3HotelDatePicker",
            fileName: (format) => format === "es" ? "index.es.js" : "index.umd.cjs",
            cssFileName: "style",
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue"
                }
            }
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "src")
        }
    }
});
