import vue from "@vitejs/plugin-vue";
import * as path from "path";
import {defineConfig} from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "Vue3HotelDatePicker",
            fileName: (format) => `index.${format}.js`,
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
            "@": path.resolve(__dirname, "src")
        }
    }
});
