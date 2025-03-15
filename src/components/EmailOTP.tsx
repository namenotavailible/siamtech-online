
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, Send, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type EmailAuthPhase = 'request' | 'verify';

const EmailOTP = ({ defaultEmail = '' }) => {
  const [email, setEmail] = useState(defaultEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState<EmailAuthPhase>('request');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const form = useForm({
    defaultValues: {
      otp: '',
    },
  });

  // Handle countdown for resending OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    // If defaultEmail is provided, automatically start OTP flow
    if (defaultEmail) {
      setEmail(defaultEmail);
      
      // Don't auto-send when coming from login flow
      // Check if OTP for this email was previously sent
      const lastSentTime = localStorage.getItem(`otp_sent_time_${defaultEmail}`);
      if (lastSentTime && (Date.now() - parseInt(lastSentTime)) < 60000) {
        // If OTP was sent less than a minute ago, go straight to verify
        setPhase('verify');
        const remainingTime = Math.floor((60000 - (Date.now() - parseInt(lastSentTime))) / 1000);
        setCountdown(remainingTime > 0 ? remainingTime : 0);
      }
    }
  }, [defaultEmail]);

  // Send OTP to user's email
  const handleSendOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!email) {
      toast.error(t("email_required") || "Email is required");
      return;
    }
    
    setIsLoading(true);

    try {
      // Generate a 6-digit OTP
      const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store OTP in localStorage (in a real app, this would be handled more securely)
      localStorage.setItem(`otp_for_${email}`, generatedOTP);
      localStorage.setItem(`otp_sent_time_${email}`, Date.now().toString());
      
      // Set countdown for resending
      setCountdown(60);
      
      // In a real implementation, you would send this via a secure email service
      // Here we're using Firebase's email link as a temporary solution
      const actionCodeSettings = {
        url: window.location.origin + '/profile',
        handleCodeInApp: true,
      };
      
      // Send email with OTP
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      // Show OTP in a toast for demo purposes (in production this would be sent via email only)
      toast.info(
        <div className="font-mono">
          {t("demo_otp_message") || "For demo purposes, your OTP is:"} 
          <div className="text-lg font-bold mt-2 text-center">{generatedOTP}</div>
        </div>, 
        { duration: 10000 }
      );
      
      // Move to verification phase
      setPhase('verify');
      
      // Save the email for later use
      localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error(t("failed_to_send_otp") || "Failed to send OTP. Please try again.");
    }

    setIsLoading(false);
  };

  // Verify the OTP entered by user
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get stored OTP for this email
      const storedOTP = localStorage.getItem(`otp_for_${email}`);
      
      if (otp === storedOTP) {
        // OTP is correct
        localStorage.removeItem(`otp_for_${email}`); // Clear the OTP
        localStorage.removeItem(`otp_sent_time_${email}`); // Clear the sent time
        localStorage.removeItem('emailForSignIn'); // Clear the email
        
        toast.success(t("verification_successful") || "Verification successful!");
        navigate('/profile');
      } else {
        // OTP is incorrect
        toast.error(t("invalid_otp") || "Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error(t("verification_failed") || "Verification failed. Please try again.");
    }

    setIsLoading(false);
  };

  // Render the request OTP form
  if (phase === 'request') {
    return (
      <div className="space-y-4 w-full max-w-sm mx-auto">
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div className="space-y-2">
            <FormLabel>{t("email") || "Email"}</FormLabel>
            <Input
              type="email"
              placeholder={t("enter_your_email") || "Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-primary/5"
              autoFocus={!defaultEmail}
              disabled={!!defaultEmail}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <span className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                {t("sending") || 'Sending...'}
              </span>
            ) : (
              <span className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                {t("send_verification_code") || 'Send Verification Code'}
              </span>
            )}
          </Button>
        </form>
      </div>
    );
  }

  // Render the verify OTP form
  return (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      <form onSubmit={handleVerifyOTP} className="space-y-4">
        <div className="space-y-2">
          <FormLabel>{t("verification_code") || "Verification Code"}</FormLabel>
          <p className="text-sm text-muted-foreground">
            {t("otp_sent_to") || "A verification code has been sent to"} <span className="font-medium">{email}</span>
          </p>
          
          <div className="my-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button 
            type="submit" 
            disabled={isLoading || otp.length !== 6}
            className="w-full"
          >
            {isLoading ? (
              <span className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                {t("verifying") || 'Verifying...'}
              </span>
            ) : (
              t("verify") || 'Verify'
            )}
          </Button>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setPhase('request');
                setOtp('');
              }}
              size="sm"
              className="w-1/2 mr-1"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t("back") || 'Back'}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSendOTP}
              disabled={countdown > 0 || isLoading}
              size="sm"
              className="w-1/2 ml-1"
            >
              {countdown > 0 ? (
                `${t("resend_in") || 'Resend in'} ${countdown}s`
              ) : (
                t("resend_code") || 'Resend Code'
              )}
            </Button>
          </div>
        </div>
      </form>
      
      {!localStorage.getItem(`otp_for_${email}`) && (
        <Alert className="mt-4">
          <AlertDescription>
            {t("otp_expired") || "This verification code may have expired. Please request a new one if needed."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EmailOTP;
