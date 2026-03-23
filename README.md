# 🇷🇺 rUFIO Parser (Russian Name & Etiquette Guide)

A modern, responsive web application designed to seamlessly parse Russian full names (ФИО: Фамилия, Имя, Отчество) and provide highly contextual etiquette rules for addressing individuals in various scenarios (daily life, formal environments, official documents).

## ✨ Core Features

- **Intelligent FIO Parser**: Built-in heuristic algorithms (ported from production-grade bots) to split, validate, and analyze 1-token, 2-token, and 3-token Russian names.
- **Gender Inference**: Automatically predicts grammatical gender based on Cyrillic patronymic/last name suffixes to correctly adjust situational honorifics.
- **Short Name Dictionary**: Safely recommends appropriate diminutive/short names for close relationships utilizing a curated vocabulary system.
- **Etiquette Contextualizer**: Dynamic situational guides (Daily, Formal, Official, Chat) customized precisely to the parsed name outcome.
- **i18n Multi-Language Support**: Fully localized in Vietnamese (vi), English (en), Russian (ru), and French (fr) using a lightweight context-driven approach.
- **Local History Tracker**: Browsing history securely cached in the browser's local storage with interactive recovery panels.
- **Premium User Interface**: Crafted with Tailwind CSS and `shadcn/ui` focusing on clean minimalism, readable typography (`text-balance`), soft shadows, and precise micro-animations.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: `shadcn/ui`, Radix UI Primitives, Lucide Icons
- **State Management**: Zustand (with Persist Middleware)
- **Form Validation**: React Hook Form + Zod

## 📦 Getting Started

Install the dependencies and run the development server:

```bash
npm install
npm run dev
# or yarn / pnpm / bun equivalents
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the application.

## 🔧 Core Architecture

- **`src/lib/fio-parser.ts`**: The core logic engine driving Cyrillic string processing, fallback token arrangements, and suffix checking.
- **`src/data/wiki-data.ts`**: The structural content matrix that dynamically binds parsed identities to situational formatting.
- **`src/lib/i18n/`**: Custom dictionary provider that routes translation changes instantly globally.
- **`src/components/fio-form.tsx`**: Main interactive component orchestrating Zod validation with parsing results.