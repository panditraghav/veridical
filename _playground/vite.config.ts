import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const baseDir = `${__dirname}/..`;
const pkgDir = path.resolve(baseDir, 'packages');
console.log(baseDir);
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            veridical: `${pkgDir}/veridical/`,
            '@veridical/plugins': `${pkgDir}/plugins/`,
            '@veridical/components': `${pkgDir}/components/`,
            '@veridical/nodes': `${pkgDir}/nodes/`,
            '@veridical/utils': `${pkgDir}/utils/`,
        },
    },
});
