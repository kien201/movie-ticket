/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                slideFromTop: {
                    from: { opacity: 0, transform: 'translateY(-5rem)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
            },
            animation: {
                slide: 'slideIn 1s',
            },
            colors: {
                'blue-primary': '#1BBAFD',
                'blue-secondary': '#d1f1ff',
                'yellow-primary': '#FACA4A',
                'red-primary': '#EA3A3D',
                'red-secondary': '#F47690',
                'purple-primary': '#A584F3',
                'indigo-primary': '#555CF3',
                'pink-primary': '#FE6BBA',
                'green-primary': '#1AD598',
                'orange-primary': '#F3654A',
                'black-primary': '#17181A',
                'black-secondary': '#809FB8',
                'gray-primary': '#F1F4F9',
                'gray-secondary': '#F9FBFC',
            },
        },
    },
    plugins: [],
}
