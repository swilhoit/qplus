# Q+ Library Style Guide

## Brand Colors

### Primary Colors
- **Forest Green**: `#2D5016` - Primary brand color for CTAs, links, and emphasis
- **Beige**: `#F5E6D3` - Warm neutral for backgrounds and subtle accents
- **White**: `#FFFFFF` - Clean backgrounds and text on dark
- **Black**: `#000000` - Primary text and high contrast elements

### Color Palette Implementation
```css
--color-forest: #2D5016;
--color-forest-light: #3A6B1E;
--color-forest-dark: #1F3A0F;
--color-beige: #F5E6D3;
--color-beige-light: #FAF4EC;
--color-beige-dark: #E8D4B8;
--color-white: #FFFFFF;
--color-black: #000000;
--color-gray-900: #111111;
--color-gray-700: #333333;
--color-gray-500: #666666;
--color-gray-300: #CCCCCC;
--color-gray-100: #F5F5F5;
```

## Typography

### Font Family
- **Headings**: Montserrat, sans-serif (Bold weight)
- **Body**: Montserrat, sans-serif (Regular weight)

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Type Scale
- **H1**: 48px / 700 weight / 1.2 line-height
- **H2**: 36px / 700 weight / 1.3 line-height
- **H3**: 28px / 700 weight / 1.4 line-height
- **H4**: 24px / 600 weight / 1.4 line-height
- **H5**: 20px / 600 weight / 1.5 line-height
- **Body Large**: 18px / 400 weight / 1.6 line-height
- **Body**: 16px / 400 weight / 1.6 line-height
- **Body Small**: 14px / 400 weight / 1.5 line-height
- **Caption**: 12px / 400 weight / 1.4 line-height

## Component Styles

### Buttons

#### Primary Button
- Background: Forest Green
- Text: White
- Hover: Forest Green Dark
- Font: 16px / 600 weight

#### Secondary Button
- Background: Transparent
- Border: 2px Forest Green
- Text: Forest Green
- Hover: Forest Green background, White text

#### Ghost Button
- Background: Transparent
- Text: Forest Green
- Hover: Beige background

### Cards
- Background: White
- Border: 1px Beige Dark
- Shadow: Subtle (0 1px 3px rgba(0,0,0,0.1))
- Border Radius: 8px

### Forms
- Input Background: White
- Input Border: Beige Dark
- Focus Border: Forest Green
- Label: Black, 14px, 500 weight

### Navigation
- Background: White
- Border Bottom: 1px Beige
- Active Link: Forest Green
- Hover: Forest Green Light

## Spacing System
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

## Border Radius
- sm: 4px
- md: 8px
- lg: 16px
- full: 9999px

## Shadows
- sm: 0 1px 2px rgba(0,0,0,0.05)
- md: 0 1px 3px rgba(0,0,0,0.1)
- lg: 0 4px 6px rgba(0,0,0,0.1)
- xl: 0 10px 15px rgba(0,0,0,0.1)

## Usage Examples

### Page Headers
```jsx
<h1 className="text-5xl font-bold text-black font-montserrat">
  Page Title
</h1>
```

### Primary CTA Button
```jsx
<button className="bg-forest text-white px-6 py-3 rounded-md font-semibold hover:bg-forest-dark">
  Get Started
</button>
```

### Content Card
```jsx
<div className="bg-white border border-beige-dark rounded-lg p-6 shadow-md">
  <h3 className="text-2xl font-bold text-black mb-2">Card Title</h3>
  <p className="text-gray-700">Card content...</p>
</div>
```

## Accessibility
- Maintain WCAG AA contrast ratios
- Forest Green on White: 7.9:1 ✓
- Black on Beige: 15.7:1 ✓
- White on Forest Green: 7.9:1 ✓