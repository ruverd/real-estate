import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./hero";

const meta: Meta<typeof Hero> = {
  title: "Components/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    imageUrl: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    title: "Find Your Dream Home",
    description: "Discover the perfect property that fits your lifestyle and budget.",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80",
  },
};

export const WithShortTitle: Story = {
  args: {
    title: "Luxury Properties",
    description: "Exclusive high-end properties in prime locations.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
};

export const WithLongDescription: Story = {
  args: {
    title: "Real Estate Investment",
    description: "Looking for investment opportunities? Our team of experts can help you find properties with high ROI potential. We analyze market trends, location value, and future development plans to ensure you make informed decisions.",
    imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
  },
}; 