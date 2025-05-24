import { useState, useEffect } from 'react';
import type { Property } from '@/data/mockProperties';
import PropertyCard from '@/components/property/PropertyCard';

interface PropertySectionProps {
  id: string;
  title: string;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

const VISIBLE_CARD_WIDTH = 320;  // Width of a single card in px, adjust as needed
const CARD_MARGIN = 16;           // Margin between cards in px
const MAX_VISIBLE_CARDS = 4;      // Show only 4 cards max

const PropertySection = ({ id, title, properties, onSelectProperty }: PropertySectionProps) => {
  // Cap max index for sliding
  const maxIndex = Math.min(properties.length, MAX_VISIBLE_CARDS) - 1;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((idx) => Math.max(idx - 1, 0));
  };

  const next = () => {
    setCurrentIndex((idx) => Math.min(idx + 1, maxIndex));
  };

  return (
    <section id={id} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Browse our curated selection of {title.toLowerCase()}.
          </p>
        </div>

        {properties.length > 0 ? (
          <div className="relative overflow-hidden flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              aria-label="Previous Property"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              ◀
            </button>

            {/* Cards wrapper */}
            <div
              className="flex items-center justify-center space-x-4"
              style={{
                width: VISIBLE_CARD_WIDTH * 3 + CARD_MARGIN * 4,
                overflow: 'visible',
              }}
            >
              {/* Previous card */}
              {currentIndex > 0 && (
                <div
                  style={{
                    width: VISIBLE_CARD_WIDTH,
                    opacity: 0.4,
                    pointerEvents: 'none',
                    transform: 'scale(0.9)',
                    transition: 'opacity 0.3s, transform 0.3s',
                  }}
                  aria-hidden="true"
                >
                  <PropertyCard property={properties[currentIndex - 1]} onGetRecommendations={() => {}} />
                </div>
              )}

              {/* Current card */}
              <div
                style={{
                  width: VISIBLE_CARD_WIDTH,
                  opacity: 1,
                  cursor: 'pointer',
                  transition: 'opacity 0.3s, transform 0.3s',
                }}
                onClick={() => onSelectProperty(properties[currentIndex])}
              >
                <PropertyCard property={properties[currentIndex]} onGetRecommendations={() => {}} />
              </div>

              {/* Next card */}
              {currentIndex < maxIndex && (
                <div
                  style={{
                    width: VISIBLE_CARD_WIDTH,
                    opacity: 0.4,
                    pointerEvents: 'none',
                    transform: 'scale(0.9)',
                    transition: 'opacity 0.3s, transform 0.3s',
                  }}
                  aria-hidden="true"
                >
                  <PropertyCard property={properties[currentIndex + 1]} onGetRecommendations={() => {}} />
                </div>
              )}

              {/* View More button */}
              {currentIndex === maxIndex && properties.length > MAX_VISIBLE_CARDS && (
                <button
                  onClick={() => window.location.href = '/view-more'} // Change this URL as needed
                  className="ml-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  View More
                </button>
              )}
            </div>

            {/* Right Arrow */}
            <button
              onClick={next}
              disabled={currentIndex === maxIndex}
              aria-label="Next Property"
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              ▶
            </button>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No properties available in this section at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default PropertySection;
