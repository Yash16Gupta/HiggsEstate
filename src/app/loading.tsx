import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b h-16">
        <div className="container flex items-center justify-between h-full px-4">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </header>

      {/* Hero Skeleton */}
      <section className="py-32 min-h-[calc(80vh-4rem)] flex items-center">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-8 w-1/2 mx-auto mb-10" />
          <div className="flex justify-center space-x-4">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
      </section>

      {/* Property Section Skeleton */}
      {[1, 2].map((section) => (
        <section key={section} className="py-24">
          <div className="container mx-auto px-4">
            <Skeleton className="h-12 w-1/3 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="p-0">
                    <Skeleton className="h-56 w-full" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-8 w-1/2 mb-4" />
                    <div className="grid grid-cols-2 gap-2">
                       <Skeleton className="h-6 w-full" />
                       <Skeleton className="h-6 w-full" />
                    </div>
                     <div className="flex space-x-2 mt-4">
                        <Skeleton className="h-10 w-1/2" />
                        <Skeleton className="h-10 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}
      
      {/* Footer Skeleton */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/3 mx-auto" />
        </div>
      </footer>
    </div>
  );
}
