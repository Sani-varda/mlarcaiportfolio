# SANI VARADA // PORTFOLIO & WORK DOSSIER

[![Next.js](https://img.shields.io/badge/Next.js-16.2.7-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-20232a?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=flat-square&logo=vercel)](https://vercel.com)

An immersive, high-performance interactive web dossier showcasing the design and engineering work of Sani Varada, AI/ML Architect and Quantitative Analyst. 

This website features a high-contrast, professional light-blue visual theme built using Next.js 16 (App Router, Turbopack) and Tailwind CSS v4. The experience integrates dual scroll-jacking cinematic canvas engines, a 1200vh horizontal dossier layout, word-by-word scroll-driven text reveals, and a vertical scrolling sidebar with glassmorphic masking.

---

## Repository Metadata Tags

* **Core Stack:** `nextjs-16` `react-19` `typescript-5` `tailwindcss-v4`
* **Performance Engines:** `html5-canvas` `request-animation-frame` `state-throttling` `image-preloading`
* **Layout Design:** `horizontal-scroll` `scroll-jacking` `glassmorphism` `custom-theme-color`
* **SEO & Generative Engine Optimization (GEO):** `schema-ld-json` `sitemap-xml` `robots-txt` `meta-canonical` `google-search-console` `bing-webmaster`
* **Target Environment:** `vercel-hosting` `production-ready`

---

## Architecture & Technical Tags

| Category | Associated Technologies & Features |
| :--- | :--- |
| **Frontend Framework** | `nextjs-16` `react-19` `app-router` `turbopack` |
| **Logic & Types** | `typescript-5` `es6-javascript` |
| **Styling & Layout** | `tailwindcss-v4` `css-variables` `responsive-grid` `flexbox` |
| **Animations** | `gsap` `canvas-scrubbing` `request-animation-frame` `parallax` |
| **Data & SEO** | `schema-ld-json` `sitemap-xml` `robots-txt` `meta-canonical` |
| **Hosting & CI/CD** | `vercel-deploy` `git-pipelines` |

---

## Key Features

* **Dual Scroll-Driven Canvas Engines:** Implements high-performance HTML5 canvas rendering to scrub frame-by-frame through 240-frame 1080p animation sequences, optimized via state throttling and frame preloading.
* **1200vh Dossier Layout:** Jacked vertical window scrolling translated into horizontal slide animations across 7 bespoke dossiers:
  1. **Profile & Credentials:** Editorial profile layout featuring a responsive portrait, CSS-first grid systems, and core competencies list.
  2. **Personal Case Studies:** Detailed technical breakdowns of ML pipelines, RAG systems, and volatility forecasting models with an interactive tabbed layout.
  3. **Agency Case Studies (ML Arc):** Live client case studies mapping lead Qualification Voice Agents, CAC/ROAS optimizations, and support automation systems.
  4. **Quantitative Trading:** Deep dive into algorithmic trading, GARCH/LSTM volatility forecasting, index options regime detection, and the Hermes Autonomous Agent execution monitor.
  5. **Services:** Core software agency capabilities and solutions.
  6. **Lead Intake Portal:** Dedicated interactive contact dossier routing client parameters directly to Sani Varada.
  7. **Downloads & Contact:** Integrated offline dossiers download links (PDF Curriculum Vitae and Agency Dossier) and high-contrast contact links.
* **Word-by-Word Reveal Animation:** Leverages passive requestAnimationFrame window scroll calculations to reveal paragraph text sequentially as each slide enters the viewport.
* **Vertical Marquee Sidebar:** A glassmorphic capsule containing scrolling social links moving in an upside-down vertical marquee loop, with hover-to-pause capability.
* **Favicon Integration:** Custom Crisp SVG favicon utilizing Sani's monogram vector logo.
* **SEO & Accessibility (A11y):** Optimized for search engines using rich JSON-LD schema metadata (Person / Organization), dynamic sitemap/robots configurations, and WCAG AA contrast compliance.

---

## Tech Stack

* **Core Framework:** Next.js 16.2.7 (App Router, Turbopack enabled)
* **Runtime / Logic:** React 19.2.4 & TypeScript 5
* **Styling & Theme:** Tailwind CSS v4 (CSS-first configuration with custom @theme utilities)
* **Animation & Rendering:** GSAP / @gsap/react, HTML5 canvas, and native requestAnimationFrame hooks
* **Icons Library:** react-icons (Font Awesome 6) & lucide-react
* **Text Scrolling:** react-fast-marquee (for looping text layouts)

---

## Project Architecture

```text
├── public/
│   ├── images/
│   │   ├── sequence/         # Base sequence assets
│   │   ├── sequence1/        # 240-frame sequence PNG assets for scroll scene 2
│   │   ├── sequence2/        # 240-frame sequence PNG assets for scroll scene 1
│   │   ├── Cinematic_portrait_with_high-contrast_dual-tone_202606090311 (2).jpeg
│   │   ├── Cinematic_portrait_with_high-contrast_dual-tone_202606090311.jpeg
│   │   ├── Cinematic_portrait_with_high-contrast_dual-tone_202606090312.jpeg
│   │   └── algorithmic_strategies.png
│   ├── logo.svg              # Sani Varada Vector Monogram
│   ├── image.png             # Hermes Agent Graphic Banner
│   ├── Sani_V.pdf            # Offline CV publication
│   └── ML_Arc_Case_Studies.pdf
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── leads/
│   │   │       └── route.ts  # Lead submission handler API
│   │   ├── globals.css       # Core design system, @theme configurations, custom animations
│   │   ├── icon.svg          # Crisp SVG Favicon configuration
│   │   ├── layout.tsx        # Next.js Metadata, SEO tags, JSON-LD, and font mapping
│   │   ├── page.tsx          # Main entry, scroll jackers, horizontal carousel, and panel contents
│   │   ├── robots.ts         # Dynamic Robots.txt configuration route
│   │   └── sitemap.ts        # Dynamic Sitemap.xml configuration route
│   └── components/
│       ├── ImageSequenceCanvas.tsx  # Optimized canvas preloader & drawing engine
│       └── ui/
│           └── mountain-vista-bg.tsx # Parallax vista background component
├── tsconfig.json
└── package.json
```

---

## Prerequisites

Before setting up the project locally, ensure you have:
* **Node.js:** v20.x or higher
* **Package Manager:** npm (v10+) or pnpm/yarn

---

## Environment Configuration

To configure the email address where leads will be forwarded, create a `.env.local` file in the root directory:

```env
LEAD_NOTIFICATION_EMAIL=founder@mlarcai.com
```

*Note: If LEAD_NOTIFICATION_EMAIL is not defined, the forwarder defaults to founder@mlarcai.com. In addition, all submitted leads are automatically saved locally inside /leads.json (git-ignored for security) and logged to the server terminal, ensuring no submissions are lost.*

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Sani-varda/mlarcaiportfolio.git
cd mlarcaiportfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser to view the interactive application.

### 4. Build for Production
To generate an optimized production build:
```bash
npm run build
```

---

## Technical Implementation Details

### Optimized Canvas Drawing (ImageSequenceCanvas.tsx)
The canvas preloader prevents heavy CPU lag during initial frames preloading:
1. **State Throttling:** Instead of triggering a React re-render for every single preloaded frame, state updates are throttled (e.g., every 15 frames + the final completion frame), reducing mount render passes by 93%.
2. **Context Caching:** Stored frame images are drawn directly onto a hidden HTML5 canvas context and swapped instantly on scroll updates.

### requestAnimationFrame Scroll Listener
Scroll checking is bound to a passive listener throttled using the browser's requestAnimationFrame ticking loop. This decouples scroll position checking from immediate state renders, keeping scrolling at a smooth 60fps/120fps.

### CSS Mask-Image Sidebar
The vertical floating marquee utilizes a CSS -webkit-mask-image linear gradient to fade icons out towards the top and bottom borders of the sidebar, achieving a premium glassmorphic lens refraction look:
```css
.mask-gradient-vertical {
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
}
```

---

## Troubleshooting & Optimization

* **Missing Canvas Images:** If the animation sequences do not load, verify that the directories public/images/sequence1/ and public/images/sequence2/ contain frames formatted as ezgif-frame-001.png to ezgif-frame-240.png.
* **Hydration Mismatches:** The timezone clock uses a client-side useEffect hook to resolve initial rendering differences between Server-Side Rendering (SSR) and Client-Side Hydration.
* **Build Errors:** If react-icons throws an import error, verify that the packages match react-icons: ^5.6.0 or higher, which supports Font Awesome 6 (react-icons/fa6).

---

## License & Attribution
* **Copyright:** Copyright 2026 SANI VARADA / ML Arc. All rights reserved.
