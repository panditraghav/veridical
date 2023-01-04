import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const basedir = `${__dirname}/..`;
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
});
