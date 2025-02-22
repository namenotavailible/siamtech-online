import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loading } from "@/components/ui/loading";
import { useEffect } from "react";
import { X, ChevronLeft } from "lucide-react";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "FIFINE Ampligame AM8",
    price: "2,490 ฿",
    image: "/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png",
    category: "Dynamic Microphone #1",
    description: "Professional dynamic microphone perfect for gaming, streaming, and content creation. Features crystal clear audio capture and robust build quality."
  },
  {
    id: 2,
    name: "FIFINE Ampligame A8",
    price: "1,990 ฿",
    image: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
    category: "Condenser Microphone #2",
    description: "High-quality condenser microphone featuring RGB lighting effects and professional audio quality, perfect for streaming and content creation."
  },
  {
    id: 3,
    name: "Podcast Kit",
    price: "$399",
    image: "/placeholder.svg",
    category: "Bundle",
    description: "Complete podcast studio kit including microphone, audio interface, stand, and accessories."
  },
  {
    id: 4,
    name: "Gaming Headset",
    price: "$199",
    image: "/placeholder.svg",
    category: "Gaming",
    description: "Premium gaming headset with surround sound, noise-canceling microphone, and comfortable design."
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));

  const handleAddToCart = () => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/");
      const authButton = document.querySelector('[data-auth-trigger]');
      if (authButton instanceof HTMLElement) {
        authButton.click();
      }
      return;
    }

    const savedCart = localStorage.getItem(`cart_${user.uid}`);
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product?.id);
    
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else if (product) {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(currentCart));
    toast.success("Added to cart successfully!");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  if (!id) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative">
      <div className="absolute top-4 left-4 z-10">
        <Button variant="link" onClick={() => navigate(-1)} className="text-white">
          <ChevronLeft className="me-1 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
          Go back
        </Button>
      </div>
      
      <button 
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square overflow-hidden rounded-lg border border-white/10"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-sm text-gray-400">{product.category}</span>
              <h1 className="text-4xl font-bold mt-2">{product.name}</h1>
              <p className="text-2xl text-gray-300 mt-4">{product.price}</p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300"
            >
              {product.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <button 
                onClick={handleAddToCart}
                className="w-full bg-white text-black py-3 rounded-md hover:bg-gray-200 transition-colors"
              >
                Add to Cart
              </button>
              <button 
                onClick={() => navigate(`/product/${id}/learn-more`)}
                className="w-full border border-white/20 py-3 rounded-md hover:bg-white/10 transition-colors"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
