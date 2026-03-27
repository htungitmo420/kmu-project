'use client';

import { useState } from 'react';
import { useTranslations } from '@/lib/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Trophy, ArrowRight, RefreshCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  scenarioEn: string;
  scenarioVi: string;
  scenarioRu: string;
  options: string[];
  correctIndex: number;
  explanationEn: string;
  explanationVi: string;
  explanationRu: string;
}

const quizData: Question[] = [
  {
    id: 1,
    scenarioEn: "You are writing a formal email to your university professor, Ivan Petrovich Smirnov. How do you start?",
    scenarioVi: "Bạn đang viết email trang trọng cho giáo sư đại học của mình tên là Ivan Petrovich Smirnov. Bạn mở đầu thế nào?",
    scenarioRu: "Вы пишете официальное письмо своему профессору, Ивану Петровичу Смирнову. Как вы начнете?",
    options: ["Уважаемый Иван!", "Уважаемый Иван Петрович!", "Уважаемый Смирнов!"],
    correctIndex: 1,
    explanationEn: "In formal and academic settings, using First Name + Patronymic (Имя + Отчество) is absolutely required.",
    explanationVi: "Trong môi trường trang trọng học thuật, dùng Tên + Tên đệm là điều bắt buộc.",
    explanationRu: "В официальной и академической среде использование Имени и Отчества обязательно."
  },
  {
    id: 2,
    scenarioEn: "You meet your Russian neighbor, Maria Ivanovna, who is 65 years old. What is the most respectful greeting?",
    scenarioVi: "Bạn gặp người phụ nữ hàng xóm người Nga 65 tuổi tên là Maria Ivanovna. Lời chào nào tôn trọng nhất?",
    scenarioRu: "Вы встречаете свою 65-летнюю соседку Марию Ивановну. Какое приветствие будет наиболее уважительным?",
    options: ["Привет, Маша!", "Здравствуйте, Мария!", "Здравствуйте, Мария Ивановна!"],
    correctIndex: 2,
    explanationEn: "Always use First Name + Patronymic with older people to show respect.",
    explanationVi: "Luôn dùng Tên + Tên đệm với người lớn tuổi để thể hiện sự lịch sự.",
    explanationRu: "Всегда используйте Имя + Отчество при обращении к пожилым людям для проявления уважения."
  },
  {
    id: 3,
    scenarioEn: "You are filling out a government visa application form. How should your full name (Dmitry Sergeevich Popov) be written in the 'ФИО' field?",
    scenarioVi: "Bạn đang điền form xin visa của nhà nước. Tên đầy đủ (Dmitry Sergeevich Popov) nên viết ở mục 'ФИО' thế nào?",
    scenarioRu: "Вы заполняете государственную анкету на визу. Как должно быть написано ваше полное имя (Дмитрий Сергеевич Попов) в поле 'ФИО'?",
    options: ["Дмитрий Сергеевич Попов", "Попов Дмитрий Сергеевич", "Дмитрий Попов"],
    correctIndex: 1,
    explanationEn: "'ФИО' strictly stands for Фамилия (Last) + Имя (First) + Отчество (Patronymic). Order matters on official forms.",
    explanationVi: "'ФИО' là viết tắt của Họ + Tên + Tên đệm. Thứ tự vô cùng quan trọng trên giấy tờ pháp lý.",
    explanationRu: "'ФИО' строго означает Фамилия + Имя + Отчество. Порядок имеет значение в официальных документах."
  },
  {
    id: 4,
    scenarioEn: "You are chatting on Telegram with a close friend, Alexander. What should you call him?",
    scenarioVi: "Bạn đang nhắn tin với cậu bạn thân Alexander. Bạn nên xưng hô với cậu ấy là gì?",
    scenarioRu: "Вы переписываетесь в Telegram с близким другом Александром. Как вам следует к нему обращаться?",
    options: ["Александр", "Саша", "Александр Николаевич"],
    correctIndex: 1,
    explanationEn: "Close friends use short names (Краткое имя) like 'Саша' or diminutive forms.",
    explanationVi: "Bạn bè thân thiết luôn gọi bằng tên ngắn gọn (Краткое имя) như 'Саша' hoặc biệt danh.",
    explanationRu: "Близкие друзья используют краткие имена, такие как 'Саша', или уменьшительно-ласкательные формы."
  },
  {
    id: 5,
    scenarioEn: "At work, you need to sign a confirmation letter (Справка). How does your name appear on the signature block?",
    scenarioVi: "Tại công ty, bạn ký một thư xác nhận (Справка). Tên bạn sẽ hiển thị ở dòng chữ ký ra sao?",
    scenarioRu: "На работе вам нужно подписать справку. Как ваше имя должно быть указано в блоке подписи?",
    options: ["Ивановым И.И.", "Иванов Иван Иванович", "Иван Иванов"],
    correctIndex: 1,
    explanationEn: "Official internal documents usually require the full Last + First + Patronymic.",
    explanationVi: "Các văn bản nội bộ chính thức ở công ty yêu cầu đầy đủ Họ + Tên + Tên đệm.",
    explanationRu: "Официальные внутренние документы обычно требуют полного ФИО (Фамилия Имя Отчество)."
  },
  {
    id: 6,
    scenarioEn: "You are at university. Your seminar instructor is a 25-year-old graduate student named Anna Ivanovna. How should you address her?",
    scenarioVi: "Tại trường, giảng viên đứng lớp của bạn là một nghiên cứu sinh trẻ 25 tuổi tên là Anna Ivanovna. Bạn xưng hô thế nào?",
    scenarioRu: "Вы в университете. Ваш преподаватель семинара — 25-летняя аспирантка Анна Ивановна. Как к ней обращаться?",
    options: ["Анна!", "Аня!", "Анна Ивановна!"],
    correctIndex: 2,
    explanationEn: "In academic settings, even young instructors must be addressed by First Name + Patronymic to maintain strict professional boundaries.",
    explanationVi: "Trong môi trường giáo dục, dù giảng viên có trẻ tuổi đến mấy thì bạn vẫn BẮT BUỘC phải gọi bằng Tên + Tên đệm để giữ sự tôn trọng tuyệt đối.",
    explanationRu: "В академической среде даже к молодым преподавателям необходимо обращаться по имени и отчеству для соблюдения субординации."
  },
  {
    id: 7,
    scenarioEn: "You are asking your friend's mother, Yelena Vladimirovna, how she is doing. Which sentence is grammatically and culturally correct?",
    scenarioVi: "Bạn muốn hỏi thăm sức khỏe mẹ của bạn mình, bác Yelena Vladimirovna. Câu nào dưới đây là chuẩn xác nhất cả về ngữ pháp lẫn văn hóa?",
    scenarioRu: "Вы спрашиваете у матери вашего друга, Елены Владимировны, как у нее дела. Какая фраза грамматически и культурно правильная?",
    options: ["Как твои дела, Елена Владимировна?", "Как ваши дела, Елена Владимировна?", "Как дела, тётя Лена?"],
    correctIndex: 1,
    explanationEn: "You must use the formal plural 'Вы' (ваши) when speaking to an older person or whenever you use First Name + Patronymic.",
    explanationVi: "Bắt buộc phải dùng đại từ kính trọng 'Вы' (ваши - của ngài/bác) khi nói chuyện với người lớn tuổi hoặc giới chức sắc ở Nga.",
    explanationRu: "При обращении к старшим или использовании имени и отчества необходимо использовать уважительное местоимение 'Вы'."
  },
  {
    id: 8,
    scenarioEn: "You are writing a formal application ADDRESSED TO the Director, Sergey Nikolaevich Ivanov (Заявление...). Which declension form is correct?",
    scenarioVi: "Bạn đang viết Đơn từ GỬI CHO Giám đốc Sergey Nikolaevich Ivanov (Заявление...). Khối từ nào được chia đúng ngữ pháp?",
    scenarioRu: "Вы пишете официальное заявление НА ИМЯ директора, Сергея Николаевича Иванова (Заявление...). Какая форма склонения верна?",
    options: ["Директору Сергею Николаевичу Иванову", "Директора Сергея Николаевича Иванова", "Директору Сергей Николаевич Иванов"],
    correctIndex: 0,
    explanationEn: "In formal requests directed TO someone, the Dative case (Дательный падеж) must be applied to the entire full name.",
    explanationVi: "Trong các lá đơn gửi ĐẾN ai đó, toàn bộ cấu trúc (Họ, Tên và Tên đệm) đều phải được biến cách ở Cách 3 (Dative case).",
    explanationRu: "В официальных заявлениях, направляемых КОМУ-ЛИБО, всё ФИО должно склоняться в дательном падеже."
  },
  {
    id: 9,
    scenarioEn: "Your boss is a French national named Jean Dupont working in a Russian company. He does not have a patronymic. How do you formally start an email to him?",
    scenarioVi: "Sếp của bạn là người Pháp tên là Jean Dupont đang làm việc tại Nga. Ông ấy không có Tên đệm (Patronymic). Bạn mở đầu email thế nào?",
    scenarioRu: "Ваш начальник — француз по имени Жан Дюпон, работающий в российской компании. У него нет отчества. Как официально начать письмо к нему?",
    options: ["Уважаемый Жан!", "Уважаемый господин Дюпон!", "Уважаемый Жан Дюпонович!"],
    correctIndex: 1,
    explanationEn: "For foreigners without a patronymic, use 'Уважаемый господин [Last Name]'. Never invent a patronymic.",
    explanationVi: "Với người nước ngoài không có Tên đệm, chuẩn mực nhất là dùng 'Уважаемый господин + [Họ]' (Kính thưa ngài...). Tuyệt đối không tự chế ra Tên đệm.",
    explanationRu: "Для иностранцев без отчества используйте форму 'Уважаемый господин [Фамилия]'. Никогда не выдумывайте отчество."
  },
  {
    id: 10,
    scenarioEn: "You are reading an official contract. The signature block says 'С.В. Сидоров'. In Russian culture, what does the 'В.' strictly represent?",
    scenarioVi: "Bạn đang đọc một bản hợp đồng. Ở phần chữ ký ghi 'С.В. Сидоров'. Theo văn hóa Nga, chữ 'В.' đại diện cho điều gì?",
    scenarioRu: "Вы читаете официальный договор. В блоке подписи указано 'С.В. Сидоров'. Что означает буква 'В.' в русской культуре?",
    options: ["His middle name (like in English)", "His second last name", "His father's given name (Patronymic)"],
    correctIndex: 2,
    explanationEn: "In Russian signatures, the initials signify the First Name and the Patronymic (Отчество), which is derived directly from the father's given name.",
    explanationVi: "Trong chữ ký tiếng Nga, các chữ cái viết tắt luôn là Tên gọi và Tên đệm (Отчество) - phần từ được tạo thành trực tiếp dựa trên Húy danh của người cha.",
    explanationRu: "В русских подписях инициалы означают Имя и Отчество, которое напрямую образуется от имени отца."
  }
];

