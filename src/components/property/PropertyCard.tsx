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
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-row h-40 max-w-[320px]">
      {/* Image on left */}
      <CardHeader className="p-0 flex-shrink-0 w-[140px] h-full relative">
        <Image
          src={property.imageUrls[0]}
          alt={property.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={property.type === 'residential' ? 'house exterior' : 'building facade'}
        />
      </CardHeader>

      {/* Text content on right */}
      <CardContent className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start mb-1">
            <CardTitle className="text-lg font-semibold leading-tight">{property.name}</CardTitle>
            <Badge variant={property.type === 'residential' ? 'default' : 'secondary'} className="capitalize text-xs">
              {property.type}
            </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground line-clamp-2 mb-1">{property.description}</CardDescription>
          <div className="flex items-center text-muted-foreground text-xs mb-1">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{property.location}</span>
          </div>
          <div className="flex items-center text-primary font-semibold text-sm mb-2">
            {formatPrice(property.price)}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Maximize className="h-3 w-3 mr-1 flex-shrink-0 text-accent" />
              <span>{property.sqft} sqft</span>
            </div>
            {property.type === 'residential' && property.bedrooms && (
              <div className="flex items-center">
                <BedDouble className="h-3 w-3 mr-1 flex-shrink-0 text-accent" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.type === 'residential' && property.bathrooms && (
              <div className="flex items-center">
                <Bath className="h-3 w-3 mr-1 flex-shrink-0 text-accent" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            {property.type === 'commercial' && property.amenities && property.amenities.length > 0 && (
              <div className="flex items-center col-span-2">
                <Building className="h-3 w-3 mr-1 flex-shrink-0 text-accent" />
                <span>{property.amenities[0]}</span>
              </div>
            )}
          </div>
        </div>

        <CardFooter className="p-0 mt-2 flex space-x-2">
          <Button className="flex-grow text-xs" variant="outline">
            View Details
          </Button>
          <Button 
            className="flex-grow text-xs" 
            onClick={() => onGetRecommendations(property)}
          >
            <Zap className="h-4 w-4 mr-1" />
            Similar
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
