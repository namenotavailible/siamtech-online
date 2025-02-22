
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

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/');
      return;
    }

    setProfile({
      displayName: user.displayName || '',
      email: user.email || '',
    });
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button variant="link" onClick={() => navigate('/')} className="text-white">
              <ChevronLeft className="me-1 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              Go back
            </Button>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={profile.displayName}
                  readOnly
                  className="bg-white/5"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
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
                Sign Out
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
