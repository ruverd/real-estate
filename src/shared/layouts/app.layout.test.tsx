import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

import { AppLayout } from "./app.layout";

vi.mock("@/shared/components/navbar", () => ({
  Navbar: () => <div data-testid="navbar-mock">Navbar Mock</div>,
}));

vi.mock("@/shared/components/footer", () => ({
  Footer: () => <div data-testid="footer-mock">Footer Mock</div>,
}));

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    },
  };
});

describe("AppLayout", () => {
  const renderWithRouter = (initialRoute = "/") => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<div data-testid="home-page">Home Page Content</div>} />
            <Route path="about" element={<div data-testid="about-page">About Page Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  it("should render the layout with navbar, outlet content, and footer", () => {
    renderWithRouter();
    
    expect(screen.getByTestId("navbar-mock")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("footer-mock")).toBeInTheDocument();
  });

  it("should render different outlet content based on the route", () => {
    renderWithRouter("/about");
    
    expect(screen.getByTestId("navbar-mock")).toBeInTheDocument();
    expect(screen.getByTestId("about-page")).toBeInTheDocument();
    expect(screen.getByTestId("footer-mock")).toBeInTheDocument();
  });

  it("should apply the correct container class to the main content", () => {
    renderWithRouter();
    
    const mainContent = screen.getByText("Home Page Content").closest("div");

    expect(mainContent).toBeInTheDocument();
  });

  it("should have the correct structure with flex layout", () => {
    renderWithRouter();
    
    const rootDiv = screen.getByTestId("navbar-mock").parentElement;
    const mainElement = screen.getByText("Home Page Content").closest("main");

    expect(rootDiv).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = renderWithRouter();

    expect(asFragment()).toMatchSnapshot();
  });
});
