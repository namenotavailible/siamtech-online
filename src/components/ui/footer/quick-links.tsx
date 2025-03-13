
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function QuickLinks() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 
        className="text-lg font-semibold text-white"
        contentEditable
        suppressContentEditableWarning
      >
        {t("quick_links")}
      </h3>
      <nav className="flex flex-col space-y-3 text-sm">
        <Link 
          to="/" 
          className="text-gray-400 transition-colors hover:text-white"
          contentEditable
          suppressContentEditableWarning
        >
          {t("home")}
        </Link>
        <Link 
          to="/about" 
          className="text-gray-400 transition-colors hover:text-white"
          contentEditable
          suppressContentEditableWarning
        >
          {t("about")}
        </Link>
        <Link 
          to="/products" 
          className="text-gray-400 transition-colors hover:text-white"
          contentEditable
          suppressContentEditableWarning
        >
          {t("products")}
        </Link>
        <Link 
          to="/contact" 
          className="text-gray-400 transition-colors hover:text-white"
          contentEditable
          suppressContentEditableWarning
        >
          {t("contact")}
        </Link>
      </nav>
    </div>
  );
}
