
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoadingListPropertyPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/5 mb-2" /> 
          <Skeleton className="h-4 w-4/5" />
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Property Name */}
          <div>
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Description */}
          <div>
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Price & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Type & Sqft */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          
          {/* Image URL */}
          <div>
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-1/2 mt-1" />
          </div>

          {/* Amenities */}
          <div>
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-1/2 mt-1" />
          </div>

          {/* Contact Info */}
          <div>
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-1/2 mt-1" />
          </div>

          {/* Submit Button */}
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
