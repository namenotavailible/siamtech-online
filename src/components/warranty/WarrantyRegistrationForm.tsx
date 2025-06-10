
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { submitWarrantyRegistration } from "@/services/warrantyService";

const productOptions = [
  { id: 1, name: "FIFINE Ampligame AM8" },
  { id: 2, name: "FIFINE Ampligame A8" },
  { id: 5, name: "VXE Dragonfly R1" },
  { id: 6, name: "VGN Dragonfly F1" }
];

interface WarrantyRegistrationFormProps {
  onClose: () => void;
}

const WarrantyRegistrationForm = ({ onClose }: WarrantyRegistrationFormProps) => {
  const [user, loading] = useAuthState(auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productId: "",
    orderNumber: "",
    purchaseDate: "",
    purchaseSource: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      productId: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be signed in to submit a warranty registration");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const selectedProduct = productOptions.find(p => p.id.toString() === formData.productId);
      const registrationData = {
        ...formData,
        productName: selectedProduct?.name || "Unknown Product",
      };

      await submitWarrantyRegistration(registrationData, user);
      toast.success("Warranty registration submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting warranty registration:", error);
      toast.error("Failed to submit warranty registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="p-4 text-center">Please sign in to register your warranty.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="productId">Product</Label>
        <Select value={formData.productId} onValueChange={handleSelectChange} required>
          <SelectTrigger>
            <SelectValue placeholder="Select your product" />
          </SelectTrigger>
          <SelectContent>
            {productOptions.map(product => (
              <SelectItem key={product.id} value={product.id.toString()}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="orderNumber">Order Number</Label>
        <Input
          id="orderNumber"
          value={formData.orderNumber}
          onChange={handleInputChange}
          placeholder="Enter your order number"
          required
          autoFocus={false}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="purchaseDate">Purchase Date</Label>
        <Input
          id="purchaseDate"
          type="date"
          value={formData.purchaseDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="purchaseSource">Source of Purchase</Label>
        <Input
          id="purchaseSource"
          value={formData.purchaseSource}
          onChange={handleInputChange}
          placeholder="Where did you purchase the product?"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={formData.fullName}
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
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
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
