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
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { parsePrice, formatPrice } from '@/utils/priceUtils';

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    try {
      const savedCart = localStorage.getItem(`cart_${user.uid}`);
      if (savedCart) {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        
        // Calculate total with safe price parsing
        const cartTotal = items.reduce((acc: number, item: CartItem) => {
          return acc + (parsePrice(item.price) * item.quantity);
        }, 0);
        
        setTotal(cartTotal);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      toast.error(language === "en" ? "Failed to load cart" : "ไม่สามารถโหลดตะกร้าสินค้าได้");
    }
  }, [navigate, language]);

  const handlePlaceOrder = async () => {
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

    if (cartItems.length === 0) {
      toast.error(language === "en" ? "Your cart is empty" : "ตะกร้าสินค้าของคุณว่างเปล่า");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.uid,
          total: total,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Create order items with safe price parsing
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        price: parsePrice(item.price),
        quantity: item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw itemsError;
      }
      
      // Send email notification
      try {
        const { error: emailError } = await supabase.functions.invoke("send-order-notification", {
          body: {
            orderId: order.id,
            userEmail: user.email,
            userName: user.displayName || user.email,
            orderItems: orderItems,
            total: total,
            language: language
          }
        });
        
        if (emailError) {
          console.error("Error sending order notification email:", emailError);
          // Continue with order process even if email fails
        }
      } catch (emailSendError) {
        console.error("Error invoking send-order-notification function:", emailSendError);
        // Continue with order process even if email fails
      }

      // Clear the cart
      localStorage.removeItem(`cart_${user.uid}`);
      
      toast.success(language === "en" 
        ? "Order placed successfully!" 
        : "สั่งซื้อสำเร็จ!");
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(language === "en" 
        ? "Error placing order. Please try again." 
        : "เกิดข้อผิดพลาดในการสั่งซื้อ โปรดลองอีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
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
                
                {cartItems.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{language === "en" ? "Product" : "สินค้า"}</TableHead>
                        <TableHead className="text-center">{language === "en" ? "Quantity" : "จำนวน"}</TableHead>
                        <TableHead className="text-right">{language === "en" ? "Price" : "ราคา"}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <span className="font-medium">{item.name}</span>
                          </TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatPrice(item.price)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      {language === "en" ? "Your cart is empty" : "ตะกร้าสินค้าของคุณว่างเปล่า"}
                    </p>
                  </div>
                )}
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
                  disabled={isSubmitting || cartItems.length === 0}
                >
                  {isSubmitting 
                    ? (language === "en" ? "Processing..." : "กำลังดำเนินการ...") 
                    : (language === "en" ? "Place Order" : "สั่งซื้อ")}
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
