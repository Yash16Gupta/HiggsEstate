
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoadingContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <Skeleton className="h-10 w-1/2 mx-auto mb-3" /> {/* Title */}
          <Skeleton className="h-5 w-3/4 mx-auto" />      {/* Description */}
        </CardHeader>
        <CardContent className="space-y-10 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Skeleton className="w-full h-64 rounded-lg" /> {/* Image placeholder */}
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <Skeleton className="h-6 w-1/3 mb-2" /> {/* Section title */}
                  <Skeleton className="h-10 w-1/2 mb-1" /> {/* Button/Link */}
                  <Skeleton className="h-3 w-2/3" />      {/* Small text */}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
