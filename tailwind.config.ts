import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
        neu: {
          DEFAULT: '#f9f9f9',
          light: '#ffffff',
          dark: '#e2e2e2',
        },
        rose: {
          DEFAULT: '#b76e79',
          dark: '#8a4853',
          light: '#ffd9dd',
        },
        charcoal: {
          DEFAULT: '#5f5e5e',
          dark: '#1a1c1c',
        },
        ink: '#1a1c1c',
        muted: '#524345',
        'border-soft': '#d7c1c3',
  		},
  		boxShadow: {
  			'premium': '0 12px 40px rgba(26, 26, 26, 0.06)',
  			'premium-hover': '0 20px 50px rgba(26, 26, 26, 0.1)',
  			'premium-sm': '0 4px 20px rgba(26, 26, 26, 0.04)',
        'neu-raised': '-8px -8px 16px 0px #FFFFFF, 8px 8px 16px 0px #e2e2e2',
        'neu-sunken': 'inset -4px -4px 8px 0px #FFFFFF, inset 4px 4px 8px 0px #e2e2e2',
  		},
  		fontFamily: {
  			sans: ['var(--font-sans)', 'sans-serif'],
  			display: ['var(--font-sans)', 'sans-serif'],
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  		}
  	}
  },
  plugins: [],
};

export default config;
