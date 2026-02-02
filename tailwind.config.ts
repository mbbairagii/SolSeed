import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            fontFamily: {
                spectral: ['var(--font-spectral)', 'serif'],
                mono: ['var(--font-jetbrains)', 'monospace'],
            },
            animation: {
                'grain': 'grain 8s steps(10) infinite',
                'fadeInDown': 'fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                'fadeIn': 'fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1)',
                'slideUp': 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                'fadeInWord': 'fadeInWord 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            keyframes: {
                grain: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '10%': { transform: 'translate(-5%, -10%)' },
                    '20%': { transform: 'translate(-15%, 5%)' },
                    '30%': { transform: 'translate(7%, -25%)' },
                    '40%': { transform: 'translate(-5%, 25%)' },
                    '50%': { transform: 'translate(-15%, 10%)' },
                    '60%': { transform: 'translate(15%, 0%)' },
                    '70%': { transform: 'translate(0%, 15%)' },
                    '80%': { transform: 'translate(3%, 35%)' },
                    '90%': { transform: 'translate(-10%, 10%)' },
                },
                fadeInDown: {
                    from: {
                        opacity: '0',
                        transform: 'translateY(-20px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                fadeIn: {
                    from: {
                        opacity: '0',
                        transform: 'translateY(30px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                slideUp: {
                    from: {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                fadeInWord: {
                    from: {
                        opacity: '0',
                        transform: 'scale(0.9)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'scale(1)',
                    },
                },
            },
        },
    },
    plugins: [],
};

export default config;