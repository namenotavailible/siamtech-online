
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import { Footerdemo } from '@/components/ui/footer-section';
import { ChevronLeft } from "lucide-react";
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet';

const Profile = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
  });

  useEffect(() => {
    // First, check if this is an email link sign-in attempt
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const emailFromStorage = window.localStorage.getItem('emailForSignIn');
      if (emailFromStorage) {
        signInWithEmailLink(auth, emailFromStorage, window.location.href)
          .then(() => {
            window.localStorage.removeItem('emailForSignIn');
            toast.success(language === "en" ? 'Successfully signed in!' : 'เข้าสู่ระบบสำเร็จ!');
          })
          .catch((error) => {
            console.error('Error signing in with email link:', error);
            toast.error(language === "en" ? 'Failed to sign in. Please try again.' : 'ไม่สามารถเข้าสู่ระบบได้ โปรดลองอีกครั้ง');
            navigate('/');
          });
      }
    }

    // Then check if user is authenticated
    const user = auth.currentUser;
    if (!user) {
      navigate('/');
      return;
    }

    setProfile({
      displayName: user.displayName || '',
      email: user.email || '',
    });
  }, [navigate, language]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success(language === "en" ? 'Signed out successfully' : 'ออกจากระบบสำเร็จ');
      navigate('/');
    } catch (error) {
      toast.error(language === "en" ? 'Failed to sign out' : 'ไม่สามารถออกจากระบบได้');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>{language === "en" ? "My Profile - SIAMTECH Online" : "โปรไฟล์ของฉัน - SIAMTECH ออนไลน์"}</title>
        <meta name="description" content={language === "en" 
          ? "Manage your SIAMTECH profile and account settings" 
          : "จัดการโปรไฟล์และการตั้งค่าบัญชี SIAMTECH ของคุณ"} />
        <html lang={language} />
      </Helmet>
      
      <Navigation />
      
      <div className="pt-24 pb-16 relative">
        <div className="absolute top-4 left-4 z-10">
          <Button variant="link" onClick={() => navigate('/')} className="text-white">
            <ChevronLeft className="me-1 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
            {language === "en" ? "Go back" : "ย้อนกลับ"}
          </Button>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h1 className="text-2xl font-bold mb-8">
              {language === "en" ? "Profile Settings" : "การตั้งค่าโปรไฟล์"}
            </h1>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="displayName">
                  {language === "en" ? "Display Name" : "ชื่อที่แสดง"}
                </Label>
                <Input
                  id="displayName"
                  value={profile.displayName}
                  readOnly
                  className="bg-white/5"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  {language === "en" ? "Email" : "อีเมล"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  readOnly
                  className="bg-white/5"
                />
              </div>

              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full mt-6"
              >
                {language === "en" ? "Sign Out" : "ออกจากระบบ"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footerdemo />
    </div>
  );
};

export default Profile;
