import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ShoppingCart, Star, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";

type ProductData = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  variants: {
    color: string;
    images: string[];
  }[];
  details: {
    features: string[];
    specifications: {
      [key: string]: string;
    };
  };
  reviews: {
    author: string;
    rating: number;
    comment: string;
  }[];
};

const products: ProductData[] = [
  {
    id: "1",
    name: "FIFINE Ampligame AM8",
    description: "Professional Dynamic USB Microphone",
    price: 99.99,
    imageUrl: "/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png",
    category: "Microphones",
    variants: [
      {
        color: "Black",
        images: ["/lovable-uploads/895e0863-a00d-4ccd-9f78-21e1181817a3.png"],
      },
    ],
    details: {
      features: [
        "Professional Dynamic USB Microphone",
        "RGB Lighting Effects",
        "Touch-Sensitive Mute Button",
        "Cardioid Polar Pattern",
        "48kHz/16bit High Resolution Sampling Rate",
        "Zero-Latency Monitoring",
      ],
      specifications: {
        frequency: "20Hz - 20kHz",
        sensitivity: "-36dB ±2dB",
        spl: "120dB",
        impedance: "16Ω",
        connection: "USB Type-C",
        compatibility: "Windows, macOS, PS4/PS5",
      },
    },
    reviews: [
      {
        author: "John Doe",
        rating: 5,
        comment: "Great microphone for streaming!",
      },
      {
        author: "Jane Smith",
        rating: 4,
        comment: "Good quality and easy to use.",
      },
    ],
  },
  {
    id: "2",
    name: "FIFINE Ampligame A8",
    description: "Professional Condenser USB Microphone",
    price: 79.99,
    imageUrl: "/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png",
    category: "Microphones",
    variants: [
      {
        color: "Black",
        images: ["/lovable-uploads/0bdd554b-e74a-4fe7-8d87-867680dd35bb.png"],
      },
    ],
    details: {
      features: [
        "Professional Condenser USB Microphone",
        "Customizable RGB Lighting",
        "One-Touch Mute Control",
        "Cardioid Pickup Pattern",
        "96kHz/24bit High Resolution Sampling",
        "Real-time Monitoring",
      ],
      specifications: {
        frequency: "20Hz - 20kHz",
        sensitivity: "-34dB ±2dB",
        spl: "130dB",
        impedance: "16Ω",
        connection: "USB Type-C",
        compatibility: "Windows, macOS, PS4/PS5",
      },
    },
    reviews: [
      {
        author: "Alice Johnson",
        rating: 5,
        comment: "Excellent sound quality!",
      },
      {
        author: "Bob Williams",
        rating: 4,
        comment: "Great for podcasting.",
      },
    ],
  },
  {
    id: "5",
    name: "VXE Dragonfly R1",
    description: "High-Performance Gaming Mouse",
    price: 59.99,
    imageUrl: "/lovable-uploads/e4346941-0357-4549-8e1e-77ef2c16e8ed.png",
    category: "Mice",
    variants: [
      {
        color: "Black",
        images: ["/lovable-uploads/e4346941-0357-4549-8e1e-77ef2c16e8ed.png"],
      },
    ],
    details: {
      features: [
        "High-Precision Optical Sensor",
        "Ultra-Lightweight Design",
        "RGB Illumination",
        "6 Programmable Buttons",
        "Up to 16000 DPI",
        "Ergonomic Right-Handed Design",
      ],
      specifications: {
        frequency: "1000Hz Polling Rate",
        sensitivity: "100-16000 DPI",
        spl: "N/A",
        impedance: "N/A",
        connection: "USB 2.0",
        compatibility: "Windows, macOS",
      },
    },
    reviews: [
      {
        author: "Eve Davis",
        rating: 5,
        comment: "Amazing mouse for gaming!",
      },
      {
        author: "Charlie Brown",
        rating: 4,
        comment: "Very comfortable and precise.",
      },
    ],
  },
  {
    id: "6",
    name: "VGN Dragonfly F1",
    description: "Premium Gaming Mouse",
    price: 79.99,
    imageUrl: "/lovable-uploads/eb227e57-8859-4673-9eda-54e1deb03124.png",
    category: "Mice",
    variants: [
      {
        color: "Black",
        images: ["/lovable-uploads/eb227e57-8859-4673-9eda-54e1deb03124.png"],
      },
    ],
    details: {
      features: [
        "Advanced Optical Sensor",
        "Customizable Weight System",
        "RGB Lighting Effects",
        "8 Programmable Buttons",
        "Up to 20000 DPI",
        "Premium Build Quality",
      ],
      specifications: {
        frequency: "1000Hz Polling Rate",
        sensitivity: "100-20000 DPI",
        spl: "N/A",
        impedance: "N/A",
        connection: "USB 2.0",
        compatibility: "Windows, macOS",
      },
    },
    reviews: [
      {
        author: "Grace Taylor",
        rating: 5,
        comment: "The best gaming mouse I've ever used!",
      },
      {
        author: "David Miller",
        rating: 4,
        comment: "Excellent performance and customization.",
      },
    ],
  },
];

