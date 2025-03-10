import { Home } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/shared/components/ui/button";
import { MAP_TEXTS } from "./not-found.constants";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">{MAP_TEXTS.code}</h1>
        <h2 className="text-3xl font-semibold text-foreground mb-6">{MAP_TEXTS.title}</h2>
        <p className="text-lg text-foreground/80 mb-8 max-w-md mx-auto">{MAP_TEXTS.description}</p>
        
        <Button size="lg" variant="secondary" asChild>
          <Link 
            to="/" 
            tabIndex={0}
            aria-label="Return to home page"
          >
            <Home className="size-5" />
            {MAP_TEXTS.homeButton}
          </Link>
        </Button>
      </div>
    </div>
  );
};
