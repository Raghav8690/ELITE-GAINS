import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PricingSection from "@/components/sections/PricingSection";
import SpecialOffersSection from "@/components/sections/SpecialOffersSection";
import TrainersSection from "@/components/sections/TrainersSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ParticleCanvas from "@/components/effects/ParticleCanvas";

export default function Home() {
  return (
    <main className="bg-black min-h-screen relative">
      <ParticleCanvas />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PricingSection />
      <SpecialOffersSection />
      <TrainersSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
