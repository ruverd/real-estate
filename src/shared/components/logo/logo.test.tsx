import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Logo } from "./logo";
import { LOGO_TEXT } from "./logo.constants";

const renderLogo = () => {
  return render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
};

describe("Logo", () => {
  it("should render the logo component", () => {
    renderLogo();
  
    expect(screen.getByText(LOGO_TEXT)).toBeInTheDocument();
  });

  it("should contain a link to the home page", () => {
    renderLogo();
    
    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/");
  });

  it("should contain the House icon", () => {
    renderLogo();
    
    const iconContainer = screen.getByText(LOGO_TEXT).parentElement;

    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer?.querySelector("svg")).toBeInTheDocument();
  });

  it("should have the correct styling classes", () => {
    renderLogo();
    
    const container = screen.getByText(LOGO_TEXT).parentElement;

    expect(container).toHaveClass("flex items-center gap-1");
    
    const logoText = screen.getByText(LOGO_TEXT);

    expect(logoText).toHaveClass("font-sans font-semibold leading-none text-lg text-foreground");
  });

  it("should match snapshot", () => {
    const { container } = renderLogo();

    expect(container.firstChild).toMatchSnapshot();
  });
});
