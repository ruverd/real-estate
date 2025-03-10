import { zodResolver } from '@hookform/resolvers/zod';
import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const TestForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const onSubmit = vi.fn((values: FormValues) => {
    console.log(values);
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <input {...field} data-testid="username-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input {...field} data-testid="email-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" data-testid="submit-button">Submit</button>
      </form>
    </Form>
  );
};

describe('Form Component', () => {
  it('should renders form elements correctly', () => {
    render(<TestForm />);
    
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('should displays validation errors when form is submitted with invalid data', async () => {
    render(<TestForm />);
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    expect(await screen.findByText('Username must be at least 2 characters.')).toBeInTheDocument();
    expect(await screen.findByText('Please enter a valid email.')).toBeInTheDocument();
  });

  it('should accepts valid form input', async () => {
    render(<TestForm />);
    
    const usernameInput = screen.getByTestId('username-input');
    const emailInput = screen.getByTestId('email-input');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    expect(screen.queryByText('Username must be at least 2 characters.')).not.toBeInTheDocument();
    expect(screen.queryByText('Please enter a valid email.')).not.toBeInTheDocument();
  });

  it("should matches snapshot", () => {
    const { container } = render(<TestForm />);

    expect(container).toMatchSnapshot();
  });
});
