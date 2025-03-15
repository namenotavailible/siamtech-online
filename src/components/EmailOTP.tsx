
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendEmailVerification, EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

// Style constants
const OTP_LENGTH = 6;

interface Char {
  index: number;
  char: string;
  isActive: boolean;
  hasFakeCaret: boolean;
  key: number;
}

const EmailOTP = ({ defaultEmail = '' }: { defaultEmail?: string }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDarkMode = theme === 'dark';
  
  const [email, setEmail] = useState(defaultEmail);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState('');
  
  // Create an array of characters for OTP input visualization
  const [chars, setChars] = useState<Char[]>(
    Array(OTP_LENGTH).fill('').map((_, index) => ({
      index,
      char: '',
      isActive: index === 0,
      hasFakeCaret: index === 0,
      key: index,
    }))
  );
  
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Start countdown timer after OTP is sent
    if (otpSent && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [otpSent, countdown]);

  useEffect(() => {
    // Set otp input focus when component mounts
    if (inputRef.current && otpSent) {
      inputRef.current.focus();
    }
  }, [otpSent]);

  const handleSendOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!email) {
      toast.error(t('please_enter_email') || 'Please enter your email');
      return;
    }

    setLoading(true);
    setCanResend(false);
    setCountdown(60);

    try {
      const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true,
      };

      // Check if user is authenticated
      const user = auth.currentUser;
      if (user) {
        // For this demo, we'll simulate sending an OTP instead of a verification link
        // In a real implementation, you would use a proper OTP service
        
        // Simulating OTP sending
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Store the "OTP" in localStorage (in a real app, this would be sent to the user's email)
        // This is just for demo purposes - in a real app, the OTP would be generated on the server
        const mockOTP = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem('tempOTP', mockOTP);
        
        console.log('OTP code generated:', mockOTP);
        
        toast.success(t('verification_code_sent') || 'Verification code sent to your email');
        setOtpSent(true);
      } else {
        // If no user is authenticated, this shouldn't happen
        // But we'll handle it by redirecting to home
        toast.error(t('authentication_required') || 'Authentication required');
        navigate('/');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      toast.error(t('error_sending_code') || 'Error sending verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    
    if (value.length <= OTP_LENGTH) {
      setOtp(value);
      
      // Update the visualization
      const newChars = chars.map((char, index) => ({
        index,
        char: value[index] || '',
        isActive: index === value.length,
        hasFakeCaret: index === value.length,
        key: char.key,
      }));
      
      setChars(newChars);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== OTP_LENGTH) {
      toast.error(t('enter_complete_code') || 'Please enter the complete verification code');
      return;
    }

    setVerifying(true);
    
    try {
      // In a real implementation, we would verify the OTP here
      // For this demo, we'll just check if it matches our mock OTP
      const mockOTP = localStorage.getItem('tempOTP');
      
      if (otp === mockOTP) {
        // Simulating verification delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Clean up storage
        localStorage.removeItem('emailForSignIn');
        localStorage.removeItem('tempOTP');
        
        toast.success(t('verification_successful') || 'Verification successful');
        navigate('/profile');
      } else {
        toast.error(t('verification_failed') || 'Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error(t('verification_failed') || 'Verification failed. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      handleSendOTP();
    }
  };

  const handleSkip = () => {
    localStorage.removeItem('emailForSignIn');
    localStorage.removeItem('tempOTP');
    navigate('/profile');
  };

  return (
    <div className="flex flex-col gap-4">
      {!otpSent ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              {t('email_address') || 'Email Address'}
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('email_placeholder') || 'Enter your email'}
              className={isDarkMode ? 'bg-gray-800' : ''}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('sending') || 'Sending...'}
              </>
            ) : (
              t('send_verification_code') || 'Send Verification Code'
            )}
          </Button>
        </form>
      ) : (
        <form ref={formRef} onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="otp" className="block text-sm font-medium">
              {t('verification_code') || 'Verification Code'}
            </label>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                {chars.map((char) => (
                  <div
                    key={char.key}
                    className={`flex items-center justify-center w-10 h-12 border ${
                      char.isActive
                        ? isDarkMode 
                          ? 'border-white' 
                          : 'border-black'
                        : isDarkMode
                          ? 'border-gray-600'
                          : 'border-gray-300'
                    } rounded-md text-xl font-bold relative`}
                  >
                    {char.char}
                    {char.hasFakeCaret && (
                      <div
                        className={`absolute h-5 w-0.5 ${
                          isDarkMode ? 'bg-white' : 'bg-black'
                        } animate-blink`}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <input
                ref={inputRef}
                id="otp"
                type="text"
                value={otp}
                onChange={handleInputChange}
                className="sr-only"
                pattern="[0-9]*"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={OTP_LENGTH}
                autoFocus
              />
              
              <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
                {t('enter_code_sent_to_email') || `Enter the code sent to ${email}`}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={verifying || otp.length !== OTP_LENGTH}
            >
              {verifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('verifying') || 'Verifying...'}
                </>
              ) : (
                t('verify_code') || 'Verify Code'
              )}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t('resend_code') || 'Resend code'}
                  </button>
                ) : (
                  <>
                    {t('resend_code_in') || `Resend code in ${countdown}s`}
                  </>
                )}
              </p>
            </div>
          </div>
        </form>
      )}
      
      <div className="mt-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleSkip}
        >
          {t('skip_for_now') || 'Skip for now'}
        </Button>
      </div>
    </div>
  );
};

export default EmailOTP;
