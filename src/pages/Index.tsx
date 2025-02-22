
import Navigation from "@/components/Navigation";
import { Footerdemo } from "@/components/ui/footer-section";
import { Vortex } from "@/components/ui/vortex";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <div className="relative">
        <Vortex />
        
        {/* Warranty Section */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-2">
            SIAMTECH
          </h1>
          <p className="text-xl text-white/80 text-center max-w-xl mx-auto px-4">
            Experience the future of technology
          </p>
          
          {/* Warranty Activation Section */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Warranty Activation
            </h2>
            <ButtonColorful 
              label="Activate Your Warranty"
              onClick={() => navigate('/warranty')}
              className="mt-4"
            />
          </div>
        </div>
      </div>
      <Footerdemo />
    </div>
  );
}
