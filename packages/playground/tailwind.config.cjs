/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
const scrollbar = require('tailwind-scrollbar');

module.exports = {
    darkMode: 'class',
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        'index.html',
        '../packages/utils/src/theme/**/*.ts',
    ],
    theme: {
        extend: {
            colors: {
                'bg-dark': colors.neutral['900'],
                'bg-light': colors.neutral['100'],

                'text-dark-01': colors.neutral['900'],
                'text-dark-02': colors.neutral['800'],
                'text-dark-03': colors.neutral['600'],

                'text-light-01': colors.neutral['50'],
                'text-light-02': colors.neutral['100'],
                'text-light-03': colors.neutral['300'],

                'editor-bg-dark': colors.neutral['900'],
                'editor-bg-light': colors.neutral['100'],

                'editor-title-light': colors.neutral['50'],
                'editor-title-dark': colors.neutral['900'],

                'editor-h2-light': colors.neutral['100'],
                'editor-h2-dark': colors.neutral['800'],

                'editor-h3-light': colors.neutral['200'],
                'editor-h3-dark': colors.neutral['700'],

                'editor-p-light': colors.neutral['200'],
                'editor-p-dark': colors.neutral['700'],

                'editor-quote-light': colors.neutral['300'],
                'editor-quote-dark': colors.neutral['600'],

                'editor-quote-border-light': colors.neutral['300'],
                'editor-quote-border-dark': colors.neutral['500'],

                'editor-icon-light': colors.neutral['300'],
                'editor-icon-light-hover': colors.neutral['200'],
                'editor-icon-light-selected': colors.neutral['200'],

                'editor-icon-dark': colors.neutral['700'],
                'editor-icon-dark-hover': colors.neutral['800'],
                'editor-icon-dark-selected': colors.neutral['800'],

                'editor-item-selected-dark': colors.stone['800'],
                'editor-item-selected-light': colors.neutral['200'],

                'editor-dialog-bg-dark': colors.neutral['900'],
                'editor-dialog-bg-light': '#f5f5f5',

                'editor-button-primary': colors.blue['400'],
                'editor-button-secondary': colors.neutral['600'],

                'editor-drag-target-line-light': colors.cyan['100'],
                'editor-drag-target-line-dark': colors.cyan['700'],
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
    plugins: [scrollbar()],
};
