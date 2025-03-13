
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function NewsletterSection() {
  const { t } = useLanguage();
  
  return (
    <div className="relative space-y-4">
      <h2 
        className="text-2xl font-bold tracking-tight text-white"
      >
        {t("footer.stay_connected")}
      </h2>
      <p 
        className="text-sm text-gray-400"
      >
        {t("footer.newsletter_description")}
      </p>
      <form className="relative mt-6">
        <Input 
          type="email" 
          placeholder={t("footer.enter_email")} 
          className="w-full bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700"
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-1 top-1 h-8 w-8 rounded-full bg-white hover:bg-gray-200 text-black transition-all"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">{t("footer.subscribe")}</span>
        </Button>
      </form>
    </div>
  );
}
