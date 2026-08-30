/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // BasicAbaya Color System
        "brand-black": "#000000",
        "brand-dark": "#201922",
        "brand-sand": "#F5EAF7",
        "brand-sand-light": "#FAF4FB",
        "brand-sand-dark": "#E8D3EC",
        "brand-gray": "#707070",
        "brand-gray-light": "#8E8E8E",
        "brand-border": "#E5E5E5",
        "brand-border-dark": "#D9D9D9",
        "brand-sale": "#E32C2B",
        "brand-gold": "#D4AF37",
        "brand-surface": "#FFFFFF",
        "brand-surface-subtle": "#FAF4FB",

        // App Palette Mappings
        "primary": "#2D143D",
        "primary-container": "#1A0924",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#FFFFFF",
        "secondary": "#FAF4FB",
        "secondary-container": "#C85DA9",
        "on-secondary": "#2D143D",
        "on-secondary-container": "#FFFFFF",
        "background": "#D975BD",
        "on-background": "#FFFFFF",
        "surface": "#D975BD",
        "on-surface": "#FFFFFF",
        "surface-container": "#C85DA9",
        "surface-container-low": "#CF6EB2",
        "surface-container-high": "#BF509F",
        "surface-container-highest": "#B24191",
        "surface-variant": "#C85DA9",
        "on-surface-variant": "#FAF4FB",
        "outline": "rgba(255, 255, 255, 0.25)",
        "outline-variant": "rgba(255, 255, 255, 0.15)",
        "royal-violet": "#D975BD", // Exact Logo Violet signature color
        "plum-deep": "#2D143D",
        "lavender-mist": "#F5EAF7",
        "amethyst-soft": "#E5A8D2",
        "error": "#E32C2B",
        "error-container": "#FDE8E8",
        "on-error": "#FFFFFF",
        "gold-accent": "#FFD700",
        "gold-soft": "#FFF0A0"
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "0px",
        md: "2px",
        lg: "2px",
        xl: "4px",
        full: "9999px"
      },
      spacing: {
        "container-max": "1360px",
        "container-gutter": "2rem",
        "mobile-margin": "16px",
        "grid-gutter": "20px",
        "section-gap": "64px",
        "content-margin": "48px"
      },
      fontFamily: {
        "sans": ["Montserrat", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        "serif": ["Montserrat", "Georgia", "sans-serif"],
        "heading": ["Montserrat", "sans-serif"],
        "body": ["Montserrat", "sans-serif"],
        "body-lg": ["Montserrat", "sans-serif"],
        "body-md": ["Montserrat", "sans-serif"],
        "headline-lg": ["Montserrat", "sans-serif"],
        "display-lg": ["Montserrat", "sans-serif"],
        "label-sm": ["Montserrat", "sans-serif"],
        "headline-md": ["Montserrat", "sans-serif"],
        "headline-lg-mobile": ["Montserrat", "sans-serif"]
      },
      fontSize: {
        // BasicAbaya Type Scale
        "heading-1": ["clamp(1.375rem, 1.15rem + 1vw, 2rem)", { lineHeight: "1.2", letterSpacing: "0.04em", fontWeight: "500" }],
        "heading-2": ["clamp(1.25rem, 1.07rem + 0.8vw, 1.75rem)", { lineHeight: "1.25", letterSpacing: "0.04em", fontWeight: "500" }],
        "heading-3": ["clamp(1.125rem, 1.03rem + 0.4vw, 1.375rem)", { lineHeight: "1.3", letterSpacing: "0.04em", fontWeight: "500" }],
        "heading-4": ["clamp(1rem, 0.95rem + 0.2vw, 1.125rem)", { lineHeight: "1.4", letterSpacing: "0.04em", fontWeight: "500" }],
        "body-lg": ["1rem", { lineHeight: "1.65", letterSpacing: "0.02em", fontWeight: "400" }],
        "body-md": ["0.875rem", { lineHeight: "1.65", letterSpacing: "0.02em", fontWeight: "400" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.6", letterSpacing: "0.02em", fontWeight: "400" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.04em", fontWeight: "500" }],
        "micro": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.06em", fontWeight: "500" }],
        "display-lg": ["clamp(1.75rem, 1.5rem + 1.2vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "0.04em", fontWeight: "600" }],
        "headline-lg": ["clamp(1.375rem, 1.15rem + 1vw, 2rem)", { lineHeight: "1.2", letterSpacing: "0.04em", fontWeight: "500" }],
        "headline-md": ["clamp(1.125rem, 1.03rem + 0.4vw, 1.375rem)", { lineHeight: "1.3", letterSpacing: "0.04em", fontWeight: "500" }],
        "label-sm": ["0.75rem", { lineHeight: "1.0", letterSpacing: "0.06em", fontWeight: "600" }]
      },
      letterSpacing: {
        'tightest': '-0.02em',
        'tighter': '-0.01em',
        'normal': '0em',
        'wide': '0.02em',
        'wider': '0.04em',
        'widest': '0.08em',
        'ultra': '0.12em',
      },
      boxShadow: {
        'luxury': '0px 4px 20px rgba(0, 0, 0, 0.04)',
        'luxury-lg': '0px 10px 30px rgba(0, 0, 0, 0.08)',
        'subtle': '0px 1px 4px rgba(0, 0, 0, 0.04)',
        'card': '0 0 0 1px #E5E5E5',
        'glow': '0 0 20px rgba(0, 0, 0, 0.15)'
      }
    },
  },
  plugins: [],
}
