
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Facebook, Instagram, Moon, Send, Sun } from "lucide-react";
import { Link } from "react-router-dom";

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
          {/* Newsletter Section */}
          <div className="relative space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Stay Connected</h2>
            <p className="text-sm text-gray-400">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative mt-6">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-gray-700 focus:ring-gray-700"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-white hover:bg-gray-200 text-black transition-all"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link to="/" className="text-gray-400 transition-colors hover:text-white">
                Home
              </Link>
              <Link to="/about" className="text-gray-400 transition-colors hover:text-white">
                About Us
              </Link>
              <Link to="/products" className="text-gray-400 transition-colors hover:text-white">
                Products
              </Link>
              <Link to="/contact" className="text-gray-400 transition-colors hover:text-white">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <address className="space-y-3 text-sm text-gray-400 not-italic">
              <p>1444/97 Nakhon Chaisi Road,</p>
              <p>Thanon Nakhon Chaisi Subdistrict,</p>
              <p>Dusit District, Bangkok 10300, Thailand</p>
              <p>Phone: 66+99 999 9999</p>
              <p>Email: info@siamtechonline.com</p>
            </address>
          </div>

          {/* Social Links & Theme Toggle */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
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
                    <p>Follow us on Facebook</p>
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
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <Sun className="h-4 w-4 text-gray-400" />
              <Switch 
                id="dark-mode" 
                checked={isDarkMode} 
                onCheckedChange={setIsDarkMode}
                className="data-[state=checked]:bg-gray-700 data-[state=unchecked]:bg-gray-900"
              />
              <Moon className="h-4 w-4 text-gray-400" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-center md:flex-row">
          <p className="text-sm text-gray-400">
            © 2024 Siamtech Online Group Co.,Ltd. All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-400 transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 transition-colors hover:text-white">
              Cookie Settings
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };
