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

// --- Name Heuristics Ported from Java Bot ---
function normalize(s: string) {
  return s.trim().toLowerCase().replace(/ё/g, 'е').replace(/-/g, '').replace(/\s+/g, '');
}

function endsWithAny(s: string, suffixes: string[]) {
  return suffixes.some(suf => s.endsWith(suf));
}

function looksLikePatronymic(token: string) {
  if (!token) return false;
  const x = normalize(token);
  return endsWithAny(x, ["вич", "евич", "ович", "вна", "евна", "овна", "ична", "инична", "оглы", "кызы"]);
}

function looksLikeSurname(token: string) {
  if (!token) return false;
  const x = normalize(token);
  if (x.length < 3) return false;
  
  // Strong endings
  if (x.length >= 5 && endsWithAny(x, ["ова", "ева", "ина", "ына"])) return true;
  if (x.length >= 6 && endsWithAny(x, ["ская", "цкая", "ский", "ской", "цкий"])) return true;
  
  // Common endings
  if (x.length >= 4 && endsWithAny(x, ["ов", "ев", "ин", "ын"])) return true;
  
  // Regional / frequent chat surnames
  if (x.length >= 4 && endsWithAny(x, ["енко", "ко", "чук", "юк", "як", "ук", "чик"])) return true;
  
  // Plural / adjectival surnames
  if (x.length >= 4 && endsWithAny(x, ["ых", "их", "ого", "его"])) return true;
  
  return false;
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

  // 1 Token: Decide Patronymic -> Surname -> Given Name
  if (parts.length === 1) {
    const only = parts[0];
    if (looksLikePatronymic(only)) {
      patronymic = only;
    } else if (looksLikeSurname(only)) {
      lastName = only;
    } else {
      firstName = only;
    }
  } 
  // 2 Tokens: Handle combinations of ФИ, ФО, ИО
  else if (parts.length === 2) {
    const a = parts[0];
    const b = parts[1];
    
    // If b is a patronymic, 'a' could be either a First Name or a Surname.
    // e.g., "Иван Иванович" (ИО) vs "Иванов Иванович" (ФО)
    if (looksLikePatronymic(b)) {
      if (looksLikeSurname(a)) {
        lastName = a;  // ФО
        patronymic = b;
      } else {
        firstName = a; // ИО
        patronymic = b;
      }
    } else {
      // Default fallback: Surname + GivenName (ФИ)
      lastName = a;
      firstName = b;
    }
  }
  // 3+ Tokens (Standard FIO or mixed order)
  else {
    const patronymicIndex = parts.findIndex(p => looksLikePatronymic(p));
    
    if (patronymicIndex !== -1) {
      patronymic = parts[patronymicIndex];
      const remaining = parts.filter((_, i) => i !== patronymicIndex);
      
      if (parts.length === 3) {
        if (patronymicIndex === 1) { // e.g. И О Ф
          if (looksLikeSurname(remaining[0]) && !looksLikeSurname(remaining[1])) {
            lastName = remaining[0];
            firstName = remaining[1];
          } else if (looksLikeSurname(remaining[1]) && !looksLikeSurname(remaining[0])) {
            lastName = remaining[1];
            firstName = remaining[0];
          } else {
            firstName = remaining[0];
            lastName = remaining[1];
          }
        } else if (patronymicIndex === 2) { // e.g. Ф И О
          if (looksLikeSurname(remaining[1]) && !looksLikeSurname(remaining[0])) {
            firstName = remaining[0];
            lastName = remaining[1];
          } else {
            lastName = remaining[0];
            firstName = remaining[1];
          }
        } else { // patronymicIndex === 0 e.g. О Ф И
          if (looksLikeSurname(remaining[0]) && !looksLikeSurname(remaining[1])) {
            lastName = remaining[0];
            firstName = remaining[1];
          } else if (looksLikeSurname(remaining[1]) && !looksLikeSurname(remaining[0])) {
            lastName = remaining[1];
            firstName = remaining[0];
          } else {
            lastName = remaining[0];
            firstName = remaining[1];
          }
        }
      } else {
        // 4+ parts logic
        const surnameIndex = remaining.findIndex(p => looksLikeSurname(p));
        if (surnameIndex !== -1) {
          lastName = remaining[surnameIndex];
          firstName = remaining.filter((_, i) => i !== surnameIndex).join(" ");
        } else {
          lastName = remaining[0];
          firstName = remaining.slice(1).join(" ");
        }
      }
    } else {
      // No patronymic identified
      lastName = parts[0];
      firstName = parts[1];
      patronymic = parts.slice(2).join(" ");
    }
  }

  // Detect gender based on the parsed fields
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
