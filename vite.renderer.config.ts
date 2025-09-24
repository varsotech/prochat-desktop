import { defineConfig } from 'vite';
import path from "node:path";

// https://vitejs.dev/config
export default defineConfig({
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
        },
    },
});
