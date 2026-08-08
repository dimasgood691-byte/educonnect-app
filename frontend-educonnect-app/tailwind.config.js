/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#FF9E00',
                    hover: '#E08B00',
                },
                background: '#F8FAFC',
                card: '#FFFFFF',
                dark: '#1E293B',
                muted: '#64748B',
                accentSoft: '#FFF7ED',
            },
            boxShadow: {
                soft: '0 4px 20px rgba(30, 41, 59, 0.06)',
                hover: '0 8px 30px rgba(255, 158, 0, 0.15)',
            },
            borderRadius: {
                xl2: '1.25rem',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}