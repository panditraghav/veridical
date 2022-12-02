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
                find: "markor",
                replacement: `${packagesDir}/markor/src`,
            },
            {
                find: "@markor/plugins",
                replacement: `${packagesDir}/plugins/src`,
            },
            {
                find: "@markor/nodes",
                replacement: `${packagesDir}/nodes/src`,
            },
            {
                find: "@markor/icons",
                replacement: `${packagesDir}/icons/src`,
            },
            {
                find: "@markor/components",
                replacement: `${packagesDir}/components/src`,
            },
            {
                find: "@markor/utils",
                replacement: `${packagesDir}/utils/src`,
            },
        ],
    },
});
