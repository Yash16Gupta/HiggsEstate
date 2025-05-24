'use client';

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
  preRentedProperties: Property[];
}

const HomePageClient = ({
  residentialProperties,
  commercialProperties,
  preRentedProperties,
}: HomePageClientProps) => {
  const [selectedPropertyForAi, setSelectedPropertyForAi] = useState<Property | null>(null);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

  const handleSelectPropertyForAi = (property: Property) => {
    setSelectedPropertyForAi(property);
    setIsAiDialogOpen(true);
  };

  const handleCloseAiDialog = () => {
    setIsAiDialogOpen(false);
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
      <PropertySection
        id="prerented"
        title="PreRented Properties"
        properties={preRentedProperties}
        onSelectProperty={handleSelectPropertyForAi}
      />
      <SellPropertyCtaSection />
      <KnowYourAgentsSection />

      <AiRecommendationsDialog
        isOpen={isAiDialogOpen}
        onClose={handleCloseAiDialog}
        property={selectedPropertyForAi}
      />
    </>
  );
};

export default HomePageClient;
