import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { I18nProvider } from '@/lib/i18n/LanguageContext';
import { LanguageSwitcher } from '@/components/language-switcher';
import { HeaderNav } from '@/components/header-nav';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });
const playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Russian FIO Parser & Etiquette Guide',
  description: 'Анализатор русских ФИО и справочник по этикету обращений.',
  keywords: ['russian name parser', 'fio parser', 'russian etiquette', 'russian patronymic', 'tiếng nga', 'xưng hô tiếng nga', 'ФИО', 'русский язык'],
  openGraph: {
    title: 'Russian FIO Parser & Etiquette Guide',
    description: 'Инструмент для анализа русских ФИО и правил этикета. Công cụ tra cứu và phân tích cách xưng hô Tiếng Nga chuẩn mực.',
    url: 'https://rufio-parser.vercel.app',
    siteName: 'rUFIO Parser',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Russian FIO Parser & Etiquette Guide',
    description: 'Инструмент для анализа русских ФИО и правил этикета. Công cụ tra cứu và phân tích cách xưng hô Tiếng Nga chuẩn mực.',
  },
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.className} ${playfair.variable} min-h-screen bg-stone-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-900/40 dark:selection:text-blue-100`}>
        <I18nProvider>
          <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 transition-all duration-300">
            <div className="flex h-14 items-center justify-between px-6 rounded-full bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.03)] ring-1 ring-neutral-900/5 dark:ring-white/10">
              <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-blue-700 dark:text-blue-400 font-[family-name:var(--font-playfair)] tracking-tight hover:scale-105 active:scale-95 transition-transform">
                🇷🇺 <span className="hidden sm:inline-block">FIO Parser</span>
              </Link>
              <div className="flex items-center space-x-3 sm:space-x-5">
                <HeaderNav />
                <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-800" />
                <LanguageSwitcher />
              </div>
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-4 pt-28 pb-10 md:pt-36 md:pb-14">
            {children}
          </main>
        </I18nProvider>
      </body>
    </html>
  );
}
