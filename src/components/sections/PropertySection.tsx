'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Property } from '@/data/mockProperties';
import PropertyCard from '@/components/property/PropertyCard';

interface PropertySectionProps {
  id: string;
  title: string;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

const VISIBLE_CARD_WIDTH = 320;
const CARD_MARGIN = 16;

const PropertySection = ({ id, title, properties, onSelectProperty }: PropertySectionProps) => {
  const limitedProperties = properties.slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedProperty, setViewedProperty] = useState<Property | null>(null);
  const router = useRouter();

  const showViewMore = currentIndex === limitedProperties.length - 1;
  const canGoNext = currentIndex < limitedProperties.length - 1;

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const next = () => {
    if (showViewMore) {
      const firstType = limitedProperties[0]?.type;
      const path = firstType === 'residential'
        ? '/residential-properties'
        : '/commercial-properties';
      router.push(path);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const renderCard = (property: Property, active: boolean, key: string) => (
    <div
      key={key}
      className="w-full max-w-[500px]"
      style={{
        opacity: active ? 1 : 0.4,
        transform: active ? 'scale(1.0)' : 'scale(0.9)',
        transition: 'all 0.3s',
        cursor: active ? 'pointer' : 'default',
        pointerEvents: active ? 'auto' : 'none',
      }}
      onClick={() => active && onSelectProperty(property)}
    >
      <PropertyCard
        property={property}
        onGetRecommendations={() => {}}
        onViewDetails={(property) => setViewedProperty(property)}
      />
    </div>
  );

  return (
    <section id={id} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Browse our curated selection of {title.toLowerCase()}.
          </p>
        </div>

        <div className="relative overflow-hidden flex items-center justify-center">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ◀
          </button>

          <div className="flex items-center justify-center gap-4 w-full max-w-full px-2">
            {currentIndex > 0 &&
              renderCard(limitedProperties[currentIndex - 1], false, 'prev')}

            {currentIndex < limitedProperties.length &&
              renderCard(limitedProperties[currentIndex], true, 'current')}

            {currentIndex + 1 < limitedProperties.length &&
              renderCard(limitedProperties[currentIndex + 1], false, 'next')}

            {showViewMore && (
              <div
                style={{
                  width: VISIBLE_CARD_WIDTH,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={() => {
                    const firstType = limitedProperties[0]?.type;
                    const path = firstType === 'residential'
                      ? '/residential-properties'
                      : '/commercial-properties';
                    router.push(path);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-lg font-medium"
                >
                  View More →
                </button>
              </div>
            )}
          </div>

          <button
            onClick={next}
            disabled={!canGoNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Modal */}
      {viewedProperty && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setViewedProperty(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-5xl w-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <PropertyCard
              property={viewedProperty}
              onGetRecommendations={() => {}}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default PropertySection;
