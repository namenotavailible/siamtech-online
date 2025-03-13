
"use client";

import * as React from "react";
import { NewsletterSection } from "./footer/newsletter-section";
import { QuickLinks } from "./footer/quick-links";
import { ContactInfo } from "./footer/contact-info";
import { SocialSection } from "./footer/social-section";
import { BottomSection } from "./footer/bottom-section";
import { useTheme } from "@/contexts/ThemeContext";

function Footerdemo() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <footer className="relative border-t border-gray-800 dark:bg-black bg-gray-100 dark:text-white text-gray-800">
      <div className="mx-auto w-full max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <NewsletterSection />
          <QuickLinks />
          <ContactInfo />
          <SocialSection isDarkMode={theme === "dark"} onDarkModeChange={isDark => {
            if ((isDark && theme === "light") || (!isDark && theme === "dark")) {
              toggleTheme();
            }
          }} />
        </div>
        <BottomSection />
      </div>
    </footer>
  );
}

export { Footerdemo };
