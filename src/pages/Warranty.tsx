
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { FeatureSteps } from "@/components/ui/feature-section";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { User } from "lucide-react";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [warrantyData, setWarrantyData] = useState({
    orderNumber: "",
    purchaseSource: "",
    fullName: "",
    phoneNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.split('-')[1]]: value
    }));
  };

  const handleWarrantyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setWarrantyData(prev => ({
      ...prev,
      [id]: value
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
    if (!auth.currentUser) {
      setShowAuthDialog(true);
    } else {
      setShowWarrantyForm(true);
    }
  };

  const handleWarrantySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the warranty data to your backend
    console.log("Warranty Data:", warrantyData);
    toast.success("Warranty registration submitted successfully!");
    setShowWarrantyForm(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold">Warranty Information</h1>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Warranty Policy</h2>
            <p className="text-gray-300">
              At SIAMTECH, we stand behind the quality of our products. All our equipment comes with a 1-year standard warranty that covers manufacturing defects and malfunctions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Coverage Details</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>All Products: 1-year comprehensive warranty</li>
              <li>Coverage includes manufacturing defects and malfunctions</li>
              <li>Free repair or replacement of defective parts</li>
              <li>Technical support throughout the warranty period</li>
            </ul>
          </section>

          <section>
            <FeatureSteps 
              features={features}
              title="How to Activate Your Warranty"
              autoPlayInterval={4000}
              className="bg-gray-900/50 rounded-lg backdrop-blur-sm"
            />
          </section>

          <section className="mt-8 p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm">
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
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full name</Label>
              <Input
                id="signup-name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-white/5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-white/5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-white/5"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full"
          >
            Continue with Google
          </Button>
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

          <form onSubmit={handleWarrantySubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Order Number</Label>
              <Input
                id="orderNumber"
                value={warrantyData.orderNumber}
                onChange={handleWarrantyInputChange}
                placeholder="Enter your order number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchaseSource">Source of Purchase</Label>
              <Input
                id="purchaseSource"
                value={warrantyData.purchaseSource}
                onChange={handleWarrantyInputChange}
                placeholder="Where did you purchase the product?"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={warrantyData.fullName}
                onChange={handleWarrantyInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={warrantyData.phoneNumber}
                onChange={handleWarrantyInputChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Warranty Registration
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footerdemo />
    </div>
  );
};

export default Warranty;
