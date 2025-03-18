
import React, { useState, useEffect } from 'react';
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
import { GoogleLogo } from "@/components/ui/google-logo";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onShowSignUp: () => void;
}

export function LoginDialog({ open, setOpen, onShowSignUp }: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignedInAlert, setShowSignedInAlert] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();

  const t = (key: string) => {
    // Simple translation function
    const translations: Record<string, Record<string, string>> = {
      login_title: {
        en: "Sign In",
        th: "เข้าสู่ระบบ"
      },
      login_description: {
        en: "Enter your credentials to access your account",
        th: "กรอกข้อมูลเพื่อเข้าสู่ระบบบัญชีของคุณ"
      },
      email: {
        en: "Email",
        th: "อีเมล"
      },
      email_placeholder: {
        en: "Enter your email",
        th: "กรอกอีเมลของคุณ"
      },
      password: {
        en: "Password",
        th: "รหัสผ่าน"
      },
      password_placeholder: {
        en: "Enter your password",
        th: "กรอกรหัสผ่านของคุณ"
      },
      signin_button: {
        en: "Sign In",
        th: "เข้าสู่ระบบ"
      },
      or: {
        en: "or",
        th: "หรือ"
      },
      continue_with_google: {
        en: "Continue with Google",
        th: "เข้าสู่ระบบด้วย Google"
      },
      no_account: {
        en: "Don't have an account?",
        th: "ยังไม่มีบัญชี?"
      },
      create_account: {
        en: "Create an account",
        th: "สร้างบัญชีใหม่"
      },
      already_signed_in: {
        en: "You are already signed in",
        th: "คุณเข้าสู่ระบบอยู่แล้ว"
      },
      login_success: {
        en: "Logged in successfully",
        th: "เข้าสู่ระบบสำเร็จ"
      },
      login_error: {
        en: "Failed to log in",
        th: "เข้าสู่ระบบไม่สำเร็จ"
      },
      google_signin_success: {
        en: "Signed in with Google successfully",
        th: "เข้าสู่ระบบด้วย Google สำเร็จ"
      },
      google_signin_error: {
        en: "Failed to sign in with Google",
        th: "เข้าสู่ระบบด้วย Google ไม่สำเร็จ"
      },
    };
    
    return translations[key]?.[language] || key;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (open && isAuthenticated) {
      setShowSignedInAlert(true);
      setTimeout(() => {
        setShowSignedInAlert(false);
      }, 3000);
      return;
    }
    setOpen(open);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(t("login_success"));
      setOpen(false);
      navigate('/profile');
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(t("login_error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success(t("google_signin_success"));
      setOpen(false);
      navigate('/profile');
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(t("google_signin_error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
            <DialogTitle className="sm:text-center">{t("login_title")}</DialogTitle>
            <DialogDescription className="sm:text-center">
              {t("login_description")}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input 
                id="email" 
                placeholder={t("email_placeholder")} 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                placeholder={t("password_placeholder")}
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? `${t("signin_button")}...` : t("signin_button")}
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

        <div className="text-center">
          <span className="text-sm text-gray-400">{t("no_account")}</span>{" "}
          <button 
            className="text-sm text-primary underline hover:no-underline focus:outline-none"
            onClick={() => {
              setOpen(false);
              onShowSignUp();
            }}
          >
            {t("create_account")}
          </button>
        </div>
      </DialogContent>
      
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
    </Dialog>
  );
}
