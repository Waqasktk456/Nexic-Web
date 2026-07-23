/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // NexicWeb color palette
        bg: '#07070f',
        bg2: '#0d0d1a',
        bg3: '#111126',
        surface: 'rgba(255,255,255,0.04)',
        surface2: 'rgba(255,255,255,0.07)',
        border: 'rgba(255,255,255,0.08)',
        border2: 'rgba(255,255,255,0.13)',
        accent: '#7c5cfc',
        accent2: '#c084fc',
        accent3: '#38bdf8',
        gold: '#f5c842',
        text: '#f0f0f8',
        text2: '#9494b8',
        text3: '#5a5a7a',
        danger: '#f87171',
        success: '#34d399',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        'nexic': '18px',
        'nexic-sm': '10px',
      },
      boxShadow: {
        'nexic': '0 8px 40px rgba(124,92,252,0.18)',
        'nexic-lg': '0 20px 80px rgba(124,92,252,0.25)',
        'glow': '0 0 40px rgba(124,92,252,0.4)',
      },
    },
  },
  plugins: [],
}
