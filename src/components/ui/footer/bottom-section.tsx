
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function BottomSection() {
  const { t } = useLanguage();
  
  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-center md:flex-row">
      <p 
        className="text-sm text-gray-400" 
        contentEditable 
        suppressContentEditableWarning
      >
        {t("copyright")}
      </p>
      <nav className="flex gap-6 text-sm">
        <Link 
          to="/privacy" 
          className="text-gray-400 transition-colors hover:text-white" 
          contentEditable 
          suppressContentEditableWarning
        >
          {t("privacy_policy")}
        </Link>
        <Link 
          to="/terms" 
          className="text-gray-400 transition-colors hover:text-white" 
          contentEditable 
          suppressContentEditableWarning
        >
          {t("terms_of_service")}
        </Link>
        <Link 
          to="/cookies" 
          className="text-gray-400 transition-colors hover:text-white" 
          contentEditable 
          suppressContentEditableWarning
        >
          {t("cookie_settings")}
        </Link>
      </nav>
    </div>
  );
}
