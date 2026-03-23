'use client';

import Link from "next/link";
import { useTranslations } from "@/lib/i18n/LanguageContext";

export function HeaderNav() {
  const { t } = useTranslations();

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      <Link href="/" className="transition-colors text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400">
        {t('nav.home') || 'Trang chủ'}
      </Link>
      <Link href="/wiki" className="transition-colors text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400">
        {t('nav.wiki') || 'Cẩm nang'}
      </Link>
      <Link href="/about" className="transition-colors text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400">
        {t('nav.about') || 'Giới thiệu'}
      </Link>
    </nav>
  );
}
