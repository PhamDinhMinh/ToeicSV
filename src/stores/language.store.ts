import i18next from 'i18next';
import {create} from 'zustand';

interface LanguageState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>(set => ({
  language: 'vi',
  setLanguage: (lang: string) => {
    i18next.changeLanguage(lang);
    set({language: lang});
  },
}));
