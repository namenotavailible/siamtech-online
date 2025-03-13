
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function BottomSection() {
  const { t } = useLanguage();
  
  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t dark:border-gray-800 border-gray-300 pt-8 text-center md:flex-row">
      <p 
        className="text-sm dark:text-gray-400 text-black" 
        contentEditable 
        suppressContentEditableWarning
      >
        {t("copyright")}
      </p>
      <nav className="flex gap-6 text-sm">
        <Link 
          to="/privacy" 
          className="dark:text-gray-400 text-black hover:text-gray-800 dark:hover:text-white transition-colors" 
          contentEditable 
          suppressContentEditableWarning
        >
          {t("privacy_policy")}
        </Link>
        <Link 
          to="/terms" 
          className="dark:text-gray-400 text-black hover:text-gray-800 dark:hover:text-white transition-colors" 
          contentEditable 
          suppressContentEditableWarning
        >
          {t("terms_of_service")}
        </Link>
        <Link 
          to="/cookies" 
          className="dark:text-gray-400 text-black hover:text-gray-800 dark:hover:text-white transition-colors" 
          contentEditable 
          suppressContentEditableWarning
        >
          {t("cookie_settings")}
        </Link>
      </nav>
    </div>
  );
}
