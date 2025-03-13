
import { useLanguage } from "@/contexts/LanguageContext";

export function ContactInfo() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 
        className="text-lg font-semibold dark:text-white text-black"
        contentEditable
        suppressContentEditableWarning
      >
        {t("contact_us")}
      </h3>
      <address className="space-y-3 text-sm dark:text-gray-400 text-black not-italic">
        <p contentEditable suppressContentEditableWarning>{t("address_line1")}</p>
        <p contentEditable suppressContentEditableWarning>{t("address_line2")}</p>
        <p contentEditable suppressContentEditableWarning>{t("address_line3")}</p>
        <p contentEditable suppressContentEditableWarning>{t("phone")}</p>
        <p contentEditable suppressContentEditableWarning>{t("email")}</p>
      </address>
    </div>
  );
}
