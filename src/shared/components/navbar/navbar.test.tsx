import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import { Navbar } from "./navbar";
import { NAVBAR_CONTACT_INFO, NAVBAR_LINKS } from "./navbar.constants";

vi.mock("../logo/logo", () => ({
  Logo: () => <div data-testid="logo-component">Logo</div>,
}));

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe("Navbar", () => {
  it("should render the component correctly", () => {
    renderNavbar();
    
    const navbarContainer = screen.getByRole("navigation").closest("div");

    expect(navbarContainer).toBeInTheDocument();
  });

  it("should render the Logo component", () => {
    renderNavbar();
    
    const logoComponent = screen.getByTestId("logo-component");

    expect(logoComponent).toBeInTheDocument();
  });

  it("should render all navigation links correctly", () => {
    renderNavbar();
    
    NAVBAR_LINKS.forEach((link) => {
      const linkElement = screen.getByText(link.label);

      expect(linkElement).toBeInTheDocument();
    });
  });

  it("should render contact information", () => {
    renderNavbar();
    
    const phoneNumber = screen.getByText(NAVBAR_CONTACT_INFO.phone);

    expect(phoneNumber).toBeInTheDocument();
    
    const phoneIcon = phoneNumber.parentElement?.querySelector("svg");

    expect(phoneIcon).toBeInTheDocument();
  });

  it("should hide contact information on mobile screens", () => {
    renderNavbar();
    
    const contactContainer = screen.getByText(NAVBAR_CONTACT_INFO.phone).closest("div");

    expect(contactContainer).toHaveClass("hidden md:flex");
  });

  it("should ensure navigation links are accessible", () => {
    renderNavbar();
    
    const navigationMenu = screen.getByRole("navigation");
    const navigationItems = screen.getAllByRole("listitem");

    expect(navigationMenu).toBeInTheDocument();
    expect(navigationItems.length).toBe(NAVBAR_LINKS.length);
  });

  it("should match snapshot", () => {
    const { container } = renderNavbar();

    expect(container.firstChild).toMatchSnapshot();
  });
});
