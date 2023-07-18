import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const veridicalPath = path.resolve(__dirname, '../veridical', 'src');
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: 'veridical', replacement: veridicalPath },
            { find: '@', replacement: veridicalPath },
        ],
    },
});
