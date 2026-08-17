---
name: Ethereal Modesty
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#504443'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#827472'
  outline-variant: '#d4c3c1'
  surface-tint: '#795553'
  primary: '#321716'
  on-primary: '#ffffff'
  primary-container: '#4a2c2a'
  on-primary-container: '#bd928f'
  inverse-primary: '#eabcb8'
  secondary: '#5f5e5b'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2dd'
  on-secondary-container: '#656461'
  tertiary: '#2b1c05'
  on-tertiary: '#ffffff'
  tertiary-container: '#423117'
  on-tertiary-container: '#b29877'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#eabcb8'
  on-primary-fixed: '#2e1413'
  on-primary-fixed-variant: '#5f3e3c'
  secondary-fixed: '#e5e2dd'
  secondary-fixed-dim: '#c8c6c2'
  on-secondary-fixed: '#1c1c19'
  on-secondary-fixed-variant: '#474743'
  tertiary-fixed: '#fbdeb9'
  tertiary-fixed-dim: '#dec29f'
  on-tertiary-fixed: '#271903'
  on-tertiary-fixed-variant: '#564428'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  section-gap: 120px
  grid-gutter: 24px
  content-margin: 64px
  mobile-margin: 20px
---

## Brand & Style

This design system is anchored in a **Minimalist / Gallery-inspired** aesthetic, specifically tailored for a luxury hijab brand. The brand personality is sophisticated, calm, and curated, evoking the feeling of an upscale boutique or a high-end editorial spread. 

The visual narrative focuses on "breathing room"—leveraging expansive whitespace to elevate the product photography to art-gallery status. The goal is to provide a serene and premium shopping experience that respects the values of modesty while embracing contemporary luxury. 

**Key Visual Principles:**
- **Editorial Balance:** A juxtaposition of classical serif typography with ultra-modern, utilitarian sans-serif.
- **Organic Sophistication:** Using soft textures and a warm, tonal color palette to create an inviting yet exclusive atmosphere.
- **Purposeful Restraint:** Every element serves a purpose; decorative flourishes are kept to a minimum to allow the fabrics and textures of the hijabs to remain the focal point.

## Colors

The palette is rooted in earthiness and warmth, transitioning from deep, espresso-rich browns to ethereal creams.

- **Primary (Deep Cocoa):** Used for primary headings, call-to-action backgrounds, and heavy editorial accents. It provides the grounding "luxury" weight.
- **Secondary (Warm Cream):** The primary background color. Unlike a stark white, this cream adds a soft, tactile feel to the interface, mimicking high-quality stationery.
- **Tertiary (Muted Gold/Sand):** Reserved for subtle accents, divider lines, and secondary labels. It represents the "sheen" of high-end fabrics.
- **Neutral (Ink):** Pure high-contrast black is avoided in favor of a very deep charcoal for body text, ensuring readability without being jarring.

**Functional Application:**
- Use **Primary** for high-priority buttons.
- Use **Secondary** for section backgrounds to create a "layered" paper effect.
- Maintain high contrast ratios for all instructional text.

## Typography

The typography strategy employs a "High-Low" mix: the expressive, historical weight of **Playfair Display** paired with the technical, clean precision of **Manrope**.

- **Headlines:** Always set in Playfair Display. Use tighter tracking for larger display sizes to create a modern editorial feel. 
- **Body Text:** Manrope provides excellent legibility at smaller sizes. Its geometric nature balances the romanticism of the serif.
- **Labels & Overlines:** Use Manrope at small sizes with generous letter-spacing (tracking) and uppercase styling to denote categories or "new arrival" tags. This mimics luxury jewelry or cosmetic packaging.
- **Quotes:** Large-scale pull quotes should use Playfair Display Italic to emphasize the brand's "voice."

## Layout & Spacing

The layout philosophy is **Fixed Grid** for desktop and **Fluid** for mobile, emphasizing verticality and rhythmic breathing room.

- **The "Gallery" Margin:** On desktop, use a minimum of 64px outer margins to "frame" the content, making the browser feel like a printed book.
- **Section Gaps:** Dramatic 120px gaps between major sections prevent the UI from feeling cluttered and encourage the user to slow down and appreciate the visuals.
- **Responsive Behavior:** 
  - **Desktop (1440px):** 12-column grid, generous gutters.
  - **Tablet (768px - 1024px):** 8-column grid, margins reduce to 40px.
  - **Mobile (<768px):** 4-column grid, 20px margins. Headlines should scale significantly (see typography variables) to maintain hierarchy without breaking containers.

## Elevation & Depth

This design system avoids heavy shadows and physical skeuomorphism in favor of **Tonal Layering** and **Micro-Shadows**.

- **Surface Tiers:** Depth is primarily created by placing `Secondary` (Cream) cards on top of white backgrounds, or `Primary` (Brown) containers on Cream backgrounds.
- **The "Ethereal" Shadow:** When elevation is required (e.g., a floating navigation bar or an active product card), use a single, extremely diffused shadow: `0px 10px 40px rgba(74, 44, 42, 0.05)`. The tint should match the Primary brown color to maintain warmth.
- **Dividers:** Use 1px solid lines in `Tertiary` color at 30% opacity. Avoid heavy borders; the goal is a seamless, "light as air" feel.

## Shapes

The shape language is **Soft (0.25rem)**. While a luxury brand could use sharp edges (0px), a slight rounding introduces a "human" and "approachable" quality that aligns with the softness of hijab fabrics.

- **Primary Buttons:** Subtle 4px (Soft) radius.
- **Product Cards:** 4px radius for the image container; the card itself may remain borderless to blend into the background.
- **Input Fields:** 4px radius with a thin 1px border.
- **Iconography:** Use light-weight (2pt) stroke icons with slightly rounded caps to match the font geometry.

## Components

### Buttons
- **Primary:** Solid `Primary` color background, `Secondary` color text. No border. On hover, the background shifts slightly lighter.
- **Secondary/Ghost:** `Primary` color border (1px), `Primary` color text. No background. On hover, a faint `Secondary` tint appears.
- **Text Link:** Manrope Bold, Uppercase, with a 1px underline that disappears on hover.

### Product Cards
- Image-first approach. High-resolution photography is mandatory.
- Titles in Playfair Display (18-20px).
- Price in Manrope (Medium weight).
- "Quick Add" buttons should only appear on hover to minimize visual noise.

### Input Fields
- Underlined style (border-bottom only) for a more "editorial" look in contact forms.
- Full-border style (1px) for checkout and functional areas to ensure clarity.
- Labels should always be in `label-sm` style (Manrope, Uppercase).

### Navigation
- Top-aligned, centered logo (serif-based).
- Navigation links in Manrope Regular, 14px, Uppercase with wide tracking.
- Use a "stick-to-top" behavior with a backdrop blur (`blur 10px`) and 90% opacity cream background.

### Chips/Tags
- Small, rectangular with `Soft` corners.
- Used for "Limited Edition," "Silk," or "New."
- Background: `Tertiary` at 20% opacity; Text: `Primary`.