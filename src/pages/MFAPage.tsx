
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Shield, ShieldCheck } from 'lucide-react';

const MFAPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  // Log a security event
  const logSecurityEvent = async (eventType: string, details: any) => {
    try {
      const { error } = await supabase.rpc('log_security_event', {
        _event_type: eventType,
        _details: details
      });
      
      if (error) {
        console.error('Error logging security event:', error);
      }
    } catch (err) {
      console.error('Failed to log security event:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      
      if (user) {
        setIsAuthenticated(true);
        if (user.email) {
          setUserEmail(user.email);
        }
        
        // Check if user is authenticated via Google
        const providerData = user.providerData;
        const isGoogleSignIn = providerData.some(provider => provider.providerId === 'google.com');
        setIsGoogleAuth(isGoogleSignIn);
        
        // Log authentication bypass
        await logSecurityEvent('mfa_bypassed', { 
          email: user.email,
          reason: 'MFA disabled globally',
          provider: isGoogleSignIn ? 'google' : 'email'
        });
        
        // Show a toast message while redirecting
        toast.success(language === "en" ? 
          'Authentication successful! Redirecting to your profile...' : 
          'ยืนยันตัวตนสำเร็จ! กำลังนำคุณไปยังโปรไฟล์...');
        
        // Redirect to profile after a brief delay
        const timer = setTimeout(() => {
          navigate('/profile');
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setIsAuthenticated(false);
        navigate('/');
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, language]);

  // Apply theme-based styles
  const isDarkMode = theme === 'dark';
  
  if (isLoading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-black text-white' : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'}`}>
        <div className="animate-pulse flex flex-col items-center">
          <Shield size={48} className="opacity-50 mb-4" />
          <p className="text-lg">
            {language === "en" ? "Authentication in progress..." : "กำลังดำเนินการยืนยันตัวตน..."}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-black text-white' : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'}`}>
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className={isDarkMode ? 
            "bg-black/50 border border-green-500/30 backdrop-blur text-white" : 
            "bg-white/90 border border-green-500/30 backdrop-blur text-gray-900"
          }>
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-center mt-2">
                {t('authentication_success') || 'Authentication Successful'}
              </CardTitle>
              <CardDescription className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('auth_redirect') || 'You have been authenticated. Redirecting to your profile...'}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MFAPage;
