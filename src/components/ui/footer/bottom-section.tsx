
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { CookiePreferences } from "@/components/CookiePreferences";

export function BottomSection() {
  const { t, language } = useLanguage();
  const [cookiePreferencesOpen, setCookiePreferencesOpen] = useState(false);
  
  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t dark:border-gray-800 border-gray-300 pt-8 text-center md:flex-row">
      <p className="text-xs dark:text-gray-400 text-black">
        {t("copyright")}
      </p>
      <nav className="flex gap-6 text-sm">
        <Link 
          to="/privacy" 
          className="dark:text-gray-400 text-black hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          {t("privacy_policy")}
        </Link>
        <Link 
          to="/terms" 
          className="dark:text-gray-400 text-black hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          {t("terms_of_service")}
        </Link>
        <button 
          onClick={() => setCookiePreferencesOpen(true)}
          className="dark:text-gray-400 text-black hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          {t("cookie_settings")}
        </button>
      </nav>
      
      <CookiePreferences 
        open={cookiePreferencesOpen} 
        onOpenChange={setCookiePreferencesOpen} 
      />
    </div>
  );
}
