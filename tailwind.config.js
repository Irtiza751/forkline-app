/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#007A55',
          dark: '#006844',
          light: '#D3F5E5',
          subtle: '#EBF9F2',
        },
        ink: {
          DEFAULT: '#02140b',
          muted: '#3D4F47',
        },
        accent: '#FFB830',
        mist: '#F1F3F3',
        surface: { DEFAULT: '#FFFFFF', alt: '#F1F3F3', input: '#F1F3F3' },
        muted: { DEFAULT: '#6B7280', light: '#9CA3AF' },
        border: '#E5E7EB',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        'sans-md': ['Inter_500Medium'],
        'sans-bd': ['Inter_700Bold'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(2, 20, 11, 0.06)',
        search: '0 2px 8px rgba(2, 20, 11, 0.08)',
      },
    },
  },
  plugins: [],
};
