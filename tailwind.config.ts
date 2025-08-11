/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fashion: {
          primary: '#7c3aed', // Elegant purple
          accent: '#f3f4f6', // Soft background
          dark: '#222',
          light: '#f8fafc',
        },
      },
      fontFamily: {
        urbanist: ["Urbanist", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        fashion: '0 2px 16px rgba(60, 60, 60, 0.08)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
