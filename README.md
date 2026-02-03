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

5.  **Backend setup (Prisma):**
    ```bash
    npx prisma db push
    ```
    This updates the local SQLite database with the new backend tables.

6.  **Required environment variables:**
    Update `.env` with:
    - `OPENAI_API_KEY` (for AI generation)
    - `TOKEN_ENCRYPTION_KEY` (32 bytes base64)
    - `RESEND_API_KEY` + `SMTP_FROM` (recommended) OR `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` (email verification + password reset)
    - `APP_URL` (for verification/reset links)
    - OAuth credentials per platform (Google/Meta/TikTok)
    - Optional `USE_MOCK_PLATFORM_DATA=true` for demo data

## 📂 Project Structure

- `/src/app` - App Router pages (Mental model: URL structure).
- `/src/components` - Reusable UI components.
  - `/blocks` - Large distinctive sections (Hero, Navbar, Logos).
  - `/ui` - Atomic shadcn/ui components.
- `/public` - Static assets (images).

## 🧩 Backend Services (API)

The backend is implemented via Next.js App Router API routes:

- `GET /api/integrations` - list connected ad accounts
- `GET /api/integrations/:platform/connect` - get OAuth connect URL
- `GET /api/integrations/:platform/callback` - OAuth callback handler
- `POST /api/integrations/:platform/disconnect` - disconnect an account
- `POST /api/sync/run` - run data sync for connected accounts
- `GET /api/analytics/summary` - aggregate metrics for dashboard
- `GET /api/analytics/series` - time series metrics
- `GET /api/campaigns` - list campaigns
- `POST /api/ai/creative` - AI ad creative + optional image/video
- `POST /api/ai/insights` - generate AI insight for a campaign
- `POST /api/ai/coach` - AI coach chat endpoint

## 🔐 Auth Features

- Email/password signup with verification email
- Password reset flow
- Social login (Google + Facebook)

## 🎨 Theme System

- **Primary:** Slate-900 (Dark) / White (Light)
- **Accents:** Lime-400, Purple-500, Cyber Blue.
- **Typography:** Inter (Sans) + Serif (Display).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
