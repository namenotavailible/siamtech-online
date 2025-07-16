
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId, useState, useEffect } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { GoogleLogo } from "@/components/ui/google-logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SignUpDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const id = useId();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignedInAlert, setShowSignedInAlert] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (open && isAuthenticated) {
      setOpen(false);
      setShowSignedInAlert(true);
      setTimeout(() => {
        setShowSignedInAlert(false);
      }, 3000);
    }
  }, [open, isAuthenticated, setOpen]);

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
    
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      // Send email verification
      await sendEmailVerification(userCredential.user);
      
      toast.success(t("account_created_success"));
      setOpen(false);
      console.log("User signed up:", userCredential.user);
      
      // Redirect directly to profile
      navigate('/profile');
    } catch (error: any) {
      console.error("Error signing up:", error);
      let errorMessage = t("account_created_error");
      
      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = t("email_already_in_use") || "Email is already in use";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t("invalid_email") || "Invalid email format";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = t("weak_password") || "Password is too weak";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(t("google_signin_success"));
      setOpen(false);
      console.log("Google sign in result:", result.user);
      
      // Redirect directly to profile
      navigate('/profile');
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      let errorMessage = t("google_signin_error");
      
      // Handle specific Firebase errors
      if (error.code === 'auth/unauthorized-domain') {
        errorMessage = t("unauthorized_domain") || "This domain is not authorized for Google sign-in. Please contact the administrator.";
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = t("popup_closed") || "Sign-in popup was closed before completing the process";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showSignedInAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <Alert className="w-80 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 shadow-lg">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertDescription>
              {t("already_signed_in")}
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {!isAuthenticated && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10"
                aria-hidden="true"
              >
                <svg
                  className="stroke-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                </svg>
              </div>
              <DialogHeader>
                <DialogTitle className="sm:text-center">{t("signup_title")}</DialogTitle>
                <DialogDescription className="sm:text-center">
                  {t("signup_warranty_description")}
                </DialogDescription>
              </DialogHeader>
            </div>

            <form onSubmit={handleEmailSignUp} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`${id}-name`}>{t("full_name")}</Label>
                  <Input 
                    id={`${id}-name`} 
                    placeholder={t("full_name_placeholder")} 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-email`}>{t("email")}</Label>
                  <Input 
                    id={`${id}-email`} 
                    placeholder={t("email_placeholder")} 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-password`}>{t("password")}</Label>
                  <Input
                    id={`${id}-password`}
                    placeholder={t("password_placeholder")}
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Consent Checkboxes */}
                <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="privacy-consent-auth-signup"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                      required
                    />
                    <label htmlFor="privacy-consent-auth-signup" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed cursor-pointer">
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
                      id="marketing-consent-auth-signup"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                    />
                    <label htmlFor="marketing-consent-auth-signup" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed cursor-pointer">
                      I consent to receive marketing emails and promotional updates (optional).
                    </label>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !privacyConsent}>
                {isLoading ? `${t("signup_button")}...` : t("signup_button")}
              </Button>
            </form>

            <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
              <span className="text-xs text-gray-400">{t("or")}</span>
            </div>

            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <GoogleLogo />
              <span>{t("continue_with_google")}</span>
            </Button>

            <p className="text-center text-xs text-gray-400">
              {t("terms_agreement")}{" "}
              <a className="underline hover:no-underline" href="#">
                {t("terms")}
              </a>
              .
            </p>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
