import { z } from "zod";

export const FIOSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ và tên tiếng Nga"),
});

export type FIOParseResult = {
  lastName: string | null;
  firstName: string | null;
  patronymic: string | null;
  gender: 'M' | 'F' | 'UNKNOWN';
  original: string;
  isRussian?: boolean;
};

// --- Heuristic Permutation Scoring FIO Parser ---
function normalize(s: string) {
  return s.trim().toLowerCase().replace(/ё/g, 'е').replace(/-/g, '').replace(/\s+/g, '');
}

function endsWithAny(s: string, suffixes: string[]) {
  return suffixes.some(suf => s.endsWith(suf));
}

// Known Russian given names dictionary for high-confidence anchoring
const KNOWN_GIVEN_NAMES = new Set([
  "александр", "алексей", "анатолий", "андрей", "антон", "аркадий", "арсений", "артём", "артем", "богдан", "борис",
  "вадим", "валентин", "валерий", "василий", "вениамин", "виктор", "виталий", "владимир", "владислав", "вячеслав",
  "геннадий", "георгий", "григорий", "даниил", "денис", "дмитрий", "евгений", "егор", "иван", "игорь", "илья",
  "кирилл", "константин", "лев", "леонид", "максим", "матвей", "михаил", "никита", "николай", "олег", "павел",
  "пётр", "петр", "роман", "руслан", "семен", "семён", "сергей", "станислав", "степан", "тимофей", "тимур",
  "фёдор", "федор", "филипп", "эдуард", "юрий", "яков", "ярослав", "агата", "агнесса", "аделаида", "александра",
  "алёна", "алена", "алина", "алиса", "алла", "анастасия", "анна", "божена", "валентина", "валерия", "варвара", "вера",
  "вероника", "виктория", "галина", "дарья", "евгения", "евдокия", "екатерина", "елена", "елизавета", "жанна",
  "зинаида", "зоя", "инна", "ираида", "ирина", "кира", "клавдия", "кристина", "ксения", "лариса", "лидия", "любовь",
  "людмила", "маргарита", "марина", "мария", "надежда", "наталья", "нина", "оксана", "олеся", "ольга", "полина",
  "раиса", "рената", "светлана", "софия", "софья", "таисия", "тамара", "татьяна", "томила", "ульяна", "христина",
  "эвелина", "эльвира", "эмилия", "юлиана", "юлия", "яна", "саша", "маша", "даша", "вова", "петя", "ваня"
]);

function scoreAsSurname(token: string): number {
  if (token.length < 3) return 0;
  const x = normalize(token);
  let score = 0;
  if (x.length >= 5 && endsWithAny(x, ["ова", "ева", "ина", "ына"])) score += 4;
  if (x.length >= 6 && endsWithAny(x, ["ская", "цкая", "ский", "ской", "цкий"])) score += 4;
  if (x.length >= 4 && endsWithAny(x, ["ов", "ев", "ин", "ын"])) score += 4;
  if (x.length >= 4 && endsWithAny(x, ["енко", "ко", "чук", "юк", "як", "ук", "чик"])) score += 3;
  if (x.length >= 4 && endsWithAny(x, ["ых", "их", "ого", "его"])) score += 3;
  if (x.length >= 5 && endsWithAny(x, ["вич"])) score += 2; // Belarusian surname (-вич)
  if (score === 0) score += 1; // Generic fallback
  return score;
}

function scoreAsPatronymic(token: string): number {
  if (token.length < 5) return 0;
  const x = normalize(token);
  if (endsWithAny(x, ["ович", "евич", "евна", "овна", "инична", "оглы", "кызы"])) return 5;
  if (endsWithAny(x, ["вич", "вна", "ична"])) return 3;
  return 0;
}

function scoreAsGivenName(token: string): number {
  let score = 0;
  const x = normalize(token);
  if (KNOWN_GIVEN_NAMES.has(x)) score += 6;
  const pScore = scoreAsPatronymic(token);
  const sScore = scoreAsSurname(token);
  if (pScore === 0 && sScore <= 1) score += 2;
  if (score === 0) score += 1;
  return score;
}

