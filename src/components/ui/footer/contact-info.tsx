
import { useLanguage } from "@/contexts/LanguageContext";

export function ContactInfo() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 
        className="text-lg font-semibold text-white"
      >
        {t("footer.contact_us")}
      </h3>
      <address className="space-y-3 text-sm text-gray-400 not-italic">
        <p>{t("footer.address.line1")}</p>
        <p>{t("footer.address.line2")}</p>
        <p>{t("footer.address.line3")}</p>
        <p>{t("footer.address.phone")}</p>
        <p>{t("footer.address.email")}</p>
      </address>
    </div>
  );
}
