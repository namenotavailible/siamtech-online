import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "@/lib/firebase";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { User } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Hero } from "@/components/ui/animated-hero";

const products = [{
  id: 1,
  name: "FIFINE Ampligame AM8",
  price: "2,490 ฿",
  image: "/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png",
  category: "Dynamic Microphone"
}, {
  id: 2,
  name: "FIFINE Ampligame A8",
  price: "1,990 ฿",
  image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
  category: "Condenser Microphone"
}];

const FeaturedProducts = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const {
    updateCartCount
  } = useCart();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value
    } = e.target;
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
      if (pendingProduct) {
        handleAddToCart(pendingProduct, null, true);
      }
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
      if (pendingProduct) {
        handleAddToCart(pendingProduct, null, true);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  const handleAddToCart = (product: any, e: React.MouseEvent | null, skipAuthCheck = false) => {
    if (e) {
      e.preventDefault();
    }
    const user = auth.currentUser;
    if (!user && !skipAuthCheck) {
      setPendingProduct(product);
      setShowAuthDialog(true);
      return;
    }
    if (!user) return;
    const savedCart = localStorage.getItem(`cart_${user.uid}`);
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id);
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(currentCart));
    updateCartCount(user.uid);
    toast.success("Added to cart successfully!");
    setPendingProduct(null);
  };

  return <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="text-center mb-24">
          <Hero />
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-16">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <p className="mt-4 text-gray-400">Our most popular products</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => <Link to={`/product/${product.id}`} key={product.id}>
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }} className="group relative bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all">
                <div className="aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <span className="text-sm text-gray-400">{product.category}</span>
                  <h3 className="mt-1 text-xl font-semibold text-white">{product.name}</h3>
                  <p className="mt-2 text-gray-300">{product.price}</p>
                  <button onClick={e => handleAddToCart(product, e)} className="mt-4 w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </Link>)}
        </div>

        <div className="mt-16 text-center">
          <Link to="/products" className="inline-flex items-center justify-center px-8 py-3 border border-white/20 rounded-md hover:bg-white/10 transition-colors">
            View All Products
          </Link>
        </div>
      </div>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-[400px] max-h-[90vh] w-[95%] p-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10">
              <User className="h-5 w-5 text-white" />
            </div>
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-center text-base">Sign up to SIAMTECH</DialogTitle>
              <DialogDescription className="text-center text-sm">
                Create an account to access your cart
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleEmailSignUp} className="space-y-4 mt-2">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="signup-name">Full name</Label>
                <Input id="signup-name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} required />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>

          <div className="flex items-center gap-2 my-2 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
            <span className="text-xs text-gray-400">Or</span>
          </div>

          <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
            Continue with Google
          </Button>

          <p className="text-center text-xs text-gray-400">
            By signing up you agree to our{" "}
            <a href="/privacy" className="underline hover:no-underline">
              Terms
            </a>
            .
          </p>
        </DialogContent>
      </Dialog>
    </section>;
};

export default FeaturedProducts;
