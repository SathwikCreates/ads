# Ads | Intelligent Advertising Optimization

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

**Ads** is a next-generation marketing platform interface built with a **Gen-Z / Y2K Minimalist** aesthetic. It prioritizes massive typography, deep noise textures, glassmorphism, and fluid performance on all devices (mobile-first).

## ✨ Features

- **Gen-Z Aesthetic:** Massive serif typography (`8xl`+), acid green/neon accents, and retro-futurist vibes.
- **Glassmorphism:** Frosted glass cards and UI elements using `backdrop-blur` and white transparency.
- **Mobile-First Navigation:** "Minimal Floating Dock" menu inspired by iOS, optimized for iPhone SE and up.
- **Performance:** Hardware-accelerated animations (Framer Motion) and optimized WebGL elements.
- **Security Portal:** A dedicated, cyber-styled Transparency Center (`/security`) with compliance badges.
- **Pricing Engine:** Responsive pricing grid supporting Base, Premium, Enterprise, and Custom tiers.
- **Legal Hub:** Centralized Terms, Privacy, and AUP documentation with sticky navigation (`/terms`).

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **3D Elements:** [Cobe](https://github.com/shuding/cobe) (Globe)

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SathwikCreates/ads.git
    cd ads
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open locally:**
    Navigate to [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

- `/src/app` - App Router pages (Mental model: URL structure).
- `/src/components` - Reusable UI components.
  - `/blocks` - Large distinctive sections (Hero, Navbar, Logos).
  - `/ui` - Atomic shadcn/ui components.
- `/public` - Static assets (images, loops).

## 🎨 Theme System

- **Primary:** Slate-900 (Dark) / White (Light)
- **Accents:** Lime-400, Purple-500, Cyber Blue.
- **Typography:** Inter (Sans) + Serif (Display).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
