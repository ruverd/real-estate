import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    children: (
      <>
        <AvatarImage src="https://github.com/ruverd.png" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </>
    ),
  },
};

export const WithFallback: Story = {
  args: {
    children: <AvatarFallback>JD</AvatarFallback>,
  },
};

export const CustomSize: Story = {
  args: {
    className: "size-16",
    children: (
      <>
        <AvatarImage src="https://github.com/ruverd.png" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </>
    ),
  },
}; 