import { MOCK_PROPERTIES } from "@/shared/mocks/property.mock";
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { PropertyCard } from "./property-card";

const meta: Meta<typeof PropertyCard> = {
  title: "Components/PropertyCard",
  component: PropertyCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="max-w-sm">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PropertyCard>;

export const Default: Story = {
  args: {
    property: MOCK_PROPERTIES[0],
  },
};

export const WithoutFeatures: Story = {
  args: {
    property: MOCK_PROPERTIES[0],
    showFeatures: false,
  },
};

export const WithImageError: Story = {
  args: {
    property: {
      ...MOCK_PROPERTIES[0],
      thumbnailUrl: "https://invalid-image-url.jpg",
    },
  },
};
