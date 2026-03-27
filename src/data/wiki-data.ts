import { FIOParseResult } from "@/lib/fio-parser";
import { getShortNames } from "@/data/russian-short-names";

const defaultFio: FIOParseResult = {
  lastName: "Иванов",
  firstName: "Иван",
  patronymic: "Иванович",
  gender: "M",
  original: "Иванов Иван Иванович",
  isRussian: true
};

type Locale = 'vi' | 'en' | 'ru' | 'fr';

function declineRuName(name: string, type: 'last' | 'first' | 'patronymic', gender: 'M' | 'F', caseChoice: 'genitive' | 'dative'): string {
  if (!name) return "";
  const lower = name.toLowerCase();

  if (gender === 'M') {
    if (caseChoice === 'genitive') { // Cách 2 (от кого?)
      if (type === 'last') {
        if (lower.endsWith('ов') || lower.endsWith('ев') || lower.endsWith('ин') || lower.endsWith('ын')) return name + 'а';
        if (lower.endsWith('ий')) return name.slice(0, -2) + 'ого';
        if (lower.endsWith('ой')) return name.slice(0, -2) + 'ого';
      }
      if (type === 'first') {
        if (lower.endsWith('й') || lower.endsWith('ь')) return name.slice(0, -1) + 'я';
        if (lower.endsWith('а') || lower.endsWith('я')) return name.slice(0, -1) + 'и';
        if (lower.match(/[бвгджзклмнпрстфхцчшщ]$/)) return name + 'а';
      }
      if (type === 'patronymic') {
        if (lower.endsWith('ич')) return name + 'а';
      }
    } else if (caseChoice === 'dative') { // Cách 3 (кому?)
      if (type === 'last') {
        if (lower.endsWith('ов') || lower.endsWith('ев') || lower.endsWith('ин') || lower.endsWith('ын')) return name + 'у';
        if (lower.endsWith('ий')) return name.slice(0, -2) + 'ому';
        if (lower.endsWith('ой')) return name.slice(0, -2) + 'ому';
      }
      if (type === 'first') {
        if (lower.endsWith('й') || lower.endsWith('ь')) return name.slice(0, -1) + 'ю';
        if (lower.endsWith('а') || lower.endsWith('я')) return name.slice(0, -1) + 'е';
        if (lower.match(/[бвгджзклмнпрстфхцчшщ]$/)) return name + 'у';
      }
      if (type === 'patronymic') {
        if (lower.endsWith('ич')) return name + 'у';
      }
    }
  } else { // F
    if (caseChoice === 'genitive') { // Cách 2 (от кого?)
      if (type === 'last') {
        if (lower.endsWith('ва') || lower.endsWith('на')) return name.slice(0, -1) + 'ой';
        if (lower.endsWith('ая')) return name.slice(0, -2) + 'ой';
      }
      if (type === 'first') {
        if (lower.endsWith('ия')) return name.slice(0, -1) + 'и';
        if (lower.endsWith('а')) return name.slice(0, -1) + (lower.match(/[гжкхчшщ]а$/) ? 'и' : 'ы');
        if (lower.endsWith('я') || lower.endsWith('ь')) return name.slice(0, -1) + 'и';
      }
      if (type === 'patronymic') {
        if (lower.endsWith('на')) return name.slice(0, -1) + 'ны';
      }
    } else if (caseChoice === 'dative') { // Cách 3 (кому?)
      if (type === 'last') {
        if (lower.endsWith('ва') || lower.endsWith('на')) return name.slice(0, -1) + 'ой';
        if (lower.endsWith('ая')) return name.slice(0, -2) + 'ой';
      }
      if (type === 'first') {
        if (lower.endsWith('ия')) return name.slice(0, -1) + 'и';
        if (lower.endsWith('а') || lower.endsWith('я')) return name.slice(0, -1) + 'е';
        if (lower.endsWith('ь')) return name.slice(0, -1) + 'и';
      }
      if (type === 'patronymic') {
        if (lower.endsWith('на')) return name.slice(0, -1) + 'не';
      }
    }
  }
  return name; // Fallback
}

