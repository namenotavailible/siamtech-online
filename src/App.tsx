import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Support from "./pages/Support";
import Warranty from "./pages/Warranty";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import ProductDetail from "./pages/ProductDetail";
import ProductLearnMore from "./pages/ProductLearnMore";
import Checkout from "./pages/Checkout";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import MFAPage from "./pages/MFAPage";
import Featured from "./pages/Featured";
import NewArrivals from "./pages/NewArrivals";
import Team from "./pages/Team";
import BlogTech from "./pages/BlogTech";
import BlogReviews from "./pages/BlogReviews";
import EarthquakeBlog from "./pages/EarthquakeBlog";

import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "./contexts/CartContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Suspense, useEffect, useState } from "react";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  
  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, () => {
      // Mark auth check as complete
      setAuthChecked(true);
    });
    
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show loading until auth is checked
  if (!authChecked) {
    return <div className="flex h-screen w-full items-center justify-center bg-white text-black">Loading...</div>;
  }

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-white text-black">Loading...</div>}>
          <Router>
            <CartProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/support" element={<Support />} />
                <Route path="/warranty" element={<Warranty />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/tech" element={<BlogTech />} />
                <Route path="/blog/reviews" element={<BlogReviews />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/blog/earthquake-2025" element={<EarthquakeBlog />} />
                <Route path="/featured" element={<Featured />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/product/:id/learn-more" element={<ProductLearnMore />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/mfa" element={<MFAPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </CartProvider>
          </Router>
        </Suspense>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
