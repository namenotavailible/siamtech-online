
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EmailOTP from '@/components/EmailOTP';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Helmet } from 'react-helmet';

const MFAPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    // Check if email was passed from sign-in
    const emailFromStorage = localStorage.getItem('emailForSignIn');
    if (emailFromStorage) {
      setUserEmail(emailFromStorage);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      if (user) {
        setIsAuthenticated(true);
        if (user.email) {
          setUserEmail(user.email);
        }
      } else {
        setIsAuthenticated(false);
        if (!emailFromStorage) {
          // Only redirect if we don't have an email from storage
          navigate('/');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Apply theme-based styles
  const isDarkMode = theme === 'dark';
  
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-black text-white' : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-black text-white' : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'}`}>
      <Helmet>
        <title>{t('two_factor_authentication') || 'Two Factor Authentication'}</title>
      </Helmet>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className={isDarkMode ? 
            "bg-black/50 border border-white/10 backdrop-blur text-white" : 
            "bg-white/90 border border-gray-200 backdrop-blur text-gray-900"
          }>
            <CardHeader>
              <CardTitle className="text-center">
                {t('two_factor_authentication') || 'Two Factor Authentication'}
              </CardTitle>
              <CardDescription className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('verify_with_email_otp') || 'Verify your identity with an email verification code'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailOTP defaultEmail={userEmail} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MFAPage;
