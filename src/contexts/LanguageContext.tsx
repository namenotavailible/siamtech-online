
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCookie, setCookie } from "@/utils/cookies";

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
  // Get browser language and filter to only supported languages
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("th") ? "th" : "en";
  };

  const [language, setLanguageState] = useState<Language>(() => {
    // First check cookie
    const cookieLang = getCookie("lang") as Language;
    // Then check localStorage as fallback
    const savedLanguage = cookieLang || localStorage.getItem("language") as Language;
    // Finally fall back to Thai as default language
    return savedLanguage || "th";
  });
  
  // Track whether translations are loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Load translations when the component mounts or language changes
  useEffect(() => {
    const loadAllTranslations = async () => {
      await Promise.all([
        loadTranslations("en"),
        loadTranslations("th")
      ]);
      setIsLoaded(true);
    };
    
    loadAllTranslations();
  }, []);

  // Update localStorage and cookies when language changes
  useEffect(() => {
    localStorage.setItem("language", language);
    setCookie("lang", language, 365); // Set cookie to last for a year
    
    // Also update the lang attribute on the html element
    document.documentElement.lang = language;
  }, [language]);

  // Function to set language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    // Return if translations haven't loaded yet
    if (!translations[language]) return key;
    
    // Try to get the translation in the current language
    const translation = translations[language][key];
    
    // If translation exists, return it
    if (translation) return translation;
    
    // Otherwise, try to get the English version as fallback
    const fallback = translations["en"][key];
    
    // Return the fallback or the original key if nothing is found
    return fallback || key;
  };

  // Show a loading state while translations are being loaded
  if (!isLoaded) {
    return <div className="flex h-screen w-full items-center justify-center bg-black text-white">
      <div className="animate-pulse">Loading translations...</div>
    </div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
