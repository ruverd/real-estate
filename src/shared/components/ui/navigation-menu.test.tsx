import { render, screen } from "@testing-library/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "./navigation-menu";

describe("NavigationMenu", () => {
  it("should renders navigation menu with children", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
            <NavigationMenuContent>Content 1</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> 
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("should renders navigation menu without viewport when viewport prop is false", () => {
    const { container } = render(
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    expect(container.querySelector('[data-slot="navigation-menu-viewport"]')).not.toBeInTheDocument();
  });

  it("should renders navigation menu link with correct styling", () => {
    render(
      <NavigationMenu>
        <NavigationMenuLink className="test-class">
          Link Text
        </NavigationMenuLink>
      </NavigationMenu>
    );

    const link = screen.getByText("Link Text");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-slot", "navigation-menu-link");
    expect(link).toHaveClass("test-class");
  });

  it("should renders navigation menu trigger with chevron icon", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Trigger Text</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    expect(screen.getByText("Trigger Text")).toBeInTheDocument();
    
    const svg = document.querySelector("svg");

    expect(svg).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
            <NavigationMenuContent>Content 1</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> 
    );
    
    expect(container).toMatchSnapshot();
  });
});
