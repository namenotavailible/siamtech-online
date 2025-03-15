
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EmailOTP from '@/components/EmailOTP';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const MFAPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        if (user.email) {
          setUserEmail(user.email);
        }
        
        // Check if user is authenticated via Google
        const providerData = user.providerData;
        if (providerData.some(provider => provider.providerId === 'google.com')) {
          setIsGoogleAuth(true);
          // Redirect to profile page after a brief delay to show the message
          const timer = setTimeout(() => {
            navigate('/profile');
          }, 3000);
          return () => clearTimeout(timer);
        }
      } else {
        setIsAuthenticated(false);
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Apply theme-based styles
  const isDarkMode = theme === 'dark';
  
  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-black text-white' : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'}`}>
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {isGoogleAuth ? (
            <Card className={isDarkMode ? 
              "bg-black/50 border border-white/10 backdrop-blur text-white" : 
              "bg-white/90 border border-gray-200 backdrop-blur text-gray-900"
            }>
              <CardHeader>
                <CardTitle className="text-center">
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
                <CardTitle className="text-center">
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
