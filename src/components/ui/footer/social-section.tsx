
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Facebook, Instagram, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLanguage } from "@/contexts/LanguageContext";

interface SocialSectionProps {
  isDarkMode: boolean;
  onDarkModeChange: (checked: boolean) => void;
}

export function SocialSection({ isDarkMode, onDarkModeChange }: SocialSectionProps) {
  const { t, language } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h3 
        className="text-lg font-semibold dark:text-white text-gray-800 mb-6"
      >
        {language === "en" ? "Follow Us" : "ติดตามเรา"}
      </h3>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href="https://www.facebook.com/profile.php?id=61551372441862" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full dark:border-gray-700 dark:bg-gray-900/50 dark:hover:bg-gray-800
                              light:border-gray-300 light:bg-gray-100 light:hover:bg-gray-200"
                  >
                    <Facebook className="h-4 w-4 dark:text-gray-400 dark:group-hover:text-white
                                        text-gray-600 group-hover:text-gray-900" />
                    <span className="sr-only">Facebook</span>
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{language === "en" ? "Follow us on Facebook" : "ติดตามเราบน Facebook"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href="https://www.instagram.com/siamtechonline/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full dark:border-gray-700 dark:bg-gray-900/50 dark:hover:bg-gray-800
                              light:border-gray-300 light:bg-gray-100 light:hover:bg-gray-200"
                  >
                    <Instagram className="h-4 w-4 dark:text-gray-400 dark:group-hover:text-white
                                          text-gray-600 group-hover:text-gray-900" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{language === "en" ? "Follow us on Instagram" : "ติดตามเราบน Instagram"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Shopee Button with actual logo */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href="https://shopee.co.th/siamtechonline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full dark:border-gray-700 dark:bg-gray-900/50 dark:hover:bg-gray-800
                              light:border-gray-300 light:bg-gray-100 light:hover:bg-gray-200"
                  >
                    <img 
                      src="/lovable-uploads/778d4e2b-b5f8-49be-bc82-100877bcf092.png" 
                      alt="Shopee" 
                      className="h-6 w-6 object-contain" 
                    />
                    <span className="sr-only">Shopee</span>
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{language === "en" ? "Shop on Shopee" : "ซื้อสินค้าบน Shopee"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm mr-2 dark:text-gray-400 text-gray-600">
            {language === "en" ? "Theme" : "ธีม"}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
