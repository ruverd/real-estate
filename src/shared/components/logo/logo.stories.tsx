import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { Logo } from "./logo";

const meta: Meta<typeof Logo> = {
  title: "Components/Logo",
  component: Logo,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  render: () => <Logo />,
};

export const InContainer: Story = {
  render: () => (
    <div className="bg-background p-4 rounded-md shadow-sm">
      <Logo />
    </div>
  ),
};

export const InNavbar: Story = {
  render: () => (
    <div className="bg-background p-4 border-b flex items-center">
      <Logo />
      <div className="ml-auto flex gap-4">
        <span className="text-sm">Home</span>
        <span className="text-sm">Properties</span>
        <span className="text-sm">Contact</span>
      </div>
    </div>
  ),
}; 