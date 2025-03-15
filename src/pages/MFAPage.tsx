
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const MFAPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Clean up any MFA-related storage
    localStorage.removeItem('emailForSignIn');
    localStorage.removeItem('tempOTP');
    
    // Redirect immediately to profile
    navigate('/profile');
    
    // Inform the user that MFA is disabled
    toast.info(t('mfa_disabled') || 'Two-factor authentication is currently disabled');
  }, [navigate, t]);

  // This component will not render anything as it immediately redirects
  return null;
};

export default MFAPage;
