
import React from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();

  const toggleLanguage = () => {
    const newLang: Language = language === "en" ? "th" : "en";
    setLanguage(newLang);
    
    // Show a toast notification when language is changed
    const message = newLang === "en" 
      ? "Switched to English" 
      : "เปลี่ยนเป็นภาษาไทย";
    
    toast.success(message, {
      duration: 2000,
      position: "top-center"
    });
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm px-3 py-1 h-auto border-none"
      aria-label={language === "en" ? "Switch to Thai language" : "เปลี่ยนเป็นภาษาอังกฤษ"}
    >
      <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {language === "en" ? "TH" : "EN"}
      </span>
    </Button>
  );
}
