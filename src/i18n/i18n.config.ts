import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {vi} from './translations/vi';
import {en} from './translations/en';
import {ko} from './translations/ko';

const resources = {
  vi: {
    translation: vi,
  },
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  debug: true,
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18next;
