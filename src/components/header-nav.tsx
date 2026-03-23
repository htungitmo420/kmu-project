'use client';

import Link from "next/link";
import { useTranslations } from "@/lib/i18n/LanguageContext";

export function HeaderNav() {
  const { t } = useTranslations();

  return (
    <nav className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm font-medium">
      <Link href="/" className="whitespace-nowrap transition-colors text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400">
        {t('nav.home') || 'Trang chủ'}
      </Link>
      <Link href="/wiki" className="whitespace-nowrap transition-colors text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400">
        {t('nav.wiki') || 'Cẩm nang'}
      </Link>
      <Link href="/about" className="whitespace-nowrap transition-colors text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400">
        {t('nav.about') || 'Giới thiệu'}
      </Link>
    </nav>
  );
}
