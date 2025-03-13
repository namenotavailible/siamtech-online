
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { FeatureSteps } from "@/components/ui/feature-section";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { User } from "lucide-react";
import EmailLinkAuth from "@/components/EmailLinkAuth";
import { GoogleLogo } from "@/components/ui/google-logo";
import WarrantyRegistrationForm from "@/components/warranty/WarrantyRegistrationForm";
import WarrantyFAQ from "@/components/warranty/WarrantyFAQ";

const features = [
  {
    step: "Step 1",
    title: "Create an Account",
    content: "Sign up for a SIAMTECH account to access warranty registration.",
    image: "/placeholder.svg"
  },
  {
    step: "Step 2",
    title: "Register Your Product",
    content: "Enter your product details and proof of purchase information.",
    image: "/placeholder.svg"
  },
  {
    step: "Step 3",
    title: "Activate Warranty",
    content: "Complete the registration to activate your 1-year warranty coverage.",
    image: "/placeholder.svg"
  }
];

const Warranty = () => {
  const navigate = useNavigate();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showWarrantyForm, setShowWarrantyForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.split('-')[1]]: value
    }));
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Account created successfully!");
      setShowAuthDialog(false);
      setShowWarrantyForm(true);
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google successfully!");
      setShowAuthDialog(false);
      setShowWarrantyForm(true);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  const handleActivateWarranty = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
    } else {
      setShowWarrantyForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <section id="overview" className="space-y-6">
            <h1 className="text-4xl font-bold">Warranty Information</h1>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Our Warranty Policy</h2>
              <p className="text-gray-300">
                At SIAMTECH, we stand behind the quality of our products. All our equipment comes with a 1-year standard warranty that covers manufacturing defects and malfunctions.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Coverage Details</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>All Products: 1-year comprehensive warranty</li>
                <li>Coverage includes manufacturing defects and malfunctions</li>
                <li>Free repair or replacement of defective parts</li>
                <li>Technical support throughout the warranty period</li>
              </ul>
            </div>
          </section>

          <section id="registration" className="space-y-6">
            <FeatureSteps 
              features={features}
              title="How to Activate Your Warranty"
              autoPlayInterval={4000}
              className="bg-gray-900/50 rounded-lg backdrop-blur-sm"
            />

            <div className="mt-8 p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4">Activate Your Warranty</h2>
              <p className="text-gray-300 mb-4">
                Ready to activate your warranty? Sign in to your account and register your product to get started.
              </p>
              <Button
                onClick={handleActivateWarranty}
                className="bg-white text-black hover:bg-gray-200 transition-colors"
              >
                Activate Warranty
              </Button>
            </div>
          </section>

          <section id="policy" className="space-y-6">
            <h2 className="text-2xl font-semibold">Extended Warranty Options</h2>
            <p className="text-gray-300">
              Protect your investment further with our extended warranty plans:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">Premium Protection</h3>
                <p className="text-gray-300 mb-4">Extends coverage to 2 years with priority service</p>
                <p className="text-lg font-semibold">750 ฿</p>
              </div>
              <div className="p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">Complete Care</h3>
                <p className="text-gray-300 mb-4">3-year coverage including accidental damage protection</p>
                <p className="text-lg font-semibold">1,250 ฿</p>
              </div>
            </div>
          </section>

          <section id="faqs" className="space-y-6">
            <WarrantyFAQ />
          </section>
        </motion.div>
      </main>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10">
              <User className="h-5 w-5 text-white" />
            </div>
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-center">Sign up to SIAMTECH</DialogTitle>
              <DialogDescription className="text-center">
                Create an account to activate your warranty
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="signup-name">Full name</Label>
                <Input
                  id="signup-name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-8"
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-8 text-sm">
              Sign up
            </Button>
          </form>

          <div className="flex items-center gap-2 my-2 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
            <span className="text-xs text-gray-400">Or</span>
          </div>

          <div className="space-y-2">
            <Button variant="outline" onClick={handleGoogleSignIn} className="w-full h-8 text-sm">
              <GoogleLogo />
              Continue with Google
            </Button>
            
            <EmailLinkAuth />
          </div>

          <p className="text-center text-xs text-gray-400 mt-2">
            By signing up you agree to our{" "}
            <a href="/privacy" className="underline hover:no-underline">
              Terms
            </a>
            .
          </p>
        </DialogContent>
      </Dialog>

      <Dialog open={showWarrantyForm} onOpenChange={setShowWarrantyForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Warranty Registration</DialogTitle>
            <DialogDescription>
              Please fill in your product details to activate the warranty
            </DialogDescription>
          </DialogHeader>

          <WarrantyRegistrationForm onClose={() => setShowWarrantyForm(false)} />
        </DialogContent>
      </Dialog>

      <Footerdemo />
    </div>
  );
};

export default Warranty;
