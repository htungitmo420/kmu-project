/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from "@/lib/i18n/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslations();

  const getFlag = (code: string) => {
    switch (code) {
      case 'vi': return 'vn';
      case 'en': return 'gb';
      case 'ru': return 'ru';
      case 'fr': return 'fr';
      default: return 'vn';
    }
  };

  return (
    <Select value={locale} onValueChange={(val) => { if (val) setLocale(val as 'vi' | 'en' | 'ru' | 'fr'); }}>
      <SelectTrigger className="w-[70px] bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm focus:ring-blue-500/30 rounded-xl transition-all h-9 px-3">
        <img src={`https://flagcdn.com/w20/${getFlag(locale)}.png`} srcSet={`https://flagcdn.com/w40/${getFlag(locale)}.png 2x`} width="20" alt={locale} className="rounded-sm shadow-[0_0_2px_rgba(0,0,0,0.2)]" />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden p-1 min-w-[140px]">
        <SelectItem value="vi" className="rounded-lg cursor-pointer py-2">
          <div className="flex items-center gap-3 w-full pr-2">
            <img src="https://flagcdn.com/w20/vn.png" srcSet="https://flagcdn.com/w40/vn.png 2x" width="20" alt="VN" className="rounded-sm shadow-[0_0_2px_rgba(0,0,0,0.2)]" />
            <span className="font-medium text-sm">Tiếng Việt</span>
          </div>
        </SelectItem>
        <SelectItem value="en" className="rounded-lg cursor-pointer py-2">
          <div className="flex items-center gap-3 w-full pr-2">
            <img src="https://flagcdn.com/w20/gb.png" srcSet="https://flagcdn.com/w40/gb.png 2x" width="20" alt="GB" className="rounded-sm shadow-[0_0_2px_rgba(0,0,0,0.2)]" />
            <span className="font-medium text-sm">English</span>
          </div>
        </SelectItem>
        <SelectItem value="ru" className="rounded-lg cursor-pointer py-2">
          <div className="flex items-center gap-3 w-full pr-2">
            <img src="https://flagcdn.com/w20/ru.png" srcSet="https://flagcdn.com/w40/ru.png 2x" width="20" alt="RU" className="rounded-sm shadow-[0_0_2px_rgba(0,0,0,0.2)]" />
            <span className="font-medium text-sm">Русский</span>
          </div>
        </SelectItem>
        <SelectItem value="fr" className="rounded-lg cursor-pointer py-2">
          <div className="flex items-center gap-3 w-full pr-2">
            <img src="https://flagcdn.com/w20/fr.png" srcSet="https://flagcdn.com/w40/fr.png 2x" width="20" alt="FR" className="rounded-sm shadow-[0_0_2px_rgba(0,0,0,0.2)]" />
            <span className="font-medium text-sm">Français</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
