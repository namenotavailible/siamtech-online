
"use client";

import * as React from "react";
import { NewsletterSection } from "./footer/newsletter-section";
import { QuickLinks } from "./footer/quick-links";
import { ContactInfo } from "./footer/contact-info";
import { SocialSection } from "./footer/social-section";
import { BottomSection } from "./footer/bottom-section";

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  
  return (
    <footer className="relative border-t border-gray-800 bg-black text-white">
      <div className="mx-auto w-full max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <NewsletterSection />
          <QuickLinks />
          <ContactInfo />
          <SocialSection isDarkMode={isDarkMode} onDarkModeChange={setIsDarkMode} />
        </div>
        <BottomSection />
      </div>
    </footer>
  );
}

export { Footerdemo };
