import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { Logo } from "../logo/logo";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { NAVBAR_CONTACT_INFO, NAVBAR_LINKS } from "./navbar.constants";

export const Navbar = () => {
  return (
    <div className="container px-4 md:px-0 h-16 mx-auto flex items-center justify-between">
      <Logo />
      <NavigationMenu>
        <NavigationMenuList>
          {NAVBAR_LINKS.map((link) => (
            <NavigationMenuItem key={link.href}>
              <Link to={link.href}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {link.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="items-center gap-2 hidden md:flex">
        <Phone className="size-4" />
        <span className="font-sans font-medium text-foreground">{NAVBAR_CONTACT_INFO.phone}</span>
      </div>
    </div>
  );
};
