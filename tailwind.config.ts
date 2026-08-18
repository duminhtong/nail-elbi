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
        espresso: {
          DEFAULT: '#120c0b',
          panel: '#1b1110',
          raised: '#281917',
          dark: '#0d0908',
          line: '#704a44',
        },
        rose: {
          DEFAULT: '#e6c1b8',
          dark: '#c98d84',
          light: '#f3d5ce',
          100: '#f0d0c8',
        },
        'rose-muted': '#bf9188',
        red: '#d4382f',
        neu: {
          DEFAULT: '#17100e',
          light: '#281917',
          dark: '#0d0908',
        },
        charcoal: {
          DEFAULT: '#5f4540',
          dark: '#1a0f0e',
        },
        ink: '#f0d0c8',
        muted: '#bf9188',
        'border-soft': '#704a44',
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
