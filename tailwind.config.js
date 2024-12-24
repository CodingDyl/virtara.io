import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(255 255 255 / 0.7)',
            a: {
              color: '#00f2fe',
              '&:hover': {
                color: '#ff00e5',
              },
            },
            h1: {
              color: 'white',
            },
            h2: {
              color: 'white',
            },
            h3: {
              color: 'white',
            },
            h4: {
              color: 'white',
            },
            strong: {
              color: 'white',
            },
            code: {
              color: 'white',
            },
            blockquote: {
              color: 'rgb(255 255 255 / 0.7)',
              borderLeftColor: '#00f2fe',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    tailwindcssAnimate,
  ],
}