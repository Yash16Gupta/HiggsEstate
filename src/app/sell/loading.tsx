import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoadingSellPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Skeleton */}
      <section className="py-32 min-h-[calc(60vh-4rem)] flex items-center">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-8 w-1/2 mx-auto mb-10" />
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </section>

      {/* Benefits Section Skeleton */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-1/3 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="items-center">
                  <Skeleton className="h-10 w-10 rounded-full mb-4" />
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="text-center">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA/Form Placeholder Skeleton */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-1/2 mx-auto mb-6" />
          <Skeleton className="h-5 w-3/4 mx-auto mb-8" />
          <Card className="max-w-lg mx-auto p-6 sm:p-8">
            <Skeleton className="h-8 w-1/3 mx-auto mb-6" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-40 w-full mb-6" /> {/* Placeholder for image */}
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-1/2 mx-auto mt-4" />
          </Card>
        </div>
      </section>
    </div>
  );
}
