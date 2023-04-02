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
            veridical: `${pkgDir}/veridical/src/`,
            '@veridical/plugins': `${pkgDir}/plugins/src/`,
            '@veridical/components': `${pkgDir}/components/src/`,
            '@veridical/nodes': `${pkgDir}/nodes/src/`,
            '@veridical/utils': `${pkgDir}/utils/src/`,
            lexical: `${pkgDir}/../_playground/node_modules/lexical`,
            '@lexical': `${pkgDir}/../_playground/node_modules/@lexical`,
        },
    },
});
