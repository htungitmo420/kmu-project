# 🇷🇺 rUFIO Parser & Etiquette Guide

A modern, highly-responsive web application designed to seamlessly parse Russian full names (ФИО: Фамилия, Имя, Отчество) and provide context-rich etiquette rules for addressing individuals dynamically across daily life, formal environments, and official documents.

## ✨ Features

- **Intelligent FIO Engine**: Built-in heuristic algorithms to split, validate, and analyze 1-token, 2-token, and 3-token Russian names under complex layouts.
- **Gender Inference & Diminutives**: Automatically predicts grammatical gender based on Cyrillic patronymic suffixes to adjust honorifics, alongside a curated dictionary for diminutive/short name recommendations.
- **Dynamic Etiquette Contextualizer**: Generates formatting rules specifically targeted at your parsed name, covering informal chats, business emails, and official guidelines.
- **Interactive Quiz Minigame**: A tiered knowledge test with dynamic confetti fireworks and gold/silver/bronze medal rankings to challenge your Russian etiquette proficiency.
- **Immersive UI/UX Design**: Uses experimental View Transition APIs for satisfying ripple-effect Light/Dark mode toggling. Features a global "breathing", translucent ambient blurred background choreographed across all routes.
- **Pro-grade SEO Architecture**: End-to-end `JSON-LD` `EducationalApplication` Structured Data, robust Next.js localized `alternates` metadata, `robots.txt`, `sitemap.xml`, and strict Semantic HTML `<h1-2>` structures.
- **Native i18n Localization**: Fully translated and client-ready in Vietnamese (`vi`), English (`en`), Russian (`ru`), and French (`fr`).
- **Smart History Tracking**: Keeps a localized, stylishly-scrollable cache of up to 10 recent parsed identities for rapid UX recovery.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router, Strict Native SEO Generation)
- **Styling**: Tailwind CSS v4 + native Oklch variables
- **Components & Micro-interactions**: `shadcn/ui`, Radix UI, Canvas Confetti, and View Transitions API
- **State Management**: Zustand (Persist Middleware)
- **Form Architecture**: React Hook Form + Zod Object Schemas

## 📦 Getting Started

Install the dependencies and run the development server:

```bash
npm install
npm run dev
# or yarn / pnpm / bun equivalents
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🤝 Project Team

Developed with 💖 from **ITMO University**:
- [Nguyễn Hoàng Tùng (@htungitmo420)](https://github.com/htungitmo420)
- [Nguyễn Văn Chính (@chinhtx04)](https://github.com/chinhtx04)
- [Phan Tấn Dũng (@TanDung233)](https://github.com/TanDung233)