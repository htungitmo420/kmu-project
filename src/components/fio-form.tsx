'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { parseFIO, FIOSchema } from "@/lib/fio-parser";
import { useAppStore } from "@/lib/store";
import { getShortNames } from "@/data/russian-short-names";
import { useTranslations } from "@/lib/i18n/LanguageContext";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function FIOForm() {
  const { t } = useTranslations();
  const { addHistory, currentResult } = useAppStore();
  const [showShortNames, setShowShortNames] = useState(false);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof FIOSchema>>({
    resolver: zodResolver(FIOSchema),
    defaultValues: {
      fullName: "",
    },
  });

  const getGenderText = (gender: string) => {
    if (gender === 'M') return t('result.gender.male');
    if (gender === 'F') return t('result.gender.female');
    return t('result.gender.unknown');
  };

  const getStatusBadge = (res: { isRussian?: boolean; lastName?: string | null; firstName?: string | null; patronymic?: string | null; gender?: string; } | null) => {
    if (!res || !res.isRussian) return null;
    if (res.lastName && res.firstName && res.patronymic) {
      if (res.gender !== 'UNKNOWN') {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/30 transition-colors">
            {t('status.success')}
          </span>
        );
      }
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/30 transition-colors">
          {t('status.ambiguous')}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/30 transition-colors">
        {t('status.incomplete')}
      </span>
    );
  };

  // Sync the form's input when a history item is clicked and currentResult changes
  useEffect(() => {
    if (currentResult && currentResult.original) {
      setValue("fullName", currentResult.original);
      setTimeout(() => setShowShortNames(false), 0); // Reset the short names toggle
    }
  }, [currentResult, setValue]);

  function onSubmit(values: z.infer<typeof FIOSchema>) {
    const parsed = parseFIO(values.fullName);
    addHistory(parsed);
    setShowShortNames(false);
    
    setTimeout(() => {
      const el = document.getElementById('result-card');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] border-neutral-200/50 dark:border-neutral-800/50 rounded-[2rem] overflow-hidden bg-white/70 dark:bg-neutral-950/70 backdrop-blur-2xl hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(255,255,255,0.04)] transition-all duration-500 relative">
        <CardHeader className="pb-6 pt-8 px-6 md:px-8">
          <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight font-[family-name:var(--font-playfair)]">{t('form.title')}</CardTitle>
          <CardDescription className="text-base font-medium text-neutral-500 dark:text-neutral-400 mt-2">{t('form.description')}</CardDescription>
        </CardHeader>
        <CardContent className="px-6 md:px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className={errors.fullName ? "text-red-500" : ""}>{t('form.label')}</Label>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: t('form.error.empty') }}
                render={({ field }) => (
                  <Input 
                    {...field} 
                    id="fullName" 
                    placeholder={t('form.placeholder')} 
                    className={`rounded-2xl h-14 px-5 text-lg bg-white/50 dark:bg-neutral-900/50 border-neutral-200/80 dark:border-neutral-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500 focus-visible:bg-white dark:focus-visible:bg-neutral-900 focus-visible:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-blue-300 dark:hover:border-blue-700 ${errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                )}
              />
              {errors.fullName && (
                <p className="text-sm font-medium text-red-500 animate-in fade-in slide-in-from-top-1 duration-300">{t('form.error.empty')}</p>
              )}
            </div>
            <Button type="submit" className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_14px_rgba(37,99,235,0.39)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_14px_rgba(37,99,235,0.2)] active:scale-[0.98] transition-all duration-300 ease-out">
              {t('form.submit')}
            </Button>
            
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-5 border-t border-neutral-100 dark:border-neutral-800/60">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{t('form.examples')}</span>
              {[
                "Иванов Иван Иванович",
                "Анна Сергеевна Петрова",
                "Александр Владимирович Мятин"
              ].map(ex => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    setValue("fullName", ex);
                    setTimeout(() => handleSubmit(onSubmit)(), 50);
                  }}
                  className="text-xs bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/50 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 py-1.5 px-3 rounded-full transition-colors font-medium cursor-pointer"
                >
                  {ex}
                </button>
              ))}
            </div>
          </form>
        </CardContent>
      </Card>

      {currentResult && (
        <Card id="result-card" className="scroll-mt-40 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] bg-white/80 dark:bg-neutral-950/80 backdrop-blur-2xl border-blue-100/50 dark:border-blue-900/30 rounded-[2rem] pt-2 animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out fill-mode-both relative overflow-hidden ring-1 ring-blue-500/10 dark:ring-blue-500/20">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />
          <CardHeader className="pb-4 pt-6 px-6 md:px-8 flex flex-row items-center justify-between space-y-0 border-b border-neutral-100 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/20">
            <CardTitle className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-[family-name:var(--font-playfair)]">{t('result.title')}</CardTitle>
            {getStatusBadge(currentResult)}
          </CardHeader>
          <CardContent className="space-y-6 pt-6 px-6 md:px-8">
            {currentResult.isRussian === false && (
              <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/50 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">{t('result.notCyrillicWarning')}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-y-8 gap-x-6">
              <div>
                <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">{t('result.lastName')}</p>
                <p className="text-xl font-medium text-neutral-900 dark:text-neutral-100">{currentResult.lastName || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">{t('result.firstName')}</p>
                <p className="text-xl font-medium text-neutral-900 dark:text-neutral-100">{currentResult.firstName || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">{t('result.patronymic')}</p>
                <p className="text-xl font-medium text-neutral-900 dark:text-neutral-100">{currentResult.patronymic || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">{t('result.gender')}</p>
                <p className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
                  {getGenderText(currentResult.gender)}
                </p>
              </div>
              <div className="col-span-2 mt-4 pt-6 border-t border-neutral-100 dark:border-neutral-800/60">
                <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-5">{t('result.shortNamesTitle')}</p>
                
                {!showShortNames ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowShortNames(true)}
                    className="w-full sm:w-auto h-12 rounded-xl font-medium tracking-tight text-blue-700 bg-white dark:bg-neutral-900 border-blue-200 hover:bg-blue-50 dark:border-blue-800/80 dark:text-blue-300 dark:hover:bg-blue-900/40 shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-blue-500/5 active:scale-[0.98]"
                  >
                    {t('result.showShortNames')}
                  </Button>
                ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm italic text-amber-600 dark:text-amber-500 bg-amber-50/80 dark:bg-amber-950/30 px-4 py-3 rounded-xl border border-amber-200/60 dark:border-amber-900/60">
                      {t('result.shortNamesWarning')}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {getShortNames(currentResult.firstName).length > 0 ? (
                        getShortNames(currentResult.firstName).map((name) => (
                          <span key={name} className="px-4 py-1.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-full text-sm font-medium border border-neutral-200/50 dark:border-neutral-800 shadow-sm transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">
                            {name}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm italic text-neutral-500 px-2">{t('result.noShortNames')}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
