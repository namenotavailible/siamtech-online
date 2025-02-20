
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type ProductData = {
  name: string;
  features: string[];
  details: string;
  specs: {
    frequency: string;
    sensitivity: string;
    spl: string;
    impedance: string;
    connection: string;
    compatibility: string;
  };
};

const products: Record<string, ProductData> = {
  "1": {
    name: "FIFINE Ampligame AM8",
    features: [
      "Professional Dynamic USB Microphone",
      "RGB Lighting Effects",
      "Touch-Sensitive Mute Button",
      "Cardioid Polar Pattern",
      "48kHz/16bit High Resolution Sampling Rate",
      "Zero-Latency Monitoring"
    ],
    details: "The FIFINE Ampligame AM8 is a professional-grade dynamic USB microphone designed specifically for gaming and streaming. With its crystal-clear audio capture and robust build quality, it delivers exceptional performance for content creators. The microphone features RGB lighting effects that can be customized to match your setup, and a touch-sensitive mute button for convenient control.",
    specs: {
      frequency: "20Hz - 20kHz",
      sensitivity: "-36dB ±2dB",
      spl: "120dB",
      impedance: "16Ω",
      connection: "USB Type-C",
      compatibility: "Windows, macOS, PS4/PS5"
    }
  },
  "2": {
    name: "FIFINE Ampligame A8",
    features: [
      "Professional Condenser USB Microphone",
      "Customizable RGB Lighting",
      "One-Touch Mute Control",
      "Cardioid Pickup Pattern",
      "96kHz/24bit High Resolution Sampling",
      "Real-time Monitoring"
    ],
    details: "The FIFINE Ampligame A8 is a high-quality condenser USB microphone that combines professional audio performance with stunning RGB lighting effects. Perfect for streamers and content creators, it delivers crisp, clear audio with the convenience of plug-and-play USB connectivity. The customizable RGB lighting adds a vibrant touch to your setup.",
    specs: {
      frequency: "20Hz - 20kHz",
      sensitivity: "-34dB ±2dB",
      spl: "130dB",
      impedance: "16Ω",
      connection: "USB Type-C",
      compatibility: "Windows, macOS, PS4/PS5"
    }
  }
};

const ProductLearnMore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = id ? products[id] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative">
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div>
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="mt-4 text-lg text-gray-300">{product.details}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <span className="w-2 h-2 bg-white rounded-full" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 p-4 rounded-lg"
                >
                  <div className="text-gray-400 capitalize">{key}</div>
                  <div className="text-lg">{value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductLearnMore;
