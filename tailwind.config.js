/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./utils/theme/defaultVeridicalTheme.ts",
    ],
    theme: {
        extend: {
            colors: {
                "bg-dark": "#171717",
                "bg-light": "#f5f5f5",

                "title-light": "#f5f5f5",
                "title-dark": "#0d0d0d",

                "h2-light": "#f5f5f5",
                "h2-dark": "#0d0d0d",

                "h3-light": "#e3e3e3",
                "h3-dark": "#1c1c1c",

                "p-light": "#e3e3e3",
                "p-dark": "#1c1c1c",

                "icon-light": "#e5e7eb",
                "icon-light-hover": "#f9fafb",
                "icon-light-selected": "#fb923c",

                "icon-dark": "#374151",
                "icon-dark-hover": "#1f2937",
                "icon-dark-selected": "#fb923c",

                "dialog-bg-dark":"",
                "dialog-bg-light":"",
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
