import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

import { MAP_TEXTS } from "../../property-detail.constants";
import { contactFormSchema } from "../../property-detail.schema";
import type { ContactFormValues } from "../../property-detail.types";

export const ContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      [MAP_TEXTS.CONTACT_AGENT.FORM.NAME.FIELD_NAME]: "",
      [MAP_TEXTS.CONTACT_AGENT.FORM.EMAIL.FIELD_NAME]: "",
      [MAP_TEXTS.CONTACT_AGENT.FORM.PHONE.FIELD_NAME]: "",
      [MAP_TEXTS.CONTACT_AGENT.FORM.COMMENTS.FIELD_NAME]: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    toast.success(MAP_TEXTS.CONTACT_SUCCESS.TITLE, {
      description: MAP_TEXTS.CONTACT_SUCCESS.DESCRIPTION,
    });
    console.log(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name={MAP_TEXTS.CONTACT_AGENT.FORM.NAME.FIELD_NAME}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{MAP_TEXTS.CONTACT_AGENT.FORM.NAME.LABEL}</FormLabel>
              <FormControl>
                <Input
                  placeholder={MAP_TEXTS.CONTACT_AGENT.FORM.NAME.PLACEHOLDER}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={MAP_TEXTS.CONTACT_AGENT.FORM.EMAIL.FIELD_NAME}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{MAP_TEXTS.CONTACT_AGENT.FORM.EMAIL.LABEL}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={MAP_TEXTS.CONTACT_AGENT.FORM.EMAIL.PLACEHOLDER}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={MAP_TEXTS.CONTACT_AGENT.FORM.PHONE.FIELD_NAME}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{MAP_TEXTS.CONTACT_AGENT.FORM.PHONE.LABEL}</FormLabel>
              <FormControl>
                <Input
                  placeholder={MAP_TEXTS.CONTACT_AGENT.FORM.PHONE.PLACEHOLDER}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={MAP_TEXTS.CONTACT_AGENT.FORM.COMMENTS.FIELD_NAME}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {MAP_TEXTS.CONTACT_AGENT.FORM.COMMENTS.LABEL}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    MAP_TEXTS.CONTACT_AGENT.FORM.COMMENTS.PLACEHOLDER
                  }
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {MAP_TEXTS.CONTACT_AGENT.FORM.SUBMIT_BUTTON}
        </Button>
      </form>
    </Form>
  );
};
