'use client';

import { FIOForm } from "@/components/fio-form";
import { HistorySidebar } from "@/components/history-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { History } from "lucide-react";
import { useTranslations } from "@/lib/i18n/LanguageContext";
import { useState } from "react";

export default function Home() {
  const { t } = useTranslations();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-8 lg:space-y-12 items-center lg:items-start justify-center w-full max-w-[1100px] mx-auto">

      {/* Header Area */}
      <div className="w-full lg:max-w-2xl flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-5 text-neutral-900 dark:text-neutral-50 drop-shadow-sm font-[family-name:var(--font-playfair)]">
            {t('app.title')} <br className="hidden md:inline" />
            <span className="text-blue-600 dark:text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              {t('app.subtitle')}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium max-w-xl">
            {t('app.description')}
          </p>
        </div>

        <div className="lg:hidden shrink-0">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <div className="w-full md:w-auto shadow-sm rounded-xl border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 gap-2 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all active:scale-[0.98] inline-flex items-center justify-center h-10 px-4 py-2">
                <History className="w-4 h-4 mr-2" />
                {t('history.title')}
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl pt-10 px-4 bg-gray-50/95 backdrop-blur-xl dark:bg-neutral-950/95 border-none shadow-2xl">
              <HistorySidebar onItemClick={() => setIsSheetOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 w-full items-start justify-between">
        <div className="flex-1 w-full lg:max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
          <FIOForm />
        </div>

        <div className="hidden lg:block w-96 flex-shrink-0 sticky top-24 animate-in fade-in slide-in-from-right-8 duration-700 ease-out fill-mode-both delay-150">
          <HistorySidebar />
        </div>
      </div>

    </div>
  );
}
