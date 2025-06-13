
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { submitWarrantyRegistration } from "@/services/warrantyService";
import { GoogleLogo } from "@/components/ui/google-logo";

const productOptions = [
  { id: "FIFINE_AM8", name: "FIFINE Ampligame AM8" },
  { id: "FIFINE_A8", name: "FIFINE Ampligame A8" },
  { id: "VXE_R1", name: "VXE Dragonfly R1" },
  { id: "VGN_F1", name: "VGN Dragonfly F1" }
];

interface WarrantyRegistrationFormProps {
  onClose: () => void;
}

const WarrantyRegistrationForm = ({ onClose }: WarrantyRegistrationFormProps) => {
  const [user, loading, error] = useAuthState(auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    product_name: "",
    order_number: "",
    purchase_date: "",
    source_of_purchase: "Shopee"
  });

  // Pre-populate form when user signs in
  useEffect(() => {
    if (user) {
      console.log("User authenticated:", user.uid, user.email);
      setFormData(prev => ({
        ...prev,
        email: user.email || "",
        full_name: user.displayName || ""
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    if (field === 'product_name') {
      const selectedProduct = productOptions.find(p => p.id === value);
      setFormData(prev => ({
        ...prev,
        product_name: selectedProduct?.name || ""
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log("Starting Google sign in...");
      setSubmitError(null);
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google sign in successful:", result.user.uid);
      toast.success("Successfully signed in with Google!");
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    console.log("=== FORM SUBMISSION START ===");
    console.log("User state:", user ? { uid: user.uid, email: user.email } : "No user");
    console.log("Form data:", formData);
    
    if (!user) {
      const errorMsg = "You must be signed in to submit a warranty registration";
      console.error(errorMsg);
      setSubmitError(errorMsg);
      return;
    }

    // Validate required fields
    const requiredFields = ['full_name', 'email', 'phone_number', 'product_name', 'order_number', 'purchase_date'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      const errorMsg = `Please fill in all required fields: ${missingFields.join(', ')}`;
      setSubmitError(errorMsg);
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Getting fresh auth token...");
      const token = await user.getIdToken(true);
      console.log("Fresh token obtained:", !!token);
      
      console.log("Submitting to Firestore...");
      const result = await submitWarrantyRegistration(formData, user);
      console.log("Submission successful:", result);
      
      toast.success("Warranty registration submitted successfully!");
      onClose();
    } catch (error) {
      console.error("=== SUBMISSION ERROR ===", error);
      
      let errorMessage = "Failed to submit warranty registration. Please try again.";
      
      if (error instanceof Error && error.message.includes("Missing or insufficient permissions")) {
        errorMessage = "Authentication error. Please sign out and sign in again, then try submitting.";
      }
      
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading authentication...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert>
          <AlertDescription>
            Error loading authentication: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
          <p className="text-gray-600 mb-4">Please sign in to register your warranty.</p>
        </div>
        {submitError && (
          <Alert>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}
        <Button onClick={handleGoogleSignIn} className="w-full" variant="outline">
          <GoogleLogo />
          Sign in with Google
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* User info display */}
      <div className="p-3 bg-green-50 border border-green-200 rounded-md">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-green-800">
              Signed in as: <strong>{user.email}</strong>
            </p>
          </div>
          <Button onClick={handleSignOut} size="sm" variant="outline">
            Sign Out
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {submitError && (
          <Alert>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input
            id="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="product_name">Product</Label>
          <Select value={formData.product_name ? productOptions.find(p => p.name === formData.product_name)?.id : ""} onValueChange={handleSelectChange('product_name')} required>
            <SelectTrigger>
              <SelectValue placeholder="Select your product" />
            </SelectTrigger>
            <SelectContent>
              {productOptions.map(product => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="order_number">Order Number</Label>
          <Input
            id="order_number"
            value={formData.order_number}
            onChange={handleInputChange}
            placeholder="Enter your order number"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="purchase_date">Purchase Date</Label>
          <Input
            id="purchase_date"
            type="date"
            value={formData.purchase_date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="source_of_purchase">Source of Purchase</Label>
          <Select value={formData.source_of_purchase} onValueChange={handleSelectChange('source_of_purchase')} required>
            <SelectTrigger>
              <SelectValue placeholder="Select where you purchased" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Shopee">Shopee</SelectItem>
              <SelectItem value="Lazada">Lazada</SelectItem>
              <SelectItem value="Official Store">Official Store</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Warranty Registration"}
        </Button>
      </form>
    </div>
  );
};

export default WarrantyRegistrationForm;
