import React from "react";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";
import Testimonials from "@/components/testimonial";

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
