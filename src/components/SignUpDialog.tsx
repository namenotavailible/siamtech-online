
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { User } from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface SignUpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onShowSignUp?: () => void;
}

const SignUpDialog = ({ isOpen, onClose, onShowSignUp }: SignUpDialogProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Check authentication state when dialog opens
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      // If user is authenticated, close the dialog automatically
      if (user && isOpen) {
        onClose();
      }
    });
    
    return () => unsubscribe();
  }, [isOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.split('-')[1]]: value
    }));
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!privacyConsent) {
      toast.error("Please agree to the Privacy Policy to continue.");
      return;
    }
    
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success(t("account_created_success"));
      onClose();
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(t("account_creation_failed"));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success(t("google_signin_success"));
      onClose();
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(t("google_signin_failed"));
    }
  };

  // If user is already authenticated, don't render the dialog
  if (isAuthenticated && isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] max-h-[90vh] w-[95%] p-4">
        <div className="flex flex-col items-center gap-2">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10">
            <User className="h-5 w-5 text-white" />
          </div>
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-center text-base">{t("signup_title")}</DialogTitle>
            <DialogDescription className="text-center text-sm">
              {t("signup_warranty_description")}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleEmailSignUp} className="space-y-4 mt-2">
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="signup-name">{t("full_name")}</Label>
              <Input id="signup-name" placeholder={t("full_name_placeholder")} value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="signup-email">{t("email")}</Label>
              <Input id="signup-email" type="email" placeholder={t("email_placeholder")} value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="signup-password">{t("password")}</Label>
              <Input id="signup-password" type="password" placeholder={t("password_placeholder")} value={formData.password} onChange={handleInputChange} required />
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy-consent-signup"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                  required
                />
                <label htmlFor="privacy-consent-signup" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed cursor-pointer">
                  I agree to the{" "}
                  <a 
                    href="/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>{" "}
                  and consent to the processing of my personal data for account registration and service delivery.
                </label>
              </div>
              
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="marketing-consent-signup"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="marketing-consent-signup" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed cursor-pointer">
                  I consent to receive marketing emails and promotional updates (optional).
                </label>
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={!privacyConsent}>
            {t("signup_button")}
          </Button>
        </form>

        <div className="flex items-center gap-2 my-2 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
          <span className="text-xs text-gray-400">{t("or")}</span>
        </div>

        <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
          <span className="mr-2 h-4 w-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16px" height="16px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
          </span>
          {t("continue_with_google")}
        </Button>

        <p className="text-center text-xs text-gray-400">
          {t("terms_agreement")}{" "}
          <a href="/privacy" className="underline hover:no-underline">
            {t("terms")}
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
