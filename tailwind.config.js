/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1A7A3E',
          'green-dark': '#145F30',
          'green-light': '#E8F5EE',
          yellow: '#F5A623',
          'yellow-light': '#FEF9EE',
          'yellow-dark': '#C4851C',
        },
        dark: '#1C1C1C',
        mid: '#4A4A4A',
        subtle: '#888888',
        border: '#E0E0E0',
        'border-strong': '#CCCCCC',
        surface: '#FFFFFF',
        bg: '#F5F7F5',
        'bg-alt': '#FAFAFA',
        success: '#1A7A3E',
        warning: '#F5A623',
        error: '#D93025',
        info: '#1565C0',
        'error-light': '#FDECEA',
        'warning-light': '#FEF9EE',
        'info-light': '#E8F0FE',
      },
      fontFamily: {
        display: ['DM Serif Display', 'Georgia', 'serif'],
        heading: ['Outfit', 'Segoe UI', 'sans-serif'],
        body: ['Inter', 'Helvetica Neue', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: '11px',
        sm: '13px',
        base: '14px',
        md: '16px',
        lg: '18px',
        xl: '22px',
        '2xl': '28px',
        '3xl': '36px',
        '4xl': '48px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.08)',
        md: '0 4px 12px rgba(0,0,0,0.10)',
        lg: '0 8px 24px rgba(0,0,0,0.12)',
        focus: '0 0 0 3px rgba(26,122,62,0.25)',
      },
      width: {
        sidebar: '240px',
        'sidebar-collapsed': '64px',
      },
      maxWidth: {
        content: '1440px',
      },
    },
  },
  plugins: [],
}
