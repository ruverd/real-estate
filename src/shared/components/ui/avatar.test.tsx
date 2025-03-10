

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const mockAvatarUrl = "https://github.com/ruverd.png";

const renderComponent = ({ avatar }: { avatar?: string } = {}) => {
  return render(
    <Avatar>
      {avatar && <AvatarImage src={avatar} alt="test user" />}
      <AvatarFallback>TU</AvatarFallback>
    </Avatar>
  );
};

describe("Avatar", () => {
  it("should match snapshot without image", () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match snapshot with image", () => {
    const { container } = renderComponent({ avatar: mockAvatarUrl });
    
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render avatar without image", () => {
    renderComponent();

    expect(screen.getByText("TU")).toBeInTheDocument();
  });
});
