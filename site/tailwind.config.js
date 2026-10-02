/** @type {import('tailwindcss').Config} */

// Colours are CSS variables (RGB channels) defined in styles/globals.css, so
// light and dark themes share one set of class names.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        ink: token('ink'),
        muted: token('muted'),
        line: token('line'),
        'line-strong': token('line-strong'),
        accent: token('accent'),
      },
      maxWidth: { page: '72rem' },
    },
  },
  plugins: [],
};
