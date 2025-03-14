
import { useLanguage } from "@/contexts/LanguageContext";

export function ContactInfo() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold dark:text-white text-black">
        {t("contact_us")}
      </h3>
      <address className="space-y-3 text-sm dark:text-gray-400 text-black not-italic">
        <p>{t("address_line1")}</p>
        <p>{t("address_line2")}</p>
        <p>{t("address_line3")}</p>
        <p>{t("phone")}</p>
        <p>{t("email")}</p>
      </address>
    </div>
  );
}
