
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
import { useId, useState } from "react";
import { User } from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { GoogleLogo } from "@/components/ui/google-logo";

export function SignUpDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const id = useId();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      toast.success(t("account_created_success"));
      console.log("User signed up:", userCredential.user);
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
      console.log("Google sign in result:", result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(t("google_signin_error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
