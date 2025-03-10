import { HeroProps } from "./hero.types";

export const Hero = ({ title, description, imageUrl }: HeroProps) => {
  return (
    <div 
      className="relative h-[400px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      role="region"
      aria-label="hero section"
    >
      <div 
        className="absolute inset-0 bg-black/40" 
        aria-hidden="true" 
        data-testid="hero-overlay"
      />
      
      <div 
        className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-6"
        data-testid="hero-content"
      >
        <h1 className="text-4xl md:text-6xl text-center text-pretty font-sans font-bold text-white">{title}</h1>
        <p className="text-white text-pretty hidden md:block font-display text-center">{description}</p>
      </div>
    </div>
  );
};
