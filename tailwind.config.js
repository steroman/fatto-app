/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#50C2C9',
        secondary: '#F0F4F3',
        hover: '#35969C'
      },
      height: {
        taskWrap: 'calc(100% - 160px)',
        taskWrap1: 'calc(100% - 104px)',
        settings: 'calc(100% - 128px)',
        settings1: 'calc(100% - 24px)'
      },
      maxWidth: {
        120: '30rem',
        160: '40rem',
        taskWrap1: 'calc(100% - 104px)'
      }
    }
  },
  plugins: []
}
