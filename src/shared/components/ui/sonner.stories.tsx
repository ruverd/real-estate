import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";

import { Button } from "./button";
import { Toaster } from "./sonner";

const meta: Meta = {
  title: "UI/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <>
      <Button
        variant="outline"
        onClick={() => toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })}
      >
        Show Toast
      </Button>
      <Toaster />
    </>
  ),
};
