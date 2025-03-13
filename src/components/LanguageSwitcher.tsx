
import React from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "th" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm"
      aria-label="Switch Language"
    >
      {language === "en" ? "TH" : "EN"}
    </button>
  );
}
