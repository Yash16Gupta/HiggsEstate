import type { Property } from '@/data/mockProperties';
import PropertyCard from '@/components/property/PropertyCard';

interface PropertySectionProps {
  id: string;
  title: string;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

const PropertySection = ({ id, title, properties, onSelectProperty }: PropertySectionProps) => {
  return (
    <section id={id} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Browse our curated selection of {title.toLowerCase()}.
          </p>
        </div>
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} onGetRecommendations={onSelectProperty} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No properties available in this section at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default PropertySection;
