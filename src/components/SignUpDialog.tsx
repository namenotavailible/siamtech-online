
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { User } from "lucide-react";
import { GoogleLogo } from "@/components/ui/google-logo";
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
          </div>
          <Button type="submit" className="w-full">
            {t("signup_button")}
          </Button>
        </form>

        <div className="flex items-center gap-2 my-2 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
          <span className="text-xs text-gray-400">{t("or")}</span>
        </div>

        <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
          <GoogleLogo className="mr-2 h-4 w-4" />
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
