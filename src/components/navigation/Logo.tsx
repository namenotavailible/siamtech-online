
import React, { useState, useEffect } from "react";
import { useTheme, DARK_LOGO_PATH, LIGHT_LOGO_PATH } from "@/contexts/ThemeContext";
import { Skeleton } from "@/components/ui/skeleton";

export function Logo() {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use the current theme to determine which logo to display
  const logoPath = theme === "dark" ? DARK_LOGO_PATH : LIGHT_LOGO_PATH;
  
  useEffect(() => {
    // Reset loading state when theme changes
    setIsLoaded(false);
    
    // Check if image is already in browser cache
    const img = new Image();
    img.src = logoPath;
    
    if (img.complete) {
      // Image is already cached, show it immediately
      setIsLoaded(true);
    } else {
      // Image is not cached, wait for it to load
      img.onload = () => setIsLoaded(true);
    }

    return () => {
      img.onload = null;
    };
  }, [logoPath]);
  
  return (
    <a href="/" className="flex items-center pl-0">
      <div className="h-32 w-32 relative">
        {!isLoaded && <Skeleton className="absolute inset-0" />}
        <img 
          src={logoPath}
          alt="SIAMTECH online"
          className={`h-32 w-auto object-contain pt-2 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          loading="eager" // Tell browser to load this image with high priority
        />
      </div>
    </a>
  );
}
