import bgBlurredHouseUrl from "@/assets/blurred-house.jpg";
import { usePropertiesQuery } from "@/server/queries/properties.query";
import { Hero } from "@/shared/components/hero";

import { PropertyFilter, PropertyFilterProvider } from "./components/property-filter";
import { PropertyList } from "./components/property-list";
import { MAP_TEXTS } from "./home.constants";

export const HomePage = () => {
  const { data: properties, isLoading, error } = usePropertiesQuery(); 

  return (
    <PropertyFilterProvider> 
      <div className="flex flex-col gap-10">
        <div className="relative">
          <Hero title={MAP_TEXTS.HERO.TITLE} description={MAP_TEXTS.HERO.DESCRIPTION} imageUrl={bgBlurredHouseUrl} />
          <PropertyFilter />
        </div>

        <section className="flex flex-col gap-10 mt-20 md:mt-10">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-4xl font-bold">{MAP_TEXTS.DISCOVER_FEATURED_PROPERTY.TITLE}</h2>
            <p className="font-display text-foreground/60">{MAP_TEXTS.DISCOVER_FEATURED_PROPERTY.DESCRIPTION}</p>
          </div>

          <PropertyList properties={properties} isLoading={isLoading} error={error} />
        </section>
      </div>
    </PropertyFilterProvider>
  );
};
