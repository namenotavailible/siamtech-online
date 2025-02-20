
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Facebook, Instagram } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface SocialSectionProps {
  isDarkMode: boolean;
  onDarkModeChange: (checked: boolean) => void;
}

export function SocialSection({ isDarkMode, onDarkModeChange }: SocialSectionProps) {
  return (
    <div className="space-y-4">
      <h3 
        className="text-lg font-semibold text-white mb-6"
        contentEditable
        suppressContentEditableWarning
      >
        Follow Us
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
                    className="rounded-full border-gray-700 bg-gray-900/50 hover:bg-gray-800"
                  >
                    <Facebook className="h-4 w-4 text-gray-400 group-hover:text-white" />
                    <span className="sr-only">Facebook</span>
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p contentEditable suppressContentEditableWarning>Follow us on Facebook</p>
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
                    className="rounded-full border-gray-700 bg-gray-900/50 hover:bg-gray-800"
                  >
                    <Instagram className="h-4 w-4 text-gray-400 group-hover:text-white" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p contentEditable suppressContentEditableWarning>Follow us on Instagram</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <ThemeToggle 
            isDark={isDarkMode}
            onDarkModeChange={onDarkModeChange}
          />
        </div>
      </div>
    </div>
  );
}
