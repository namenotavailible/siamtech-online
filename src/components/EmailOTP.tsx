
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { sendSignInLinkToEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

type EmailAuthPhase = 'request' | 'verify';

const EmailOTP = ({ defaultEmail = '' }) => {
  const [email, setEmail] = useState(defaultEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState<EmailAuthPhase>('request');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const form = useForm({
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    // If defaultEmail is provided (from Google auth), automatically send OTP
    if (defaultEmail) {
      setEmail(defaultEmail);
      handleSendOTP();
    }
  }, [defaultEmail]);

  // Log the 2FA attempt to security_logs
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
      
      // In a real implementation, you would send this via a secure email service
      // Here we're using Firebase's email link as a temporary solution
      const actionCodeSettings = {
        url: window.location.origin + '/profile',
        handleCodeInApp: true,
      };
      
      // Send email with OTP
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      // Log 2FA initiation to security_logs
      await logSecurityEvent('mfa_otp_sent', { email });
      
      // Show OTP in a toast for demo purposes (in production this would be sent via email only)
      toast.info(`For demo purposes, your OTP is: ${generatedOTP}`);
      
      // Move to verification phase
      setPhase('verify');
      
      // Save the email for later use
      localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error(t("failed_to_send_otp") || "Failed to send OTP. Please try again.");
      
      // Log the failure
      await logSecurityEvent('mfa_otp_send_failed', { 
        email, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
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
        
        // Log successful verification
        await logSecurityEvent('mfa_completed', { email });
        
        // Update the user's profile to mark them as verified
        if (auth.currentUser) {
          const { data, error } = await supabase
            .from('profiles')
            .update({ 
              is_email_verified: true,
              last_login: new Date().toISOString(),
              last_ip: 'client-ip-unavailable' // In a real app, this would come from the server
            })
            .eq('id', auth.currentUser.uid);
            
          if (error) {
            console.error('Error updating profile:', error);
          }
        }
        
        toast.success(t("verification_successful") || "Verification successful!");
        navigate('/profile');
      } else {
        // OTP is incorrect
        // Log failed attempt
        await logSecurityEvent('mfa_failed', { 
          email, 
          reason: 'Invalid OTP' 
        });
        
        toast.error(t("invalid_otp") || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error(t("verification_failed") || "Verification failed. Please try again.");
      
      // Log error
      await logSecurityEvent('mfa_error', { 
        email, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
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
            {isLoading ? (t("sending") || 'Sending...') : (t("send_verification_code") || 'Send Verification Code')}
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
                  {slots.map((slot, i) => (
                    <InputOTPSlot key={i} {...slot} index={i} />
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
            {isLoading ? (t("verifying") || 'Verifying...') : (t("verify") || 'Verify')}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              setPhase('request');
              setOtp('');
            }}
            className="w-full"
          >
            {t("back") || 'Back'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailOTP;
