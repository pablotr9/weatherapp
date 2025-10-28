import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard = () => {
  return (
    <Card className="mt-6 w-[250px]" data-testid="skeleton-card">
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
};
