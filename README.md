# AstraVeda Website

A modern, responsive Next.js website for AstraVeda - Quantum-Ready Ground Infrastructure platform.

## Features

- 🚀 Built with Next.js 14
- 🎨 Custom CSS (no Tailwind) with space/astro theme
- 📱 Fully responsive design with separate responsive CSS file
- ✨ Smooth animations and transitions
- 🌟 Light theme with space-inspired design
- 📝 Contact form with validation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
astroveda/
├── app/
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page component
├── styles/
│   ├── globals.css     # Global styles and theme
│   └── responsive.css  # Responsive breakpoints
├── package.json
├── tsconfig.json
└── next.config.js
```

## Customization

### Colors and Theme

Edit the CSS variables in `styles/globals.css`:

```css
:root {
  --primary-color: #1a1a2e;
  --accent-color: #0f3460;
  /* ... */
}
```

### Responsive Breakpoints

Modify breakpoints in `styles/responsive.css`:

- Mobile: < 576px
- Tablet: 768px - 991px
- Desktop: 992px+

## Features Implemented

✅ All content sections from the brief
✅ Hero section with animated starfield background
✅ Problem, Solution, Why It Matters sections
✅ Who It's For section
✅ Seed Round information
✅ Contact form (name, email, phone)
✅ Responsive navigation
✅ Smooth scroll animations
✅ Space-themed design elements

## Notes

- The contact form currently logs to console and shows an alert. You'll need to integrate with a backend service or email API for production.
- Images are placeholder/emoji-based. Replace with actual space-themed images as needed.
- Google Meet link in the contact section should be updated with your actual meeting link.

## License

Proprietary - AstraVeda Spacetech

