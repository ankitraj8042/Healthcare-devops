import { createContext, useContext, useState, useCallback } from 'react';
import en from '../translations/en.json';
import hi from '../translations/hi.json';
import kn from '../translations/kn.json';
import mr from '../translations/mr.json';

const translations = { en, hi, kn, mr };

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'हिं' },
  { code: 'kn', label: 'ಕನ್ನಡ', short: 'ಕ' },
  { code: 'mr', label: 'मराठी', short: 'म' },
];

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem('lang') || 'en'
  );

  const changeLanguage = useCallback((code) => {
    setLanguage(code);
    localStorage.setItem('lang', code);
  }, []);

  const t = useCallback(
    (key) => {
      return translations[language]?.[key] || translations.en[key] || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
