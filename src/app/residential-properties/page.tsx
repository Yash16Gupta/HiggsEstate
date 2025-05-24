'use client';

import { useEffect, useState } from 'react';
import type { Property } from '@/data/mockProperties';
import PropertyCard from '@/components/property/PropertyCard';
import { getResidentialProperties } from '@/data/mockProperties';

export default function ResidentialPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [viewedProperty, setViewedProperty] = useState<Property | null>(null);

  useEffect(() => {
    getResidentialProperties().then(setProperties);
  }, []);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Residential Properties</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onGetRecommendations={() => {}}
            onViewDetails={setViewedProperty}
          />
        ))}
      </div>

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
    </main>
  );
}
