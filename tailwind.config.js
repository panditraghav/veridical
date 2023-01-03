/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./packages/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            colors:{
                "dark-01" : "#000",
                "dark-02" : "#000",
                "dark-03" : "#000",

                "light-01" : "#fff",
                "light-02" : "#fff",
                "light-03" : "#fff",
            }
        },
    },
    plugins: [],
}
