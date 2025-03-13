
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Warranty Registration Data:", formData);
    toast.success("Warranty registration submitted successfully!");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="productId">{t("warranty.form.product")}</Label>
        <Select value={formData.productId} onValueChange={handleSelectChange} required>
          <SelectTrigger>
            <SelectValue placeholder={t("warranty.form.select_product")} />
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
        <Label htmlFor="orderNumber">{t("warranty.form.order_number")}</Label>
        <Input
          id="orderNumber"
          value={formData.orderNumber}
          onChange={handleInputChange}
          placeholder={t("warranty.form.order_number_placeholder")}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="purchaseDate">{t("warranty.form.purchase_date")}</Label>
        <Input
          id="purchaseDate"
          type="date"
          value={formData.purchaseDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="purchaseSource">{t("warranty.form.purchase_source")}</Label>
        <Input
          id="purchaseSource"
          value={formData.purchaseSource}
          onChange={handleInputChange}
          placeholder={t("warranty.form.purchase_source_placeholder")}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fullName">{t("warranty.form.full_name")}</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder={t("warranty.form.full_name_placeholder")}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t("warranty.form.email")}</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder={t("warranty.form.email_placeholder")}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">{t("warranty.form.phone_number")}</Label>
        <Input
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder={t("warranty.form.phone_number_placeholder")}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {t("warranty.form.submit")}
      </Button>
    </form>
  );
};

export default WarrantyRegistrationForm;
