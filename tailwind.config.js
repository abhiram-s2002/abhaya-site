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
        "brand-sand": "#FBEAF4",
        "brand-sand-light": "#FDF3F9",
        "brand-sand-dark": "#EBBFD8",
        "brand-gray": "#707070",
        "brand-gray-light": "#8E8E8E",
        "brand-border": "#E5E5E5",
        "brand-border-dark": "#D9D9D9",
        "brand-sale": "#E32C2B",
        "brand-gold": "#D4AF37",
        "brand-surface": "#FFFFFF",
        "brand-surface-subtle": "#FAF4FB",

        // App Palette Mappings (Dark Rich Magenta & Crisp Bold White)
        "primary": "#7A0648",
        "primary-container": "#68043D",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#FFFFFF",
        "secondary": "#FAF4FB",
        "secondary-container": "#7A0648",
        "on-secondary": "#7A0648",
        "on-secondary-container": "#FFFFFF",
        "background": "#7A0648",
        "on-background": "#FFFFFF",
        "surface": "#7A0648",
        "on-surface": "#FFFFFF",
        "surface-container": "#68043D",
        "surface-container-low": "#73053F",
        "surface-container-high": "#8C0C53",
        "surface-container-highest": "#580233",
        "surface-variant": "#68043D",
        "on-surface-variant": "#FBEAF4",
        "outline": "rgba(255, 255, 255, 0.25)",
        "outline-variant": "rgba(255, 255, 255, 0.15)",
        "royal-violet": "#7A0648",
        "plum-deep": "#68043D",
        "lavender-mist": "#FBEAF4",
        "amethyst-soft": "#B32D7F",
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
