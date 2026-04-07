import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { I18nProvider } from '@/lib/i18n/LanguageContext';
import { LanguageSwitcher } from '@/components/language-switcher';
import { HeaderNav } from '@/components/header-nav';
import { Footer } from '@/components/footer';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });
const playfair = Playfair_Display({ subsets: ['latin', 'cyrillic'], variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL('https://rufio-parser.vercel.app'),
  title: 'Russian FIO Parser & Etiquette Guide',
  description: 'Анализатор русских ФИО и справочник по этикету обращений.',
  keywords: ['russian name parser', 'fio parser', 'russian etiquette', 'russian patronymic', 'tiếng nga', 'xưng hô tiếng nga', 'ФИО', 'русский язык'],
  alternates: {
    canonical: '/',
    languages: {
      'vi-VN': '/',
      'ru-RU': '/',
      'en-US': '/',
      'fr-FR': '/',
    },
  },
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
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} ${playfair.variable} min-h-screen flex flex-col bg-stone-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-900/40 dark:selection:text-blue-100 relative`}>
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-indigo-500/30 dark:bg-indigo-600/30 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-pulse" style={{ animationDuration: '7s' }} />
          <div className="absolute top-[20%] right-[-10%] w-[45rem] h-[45rem] bg-rose-500/30 dark:bg-rose-500/30 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }} />
          <div className="absolute bottom-[-10%] left-[20%] w-[50rem] h-[50rem] bg-blue-500/30 dark:bg-blue-600/30 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-pulse" style={{ animationDuration: '11s', animationDelay: '4s' }} />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Russian FIO Parser",
              "url": "https://rufio-parser.vercel.app",
              "description": "Công cụ tra cứu, bóc tách họ tên Tiếng Nga và cẩm nang giao tiếp chuẩn mực. Анализатор русских ФИО.",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <I18nProvider>
          <header className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-2 sm:px-4 transition-all duration-300">
            <div className="flex h-14 items-center justify-between px-3 sm:px-5 rounded-[2rem] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg ring-1 ring-neutral-900/5 dark:ring-white/10">
              <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3 mr-2 sm:mr-6 group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white font-black text-xs sm:text-sm shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                  RU
                </div>
                <span className="hidden sm:inline-block font-bold text-lg text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-playfair)] tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  FIO Parser
                </span>
              </Link>
              <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end min-w-0">
                <HeaderNav />
                <div className="hidden sm:block w-px h-5 bg-neutral-200 dark:bg-neutral-800 shrink-0 mx-1 sm:mx-2" />
                <div className="shrink-0 flex items-center gap-1.5 sm:gap-2">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 pt-28 pb-10 md:pt-36 md:pb-14">
            {children}
          </main>
          <Footer />
        </I18nProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
