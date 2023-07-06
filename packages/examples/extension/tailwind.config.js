/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/ui/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            mono: ['Roboto Mono', 'monospace'],
        },
    },
    plugins: [],
};
