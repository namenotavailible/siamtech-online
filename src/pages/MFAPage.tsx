
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { auth } from '@/lib/firebase';

const MFAPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [otp, setOtp] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  // Display minutes and seconds in MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // If no email exists in localStorage, redirect to home
    const email = localStorage.getItem('emailForSignIn');
    if (!email) {
      navigate('/');
      toast.error(t('session_expired') || 'Your session has expired. Please sign in again.');
      return;
    }

    // Set up timer for OTP expiration
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clean up timer
    return () => clearInterval(timer);
  }, [navigate, t]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error(t('invalid_otp') || 'Please enter a valid 6-digit code');
      return;
    }

    setIsVerifying(true);
    try {
      // Compare with stored OTP
      const storedOTP = localStorage.getItem('tempOTP');
      
      if (otp === storedOTP) {
        // Successfully verified
        localStorage.removeItem('tempOTP');
        localStorage.removeItem('emailForSignIn');
        
        toast.success(t('verification_successful') || 'Verification successful!');
        
        // Redirect to profile page
        navigate('/profile');
      } else {
        toast.error(t('incorrect_otp') || 'Incorrect verification code. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error(t('verification_error') || 'An error occurred during verification. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = () => {
    // Generate a new 6-digit OTP
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('tempOTP', newOTP);
    
    // Reset timer
    setTimeLeft(300);
    setCanResend(false);
    
    // Show the OTP in the console for testing purposes
    console.log('New OTP:', newOTP);
    
    toast.success(t('otp_resent') || 'A new verification code has been sent to your email');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('verify_your_identity') || 'Verify Your Identity'}</CardTitle>
          <CardDescription>
            {t('otp_sent_description') || 'A verification code has been sent to your email. Please enter the code below.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-3 items-center">
            <InputOTP 
              maxLength={6}
              value={otp} 
              onChange={setOtp}
              disabled={isVerifying}
              placeholder="------"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            <div className="text-sm text-muted-foreground">
              {canResend ? (
                <span>{t('code_expired') || 'Code expired'}</span>
              ) : (
                <span>
                  {t('code_expires_in') || 'Code expires in'}: {formatTime(timeLeft)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full" 
            onClick={handleVerifyOTP}
            disabled={otp.length !== 6 || isVerifying}
          >
            {isVerifying 
              ? t('verifying') || 'Verifying...' 
              : t('verify') || 'Verify'}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleResendOTP}
            disabled={!canResend && timeLeft > 0}
          >
            {t('resend_code') || 'Resend Code'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MFAPage;
