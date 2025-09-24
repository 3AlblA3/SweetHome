//import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

//export default defineConfig({
    //plugins: [
    //    tailwindcss(),
    //],
//})

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                brandBlue: "#39A8DA"
            }
        },
    },
    plugins: [],
}

