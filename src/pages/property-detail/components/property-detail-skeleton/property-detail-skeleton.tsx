import { Skeleton } from "@/shared/components/ui/skeleton";

export const PropertyDetailSkeleton = () => {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-[400px] bg-muted animate-pulse rounded-lg mb-6" />
      <Skeleton className="h-8 bg-muted animate-pulse rounded-md w-1/3 mb-4" />
      <Skeleton className="h-6 bg-muted animate-pulse rounded-md w-1/4 mb-6" />
      <Skeleton className="h-10 bg-muted animate-pulse rounded-md w-1/5 mb-6" />
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20 bg-muted animate-pulse rounded-md" />
        ))}
      </div>
      <Skeleton className="h-40 bg-muted animate-pulse rounded-md" />
    </div>
  );
};