export default function QuizPage() {
  const { t, locale } = useTranslations();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = quizData[currentQIndex];

  const getLocalizedText = (q: Question, field: 'scenario' | 'explanation') => {
    if (locale === 'vi') return q[`${field}Vi` as keyof Question] as string;
    if (locale === 'ru') return q[`${field}Ru` as keyof Question] as string;
    return q[`${field}En` as keyof Question] as string;
  };

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOpt(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      setScore(s => s + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#3b82f6', '#60a5fa', '#f59e0b', '#10b981']
      });
    }
  };

  const handleNext = () => {
    if (currentQIndex < quizData.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 pb-12 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-screen animate-pulse" />
        <Card className="text-center py-16 px-6 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-xl rounded-3xl">
          <Trophy className="w-24 h-24 mx-auto text-amber-500 mb-6 drop-shadow-md" />
          <h1 className="text-4xl font-bold font-[family-name:var(--font-playfair)] tracking-tight mb-4">{t('quiz.finish')}</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 font-medium mb-8">
            {t('quiz.score')} <span className="text-3xl font-black text-blue-600 dark:text-blue-400 mx-2">{score} / {quizData.length}</span>
          </p>
          <Button onClick={handleRestart} size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 shadow-md hover:shadow-lg transition-all active:scale-95">
            <RefreshCcw className="w-5 h-5 mr-2" />
            {t('quiz.playAgain')}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12 pt-4 md:pt-8 animate-in fade-in duration-500 relative">
      <div className="absolute top-20 -left-10 md:left-10 w-[20rem] h-[20rem] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-screen animate-pulse" />
      <div className="absolute bottom-20 -right-10 md:right-10 w-[25rem] h-[25rem] bg-amber-400/10 dark:bg-amber-600/10 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-screen animate-pulse delay-700" />

      <div className="text-center space-y-4 pt-4 pb-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-neutral-50 font-[family-name:var(--font-playfair)] drop-shadow-sm">
          {t('quiz.title')}
        </h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 font-medium">
          {t('quiz.desc')}
        </p>
      </div>

      <div className="flex items-center justify-between px-2 mb-2 text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
        <span>Question {currentQIndex + 1} / {quizData.length}</span>
        <span>Score: {score}</span>
      </div>

      <Card className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-blue-100 dark:border-blue-900/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/30 p-8 border-b border-blue-100/50 dark:border-blue-900/30">
          <CardTitle className="text-xl md:text-2xl leading-relaxed font-semibold text-neutral-800 dark:text-neutral-200">
            {getLocalizedText(currentQ, 'scenario')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-4">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnClass = "w-full justify-start text-left h-auto py-4 px-6 rounded-2xl border-2 transition-all font-medium text-lg shadow-sm ";
            
            if (!isAnswered) {
              btnClass += "border-neutral-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-neutral-700 dark:text-neutral-300 active:scale-[0.99]";
            } else {
              if (isCorrect) {
                btnClass += "border-green-500 bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 ring-2 ring-green-500/20";
              } else if (isSelected) {
                btnClass += "border-red-400 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 opacity-80";
              } else {
                btnClass += "border-neutral-200 dark:border-neutral-800 text-neutral-400 opacity-50";
              }
            }

            return (
              <Button
                key={idx}
                variant="outline"
                className={btnClass}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
              >
                <span className="flex-1 whitespace-normal break-words">{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 shrink-0 text-green-600 dark:text-green-400 ml-4 animate-in zoom-in duration-300" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 shrink-0 text-red-500 dark:text-red-400 ml-4 animate-in zoom-in duration-300" />}
              </Button>
            );
          })}

          {isAnswered && (
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-bottom-4 fade-in duration-500">
              <div className={`p-5 rounded-2xl mb-6 flex gap-4 items-start shadow-inner ${selectedOpt === currentQ.correctIndex ? 'bg-green-50/80 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50' : 'bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50'}`}>
                {selectedOpt === currentQ.correctIndex ? (
                  <CheckCircle2 className="w-7 h-7 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-7 h-7 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className={`font-bold text-lg mb-1 ${selectedOpt === currentQ.correctIndex ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                    {selectedOpt === currentQ.correctIndex ? t('quiz.correct') : t('quiz.incorrect')}
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
                    {getLocalizedText(currentQ, 'explanation')}
                  </p>
                </div>
              </div>
              
              <Button onClick={handleNext} className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-[0_8px_20px_rgb(37,99,235,0.2)] dark:shadow-[0_8px_20px_rgb(37,99,235,0.1)] transition-transform active:scale-[0.98] border-none">
                {currentQIndex < quizData.length - 1 ? t('quiz.next') : t('quiz.finish')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
