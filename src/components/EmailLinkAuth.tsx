
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const EmailLinkAuth = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Action code settings required by Firebase
  const actionCodeSettings = {
    url: window.location.origin + '/profile', // Redirect to profile page after sign-in
    handleCodeInApp: true,
  };

  // Handle sending the sign-in link
  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // Save the email for later use
      window.localStorage.setItem('emailForSignIn', email);
      toast.success('Sign-in link sent! Check your email.');
    } catch (error) {
      console.error('Error sending sign-in link:', error);
      toast.error('Failed to send sign-in link. Please try again.');
    }

    setIsLoading(false);
  };

  // Check if the current URL contains a sign-in link
  const checkEmailLink = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailFromStorage = window.localStorage.getItem('emailForSignIn');
      
      if (!emailFromStorage) {
        // If email is not in storage, prompt user to provide it
        emailFromStorage = window.prompt('Please provide your email for confirmation');
      }

      if (emailFromStorage) {
        try {
          await signInWithEmailLink(auth, emailFromStorage, window.location.href);
          window.localStorage.removeItem('emailForSignIn'); // Clean up
          toast.success('Successfully signed in!');
          navigate('/profile');
        } catch (error) {
          console.error('Error signing in with email link:', error);
          toast.error('Failed to sign in. Please try again.');
        }
      }
    }
  };

  // Check for email link sign-in when component mounts
  useEffect(() => {
    checkEmailLink();
  }, []);

  return (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      <form onSubmit={handleSendLink} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/5"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Sending...' : 'Send Sign-in Link'}
        </Button>
      </form>
    </div>
  );
};

export default EmailLinkAuth;
