'use client';

import { useTranslations } from "@/lib/i18n/LanguageContext";
import { Users, Mail, Github } from 'lucide-react';

export function Footer() {
  const { t, locale } = useTranslations();

  const getMemberName = (vi: string, en: string, ru: string) => {
    if (locale === 'ru') return ru;
    if (locale === 'en' || locale === 'fr') return en;
    return vi;
  };

  const teamMembers = [
    {
      name: getMemberName('Nguyễn Hoàng Tùng', 'Nguyen Hoang Tung', 'Нгуен Хоанг Тунг'),
      avatar: '👨‍💻',
      email: 'nguyentung23112005@gmail.com',
      github: 'https://github.com/htungitmo420'
    },
    {
      name: getMemberName('Nguyễn Văn Chính', 'Nguyen Van Chinh', 'Нгуен Ван Чинь'),
      avatar: '👨‍💻',
      email: 'nvchinh23022004@gmail.com',
      github: 'https://github.com/chinhtx04'
    },
    {
      name: getMemberName('Phan Tấn Dũng', 'Phan Tan Dung', 'Фан Тан Зунг'),
      avatar: '👨‍💻',
      email: 'tandung10404@gmail.com',
      github: 'https://github.com/TanDung233'
    }
  ];

  return (
    <footer className="w-full mt-auto border-t border-neutral-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand & Description */}
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 font-[family-name:var(--font-playfair)] tracking-tight flex items-center gap-2">
              🇷🇺 FIO Parser
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed max-w-sm text-sm">
              {t('about.desc') || 'Russian FIO Parser là công cụ bóc tách Họ Tên Tiếng Nga tiêu chuẩn, kết hợp cẩm nang giao tiếp.'}
            </p>
          </div>

          {/* Team Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-neutral-900 dark:text-neutral-100 font-[family-name:var(--font-playfair)] tracking-tight">
                {t('about.team.title') || 'Đội Ngũ Phát Triển'}
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex flex-col p-4 bg-white/70 dark:bg-neutral-900/70 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-neutral-50 dark:bg-neutral-800 text-xl w-10 h-10 rounded-full flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50 shrink-0 group-hover:scale-110 transition-transform">
                      {member.avatar}
                    </div>
                    <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100 font-[family-name:var(--font-playfair)] tracking-tight">
                      {member.name}
                    </span>
                  </div>

                  {(member.email || member.github) && (
                    <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-800/50">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link" target="_blank" rel="noopener noreferrer">
                          <div className="p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-md group-hover/link:bg-blue-100 dark:group-hover/link:bg-blue-900/30 transition-colors shrink-0">
                            <Mail className="w-3.5 h-3.5" />
                          </div>
                          <span className="truncate">{member.email}</span>
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} className="flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group/link" target="_blank" rel="noopener noreferrer">
                          <div className="p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-md group-hover/link:bg-neutral-200 dark:group-hover/link:bg-neutral-700 transition-colors shrink-0">
                            <Github className="w-3.5 h-3.5" />
                          </div>
                          <span className="truncate">{member.github.split('/').pop()}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Russian FIO Parser.</p>
          <p>
            From <a href="https://en.itmo.ru/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors">ITMO University</a> 🎓
          </p>
        </div>
      </div>
    </footer>
  );
}
