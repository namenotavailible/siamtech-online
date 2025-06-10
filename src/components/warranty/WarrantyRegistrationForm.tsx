
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
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
    product_name: "",
    serial_number: "",
    purchase_date: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(`Input changed: ${id} = ${value}`);
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    console.log(`Product selected: ${value}`);
    const selectedProduct = productOptions.find(p => p.id === value);
    setFormData(prev => ({
      ...prev,
      product_name: selectedProduct?.name || ""
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log("Attempting Google sign in...");
      await signInWithPopup(auth, googleProvider);
      console.log("Google sign in successful");
      toast.success("Successfully signed in with Google!");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    console.log("Form submission started");
    console.log("User:", user ? { uid: user.uid, email: user.email } : "No user");
    console.log("Form data:", formData);
    
    if (!user) {
      const errorMsg = "You must be signed in to submit a warranty registration";
      console.error(errorMsg);
      setSubmitError(errorMsg);
      return;
    }

    if (!formData.product_name || !formData.serial_number || !formData.purchase_date) {
      const errorMsg = "Please fill in all required fields";
      console.error(errorMsg);
      console.log("Missing fields:", {
        product_name: !formData.product_name,
        serial_number: !formData.serial_number,
        purchase_date: !formData.purchase_date
      });
      setSubmitError(errorMsg);
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Calling submitWarrantyRegistration...");
      const result = await submitWarrantyRegistration(formData, user);
      console.log("Warranty registration successful:", result);
      toast.success("Warranty registration submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Detailed error submitting warranty registration:", error);
      
      let errorMessage = "Failed to submit warranty registration. Please try again.";
      
      // More specific error handling
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        
        if (error.message.includes("permission")) {
          errorMessage = "Permission denied. Please check your authentication.";
        } else if (error.message.includes("network")) {
          errorMessage = "Network error. Please check your connection.";
        } else if (error.message.includes("auth")) {
          errorMessage = "Authentication error. Please sign in again.";
        }
      }
      
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    console.log("Auth loading...");
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    console.error("Auth error:", error);
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
    console.log("No user found, showing sign in form");
    return (
      <div className="p-4 space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
          <p className="text-gray-600 mb-4">Please sign in to register your warranty.</p>
        </div>
        <Button onClick={handleGoogleSignIn} className="w-full" variant="outline">
          <GoogleLogo />
          Sign in with Google
        </Button>
      </div>
    );
  }

  console.log("Rendering form for user:", user.uid);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitError && (
        <Alert>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="product_name">Product</Label>
        <Select value={formData.product_name ? productOptions.find(p => p.name === formData.product_name)?.id : ""} onValueChange={handleSelectChange} required>
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
        <Label htmlFor="serial_number">Serial Number</Label>
        <Input
          id="serial_number"
          value={formData.serial_number}
          onChange={handleInputChange}
          placeholder="Enter your product's serial number"
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
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Warranty Registration"}
      </Button>
    </form>
  );
};

export default WarrantyRegistrationForm;
