/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'sans-serif'],
			display: ['Inter', 'system-ui', 'sans-serif'],
  			serif: ['Playfair Display', 'serif'],
  			mono: ['JetBrains Mono', 'monospace']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			obsidian: '#0A0A0A',
  			charcoal: '#262626',
  			gold: {
  				DEFAULT: '#D4AF37',
  				foreground: '#0A0A0A'
  			},
  			silver: '#E5E5E5',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			primary: {
  				DEFAULT: '#D4AF37',
  				foreground: '#0A0A0A'
  			},
  			border: 'hsl(var(--border))',
  			ring: '#D4AF37',
  			card: {
  				DEFAULT: '#262626',
  				foreground: '#E5E5E5'
  			},
  			popover: {
  				DEFAULT: '#262626',
  				foreground: '#E5E5E5'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))'
  		},
  		boxShadow: {
  			glow: '0 0 20px -5px rgba(212, 175, 55, 0.4)',
  			'glow-lg': '0 0 40px -10px rgba(212, 175, 55, 0.6)',
  			gold: '0 0 15px rgba(212, 175, 55, 0.3)'
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': { opacity: '0', transform: 'translateY(10px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			}
  		},
  		animation: {
  			'fade-in': 'fade-in 0.6s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}