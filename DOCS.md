# Rodar Landing Documentation

This document provides a high-level overview of the **Rodar Landing** project architecture, its core features, and the deployment process.

---

## 🏗 Architecture Overview

The project is built as a **Single Page Application (SPA)** using **React**, **Vite**, and **Tailwind CSS**. It is designed to be highly performant, accessible, and visually stunning.

### Frontend
- **Framework**: React 18
- **Styling**: Vanilla CSS + Tailwind CSS for utility-first styling.
- **Animations**: `motion/react` (formerly framer-motion) for cinematic transitions and hover effects.
- **I18n**: Custom lightweight translation system ([src/lib/i18n.ts](file:///c:/Users/Leo%20Fulgencio/Projects/rodar-landing/src/lib/i18n.ts)) supporting English and Spanish.

### Backend (Serverless)
The project uses **Vercel Serverless Functions** located in the `/api` directory:
- **`api/subscribe.ts`**: Handles waitlist signups by integrating with the **Mailchimp Marketing API**.
- **`api/contact.ts`**: Processes contact form submissions using **Resend** to send notification emails.

---

## 🌍 Internationalization (i18n)

Translations are managed in JSON files within `src/locales/`.
The `getTranslations` helper function in `src/lib/i18n.ts` retrieves the correct dictionary based on the application state.

---

## 🚀 Deployment & Pipelines

The project is hosted on **Vercel**.

### Configuration
- **`vercel.json`**: Configures the SPA rewrite rules and explicitly sets the build output directory to `dist/`.
- **`vite.config.ts`**: Optimized for production, utilizing native `tsconfigPaths` for clean module imports.

### Environment Variables
The following keys are required for full functionality:
- `RESEND_API_KEY`: For the contact form.
- `MAILCHIMP_API_KEY`: For waitlist subscriptions.
- `MAILCHIMP_SERVER_PREFIX`: (e.g., `us18`) Mailchimp data center prefix.
- `MAILCHIMP_LIST_ID`: The specific audience ID for the waitlist.

---

## 📈 Analytics

The project integrates **Vercel Analytics** (`@vercel/analytics`). It is initialized in `src/main.tsx` and tracks visitor metrics automatically when deployed to Vercel.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Vite** | Build Tool & Dev Server |
| **React** | Component Library |
| **Lucide React** | Iconography |
| **Resend** | Email Delivery |
| **Mailchimp** | Audience Management |
| **Shadcn/UI** | Core Component Primitives |
