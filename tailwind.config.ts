import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./shadcn/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./scss/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1536px'
  		}
  	},
  	screens: {
  		sm: '640px',
  		md: '768px',
  		lg: '993px',
  		xl: '1280px',
  		'2xl': '1536px',
  		hd: '1921px'
  	},
  	fontSize: {
  		xs: '1rem',
  		sm: '1.75rem',
  		base: '2.25rem',
  		md: '2.25rem',
  		lg: '2.5rem',
  		xl: '3rem',
  		'2xl': '4rem',
  		'3xl': '5rem',
  		'4xl': '6rem'
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			foreground: 'hsl(var(--foreground))',
  			background: '#FFFFFF',
  			primary: '#0C85B4',
  			secondary: '#115165',
  			tertiary: '#D8F5FF',
  			accent: '#39E4FF',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			black: '#000000',
  			grey800: '#2D2D2D',
  			grey700: '#505050',
  			grey600: '#656565',
  			grey500: '#858585',
  			grey400: '#A1A1A1',
  			grey300: '#C2C2C2',
  			grey200: '#D4D4D4',
  			grey100: '#EFEFEF',
  			white: '#FFFFFF'
  		},
  		borderRadius: {
  			xl: '4rem',
  			lg: '3rem',
  			md: '2rem',
  			sm: '1rem'
  		},
  		fontFamily: {
			sans: ["var(--figtree)", "sans-serif"],
			display: ["var(--degular)", "sans-serif"],
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					// '--tw-prose-body': '#002533',
  					// '--tw-prose-headings': '#303F48',
  					fontSize: 'inherit',
  					lineHeight: 'inherit',
  					h1: {
  						fontFamily: null,
  						fontSize: null,
  						lineHeight: null,
  						fontWeight: null,
  						marginBottom: null,
  						marginTop: null
  					},
  					h2: {
  						fontFamily: null,
  						fontSize: null,
  						lineHeight: null,
  						fontWeight: null,
  						marginBottom: null,
  						marginTop: null
  					},
  					h3: {
  						fontFamily: null,
  						fontSize: null,
  						lineHeight: null,
  						fontWeight: null,
  						marginBottom: null,
  						marginTop: null
  					},
  					h4: {
  						fontFamily: null,
  						fontSize: null,
  						lineHeight: null,
  						fontWeight: null,
  						marginBottom: null
  					},
  					h5: {
  						fontFamily: null,
  						fontSize: null,
  						lineHeight: null,
  						fontWeight: null,
  						marginBottom: null
  					},
  					h6: {
  						fontFamily: null,
  						fontSize: null,
  						lineHeight: null,
  						fontWeight: null,
  						marginBottom: null
  					},
  					p: {
  						fontWeight: null,
  						marginTop: null,
  						marginBottom: null
  					},
  					ol: {
  						marginTop: null,
  						marginBottom: null
  					},
  					ul: {
  						marginTop: null,
  						marginBottom: null
  					},
						strong: {
							color: null,
						},
						a: {
							color: null,
						},
  				}
  			}
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("@vidstack/react/tailwind.cjs")({
      prefix: "media",
    }),
    // @ts-ignore
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "640px",
          },
          "@screen md": {
            maxWidth: "768px",
          },
          "@screen lg": {
            maxWidth: "182rem",
          },
          "@screen xl": {
            maxWidth: "182rem",
          },
          "@screen hd": {
            maxWidth: "182rem",
          },
        },
      });
    },
  ],
} satisfies Config;

export default config;
