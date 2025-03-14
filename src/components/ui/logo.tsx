
import React from "react";
import { useTheme, DARK_LOGO_PATH, LIGHT_LOGO_PATH } from "@/contexts/ThemeContext";
import { Skeleton } from "@/components/ui/skeleton";

export function Logo() {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  React.useEffect(() => {
    // Check if images are already cached by the browser
    const logoPath = theme === "dark" ? DARK_LOGO_PATH : LIGHT_LOGO_PATH;
    const img = new Image();
    img.src = logoPath;
    
    if (img.complete) {
      setIsLoaded(true);
    } else {
      img.onload = () => setIsLoaded(true);
    }

    return () => {
      img.onload = null;
    };
  }, [theme]);
  
  return (
    <a href="/" className="flex items-center pl-0">
      {!isLoaded && <Skeleton className="h-32 w-32" />}
      <img 
        src={theme === "dark" ? DARK_LOGO_PATH : LIGHT_LOGO_PATH} 
        alt="SIAMTECH online"
        className={`h-32 w-auto object-contain pt-2 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
    </a>
  );
}
