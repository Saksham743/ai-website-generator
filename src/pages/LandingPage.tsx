import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
