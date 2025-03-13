
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

const Warranty = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showWarrantyForm, setShowWarrantyForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const features = [
    {
      step: t("warranty.steps.step1.title"),
      title: t("warranty.steps.step1.heading"),
      content: t("warranty.steps.step1.content"),
      image: "/placeholder.svg"
    },
    {
      step: t("warranty.steps.step2.title"),
      title: t("warranty.steps.step2.heading"),
      content: t("warranty.steps.step2.content"),
      image: "/placeholder.svg"
    },
    {
      step: t("warranty.steps.step3.title"),
      title: t("warranty.steps.step3.heading"),
      content: t("warranty.steps.step3.content"),
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
      toast.success(t("auth.success_message"));
      setShowAuthDialog(false);
      setShowWarrantyForm(true);
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(t("auth.error_message"));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success(t("auth.google_success"));
      setShowAuthDialog(false);
      setShowWarrantyForm(true);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(t("auth.google_error"));
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
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <section id="overview" className="space-y-6">
            <h1 className="text-4xl font-bold">{t("warranty.title")}</h1>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{t("warranty.policy.title")}</h2>
              <p className="text-gray-300">
                {t("warranty.policy.description")}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{t("warranty.coverage.title")}</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>{t("warranty.coverage.item1")}</li>
                <li>{t("warranty.coverage.item2")}</li>
                <li>{t("warranty.coverage.item3")}</li>
                <li>{t("warranty.coverage.item4")}</li>
              </ul>
            </div>
          </section>

          <section id="registration" className="space-y-6">
            <FeatureSteps 
              features={features}
              title={t("warranty.registration.title")}
              autoPlayInterval={4000}
              className="bg-gray-900/50 rounded-lg backdrop-blur-sm"
            />

            <div className="mt-8 p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4">{t("warranty.activate.title")}</h2>
              <p className="text-gray-300 mb-4">
                {t("warranty.activate.description")}
              </p>
              <Button
                onClick={handleActivateWarranty}
                className="bg-white text-black hover:bg-gray-200 transition-colors"
              >
                {t("warranty.activate.button")}
              </Button>
            </div>
          </section>

          <section id="policy" className="space-y-6">
            <h2 className="text-2xl font-semibold">{t("warranty.extended.title")}</h2>
            <p className="text-gray-300">
              {t("warranty.extended.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">{t("warranty.extended.premium.title")}</h3>
                <p className="text-gray-300 mb-4">{t("warranty.extended.premium.description")}</p>
                <p className="text-lg font-semibold">{t("warranty.extended.premium.price")}</p>
              </div>
              <div className="p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">{t("warranty.extended.complete.title")}</h3>
                <p className="text-gray-300 mb-4">{t("warranty.extended.complete.description")}</p>
                <p className="text-lg font-semibold">{t("warranty.extended.complete.price")}</p>
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
              <DialogTitle className="text-center">{t("auth.sign_up")}</DialogTitle>
              <DialogDescription className="text-center">
                {t("auth.create_account")}
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="signup-name">{t("auth.full_name")}</Label>
                <Input
                  id="signup-name"
                  placeholder={t("auth.name_placeholder")}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-email">{t("auth.email")}</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder={t("auth.email_placeholder")}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">{t("auth.password")}</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder={t("auth.password_placeholder")}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-8"
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-8 text-sm">
              {t("auth.sign_up_button")}
            </Button>
          </form>

          <div className="flex items-center gap-2 my-2 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
            <span className="text-xs text-gray-400">{t("auth.or")}</span>
          </div>

          <div className="space-y-2">
            <Button variant="outline" onClick={handleGoogleSignIn} className="w-full h-8 text-sm">
              <GoogleLogo />
              {t("auth.continue_with_google")}
            </Button>
            
            <EmailLinkAuth />
          </div>

          <p className="text-center text-xs text-gray-400 mt-2">
            {t("auth.terms_agreement")}{" "}
            <a href="/privacy" className="underline hover:no-underline">
              {t("auth.terms")}
            </a>
            {t("auth.of_ours")}
          </p>
        </DialogContent>
      </Dialog>

      <Dialog open={showWarrantyForm} onOpenChange={setShowWarrantyForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("warranty.form.title")}</DialogTitle>
            <DialogDescription>
              {t("warranty.form.description")}
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
