
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getCookie, setCookie } from "@/utils/cookies";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

export function CookiePreferences({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { t, language } = useLanguage();
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Necessary cookies cannot be disabled
    analytics: false,
    marketing: false,
    personalization: false
  });

  useEffect(() => {
    // Load saved preferences
    const savedPreferences = getCookie("cookie-preferences");
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(prev => ({
          ...prev,
          ...parsed,
          necessary: true // Always keep necessary cookies enabled
        }));
      } catch (e) {
        console.error("Failed to parse cookie preferences", e);
      }
    }
  }, [open]);

  const handleSavePreferences = () => {
    // Save preferences to cookie
    setCookie("cookie-preferences", JSON.stringify({
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      personalization: preferences.personalization,
      // Necessary cookies are always true, no need to store
    }), 365); // Store for a year
    
    toast.success(t("cookie_preferences_saved"));
    onOpenChange(false);
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true
    };
    setPreferences(allEnabled);
    setCookie("cookie-preferences", JSON.stringify(allEnabled), 365);
    toast.success(t("all_cookies_accepted"));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cookie_preferences")}</DialogTitle>
          <DialogDescription>
            {t("cookie_preferences_description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between space-x-2">
            <div>
              <h4 className="font-medium">{t("necessary_cookies")}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("necessary_cookies_description")}
              </p>
            </div>
            <Switch 
              checked={preferences.necessary} 
              disabled={true} 
              aria-readonly="true"
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div>
              <h4 className="font-medium">{t("analytics_cookies")}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("analytics_cookies_description")}
              </p>
            </div>
            <Switch 
              id="analytics"
              checked={preferences.analytics}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ ...prev, analytics: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div>
              <h4 className="font-medium">{t("marketing_cookies")}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("marketing_cookies_description")}
              </p>
            </div>
            <Switch 
              id="marketing"
              checked={preferences.marketing}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ ...prev, marketing: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div>
              <h4 className="font-medium">{t("personalization_cookies")}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("personalization_cookies_description")}
              </p>
            </div>
            <Switch 
              id="personalization"
              checked={preferences.personalization}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ ...prev, personalization: checked }))
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            {t("cancel")}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleAcceptAll}
          >
            {t("accept_all")}
          </Button>
          <Button 
            onClick={handleSavePreferences}
          >
            {t("save_preferences")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
