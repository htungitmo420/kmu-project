'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "@/lib/i18n/LanguageContext";
import { Info, Users, Blocks, Zap, Globe, Layers, Code2 } from 'lucide-react';

export default function AboutPage() {
  const { t, locale } = useTranslations();

  const technologies = [
    { name: 'Next.js 14', icon: <Layers className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />, desc: 'App Router & Server Components' },
    { name: 'React 18', icon: <Code2 className="w-5 h-5 text-blue-500" />, desc: 'UI Library' },
    { name: 'Tailwind CSS', icon: <Zap className="w-5 h-5 text-sky-400" />, desc: 'Utility-first Styling' },
    { name: 'shadcn/ui', icon: <Blocks className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />, desc: 'Accessible Components' },
    { name: 'Zustand', icon: <Blocks className="w-5 h-5 text-amber-500" />, desc: 'State Management' },
    { name: 'i18n Context', icon: <Globe className="w-5 h-5 text-green-500" />, desc: 'Multi-language Support' },
  ];

  const getMemberName = (vi: string, en: string, ru: string) => {
    if (locale === 'ru') return ru;
    if (locale === 'en' || locale === 'fr') return en;
    return vi;
  };

  const teamMembers = [
    {
      name: getMemberName('Nguyễn Hoàng Tùng', 'Nguyen Hoang Tung', 'Нгуен Хоанг Тунг'),
      avatar: '👨‍💻',
    },
    {
      name: getMemberName('Nguyễn Văn Chính', 'Nguyen Van Chinh', 'Нгуен Ван Чинь'),
      avatar: '👨‍💻',
    },
    {
      name: getMemberName('Phan Tấn Dũng', 'Phan Tan Dung', 'Фан Тан Зунг'),
      avatar: '👨‍💻',
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-12 pt-4 md:pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      {/* Background ambient orbs */}
      <div className="absolute top-10 left-0 md:left-1/4 w-[30rem] h-[30rem] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-screen animate-in fade-in duration-1000" />
      <div className="absolute bottom-20 right-0 md:right-1/4 w-[25rem] h-[25rem] bg-amber-400/10 dark:bg-amber-600/10 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-screen animate-in fade-in duration-1000 delay-300" />

      <div className="text-center space-y-6 pt-4 md:pt-8 pb-4">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-neutral-900 dark:text-neutral-50 flex flex-col items-center justify-center gap-4 font-[family-name:var(--font-playfair)] drop-shadow-sm">
          <span className="p-4 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] border border-neutral-100 dark:border-neutral-800">
            <Info className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </span>
          {t('about.title') || 'Về Dự Án'}
        </h1>
        <p className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-3xl mx-auto font-medium leading-relaxed">
          {t('about.desc') || 'Russian FIO Parser là công cụ bóc tách Họ Tên Tiếng Nga tiêu chuẩn kết hợp cẩm nang giao tiếp.'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Tech Stack Section */}
        <section className="space-y-6">
          <div className="border-b border-neutral-200/60 dark:border-neutral-800/60 pb-4 space-y-2.5">
            <h2 className="text-3xl font-bold flex items-center gap-3.5 text-neutral-900 dark:text-neutral-100 font-[family-name:var(--font-playfair)] tracking-tight">
              <span className="p-2.5 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm"><Zap className="w-6 h-6 text-amber-500" /></span>
              {t('about.tech.title') || 'Công Nghệ Tối Ưu'}
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{t('about.tech.desc') || 'Được xây dựng trên nền tảng web hiện đại với kiến trúc UI UX PRO MAX.'}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {technologies.map((tech) => (
              <Card key={tech.name} className="shadow-sm hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.03)] transition-all duration-300 border-neutral-200/50 dark:border-neutral-800/50 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-2xl rounded-3xl group cursor-default hover:-translate-y-1">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="bg-neutral-100 dark:bg-neutral-800/80 p-2.5 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 group-hover:scale-110 transition-transform">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">{tech.name}</h3>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-1">{tech.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-6">
          <div className="border-b border-neutral-200/60 dark:border-neutral-800/60 pb-4 space-y-2.5">
            <h2 className="text-3xl font-bold flex items-center gap-3.5 text-neutral-900 dark:text-neutral-100 font-[family-name:var(--font-playfair)] tracking-tight">
              <span className="p-2.5 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm"><Users className="w-6 h-6 text-blue-500" /></span>
              {t('about.team.title') || 'Đội Ngũ Phát Triển'}
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{t('about.team.desc') || 'Nhóm tác giả và các thành viên cốt lõi đứng sau dự án.'}</p>
          </div>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <Card key={member.name} className="flex items-center gap-5 p-5 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.04)] bg-white/70 dark:bg-neutral-900/70 backdrop-blur-3xl border border-neutral-200/50 dark:border-neutral-800/50 rounded-3xl transition-all duration-300 hover:-translate-y-1 cursor-default group">
                <div className="text-4xl bg-neutral-50 dark:bg-neutral-800 shrink-0 w-16 h-16 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-700 shadow-sm group-hover:scale-110 transition-transform">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] tracking-tight text-neutral-900 dark:text-neutral-100">{member.name}</h3>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
