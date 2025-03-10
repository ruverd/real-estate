import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const SimpleCard: Story = {
  args: {
    children: (
      <CardContent>
        <p>This is a simple card with only content.</p>
      </CardContent>
    ),
  },
};

export const HeaderOnly: Story = {
  args: {
    children: (
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This card only has a header.</CardDescription>
      </CardHeader>
    ),
  },
};

export const FooterOnly: Story = {
  args: {
    children: (
      <CardFooter className="justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    ),
  },
}; 