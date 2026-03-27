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
      <SelectTrigger className="w-[60px] h-8 px-2.5 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm focus:ring-blue-500/30 rounded-full transition-all [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:opacity-70">
        <img src={`https://flagcdn.com/w20/${getFlag(locale)}.png`} srcSet={`https://flagcdn.com/w40/${getFlag(locale)}.png 2x`} width="20" alt={locale} className="rounded-[2px] shadow-[0_0_2px_rgba(0,0,0,0.2)] object-cover" />
      </SelectTrigger>
      <SelectContent className="rounded-2xl border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden p-1 min-w-[130px] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl">
        <SelectItem value="vi" className="rounded-xl cursor-pointer py-2">
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
