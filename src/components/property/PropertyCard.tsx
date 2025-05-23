import Image from 'next/image';
import type { Property } from '@/data/mockProperties';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, BedDouble, Bath, Building, Maximize, Zap } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onGetRecommendations: (property: Property) => void;
}

const PropertyCard = ({ property, onGetRecommendations }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative w-full h-56">
          <Image
            src={property.imageUrls[0]}
            alt={property.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={property.type === 'residential' ? 'house exterior' : 'building facade'}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-semibold leading-tight">{property.name}</CardTitle>
          <Badge variant={property.type === 'residential' ? 'default' : 'secondary'} className="capitalize">
            {property.type}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-3">{property.description}</CardDescription>
        
        <div className="flex items-center text-muted-foreground text-sm mb-1">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{property.location}</span>
        </div>
        <div className="flex items-center text-primary font-semibold text-lg mb-3">
          {formatPrice(property.price)}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
          <div className="flex items-center">
            <Maximize className="h-4 w-4 mr-2 flex-shrink-0 text-accent" />
            <span>{property.sqft} sqft</span>
          </div>
          {property.type === 'residential' && property.bedrooms && (
            <div className="flex items-center">
              <BedDouble className="h-4 w-4 mr-2 flex-shrink-0 text-accent" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.type === 'residential' && property.bathrooms && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-2 flex-shrink-0 text-accent" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
           {property.type === 'commercial' && property.amenities && property.amenities.length > 0 && (
             <div className="flex items-center col-span-2">
               <Building className="h-4 w-4 mr-2 flex-shrink-0 text-accent" />
               <span>{property.amenities[0]}</span>
             </div>
           )}
        </div>
        
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex flex-col sm:flex-row w-full space-y-2 sm:space-y-0 sm:space-x-2">
          <Button className="w-full sm:w-auto flex-grow" variant="outline">
            View Details
          </Button>
          <Button 
            className="w-full sm:w-auto flex-grow" 
            onClick={() => onGetRecommendations(property)}
          >
            <Zap className="h-4 w-4 mr-2" />
            Similar Properties
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
