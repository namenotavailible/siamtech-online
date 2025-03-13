
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the available languages
export type Language = "en" | "th";

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

// Define props for the provider
interface LanguageProviderProps {
  children: ReactNode;
}

// Create translations object
const translations: Record<Language, Record<string, string>> = {
  en: {},
  th: {},
};

// Import all translations
export const loadTranslations = async (lang: Language) => {
  try {
    const module = await import(`../translations/${lang}.json`);
    translations[lang] = module.default;
    console.log(`Loaded translations for ${lang}`);
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error);
  }
};

// Provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get language from localStorage or use browser language, default to Thai
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split("-")[0];
    return browserLang === "th" ? "th" : "en";
  };

  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || getBrowserLanguage() || "th";
  });

  // Load translations when the component mounts or language changes
  useEffect(() => {
    const loadAllTranslations = async () => {
      await loadTranslations("en");
      await loadTranslations("th");
    };
    
    loadAllTranslations();
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Function to set language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) return key;
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
