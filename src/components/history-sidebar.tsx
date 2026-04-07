'use client';

import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "@/lib/i18n/LanguageContext";

export function HistorySidebar({ onItemClick }: { onItemClick?: () => void }) {
  const { t } = useTranslations();
  const [mounted, setMounted] = useState(false);
  const { history, clearHistory, setCurrentResult, removeHistoryItem } = useAppStore();

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) return null;

  return (
    <Card className="h-full shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] border-neutral-200/50 dark:border-neutral-800/50 rounded-[2rem] bg-white/70 dark:bg-neutral-950/70 backdrop-blur-3xl overflow-hidden relative flex flex-col max-h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6 px-6 space-y-0 border-b border-neutral-100 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/20 shrink-0">
        <CardTitle className="text-2xl font-bold tracking-tight font-[family-name:var(--font-playfair)] text-neutral-900 dark:text-neutral-100">
          {t('history.title')}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={() => clearHistory()} aria-label="Xóa lịch sử" className="h-8 w-8 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 group transition-all">
          <Trash2 className="w-4 h-4 text-neutral-400 group-hover:text-red-500 transition-colors" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-4 flex-1 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">{t('history.empty')}</p>
        ) : (
          <ul className="space-y-3">
            {history.map((item, index) => (
              <li 
                key={item.timestamp}
                className="animate-in fade-in slide-in-from-right-4 fill-mode-both"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-full text-left bg-white dark:bg-neutral-900/80 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_20px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 group focus-within:ring-2 focus-within:ring-blue-500/40 relative">
                  <button 
                    onClick={() => {
                      setCurrentResult(item);
                      if (onItemClick) onItemClick();
                      setTimeout(() => {
                        const el = document.getElementById('result-card');
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 100;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="w-full h-full p-5 text-left focus:outline-none"
                  >
                    <p className="font-semibold text-lg text-blue-700 dark:text-blue-400 mb-2 truncate group-hover:text-blue-800 transition-colors pr-8">{item.original}</p>
                    <div className="flex gap-2 items-center text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <span className="font-medium bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md shrink-0">{item.gender !== 'UNKNOWN' ? (item.gender === 'M' ? t('result.gender.male') : t('result.gender.female')) : t('result.gender.unknown')}</span>
                      <span className="text-neutral-300 dark:text-neutral-700 shrink-0">•</span>
                      <span className="truncate">{item.lastName} {item.firstName}</span>
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeHistoryItem(item.timestamp);
                    }}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all bg-neutral-100 dark:bg-neutral-800 hover:bg-red-50 dark:hover:bg-red-900/40 text-neutral-400 hover:text-red-500 hover:scale-110 active:scale-95"
                    aria-label="Delete item"
                    title="Delete item"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
