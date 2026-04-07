'use client';

import Link from "next/link";
import { useTranslations } from "@/lib/i18n/LanguageContext";

export function HeaderNav() {
  const { t } = useTranslations();

  const navItems = [
    { href: '/', label: t('nav.home') || 'Trang chủ', className: 'text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400' },
    { href: '/wiki', label: t('nav.wiki') || 'Cẩm nang', className: 'text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400' },
    { href: '/quiz', label: t('nav.quiz') || 'Minigame', className: 'font-black animate-led hover:scale-105 transition-transform' },
  ];

  return (
    <nav className="flex flex-1 min-w-0 flex-nowrap items-center justify-end gap-3 sm:gap-6 text-[13px] sm:text-sm font-medium overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] px-1">
      {navItems.map((item) => (
        <Link 
          key={item.href} 
          href={item.href} 
          className={`whitespace-nowrap transition-colors active:scale-95 ${item.className}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
