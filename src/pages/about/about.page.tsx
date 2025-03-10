import { Building, Clock, Heart } from "lucide-react";

import bgBlurredHouseUrl from "@/assets/blurred-house.jpg";
import { Hero } from "@/shared/components/hero";

import { MAP_TEXTS } from "./about.constants";

export const AboutPage = () => {
  return (
    <div>
      <Hero 
        title={MAP_TEXTS.HERO.TITLE} 
        description={MAP_TEXTS.HERO.DESCRIPTION} 
        imageUrl={bgBlurredHouseUrl} 
      />
      
      <section className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">{MAP_TEXTS.OUR_STORY.TITLE}</h2>            
            {MAP_TEXTS.OUR_STORY.DESCRIPTION.map((paragraph, index) => (
              <p className="text-foreground/80 mb-4 leading-relaxed text-pretty" key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="bg-muted/30 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">{MAP_TEXTS.OUR_APPROACH.TITLE}</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-fit">
                  <Heart className="size-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{MAP_TEXTS.OUR_APPROACH.CLIENT_CENTERED.TITLE}</h4>
                  <p className="text-foreground/70">{MAP_TEXTS.OUR_APPROACH.CLIENT_CENTERED.DESCRIPTION}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-fit">
                  <Building className="size-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{MAP_TEXTS.OUR_APPROACH.LOCAL_EXPERTISE.TITLE}</h4>
                  <p className="text-foreground/70">{MAP_TEXTS.OUR_APPROACH.LOCAL_EXPERTISE.DESCRIPTION}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-fit">
                  <Clock className="size-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{MAP_TEXTS.OUR_APPROACH.RESPONSIVE_SERVICE.TITLE}</h4>
                  <p className="text-foreground/70">{MAP_TEXTS.OUR_APPROACH.RESPONSIVE_SERVICE.DESCRIPTION}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>    
    </div>
  );
};