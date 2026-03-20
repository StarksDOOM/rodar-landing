# Rodar.do Landing Page

**Move at your own pace.** The Dominican Republic's premier car-sharing mobility platform, connecting vehicle owners with renters in a safe, verified, and 100% digital manner.

## 🇩🇴 Overview
Rodar.do is a "Coming Soon" portal featuring a cinematic Samaná-inspired UI. It provides institutional grounding for [FulCastle Holdings, Inc.](https://rodar.do) and manages bilingual waitlist capture and contact inquiries.

## 🚀 Built With
- **Vite + React 19** – Fast, modern frontend framework.
- **Tailwind CSS v4** – Utility-first styling with modern CSS features.
- **Framer Motion** – Smooth, premium UI animations and transitions.
- **Mailchimp** – Seamless waitlist subscription management.
- **Resend** – Reliable contact form email handling via serverless functions.
- **TypeScript** – Type-safe application development.

## 🛠 Features
- **Cinematic UI**: Atmospheric Samaná-inspired visuals with glassmorphism and premium motion design.
- **Bilingual Support**: Full English and Spanish localization for a global and local audience.
- **Waitlist Integration**: Securely capture potential user emails through Mailchimp.
- **Contact Form**: Direct institutional inquiries powered by Resend API.
- **Vercel-Ready**: Pre-configured with serverless functions and routing for immediate deployment.

## 🏗 Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/StarksDOOM/rodar-landing.git
    cd rodar-landing
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Rename `.env.example` to `.env` and fill in the required API keys:
    ```dotenv
    MAILCHIMP_API_KEY=your_mailchimp_key
    MAILCHIMP_SERVER_PREFIX=usX
    MAILCHIMP_LIST_ID=your_audience_id
    RESEND_API_KEY=your_resend_key
    ```

4.  **Run locally:**
    ```bash
    npm run dev
    ```

## 🚢 Deployment
The project is optimized for **Vercel**. 
- Serverless functions are located in the `api/` directory.
- `vercel.json` handles the necessary routing for the Single-Page Application (SPA) structure.

## ⚖ Institutional Note
Operated by **FulCastle Holdings, Inc.** under Law 63-17 for Mobility, Land Transport, Traffic and Road Safety of the Dominican Republic.

---
© 2026 Rodar.do | FulCastle Holdings, Inc. Dover, DE 19901
