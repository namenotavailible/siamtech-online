
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

import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "./contexts/CartContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Suspense } from "react";
import "./App.css";

function App() {
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
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
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
