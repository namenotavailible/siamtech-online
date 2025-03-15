
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
import { User } from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { GoogleLogo } from "@/components/ui/google-logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [useMFA, setUseMFA] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    setIsLoading(true);
    setErrorMessage(null);
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
      
      // Redirect to MFA page if MFA is enabled
      if (useMFA) {
        // Store email for MFA page
        localStorage.setItem('emailForSignIn', formData.email);
        navigate('/mfa');
      } else {
        // Skip MFA and go directly to profile
        navigate('/profile');
      }
    } catch (error) {
      console.error("Error signing up:", error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        const errorCode = error.message;
        
        if (errorCode.includes("email-already-in-use")) {
          setErrorMessage(t("error_email_already_in_use") || "This email is already in use. Please try logging in instead.");
        } else if (errorCode.includes("weak-password")) {
          setErrorMessage(t("error_weak_password") || "Password is too weak. Please use a stronger password.");
        } else if (errorCode.includes("invalid-email")) {
          setErrorMessage(t("error_invalid_email") || "Invalid email address format.");
        } else {
          setErrorMessage(t("account_created_error") || "Failed to create account. Please try again later.");
        }
      } else {
        setErrorMessage(t("account_created_error") || "Failed to create account. Please try again later.");
      }
      
      toast.error(errorMessage || t("account_created_error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      // Clear any existing errors
      console.log("Attempting Google sign in...");
      
      // Make sure we're using the latest configuration
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, googleProvider);
      
      console.log("Google sign in successful:", result.user);
      toast.success(t("google_signin_success"));
      setOpen(false);
      
      // For Google sign-in, bypass MFA and go directly to profile
      navigate('/profile');
    } catch (error) {
      console.error("Error signing in with Google:", error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        const errorMessage = error.message;
        
        if (errorMessage.includes("popup-closed-by-user")) {
          setErrorMessage(t("error_popup_closed") || "Sign-in popup was closed. Please try again.");
        } else if (errorMessage.includes("popup-blocked")) {
          setErrorMessage(t("error_popup_blocked") || "Pop-up was blocked by your browser. Please allow pop-ups for this site.");
        } else if (errorMessage.includes("account-exists-with-different-credential")) {
          setErrorMessage(t("error_account_exists") || "An account already exists with the same email but different sign-in credentials.");
        } else {
          setErrorMessage(t("google_signin_error") || "Failed to sign in with Google. Please try again later.");
        }
      } else {
        setErrorMessage(t("google_signin_error") || "Failed to sign in with Google. Please try again later.");
      }
      
      toast.error(errorMessage || t("google_signin_error"));
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

            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

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
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="use-mfa" 
                    checked={useMFA} 
                    onCheckedChange={(checked) => setUseMFA(!!checked)} 
                  />
                  <label
                    htmlFor="use-mfa"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t("enable_two_factor_authentication") || "Enable two-factor authentication"}
                  </label>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
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