export function getDynamicWikiContext(fioResult: FIOParseResult | null, locale: Locale = 'ru') {
  const fio = fioResult || defaultFio;

  const lastName = fio.lastName || "Иванов";
  const firstName = fio.firstName || "Иван";
  const patronymic = fio.patronymic || "Иванович";
  const gender = fio.gender === 'F' ? 'F' : 'M';

  let shortName = firstName;
  try {
    const shorts = getShortNames(firstName);
    if (shorts && shorts.length > 0) {
      shortName = shorts[0];
    }
  } catch {
    // Ignore error
  }

  const translations = {
    vi: {
      catDaily: "Giao tiếp đời thường",
      descDaily: "Sử dụng trong bối cảnh sinh hoạt hàng ngày, không mang tính ràng buộc hoặc quá nghiêm túc.",
      friends: "Bạn bè", ruleFriends: "Chỉ sử dụng Tên gọi tắt (Краткое имя) hoặc Tên nhỏ (Уменьшительное имя).",
      colleagues: "Đồng nghiệp thân", ruleColleagues: "Sử dụng Tên chính (Имя) hoặc Tên gọi tắt nếu bằng tuổi và rất thân.",
      newAcq: "Người mới quen", ruleNewAcq: "Sử dụng Tên + Tên đệm (Имя + Отчество) để thể hiện sự tôn trọng cơ bản.",
      neighbors: "Hàng xóm", ruleNeighbors: "Thường dùng Tên + Tên đệm, trừ khi là hàng xóm trẻ tuổi hoặc đã giao kèo gọi tên trống.",

      catFormal: "Giao tiếp trang trọng",
      descFormal: "Dùng trong môi trường công sở, học tập hoặc khi nói chuyện với người lớn tuổi, người có địa vị.",
      email: "Email công việc", ruleEmail: "Kính ngữ (Уважаемый/Уважаемая) + Tên + Tên đệm.",
      professor: "Nói chuyện với giảng viên", ruleProfessor: "Luôn luôn dùng Tên + Tên đệm. Tuyệt đối không gọi trống không.",
      boss: "Nói chuyện với sếp", ruleBoss: "Tên + Tên đệm. Tùy văn hóa công ty có thể chỉ dùng Tên, nhưng chuẩn mực là có Tên đệm.",
      firstCall: "Gọi điện lần đầu", ruleFirstCall: "Xin chào + Tên + Tên đệm.",

      catOfficial: "Văn bản chính thức",
      descOfficial: "Sử dụng trọn bộ cấu trúc ФИО (Họ, Tên, Tên đệm) trên các giấy tờ pháp lý.",
      forms: "Đơn từ", ruleForms: "Khai báo đầy đủ Họ + Tên + Tên đệm.",
      contracts: "Hợp đồng", ruleContracts: "Sử dụng Họ + Tên + Tên đệm trên tư cách pháp nhân/cá nhân.",
      govForms: "Biểu mẫu nhà nước", ruleGovForms: "Phải chính xác tuyệt đối theo Passport: Họ + Tên + Tên đệm.",
      confirm: "Thư xác nhận", ruleConfirm: "Họ + Tên + Tên đệm.",

      catChat: "Nhắn tin / Chat",
      descChat: "Giao tiếp qua mạng xã hội, Telegram, Slack, Zalo...",
      chatWork: "Chat công việc", ruleChatWork: "Tên (Имя). Nếu là sếp lớn: Tên + Tên đệm.",
      chatFriends: "Chat bạn bè", ruleChatFriends: "Tên nhỏ / Biệt danh."
    },
    en: {
      catDaily: "Daily Communication",
      descDaily: "Used in everyday, casual environments. Not formal.",
      friends: "Friends", ruleFriends: "Use only Short Name (Краткое имя) or Diminutive (Уменьшительное имя).",
      colleagues: "Close colleagues", ruleColleagues: "Use First Name (Имя) or Short Name if you are peers and close.",
      newAcq: "New acquaintances", ruleNewAcq: "Use First Name + Patronymic (Имя + Отчество) to show basic respect.",
      neighbors: "Neighbors", ruleNeighbors: "Usually First Name + Patronymic, unless they are young or agreed to use first names.",

      catFormal: "Formal Communication",
      descFormal: "Used in professional settings, academia, or when speaking to elders/superiors.",
      email: "Work email", ruleEmail: "Honorific (Уважаемый/Уважаемая) + First Name + Patronymic.",
      professor: "With professors", ruleProfessor: "Always use First Name + Patronymic. Never just the first name.",
      boss: "Talking to boss", ruleBoss: "First Name + Patronymic. Varies by company culture, but this is the standard.",
      firstCall: "First phone call", ruleFirstCall: "Hello + First Name + Patronymic.",

      catOfficial: "Official Documents",
      descOfficial: "Use the complete FIO structure (Last, First, Patronymic) on all legal paperwork.",
      forms: "Forms / Applications", ruleForms: "Full Last Name + First Name + Patronymic.",
      contracts: "Contracts", ruleContracts: "Use full Last + First + Patronymic for legal entity/individual.",
      govForms: "Government forms", ruleGovForms: "Must exactly match Passport: Last + First + Patronymic.",
      confirm: "Confirmation letters", ruleConfirm: "Last Name + First Name + Patronymic.",

      catChat: "Messaging / Chat",
      descChat: "Communication via social networks, Telegram, Slack...",
      chatWork: "Work chat", ruleChatWork: "First name. If top boss: First Name + Patronymic.",
      chatFriends: "Friend chat", ruleChatFriends: "Short name / Nickname."
    },
    ru: {
      catDaily: "Повседневное общение",
      descDaily: "Используется в бытовых ситуациях, неформальная обстановка.",
      friends: "Друзья", ruleFriends: "Только Краткое имя или Уменьшительное имя.",
      colleagues: "Близкие коллеги", ruleColleagues: "Имя или Краткое имя, если вы ровесники и в хороших отношениях.",
      newAcq: "Новые знакомые", ruleNewAcq: "Имя + Отчество для проявления базового уважения.",
      neighbors: "Соседи", ruleNeighbors: "Обычно Имя + Отчество, кроме случаев общения с молодежью по договоренности.",

      catFormal: "Официальное общение",
      descFormal: "В офисе, учебе или при разговоре со старшими по возрасту/статусу.",
      email: "Рабочий email", ruleEmail: "Уважаемый/Уважаемая + Имя + Отчество.",
      professor: "С преподавателем", ruleProfessor: "Всегда Имя + Отчество. Ни в коем случае не только имя.",
      boss: "Разговор с начальником", ruleBoss: "Имя + Отчество. Зависит от корпоративной культуры, но это стандарт.",
      firstCall: "Первый звонок", ruleFirstCall: "Здравствуйте + Имя + Отчество.",

      catOfficial: "Официальные документы",
      descOfficial: "Полная структура ФИО (Фамилия, Имя, Отчество) в юридических документах.",
      forms: "Заявления", ruleForms: "Полные Фамилия + Имя + Отчество.",
      contracts: "Договоры", ruleContracts: "Фамилия + Имя + Отчество как физическое/юридическое лицо.",
      govForms: "Государственные бланки", ruleGovForms: "Строго по паспорту: Фамилия + Имя + Отчество.",
      confirm: "Справки", ruleConfirm: "Фамилия + Имя + Отчество.",

      catChat: "Мессенджеры / Чат",
      descChat: "Общение в Telegram, WhatsApp, Slack...",
      chatWork: "Рабочий чат", ruleChatWork: "Имя. Если вышестоящий начальник: Имя + Отчество.",
      chatFriends: "Чат с друзьями", ruleChatFriends: "Краткое имя / Прозвище."
    },
    fr: {
      catDaily: "Communication quotidienne",
      descDaily: "Utilisé dans la vie de tous les jours, cadre informel.",
      friends: "Amis", ruleFriends: "Uniquement le nom court (Краткое имя) ou diminutif.",
      colleagues: "Collègues proches", ruleColleagues: "Prénom (Имя) ou nom court entre pairs.",
      newAcq: "Nouvelles connaissances", ruleNewAcq: "Prénom + Patronyme pour montrer un respect fondamental.",
      neighbors: "Voisins", ruleNeighbors: "Généralement Prénom + Patronyme, sauf accord contraire.",

      catFormal: "Communication formelle",
      descFormal: "Au bureau, à l'université ou en parlant aux aînés/supérieurs.",
      email: "Email professionnel", ruleEmail: "Honorifique (Уважаемый/Уважаемая) + Prénom + Patronyme.",
      professor: "Avec un professeur", ruleProfessor: "Toujours Prénom + Patronyme. Jamais le prénom seul.",
      boss: "Dialogue avec le patron", ruleBoss: "Prénom + Patronyme. Standard dans la plupart des entreprises.",
      firstCall: "Premier appel téléphonique", ruleFirstCall: "Bonjour + Prénom + Patronyme.",

      catOfficial: "Documents officiels",
      descOfficial: "Structure FIO complète (Nom, Prénom, Patronyme) pour l'administration.",
      forms: "Formulaires", ruleForms: "Nom + Prénom + Patronyme complets.",
      contracts: "Contrats", ruleContracts: "Nom + Prénom + Patronyme complets pour l'entité/l'individu.",
      govForms: "Administration", ruleGovForms: "Doit correspondre exactement au passeport : Nom, Prénom, Patronyme.",
      confirm: "Lettres", ruleConfirm: "Nom + Prénom + Patronyme complets.",

      catChat: "Messagerie / Chat",
      descChat: "Communication via réseaux sociaux, Telegram, Slack...",
      chatWork: "Chat professionnel", ruleChatWork: "Prénom. Si haut responsable : Prénom + Patronyme.",
      chatFriends: "Chat entre amis", ruleChatFriends: "Nom court / Surnom."
    }
  };

  const t = translations[locale] || translations['ru'];

  return [
    {
      categoryId: "daily",
      title: t.catDaily,
      icon: "coffee",
      description: t.descDaily,
      contexts: [
        { id: "friends", name: t.friends, rule: t.ruleFriends, example: `Привет, ${shortName}! Как дела?` },
        { id: "close_colleagues", name: t.colleagues, rule: t.ruleColleagues, example: `Привет, ${firstName}! Пойдем на обед?` },
        { id: "new_acquaintance", name: t.newAcq, rule: t.ruleNewAcq, example: `Очень приятно, ${firstName} ${patronymic}.` },
        { id: "neighbors", name: t.neighbors, rule: t.ruleNeighbors, example: `Доброе утро, ${firstName} ${patronymic}.` }
      ]
    },
    {
      categoryId: "formal",
      title: t.catFormal,
      icon: "briefcase",
      description: t.descFormal,
      contexts: [
        { id: "work_email", name: t.email, rule: t.ruleEmail, example: `${gender === 'F' ? 'Уважаемая' : 'Уважаемый'} ${firstName} ${patronymic}, высылаю вам отчет...` },
        { id: "professor", name: t.professor, rule: t.ruleProfessor, example: `Извините, ${firstName} ${patronymic}, можно задать вопрос?` },
        { id: "boss", name: t.boss, rule: t.ruleBoss, example: `${firstName} ${patronymic}, проект готов.` },
        { id: "first_call", name: t.firstCall, rule: t.ruleFirstCall, example: `Здравствуйте, ${firstName} ${patronymic}. Меня зовут...` }
      ]
    },
    {
      categoryId: "official",
      title: t.catOfficial,
      icon: "file-text",
      description: t.descOfficial,
      contexts: [
        { id: "forms", name: t.forms, rule: t.ruleForms, example: `Заявление от: ${declineRuName(lastName, 'last', gender, 'genitive')} ${declineRuName(firstName, 'first', gender, 'genitive')} ${declineRuName(patronymic, 'patronymic', gender, 'genitive')}`.trim() },
        { id: "contracts", name: t.contracts, rule: t.ruleContracts, example: `ИП ${lastName} ${firstName} ${patronymic}, именуемый в дальнейшем "Заказчик"...` },
        { id: "gov_forms", name: t.govForms, rule: t.ruleGovForms, example: `ФИО: ${lastName} ${firstName} ${patronymic}` },
        { id: "confirmation", name: t.confirm, rule: t.ruleConfirm, example: `Справка выдана: ${declineRuName(lastName, 'last', gender, 'dative')} ${declineRuName(firstName, 'first', gender, 'dative')} ${declineRuName(patronymic, 'patronymic', gender, 'dative')} в том, что...`.replace('   ', ' ').replace('  ', ' ') }
      ]
    },
    {
      categoryId: "chat",
      title: t.catChat,
      icon: "message-circle",
      description: t.descChat,
      contexts: [
        { id: "chat_work", name: t.chatWork, rule: t.ruleChatWork, example: `Добрый день, ${firstName}! Подскажите по задаче.` },
        { id: "chat_friends", name: t.chatFriends, rule: t.ruleChatFriends, example: `Скинь фотки, ${shortName} 😂` }
      ]
    }
  ];
}
