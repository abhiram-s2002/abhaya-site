---
name: Ethereal Amethyst
colors:
  surface: '#fff7fc'
  surface-dim: '#e3d6e2'
  surface-bright: '#fff7fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fdf0fc'
  surface-container: '#f7eaf6'
  surface-container-high: '#f1e4f0'
  surface-container-highest: '#ebdfeb'
  on-surface: '#201922'
  on-surface-variant: '#4b454c'
  inverse-surface: '#352e37'
  inverse-on-surface: '#faedf9'
  outline: '#7c757c'
  outline-variant: '#cdc4cc'
  surface-tint: '#6c5775'
  primary: '#15051e'
  on-primary: '#ffffff'
  primary-container: '#2d1b36'
  on-primary-container: '#9981a2'
  inverse-primary: '#d8bde1'
  secondary: '#5f5e63'
  on-secondary: '#ffffff'
  secondary-container: '#e5e1e7'
  on-secondary-container: '#656369'
  tertiary: '#150422'
  on-tertiary: '#ffffff'
  tertiary-container: '#2d1a39'
  on-tertiary-container: '#9881a6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f5d9fe'
  primary-fixed-dim: '#d8bde1'
  on-primary-fixed: '#26142f'
  on-primary-fixed-variant: '#543f5d'
  secondary-fixed: '#e5e1e7'
  secondary-fixed-dim: '#c8c5cb'
  on-secondary-fixed: '#1c1b1f'
  on-secondary-fixed-variant: '#47464b'
  tertiary-fixed: '#f3daff'
  tertiary-fixed-dim: '#d8bde6'
  on-tertiary-fixed: '#261432'
  on-tertiary-fixed-variant: '#533f60'
  background: '#fff7fc'
  on-background: '#201922'
  surface-variant: '#ebdfeb'
  plum-deep: '#211126'
  lavender-mist: '#EBE3F0'
  amethyst-soft: '#7D628A'
  royal-violet: '#4A2B5E'
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

The design system evolves into a **Sophisticated Violet** aesthetic, maintaining its "Ethereal Modesty" roots while transitioning from earthy tones to a palette of regal violets and deep plums. The brand personality remains high-end, calm, and curated, drawing inspiration from luxury editorial design and high-fashion ateliers.

The visual style is **Minimalist with a High-Contrast edge**, utilizing vast whitespace to frame content like pieces in an art gallery. The transition to violet introduces a sense of mystery, wisdom, and premium quality, ideal for a brand that celebrates both modern fashion and traditional values.

**Key Visual Principles:**
- **Regal Serenity:** A shift from the "warmth" of mochas to the "cool elegance" of lavenders, creating a more poised and intellectual atmosphere.
- **Editorial Precision:** Tight typographic scales and generous margins ensure that every product photograph is treated with high importance.
- **Atmospheric Depth:** Using monochromatic violet layering to create a sense of three-dimensional space without relying on heavy textures.

## Colors

The palette is a sophisticated range of violets, replacing the previous warm mochas with a gradient that moves from deep, midnight plum to ethereal lavender mists.

- **Primary (Deep Plum):** A near-black violet used for high-impact typography, primary call-to-action backgrounds, and structural accents. It provides the "heavy" luxury weight formerly held by cocoa.
- **Secondary (Lavender Mist):** The primary background color. This ultra-light violet replaces the previous cream, providing a cool, serene surface that feels contemporary and clean.
- **Tertiary (Dusty Amethyst):** Used for subtle UI elements, secondary labels, and dividers. It acts as the bridge between the light backgrounds and dark text.
- **Neutral (Ink Plum):** A high-contrast charcoal with a purple undertone used for body text to maintain a cohesive tonal relationship across the interface.

**Functional Application:**
- **Plum-Deep** is reserved for headings and primary buttons.
- **Lavender-Mist** creates a "paper" effect for the primary canvas.
- **Royal-Violet** should be used for interactive hover states and highlights.

## Typography

This system maintains the "High-Low" typographic mix, pairing the romantic, high-contrast **Playfair Display** with the technical, geometric **Manrope**.

- **Headlines & Display:** Playfair Display is used to evoke a sense of tradition and timelessness. Larger sizes should use slightly tighter letter spacing to maintain visual tension and a modern editorial look.
- **Body & Interface:** Manrope provides a clean, neutral counter-balance to the serif headlines. It ensures high legibility for product descriptions and functional UI elements.
- **Labels:** Small caps and generous tracking in Manrope are used for categorization, creating a layout that feels organized and catalog-ready.

## Layout & Spacing

The layout utilizes a **Fixed Grid** philosophy on desktop to create a "framed" gallery effect. 

- **The Gallery Frame:** Large 64px outer margins act as white space frames, forcing the eye toward the center of the viewport and emphasizing the premium nature of the content.
- **Section Rhythm:** Massive 120px vertical gaps between major content blocks prevent the interface from feeling "crowded," encouraging a slow, deliberate scrolling experience.
- **Responsive Adaptation:**
  - **Desktop (1440px):** 12-column grid for complex product layouts.
  - **Tablet:** Transitions to an 8-column grid with reduced margins (40px).
  - **Mobile:** A 4-column fluid grid with 20px margins, ensuring content remains accessible and legible on smaller screens.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layering** and subtle atmospheric blurs rather than heavy shadows.

- **Surface Tiers:** Depth is communicated by placing dark Plum containers on Lavender Mist backgrounds. Higher-level surfaces (like modas or drawers) should use the Lavender Mist color with a backdrop blur effect.
- **Atmospheric Shadows:** When necessary, use extremely diffused shadows with a violet tint: `0px 10px 40px rgba(45, 27, 54, 0.05)`. This ensures shadows feel like part of the color palette rather than "dirty" grey blurs.
- **Glassmorphism:** Navigation bars use a 10px backdrop blur with 90% opacity of the Lavender Mist color to create a sense of transparency and lightness.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a subtle "human" touch to the geometric layout, echoing the softness of luxury fabrics.

- **Interactive Elements:** Buttons and input fields use a consistent 4px radius.
- **Media:** Product images should maintain the 4px radius to feel integrated with the UI elements.
- **Containers:** Large section containers or cards can use `rounded-lg` (8px) to soften the overall structure of the page.

## Components

### Buttons
- **Primary:** Solid `Primary` (Deep Plum) background with `Secondary` (Lavender Mist) text. Hover states should transition to `Royal Violet`.
- **Secondary/Ghost:** `Primary` color border (1px) with `Primary` text. Hover adds a 5% opacity Plum background tint.

### Input Fields
- **Editorial Style:** Use a 1px bottom-border only for lead-capture forms to maintain a minimalist look.
- **Functional Style:** Use a full 1px border in `Tertiary` color for checkout and technical forms. Labels are always positioned above the field in `label-sm` style.

### Product Cards
- **Minimalist Frame:** Borderless cards that rely on the image's 4px radius and generous padding to define their space.
- **Hover Interaction:** Subtle elevation shift or the appearance of a "Quick View" button in `Primary` color.

### Navigation
- **Centered Header:** Serif logo centered with Manrope navigation links flanking it or positioned below.
- **Sticky State:** Transparent Lavender Mist background with a light 1px bottom border in `Amethyst Soft` at 20% opacity.

### Chips & Badges
- Used for "New," "Silk," or "Limited Edition." 
- **Style:** `Lavender Mist` background with `Amethyst Soft` text and a thin 1px border for high-end detail.