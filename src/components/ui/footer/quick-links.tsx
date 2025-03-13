
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function QuickLinks() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 
        className="text-lg font-semibold dark:text-white text-black"
        contentEditable
        suppressContentEditableWarning
      >
        {t("quick_links")}
      </h3>
      <nav className="flex flex-col space-y-3 text-sm">
        <Link 
          to="/" 
          className="dark:text-gray-400 text-black hover:text-gray-800 dark:hover:text-white transition-colors"
          contentEditable
          suppressContentEditableWarning
        >
          {t("home")}
        </Link>
        <Link 
          to="/about" 
          className="dark:text-gray-400 text-black hover:text-gray-800 dark:hover:text-white transition-colors"
          contentEditable
          suppressContentEditableWarning
        >
          {t("about")}
        </Link>
        <Link 
          to="/products" 
          className="dark:text-gray-400 text-black hover:text-gray-800 dark:hover:text-white transition-colors"
          contentEditable
          suppressContentEditableWarning
        >
          {t("products")}
        </Link>
        <Link 
          to="/contact" 
          className="dark:text-gray-400 text-black hover:text-gray-800 dark:hover:text-white transition-colors"
          contentEditable
          suppressContentEditableWarning
        >
          {t("contact")}
        </Link>
      </nav>
    </div>
  );
}
