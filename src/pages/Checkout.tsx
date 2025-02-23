
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Footerdemo } from '@/components/ui/footer-section';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from "lucide-react";
import type { CartItem } from '@/components/CartPanel';
import { toast } from 'sonner';

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/');
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

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-24 pb-16 relative">
        <div className="absolute top-4 left-4 z-10">
          <Button variant="link" onClick={() => navigate(-1)} className="text-white">
            <ChevronLeft className="me-1 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
            Go back
          </Button>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
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

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-white/10 h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Total</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{total.toFixed(2)} ฿</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-white/10 my-4 pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{total.toFixed(2)} ฿</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Place Order
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
