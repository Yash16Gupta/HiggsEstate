
"use client";

import { useState } from 'react';
import type { Property } from '@/data/mockProperties';
import HeroSection from '@/components/sections/HeroSection';
import PropertySection from '@/components/sections/PropertySection';
import KnowYourAgentsSection from '@/components/sections/KnowYourAgentsSection';
import SellPropertyCtaSection from '@/components/sections/SellPropertyCtaSection';
import AiRecommendationsDialog from '@/components/property/AiRecommendationsDialog';

interface HomePageClientProps {
  residentialProperties: Property[];
  commercialProperties: Property[];
}

const HomePageClient = ({ residentialProperties, commercialProperties }: HomePageClientProps) => {
  const [selectedPropertyForAi, setSelectedPropertyForAi] = useState<Property | null>(null);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

  const handleSelectPropertyForAi = (property: Property) => {
    setSelectedPropertyForAi(property);
    setIsAiDialogOpen(true);
  };

  const handleCloseAiDialog = () => {
    setIsAiDialogOpen(false);
    // Delay clearing to allow dialog to animate out
    setTimeout(() => setSelectedPropertyForAi(null), 300); 
  };

  return (
    <>
      <HeroSection />
      <PropertySection
        id="residential"
        title="Residential Properties"
        properties={residentialProperties}
        onSelectProperty={handleSelectPropertyForAi}
      />
      <PropertySection
        id="commercial"
        title="Commercial Properties"
        properties={commercialProperties}
        onSelectProperty={handleSelectPropertyForAi}
      />
      <SellPropertyCtaSection />
      <KnowYourAgentsSection />
      {/* Future sections like About Us, Contact can be added here */}
      {/* 
      <section id="about" className="py-16 bg-secondary/50 text-center">
        <h2 className="text-3xl font-bold">About Higgs Estate</h2>
        <p className="mt-4 text-lg text-muted-foreground">More info soon...</p>
      </section>
      <section id="contact" className="py-16 text-center">
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p className="mt-4 text-lg text-muted-foreground">Get in touch...</p>
      </section>
      */}
      <AiRecommendationsDialog
        isOpen={isAiDialogOpen}
        onClose={handleCloseAiDialog}
        property={selectedPropertyForAi}
      />
    </>
  );
};

export default HomePageClient;