export function parseFIO(input: string): FIOParseResult {
  const isRussian = /[а-яА-ЯёЁ]/.test(input);
  const parts = input.trim().split(/\s+/).filter(Boolean);

  let lastName: string | null = null;
  let firstName: string | null = null;
  let patronymic: string | null = null;

  if (parts.length === 0) {
    return { lastName, firstName, patronymic, gender: 'UNKNOWN', original: input, isRussian };
  }

  // --- 1 Token ---
  if (parts.length === 1) {
    const t = parts[0];
    const sS = scoreAsSurname(t);
    const sG = scoreAsGivenName(t);
    const sP = scoreAsPatronymic(t);

    if (sP > sG && sP > sS) patronymic = t;
    else if (sG > sS) firstName = t;
    else lastName = t;
  }
  // --- 2 Tokens ---
  else if (parts.length === 2) {
    const opts = [
      { type: 'ФИ', score: scoreAsSurname(parts[0]) + scoreAsGivenName(parts[1]), l: parts[0], f: parts[1], p: null },
      { type: 'ИФ', score: scoreAsGivenName(parts[0]) + scoreAsSurname(parts[1]), l: parts[1], f: parts[0], p: null },
      { type: 'ИО', score: scoreAsGivenName(parts[0]) + scoreAsPatronymic(parts[1]), l: null, f: parts[0], p: parts[1] },
      { type: 'ФО', score: scoreAsSurname(parts[0]) + scoreAsPatronymic(parts[1]), l: parts[0], f: null, p: parts[1] }
    ];
    opts.sort((a, b) => b.score - a.score);
    const best = opts[0];
    lastName = best.l;
    firstName = best.f;
    patronymic = best.p;
  }
  // --- 3 Tokens: evaluate all 6 permutations ---
  else if (parts.length === 3) {
    const [p1, p2, p3] = parts;
    const opts = [
      { type: 'ФИО', score: scoreAsSurname(p1) + scoreAsGivenName(p2) + scoreAsPatronymic(p3), l: p1, f: p2, p: p3 },
      { type: 'ИОФ', score: scoreAsGivenName(p1) + scoreAsPatronymic(p2) + scoreAsSurname(p3), l: p3, f: p1, p: p2 },
      { type: 'ФОИ', score: scoreAsSurname(p1) + scoreAsPatronymic(p2) + scoreAsGivenName(p3), l: p1, f: p3, p: p2 },
      { type: 'ИФО', score: scoreAsGivenName(p1) + scoreAsSurname(p2) + scoreAsPatronymic(p3), l: p2, f: p1, p: p3 },
      { type: 'ОФИ', score: scoreAsPatronymic(p1) + scoreAsSurname(p2) + scoreAsGivenName(p3), l: p2, f: p3, p: p1 },
      { type: 'ОИФ', score: scoreAsPatronymic(p1) + scoreAsGivenName(p2) + scoreAsSurname(p3), l: p3, f: p2, p: p1 }
    ];
    // ФИО preferred on tie (first in array, strict > comparison)
    let best = opts[0];
    for (let i = 1; i < opts.length; i++) {
      if (opts[i].score > best.score) best = opts[i];
    }
    lastName = best.l;
    firstName = best.f;
    patronymic = best.p;
  }
  // --- 4+ Tokens ---
  else {
    const patronymicIndex = parts.findIndex(p => scoreAsPatronymic(p) >= 3);
    if (patronymicIndex !== -1) {
      patronymic = parts[patronymicIndex];
      const remaining = parts.filter((_, i) => i !== patronymicIndex);
      const surnameIndex = remaining.findIndex(p => scoreAsSurname(p) >= 3);
      if (surnameIndex !== -1) {
        lastName = remaining[surnameIndex];
        firstName = remaining.filter((_, i) => i !== surnameIndex).join(" ");
      } else {
        lastName = remaining[0];
        firstName = remaining.slice(1).join(" ");
      }
    } else {
      lastName = parts[0];
      firstName = parts.slice(1).join(" ");
    }
  }

  // Detect gender
  let gender: 'M' | 'F' | 'UNKNOWN' = 'UNKNOWN';
  if (patronymic) {
    const p = patronymic.toLowerCase();
    if (endsWithAny(p, ["вич", "ич", "оглы"])) gender = 'M';
    else if (endsWithAny(p, ["вна", "ична", "кызы"])) gender = 'F';
  } else if (lastName) {
    const l = lastName.toLowerCase();
    if (endsWithAny(l, ["ов", "ев", "ин", "ский", "ой", "ый"])) gender = 'M';
    else if (endsWithAny(l, ["ова", "ева", "ина", "ская", "ая"])) gender = 'F';
  }

  return { lastName, firstName, patronymic, gender, original: input, isRussian };
}
