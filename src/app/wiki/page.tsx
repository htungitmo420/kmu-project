'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Coffee, Briefcase, FileText, MessageCircle, AlertCircle } from 'lucide-react';
import { useAppStore } from "@/lib/store";
import { getDynamicWikiContext } from "@/data/wiki-data";
import { useTranslations } from "@/lib/i18n/LanguageContext";

export default function WikiPage() {
  const { currentResult } = useAppStore();
  const { t, locale } = useTranslations();
  const wikiData = getDynamicWikiContext(currentResult, locale as "vi" | "en" | "ru" | "fr");

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'coffee': return <Coffee className="w-6 h-6 text-orange-500" />;
      case 'briefcase': return <Briefcase className="w-6 h-6 text-blue-500" />;
      case 'file-text': return <FileText className="w-6 h-6 text-red-500" />;
      case 'message-circle': return <MessageCircle className="w-6 h-6 text-green-500" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <main className="max-w-5xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-6 pt-12 pb-8">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-neutral-900 dark:text-neutral-50 flex flex-col items-center justify-center gap-4 font-[family-name:var(--font-playfair)] drop-shadow-sm">
          <span className="p-4 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] border border-neutral-100 dark:border-neutral-800">
            <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </span>
          {t('wiki.header.title')}
        </h1>
        <p className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
          {t('wiki.header.desc')}
        </p>
      </div>

      <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl border border-blue-100/60 dark:border-blue-900/40 rounded-[2rem] p-5 flex items-start gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] ring-1 ring-blue-500/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-blue-50 dark:bg-blue-950/50 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/50 shrink-0">
          <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="space-y-1.5 pt-0.5">
          <h3 className="font-bold text-blue-900 dark:text-blue-100 text-lg tracking-tight">{t('wiki.dynamic.title')}</h3>
          <p className="text-sm md:text-base text-blue-800/80 dark:text-blue-300 font-medium leading-relaxed">
            {currentResult 
              ? t('wiki.dynamic.active').replace('{name}', currentResult.original)
              : t('wiki.dynamic.empty')}
          </p>
        </div>
      </div>

      {/* Quick Navigation Menu */}
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 lg:gap-3 py-2 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
        {wikiData.map((category) => (
          <a
            key={`nav-${category.categoryId}`}
            href={`#${category.categoryId}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(category.categoryId);
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 120;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2.5 px-5 py-3 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 rounded-full text-[13px] md:text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-50/80 dark:hover:bg-blue-900/30 transition-all active:scale-[0.97] shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)] hover:-translate-y-0.5"
          >
            <span className="shrink-0 scale-[0.8] opacity-70">{getIcon(category.icon)}</span>
            {category.title}
          </a>
        ))}
      </div>

      <div className="space-y-16">
        {wikiData.map((category) => (
          <section key={category.categoryId} id={category.categoryId} className="space-y-6 pt-4">
            <div className="border-b border-neutral-200/60 dark:border-neutral-800/60 pb-4 space-y-2.5">
              <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3.5 text-neutral-900 dark:text-neutral-100 font-[family-name:var(--font-playfair)] tracking-tight">
                <span className="p-2.5 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm">{getIcon(category.icon)}</span>
                {category.title}
              </h2>
              <p className="text-lg text-neutral-500 dark:text-neutral-400 font-medium max-w-3xl leading-relaxed">{category.description}</p>
            </div>
            
            <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
              {category.contexts.map((ctx) => (
                <Card key={ctx.id} className="flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.01)] dark:hover:shadow-[0_20px_40px_rgb(255,255,255,0.03)] bg-white/70 dark:bg-neutral-950/70 backdrop-blur-3xl border-neutral-200/50 dark:border-neutral-800/50 rounded-3xl overflow-hidden transition-all duration-500 group hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-b from-neutral-50/50 to-transparent dark:from-neutral-900/30 pb-5 pt-6 px-6 md:px-8 border-b border-neutral-100 dark:border-neutral-800/50">
                    <CardTitle className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-[family-name:var(--font-playfair)] group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{ctx.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6 px-6 md:px-8 pb-8 flex-1 flex flex-col">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2.5">{t('wiki.rule')}</p>
                      <p className="text-neutral-700 dark:text-neutral-300 font-medium text-lg leading-relaxed">{ctx.rule}</p>
                    </div>
                    <div className="bg-blue-50/50 dark:bg-blue-900/10 p-5 md:p-6 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors mt-auto relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 dark:bg-blue-600 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3 pl-1">{t('wiki.example')}</p>
                      <p className="text-blue-900 dark:text-blue-100 font-mono text-base md:text-lg leading-relaxed pl-1">&quot;{ctx.example}&quot;</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
