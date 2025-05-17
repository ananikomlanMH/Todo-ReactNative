/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik-Regular', 'sans-serif'],
        'rubik-bold': ['Rubik-Bold', 'sans-serif'],
        'rubik-black': ['Rubik-Black', 'sans-serif'],
        'rubik-black-italic': ['Rubik-BlackItalic', 'sans-serif'],
        'rubik-bold-italic': ['Rubik-BoldItalic', 'sans-serif'],
        'rubik-extra-bold': ['Rubik-ExtraBold', 'sans-serif'],
        'rubik-extra-bold-italic': ['Rubik-ExtraBoldItalic', 'sans-serif'],
        'rubik-italic': ['Rubik-Italic', 'sans-serif'],
        'rubik-light': ['Rubik-Light', 'sans-serif'],
        'rubik-light-italic': ['Rubik-LightItalic', 'sans-serif'],
        'rubik-medium': ['Rubik-Medium', 'sans-serif'],
        'rubik-medium-italic': ['Rubik-MediumItalic', 'sans-serif'],
        'rubik-semi-bold': ['Rubik-SemiBold', 'sans-serif'],
        'rubik-semi-bold-italic': ['Rubik-SemiBoldItalic', 'sans-serif'],
      },
      colors: {
        "primary": "#4F46E5", // Indigo-600
        "primary-light": "#818CF8", // Indigo-400
        "primary-dark": "#3730A3", // Indigo-800
        "secondary": "#10B981", // Emerald-500
        "secondary-light": "#6EE7B7", // Emerald-300
        "secondary-dark": "#047857", // Emerald-700
        "accent": "#F97316", // Orange-500
        "accent-light": "#FDBA74", // Orange-300
        "accent-dark": "#C2410C", // Orange-700
        "danger": "#EF4444", // Red-500
        "success": "#10B981", // Emerald-500
        "warning": "#F59E0B", // Amber-500
        "info": "#3B82F6", // Blue-500
        "background": "#F9FAFB", // Gray-50
        "surface": "#FFFFFF", // White
        "text": "#1F2937", // Gray-800
        "text-secondary": "#6B7280", // Gray-500
        "text-tertiary": "#9CA3AF", // Gray-400
        "border": "#E5E7EB", // Gray-200
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}