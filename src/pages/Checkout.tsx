
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Footerdemo } from '@/components/ui/footer-section';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from "lucide-react";
import type { CartItem } from '@/components/CartPanel';
import { toast } from 'sonner';
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/');
      // Trigger auth dialog after a short delay to ensure navigation is complete
      setTimeout(() => {
        const authButton = document.querySelector('[data-auth-trigger]');
        if (authButton instanceof HTMLElement) {
          authButton.click();
        }
      }, 100);
      return;
    }

    const savedCart = localStorage.getItem(`cart_${user.uid}`);
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      
      // Calculate total
      const cartTotal = items.reduce((acc: number, item: CartItem) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
        return acc + (price * item.quantity);
      }, 0);
      setTotal(cartTotal);
    }
  }, [navigate]);

  const handlePlaceOrder = () => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/');
      setTimeout(() => {
        const authButton = document.querySelector('[data-auth-trigger]');
        if (authButton instanceof HTMLElement) {
          authButton.click();
        }
      }, 100);
      return;
    }

    toast.success("Order placed successfully!");
    localStorage.removeItem(`cart_${user.uid}`);
    navigate('/');
  };

  // If not authenticated, don't render the page content
  if (!auth.currentUser) {
    return null;
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <Helmet>
        <title>{language === "en" ? "Checkout | SIAMTECH Online" : "ชำระเงิน | บริษัท สยามเทค ออนไลน์ กรุ๊ป จำกัด"}</title>
        <meta name="description" content={language === "en" 
          ? "Complete your purchase of premium gaming and audio equipment from SIAMTECH Online." 
          : "ชำระเงินสำหรับอุปกรณ์เกมและเครื่องเสียงระดับพรีเมียมจาก บริษัท สยามเทค ออนไลน์ กรุ๊ป จำกัด"} />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={language === "en" ? "Checkout | SIAMTECH Online" : "ชำระเงิน | บริษัท สยามเทค ออนไลน์ กรุ๊ป จำกัด"} />
        <html lang={language} />
      </Helmet>
      
      <Navigation />
      
      <div className="pt-24 pb-16 relative">
        <div className="absolute top-4 left-4 z-10">
          <Button variant="link" onClick={() => navigate(-1)} className={theme === "dark" ? "text-white" : "text-black"}>
            <ChevronLeft className="me-1 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
            {language === "en" ? "Go back" : "ย้อนกลับ"}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">{language === "en" ? "Checkout" : "ชำระเงิน"}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className={`${theme === "dark" ? "bg-gray-900/50 backdrop-blur-sm border border-white/10" : "bg-gray-100 border border-gray-200"} rounded-lg p-6`}>
                <h2 className="text-xl font-semibold mb-4">{language === "en" ? "Order Summary" : "สรุปคำสั่งซื้อ"}</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                        <p className="text-sm">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${theme === "dark" ? "bg-gray-900/50 backdrop-blur-sm border border-white/10" : "bg-gray-100 border border-gray-200"} rounded-lg p-6 h-fit`}>
              <h2 className="text-xl font-semibold mb-4">{language === "en" ? "Order Total" : "ยอดรวมคำสั่งซื้อ"}</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{language === "en" ? "Subtotal" : "ยอดรวม"}</span>
                  <span>{total.toFixed(2)} ฿</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === "en" ? "Shipping" : "ค่าจัดส่ง"}</span>
                  <span>{language === "en" ? "Free" : "ฟรี"}</span>
                </div>
                <div className={`border-t ${theme === "dark" ? "border-white/10" : "border-gray-200"} my-4 pt-4`}>
                  <div className="flex justify-between font-semibold">
                    <span>{language === "en" ? "Total" : "ยอดรวมทั้งหมด"}</span>
                    <span>{total.toFixed(2)} ฿</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePlaceOrder}
                >
                  {language === "en" ? "Place Order" : "สั่งซื้อ"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footerdemo />
    </div>
  );
};

export default Checkout;
