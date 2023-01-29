/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    darkMode: 'class',
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        'index.html',
        '../packages/utils/src/theme/defaultVeridicalTheme.ts',
    ],
    theme: {
        extend: {
            colors: {
                'editor-bg-dark': colors.neutral['900'],
                'editor-bg-light': colors.neutral['100'],

                'editor-title-light': colors.neutral['200'],
                'editor-title-dark': colors.neutral['900'],

                'editor-h2-light': colors.neutral['200'],
                'editor-h2-dark': colors.neutral['800'],

                'editor-h3-light': colors.neutral['300'],
                'editor-h3-dark': colors.neutral['700'],

                'editor-p-light': colors.neutral['300'],
                'editor-p-dark': colors.neutral['700'],

                'editor-icon-light': '#e5e7eb',
                'editor-icon-light-hover': '#f9fafb',
                'editor-icon-light-selected': '#fb923c',

                'editor-icon-dark': '#374151',
                'editor-icon-dark-hover': '#1f2937',
                'editor-icon-dark-selected': '#fb923c',

                'editor-dialog-bg-dark': colors.neutral['900'],
                'editor-dialog-bg-light': '#f5f5f5',

                'editor-item-selected-dark': colors.stone['800'],
                'editor-item-selected-light': colors.neutral['200'],

                'editor-button-primary': colors.blue['400'],
                'editor-button-secondary': colors.neutral['600']
            },
            keyframes: {
                appear: {
                    '0%': { opacity: 0, transform: 'scale(.8)' },
                    '100%': { opacity: 100, transform: 'scale(1)' },
                },
            },
            animation: {
                appear: 'appear .18s ease-out forwards',
            },
        },
    },
    plugins: [],
};
