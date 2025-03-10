import { PROPERTY_FEATURES } from "../property-card/property-card.constants"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"
import { Skeleton } from "../ui/skeleton"

export const PropertyCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative p-0">
        <Skeleton className="h-[200px] w-full rounded-tl-xl rounded-tr-xl rounded-b-none" />
      </CardHeader>
    
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
        </div>
        <Skeleton className="h-[24px] w-[100px]" />
        <Separator className="mt-2" />
      </CardContent>
      <CardFooter className="px-4 pt-0 pb-4 grid grid-cols-4 gap-2 text-sm text-foreground/80 w-full">
        {PROPERTY_FEATURES.map((feature) => (
          <Skeleton key={feature.propertyKey} className="h-[42px] w-full" />
        ))}
      </CardFooter>
    </Card>
  )
}