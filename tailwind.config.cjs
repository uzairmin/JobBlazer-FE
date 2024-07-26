/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                gruppo: ['Gruppo', 'cursive'],
            },
        },
        screens: {
            sm: '640px',
            // => @media (min-width: 576px) { ... }
            md: '768px',
            // => @media (min-width: 960px) { ... }
            lg: '1024px',
            // => @media (min-width: 1440px) { ... }
            xl: '1200px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1800px',
            // => @media (min-width: 1536px) { ... }
            '3xl': '3200px',
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
}
