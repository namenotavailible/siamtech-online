
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
        <p>1444/97 Nakhon Chaisi Road,</p>
        <p>Thanon Nakhon Chaisi Subdistrict,</p>
        <p>Dusit District, Bangkok 10300, Thailand</p>
        <p>Phone: 66+99 999 9999</p>
        <p>Email: info@siamtechonline.com</p>
      </address>
    </div>
  );
}
