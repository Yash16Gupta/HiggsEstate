"use client";

import { useEffect, useState } from 'react';
import type { Property } from '@/data/mockProperties';
import { recommendProperties, type RecommendPropertiesOutput, type RecommendPropertiesInput } from '@/ai/flows/property-recommendations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Lightbulb, XCircle } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AiRecommendationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

const AiRecommendationsDialog = ({ isOpen, onClose, property }: AiRecommendationsDialogProps) => {
  const [recommendations, setRecommendations] = useState<RecommendPropertiesOutput['recommendations'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && property) {
      fetchRecommendations();
    } else {
      // Reset state when dialog is closed or property is null
      setRecommendations(null);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen, property]);

  const fetchRecommendations = async () => {
    if (!property) return;

    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const input: RecommendPropertiesInput = {
        propertyDescription: property.description,
        propertyType: property.type,
      };
      const result = await recommendProperties(input);
      setRecommendations(result.recommendations);
    } catch (e) {
      console.error("Failed to fetch recommendations:", e);
      setError("Sorry, we couldn't fetch recommendations at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">AI Property Recommendations</DialogTitle>
          {property && (
            <DialogDescription>
              Based on: <span className="font-semibold text-primary">{property.name}</span>
            </DialogDescription>
          )}
        </DialogHeader>

        <ScrollArea className="flex-grow pr-4 -mr-4 overflow-y-auto">
          <div className="py-4 space-y-6">
            {isLoading && (
              <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p>Finding similar properties for you...</p>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {recommendations && recommendations.length > 0 && (
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg shadow-sm bg-card hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-4">
                       <div className="relative w-full sm:w-1/3 h-40 sm:h-auto rounded-md overflow-hidden">
                         <Image 
                           src={`https://placehold.co/300x200.png?text=Rec+${index+1}`} 
                           alt={`Recommendation ${index + 1}`} 
                           layout="fill" 
                           objectFit="cover"
                           data-ai-hint="property house"
                         />
                       </div>
                       <div className="sm:w-2/3">
                        <h4 className="font-semibold text-lg text-card-foreground">{rec.location}</h4>
                        <Badge variant="outline" className="capitalize my-1">{rec.propertyType}</Badge>
                        <p className="text-sm text-muted-foreground mt-1 mb-2 line-clamp-2">{rec.description}</p>
                        <p className="text-md font-semibold text-primary">{formatPrice(rec.price)}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {recommendations && recommendations.length === 0 && !isLoading && !error && (
               <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>No specific recommendations found</AlertTitle>
                <AlertDescription>
                  We couldn&apos;t find specific AI recommendations for this property at the moment. Try exploring other listings!
                </AlertDescription>
              </Alert>
            )}
          </div>
        </ScrollArea>
        
        <DialogFooter className="mt-auto pt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiRecommendationsDialog;
