import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Email",
    htmlFor: "email",
  },
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label {...args} />
      <Input id="email" type="email" placeholder="Email" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">
        Email <span className="text-destructive">*</span>
      </Label>
      <Input id="email" type="email" placeholder="Email" required />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5 group" data-disabled="true">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Email" disabled />
    </div>
  ),
};
