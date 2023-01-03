import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const baseDir = `${__dirname}/..`;
const packagesDir = `${baseDir}/packages`;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: "veridical",
                replacement: `${packagesDir}/veridical/src`,
            },
            {
                find: "@veridical/plugins",
                replacement: `${packagesDir}/plugins/src`,
            },
            {
                find: "@veridical/nodes",
                replacement: `${packagesDir}/nodes/src`,
            },
            {
                find: "@veridical/components",
                replacement: `${packagesDir}/components/src`,
            },
            {
                find: "@veridical/utils",
                replacement: `${packagesDir}/utils/src`,
            },
        ],
    },
});
