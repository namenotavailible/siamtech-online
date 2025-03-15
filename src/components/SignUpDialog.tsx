import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId, useState, useEffect } from "react";
import { User } from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleLogo } from "@/components/ui/google-logo";

function SignUpDialog() {
  const id = useId();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignedInAlert, setShowSignedInAlert] = useState(false);
  const [useMFA, setUseMFA] = useState(true);

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

  const handleOpenChange = (open: boolean) => {
    if (open && isAuthenticated) {
      setShowSignedInAlert(true);
      setTimeout(() => {
        setShowSignedInAlert(false);
      }, 3000);
      return;
    }
    setIsOpen(open);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setIsOpen(false);
      console.log("User signed up:", userCredential.user);
      
      // Redirect to MFA page if MFA is enabled
      if (useMFA) {
        // Pass the email to localStorage for the MFA page
        localStorage.setItem('emailForSignIn', formData.email);
        navigate('/mfa');
      } else {
        // Skip MFA and go directly to profile
        navigate('/profile');
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(t("account_created_error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(t("google_signin_success"));
      setIsOpen(false);
      console.log("Google sign in result:", result.user);
      
      // For Google sign-in, bypass MFA and go directly to profile
      navigate('/profile');
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(t("google_signin_error"));
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
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
      </>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="text-gray-300 hover:text-white transition-colors">
          <User className="h-5 w-5" />
        </button>
      </DialogTrigger>
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
  );
}

export default SignUpDialog;
