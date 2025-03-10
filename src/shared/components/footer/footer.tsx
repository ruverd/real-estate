import { MAP_TEXTS } from "./footer.constants";

export const Footer = () => {
  return (
    <footer className="py-4 mt-auto border-t bg-background text-foreground text-sm">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <span>{MAP_TEXTS.developedBy}</span>
      </div>
    </footer>
  );
};
