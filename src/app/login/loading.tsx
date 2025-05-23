
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoadingLoginPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Skeleton className="h-8 w-3/5 mx-auto mb-2" />
          <Skeleton className="h-4 w-4/5 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
