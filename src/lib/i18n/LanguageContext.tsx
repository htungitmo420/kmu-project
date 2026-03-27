'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'vi' | 'en' | 'ru' | 'fr';

type Dictionary = Record<string, string>;

interface I18nContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

const dictionaries: Record<Locale, Dictionary> = {
  vi: {
    "app.title": "Công Cụ Phân Tích Tên Tiếng Nga",
    "app.subtitle": "Cách Xưng Hô Chuyên Nghiệp",
    "app.description": "Dễ dàng bóc tách cấu trúc Họ Tên (ФИО) của người Nga và tham khảo các quy tắc giao tiếp hàng ngày, email hoặc văn bản chính thức một cách chuẩn xác theo văn phong.",
    "form.title": "Tra Cứu Tên Tiếng Nga",
    "form.description": "Nhập Họ, Tên, và Tên Lót (nếu có) bằng tiếng Nga để phân tách ФИО.",
    "form.label": "Nhập ФИО (Tiếng Nga)",
    "form.placeholder": "vd: Иванов Иван Иванович",
    "form.submit": "Phân Tích",
    "form.error.empty": "Vui lòng nhập họ và tên",
    "result.title": "Kết Quả Bóc Tách",
    "result.lastName": "Фамилия (Họ)",
    "result.firstName": "Имя (Tên)",
    "result.patronymic": "Отчество (Lót)",
    "result.gender": "Giới tính",
    "result.gender.male": "Nam 👨",
    "result.gender.female": "Nữ 👩",
    "result.gender.unknown": "Không xác định",
    "result.shortNamesTitle": "Tên gọi thân mật (Краткое имя)",
    "result.showShortNames": "Hiển thị các tên ngắn",
    "result.shortNamesWarning": "⚠️ Lưu ý: Chỉ dành cho gia đình và những người có mối quan hệ thân thiết. Tránh gọi như thế này trong môi trường công sở hoặc giao tiếp trang trọng!",
    "result.noShortNames": "Không có dữ liệu tên ngắn cho tên này.",
    "history.title": "Lịch Sử Tra Cứu",
    "history.empty": "Chưa có lịch sử tra cứu nào.",
    "nav.home": "Trang Chủ",
    "nav.wiki": "Cẩm Nang Xưng Hô",
    "nav.about": "Giới Thiệu",
    "nav.quiz": "Minigame",
    "quiz.title": "Trắc Nghiệm Văn Hóa Tiếng Nga",
    "quiz.desc": "Kiểm tra kiến thức xưng hô của bạn qua 5 tình huống giao tiếp thực tế.",
    "quiz.start": "Bắt Đầu Chơi",
    "quiz.correct": "Chính xác! 🎉",
    "quiz.incorrect": "Chưa đúng rồi! 😅",
    "quiz.next": "Câu Tiếp Theo",
    "quiz.finish": "Xem Kết Quả",
    "quiz.score": "Điểm số của bạn:",
    "quiz.playAgain": "Chơi Lại",
    "about.title": "Về Dự Án",
    "about.desc": "Russian FIO Parser là công cụ bóc tách Họ Tên Tiếng Nga tiêu chuẩn, kết hợp từ điển xưng hô và Cẩm nang văn hóa giao tiếp.",
    "about.team.title": "Đội Ngũ Phát Triển",
    "about.team.desc": "Nhóm tác giả và các thành viên cốt lõi đứng sau dự án.",
    "about.tech.title": "Công Nghệ Tối Ưu",
    "about.tech.desc": "Được xây dựng trên nền tảng web hiện đại với kiến trúc UI UX PRO MAX.",
    "result.notCyrillicWarning": "Tên bạn nhập vào không chứa ký tự tiếng Nga (Cyrillic). Đây dường như không phải tên người Nga.",
    "wiki.header.title": "Cẩm Nang Giao Tiếp",
    "wiki.header.desc": "Tổng hợp các quy tắc xưng hô và sử dụng cấu trúc tên họ (ФИО) linh hoạt theo ngữ cảnh thực tế.",
    "wiki.dynamic.title": "Ví dụ tương tác động",
    "wiki.dynamic.active": "Các ví dụ dưới đây đang được áp dụng trực tiếp cho tên \"{name}\" mà bạn vừa tra cứu!",
    "wiki.dynamic.empty": "Bạn hãy tra cứu một cái tên ở Trang Chủ để xem các ví dụ dưới đây tự động thay đổi theo tên bạn vừa nhập nhé! (Đang hiển thị ví dụ mặc định: Иванов Иван)",
    "wiki.rule": "Quy tắc áp dụng",
    "wiki.example": "Ví dụ thực tế",
    "form.examples": "Ví dụ điền nhanh:",
    "status.success": "Phân tích thành công",
    "status.ambiguous": "Mơ hồ",
    "status.incomplete": "Chưa hoàn chỉnh"
  },
  en: {
    "app.title": "Russian Name Parser",
    "app.subtitle": "Professional Etiquette",
    "app.description": "Easily parse Russian full names (FIO) and learn the daily, email, and formal etiquette rules for proper communication.",
    "form.title": "Russian Name Lookup",
    "form.description": "Enter the Last Name, First Name, and Patronymic (if any) in Russian to parse the FIO.",
    "form.label": "Enter FIO (Russian)",
    "form.placeholder": "e.g., Иванов Иван Иванович",
    "form.submit": "Parse",
    "form.error.empty": "Please enter a name",
    "result.title": "Parsed Result",
    "result.lastName": "Last Name (Фамилия)",
    "result.firstName": "First Name (Имя)",
    "result.patronymic": "Patronymic (Отчество)",
    "result.gender": "Gender",
    "result.gender.male": "Male 👨",
    "result.gender.female": "Female 👩",
    "result.gender.unknown": "Unknown",
    "result.shortNamesTitle": "Short names (Краткое имя)",
    "result.showShortNames": "Show short names",
    "result.shortNamesWarning": "⚠️ Note: Only for family and close relationships. Avoid using these in professional or formal environments!",
    "result.noShortNames": "No short name data for this name.",
    "history.title": "Search History",
    "history.empty": "No search history yet.",
    "nav.home": "Home",
    "nav.wiki": "Etiquette Guide",
    "nav.about": "About Us",
    "nav.quiz": "Minigame",
    "quiz.title": "Russian Etiquette Quiz",
    "quiz.desc": "Test your etiquette knowledge through 5 real-life scenarios.",
    "quiz.start": "Start Quiz",
    "quiz.correct": "Correct! 🎉",
    "quiz.incorrect": "Incorrect! 😅",
    "quiz.next": "Next Question",
    "quiz.finish": "View Results",
    "quiz.score": "Your Score:",
    "quiz.playAgain": "Play Again",
    "about.title": "About The Project",
    "about.desc": "Russian FIO Parser is a standard Russian name parsing tool, combined with an addressing dictionary and a cultural communication guide.",
    "about.team.title": "Development Team",
    "about.team.desc": "The authors and core members behind the project.",
    "about.tech.title": "Tech Stack",
    "about.tech.desc": "Built with modern and highly optimized web technologies following the PRO MAX architecture.",
    "result.notCyrillicWarning": "The name you entered does not contain Russian (Cyrillic) characters. This doesn't seem to be a Russian name.",
    "wiki.header.title": "Communication Guide",
    "wiki.header.desc": "Comprehensive rules for addressing and using FIO structure properly in real-life contexts.",
    "wiki.dynamic.title": "Interactive Examples",
    "wiki.dynamic.active": "The examples below are directly applied to the name \"{name}\" you just searched!",
    "wiki.dynamic.empty": "Search for a name on the Home page to see these examples automatically adapt! (Currently showing default: Иванов Иван)",
    "wiki.rule": "Applicable Rule",
    "wiki.example": "Real-life Example",
    "form.examples": "Quick examples:",
    "status.success": "Parsed successfully",
    "status.ambiguous": "Ambiguous",
    "status.incomplete": "Incomplete"
  },
  ru: {
    "app.title": "Анализатор Русских Имён",
    "app.subtitle": "Профессиональный Этикет",
    "app.description": "Легко разбирайте русские ФИО и изучайте правила общения по электронной почте или в официальных документах.",
    "form.title": "Анализ ФИО",
    "form.description": "Введите Фамилию, Имя и Отчество (если есть) на русском языке.",
    "form.label": "Введите ФИО (на русском)",
    "form.placeholder": "например: Иванов Иван Иванович",
    "form.submit": "Анализировать",
    "form.error.empty": "Пожалуйста, введите имя",
    "result.title": "Результат",
    "result.lastName": "Фамилия",
    "result.firstName": "Имя",
    "result.patronymic": "Отчество",
    "result.gender": "Пол",
    "result.gender.male": "Мужской 👨",
    "result.gender.female": "Женский 👩",
    "result.gender.unknown": "Неизвестно",
    "result.shortNamesTitle": "Краткое имя",
    "result.showShortNames": "Показать короткие имена",
    "result.shortNamesWarning": "⚠️ Примечание: Только для семьи и близких друзей. Не используйте в формальной или официальной обстановке!",
    "result.noShortNames": "Нет данных о коротких именах.",
    "history.title": "История Поиска",
    "history.empty": "История пуста.",
    "nav.home": "Главная",
    "nav.wiki": "Справочник Этикета",
    "nav.about": "О нас",
    "nav.quiz": "Мини-игра",
    "quiz.title": "Викторина по Этикету",
    "quiz.desc": "Проверьте свои знания этикета в 5 реальных ситуациях.",
    "quiz.start": "Начать Игру",
    "quiz.correct": "Правильно! 🎉",
    "quiz.incorrect": "Неправильно! 😅",
    "quiz.next": "Следующий Вопрос",
    "quiz.finish": "Посмотреть Результаты",
    "quiz.score": "Ваш счет:",
    "quiz.playAgain": "Играть снова",
    "about.title": "О проекте",
    "about.desc": "Анализатор русских ФИО — это стандартный инструмент для разбора русских имен, совмещенный со словарем обращений и руководством по культуре общения.",
    "about.team.title": "Команда разработчиков",
    "about.team.desc": "Авторы и основные участники проекта.",
    "about.tech.title": "Используемые технологии",
    "about.tech.desc": "Создано с использованием современных и оптимизированных веб-технологий.",
    "result.notCyrillicWarning": "Введенное имя не содержит русских (кириллических) символов. Кажется, это не русское имя.",
    "wiki.header.title": "Справочник по общению",
    "wiki.header.desc": "Правила обращения и гибкого использования ФИО в реальных ситуациях.",
    "wiki.dynamic.title": "Интерактивные примеры",
    "wiki.dynamic.active": "Приведенные ниже примеры применяются непосредственно к имени «{name}», которое вы только что искали!",
    "wiki.dynamic.empty": "Найдите имя на Главной странице, чтобы примеры ниже автоматически адаптировались! (Показан пример по умолчанию: Иванов Иван)",
    "wiki.rule": "Правило",
    "wiki.example": "Пример",
    "form.examples": "Быстрые примеры:",
    "status.success": "Успешно разобрано",
    "status.ambiguous": "Неоднозначно",
    "status.incomplete": "Неполное имя"
  },
  fr: {
    "app.title": "Analyseur de Noms Russes",
    "app.subtitle": "Étiquette Professionnelle",
    "app.description": "Analysez facilement les noms complets russes (FIO) et apprenez les règles d'étiquette pour la communication formelle et quotidienne.",
    "form.title": "Recherche de Nom Russe",
    "form.description": "Entrez le nom, prénom et patronyme (si existant) en russe.",
    "form.label": "Entrez le FIO (Russe)",
    "form.placeholder": "ex: Иванов Иван Иванович",
    "form.submit": "Analyser",
    "form.error.empty": "Veuillez entrer un nom",
    "result.title": "Résultat",
    "result.lastName": "Nom (Фамилия)",
    "result.firstName": "Prénom (Имя)",
    "result.patronymic": "Patronyme (Отчество)",
    "result.gender": "Sexe",
    "result.gender.male": "Homme 👨",
    "result.gender.female": "Femme 👩",
    "result.gender.unknown": "Inconnu",
    "result.shortNamesTitle": "Noms courts (Краткое имя)",
    "result.showShortNames": "Afficher les noms courts",
    "result.shortNamesWarning": "⚠️ Attention: Uniquement pour la famille et les amis proches. Évitez d'utiliser ces noms dans un environnement professionnel ou formel!",
    "result.noShortNames": "Aucune donnée pour ce nom.",
    "history.title": "Historique",
    "history.empty": "Aucun historique.",
    "nav.home": "Accueil",
    "nav.wiki": "Guide d'Étiquette",
    "nav.about": "À propos",
    "nav.quiz": "Mini-jeu",
    "quiz.title": "Quiz d'Étiquette Russe",
    "quiz.desc": "Testez vos connaissances en étiquette à travers 5 scénarios.",
    "quiz.start": "Commencer le Quiz",
    "quiz.correct": "Correct ! 🎉",
    "quiz.incorrect": "Incorrect ! 😅",
    "quiz.next": "Question Suivante",
    "quiz.finish": "Voir les Résultats",
    "quiz.score": "Votre Score :",
    "quiz.playAgain": "Rejouer",
    "about.title": "À propos du Projet",
    "about.desc": "L'analyseur de noms russes (FIO) est un outil standard couplé à un dictionnaire de présentation et un guide de communication culturelle.",
    "about.team.title": "L'Équipe",
    "about.team.desc": "Les auteurs et membres principaux derrière ce projet.",
    "about.tech.title": "Technologies Utilisées",
    "about.tech.desc": "Construit avec des technologies web modernes et hautement optimisées.",
    "result.notCyrillicWarning": "Le nom saisi ne contient pas de caractères russes (cyrilliques). Ce n'est apparemment pas un nom russe.",
    "wiki.header.title": "Guide de Communication",
    "wiki.header.desc": "Règles complètes pour l'utilisation de la structure FIO dans des contextes réels.",
    "wiki.dynamic.title": "Exemples Interactifs",
    "wiki.dynamic.active": "Les exemples ci-dessous s'appliquent directement au nom \"{name}\" que vous venez de rechercher !",
    "wiki.dynamic.empty": "Recherchez un nom sur la page d'Accueil pour voir ces exemples s'adapter automatiquement ! (Exemple par défaut: Иванов Иван)",
    "wiki.rule": "Règle",
    "wiki.example": "Exemple concret",
    "form.examples": "Exemples rapides:",
    "status.success": "Analysé avec succès",
    "status.ambiguous": "Ambigu",
    "status.incomplete": "Incomplet"
  }
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('ru');

  // Load from locale storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('i18n-locale') as Locale;
    if (saved && dictionaries[saved]) {
      setTimeout(() => setLocaleState(saved), 0);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('i18n-locale', newLocale);
  };

  const t = (key: string): string => {
    return dictionaries[locale][key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslations = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within an I18nProvider');
  }
  return context;
};