function calculateAverageRating(reviews: ProductData["reviews"]): number {
  if (!reviews || reviews.length === 0) {
    return 0;
  }
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItemToCart } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>{t("product_not_found")}</div>;
  }

  const initialColor = selectedColor || product.variants[0]?.color;
  const [selectedImage, setSelectedImage] = useState<string>(
    product.variants.find((v) => v.color === initialColor)?.images[0] ||
      product.imageUrl
  );

  const averageRating = calculateAverageRating(product.reviews);

  const handleAddToCart = () => {
    addItemToCart(product);
    toast({
      title: t("added_to_cart"),
      description: t("product_added_message", { productName: product.name }),
    });
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const variant = product.variants.find((v) => v.color === color);
    setSelectedImage(variant?.images[0] || product.imageUrl);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <Navigation />
      <div className="flex-grow">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link to="/">{t("home")}</Link>
              </li>
              <li>
                <Link to="/products">{t("products")}</Link>
              </li>
              <li>{product.name}</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full rounded-lg shadow-md"
              />
            </motion.div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-2xl font-semibold dark:text-white">
                  {product.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-black dark:text-white">
                    {averageRating.toFixed(1)} ({product.reviews.length}{" "}
                    {t("reviews")})
                  </span>
                </div>
                <p className="text-xl font-bold dark:text-white">
                  ${product.price.toFixed(2)}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Label>{t("color")}</Label>
                <RadioGroup defaultValue={initialColor} className="mt-2">
                  <div className="flex items-center space-x-2">
                    {product.variants.map((variant) => (
                      <div key={variant.color} className="flex items-center">
                        <RadioGroupItem
                          value={variant.color}
                          id={variant.color}
                          className="peer sr-only"
                          onClick={() => handleColorChange(variant.color)}
                        />
                        <Label
                          htmlFor={variant.color}
                          className="cursor-pointer rounded-full border-2 border-gray-200 dark:border-gray-700 px-4 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-500"
                        >
                          {variant.color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex space-x-4"
              >
                <Button onClick={handleAddToCart}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {t("add_to_cart")}
                </Button>
                <Button variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  {t("add_to_wishlist")}
                </Button>
                <Button variant="ghost">
                  <Share2 className="w-4 h-4 mr-2" />
                  {t("share")}
                </Button>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <Tabs defaultValue="description" className="w-full">
              <TabsList>
                <TabsTrigger value="description">{t("description")}</TabsTrigger>
                <TabsTrigger value="details">{t("details")}</TabsTrigger>
                <TabsTrigger value="reviews">
                  {t("reviews")} ({product.reviews.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-gray-700 dark:text-gray-300">
                  {product.description}
                </p>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                <h3 className="text-xl font-semibold dark:text-white mb-2">
                  {t("features")}
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {product.details.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <h3 className="text-xl font-semibold dark:text-white mb-2">
                  {t("specifications")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.details.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="space-y-1">
                        <span className="text-gray-500 dark:text-gray-400">
                          {key}
                        </span>
                        <p className="text-gray-700 dark:text-gray-300">{value}</p>
                      </div>
                    )
                  )}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                {product.reviews.length === 0 ? (
                  <p className="text-gray-700 dark:text-gray-300">
                    {t("no_reviews")}
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {product.reviews.map((review, index) => (
                      <li
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-black dark:text-white">
                            {review.rating.toFixed(1)}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            - {review.author}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {review.comment}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <Footerdemo />
    </div>
  );
};

export default ProductDetail;
