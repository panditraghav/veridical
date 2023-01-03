/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "index.html",
        "../packages/utils/src/theme/defaultVeridicalTheme.ts"
    ],
    theme: {
        extend: {
            colors: {
                "bg-dark": "#0d0d0d",
                "bg-light": "#f5f5f5",

                "title-dark": "#f5f5f5",
                "title-light": "#0d0d0d",

                "h2-dark": "#f5f5f5",
                "h2-light": "#0d0d0d",

                "h3-dark": "#e3e3e3",
                "h3-light": "#1c1c1c",

                "p-dark": "#e3e3e3",
                "p-light": "#1c1c1c",

                "icon-dark": "#94a3b8",
                "icon-dark-hover": "#f1f5f9",
                "icon-dark-selected": "#f87171",

                "icon-light": "#64748b",
                "icon-light-hover": "#0f172a",
                "icon-light-selected": "#f87171",

            },
            keyframes: {
                appear: {
                    "0%": { opacity: 0, transform: "scale(.8)" },
                    "100%": { opacity: 100, transform: "scale(1)" }
                }
            },
            animation: {
                appear: "appear .18s ease-out forwards"
            }
        },
    },
    plugins: [],
}
