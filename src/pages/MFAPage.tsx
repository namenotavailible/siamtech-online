
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EmailOTP from '@/components/EmailOTP';
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
  const [isMfaEnabled, setIsMfaEnabled] = useState(true);
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
        
        // If Google auth, check the profile in Supabase to determine MFA status
        if (isGoogleSignIn) {
          try {
            const { data, error } = await supabase
              .from('profiles')
              .select('mfa_enabled, is_email_verified')
              .eq('id', user.uid)
              .single();
            
            if (error) {
              console.error('Error fetching profile:', error);
            } else if (data) {
              setIsMfaEnabled(data.mfa_enabled);
              
              // If MFA is disabled for this user or they're already verified, redirect to profile
              if (!data.mfa_enabled || data.is_email_verified) {
                // Log the bypass
                await logSecurityEvent('mfa_bypassed', { 
                  email: user.email,
                  reason: !data.mfa_enabled ? 'MFA disabled for user' : 'Already verified',
                  provider: 'google'
                });
                
                // Update profile with login info
                await supabase
                  .from('profiles')
                  .update({ 
                    last_login: new Date().toISOString(),
                    last_ip: 'client-ip-unavailable' // In a real app, this would come from the server
                  })
                  .eq('id', user.uid);
                
                // Show a toast message while redirecting
                toast.success(language === "en" ? 
                  'Google authentication successful! Redirecting to your profile...' : 
                  'ยืนยันตัวตนผ่าน Google สำเร็จ! กำลังนำคุณไปยังโปรไฟล์...');
                
                // Redirect to profile after a brief delay
                const timer = setTimeout(() => {
                  navigate('/profile');
                }, 2000);
                return () => clearTimeout(timer);
              }
            }
          } catch (err) {
            console.error('Error checking profile:', err);
          }
        }
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
            {language === "en" ? "Loading security verification..." : "กำลังโหลดการตรวจสอบความปลอดภัย..."}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-black text-white' : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'}`}>
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {isGoogleAuth && !isMfaEnabled ? (
            <Card className={isDarkMode ? 
              "bg-black/50 border border-green-500/30 backdrop-blur text-white" : 
              "bg-white/90 border border-green-500/30 backdrop-blur text-gray-900"
            }>
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-center mt-2">
                  {t('google_authentication_success') || 'Google Authentication Successful'}
                </CardTitle>
                <CardDescription className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('google_auth_redirect') || 'You have been authenticated with Google. Redirecting to your profile...'}
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <Card className={isDarkMode ? 
              "bg-black/50 border border-white/10 backdrop-blur text-white" : 
              "bg-white/90 border border-gray-200 backdrop-blur text-gray-900"
            }>
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-center mt-2">
                  {t('two_factor_authentication') || 'Two-Factor Authentication'}
                </CardTitle>
                <CardDescription className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('verify_with_email_otp') || 'Verify your identity with an email verification code'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmailOTP defaultEmail={userEmail} />
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default MFAPage;
