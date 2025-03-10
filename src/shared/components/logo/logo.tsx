import { House } from "lucide-react";
import { Link } from "react-router-dom";

import { LOGO_TEXT } from "./logo.constants";

export const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-1">
        <House className="size-6" />
        <span className="font-sans font-semibold leading-none text-lg text-foreground">{LOGO_TEXT}</span>
      </div>
    </Link>
  );
};
