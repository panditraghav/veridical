/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    darkMode: 'class',
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        'index.html',
        '../packages/utils/theme/defaultVeridicalTheme.ts',
    ],
    theme: {
        extend: {
            colors: {
                'bg-dark': colors.neutral['900'],
                'bg-light': colors.neutral['100'],

                'title-light': colors.neutral['200'],
                'title-dark': colors.neutral['900'],

                'h2-light': colors.neutral['200'],
                'h2-dark': colors.neutral['800'],

                'h3-light': colors.neutral['300'],
                'h3-dark': colors.neutral['700'],

                'p-light': colors.neutral['300'],
                'p-dark': colors.neutral['700'],

                'icon-light': '#e5e7eb',
                'icon-light-hover': '#f9fafb',
                'icon-light-selected': '#fb923c',

                'icon-dark': '#374151',
                'icon-dark-hover': '#1f2937',
                'icon-dark-selected': '#fb923c',

                'dialog-bg-dark': colors.neutral['900'],
                'dialog-bg-light': '#f5f5f5',

                'item-selected-dark': colors.stone['800'],
                'item-selected-light': colors.neutral['200'],

                'button-primary': colors.blue['400'],
                'button-secondary': colors.neutral['600']
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
