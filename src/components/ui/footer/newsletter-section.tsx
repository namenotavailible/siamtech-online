
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function NewsletterSection() {
  const { t } = useLanguage();
  
  return (
    <div className="relative space-y-4">
      <h2 className="text-2xl font-bold tracking-tight dark:text-white text-black">
        {t("stay_connected")}
      </h2>
      <p className="text-sm dark:text-gray-400 text-black">
        {t("newsletter_description")}
      </p>
      <form className="relative mt-6">
        <Input 
          type="email" 
          placeholder={t("enter_email")}
          className="w-full dark:bg-gray-900/50 bg-white/90 dark:border-gray-800 border-gray-300 dark:text-white text-black placeholder:dark:text-gray-500 placeholder:text-gray-600 dark:focus:border-gray-700 focus:border-gray-400 dark:focus:ring-gray-700 focus:ring-gray-400"
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-1 top-1 h-8 w-8 rounded-full bg-white hover:bg-gray-200 text-black transition-all"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">{t("subscribe")}</span>
        </Button>
      </form>
    </div>
  );
}
