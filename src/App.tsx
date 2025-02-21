
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import ProductLearnMore from "./pages/ProductLearnMore";
import Warranty from "./pages/Warranty";
import Products from "./pages/Products";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/:id/learn-more" element={<ProductLearnMore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
