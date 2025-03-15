
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EmailLinkAuth from '@/components/EmailLinkAuth';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useLanguage } from '@/contexts/LanguageContext';

const MFAPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="bg-black/50 border border-white/10 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-center text-white">
                {t('two_factor_authentication') || 'Two-Factor Authentication'}
              </CardTitle>
              <CardDescription className="text-center text-gray-400">
                {t('verify_with_email_link') || 'Verify your identity with an email link'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailLinkAuth />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MFAPage;
