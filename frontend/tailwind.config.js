/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
  
    extend: {
      colors: {
        background: '#fafafa',
        foreground: '#111111',
        muted: '#6b7280',
        border: '#e5e7eb',
      },
      maxWidth: {
        page: '1400px',
        content: '72ch', // idealna szerokość do czytania
      },
      fontFamily: {
        heading: ['"arcane-fable"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  safelist: [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "w-0",
  "w-1/3",
  "w-2/3",
  "w-full",
],
  plugins: [],
}