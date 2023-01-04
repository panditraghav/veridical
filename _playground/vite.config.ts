import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const basedir = `${__dirname}/..`;
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: "veridical",
                replacement: `${basedir}`,
            },
            {
                find: "@veridical/plugins",
                replacement: `${basedir}/plugins`,
            },
            {
                find: "@veridical/nodes",
                replacement: `${basedir}/nodes`,
            },
            {
                find: "@veridical/components",
                replacement: `${basedir}/components`,
            },
            {
                find: "@veridical/utils",
                replacement: `${basedir}/utils`,
            },
        ],
    },
});
