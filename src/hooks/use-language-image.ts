import {useMemo} from 'react';

export const useLanguageImage = (locale: string) => {
  const languageImage = useMemo(() => {
    if (locale === '' || locale === 'vi') {
      return require('@/assets/images/language/vietnam.jpg');
    } else if (locale === 'en') {
      return require('@/assets/images/language/england.png');
    } else if (locale === 'ko') {
      return require('@/assets/images/language/south-korea.png');
    }
  }, [locale]);

  return languageImage;
};
