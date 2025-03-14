
import { useTheme } from "@/contexts/ThemeContext";

export function Logo() {
  const { theme } = useTheme();
  
  return (
    <a href="/" className="flex items-center pl-0">
      <img 
        src={theme === "dark" 
          ? "/lovable-uploads/0f82fd40-daa0-40de-9205-97344aaafee5.png" 
          : "/lovable-uploads/9f7f3e91-1510-4ec4-8391-68411a8131e6.png"
        } 
        alt="SIAMTECH online"
        className="h-6 w-auto object-contain"
      />
    </a>
  );
}
