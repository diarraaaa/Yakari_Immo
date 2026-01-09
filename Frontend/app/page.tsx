import React from 'react';
import Navigation from '@/components/shared/Navigation';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import DiasporaSection from '@/components/landing/DiasporaSection';

import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-100">
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <DiasporaSection />
      
      <CTASection />
      <Footer />
    </div>
  );
}
