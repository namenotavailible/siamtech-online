
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { FeatureSteps } from "@/components/ui/feature-section";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { User } from "lucide-react";
import EmailLinkAuth from "@/components/EmailLinkAuth";
import { GoogleLogo } from "@/components/ui/google-logo";
import WarrantyRegistrationForm from "@/components/warranty/WarrantyRegistrationForm";
import WarrantyFAQ from "@/components/warranty/WarrantyFAQ";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const Warranty = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showWarrantyForm, setShowWarrantyForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Define features with translations
  const features = [
    {
      step: t("step_1"),
      title: t("create_account"),
      content: t("create_account_description"),
      image: "/placeholder.svg"
    },
    {
      step: t("step_2"),
      title: t("register_product"),
      content: t("register_product_description"),
      image: "/placeholder.svg"
    },
    {
      step: t("step_3"),
      title: t("activate_warranty_step"),
      content: t("activate_warranty_step_description"),
      image: "/placeholder.svg"
    }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.split('-')[1]]: value
    }));
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success(t("account_created_success"));
      setShowAuthDialog(false);
      setShowWarrantyForm(true);
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(t("account_created_error"));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success(t("google_signin_success"));
      setShowAuthDialog(false);
      setShowWarrantyForm(true);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(t("google_signin_error"));
    }
  };

  const handleActivateWarranty = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
    } else {
      setShowWarrantyForm(true);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <section id="overview" className="space-y-6">
            <h1 className="text-4xl font-bold">{t("warranty_info")}</h1>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{t("our_warranty_policy")}</h2>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {t("warranty_policy_description")}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{t("coverage_details")}</h2>
              <ul className={`list-disc list-inside ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>{t("coverage_details_list_1")}</li>
                <li>{t("coverage_details_list_2")}</li>
                <li>{t("coverage_details_list_3")}</li>
                <li>{t("coverage_details_list_4")}</li>
              </ul>
            </div>
          </section>

          <section id="registration" className="space-y-6">
            <FeatureSteps 
              features={features}
              title={t("how_to_activate_warranty")}
              autoPlayInterval={4000}
              className={`${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-100/80'} rounded-lg backdrop-blur-sm`}
            />

            <div className={`mt-8 p-6 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-100/80'} rounded-lg backdrop-blur-sm`}>
              <h2 className="text-2xl font-semibold mb-4">{t("activate_warranty")}</h2>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                {t("activate_warranty_description")}
              </p>
              <Button
                onClick={handleActivateWarranty}
                className={`${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} transition-colors`}
              >
                {t("activate_warranty_button")}
              </Button>
            </div>
          </section>

          <section id="policy" className="space-y-6">
            <h2 className="text-2xl font-semibold">{t("extended_warranty_options")}</h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {t("extended_warranty_description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-100/80'} rounded-lg backdrop-blur-sm`}>
                <h3 className="text-xl font-semibold mb-2">{t("premium_protection")}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{t("premium_protection_description")}</p>
                <p className="text-lg font-semibold">750 ฿</p>
              </div>
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-100/80'} rounded-lg backdrop-blur-sm`}>
                <h3 className="text-xl font-semibold mb-2">{t("complete_care")}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{t("complete_care_description")}</p>
                <p className="text-lg font-semibold">1,250 ฿</p>
              </div>
            </div>
          </section>

          <section id="faqs" className="space-y-6">
            <WarrantyFAQ />
          </section>
        </motion.div>
      </main>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10">
              <User className="h-5 w-5 text-white" />
            </div>
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-center">{t("signup_title")}</DialogTitle>
              <DialogDescription className="text-center">
                {t("signup_warranty_description")}
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="signup-name">{t("full_name")}</Label>
                <Input
                  id="signup-name"
                  placeholder={t("full_name_placeholder")}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-email">{t("email")}</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder={t("email_placeholder")}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">{t("password")}</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder={t("password_placeholder")}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-8"
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-8 text-sm">
              {t("signup_button")}
            </Button>
          </form>

          <div className="flex items-center gap-2 my-2 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
            <span className="text-xs text-gray-400">{t("or")}</span>
          </div>

          <div className="space-y-2">
            <Button variant="outline" onClick={handleGoogleSignIn} className="w-full h-8 text-sm">
              <GoogleLogo />
              {t("continue_with_google")}
            </Button>
            
            <EmailLinkAuth />
          </div>

          <p className="text-center text-xs text-gray-400 mt-2">
            {t("terms_agreement")}{" "}
            <a href="/privacy" className="underline hover:no-underline">
              {t("terms")}
            </a>
            .
          </p>
        </DialogContent>
      </Dialog>

      <Dialog open={showWarrantyForm} onOpenChange={setShowWarrantyForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("warranty_registration")}</DialogTitle>
            <DialogDescription>
              {t("warranty_registration_description")}
            </DialogDescription>
          </DialogHeader>

          <WarrantyRegistrationForm onClose={() => setShowWarrantyForm(false)} />
        </DialogContent>
      </Dialog>

      <Footerdemo />
    </div>
  );
};

export default Warranty;
