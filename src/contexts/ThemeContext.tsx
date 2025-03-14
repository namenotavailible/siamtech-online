
import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Define logo paths as constants for reuse
export const DARK_LOGO_PATH = "/lovable-uploads/0f82fd40-daa0-40de-9205-97344aaafee5.png";
export const LIGHT_LOGO_PATH = "/lovable-uploads/9f7f3e91-1510-4ec4-8391-68411a8131e6.png";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for stored theme preference or use system preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) return savedTheme;
    
    // Default to dark theme
    return "dark";
  });

  useEffect(() => {
    // Update document class for theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    
    // Save theme preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Preload both logo images on component mount
  useEffect(() => {
    const darkLogoImage = new Image();
    darkLogoImage.src = DARK_LOGO_PATH;
    
    const lightLogoImage = new Image();
    lightLogoImage.src = LIGHT_LOGO_PATH;

    // Optional: add loading event listeners if needed
    // darkLogoImage.onload = () => console.log("Dark logo preloaded");
    // lightLogoImage.onload = () => console.log("Light logo preloaded");
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
